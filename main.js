const url = "https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=CLP";

const $moneda = document.getElementById("contenedor_item_moneda");
const $cripto = document.getElementById("contenedor_item_cripto");
const $cotizar = document.getElementById("contenedor_item_conversor");
const $mensaje = document.getElementById("contenedor_item_mensaje");

function obtenerDatos() {
  fetch(url)
    .then((response) => response.json())
    .then((datos) => {
      console.log(datos.Data);

      datos.Data.forEach((element) => {
        $cripto.innerHTML += `
        <option value="${element.CoinInfo.Name}">${element.CoinInfo.FullName} </option>
      `;
       });
    });
}

obtenerDatos();

//Funcionalidad de cotizar crypto
$cotizar.addEventListener("click", function () {
  $mensaje.innerHTML = "";

  if ($moneda.value == "" || $cripto.value == "") {
    $mensaje.innerHTML = "Debe ingresar los valores de conversion";
    return;
  }

  //Concatenar valor de url con input de la moneda
  let url_moneda = url.substring(0, url.length - 3) + $moneda.value;
  obtenerDatosMoneda(url_moneda, $cripto.value, $moneda.value);
  
});

function obtenerDatosMoneda(url_new, crypto , moneda) {
  fetch(url_new)
    .then((response) => response.json())
    .then((datos) => {
      console.log(datos.Data);
      $mensaje.innerHTML = "";
      datos.Data.forEach((element) => {
        if (element.CoinInfo.Name == crypto) {
          console.log(element.DISPLAY[moneda]);
          $mensaje.innerHTML = `
          <p>Precio: ${element.DISPLAY[moneda].PRICE }</p>
          <p>Precio más alto del día: ${element.DISPLAY[moneda].HIGHDAY }</p>
          <p>Precio más bajo del día: ${element.DISPLAY[moneda].LOWDAY }</p>
          <p>Variación últimas 24 horas: ${element.DISPLAY[moneda].CHANGE24HOUR }</p>
          <p>Última Actualización: ${element.DISPLAY[moneda].LASTUPDATE }</p>

          
          
                                `;
        }
      });
    });
}
