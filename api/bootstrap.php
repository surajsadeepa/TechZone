<?php
// Shared session/auth bootstrap for TechZone.
$secure = !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off';
if (session_status() === PHP_SESSION_NONE) {
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'secure' => $secure,
        'httponly' => true,
        'samesite' => 'Lax'
    ]);
    session_start();
}

function current_user(): ?array {
    return isset($_SESSION['user']) && is_array($_SESSION['user']) ? $_SESSION['user'] : null;
}

function require_user(): array {
    $user = current_user();
    if (!$user || empty($user['user_id'])) {
        http_response_code(401);
        echo json_encode(['status' => 'error', 'message' => 'Unauthorized. Please log in first.']);
        exit;
    }
    return $user;
}

function json_input(): array {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);
    return is_array($data) ? $data : $_POST;
}

function cart_owner_sql(): array {
    $user = current_user();
    if ($user && !empty($user['user_id'])) {
        return ['user_id = ?', [(int)$user['user_id']]];
    }
    return ['user_id IS NULL AND user_session_id = ?', [session_id()]];
}
?>
