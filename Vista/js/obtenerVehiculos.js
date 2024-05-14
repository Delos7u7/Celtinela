function ObtenerCookieDocumento() {
    const token2 = getCookie("token");
    const token = token2
    console.log("Este es el token: "+ token);
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
    const url = `http://localhost:8080/getvehicles?token=${token}`; // Agregar el token como parámetro en la URL

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
        }).catch(error => {
            console.error('Error:', error);
        });
}

document.addEventListener('DOMContentLoaded', function() {
    enviarToken();
});