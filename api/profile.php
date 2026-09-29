<?php
require_once __DIR__ . '/bootstrap.php';
header('Content-Type: application/json');
require_once __DIR__ . '/../config/db.php';
$user = require_user();
$userId = (int)$user['user_id'];

try {
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $stmt=$pdo->prepare('SELECT u.user_id,u.full_name,u.email,u.role,u.created_at,p.phone,p.shipping_address,p.billing_address FROM users u LEFT JOIN user_profiles p ON p.user_id=u.user_id WHERE u.user_id=?');
        $stmt->execute([$userId]);
        $profile=$stmt->fetch();
        if (!$profile) { http_response_code(404); echo json_encode(['status'=>'error','message'=>'Profile not found.']); exit; }
        echo json_encode(['status'=>'success','profile'=>$profile]); exit;
    }
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data=json_input();
        $fullName=trim($data['full_name'] ?? '');
        $phone=trim($data['phone'] ?? '');
        $shipping=trim($data['shipping_address'] ?? '');
        $billing=trim($data['billing_address'] ?? '');
        if ($fullName === '') { http_response_code(400); echo json_encode(['status'=>'error','message'=>'Full name is required.']); exit; }
        $stmt=$pdo->prepare('UPDATE users SET full_name=? WHERE user_id=?');
        $stmt->execute([$fullName,$userId]);
        $stmt=$pdo->prepare('SELECT id FROM user_profiles WHERE user_id=?'); $stmt->execute([$userId]);
        if ($stmt->fetch()) {
            $stmt=$pdo->prepare('UPDATE user_profiles SET phone=?,shipping_address=?,billing_address=? WHERE user_id=?');
            $stmt->execute([$phone,$shipping,$billing,$userId]);
        } else {
            $stmt=$pdo->prepare('INSERT INTO user_profiles (user_id,phone,shipping_address,billing_address) VALUES (?,?,?,?)');
            $stmt->execute([$userId,$phone,$shipping,$billing]);
        }
        $_SESSION['user']['name']=$fullName; $_SESSION['user']['full_name']=$fullName;
        echo json_encode(['status'=>'success','message'=>'Profile details updated successfully!']); exit;
    }
    http_response_code(405); echo json_encode(['status'=>'error','message'=>'Method Not Allowed']);
} catch (PDOException $e) {
    http_response_code(500); echo json_encode(['status'=>'error','message'=>'Profile operation failed.']);
}
?>
