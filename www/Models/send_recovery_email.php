<?php

use PHPMailer\PHPMailer\PHPMailer;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

require_once 'MyPDO.php'; // Replace with the correct path to the MyPDO class file

if(isset($_POST["email"])){
    $email = $_POST['email'];

    // Check if the email exists in the database
    

    $stmt = $pdo->prepare("SELECT * FROM utilisateur WHERE usr_email = ?");
    $stmt->execute([$email]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$result) {
        // Email not found in the database
        echo "
        <script>
            alert('Si votre email est enregistré , un email de réinitialisation vous a été envoyé');
            document.location.href = 'connexion.html';
        </script>
        ";
        exit;
    }

    $mail = new PHPMailer(true);

    $mail->isSMTP();
    $mail->Host='smtp.gmail.com';
    $mail->SMTPAuth = true ;
    $mail->Username='belhoussaineismail@gmail.com' ;
    $mail->Password='qqgtbsdyxxbiorma';
    $mail->SMTPSecure='ssl';
    $mail->Port = 465;

    // Generate a unique token
    $token = bin2hex(random_bytes(32));

    // Calculate the token expiry (e.g., 1 hour from now)
    $expiry = date('Y-m-d H:i:s', strtotime('+3 hour'));

    // Store the token and expiry in the database
    $stmt = $pdo->prepare("UPDATE utilisateur SET reset_token = ?, reset_token_expiry = ? WHERE usr_email = ?");
    $stmt->execute([$token, $expiry, $email]);

    // Send the password recovery email
    $subject = "Reinitialisation de mot de passe";
    $message = "Cliquez sur ce lien pour réinitialiser votre mot de passe: 
    http://blindtestwebapp/reset_password.php?email=$email&token=$token";

    $mail->SetFrom('belhoussaineismail@gmail.com');
    $mail->AddAddress($_POST["email"]);
    $mail->isHTML(true);
    $mail->Subject = $subject;
    $mail->Body= $message;
    
    if ($mail->send()) {
        // Redirect the user to a confirmation page
        echo "
        <script>
            alert('Un email de réinitialisation vous a été envoyé');
            document.location.href = '/Views/login.html';
        </script>
        ";
        exit;
    } else {
        echo "Email sending failed. Please try again.";
        exit;
    }
}
