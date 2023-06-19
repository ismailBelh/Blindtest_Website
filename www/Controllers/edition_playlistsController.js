var oldLink;
var oldTitle;
var plID;


$( document ).ready(function(){
    $('#return').on('click', function(){
        window.location.replace('/Views/accueil.html');
    })
    // Récupérer les paramètres de l'URL
    var urlParams = new URLSearchParams(window.location.search);

    // Vérifier si le paramètre existe
    if (urlParams.has('id')) {
        plID = urlParams.get('id')
        $.ajax({
            url: "/Models/edition_playlistsModel.php",
            method: "POST",
            dataType: "json",
            data: { getChanson:true, playlistID: plID },
            success: function(data) {
            $("#Titre-1").html(data['Name']);
            data['Songs'].forEach(e => {
                $('#songField').append(
                    `
                    <div class="chanson" style="height: 5vh; cursor: pointer;">
                        <div class="modifChanson" style="display:inline-block; width:94%;"">
                            <div class="titreChanson" style="display:inline-block; width:23%;white-space: nowrap;text-overflow: ellipsis;overflow: hidden; vertical-align: middle;">
                                `+e['song_titre']+`
                            </div>
                            <div class="artisteChanson" style="display:inline-block; width:23%;white-space: nowrap;text-overflow: ellipsis;overflow: hidden; vertical-align: middle;">
                                `+e['song_artiste']+`
                            </div>
                            <div class="sourceChanson" style="display:inline-block; width:23%;white-space: nowrap;text-overflow: ellipsis;overflow: hidden; vertical-align: middle;">
                                `+e['song_source']+`
                            </div>
                            <div class="lienChanson" style="display:inline-block; width:29%;white-space: nowrap;text-overflow: ellipsis;overflow: hidden; vertical-align: middle;">
                                `+e['song_lien']+`
                            </div>
                        </div>
                        <div class="suppChanson" style="display:inline-block; width:5%; height: 100%; vertical-align: middle; text-align: center;">
                            <img style="height: 100%; width: auto; max-width: 100%;" src="/img/trash-can.png">
                        </div>
                    </div>
                    `
                );
                })
                $('#songField').append('<div class="newChanson" style="height: 5vh; text-align:center; width:70%; cursor: pointer;"><b>NOUVELLE MUSIQUE</b></div>');
            },
            error: function(error) {
                console.log("Erreur lors de la récupération du fichier JSON : " + error);
            }
        }).done(function() {
            
        });
    }
    $(document).on("click", ".modifChanson",function(){
        // Récupérer les valeurs des champs texte dans la div cliquée
        var titre = $(this).find(".titreChanson").text().trim();
        var artiste = $(this).find(".artisteChanson").text().trim();
        var source = $(this).find(".sourceChanson").text().trim();
        var lien = $(this).find(".lienChanson").text().trim();
        oldLink = lien;
        oldTitle = titre;

        // Remplir les champs texte correspondants avec les valeurs récupérées
        $("#Titre").val(titre);
        $("#Artiste").val(artiste);
        $("#Source").val(source);
        $("#Lien").val(lien);
    })

    $(document).on("click", ".newChanson",function() {
        // Réinitialiser les valeurs des champs texte
        $("#Titre").val('');
        $("#Artiste").val('');
        $("#Source").val('');
        $("#Lien").val('');
        oldLink = "";
        oldTitle = "";
    });

    $(document).on("click", ".suppChanson", function() {
        // Afficher une boîte de dialogue pour confirmer la suppression
        if (confirm("Êtes-vous sûr de vouloir supprimer cette chanson ?")) {
            var lienChanson = $(this).closest(".chanson").find(".lienChanson").text();
            // Supprimer le parent correspondant de la ligne si l'utilisateur confirme
            $(this).closest(".chanson").remove();
            $.ajax({
            url: "/Models/edition_playlistsModel.php",
            method: "POST",
            data: {
                suppChanson: true,
                playlistID: plID,
                songLink: lienChanson
            },
            success: function(response) {
                // Traitement à effectuer en cas de succès de la requête
                console.log(response); // Affiche la réponse du serveur
                if (response.success) {
                    // Suppression réussie
                    console.log("La chanson a été supprimée avec succès.");
                } else {
                    // Erreur lors de la suppression
                    console.log("Une erreur s'est produite lors de la suppression de la chanson.");
                }
            },
            error: function(error) {
                // Traitement à effectuer en cas d'erreur de la requête
                console.log("Erreur lors de la requête AJAX : " + error);
            }
        });

        }   
    });

    $('#AjouterModifier').on('click', function() {
        var playlistID = urlParams.get('id');
        var songLink = $('#Lien').val();
        var songTitle = $('#Titre').val();
        var songArtist = $('#Artiste').val();
        var songSource = $('#Source').val();
        
        // Vérifier si les champs titre et lien sont remplis
        if (songTitle.trim() === '' || songLink.trim() === '') {
            alert('Veuillez remplir tous les champs obligatoires.');
            return;
        }
        
        // Appeler la fonction AJAX pour ajouter ou modifier la chanson
        var data = {
            addChanson:true,
            playlistID: playlistID,
            songLink: songLink,
            songTitle: songTitle,
            songArtist: songArtist,
            songSource: songSource
        };
        
        $.ajax({
            url: '/Models/edition_playlistsModel.php',
            method: 'POST',
            data: data,
            success: function(response) {
            console.log(response);
                alert('La chanson a été ajoutée/modifiée avec succès.');
                // Recharger la liste des chansons
                if(response == 0){
                    $('#songField').prepend(
                        `
                        <div class="chanson" style="height: 5vh; cursor: pointer;">
                            <div class="modifChanson" style="display:inline-block; width:94%;"">
                                <div class="titreChanson" style="display:inline-block; width:23%;white-space: nowrap;text-overflow: ellipsis;overflow: hidden; vertical-align: middle;">
                                    `+songTitle+`
                                </div>
                                <div class="artisteChanson" style="display:inline-block; width:23%;white-space: nowrap;text-overflow: ellipsis;overflow: hidden; vertical-align: middle;">
                                    `+songArtist+`
                                </div>
                                <div class="sourceChanson" style="display:inline-block; width:23%;white-space: nowrap;text-overflow: ellipsis;overflow: hidden; vertical-align: middle;">
                                    `+songSource+`
                                </div>
                                <div class="lienChanson" style="display:inline-block; width:29%;white-space: nowrap;text-overflow: ellipsis;overflow: hidden; vertical-align: middle;">
                                    `+songLink+`
                                </div>
                            </div>
                            <div class="suppChanson" style="display:inline-block; width:5%; height: 100%; vertical-align: middle; text-align: center;">
                                <img style="height: 100%; width: auto; max-width: 100%;" src="/img/trash-can.png">
                            </div>
                        </div>
                        `
                    );
                }
                else{
                    $("#songField .modifChanson").each(function() {
                        var $modifChanson = $(this);
                        var $lienChanson = $modifChanson.find(".lienChanson");

                        // Vérifier si le lien de la chanson correspond
                        if ($lienChanson.text().trim() === songLink.trim()) {
                            console.log('here');
                            // Mettre à jour les autres champs
                            $modifChanson.find(".titreChanson").text(songTitle);
                            $modifChanson.find(".artisteChanson").text(songArtist);
                            $modifChanson.find(".sourceChanson").text(songSource);

                            // Sortir de la boucle each
                            return false;
                        }
                    });
                }
            },
            error: function(error) {
            console.log('Erreur lors de la requête AJAX : ' + error);
            }
        });
        });

})