<?php
require_once("MyPDO.php");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    if (isset($_POST['login'])) {
        
        $pseudo = $_POST['pseudo'];
        $password = $_POST['password'];

        
        $stmt = $pdo->prepare('SELECT * FROM utilisateur WHERE usr_nom = :pseudo');
        $stmt->execute(array('pseudo' => $pseudo));
        $result = $stmt->fetch();


        if (!empty($result) && $result['usr_nom'] === $pseudo && $password === $result['usr_mdp']) {
            
            //header("Location: accueil.html", true);
            session_start();// Successful login, store user information in session
            $_SESSION['user_nom'] = $result['usr_nom'];
            $_SESSION['user_id'] = $result['usr_id'];

            echo("ok");

            exit();
        } else {
            
            //header("Location: Connexion.html");
            echo("Identifiants invalides");
        }
    } 
}
?>
