<?php
// api/update_cart.php - Update quantity or remove cart item in SQL database
session_start();
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
$delta     = isset($data['delta']) ? intval($data['delta']) : 0;
$sessionId = session_id();

if ($productId <= 0) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'ProductID is required']);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT id, quantity FROM cart WHERE user_session_id = ? AND product_id = ?");
    $stmt->execute([$sessionId, $productId]);
    $existing = $stmt->fetch();

    if ($existing) {
        $newQty = $existing['quantity'] + $delta;
        if ($newQty <= 0) {
            // Delete item from SQL database
            $delStmt = $pdo->prepare("DELETE FROM cart WHERE id = ?");
            $delStmt->execute([$existing['id']]);
        } else {
            // Update item quantity in SQL database
            $updStmt = $pdo->prepare("UPDATE cart SET quantity = ? WHERE id = ?");
            $updStmt->execute([$newQty, $existing['id']]);
        }
    }

    // Get updated total
    $countStmt = $pdo->prepare("SELECT SUM(quantity) as total_items FROM cart WHERE user_session_id = ?");
    $countStmt->execute([$sessionId]);
    $totalResult = $countStmt->fetch();
    $totalCount = intval($totalResult['total_items'] ?? 0);

    echo json_encode([
        'status' => 'success',
        'cartCount' => $totalCount
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'SQL Error: ' . $e->getMessage()]);
}
?>
