function ObtenerDatoasFormularios() {
    const nombre = document.getElementById("nombre").value
    const correo = document.getElementById("correo").value
    const contrasenia = document.getElementById("contrasenia").value


    const jsonUser = {
        nombre: nombre,
        correo: correo,
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

    fetch('http://localhost:8080/createUser', requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud');
            } else {
                window.location.href = '../../index.html';
                return response.json();
            }
        }).then(data => {
            console.log('Respuesta del servidor:', data);
        }).catch(error => {
            console.error('Error:', error);
        });
}

document.getElementById('miFormulario').addEventListener('submit', function (event) {
    event.preventDefault();
    enviarFormulario();
})

