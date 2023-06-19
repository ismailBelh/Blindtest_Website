// Function to delete a playlist

$('#return').on('click', function(){
  window.location.replace('/Views/accueil.html');
})

function deletePlaylist(playlistName) {
    if (confirm("Are you sure you want to delete this playlist?")) {
        $.ajax({
            url: "/Models/crud.php",
            type: "POST",
            data: {
                name: playlistName,
                deletePlaylist: true
            },
            success: function (result) {
                location.reload();
            },
            error: function (xhr, status, error) {
                console.log(xhr.responseText);
            }
        });
    }
}

function addPlaylist(playlist) {
  const table = $('#listPlaylists');
  const row = `<tr>
      <td style="text-align: center;">${playlist.pl_id}</td>
      <td style="text-align: center;">${playlist.pl_nom}</td>
      <td style="text-align: center;">${playlist.usr_id}</td>
      <td style="text-align: center;"><button class='btn btn-primary modifier'>Modifier</button></td>
      <td style="text-align: center;"><button class='btn btn-danger'>Supprimer</button></td>
  </tr>`;
  table.append(row);
}

function addUser(user) {
  const table = $('#listUtilisateurs');
  const row = `<tr>
      <td style="text-align: center;">${user.usr_id}</td>
      <td style="text-align: center;">${user.usr_nom}</td>
      <td style="text-align: center;">${user.usr_email}</td>
      <td style="text-align: center;">${user.usr_is_admin}</td>
      <td style="text-align: center;"><button class='btn btn-primary modifier'>Modifier</button></td>
      <td style="text-align: center;"><button class='btn btn-danger'>Supprimer</button></td>
  </tr>`;
  table.append(row);
}

function addSong(song) {
  const table = $('#listSongs');
  const row = `<tr>
      <td style="text-align: center;">${song.pl_id}</td>
      <td style="text-align: center;">${song.song_titre}</td>
      <td style="text-align: center;">${song.song_artiste}</td>
      <td style="text-align: center;">${song.song_source}</td>
      <td style="text-align: center;"><a href="${song.song_lien}" target="_blank">${song.song_lien}</a></td>
      <td style="text-align: center;"><button class='btn btn-primary modifier'>Modifier</button></td>
      <td style="text-align: center;"><button class='btn btn-danger'>Supprimer</button></td>
  </tr>`;
  table.append(row);
}
    
