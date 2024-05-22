function ObtenerCookieDocumento() {
    const token = getCookie("token");
    console.log("Este es el token: " + token);
    return token;
}

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

function enviarToken() {
    const token = ObtenerCookieDocumento(); // Obtener el token de las cookies
    const url = `http://178.6.5.213:8080/getvehicles?token=${token}`; // Agregar el token como parámetro en la URL

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    };

    fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            } else {
                return response.json();
            }
        }).then(data => {
            console.log('Respuesta del servidor:', data);
            const tablaVehiculosContainer = document.querySelector('.tablaVehiculos--container');
            
            // Limpiar contenedor de vehículos
            tablaVehiculosContainer.innerHTML = '';

            // Crear la etiqueta <div> con clase tablaVehiculos
            const tablaVehiculosDiv = document.createElement('div');
            tablaVehiculosDiv.classList.add('tablaVehiculos');

            // Agregar la etiqueta tablaVehiculos al contenedor principal
            tablaVehiculosContainer.appendChild(tablaVehiculosDiv);
            
            // Iterar sobre los vehículos recibidos
            data.forEach((vehiculo, index) => {
                // Crear contenedor de vehículo
                const veiculoDiv = document.createElement('div');
                veiculoDiv.classList.add('veihuculo-no', `${index + 1}`, 'left-side-tableVehi'); // Clases del contenedor de vehículo
                
                // Añadir el evento de click
                veiculoDiv.addEventListener('click', () => {
                    getIdVehicle(token, vehiculo.id_vehiculo);
                });
                
                // Crear elementos para mostrar los datos del vehículo
                const aliasParrafo = document.createElement('div');
                aliasParrafo.classList.add('left-side-tableVehi--name');
                aliasParrafo.innerHTML = `<p>Alias:</p><p>${vehiculo.alias_vehiculo}</p>`;
                
                const placaParrafo = document.createElement('div');
                placaParrafo.classList.add('left-side-tableVehi--placa');
                placaParrafo.innerHTML = `<p>Placa:</p><p>${vehiculo.placa}</p>`;
                
                const noSerieParrafo = document.createElement('div');
                noSerieParrafo.classList.add('left-side-tableVehi--numberID');
                noSerieParrafo.innerHTML = `<p>No.Serie:</p><p>${vehiculo.num_serie_vin}</p>`;
                
                // Agregar los elementos al contenedor del vehículo
                veiculoDiv.appendChild(aliasParrafo);
                veiculoDiv.appendChild(placaParrafo);
                veiculoDiv.appendChild(noSerieParrafo);
                
                // Agregar el vehículo al contenedor principal
                tablaVehiculosDiv.appendChild(veiculoDiv);
            });
        
        }).catch(error => {
            console.error('Error:', error);
        });
}

function getIdVehicle(token, id_vehiculo) {
    const url = `http://178.6.5.213:8080/getVehicle?token=${token}&idVehiculo=${id_vehiculo}`;

    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    };

    fetch(url, requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            } else {
                return response.json();
            }
        }).then(data => {
            console.log('Respuesta del servidor (getVehicle):', data);
            // Hacer cualquier otra cosa con la respuesta del backend si es necesario
            
            // Redirigir a la página vehiculo.html después de procesar la respuesta
            window.location.href = `../html/vehiculo.html?id_vehiculo=${data.id_vehiculo}&alias_vehiculo=${encodeURIComponent(data.alias_vehiculo)}&año=${data.año}&color=${encodeURIComponent(data.color)}&marca=${encodeURIComponent(data.marca)}&modelo=${encodeURIComponent(data.modelo)}&placa=${encodeURIComponent(data.placa)}&num_serie_vin=${encodeURIComponent(data.num_serie_vin)}`;
        }).catch(error => {
            console.error('Error:', error);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    enviarToken();
});