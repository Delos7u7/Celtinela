document.getElementById("fileUpload").addEventListener("change", function() {
  // Verificar si se cargó correctamente una imagen
  if (this.files && this.files[0]) {
      // Aquí puedes realizar cualquier otra acción relacionada con el manejo de la imagen
      // Por ejemplo, mostrar la imagen cargada en algún lugar de tu página
      var reader = new FileReader();
      reader.onload = function(e) {
          document.getElementById("previewImage").src = e.target.result;
      }
      reader.readAsDataURL(this.files[0]);
      
      // Cambiar la clase del label al de la palomita
      var labelElement = document.querySelector('.icon--container label');
      labelElement.classList.remove('bi', 'bi-upload', 'iconCamera');
      labelElement.classList.add('bi', 'bi-check', 'iconSuccess');
  }
});
