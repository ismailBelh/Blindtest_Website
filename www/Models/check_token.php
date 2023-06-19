<?php
require_once 'MyPDO.php'; // Replace with the correct path to the MyPDO class file

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  echo 'Invalid request method.';
  exit;
}

// Retrieve the email, token, and current datetime from the request
$email = $_POST['email'];
$token = $_POST['token'];
$currentDatetime = $_POST['current_datetime'];

// Verify the token and check if it's still valid
$stmt = $pdo->prepare("SELECT * FROM utilisateur WHERE usr_email = ? AND reset_token = ? AND reset_token_expiry > ?");
$stmt->execute([$email, $token, $currentDatetime]);
$result = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$result) {
  echo 'invalid';
  exit;
}

echo 'valid';
