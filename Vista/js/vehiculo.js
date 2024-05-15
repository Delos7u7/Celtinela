// Leer los parámetros de la URL
const params = new URLSearchParams(window.location.search);
const nombre = decodeURIComponent(params.get('alias_vehiculo'));
const año = params.get('año');
const marca = decodeURIComponent(params.get('marca'));
const modelo = decodeURIComponent(params.get('modelo'));
const placas = decodeURIComponent(params.get('placa'));
const serie = decodeURIComponent(params.get('num_serie_vin'));

// Establecer los datos en los elementos HTML
document.getElementById('nombre').textContent = nombre;
document.getElementById('marca').textContent = marca;
document.getElementById('año').textContent = año;
document.getElementById('modelo').textContent = modelo;
document.getElementById('placas').textContent = placas;
document.getElementById('serie').textContent = serie;
