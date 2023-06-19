$.ajax({
    url: "/Models/crudAccessModel.php",
    method: "POST",
    dataType: "json",
    data: {},
    success: function(data) {
        if(data == 0){
            window.location.replace('/Views/login.html');
        }
    },
    error: function(error) {
        console.log("Erreur lors de la récupération du fichier JSON : " + error);
    }
}).done(function() {
    
});