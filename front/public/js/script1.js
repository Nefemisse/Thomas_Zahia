
    var x = document.getElementById('logi')
    var y = document.getElementById('regi')
    var z = document.getElementById('btn')
    function regi(){
        x.style.left= "-400px";
        y.style.left="50px";
        z.style.left="135px"
    }
    function logi(){
        x.style.left= "50px";
        y.style.left="450px";
        z.style.left="0px"
    }
    document.forms["validation"].addEventListener("submit", function(e) {

var erreur;

var inputs = this;

// Traitement cas par cas (input unique)
if (inputs["email"].value != "primfx@p.com") {
 erreur = "Adresse email incorrecte";
}

// Traitement générique
for (var i = 0; i < inputs.length; i++) {
 console.log(inputs[i]);
 if (!inputs[i].value) {
     erreur = "Veuillez renseigner tous les champs";
     break;
 }
}

if (erreur) {
 e.preventDefault();
 document.getElementById("erreur").innerHTML = erreur;
 return false;
} else {
 alert('Formulaire envoyé !');
}

})
