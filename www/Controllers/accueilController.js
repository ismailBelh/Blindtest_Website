$(document).ready(function(){
    $('#playlist').on('click', function(){
        window.location.replace('/Views/creation_modification_playlists.html');
    })
    $('#play').on('click', function(){
        window.location.replace('/Views/page_lancement_partie.html');
    })
});