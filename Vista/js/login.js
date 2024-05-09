function ObtenerDatoasFormularios() {
    const nombre = document.getElementById("nombre").value
    const contrasenia = document.getElementById("contrasenia").value


    const jsonUser = {
        nombre: nombre,
        contrasenia: contrasenia
    }
    return jsonUser
}

function enviarFormulario() {
    const formData = ObtenerDatoasFormularios();
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    };

    fetch('http://localhost:8080/loginUser', requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            } else {
                return response.json();
            }
        }).then(data => {
            document.cookie = `token=${data.token}; max-age=3600; path=/`;
            console.log('Respuesta del servidor:', data);
            window.location.href = 'Vista/html/vehiculosRegistrados.html';
        }).catch(error => {
            console.error('Error:', error);
        });
}

document.getElementById('miFormulario').addEventListener('submit', function (event) {
    event.preventDefault();
    enviarFormulario();
})

