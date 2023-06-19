<?php
require_once("MyPDO.php");

session_start();

function createPlaylist($playlistNom){
    $myPDO = new MyPDO();
    $pdo = $myPDO->getPdo();
    
    // Ajouter une nouvelle playlist
    $query = $pdo->prepare('INSERT INTO playlist (pl_nom, pl_dispo, usr_id) VALUES ("'.$playlistNom.'", true, '.$_SESSION["user_id"].')');
    $query->execute();
    
    // Vérifiez le nombre de lignes affectées pour confirmer l'ajout ou la modification
    $rowCount = $query->rowCount();
    echo '<tr>';
    echo '<td>' . $playlistNom . '</td>';
    echo '<td></td>'; // Empty column for spacing
    echo '<!-- HTML code for the "Open" button -->
    <td style="text-align: right;">
        <button class="btn btn-primary" onclick="openPlaylist(' . $_SESSION["user_id"] . ')">Open</button></td>';
    echo '<td style="text-align: right;"><button class="btn btn-danger" onclick="deletePlaylist(' . $_SESSION["user_id"] . ')">Delete</button></td>';
    echo '</tr>';
}

function fetchPlaylist(){
    global $pdo;
    $stmt = $pdo->query('SELECT * FROM playlist WHERE usr_id = ' . $_SESSION["user_id"]);
    $playlists = $stmt->fetchAll(PDO::FETCH_ASSOC);

    foreach ($playlists as $playlist) {
        echo '<tr>';
        echo '<td>' . $playlist['pl_nom'] . '</td>';
        echo '<td></td>'; // Empty column for spacing
        echo '<!-- HTML code for the "Open" button -->
        <td style="text-align: right;">
            <button class="btn btn-primary" onclick="openPlaylist(' . $playlist['pl_id'] . ')">Open</button></td>';
        echo '<td style="text-align: right;"><button class="btn btn-danger" onclick="deletePlaylist(' . $playlist['pl_id'] . ')">Delete</button></td>';
        echo '</tr>';
    }
}

function deletePlaylist($playlistId){
    
    global $pdo;
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Delete rows from 'musique' table
        $stmt = $pdo->prepare('DELETE FROM musique WHERE pl_id = :id');
        $stmt->bindParam(':id', $playlistId, PDO::PARAM_INT);
        $stmt->execute();

        $stmt = $pdo->prepare('DELETE FROM playlist WHERE pl_id = :id');
        $stmt->bindParam(':id', $playlistId, PDO::PARAM_INT);
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

if(isset($_POST['getPlaylist']))
    echo fetchPlaylist();
else if(isset($_POST['creerPlaylist']))
    echo createPlaylist($_POST['text']);
else if (isset($_POST['id']))
    deletePlaylist($_POST['id']);

?>