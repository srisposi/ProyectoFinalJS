//Creación de las cards con promociones utilizando ajax con JSON y jquery
$.ajax({
    method: 'GET',
    url: '../js/info.json'
}).done((info) => {
    console.log(info);
    //vehiculo = [...data];
    Cards(info);
}).fail((error) => {
    console.log(error);
}).always(() => {
    console.log(completado);
});

//Función para crear las cards
function Cards(info) {
    const divVehiculos = $('#vehiculosCards');
    $(info).each(function (precios, vehiculo) {
        divVehiculos.append(`
        <div class="col-sm-3 container__precios--cards">
        <div class="card" style="width: 100%;height: 100%;">
        <img class="card-img-top p-2" src="../img/iconos/${vehiculo.image}"  alt="...">
        <div class="card-body">
            <h5 class="card-title">${vehiculo.name}</h5>
            <p class="item-price">${vehiculo.precio}</p>
            <p class="card-text">${vehiculo.precio} de promoción para los refereifos de autos que se encuentran en el estacionamiento</p>
            <button onclick="obtenerValoresFinales(${vehiculo.id})" id="btnPromociones" class="btn btn-danger">Contratar</button> 
            </div>
        </div>
    </div>`)
    })
}

//Definición de variables para calcular los montos de usuario
//en función del vehículo y su estadía.
let acumula;
const obtenerValores = () => {
    let tipo = document.getElementById("cars").value;
    let hora = parseInt(document.getElementById("hora").value);
    let dia = parseInt(document.getElementById("dia").value);
    let mes = parseInt(document.getElementById("mes").value);
    let anio = parseInt(document.getElementById("anio").value);

    let resultado;
    switch (tipo) {
        case "moto":
            resultado = (hora * 55) + (dia * 90) + (mes * 1300) + (anio * 15000);
            acumula = (hora * 55) + (dia * 90) + (mes * 1300) + (anio * 15000);
            break;
        case "auto":
            resultado = (hora * 84) + (dia * 160) + (mes * 2500) + (anio * 30000);
            acumula = (hora * 84) + (dia * 160) + (mes * 2500) + (anio * 30000);
            break;
        case "pickup":
            resultado = (hora * 100) + (dia * 200) + (mes * 3000) + (anio * 36000);
            acumula = (hora * 100) + (dia * 200) + (mes * 3000) + (anio * 36000);
            break;
        default:
            resultado = (hora * 120) + (dia * 220) + (mes * 3600) + (anio * 43000);
            acumula = (hora * 120) + (dia * 220) + (mes * 3600) + (anio * 43000);
            break;
    }
    document.getElementById("resultado").innerHTML = resultado;
}

//Función para obtener valor final aplicando descuento por promoción
// que figura en las cards generadas con ajax en la función anterior
const obtenerValoresFinales = (e) => {
    let resultadoFinal;
    console.log(acumula)
    console.log(e)
    let tipo = parseInt(e);
    switch (e) {
        case 1:
            resultadoFinal = acumula * 0.9;
            break;
        case 2:
            resultadoFinal = acumula * 0.8;
            break;
        case 3:
            resultadoFinal = acumula * 0.75;
            break;
        case 4:
            resultadoFinal = acumula * 0.7;
            break;
    }
    console.log(resultadoFinal)
    document.getElementById("resultadoFinal").innerHTML = resultadoFinal;
}


