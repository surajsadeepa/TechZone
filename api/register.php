<?php
require_once __DIR__ . '/bootstrap.php';
header('Content-Type: application/json');
require_once __DIR__ . '/../config/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); echo json_encode(['status'=>'error','message'=>'Method Not Allowed']); exit;
}
$data = json_input();
$fullName = trim($data['full_name'] ?? '');
$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';
$confirm = $data['confirm_password'] ?? '';

if ($fullName === '' || $email === '' || $password === '' || $confirm === '') {
    http_response_code(400); echo json_encode(['status'=>'error','message'=>'All fields are required.']); exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || !preg_match('/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/', $email)) {
    http_response_code(400); echo json_encode(['status'=>'error','message'=>'Please enter a valid email address.']); exit;
}
// Practical requirement: password complexity, not only length.
if (!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z\\d]).{8,}$/', $password)) {
    http_response_code(400); echo json_encode(['status'=>'error','message'=>'Password must be at least 8 characters and include uppercase, lowercase, number, and special character.']); exit;
}
if ($password !== $confirm) {
    http_response_code(400); echo json_encode(['status'=>'error','message'=>'Passwords do not match.']); exit;
}
try {
    $stmt=$pdo->prepare('SELECT user_id FROM users WHERE email=? LIMIT 1');
    $stmt->execute([$email]);
    if ($stmt->fetch()) { http_response_code(400); echo json_encode(['status'=>'error','message'=>'An account with this email address already exists.']); exit; }
    $hash=password_hash($password, PASSWORD_BCRYPT);
    $pdo->beginTransaction();
    $stmt=$pdo->prepare("INSERT INTO users (full_name,email,password_hash,role) VALUES (?,?,?,'user')");
    $stmt->execute([$fullName,$email,$hash]);
    $userId=(int)$pdo->lastInsertId();
    $stmt=$pdo->prepare('INSERT INTO user_profiles (user_id) VALUES (?)');
    $stmt->execute([$userId]);
    $pdo->commit();
    http_response_code(201); echo json_encode(['status'=>'success','message'=>'Account created successfully! Please log in.','user_id'=>$userId]);
} catch (PDOException $e) {
    if ($pdo->inTransaction()) $pdo->rollBack();
    http_response_code(500); echo json_encode(['status'=>'error','message'=>'Registration could not be completed.']);
}
?>
