function obtenerDatosFormulario() {
    const aliasVehiculo = document.getElementById("alias_vehiculo").value;
    const tipoVehiculo = document.getElementById("tipo_vehiculo").value;
    const marca = document.getElementById("marca").value;
    const modelo = document.getElementById("modelo").value;
    const año = parseInt(document.getElementById("año").value);
    const color = document.getElementById("color").value;
    const placa = document.getElementById("placa").value;
    const numSerieVIN = document.getElementById("num_serie_vin").value;
    const token = getCookie("token");

    const jsonVehiculo = {
        alias_vehiculo: aliasVehiculo,
        tipo_vehiculo: tipoVehiculo,
        marca: marca,
        modelo: modelo,
        año: año,
        color: color,
        placa: placa,
        num_serie_vin: numSerieVIN,
        token: token
    };
    return jsonVehiculo;
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

function enviarFormulario() {
    const formData = obtenerDatosFormulario();
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    };

    fetch('http://localhost:8080/createVehicle', requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.statusText);
            } else {
                return response.json();
            }
        }).then(data => {
            console.log('Respuesta del servidor:', data);
            window.location.href="../html/vehiculosRegistrados.html"
        }).catch(error => {
            console.error('Error:', error);
        });
}

document.getElementById('formVehiculo').addEventListener('submit', function (event) {
    event.preventDefault();
    enviarFormulario();
});
