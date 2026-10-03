<?php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../config/payhere.php';

$merchantId = $_POST['merchant_id'] ?? '';
$orderId = $_POST['order_id'] ?? '';
$paymentId = $_POST['payment_id'] ?? '';
$payhereAmount = $_POST['payhere_amount'] ?? '';
$payhereCurrency = $_POST['payhere_currency'] ?? '';
$statusCode = (int)($_POST['status_code'] ?? 0);
$md5sig = strtoupper($_POST['md5sig'] ?? '');

if ($merchantId !== PAYHERE_MERCHANT_ID || $orderId === '' || $md5sig === '') {
    http_response_code(400);
    exit('Invalid notification');
}

$localMd5sig = strtoupper(md5(
    $merchantId .
    $orderId .
    $payhereAmount .
    $payhereCurrency .
    $statusCode .
    strtoupper(md5(PAYHERE_MERCHANT_SECRET))
));

if (!hash_equals($localMd5sig, $md5sig)) {
    http_response_code(400);
    exit('Invalid checksum');
}

try {
    $stmt = $pdo->prepare('SELECT id, total_amount FROM orders WHERE order_number = ? LIMIT 1');
    $stmt->execute([$orderId]);
    $order = $stmt->fetch();
    if (!$order) {
        http_response_code(404);
        exit('Order not found');
    }

    if (number_format((float)$order['total_amount'], 2, '.', '') !== number_format((float)$payhereAmount, 2, '.', '') || $payhereCurrency !== PAYHERE_CURRENCY) {
        http_response_code(400);
        exit('Payment amount/currency mismatch');
    }

    $statusMap = [
        2 => ['Paid', 'Paid'],
        0 => ['Pending', 'Pending'],
        -1 => ['Cancelled', 'Cancelled'],
        -2 => ['Failed', 'Failed'],
        -3 => ['Charged Back', 'Charged Back']
    ];
    [$paymentStatus, $orderStatus] = $statusMap[$statusCode] ?? ['Unknown', 'Payment Review'];

    $update = $pdo->prepare('UPDATE orders SET payment_id = ?, payment_status = ?, status = ? WHERE id = ?');
    $update->execute([$paymentId, $paymentStatus, $orderStatus, $order['id']]);

    echo 'OK';
} catch (Throwable $e) {
    http_response_code(500);
    echo 'Server error';
}
