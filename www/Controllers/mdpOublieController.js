// mdpOublieController.js
// Importez les modules nécessaires
$(document).ready(function(){
    $('#send').on('click', function(){
        // Récupérer les valeurs des champs du formulaire
        const email = $('#email').val();

        // Effectuer des opérations, envoyer des requêtes au serveur, etc.
        // Utiliser jQuery pour envoyer les données au serveur
        $.ajax({
            url: '/Models/send_recovery_email.php',
            type: 'POST',
            data: { email: email, login: true },
            dataType: 'text',
            success: function(response) {
                $('body').append(response);
            },
            error: function() {
                // Gérer les erreurs de la requête AJAX
                alert('Erreur lors de la requête AJAX.');
            }
        });
    })
    $("#retour").on('click', function(){
        window.location.replace('/Views/login.html');
    })
})