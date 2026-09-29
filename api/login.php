<?php
require_once __DIR__ . '/bootstrap.php';
header('Content-Type: application/json');
require_once __DIR__ . '/../config/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status'=>'error','message'=>'Method Not Allowed']); exit;
}

$data = json_input();
$email = trim($data['email'] ?? '');
$password = $data['password'] ?? '';

if ($email === '' || $password === '') {
    http_response_code(400);
    echo json_encode(['status'=>'error','message'=>'Email and Password are required.']); exit;
}

try {
    $stmt = $pdo->prepare('SELECT user_id, full_name, email, password_hash, role, created_at FROM users WHERE email = ? LIMIT 1');
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    // Keep the login failure response generic to prevent user enumeration.
    if (!$user || !password_verify($password, $user['password_hash'])) {
        http_response_code(401);
        echo json_encode(['status'=>'error','message'=>'Invalid email or password.']); exit;
    }

    session_regenerate_id(true);
    $_SESSION['user'] = [
        'sub' => 'user_' . (int)$user['user_id'],
        'user_id' => (int)$user['user_id'],
        'name' => $user['full_name'],
        'email' => $user['email'],
        'avatar' => 'images/avatar.svg',
        'role' => $user['role'],
        'created_at' => $user['created_at']
    ];

    echo json_encode(['status'=>'success','message'=>'Logged in successfully!','user'=>$_SESSION['user']]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status'=>'error','message'=>'Database error during login.']);
}
?>
