document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('.menuIcon');
    const sideNav = document.querySelector('.navMenu');
    const content = document.querySelector('.content');
  
    menuIcon.addEventListener('click', () => {
      sideNav.classList.toggle('show');
    });
  
    content.addEventListener('click', (event) => {
      // Si el menú está abierto y el clic ocurre fuera del menú, ciérralo
      if (sideNav.classList.contains('show') && !sideNav.contains(event.target) && event.target !== menuIcon) {
        sideNav.classList.remove('show');
      }
    });
  });