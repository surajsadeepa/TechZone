<?php
// api/update_cart.php - Update quantity or remove cart item in SQL database
require_once __DIR__ . '/bootstrap.php';
header('Content-Type: application/json');
require_once __DIR__ . '/../config/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method Not Allowed']);
    exit;
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true) ?? $_POST;

$productId = isset($data['product_id']) ? intval($data['product_id']) : (isset($data['id']) ? intval($data['id']) : 0);
$delta = isset($data['delta']) ? intval($data['delta']) : 0;
$sessionId = session_id(); $user=current_user();
if ($productId <= 0 || $delta === 0) { http_response_code(400); echo json_encode(['status'=>'error','message'=>'ProductID and quantity change are required.']); exit; }
try {
    if ($user) { $stmt=$pdo->prepare('SELECT id,quantity FROM cart WHERE user_id=? AND product_id=?'); $stmt->execute([(int)$user['user_id'],$productId]); }
    else { $stmt=$pdo->prepare('SELECT id,quantity FROM cart WHERE user_id IS NULL AND user_session_id=? AND product_id=?'); $stmt->execute([$sessionId,$productId]); }
    $existing=$stmt->fetch();
    if($existing){ $newQty=$existing['quantity']+$delta; if($newQty<=0){$stmt=$pdo->prepare('DELETE FROM cart WHERE id=?');$stmt->execute([$existing['id']]);} else {$stmt=$pdo->prepare('UPDATE cart SET quantity=? WHERE id=?');$stmt->execute([$newQty,$existing['id']]);} }
    if($user){$stmt=$pdo->prepare('SELECT COALESCE(SUM(quantity),0) FROM cart WHERE user_id=?');$stmt->execute([(int)$user['user_id']]);}else{$stmt=$pdo->prepare('SELECT COALESCE(SUM(quantity),0) FROM cart WHERE user_id IS NULL AND user_session_id=?');$stmt->execute([$sessionId]);}
    echo json_encode(['status'=>'success','cartCount'=>(int)$stmt->fetchColumn()]);
} catch(PDOException $e){http_response_code(500);echo json_encode(['status'=>'error','message'=>'Could not update cart.']);}
?>
