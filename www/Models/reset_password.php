<?php
require_once 'MyPDO.php'; // Replace with the correct path to the MyPDO class file

$email = $_GET['email'] ?? '';
$token = $_GET['token'] ?? '';

$current_datetime = date('Y-m-d H:i:s');

// Assuming you have initialized $pdo with database connection parameters
$stmt = $pdo->prepare("SELECT * FROM utilisateur WHERE usr_email = ? AND reset_token = ? AND reset_token_expiry > ?");
$stmt->execute([$email, $token, $current_datetime]);
$result = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$result) {
    echo "Token invalide ou expiré. Veuillez réessayer.";
    exit;
}

// Token is valid, continue with password reset process

// Handle form submission
if (isset($_POST['submit'])) {
    $oldPassword = $_POST['old_password'];
    $newPassword = $_POST['new_password'];
    $confirmPassword = $_POST['confirm_password'];

    if ($newPassword !== $confirmPassword) {
        echo "Le nouveau mot de passe et la confirmation ne correspondent pas. Veuillez réessayer.";
        exit;
    }

    $oldPasswordHash = $result['usr_mdp']; // Assuming the password is stored as a hash in the database
    if (!password_verify($oldPassword, $oldPasswordHash)) {
        echo "L'ancien mot de passe est incorrect. Veuillez réessayer.";
        exit;
    }

    // Update the user's password in the database
    $newPasswordHash = password_hash($newPassword, PASSWORD_DEFAULT);
    // Assuming you have initialized $pdo with database connection parameters
    $updateStmt = $pdo->prepare("UPDATE utilisateur SET usr_mdp = ? WHERE usr_email = ?");
    $updateStmt->execute([$newPasswordHash, $email]);

    echo "Votre mot de passe a bien été réinitialisé.";
    exit;
}
?>
