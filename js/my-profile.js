let user_loged = localStorage.getItem('user_loged');
let user_Information = JSON.parse(localStorage.getItem(user_loged+'_inf'));

function showUserInformation(user_Information){
    if(!user_Information){
        
        document.getElementById('boxUserInformation').style.display = 'None';
        
        
        askForUserDatas()
    }
    else{

        document.getElementById('boxUserInformation_name').innerHTML = user_Information.name;
        document.getElementById('boxUserInformation_lastName').innerHTML = user_Information.lastName;
        document.getElementById('boxUserInformation_age').innerHTML = user_Information.age;
        document.getElementById('boxUserInformation_cel').innerHTML = user_Information.cel;
        document.getElementById('boxUserInformation_email').innerHTML = user_Information.emal;

        
        document.getElementById('boxUserInformation').style.display = 'flex';
    }
}


// muestro y oculto el formulario
function askForUserDatas(){
    
    display = document.getElementById('personal_datas').style.display;
    if (display === 'block'){
        document.getElementById('personal_datas').style.display = 'None';
    }
    else{
        document.getElementById('personal_datas').style.display = 'block';
    }
}

function saveUserDatas(){
    userDataName = document.getElementById('userDataName');
    userDataLastName = document.getElementById('userDataLastName');
    userDataAge = document.getElementById('userDataAge');
    userDataCel = document.getElementById('userDataCel');
    userDataEmail = document.getElementById('userDataEmail');


    // VALIDACION DE DATOS
    data_validation = true;
    
    if(!userDataName.value){
        data_validation = false;
        userDataName.className = "form-control is-invalid";
    }
    else{
        userDataName.className = "form-control";
    }

   
    if(!userDataLastName.value){
        data_validation = false;
        userDataLastName.className = "form-control is-invalid";
    }
    else{
        userDataLastName.className = "form-control";
    }

    
    if(!userDataAge.value){
        data_validation = false;
        userDataAge.className = "form-control is-invalid";
    }
    else{
        userDataAge.className = "form-control";
    }

    
    if(!userDataCel.value){
        data_validation = false;
        userDataCel.className = "form-control is-invalid";
    }
    else{
        userDataCel.className = "form-control";
    }


    
    if(!userDataEmail.value){
        data_validation = false;
        userDataEmail.className = "form-control is-invalid";
    }
    else{
        userDataEmail.className = "form-control";
    }

    if (data_validation){
         
        userData = {'name':userDataName.value,'lastName':userDataLastName.value,'age':userDataAge.value,'cel':userDataCel.value,'emal':userDataEmail.value};
        
        localStorage.setItem(user_loged+'_inf',JSON.stringify(userData));

   
        user_loged = localStorage.getItem('user_loged');
        user_Information = JSON.parse(localStorage.getItem(user_loged+'_inf'));
                
        
        showUserInformation(user_Information);
        
        
        document.getElementById('personal_datas').style.display = 'None';
    }
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
   
    showUserInformation(user_Information)
});