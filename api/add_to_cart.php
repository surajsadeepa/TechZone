<?php
// api/add_to_cart.php - Step 1: Add to Cart Backend Handler
require_once __DIR__ . '/bootstrap.php';
header('Content-Type: application/json');
require_once __DIR__ . '/../config/db.php';

// Check if request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method Not Allowed']);
    exit;
}

// 1. Capture payload passed from frontend event handler
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

// Fallback to standard $_POST if not JSON
if (!$data) {
    $data = $_POST;
}

// 2. Extract unique identifiers (ProductID, Title, Price, Image, Qty)
$productId = isset($data['product_id']) ? intval($data['product_id']) : (isset($data['id']) ? intval($data['id']) : 0);
$title     = isset($data['title']) ? trim($data['title']) : (isset($data['name']) ? trim($data['name']) : '');
$price     = isset($data['price']) ? floatval($data['price']) : 0.0;
$image     = isset($data['image']) ? trim($data['image']) : '';
$qty       = isset($data['quantity']) ? max(1, intval($data['quantity'])) : (isset($data['qty']) ? max(1, intval($data['qty'])) : 1);

if ($productId <= 0 || empty($title) || $price <= 0) {
    http_response_code(400);
    echo json_encode([
        'status' => 'error',
        'message' => 'Invalid product payload. ProductID, Title, and Price are required.'
    ]);
    exit;
}

$user = current_user();
$userId = $user ? (int)$user['user_id'] : null;
$sessionId = session_id();

try {
    // Week 5: check existing product first; if it exists, increase quantity.
    if ($userId) {
        $stmt = $pdo->prepare('SELECT id, quantity FROM cart WHERE user_id = ? AND product_id = ?');
        $stmt->execute([$userId, $productId]);
    } else {
        $stmt = $pdo->prepare('SELECT id, quantity FROM cart WHERE user_id IS NULL AND user_session_id = ? AND product_id = ?');
        $stmt->execute([$sessionId, $productId]);
    }
    $existing = $stmt->fetch();
    if ($existing) {
        $newQty = $existing['quantity'] + $qty;
        $updateStmt = $pdo->prepare('UPDATE cart SET quantity = ?, title = ?, price = ?, image = ? WHERE id = ?');
        $updateStmt->execute([$newQty,$title,$price,$image,$existing['id']]);
    } else {
        $insertStmt = $pdo->prepare('INSERT INTO cart (user_session_id,user_id,product_id,title,price,image,quantity) VALUES (?,?,?,?,?,?,?)');
        $insertStmt->execute([$sessionId,$userId,$productId,$title,$price,$image,$qty]);
    }
    if ($userId) { $countStmt=$pdo->prepare('SELECT COALESCE(SUM(quantity),0) FROM cart WHERE user_id=?'); $countStmt->execute([$userId]); }
    else { $countStmt=$pdo->prepare('SELECT COALESCE(SUM(quantity),0) FROM cart WHERE user_id IS NULL AND user_session_id=?'); $countStmt->execute([$sessionId]); }
    $totalCount=(int)$countStmt->fetchColumn();
    echo json_encode(['status'=>'success','message'=>"Successfully added '{$title}' to cart",'cartCount'=>$totalCount,'item'=>['product_id'=>$productId,'title'=>$title,'price'=>$price,'image'=>$image,'quantity'=>$qty]]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'SQL Error: ' . $e->getMessage()
    ]);
}
?>
