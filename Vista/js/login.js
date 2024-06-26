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
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    };
  
    fetch('http://192.168.0.37:8080/loginUser', requestOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la solicitud');
        } else {
          console.log(response);
          return response.json();
        }
      })
      .then(data => {
        console.log(data.token);
        document.cookie = `token=${data.token}; max-age=3600`;
        console.log('Respuesta del servidor:', data);
        window.location.href = 'Vista/html/vehiculosRegistrados.html';
      })
      .catch(error => {
        document.getElementById("Usuario-incorrecto").textContent="Usuario y/o contraseña incorrecto"
      });
  }
  
  document.getElementById('miFormulario').addEventListener('submit', function (event) {
    event.preventDefault();
    enviarFormulario();
  });