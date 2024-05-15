// Leer los parámetros de la URL
const params = new URLSearchParams(window.location.search);
const id_vehiculo = decodeURIComponent(params.get('id_vehiculo'))
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




function linkDevice() {
    const id_dispositivo = document.getElementById("numero_serie").value;

    const params = new URLSearchParams(window.location.search);
    const id_vehiculo = decodeURIComponent(params.get('id_vehiculo'));
    
    const data = {
        id_dispositivo: id_dispositivo,
        id_vehiculo: id_vehiculo
    };
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    console.log(data);
    const url = `http://192.168.0.37:8080/linkDevice`;
    fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al enviar los datos al backend');
            }
            return response.json();
        })
        .then(data => {
            console.log('Datos recibidos desde el backend:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}




document.getElementById('modal-form').addEventListener('submit', function (event) {
    event.preventDefault();
    linkDevice();
  });








const mostrarMasBtn = document.querySelector('.button-mostras-mas');
const mostrarMasContainer = document.querySelector('.mostrar-mas');
const clonMostrarMas = document.querySelector('.clon-mostrar-mas');

mostrarMasBtn.addEventListener('click', () => {
  mostrarMasContainer.classList.toggle('active');
});

clonMostrarMas.addEventListener('click', () => {
  mostrarMasContainer.classList.remove('active');
});

// Obtener elementos del DOM
var modal = document.getElementById('modal');
var btnAbrirModal = document.querySelector('.vincular-dispositivo');
var btnCerrarModal = document.querySelector('.close');

// Función para abrir el modal
btnAbrirModal.onclick = function() {
  modal.style.display = 'block';
}

// Función para cerrar el modal
btnCerrarModal.onclick = function() {
  modal.style.display = 'none';
}

// Cerrar el modal cuando se hace clic fuera de él
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}