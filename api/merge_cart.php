<?php
require_once __DIR__ . '/bootstrap.php';
header('Content-Type: application/json');
require_once __DIR__ . '/../config/db.php';
$user=require_user();
if($_SERVER['REQUEST_METHOD']!=='POST'){http_response_code(405);echo json_encode(['status'=>'error','message'=>'Method Not Allowed']);exit;}
$data=json_input(); $guestCart=is_array($data['guest_cart']??null)?$data['guest_cart']:[]; $userId=(int)$user['user_id']; $sessionId=session_id();
try{
    $pdo->beginTransaction();
    // Move any DB guest-session cart into the authenticated account first.
    $stmt=$pdo->prepare('SELECT id,product_id,title,price,image,quantity FROM cart WHERE user_id IS NULL AND user_session_id=?');$stmt->execute([$sessionId]);
    foreach($stmt->fetchAll() as $row){
        $check=$pdo->prepare('SELECT id,quantity FROM cart WHERE user_id=? AND product_id=?');$check->execute([$userId,$row['product_id']]);$existing=$check->fetch();
        if($existing){$u=$pdo->prepare('UPDATE cart SET quantity=? WHERE id=?');$u->execute([$existing['quantity']+$row['quantity'],$existing['id']]);$pdo->prepare('DELETE FROM cart WHERE id=?')->execute([$row['id']]);}
        else{$u=$pdo->prepare('UPDATE cart SET user_id=? WHERE id=?');$u->execute([$userId,$row['id']]);}
    }
    $mergedCount=0;
    foreach($guestCart as $item){$productId=(int)($item['id']??$item['product_id']??0);$title=trim($item['name']??$item['title']??'');$price=(float)($item['price']??0);$image=trim($item['image']??'');$qty=max(1,(int)($item['qty']??$item['quantity']??1));if($productId<=0||$title===''||$price<=0)continue;$stmt=$pdo->prepare('SELECT id,quantity FROM cart WHERE user_id=? AND product_id=?');$stmt->execute([$userId,$productId]);$existing=$stmt->fetch();if($existing){$u=$pdo->prepare('UPDATE cart SET quantity=?,title=?,price=?,image=? WHERE id=?');$u->execute([$existing['quantity']+$qty,$title,$price,$image,$existing['id']]);}else{$u=$pdo->prepare('INSERT INTO cart(user_session_id,user_id,product_id,title,price,image,quantity) VALUES(?,?,?,?,?,?,?)');$u->execute([$sessionId,$userId,$productId,$title,$price,$image,$qty]);}$mergedCount+=$qty;}
    $stmt=$pdo->prepare('SELECT COALESCE(SUM(quantity),0) FROM cart WHERE user_id=?');$stmt->execute([$userId]);$total=(int)$stmt->fetchColumn();
    $pdo->commit(); echo json_encode(['status'=>'success','message'=>'Guest cart merged successfully.','mergedCount'=>$mergedCount,'totalCount'=>$total]);
}catch(PDOException $e){if($pdo->inTransaction())$pdo->rollBack();http_response_code(500);echo json_encode(['status'=>'error','message'=>'Cart merge failed.']);}
?>
