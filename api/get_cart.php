<?php
require_once __DIR__ . '/bootstrap.php';
header('Content-Type: application/json');
require_once __DIR__ . '/../config/db.php';
try {
    $user=current_user(); $sessionId=session_id();
    if ($user) { $stmt=$pdo->prepare('SELECT id,product_id,title,price,image,quantity FROM cart WHERE user_id=? ORDER BY created_at ASC'); $stmt->execute([(int)$user['user_id']]); }
    else { $stmt=$pdo->prepare('SELECT id,product_id,title,price,image,quantity FROM cart WHERE user_id IS NULL AND user_session_id=? ORDER BY created_at ASC'); $stmt->execute([$sessionId]); }
    $items=$stmt->fetchAll(); $totalItems=0; $grandTotal=0.0;
    foreach($items as &$item){ $item['id']=(int)$item['product_id']; $item['product_id']=(int)$item['product_id']; $item['name']=$item['title']; $item['price']=(float)$item['price']; $item['qty']=(int)$item['quantity']; $totalItems += $item['qty']; $grandTotal += $item['price']*$item['qty']; }
    echo json_encode(['status'=>'success','cartCount'=>$totalItems,'grandTotal'=>$grandTotal,'items'=>$items]);
} catch(PDOException $e){ http_response_code(500); echo json_encode(['status'=>'error','message'=>'Could not load cart.']); }
?>
