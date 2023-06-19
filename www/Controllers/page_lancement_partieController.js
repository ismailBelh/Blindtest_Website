
console.log("script executé")

function getPlaylistsByUserId() {
    $.ajax({
        url: '/Models/page_lancement_partieModel.php',
        type: 'GET',
        data: {},
        dataType: 'json',
        success: function(data) {
            // Ajouter les options au menu déroulant
            $.each(data, function(index, playlist) {
                $('#playlistDropdown').append($('<option>', {
                    value: playlist.pl_id,
                    text: playlist.pl_nom
                }));
            });
        },
        error: function(xhr, status, error) {
            console.log(error);
        }
    });
}

$(document).ready(function(){
    getPlaylistsByUserId();
    var listItem = [];
    console.log("document is ready")
    $('#return').on('click', function(){
        window.location.replace('/Views/accueil.html');
    })
    
    // Événement déclenché lorsqu'une nouvelle sélection est faite dans le menu déroulant
    $('#playlistDropdown').on('change', function() {
        var playlistId = $(this).val();
        // Faire quelque chose avec l'ID de la playlist sélectionnée
        console.log('Playlist ID sélectionné : ' + playlistId);
    });

    $("#ajouter-joueur").on("click", function () {
        var playerName = $("#input_joueur").val();
        console.log("here" + playerName);

        // Add the player name to the list
        $("#player_list").append("<li>"+playerName+"</li>");
        listItem.push(playerName);

        // Store the player names in an array
        localStorage.setItem("players", JSON.stringify(players));
    });

    $("#lancer_partie").on("click", function () {
        // Get the parameter values
        var tempsReponse = document.getElementById("temp_reponse").value;
        var nbrManche = document.getElementById("nbr_manche").value;
        var playlistSelection = document.getElementById("playlistDropdown").value;

        // Validate the input fields
        var tempError = document.getElementById("tempError");
        var mancheError = document.getElementById("mancheError");

        tempError.style.display = "none";
        mancheError.style.display = "none";

        // Récupérer la liste des joueurs
        var playerList = document.getElementById("player_list");

        // Convertir la liste des joueurs en une chaîne de texte
        var players = Array.from(playerList.getElementsByTagName("li")).map(function(li) {
        return li.textContent;
        }).join(',');

        if (isNaN(tempsReponse) || tempsReponse === "" || /[^\d]/.test(tempsReponse)) {
            tempError.textContent = "Temps de réponse (s) doit être un nombre valide.";
            tempError.style.display = "block";
            return;
        }

        if (isNaN(nbrManche) || nbrManche === "" || /[^\d]/.test(nbrManche) || nbrManche < 3) {
            mancheError.textContent = "Nombre de manche (3 mini) doit être un nombre valide supérieur ou égal à 3.";
            mancheError.style.display = "block";
            return;
        }

        // Redirect to the game page
        window.location.href = "page_de_jeu.html?tempsReponse=" + tempsReponse + "&nbrManche=" + nbrManche + "&playlistSelection=" + playlistSelection+"&players=" + encodeURIComponent(players);;
    });
});