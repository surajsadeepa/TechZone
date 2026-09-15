<?php
// api/remove_from_cart.php - Step 2: Explicitly remove product from SQL cart database table using filter/delete
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
$sessionId = session_id();

if ($productId <= 0) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'ProductID is required']);
    exit;
}

try {
    // Delete item from SQL database cart table
    $stmt = $pdo->prepare("DELETE FROM cart WHERE user_session_id = ? AND product_id = ?");
    $stmt->execute([$sessionId, $productId]);

    // Recalculate total count
    $countStmt = $pdo->prepare("SELECT SUM(quantity) as total_items FROM cart WHERE user_session_id = ?");
    $countStmt->execute([$sessionId]);
    $totalResult = $countStmt->fetch();
    $totalCount = intval($totalResult['total_items'] ?? 0);

    echo json_encode([
        'status' => 'success',
        'message' => 'Item successfully removed from cart',
        'cartCount' => $totalCount
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'SQL Error: ' . $e->getMessage()]);
}
?>
