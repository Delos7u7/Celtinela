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

window.addEventListener('load', function() {
    notificar();
});

const notificationIcon = document.querySelector('.notificationIcon');
const notificationContainer = document.querySelector('.notification-container');

notificationIcon.addEventListener('click', (event) => {
  event.stopPropagation(); // Evita que el clic en el icono se propague al documento
  notificationContainer.classList.toggle('show');
});

document.addEventListener('click', (event) => {
  // Verifica si el clic fue fuera del contenedor de notificaciones
  if (!notificationContainer.contains(event.target) && !notificationIcon.contains(event.target)) {
    notificationContainer.classList.remove('show');
  }
});
function notificar() {
  const token = ObtenerCookieDocumento();
  const url = `http://192.168.0.37:8080/notification?token=${token}`;
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('No se pudo obtener la respuesta del servidor.');
      }
      return response.json();
    })
    .then(data => {
      console.log('Respuesta de la notificacion:', data);
      mostrarNotificaciones(data);
    })
    .catch(error => {
      console.error('Error al obtener los datos del backend:', error.message);
    });
}

function mostrarNotificaciones(notificaciones) {
    const notificationContainer = document.querySelector('.notification-container');
    notificationContainer.innerHTML = ''; // Limpiar el contenido anterior

    if (notificaciones.length > 0) {
      document.getElementById("no-notification--id").textContent = "";
      document.getElementById("no-notification--id").textContent = notificaciones.length;
      document.getElementById("no-notification--id").classList.add('no-notification');
    } else if (notificaciones.length==0) {
      document.getElementById("no-notification--id").classList.remove('no-notification');
      document.getElementById("no-notification--id").textContent = "";
    }
  
    notificaciones.forEach(notificacion => {
      const notificationItem = document.createElement('div');
      notificationItem.classList.add('notification-item');
  
      const textContent = document.createElement('span');
      textContent.textContent = `¡ALERTA! de '${notificacion.alias}'`;
  
      const icon = document.createElement('i');
      icon.classList.add('bi', 'bi-arrow-up-right', 'icon-white');
  
      notificationItem.appendChild(textContent);
      notificationItem.appendChild(icon);
  
      // Agregar el evento de clic al notificationItem
      notificationItem.addEventListener('click', () => {
        const url = `../html/vehiculo.html?id_vehiculo=${notificacion.id}&alias_vehiculo=${encodeURIComponent(notificacion.alias)}&año=${notificacion.año}&color=${encodeURIComponent(notificacion.color)}&marca=${encodeURIComponent(notificacion.marca)}&modelo=${encodeURIComponent(notificacion.modelo)}&placa=${encodeURIComponent(notificacion.placa)}&num_serie_vin=${encodeURIComponent(notificacion.num_serie_vin)}`;
        window.location.href = url;
      });
  
      notificationContainer.appendChild(notificationItem);
    });
  }

  function cerrarSesion() {
    const token = ObtenerCookieDocumento();
    console.log("token para cerrar sesion: "+token);
    const url = 'http://192.168.0.37:8080/logout';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: token })
    })
    .then(response => {
        if (response.ok) {
            // Aquí puedes añadir lógica para redirigir al usuario a la página de login u otra acción
            console.log('Sesión cerrada exitosamente.');
            window.location.href = '../../index.html';
        } else {
            console.error('Error al cerrar la sesión.');
        }
    })
    .catch(error => {
        console.error('Error en la solicitud:', error);
    });
  } 

  document.getElementById('cerrarSesion').addEventListener('click', cerrarSesion);