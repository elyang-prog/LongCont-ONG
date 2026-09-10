const grillaNovedades = document.querySelector('#novedades-recientes .tarjetas');
const grillaAntiguas = document.querySelector('#novedades-antiguas .tarjetas');

function escaparHTML(texto) {
  return String(texto).replace(/[&<>'"]/g, (caracter) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[caracter]);
}

function mostrarNovedades() {
  const publicaciones = JSON.parse(localStorage.getItem('longcont_publicaciones') || '[]').filter((publicacion) => publicacion.destino === 'novedades');
  if (!publicaciones.length) return;
  const limiteAntiguedad = 8 * 24 * 60 * 60 * 1000;
  const crearTarjeta = (publicacion) => {
    const fecha = publicacion.creadaEn ? new Intl.DateTimeFormat('es-AR', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(publicacion.creadaEn)).toUpperCase() : 'RECIENTE';
    const autor = publicacion.autorNombre ? ` · ${escaparHTML(publicacion.autorNombre)}` : '';
    return `<article class="tarjeta">${publicacion.imagen ? `<img src="${publicacion.imagen}" alt="">` : '<div class="tarjeta-sin-imagen">✦</div>'}<div><p class="etiqueta">${escaparHTML(publicacion.categoria).toUpperCase()} · ${fecha}${autor}</p><h3>${escaparHTML(publicacion.titulo)}</h3><p>${escaparHTML(publicacion.descripcion)}</p><a class="boton" href="articulo-contenido.html?publicacion=${encodeURIComponent(publicacion.id)}">Leer artículo →</a></div></article>`;
  };
  const recientes = publicaciones.filter((publicacion) => !publicacion.creadaEn || Date.now() - new Date(publicacion.creadaEn).getTime() < limiteAntiguedad);
  const antiguas = publicaciones.filter((publicacion) => publicacion.creadaEn && Date.now() - new Date(publicacion.creadaEn).getTime() >= limiteAntiguedad);
  if (recientes.length) grillaNovedades.insertAdjacentHTML('afterbegin', recientes.map(crearTarjeta).join(''));
  if (antiguas.length) grillaAntiguas.insertAdjacentHTML('afterbegin', antiguas.map(crearTarjeta).join(''));
}

mostrarNovedades();
