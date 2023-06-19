function deletePlaylist(playlistId) {
    if (confirm("Are you sure you want to delete this playlist?")) {
        $.ajax({
            url: "/Models/creation_modification_playlistsModel.php", // The URL to the delete PHP script
            type: "POST",
            data: {
                id: playlistId,
                delete: true
            }, // The ID of the playlist to delete
            success: function (result) {
                // If the deletion was successful, reload the page
                location.reload();
            },
            error: function (xhr, status, error) {
                console.log(xhr.responseText);
            }
        });
    }
}

function openPlaylist(playlistId) {
    window.location.href = "/Views/edition_playlists.html?id=" + playlistId;
}

$(document).ready(function(){
    $('#return').on('click', function(){
        window.location.replace('/Views/accueil.html');
    })
    
    $.ajax({
        url: '/Models/creation_modification_playlistsModel.php',  // Remplacez 'votre_url' par l'URL de votre serveur
        type: 'POST',
        data: {getPlaylist : true},
        success: function(response) {
            $('#listPlaylists').append(response);
        },
        error: function(error) {
          alert("Une erreur s'est produite lors de l'envoi des données.");
        }
    });

    $("#sendAjax").click(function() {
        var textValue = $("#inputText").val();
  
        $.ajax({
          url: '/Models/creation_modification_playlistsModel.php',  // Remplacez 'votre_url' par l'URL de votre serveur
          type: 'POST',
          data: {text: textValue, creerPlaylist : true},
          success: function(response) {
            location.reload();
          },
          error: function(error) {
            alert("Une erreur s'est produite lors de l'envoi des données.");
          }
        });
      });

      
});