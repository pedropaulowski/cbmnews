<?php

$host = 'sql10.freemysqlhosting.net';
$dbname = 'sql10344688';
$dbuser = 'sql10344688';
$dbpwd = 'rBmfJI9zPt';

try {
    $pdo = new PDO("mysql:host=$host;port=3306;dbname=$dbname", $dbuser, $dbpwd);
} catch (PDOException $e) {
    echo $e->getMessage();
    exit;
}
    