// loginController.js
// Importez les modules nécessaires
$(document).ready(function(){
    $('#connect').on('click', function(){
        // Récupérer les valeurs des champs du formulaire
        const password = $('#password').val();
        const pseudo = $('#pseudo').val();

        // Effectuer des opérations, envoyer des requêtes au serveur, etc.
        // Utiliser jQuery pour envoyer les données au serveur
        $.ajax({
            url: '/Models/loginModel.php',
            type: 'POST',
            data: { password: password, pseudo: pseudo, login: true },
            dataType: 'text',
            success: function(response) {
                if (response == "ok") {
                    // Rediriger vers une autre page ou effectuer d'autres actions
                    window.location.replace('/Views/accueil.html');
                } else {
                    // Afficher un message d'erreur ou effectuer d'autres actions
                    alert(response);
                }
            },
            error: function() {
                // Gérer les erreurs de la requête AJAX
                alert('Erreur lors de la requête AJAX.');
            }
        });
    })
})