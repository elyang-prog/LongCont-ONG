const aportesSobreNosotros = JSON.parse(localStorage.getItem('longcont_publicaciones') || '[]').filter((post) => post.destino === 'sobre-nosotros');
if (aportesSobreNosotros.length) {
  const seccion = document.createElement('section');
  seccion.className = 'contenido';
  seccion.innerHTML = `<p class="etiqueta">COMUNIDAD</p><h2>Publicaciones sobre LongCont</h2><div class="tarjetas">${aportesSobreNosotros.map((post) => `<a class="tarjeta" href="articulo-contenido.html?publicacion=${encodeURIComponent(post.id)}">${post.imagen ? `<img src="${post.imagen}" alt="">` : ''}<div><h3>${post.titulo}</h3><p>${post.categoria} · ${post.descripcion}</p></div></a>`).join('')}</div>`;
  document.querySelector('main > .contenido')?.after(seccion);
}
