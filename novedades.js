const grillaNovedades = document.getElementById('grilla-novedades');

function escaparHTML(texto) {
  return String(texto).replace(/[&<>'"]/g, (caracter) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[caracter]);
}

function mostrarNovedades() {
  const publicaciones = JSON.parse(localStorage.getItem('longcont_publicaciones') || '[]');
  if (!publicaciones.length) {
    grillaNovedades.innerHTML = '<article class="sin-contenido"><h3>Todavía no hay publicaciones</h3><p>Creá la primera desde <a href="./panel.html#publicaciones-panel">Publicaciones</a> en el panel.</p></article>';
    return;
  }
  grillaNovedades.innerHTML = publicaciones.map((publicacion) => `<article class="tarjeta-novedad">${publicacion.imagen ? `<img class="tarjeta-imagen" src="${publicacion.imagen}" alt="">` : '<div class="tarjeta-sin-imagen">✦</div>'}<div class="tarjeta-cuerpo"><span class="tarjeta-categoria">${escaparHTML(publicacion.categoria).toUpperCase()}</span><h3>${escaparHTML(publicacion.titulo)}</h3><p>${escaparHTML(publicacion.descripcion)}</p><p class="tarjeta-fecha">Guardado localmente</p></div></article>`).join('');
}

mostrarNovedades();
