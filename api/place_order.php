<?php
// api/place_order.php - Process Checkout & Create Order in SQL Database
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

$customerName = isset($data['customer_name']) ? trim($data['customer_name']) : '';
$address      = isset($data['address']) ? trim($data['address']) : '';
$city         = isset($data['city']) ? trim($data['city']) : '';
$postalCode   = isset($data['postal_code']) ? trim($data['postal_code']) : '';
$cardNumber   = isset($data['card_number']) ? trim($data['card_number']) : '';
$cartItems    = isset($data['items']) ? $data['items'] : [];

if (empty($customerName) || empty($address) || empty($city)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Please provide Name, Address, and City.']);
    exit;
}

$sessionId = session_id();

try {
    $pdo->beginTransaction();

    // Calculate order total
    $totalAmount = 0.0;
    foreach ($cartItems as $item) {
        $totalAmount += floatval($item['price']) * intval($item['qty'] ?? $item['quantity'] ?? 1);
    }

    // Generate unique order number (e.g. TZ-849210)
    $orderNumber = 'TZ-' . strtoupper(substr(md5(uniqid(mt_rand(), true)), 0, 6));

    // Insert Order into SQL Database
    $stmt = $pdo->prepare("INSERT INTO orders (order_number, user_session_id, customer_name, address, city, postal_code, card_number, total_amount, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Confirmed')");
    $stmt->execute([$orderNumber, $sessionId, $customerName, $address, $city, $postalCode, substr($cardNumber, -4), $totalAmount]);
    $orderId = $pdo->lastInsertId();

    // Insert Order Line Items
    $itemStmt = $pdo->prepare("INSERT INTO order_items (order_id, product_id, title, price, quantity) VALUES (?, ?, ?, ?, ?)");
    foreach ($cartItems as $item) {
        $pId   = intval($item['product_id'] ?? $item['id']);
        $pTitle = $item['title'] ?? $item['name'] ?? 'Product';
        $pPrice = floatval($item['price']);
        $pQty   = intval($item['qty'] ?? $item['quantity'] ?? 1);

        $itemStmt->execute([$orderId, $pId, $pTitle, $pPrice, $pQty]);
    }

    // Clear user cart in SQL Database
    $clearStmt = $pdo->prepare("DELETE FROM cart WHERE user_session_id = ?");
    $clearStmt->execute([$sessionId]);

    $pdo->commit();

    echo json_encode([
        'status' => 'success',
        'message' => 'Order placed successfully!',
        'order' => [
            'order_number' => $orderNumber,
            'customer_name' => $customerName,
            'total_amount' => $totalAmount,
            'delivery_estimate' => '2 - 3 Business Days',
            'status' => 'Confirmed'
        ]
    ]);
} catch (PDOException $e) {
    $pdo->rollBack();
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'SQL Error: ' . $e->getMessage()]);
}
?>
