<?php
require_once __DIR__ . '/bootstrap.php';
header('Content-Type: application/json');
$user = current_user();
echo json_encode(['authenticated'=>(bool)$user, 'user'=>$user]);
?>
