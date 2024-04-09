const cameraButton = document.getElementById('cameraButton');
const cameraPreview = document.getElementById('cameraPreview');
const cameraCanvas = document.getElementById('cameraCanvas');
const captureButton = document.getElementById('captureButton');
let cameraStream = null;

// Función para acceder a la cámara
async function accessCamera() {
  try {
    cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
    cameraPreview.srcObject = cameraStream;
    cameraPreview.style.display = 'block';
    cameraButton.style.display = 'none';
    captureButton.style.display = 'inline-block';
  } catch (error) {
    console.error('Error al acceder a la cámara:', error);
    alert('No se pudo acceder a la cámara. Asegúrate de que has dado los permisos necesarios.');
  }
}

// Función para tomar una foto
function takePhoto() {
  const canvas = cameraCanvas;
  const context = canvas.getContext('2d');
  context.drawImage(cameraPreview, 0, 0, canvas.width, canvas.height);
  cameraPreview.style.display = 'none';
  canvas.style.display = 'block';
  captureButton.style.display = 'none';
  // Aquí puedes guardar o cargar la imagen capturada
}

// Evento click en el botón de la cámara
cameraButton.addEventListener('click', accessCamera);

// Evento click en el botón de tomar foto
captureButton.addEventListener('click', takePhoto);