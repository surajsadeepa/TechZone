<?php
$orderId = trim($_GET['order_id'] ?? '');
header('Location: confirmation.html?order_id=' . rawurlencode($orderId) . '&payment_cancelled=1');
exit;
