const ORDER_ASC_BY_COST = "Precio ASC";
const ORDER_DESC_BY_COST = "Precio DESC";
const ORDER_BY_PROD_COST = "Precio.";
var currentProductArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
var categoriesArray = [];

function sortProduct(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COST){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.productCost);
            let bCount = parseInt(b.productCost);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}

function showProductList(array){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductArray.length; i++){
        let category = currentProductArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.cost) >= minCount)) &&
        ((maxCount == undefined) || (maxCount != undefined && parseInt(category.cost) <= maxCount))){

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ category.name + "-" + category.currency +" " + category.cost + `</h4>
                        <small class="text-muted">` + category.soldCount + " " + "vendidos" +  `</small>
                    </div>
                 <small class="text-muted">` + category.description + ` </small>
                </div>
            </div>
        </div>
        `
    }
        document.getElementById("products").innerHTML = htmlContentToAppend;

    }
    
}

function sortAndShowProduct(sortCriteria, productArray){
    currentSortCriteria = sortCriteria;

    if(productArray != undefined){
        currentProductArray = productArray;
    }

    currentProductArray = sortProduct(currentSortCriteria, currentProductArray);

    //Muestro las categorías ordenadas
    showProductList();
}

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProduct(ORDER_ASC_BY_COST, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProduct(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProduct(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByCost").addEventListener("click", function(){
        sortAndShowProduct(ORDER_BY_PROD_COST);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductList();
    });
});