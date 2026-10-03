<?php
require_once __DIR__ . '/bootstrap.php';
header('Content-Type: application/json');
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/payhere.php';

$user = require_user();
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method Not Allowed']);
    exit;
}

$data = json_input();
$fullName = trim($data['full_name'] ?? '');
$email = trim($data['email'] ?? '');
$phone = trim($data['phone'] ?? '');
$address = trim($data['address'] ?? '');
$city = trim($data['city'] ?? '');
$postalCode = trim($data['postal_code'] ?? '');
$country = trim($data['country'] ?? 'Sri Lanka');

if ($fullName === '' || $email === '' || $phone === '' || $address === '' || $city === '' || $postalCode === '') {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Please complete all checkout details.']);
    exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Please enter a valid email address.']);
    exit;
}
if (PAYHERE_MERCHANT_ID === 'YOUR_SANDBOX_MERCHANT_ID' || PAYHERE_MERCHANT_SECRET === 'YOUR_SANDBOX_MERCHANT_SECRET') {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'PayHere is not configured yet. Add your Sandbox Merchant ID and Merchant Secret in config/payhere.php.']);
    exit;
}

try {
    $userId = (int)$user['user_id'];
    $stmt = $pdo->prepare('SELECT product_id, title, price, quantity FROM cart WHERE user_id = ? ORDER BY created_at ASC');
    $stmt->execute([$userId]);
    $items = $stmt->fetchAll();

    if (!$items) {
        http_response_code(400);
        echo json_encode(['status' => 'error', 'message' => 'Your cart is empty.']);
        exit;
    }

    $subtotal = 0.0;
    $itemNames = [];
    foreach ($items as $item) {
        $subtotal += (float)$item['price'] * (int)$item['quantity'];
        $itemNames[] = $item['title'] . ' x' . (int)$item['quantity'];
    }
    $total = $subtotal + TECHZONE_SHIPPING_FEE;

    $orderNumber = 'TZ-' . strtoupper(substr(bin2hex(random_bytes(6)), 0, 10));
    $sessionId = session_id();

    $stmt = $pdo->prepare(
        "INSERT INTO orders
        (order_number, user_session_id, user_id, customer_name, email, phone, address, city, postal_code, country, total_amount, status, payment_status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending Payment', 'Pending')"
    );
    $stmt->execute([
        $orderNumber, $sessionId, $userId, $fullName, $email, $phone,
        $address, $city, $postalCode, $country, $total
    ]);

    $orderId = $pdo->lastInsertId();
    $amount = number_format($total, 2, '.', '');
    $parts = preg_split('/\s+/', $fullName, 2);
    $firstName = $parts[0] ?? $fullName;
    $lastName = $parts[1] ?? '';

    echo json_encode([
        'status' => 'success',
        'order_id' => $orderNumber,
        'amount' => $amount,
        'currency' => PAYHERE_CURRENCY,
        'hash' => payhere_hash($orderNumber, $total),
        'merchant_id' => PAYHERE_MERCHANT_ID,
        'return_url' => PAYHERE_RETURN_URL . '?order_id=' . rawurlencode($orderNumber),
        'cancel_url' => PAYHERE_CANCEL_URL . '?order_id=' . rawurlencode($orderNumber),
        'notify_url' => PAYHERE_NOTIFY_URL,
        'items' => implode(', ', array_slice($itemNames, 0, 5)),
        'first_name' => $firstName,
        'last_name' => $lastName,
        'email' => $email,
        'phone' => $phone,
        'address' => $address,
        'city' => $city,
        'country' => $country
    ]);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Could not prepare the payment. Please try again.']);
}
