
var tag = document.createElement('script');
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

document.getElementById("Arret").addEventListener("click", function () {
    window.location.href = "page_lancement_partie.html";
});

document.getElementById("Arret").addEventListener("click", function () {
    localStorage.removeItem("players");
    window.location.href = "page_lancement_partie.html";
});
// Retrieve the parameter values from local storage
$(document).ready(function(){
    var players = JSON.parse(localStorage.getItem("players"));
    console.log("Players:", players);
    players = urlParams.get('players');
    console.log(players);
    var playersArray = players.split(',');

    // Parcourir le tableau des joueurs avec jQuery (foreach)
    $.each(playersArray, function(index, player) {
      $('#score').append('<div class="jands"><div class="joueur noselect">'+player+`</div>
        <div>
            <div class="sub bouton noselect" style="display:inline-block">-</div>
            <div class="score" style="display:inline-block">0</div>
            <div class="add bouton noselect" style="display:inline-block">+</div>
        </div></div>`); // Afficher chaque joueur dans la console
    });
    $(document).on('click', '.sub', function() {
        var scoreElement = $(this).next('.score'); // Récupérer l'élément du score associé
        var score = parseInt(scoreElement.text()); // Convertir le score en entier
        
        if (score > 0) {
          score--; // Réduire le score de 1
          scoreElement.text(score); // Mettre à jour le texte du score
        }
      });
      
      // Événement lorsqu'on clique sur le bouton "+"
      $(document).on('click', '.add', function() {
        var scoreElement = $(this).prev('.score'); // Récupérer l'élément du score associé
        var score = parseInt(scoreElement.text()); // Convertir le score en entier
        
        score++; // Augmenter le score de 1
        scoreElement.text(score); // Mettre à jour le texte du score
      });

      $('#nbManche').append(urlParams.get('nbrManche'));
})

// Output the retrieved values to the console for verification


