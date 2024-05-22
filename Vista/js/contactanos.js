function showSection(sectionId) {
    // Oculta todas las secciones
    document.querySelectorAll('.section').forEach(function(section) {
        section.style.display = 'none';
    });

    // Muestra la sección seleccionada
    document.getElementById(sectionId).style.display = 'block';

    // Remueve la clase 'active' de todos los enlaces
    document.querySelectorAll('.navbar a').forEach(function(link) {
        link.classList.remove('active');
    });

    // Agrega la clase 'active' al enlace seleccionado
    document.querySelector(`.navbar a[href="#${sectionId}"]`).classList.add('active');
}

// Inicializa mostrando la sección 'contacto'
document.addEventListener('DOMContentLoaded', function() {
    showSection('contacto');
});