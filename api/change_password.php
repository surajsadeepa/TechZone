<?php
require_once __DIR__ . '/bootstrap.php';
header('Content-Type: application/json');
require_once __DIR__ . '/../config/db.php';
$user= require_user();
if ($_SERVER['REQUEST_METHOD'] !== 'POST') { http_response_code(405); echo json_encode(['status'=>'error','message'=>'Method Not Allowed']); exit; }
$data=json_input();
$current=$data['current_password'] ?? '';
$new=$data['new_password'] ?? '';
$confirm=$data['confirm_password'] ?? '';
if ($current==='' || $new==='' || $confirm==='') { http_response_code(400); echo json_encode(['status'=>'error','message'=>'All password fields are required.']); exit; }
if (!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z\\d]).{8,}$/',$new)) { http_response_code(400); echo json_encode(['status'=>'error','message'=>'New password must be at least 8 characters and include uppercase, lowercase, number, and special character.']); exit; }
if ($new !== $confirm) { http_response_code(400); echo json_encode(['status'=>'error','message'=>'New password and confirmation do not match.']); exit; }
try {
    $stmt=$pdo->prepare('SELECT password_hash FROM users WHERE user_id=?'); $stmt->execute([(int)$user['user_id']]); $row=$stmt->fetch();
    if (!$row || !password_verify($current,$row['password_hash'])) { http_response_code(400); echo json_encode(['status'=>'error','message'=>'Current password verification failed.']); exit; }
    $hash=password_hash($new,PASSWORD_BCRYPT);
    $stmt=$pdo->prepare('UPDATE users SET password_hash=? WHERE user_id=?'); $stmt->execute([$hash,(int)$user['user_id']]);
    echo json_encode(['status'=>'success','message'=>'Password changed successfully.']);
} catch(PDOException $e) { http_response_code(500); echo json_encode(['status'=>'error','message'=>'Password change failed.']); }
?>
