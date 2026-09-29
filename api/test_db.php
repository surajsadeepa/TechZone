<?php
// api/test_db.php - Database Health Check & Verification Tool
header('Content-Type: application/json');

require_once __DIR__ . '/../config/db.php';

try {
    // 1. Query MySQL Version & Database Name
    $versionStmt = $pdo->query("SELECT VERSION() as version, DATABASE() as db_name");
    $dbInfo = $versionStmt->fetch();

    // 2. Fetch all tables in techzone_db
    $tablesStmt = $pdo->query("SHOW TABLES");
    $tables = $tablesStmt->fetchAll(PDO::FETCH_COLUMN);

    // 3. Count records in key entities
    $counts = [];
    foreach (['products', 'cart', 'orders', 'order_items', 'users', 'user_profiles'] as $table) {
        if (in_array($table, $tables)) {
            $cStmt = $pdo->query("SELECT COUNT(*) FROM `{$table}`");
            $counts[$table] = intval($cStmt->fetchColumn());
        } else {
            $counts[$table] = 'Table not created yet';
        }
    }

    echo json_encode([
        'status' => 'success',
        'message' => 'Database connected and working correctly!',
        'database_name' => $dbInfo['db_name'],
        'mysql_version' => $dbInfo['version'],
        'tables_found' => $tables,
        'record_counts' => $counts
    ], JSON_PRETTY_PRINT);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'status' => 'error',
        'message' => 'Database Verification Failed: ' . $e->getMessage()
    ], JSON_PRETTY_PRINT);
}
?>
