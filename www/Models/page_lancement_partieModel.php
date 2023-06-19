<?php

require_once("MyPDO.php");
session_start();

$pdo = new MyPDO();

// Récupérer l'ID de l'utilisateur
$userId = $_SESSION['user_id'];

// Requête pour récupérer les playlists
$query = $pdo->prepare('SELECT pl_id, pl_nom FROM playlist WHERE usr_id = :userId');
$query->bindParam(':userId', $userId);
$query->execute();
$playlists = $query->fetchAll(PDO::FETCH_ASSOC);

// Renvoyer les playlists au format JSON
header('Content-Type: application/json');
echo json_encode($playlists);

?>