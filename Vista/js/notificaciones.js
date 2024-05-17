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

notificationIcon.addEventListener('click', () => {
  notificationContainer.classList.toggle('show');
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