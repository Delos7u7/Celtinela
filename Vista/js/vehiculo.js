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
            location.reload();  
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function getAlerts() {
  const id_vehiculo = decodeURIComponent(params.get('id_vehiculo'));
  const url = `http://192.168.0.37:8080/getAlerts?id_vehiculo=${id_vehiculo}`;
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  fetch(url, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la solicitud: ' + response.statusText);
      } else {
        return response.json();
      }
    })
    .then(data => {
      console.log('Respuesta del servidor (getVehicle):', data);
      generarFilasTabla(data); // Llamamos a la función para generar las filas de la tabla
    })
    .catch(error => {
      console.error('Error:', error);
    });
}


function generarFilasTabla(datos) {
  const contenedorTabla = document.querySelector('.alert-table--body');
  contenedorTabla.innerHTML = ''; // Limpiamos el contenido previo

  if (datos.length === 0) {
    const sinAlertas = document.createElement('p');
    sinAlertas.textContent = 'No hay alertas disponibles.';
    contenedorTabla.appendChild(sinAlertas);
  } else {
    datos.forEach(alerta => {
      const fila = document.createElement('div');
      fila.classList.add('alert-row');
      fila.style.display = 'flex';
      fila.style.justifyContent = 'space-evenly';
      fila.style.width = '100%'; // Agregamos width: 100%

      const noAlerta = document.createElement('p');
      noAlerta.textContent = alerta.id_alerta;
      noAlerta.classList.add('id-alerta');
      noAlerta.style.width = '25%';
      noAlerta.style.fontSize = '10px';
      fila.appendChild(noAlerta);

      const latitud = document.createElement('p');
      latitud.textContent = alerta.latitud;
      latitud.classList.add('latitud');
      latitud.style.width = '25%';
      fila.appendChild(latitud);

      const longitud = document.createElement('p');
      longitud.textContent = alerta.longitud;
      longitud.classList.add('longitud');
      longitud.style.width = '25%';
      fila.appendChild(longitud);

      const fecha = document.createElement('p');
      fecha.textContent = alerta.fecha;
      fecha.classList.add('fecha');
      fecha.style.width = '25%';
      fila.appendChild(fecha);

      contenedorTabla.appendChild(fila);
    });
  }
}

function changeAlertState() {
  const id_vehiculo = decodeURIComponent(params.get('id_vehiculo'));
  const url = `http://192.168.0.37:8080/changeAlertState?id_vehiculo=${id_vehiculo}`;
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  fetch(url, requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la solicitud: ' + response.statusText);
      } else {
        return response.json();
      }
    })
    .then(data => {
      console.log('Respuesta del servidor (changeAlertState):', data);
      location.reload();  

    })
    .catch(error => {
      console.error('Error:', error);
    });
}

document.getElementById('modal-form').addEventListener('submit', function (event) {
    event.preventDefault();
    linkDevice();
  });


  document.addEventListener('DOMContentLoaded', function() {
    getAlerts();
});

var btnCorrecto = document.getElementById('correcto');

// Añadir evento de clic al botón de correcto
btnCorrecto.onclick = function() {
  changeAlertState();
}





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
var modalRevisarAlerta = document.getElementById('modal-revisar-alerta');
var btnAbrirModal = document.querySelector('.vincular-dispositivo button');
var btnAbrirModalRevisarAlerta = document.querySelector('.revisar-alerta button');
var btnCerrarModal = modal.querySelector('.close');
var btnCerrarModalRevisarAlerta = modalRevisarAlerta.querySelector('.close');
var btnIncorrecto = document.getElementById('incorrecto');

// Función para abrir el primer modal
btnAbrirModal.onclick = function() {
  modal.style.display = 'block';
}

// Función para cerrar el primer modal
btnCerrarModal.onclick = function() {
  modal.style.display = 'none';
}

// Función para abrir el segundo modal
btnAbrirModalRevisarAlerta.onclick = function() {
  modalRevisarAlerta.style.display = 'block';
}

// Función para cerrar el segundo modal
btnCerrarModalRevisarAlerta.onclick = function() {
  modalRevisarAlerta.style.display = 'none';
}

// Cerrar el segundo modal al hacer clic en el botón "x" rojo
btnIncorrecto.onclick = function() {
  modalRevisarAlerta.style.display = 'none';
}

// Cerrar los modales cuando se hace clic fuera de ellos
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  } else if (event.target == modalRevisarAlerta) {
    modalRevisarAlerta.style.display = 'none';
  }
}