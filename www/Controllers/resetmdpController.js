$(document).ready(function() {
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get('email');
  const token = urlParams.get('token');

  if (!email || !token) {
    console.error('Invalid email or token.');
    return;
  }

  const currentDatetime = new Date().toISOString();

  $.ajax({
    url: '/Models/check_token.php',
    type: 'POST',
    data: {
      email: email,
      token: token,
      current_datetime: currentDatetime
    },
    dataType: 'text',
    success: function(response) {
      if (response === 'valid') {
        // Token is valid, continue with form submission
        $('#submit-form').on('submit', function(event) {
          event.preventDefault();

          const oldPassword = $('#old_password').val();
          const newPassword = $('#new_password').val();
          const confirmPassword = $('#confirm_password').val();

          // Perform validation and handle form submission
          if (newPassword !== confirmPassword) {
            console.error("Le nouveau mot de passe et l'ancien mot de passe ne sont pas identiques. Veuillez réessayer.");
            return;
          }

          resetPassword(email, token, oldPassword, newPassword, confirmPassword);
        });
      } else {
        console.error('Token invalide ou expiré. Veuillez réessayer.');
      }
    },
    error: function() {
      console.error('Erreur lors de la vérification de la validité du token. Veuillez réessayer.');
    }
  });

  function resetPassword(email, token, oldPassword, newPassword, confirmPassword) {
    $.ajax({
      url: '/Models/reset_password.php',
      type: 'POST',
      data: {
        email: email,
        token: token,
        old_password: oldPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
        submit: true
      },
      dataType: 'text',
      success: function(response) {
        console.log(response);
        // Handle the response from the server after password reset
        if (response === 'success') {
          // Redirect to login page and display success message
          window.location.href = '/Views/login.html';
          showMessage('Votre mot de passe a bien été réinitialisé.');
        } else {
          console.error('Erreur lors de la réinitialisation du mot de passe. Veuillez réessayer.');
        }
      },
      error: function() {
        console.error('Erreur lors de la réinitialisation du mot de passe. Veuillez réessayer.');
      }
    });
  }

  function showMessage(message) {
    // Display a success message on the page using AJAX
    const messageContainer = $('<div>').text(message).addClass('success-message');
    $('body').append(messageContainer);
  }
});
