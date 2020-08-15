//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.


function validar()
{
  var usuario = document.getElementById("inputUsuario").value;
  var password = document.getElementById("inputPassword").value;	

  if(usuario.trim() === "")
  {
    alert("Usuario incorrecto o no se ingreso");
  }
  else{
        if(password.trim()=== "")
  {
    alert("Contraseña incorrecta o no se ingreso");
  }
  else
  {
  
    window.location.href="home.html";
  }
}


function onSignIn(googleUser) {
  // Useful data for your client-side scripts:
  var profile = googleUser.getBasicProfile();
  console.log("ID: " + profile.getId()); // Don't send this directly to your server!
  console.log('Full Name: ' + profile.getName());
  console.log('Given Name: ' + profile.getGivenName());
  console.log('Family Name: ' + profile.getFamilyName());
  console.log("Image URL: " + profile.getImageUrl());
  console.log("Email: " + profile.getEmail());

  // The ID token you need to pass to your backend:
  var id_token = googleUser.getAuthResponse().id_token;
  console.log("ID Token: " + id_token);
}


document.addEventListener("DOMContentLoaded", function(e){

  

});
