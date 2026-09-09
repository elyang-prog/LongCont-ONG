const navegacion = document.getElementById('overlay-navegacion');
const busqueda = document.getElementById('overlay-busqueda');
const campoBusqueda = document.getElementById('campo-busqueda');

function abrir(overlay) {
  overlay.classList.remove('oculto');
  document.body.style.overflow = 'hidden';
  if (overlay === busqueda) setTimeout(() => campoBusqueda.focus(), 50);
}

function cerrar(overlay) {
  overlay.classList.add('oculto');
  if (navegacion.classList.contains('oculto') && busqueda.classList.contains('oculto')) document.body.style.overflow = '';
}

document.getElementById('abrir-navegacion').addEventListener('click', () => abrir(navegacion));
document.getElementById('cerrar-navegacion').addEventListener('click', () => cerrar(navegacion));
document.getElementById('abrir-busqueda').addEventListener('click', () => abrir(busqueda));
document.getElementById('abrir-busqueda-desde-menu').addEventListener('click', () => {
  cerrar(navegacion);
  abrir(busqueda);
});
document.getElementById('cerrar-busqueda').addEventListener('click', () => cerrar(busqueda));

document.querySelectorAll('.columna-navegacion a').forEach((enlace) => {
  enlace.addEventListener('click', () => cerrar(navegacion));
});

[navegacion, busqueda].forEach((overlay) => overlay.addEventListener('click', (event) => {
  if (event.target === overlay) cerrar(overlay);
}));

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  cerrar(navegacion);
  cerrar(busqueda);
});

document.getElementById('form-busqueda').addEventListener('submit', (event) => {
  event.preventDefault();
  const termino = campoBusqueda.value.trim();
  if (termino) window.location.hash = 'novedades';
  cerrar(busqueda);
});


