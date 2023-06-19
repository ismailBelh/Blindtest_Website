// Fonction pour récupérer les scores depuis l'URL et les afficher
function displayScores() {
    // Récupérer les paramètres de l'URL
    var params = new URLSearchParams(window.location.search);
    
    // Vérifier si le paramètre "scores" existe
    if (params.has('scores')) {
      // Récupérer la valeur du paramètre "scores"
      var encodedScores = params.get('scores');
      
      // Décoder les caractères spéciaux de la chaîne JSON des scores
      var scoresJSON = decodeURIComponent(encodedScores);
      
      // Convertir la chaîne JSON en un tableau d'objets de scores
      var scores = JSON.parse(scoresJSON);
      
      // Trier les scores par ordre croissant
      scores.sort(function(a, b) {
        return b.score - a.score;
      });
      
      // Créer une chaîne HTML pour afficher les scores dans la div "container"
      var scoresHTML = '';
      scores.forEach(function(score, index) {
        scoresHTML += '<p>Joueur ' + score.joueur + ' : ' + score.score + '</p>';
      });
      
      // Afficher les scores dans la div "container"
      $('.container').html(scoresHTML);
    }
  }

  $('#FinPartie').on('click', function(){
    window.location.replace('/Views/accueil.html');
})

  $(document).ready( displayScores());