<?php
require_once("MyPDO.php");

session_start();

function createPlaylist($playlistNom){
    $myPDO = new MyPDO();
    $pdo = $myPDO->getPdo();
    
    // Add a new playlist
    $query = $pdo->prepare('INSERT INTO playlist (pl_nom, usr_id) VALUES (?, ?)');
    $query->execute([$playlistNom, $_SESSION["user_id"]]);
    
    // Check the number of affected rows to confirm the addition
    $rowCount = $query->rowCount();
    if ($rowCount > 0) {
        // Playlist created successfully
        echo 'Playlist created successfully.';
    } else {
        // Failed to create playlist
        echo 'Failed to create playlist.';
    }
}

function fetchPlaylist(){
    global $pdo;
    $stmt = $pdo->query('SELECT * FROM playlist');
    $playlist = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $jsonResult = json_encode($playlist);
    echo $jsonResult;
}

function fetchUtilisateurs() {
    global $pdo;
    $stmt = $pdo->query('SELECT * FROM utilisateur');
    $utilisateurs = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $jsonResult = json_encode($utilisateurs);
    echo $jsonResult;
}

function fetchMusique() {
    global $pdo;
    $stmt = $pdo->query('SELECT * FROM musique');
    $utilisateurs = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $jsonResult = json_encode($utilisateurs);
    echo $jsonResult;
}

function modifMusique($playlistID,$songLink,$songTitle,$songArtist,$songSource){
    global $pdo;
    $query = $pdo->prepare('UPDATE musique SET song_titre = :songTitle, song_artiste = :songArtist, song_source = :songSource WHERE pl_id = :playlistID AND song_lien = :songLink');
    
    $query->bindParam(':playlistID', $playlistID);
    $query->bindParam(':songLink', $songLink);
    $query->bindParam(':songTitle', $songTitle);
    $query->bindParam(':songArtist', $songArtist);
    $query->bindParam(':songSource', $songSource);
    $query->execute();
}

function modifPlaylist($id, $Titre,$ID_Utilisateur){
    global $pdo;
    $query = $pdo->prepare('UPDATE playlist SET pl_nom = :plTitle, pl_dispo = 1, usr_id = :usrID WHERE pl_id = :playlistID');
    
    $query->bindParam(':playlistID', $id);
    $query->bindParam(':plTitle', $Titre);
    $query->bindParam(':usrID', $ID_Utilisateur);
    $query->execute();
}

function modifUser($id,$Nom,$Email,$Est_admin){
    global $pdo;
    $query = $pdo->prepare('UPDATE utilisateur SET usr_nom = :userNom, usr_email = :userEmail, usr_is_admin = :isAdmin WHERE usr_id = :userID');
    
    $query->bindParam(':userID', $id);
    $query->bindParam(':userNom', $Nom);
    $query->bindParam(':userEmail', $Email);
    $query->bindParam(':isAdmin', $Est_admin);
    $query->execute();
}

function deletePlaylist($playlistName){
    $myPDO = new MyPDO();
    $pdo = $myPDO->getPdo();
    
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Delete rows from 'musique' table
        $stmt = $pdo->prepare('DELETE FROM musique WHERE pl_id IN (SELECT pl_id FROM playlist WHERE pl_nom = :name)');
        $stmt->bindParam(':name', $playlistName, PDO::PARAM_STR);
        $stmt->execute();

        // Delete playlist from 'playlist' table
        $stmt = $pdo->prepare('DELETE FROM playlist WHERE pl_nom = :name');
        $stmt->bindParam(':name', $playlistName, PDO::PARAM_STR);
        $stmt->execute();

        // Check if any rows were affected
        if ($stmt->rowCount() > 0) {
            // Deletion was successful
            echo 'Playlist deleted successfully.';
        } else {
            // Playlist not found or deletion failed
            echo 'Unable to delete the playlist.';
        }
    } else {
        // Invalid request method
        echo 'Invalid request method.';
    }
}

function addUtilisateur($username, $email, $password) {
    // ...
    $myPDO = new MyPDO();
    $pdo = $myPDO->getPdo();
    $query = $pdo->prepare('INSERT INTO utilisateur (usr_nom, usr_email, usr_mdp) VALUES (?, ?, ?)');
    $query->execute([$username, $email, $password]);
    $rowCount = $query->rowCount();
    if ($rowCount > 0) {
        // Playlist created successfully
        echo 'User created successfully.';
    } else {
        // Failed to create playlist
        echo 'Failed to create user.';
    }
    // ...
  }
function deleteUtilisateur($utilisateurId) {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $myPDO = new MyPDO();
    $pdo = $myPDO->getPdo();
    $stmt = $pdo->prepare('DELETE FROM utilisateur WHERE id = :id');
    $stmt->bindParam(':id', $utilisateurId, PDO::PARAM_INT);
    $stmt->execute();
    if ($stmt->rowCount() > 0) {
        // Deletion was successful
        echo 'Playlist deleted successfully.';
    } else {
        // Playlist not found or deletion failed
        echo 'Unable to delete the playlist.';
    }
    // ...
  }
}

function delete($table, $id, $song_lien = null) {
    $myPDO = new MyPDO();
    $pdo = $myPDO->getPdo();
    $primaryKey = '';

    switch ($table) {
        case 'Utilisateur':
            $primaryKey = 'usr_id';
            break;
        case 'Playlist':
            $primaryKey = 'pl_id';
            break;
        case 'Musique':
            $primaryKey = 'pl_id, song_lien';
            break;
    }

    if ($primaryKey) {
        if($table == 'Musique') {
            $stmt = $pdo->prepare("DELETE FROM $table WHERE pl_id = :id AND song_lien = :song_lien");
            $stmt->execute(['id' => $id, 'song_lien' => $song_lien]);
        } else {
            $stmt = $pdo->prepare("DELETE FROM $table WHERE $primaryKey = :id");
            $stmt->execute(['id' => $id]);
        }
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }
}

if(isset($_POST['getPlaylists']))
    echo fetchPlaylist();
else if(isset($_POST['getUsers']))
    echo fetchUtilisateurs();
else if(isset($_POST['getMusics']))
    echo fetchMusique();
else if(isset($_POST['modifierPlaylist']))
    modifPlaylist($_POST["id"],$_POST["Titre"],$_POST["ID_Utilisateur"]);
else if(isset($_POST['modifierUser']))
    modifUser($_POST["id"],$_POST["Nom"],$_POST["E-Mail"],$_POST["Est_admin"]);
else if(isset($_POST['modifierMusique']))
    modifMusique($_POST["ID_Playlist"],$_POST["Lien"],$_POST["Titre"],$_POST["Artiste"],$_POST["Origine"]);
else if(isset($_POST['delete'])) {
    delete($_POST["table"], $_POST["id"], isset($_POST["song_lien"]) ? $_POST["song_lien"] : null);
}
    


?>