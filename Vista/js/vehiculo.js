// Leer los parámetros de la URL
const params = new URLSearchParams(window.location.search);
const id_vehiculo = decodeURIComponent(params.get('id_vehiculo'));
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

    const data = {
        id_dispositivo: id_dispositivo,
        id_vehiculo: id_vehiculo
    };

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    fetch(`http://192.168.1.29:8080/linkDevice`, requestOptions)
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
    const url = `http://192.168.1.29:8080/getAlerts?id_vehiculo=${id_vehiculo}`;
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Respuesta del servidor (getVehicle):', data);
            generarFilasTabla(data);

            if (data.length > 0) {
                // Actualiza el mapa con la ubicación más reciente
                const alertaMasReciente = data[0];
                updateMap(alertaMasReciente.latitud, alertaMasReciente.longitud);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function generarFilasTabla(datos) {
    const contenedorTabla = document.querySelector('.alert-table--body');
    contenedorTabla.innerHTML = '';

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
            fila.style.width = '100%';

            const campos = ['id_alerta', 'latitud', 'longitud', 'fecha'];
            campos.forEach(campo => {
                const celda = document.createElement('p');
                celda.textContent = alerta[campo];
                celda.classList.add(campo);
                celda.style.width = '25%';
                fila.appendChild(celda);
            });

            fila.addEventListener('click', () => {
                updateMap(alerta.latitud, alerta.longitud);
            });

            contenedorTabla.appendChild(fila);
        });
    }
}

function updateMap(latitud, longitud) {
    const mapa = document.querySelector('.mapa');
    const newSrc = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBIiZxQFCekeM29UC4gQD503JK0kLDf3Eg&q=${latitud},${longitud}`;
    mapa.src = newSrc;
}

function changeAlertState() {
    const url = `http://192.168.1.29:8080/changeAlertState?id_vehiculo=${id_vehiculo}`;
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            }
            return response.json();
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

document.getElementById('correcto').onclick = function() {
    changeAlertState();
};

const mostrarMasBtn = document.querySelector('.button-mostras-mas');
const mostrarMasContainer = document.querySelector('.mostrar-mas');
const clonMostrarMas = document.querySelector('.clon-mostrar-mas');

mostrarMasBtn.addEventListener('click', () => {
    mostrarMasContainer.classList.toggle('active');
});

clonMostrarMas.addEventListener('click', () => {
    mostrarMasContainer.classList.remove('active');
});

const modal = document.getElementById('modal');
const modalRevisarAlerta = document.getElementById('modal-revisar-alerta');
const btnAbrirModal = document.querySelector('.vincular-dispositivo button');
const btnAbrirModalRevisarAlerta = document.querySelector('.revisar-alerta button');
const btnCerrarModal = modal.querySelector('.close');
const btnCerrarModalRevisarAlerta = modalRevisarAlerta.querySelector('.close');
const btnIncorrecto = document.getElementById('incorrecto');

btnAbrirModal.onclick = function() {
    modal.style.display = 'block';
};

btnCerrarModal.onclick = function() {
    modal.style.display = 'none';
};

btnAbrirModalRevisarAlerta.onclick = function() {
    modalRevisarAlerta.style.display = 'block';
};

btnCerrarModalRevisarAlerta.onclick = function() {
    modalRevisarAlerta.style.display = 'none';
};

btnIncorrecto.onclick = function() {
    modalRevisarAlerta.style.display = 'none';
};

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    } else if (event.target == modalRevisarAlerta) {
        modalRevisarAlerta.style.display = 'none';
    }
};
