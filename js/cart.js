let subtotal = 0;
let pre = 0;
let final = 0;

let sub = document.getElementsByClassName("subtotal");

function precioFinal(){
    final = 0;
    for(let i = 0; i < sub.length; i++){
        final += parseInt(sub[i].innerHTML); 
    }
    return final;
}

document.addEventListener("DOMContentLoaded", function(e){

    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            let productsList = resultObj.data.articles;

            for(let i = 0; i < productsList.length; i++){
                subtotal += (productsList[i].unitCost * productsList[i].count)
                pre = productsList[i].unitCost;

                document.getElementById("tableProducts").innerHTML += `
                    <tr> 
                        <td><img class="imgList" src=`+ productsList[i].src +`>`+`</td>
                        <td>` + productsList[i].name +`</td>
                        <td class="precio">`+ productsList[i].unitCost +`</td>
                        <td id="cant"> <input type="number" id="cantidadNum" class="cantidadesCart" min="1" value="`+ productsList[i].count +`"> </td> 
                        <td>`+ productsList[i].currency +`</td>
                        <td class="subtotal">`+ subtotal +`</td>
                    </tr>
                    `
                document.getElementById("preFinal").innerHTML = "Total: " + precioFinal();
                subtotal = 0;
            }
        }
        
        document.getElementById("aplicarCart").addEventListener('click' , function(e){
            total = 0;

            let precios = document.getElementsByClassName("precio");
            let cantidades = document.getElementsByClassName("cantidadesCart");

            for(let i = 0; i < precios.length; i++){

                sub[i].innerHTML = (precios[i].innerHTML * cantidades[i].value);               
            }
            document.getElementById("preFinal").innerHTML = "Total: " + precioFinal();
        })
    })
 });