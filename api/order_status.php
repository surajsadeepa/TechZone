<?php
require_once __DIR__ . '/bootstrap.php';
header('Content-Type: application/json');
require_once __DIR__ . '/../config/db.php';

$user = require_user();
$orderId = trim($_GET['order_id'] ?? '');
if ($orderId === '') {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Order ID is required.']);
    exit;
}

$stmt = $pdo->prepare('SELECT order_number, customer_name, total_amount, status, payment_status, created_at FROM orders WHERE order_number = ? AND user_id = ? LIMIT 1');
$stmt->execute([$orderId, (int)$user['user_id']]);
$order = $stmt->fetch();
if (!$order) {
    http_response_code(404);
    echo json_encode(['status' => 'error', 'message' => 'Order not found.']);
    exit;
}

echo json_encode(['status' => 'success', 'order' => $order]);
