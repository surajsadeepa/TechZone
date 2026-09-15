<?php
// api/get_cart.php - Fetch current cart state from SQL database
session_start();
header('Content-Type: application/json');

require_once __DIR__ . '/../config/db.php';

$sessionId = session_id();

try {
    $stmt = $pdo->prepare("SELECT id, product_id, title, price, image, quantity FROM cart WHERE user_session_id = ? ORDER BY created_at ASC");
    $stmt->execute([$sessionId]);
    $items = $stmt->fetchAll();

    $totalItems = 0;
    $grandTotal = 0.0;

    foreach ($items as &$item) {
        $item['id'] = intval($item['product_id']); // preserve ID key for JS rendering
        $item['product_id'] = intval($item['product_id']);
        $item['name'] = $item['title'];
        $item['price'] = floatval($item['price']);
        $item['qty'] = intval($item['quantity']);
        $totalItems += $item['qty'];
        $grandTotal += ($item['price'] * $item['qty']);
    }

    echo json_encode([
        'status' => 'success',
        'cartCount' => $totalItems,
        'grandTotal' => $grandTotal,
        'items' => $items
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'SQL Error: ' . $e->getMessage()
    ]);
}
?>
