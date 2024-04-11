function openModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "block";
}

function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "none";
}

function saveUsername() {
    var newUsername = document.getElementById("newUsername").value;
    document.getElementById("username").textContent = newUsername;
    closeModal('usernameModal');
}

function savePassword() {
    var newPassword = document.getElementById("newPassword").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    if (newPassword === confirmPassword) {
        document.getElementById("password").textContent = newPassword;
        closeModal('passwordModal');
    } else {
        alert("Las contraseñas no coinciden");
    }
}


// Obtiene la longitud de la contraseña y crea una cadena de puntos del mismo tamaño
function maskPassword() {
    var passwordElement = document.getElementById("passwordDisplay");
    var passwordLength = passwordElement.textContent.length;
    var maskedPassword = "•".repeat(passwordLength);
    passwordElement.textContent = maskedPassword;
}

// Llama a maskPassword() cuando se carga la página
window.onload = maskPassword;

function openModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.style.display = "block";
    setTimeout(function() {
        modal.classList.add("open");
    }, 100); // Delay para permitir que el modal se muestre antes de aplicar la animación
}

function closeModal(modalId) {
    var modal = document.getElementById(modalId);
    modal.classList.remove("open");
    setTimeout(function() {
        modal.style.display = "none";
    }, 100); // Reducimos el tiempo de espera para cerrar el modal
}