var urlParams = new URLSearchParams(window.location.search);
    var playlist;
    var video;
    var timeCode;
    var urlVideo;
    var timer;
    var titreChanson;
    var sourceChanson;
    var artisteChanson;
    var haveSource;
    var haveArtiste;
    var titreCorrecte = false;
    var artisteCorrecte = false;
    var sourceCorrecte = false;
    var player;
    var timerVal = urlParams.get('tempsReponse');

    function verifReponseCorrecte() {
            var titreEntree = $("#Titre").val();
            var artisteEntree = $("#Artiste").val();
            var sourceEntree = $("#Source").val();

            if(!titreCorrecte && estReponseCorrecte(titreChanson, titreEntree, 0.2)  ){
                $("#TitreDiv").html("<h3 style='text-align:center;'>"+titreChanson+"</h3>");
                titreCorrecte = true;
            }
            if(haveArtiste){
                if(!artisteCorrecte && estReponseCorrecte(artisteChanson, artisteEntree, 0.2) ){
                    $("#ArtisteDiv").html("<h3 style='text-align:center;'>"+artisteChanson+"</h3>");
                    artisteCorrecte = true;
                }
            } else artisteCorrecte = true;
            if(haveSource){
                if(!sourceCorrecte && estReponseCorrecte(sourceChanson, sourceEntree, 0.2)){
                    $("#SourceDiv").html("<h3 style='text-align:center;'>"+sourceChanson+"</h3>");
                    sourceCorrecte = true;
                }
            }else sourceCorrecte = true;

            if (titreCorrecte && artisteCorrecte && sourceCorrecte) {
                stopTimer();
                $('#player').css('display', 'block');
                $('#timer').text('BRAVO !!!');
            }
        }

    function onPlayerReady(event) {
        document.getElementById('playButton').addEventListener('click', function() {
            $('#Suivant').css('display','none');
            $('#repondre').css('display','block');
            chooseNewSong();
            fillVideoParam(urlVideo);
            player.loadVideoById(video);
            $(this).css("display", 'none');
            console.log("début de la vidéo à "+timeCode);
            player.seekTo(timeCode);
            player.playVideo();
            startTimer(timerVal);
        });

        function isItEnd() {
            var $manche = $('#nbManche'); // Récupérer l'élément du score associé
            var manche = parseInt($manche.text()); // Convertir le score en entier
            
            manche--; // Réduire le score de 1
            $manche.text(manche); // Mettre à jour le texte du score
            if (playlist.length === 0 || $("#nbManche").text() === "0") {
                console.log("Le tableau est vide.");
                var scores = [];
                // Parcourir tous les joueurs
                $('.jands').each(function() {
                    var joueur = $(this).find('.joueur').text(); // Récupérer le joueur associé
                    var score = $(this).find('.score').text(); // Récupérer le score
                    
                    // Ajouter le joueur et le score à la liste des scores
                    scores.push({ joueur: joueur, score: score });
                });
                
                // Convertir les scores en une chaîne JSON
                var scoresJSON = JSON.stringify(scores);
                
                // Encoder les caractères spéciaux pour les URL
                var encodedScores = encodeURIComponent(scoresJSON);
                
                // Construire l'URL de la page "score.html" avec les paramètres des scores
                var url = 'Score.html?scores=' + encodedScores;
                
                // Rediriger vers la page "score.html"
                window.location.href = url;
            }
        }

        document.getElementById('Suivant').addEventListener('click', function() {
            isItEnd()
            reset();
            chooseNewSong(); // Sélectionne la musique suivante
            fillVideoParam(urlVideo); // Met à jour les paramètres de la vidéo
            player.loadVideoById(video); // Charge la nouvelle vidéo
            console.log("début de la vidéo à "+timeCode);
            player.seekTo(timeCode);
            player.playVideo();
            startTimer(timerVal);
        });
    }


    $(document).on("click", "#repondre", verifReponseCorrecte)
    $(document).keypress(function(event) {
        if (event.which === 13) {
            // Code à exécuter lorsque la touche "Entrée" est enfoncée
            verifReponseCorrecte();
        }
    });

    function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
            height: '315',
            width: '560',
            videoId: video, // Remplacez par l'ID de la vidéo YouTube que vous souhaitez lire
            events: {
                'onReady': onPlayerReady
            }
        });
    }
    //Algorithme trouvé sur internet basé sur des calculs de Traitement Automatique du Langage naturel
    function estReponseCorrecte(reponse, entree, margeErreur) {
            // Convertir les deux chaînes de caractères en minuscules pour comparer sans tenir compte de la casse
            var reponseMinuscule = reponse.toLowerCase();
            var entreeMinuscule = entree.toLowerCase();

            // Calculer la distance de Levenshtein entre les deux chaînes
            var distance = calculeDistanceLevenshtein(reponseMinuscule, entreeMinuscule);

            // Calculer la marge d'erreur autorisée
            var marge = Math.floor(reponseMinuscule.length * margeErreur);

            // Vérifier si la distance est inférieure ou égale à la marge d'erreur
            if (distance <= marge) {
                return true;
            } else {
                return false;
            }
            }

            // Fonction pour calculer la distance de Levenshtein entre deux chaînes de caractères
            function calculeDistanceLevenshtein(s1, s2) {
            var m = s1.length;
            var n = s2.length;

            var d = [];
            for (var i = 0; i <= m; i++) {
                d[i] = [];
                d[i][0] = i;
            }
            for (var j = 0; j <= n; j++) {
                d[0][j] = j;
            }

            for (var j = 1; j <= n; j++) {
                for (var i = 1; i <= m; i++) {
                if (s1.charAt(i - 1) === s2.charAt(j - 1)) {
                    d[i][j] = d[i - 1][j - 1];
                } else {
                    d[i][j] = Math.min(
                    d[i - 1][j] + 1, // Suppression
                    d[i][j - 1] + 1, // Insertion
                    d[i - 1][j - 1] + 1 // Substitution
                    );
                }
                }
            }

            return d[m][n];
        }
            //Fin algo trouvé sur internet


        function chooseNewSong() {
            

            // Générer un index aléatoire
            var indexAleatoire = Math.floor(Math.random() * playlist.length);

            // Sélectionner l'objet JSON correspondant à l'index aléatoire
            var musiqueSelectionne = playlist[indexAleatoire];

            // Supprimer l'objet JSON du tableau
            playlist.splice(indexAleatoire, 1);

            console.log(musiqueSelectionne);
            console.log(playlist);

            titreChanson = musiqueSelectionne["song_titre"];
            if(musiqueSelectionne.hasOwnProperty("song_source")){
                sourceChanson = musiqueSelectionne["song_source"];
                haveSource = true
            }
            else{
                haveSource = false
                $('#Source').prop('disabled', true);
            }
            if(musiqueSelectionne.hasOwnProperty("song_artiste")){
                artisteChanson = musiqueSelectionne["song_artiste"];
                haveArtiste = true
            }
            else{
                haveArtiste = false
                $('#Artiste').prop('disabled', true);
            }
            urlVideo = musiqueSelectionne["song_lien"];
            fillVideoParam(urlVideo);

        }
        function reset() {
            $('#responseField').html(`<div class="row">
                        <div class="col" style="text-align: center;"><strong>Titre</strong></div>
                      </div>
                      <div class="row">
                        <div class="col" id="TitreDiv"><input type="text" id="Titre" style="display: block;margin: auto;">
                        </div>
                      </div>
                      <div class="row">
                        <div class="col" style="text-align: center;"><strong>Artiste</strong></div>
                      </div>
                      <div class="row">
                        <div id="ArtisteDiv" class="col"><input type="text" id="Artiste" style="display: block;margin: auto;"></div>
                      </div>
                      <div class="row">
                        <div class="col" style="text-align: center;"><strong>Source</strong></div>
                      </div>
                      <div class="row">
                        <div class="col" id="SourceDiv"><input type="text" id="Source" style="display: block;margin: auto;"></div>
                      </div>`);
            $('#player').css('display', 'none');
            $('#Suivant').css('display','none');
            $('#repondre').css('display','block');
            
            
            titreCorrecte = false;
            artisteCorrecte = false;
            sourceCorrecte = false;
            
        }

        function fillVideoParam(url){
            var regex = /(?:youtu.be\/|youtube.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/;
            var match = regex.exec(url);
            var valeurV = match && match[1]; // Valeur du paramètre "v"

            regex = /[?&]t=([^&]+)/;
            match = regex.exec(url);
            var valeurT = match && match[1]; // Valeur du paramètre "t"

            if(valeurT === null)
                valeurT = 0;

            timeCode = valeurT;
            video = valeurV;

            console.log("T="+valeurT);
            console.log("V="+valeurV);
        }

        

        function revelerSolution() {
            $('#player').css('display', 'block');
            $("#ArtisteDiv").html("<h3 style='text-align:center;'>"+artisteChanson+"</h3>");
            $("#SourceDiv").html("<h3 style='text-align:center;'>"+sourceChanson+"</h3>");
            $("#TitreDiv").html("<h3 style='text-align:center;'>"+titreChanson+"</h3>");
            
            $('#Suivant').css('display','block');
            $('#repondre').css('display','none');
        }

        function startTimer(timerValue) {
            timer = setInterval(function() {
            var minutes = Math.floor(timerValue / 60);
            var seconds = timerValue % 60;

            // Afficher le temps restant
            $('#timer').text(minutes + ':' + seconds.toString().padStart(2, '0'));

            // Réduire le temps restant
            timerValue--;

            // Arrêter le timer lorsque le temps est écoulé
            if (timerValue < 0) {
                clearInterval(timer);
                // Faire quelque chose lorsque le temps est écoulé
                $('#timer').text('Temps écoulé');
                revelerSolution();
            }
            }, 1000); // Mise à jour toutes les secondes
        }

        function stopTimer() {
            clearInterval(timer);
        }
    
    $.ajax({
        url: "/Models/page_de_jeuModel.php",
        method: "POST",
        dataType: "json",
        data: { getChanson:true, playlistID: urlParams.get('playlistSelection') },
        success: function(data) {
        playlist = data["Songs"];
        console.log(playlist);

        
        },
        error: function(error) {
            console.log("Erreur lors de la récupération du fichier JSON : " + error);
        }
    }).done(function() {
         
    });
