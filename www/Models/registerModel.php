<?php
require_once("MyPDO.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['register'])) {
        $email = $_POST['email'];
        $pseudo = $_POST['pseudo'];
        $password = $_POST['password'];

    //$pdo = new MyPDO('mysql:host=localhost;dbname=cnamblindtest_sql', 'root', '');
    $pdo = new MyPDO();
    //$pdo = $myPDO->getPdo();
    //var_dump($pdo);

        $stmt = $pdo->prepare('SELECT usr_id FROM utilisateur WHERE usr_nom = :pseudo');
        $stmt->execute(array('pseudo' => $pseudo));
        $result = $stmt->fetch();

        if ($result) {

            echo "Compte existant";

        } else {
            // Hash the password
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

            // Register the user
            $stmt = $pdo->prepare('INSERT INTO utilisateur (usr_email, usr_nom, usr_mdp) VALUES (:email, :pseudo, :password)');
            $stmt->execute(array('email' => $email, 'pseudo' => $pseudo, 'password' => $password));

            echo "Compte créé";

            
        }
    }
}
?>