const ochoDias = 8 * 24 * 60 * 60 * 1000;
const noticiasDeUsuarios = JSON.parse(localStorage.getItem('longcont_publicaciones') || '[]').filter((post) => post.destino === 'novedades' && (!post.creadaEn || Date.now() - new Date(post.creadaEn).getTime() < ochoDias));
if (noticiasDeUsuarios.length) {
  const contenedor = document.querySelector('#novedades-recientes .nov-contenedor');
  if (contenedor) {
    contenedor.insertAdjacentHTML('afterbegin', noticiasDeUsuarios.map((post) => `<article class="nov-tarjeta">${post.imagen ? `<img src="${post.imagen}" alt="" class="nov-imagen">` : ''}<div class="nov-fecha">${post.categoria.toUpperCase()} · ${post.autorNombre}</div><h3>${post.titulo}</h3><p>${post.descripcion}</p><a class="nov-ver-mas" href="articulo-contenido.html?publicacion=${encodeURIComponent(post.id)}">Leer artículo →</a><a class="nov-ver-mas" href="${post.urlOriginal}" target="_blank" rel="noopener noreferrer">Noticia original ↗</a></article>`).join(''));
  }
}
