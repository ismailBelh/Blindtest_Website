
<?php

require_once("MyPDO.php");
session_start();


$myPDO = new MyPDO();
$pdo = $myPDO->getPdo();
$sql = "SELECT usr_is_admin FROM utilisateur WHERE usr_id = :userId";
$stmt = $pdo->prepare($sql);
$stmt->bindParam(':userId', $_SESSION['user_id'], PDO::PARAM_INT);
$stmt->execute();

$row = $stmt->fetch(PDO::FETCH_ASSOC);
echo $row["usr_is_admin"];