$(document).ready(function () {
    
 

  // Load playlists on page load
  $.ajax({
    url: '/Models/crud.php',
    type: 'POST',
    dataType: "json",
    data: {
        getPlaylists: true
    },
    success: function (response) {
        response.forEach(addPlaylist);
    },
    error: function (error) {
        alert("An error occurred while sending the data.");
    }
  });

  $.ajax({
    url: '/Models/crud.php',
    type: 'POST',
    dataType: "json",
    data: {
        getUsers: true
    },
    success: function (response) {
        response.forEach(addUser);
    },
    error: function (error) {
        alert("An error occurred while sending the data.");
    }
  });

  $.ajax({
    url: '/Models/crud.php',
    type: 'POST',
    dataType: "json",
    data: {
        getMusics: true
    },
    success: function (response) {
        response.forEach(addSong);
    },
    error: function (error) {
        alert("An error occurred while sending the data.");
    }
  });

  
    // Create playlist button click event
    $("#createPlaylistButton").click(function () {
        var playlistName = $("#playlistNameInput").val();
    
        $.ajax({
          url: '/Models/crud.php',
          type: 'POST',
          data: {
            playlistName: playlistName,
            createPlaylist: true
          },
          success: function (response) {
            location.reload();
          },
          error: function (error) {
            alert("An error occurred while sending the data.");
          }
        });
      });
  
      $("#addUtilisateurButton").click(function () {
        var username = $("#usernameInput").val();
        var email = $("#emailInput").val();
        var password = $("#passwordInput").val();
    
        $.ajax({
          url: '/Models/crud.php',
          type: 'POST',
          data: {
            username: username,
            email: email,
            password: password,
            addUtilisateur: true
          },
          success: function (response) {
            location.reload();
          },
          error: function (error) {
            alert("An error occurred while sending the data.");
          }
        });
      });
    // Delete playlist button click event
    $(document).on('click', '.deletePlaylistButton', function () {
        var playlistName = $(this).data('playlist-name');
        deletePlaylist(playlistName);
    });




    $('body').on('click', '.modifier', function() {
      const row = $(this).closest('tr');
      const cells = row.find('td');
  
      cells.each(function() {
          // Ignore the first cell (ID)
          if ($(this).index() === 0 ||  $(this).find('a').length) return true;
  
          // Replace text with an input field, if it's not a button cell
          if (!$(this).find('button').length) {
              const text = $(this).text();
              const input = $('<input>').attr('type', 'text').val(text);
              $(this).html(input);
          }
      });
  
      // Change the text and class of the "Modifier" button
      const modifierBtn = row.find('.modifier');
      modifierBtn.text('Envoyer');
  
      const tableId = row.closest('table').attr('id');
      switch (tableId) {
          case 'tablePlaylist':
              modifierBtn.addClass('envoyerPlaylist').removeClass('modifier');
              break;
          case 'tableUtilisateur':
              modifierBtn.addClass('envoyerUser').removeClass('modifier');
              break;
          case 'tableSongs':
              modifierBtn.addClass('envoyerMusique').removeClass('modifier');
              break;
      }
  
      // Hide the "Supprimer" button
      row.find('.btn-danger').hide();
  });


  $('body').on('click', '.envoyerPlaylist', function() {
    const btn = $(this);
    const row = btn.closest('tr');
    const cells = row.find('td');
    const data = { id: cells.first().text() };

    cells.each(function() {
        // Ignore the first cell (ID) and cells with buttons
        if ($(this).index() === 0 || $(this).find('button').length) return true;

        const key = $(this).closest('table').find('th').eq($(this).index()).text();
        const val = $(this).find('input').val();
        data[key] = val;
    });

    data["modifierPlaylist"] = true;

    console.log(data);

    $.ajax({
        url: '/Models/crud.php',
        type: 'POST',
        data: data,
        success: function(response) {
            // Revert cells back to text
            cells.each(function() {
                // Ignore the first cell (ID) and cells with buttons
                if ($(this).index() === 0 || $(this).find('button').length) return true;

                const text = $(this).find('input').val();
                $(this).text(text);
            });

            // Revert the "Envoyer" button back to "Modifier"
            btn.text('Modifier').addClass('btn-primary').removeClass('envoyerPlaylist envoyerUser envoyerMusique');

            // Show the "Supprimer" button
            row.find('.btn-danger').show();
        },
        error: function(error) {
            alert("Une erreur s'est produite lors de l'envoi des données.");
        }
    });
});

$('body').on('click', '.envoyerUser', function() {
  const btn = $(this);
  const row = btn.closest('tr');
  const cells = row.find('td');
  const data = { id: cells.first().text() };

  cells.each(function() {
      // Ignore the first cell (ID) and cells with buttons
      if ($(this).index() === 0 || $(this).find('button').length) return true;

      const key = $(this).closest('table').find('th').eq($(this).index()).text();
      const val = $(this).find('input').val();
      data[key] = val;
  });

  data["modifierUser"] = true;

  console.log(data);

  $.ajax({
      url: '/Models/crud.php',
      type: 'POST',
      data: data,
      success: function(response) {
          // Revert cells back to text
          cells.each(function() {
              // Ignore the first cell (ID) and cells with buttons
              if ($(this).index() === 0 || $(this).find('button').length) return true;

              const text = $(this).find('input').val();
              $(this).text(text);
          });

          // Revert the "Envoyer" button back to "Modifier"
          btn.text('Modifier').addClass('btn-primary').removeClass('envoyerPlaylist envoyerUser envoyerMusique');

          // Show the "Supprimer" button
          row.find('.btn-danger').show();
      },
      error: function(error) {
          alert("Une erreur s'est produite lors de l'envoi des données.");
      }
  });
});
  $('body').on('click', '.envoyerMusique', function(){
    const btn = $(this);
    const row = btn.closest('tr');
    const cells = row.find('td');
    const data = { id: cells.first().text() };
    cells.each(function() {
      // Ignore cells with buttons
      if ($(this).find('button').length) return true;

      const key = $(this).closest('table').find('th').eq($(this).index()).text();
      let val;
      if($(this).find('input').length) { // if cell contains an input
          val = $(this).find('input').val(); // get the input value
      } else if($(this).find('a').length) { // if cell contains a link
          val = $(this).find('a').attr('href'); // get the href attribute
      } else {
          val = $(this).text(); // get the cell text
      }
      data[key] = val;
    });
    data["modifierMusique"] = true;
    console.log(data);
    $.ajax({
      url: '/Models/crud.php',
      type: 'POST',
      data: data,
      success: function(response) {
          // Revert cells back to text
          cells.each(function() {
              // Ignore the first cell (ID) and cells with buttons
              if ($(this).index() === 0 || $(this).find('button').length) return true;

              const text = $(this).find('input').val();
              $(this).text(text);
          });

          // Revert the "Envoyer" button back to "Modifier"
          btn.text('Modifier').addClass('btn-primary modifier').removeClass('envoyerMusique');

          // Show the "Supprimer" button
          row.find('.btn-danger').show();
      },
      error: function(error) {
          alert("Une erreur s'est produite lors de l'envoi des données.");
      }
  });
  })
  $('body').on('click', '.btn-danger', function() {
    const btn = $(this);
    const row = btn.closest('tr');
    const cells = row.find('td');
    const id = cells.first().text();
    const table = btn.closest('table').attr('id').replace('table', ''); // extract the table name from the table id
    let song_lien;

    if(table === 'Musique') {
        song_lien = cells.eq(4).find('a').attr('href'); // get song_lien if table is Musique
    }

    const data = {
        delete: true,
        table: table,
        id: id
    };

    if(song_lien) {
        data.song_lien = song_lien;
    }

    console.log(data);

    $.ajax({
        url: '/Models/crud.php',
        type: 'POST',
        dataType: "json",
        data: data,
        success: function (response) {
            if(response.success) {
                row.remove(); // remove the row from the table
            } else {
                alert("An error occurred while deleting the data.");
            }
        },
        error: function (error) {
            alert("An error occurred while sending the request.");
        }
    });
});

  });