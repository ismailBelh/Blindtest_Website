// registerController.js
// Importez les modules nécessaires
$(document).ready(function(){
    $('#newUser').on('click', function(){
        // Récupérer les valeurs des champs du formulaire
        const email = $('#email').val();
        const password = $('#password').val();
        const pseudo = $('#pseudo').val();

        // Effectuer des opérations, envoyer des requêtes au serveur, etc.
        // Utiliser jQuery pour envoyer les données au serveur
        $.ajax({
            url: '/Models/registerModel.php',
            type: 'POST',
            data: { email: email, password: password, pseudo: pseudo, register: true },
            dataType: 'text',
            success: function(response) {
                if (response == "Compte créé") {
                    alert("Enregistrement Fait");
                    // Rediriger vers une autre page ou effectuer d'autres actions
                    window.location.replace('/Views/login.html');
                } else {
                    // Afficher un message d'erreur ou effectuer d'autres actions
                    alert('Cette adresse mail est déjà enregistré');
                    window.location.replace('/Views/login.html');
                }
            },
            error: function() {
                // Gérer les erreurs de la requête AJAX
                alert('Erreur lors de la requête AJAX.');
            }
        });
    })
})