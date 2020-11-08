let misArticulos;         

function mostrarArticulos(articles){
    let htmlContentToAppend = "";
    misArticulos = articles

    for(let i = 0; i < misArticulos.length; i++){
    htmlContentToAppend += `
        <tr>
          <th scope="row"><img src="`+ misArticulos[i].src +`" alt="..." class="img-thumbnail" style="max-width: 150px;"></th>
          <td>`+ misArticulos[i].name +`</td>
          <td>`+ misArticulos[i].currency +` `+ misArticulos[i].unitCost +`</td>
          <td>
            <input type="number" min="1" max="1000"  class="form-control text-dark bg-white" id="count`+i+`" name="sup" value="`+misArticulos[i].count+`" onclick="carrito('count',`+i+`)" style="width: 70px;"></input>
          </td>
          <td><strong > `+ misArticulos[i].currency +` <span id="subTotal`+i+`">`+ misArticulos[i].unitCost*misArticulos[i].count +`</span> </strong></td>
          <th scope="row"><img src="img/papelera.png" alt="..." class="img-circle" style="max-width: 30px;" onclick="carrito('del',`+i+`)"></th>
        </tr>
    ` 
    }
    htmlContentToAppend += `<tr><th scope="row"></th><td></td><td></td><td></td><td></td></tr>`
    document.getElementById("miCarrito").innerHTML = htmlContentToAppend;


}


(function() {
    'use strict';
    window.addEventListener('load', function() {
    
    var forms = document.getElementsByClassName('needs-validation');
    
    var validation = Array.prototype.filter.call(forms, function(form) {
    form.addEventListener('submit', function(event) {
    if (form.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
    }
    else{

        alert("Compra Realizada");
    }
    form.classList.add('was-validated');
    }, false);
    });
    }, false);
    })();


function metodoPagoTarjeta(){

    var nombTarjeta = document.getElementById("tarjetanom");
    var numTarjeta  = document.getElementById("tarjetanum");
    var venTarjeta  = document.getElementById("año");
    var ccvTarjeta  = document.getElementById("cvv");

    if(nombTarjeta.value==="" && numTarjeta.value==="" && venTarjeta.value==="" && ccvTarjeta.value==="" ){
       
        alert("Error de ingreso");

    }
    
    else{
        
        alert("Metodo Elegido Correctamente");
        document.getElementById("forma").innerHTML = "Tarjeta de credito";
              
    }

   
}

function metodoPagoBanco(){

    var nombTarjeta = document.getElementById("banco")

    if(banco.value==="" ){
       
        alert("Error de ingreso");

    }
    
    else{
        alert("Metodo Elegido Correctamente");
        document.getElementById("forma").innerHTML = "Banco";
              
    }

   
}

function tipoEnvio(){
    
    let tiposDeEnvio = document.getElementsByName('tipo_envio');
        let costTipoDeEnvio = 0;
        for(let i = 0; i < tiposDeEnvio.length; i++){
            if (tiposDeEnvio[i].checked){costTipoDeEnvio = tiposDeEnvio[i].value}
        }
    
    return costTipoDeEnvio
}

function finalSubtotal(){
    let subtotal = 0
    for(let i = 0; i < misArticulos.length; i++){
        let UYUunitCost = misArticulos[i].unitCost;
        if(misArticulos[i].currency === 'UYU'){UYUunitCost = misArticulos[i].unitCost / 40}    // Convierto Pesos a Dolares
        subtotal += UYUunitCost*misArticulos[i].count;
    }
    return Math.round(subtotal)
}

function carrito(atrib=false,art=false){

    
    if(atrib||art){
        
        if (atrib === 'del'){
            
            misArticulos.splice(art,1)
            mostrarArticulos(misArticulos)
        }
        else{
            
            misArticulos[art][atrib] = document.getElementById('count'+art+'').value;

            
            document.getElementById('subTotal'+art+'').innerHTML = misArticulos[art].unitCost * misArticulos[art].count;
        }   
    }        

    // Subtotal
    document.getElementById('subTotal').innerHTML = finalSubtotal();
        
    // Envio
    document.getElementById('costoDeEnvio').innerHTML = Math.round(finalSubtotal() * tipoEnvio());

    // Total
    document.getElementById('total').innerHTML = Math.round((finalSubtotal() * tipoEnvio())+finalSubtotal());
        
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            mostrarArticulos(resultObj.data.articles);         // muestro los articulos
            carrito();
        }
    });
});



