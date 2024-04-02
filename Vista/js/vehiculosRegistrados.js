const menuIcon = document.querySelector('.menuIcon');
const sideNav = document.querySelector('.sideNav');

menuIcon.addEventListener('click', () => {
  sideNav.classList.toggle('show');
});