<?php

require_once("MyPDO.php");

function getSongs($playlistID){
    $myPDO = new MyPDO('mysql:host=localhost;dbname=projetblindtest', 'root', '');
    $pdo = $myPDO->getPdo();
    $query = $pdo->prepare('SELECT * FROM musique WHERE pl_id = :playlistID');
    $query->bindParam(':playlistID', $playlistID);
    $query->execute(); // Exécute la requête
    $results = $query->fetchAll(PDO::FETCH_ASSOC);
    // Conversion des résultats en JSON
    return $results;
}


function getPlaylistName($playlistID){

    $myPDO = new MyPDO('mysql:host=localhost;dbname=projetblindtest', 'root', '');
    $pdo = $myPDO->getPdo();
    $query = $pdo->prepare('SELECT pl_nom FROM playlist WHERE pl_id = :playlistID');
    $query->bindParam(':playlistID', $playlistID);
    $query->execute(); // Exécute la requête
    $result = $query->fetch(PDO::FETCH_ASSOC);
    // Vérifier si la requête a renvoyé un résultat
    if ($result) {
        return $result['pl_nom']; // Retourner le nom de la playlist
    } else {
        return null; // Ou une valeur par défaut si aucun résultat n'est trouvé
    }
}

function deleteSong($playlistID, $songLink) {

    //echo $playlistID." , ".$songLink;
    //die();
    $myPDO = new MyPDO('mysql:host=localhost;dbname=projetblindtest', 'root', '');
    $pdo = $myPDO->getPdo();
/*
    $query = $pdo->prepare('SELECT * FROM musique WHERE pl_id = '.trim($playlistID).' AND song_lien = "'.trim($songLink).'"');
    print_r($query);
    $query->execute(); // Exécute la requête
    $result = $query->fetchAll(PDO::FETCH_ASSOC);
    return json_encode($result);
*/
    $query = $pdo->prepare('DELETE FROM musique WHERE pl_id = '.trim($playlistID).' AND song_lien = "'.trim($songLink).'"');
    $query->execute();
    $rowCount = $query->rowCount();
    return $rowCount; // Retourne le nombre de lignes affectées (0 ou 1)

}

function addOrUpdateSong($playlistID, $songLink, $songTitle, $songArtist, $songSource) {
    $myPDO = new MyPDO('mysql:host=localhost;dbname=projetblindtest', 'root', '');
    $pdo = $myPDO->getPdo();
    
    // Vérifier si la chanson existe déjà dans la base de données
    $query = $pdo->prepare('SELECT COUNT(*) FROM musique WHERE pl_id = :playlistID AND song_lien = :songLink');
    $query->bindParam(':playlistID', $playlistID);
    $query->bindParam(':songLink', $songLink);
    $query->execute();
    $exists = $query->fetchColumn();
    
    if ($exists) {
        // Mettre à jour la chanson existante
        $query = $pdo->prepare('UPDATE musique SET song_titre = :songTitle, song_artiste = :songArtist, song_source = :songSource WHERE pl_id = :playlistID AND song_lien = :songLink');
    } else {
        // Ajouter une nouvelle chanson
        $query = $pdo->prepare('INSERT INTO musique (pl_id, song_lien, song_titre, song_artiste, song_source) VALUES (:playlistID, :songLink, :songTitle, :songArtist, :songSource)');
    }
    
    $query->bindParam(':playlistID', $playlistID);
    $query->bindParam(':songLink', $songLink);
    $query->bindParam(':songTitle', $songTitle);
    $query->bindParam(':songArtist', $songArtist);
    $query->bindParam(':songSource', $songSource);
    $query->execute();
    
    // Vérifiez le nombre de lignes affectées pour confirmer l'ajout ou la modification
    $rowCount = $query->rowCount();
    return $exists; // Retourne le nombre de lignes affectées (0 ou 1)
}



if(isset($_POST['getChanson'])){
    $musiques = getSongs($_POST['playlistID']);
    $playlistName = getPlaylistName($_POST['playlistID']);
    echo json_encode(array('Name'=>$playlistName, 'Songs'=>$musiques));
}
else if(isset($_POST['suppChanson'])){
    print_r(deleteSong($_POST['playlistID'],$_POST['songLink']));
    echo "done";
}
else if(isset($_POST['addChanson'])){
    echo addOrUpdateSong($_POST['playlistID'],$_POST['songLink'], $_POST['songTitle'], $_POST['songArtist'], $_POST['songSource']);
}





?>