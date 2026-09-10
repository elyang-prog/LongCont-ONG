if (!window.LongContI18n) {
  const idiomaScript = document.createElement('script');
  idiomaScript.src = location.pathname.includes('/informacion/') ? '../i18n.js' : './i18n.js';
  idiomaScript.defer = true;
  document.head.append(idiomaScript);
}
if (location.pathname.includes('/informacion/')) {
  const publicacionesInformacion = document.createElement('script');
  publicacionesInformacion.src = '../informacion-publicaciones.js';
  publicacionesInformacion.defer = true;
  document.head.append(publicacionesInformacion);
}
if (location.pathname.endsWith('/participacion.html')) {
  const publicacionesParticipacion = document.createElement('script');
  publicacionesParticipacion.src = './participacion-publicaciones.js';
  publicacionesParticipacion.defer = true;
  document.head.append(publicacionesParticipacion);
}
if (location.pathname.endsWith('/sobre-nosotros.html')) {
  const publicacionesSobreNosotros = document.createElement('script');
  publicacionesSobreNosotros.src = './sobre-publicaciones.js';
  publicacionesSobreNosotros.defer = true;
  document.head.append(publicacionesSobreNosotros);
}

const abrirMenuPagina = document.querySelector('.pagina-menu');
const menuPagina = document.querySelector('.pagina-menu-overlay');
const cerrarMenuPagina = document.querySelector('.pagina-menu-cerrar');

if (abrirMenuPagina && menuPagina && cerrarMenuPagina) {
  const abrirMenu = () => { menuPagina.hidden = false; document.body.style.overflow = 'hidden'; cerrarMenuPagina.focus(); };
  const cerrarMenu = () => { menuPagina.hidden = true; document.body.style.overflow = ''; abrirMenuPagina.focus(); };
  abrirMenuPagina.addEventListener('click', abrirMenu);
  cerrarMenuPagina.addEventListener('click', cerrarMenu);
  menuPagina.querySelectorAll('a').forEach((enlace) => enlace.addEventListener('click', cerrarMenu));
  document.addEventListener('keydown', (evento) => { if (evento.key === 'Escape' && !menuPagina.hidden) cerrarMenu(); });
}
