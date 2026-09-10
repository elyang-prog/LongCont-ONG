const articulosInformacion = JSON.parse(localStorage.getItem('longcont_publicaciones') || '[]').filter((post) => post.destino === 'informacion');
if (articulosInformacion.length) {
  const seccion = document.createElement('section');
  seccion.className = 'clasificacion-grupo';
  seccion.innerHTML = `<div class="grupo-cabecera"><p>COMUNIDAD</p><h3>Artículos agregados</h3></div><div class="tarjetas tarjetas--tres">${articulosInformacion.map((post) => `<a class="tarjeta" href="../articulo-contenido.html?publicacion=${encodeURIComponent(post.id)}">${post.imagen ? `<img src="${post.imagen}" alt="">` : ''}<div><h4>${post.titulo}</h4><p>${post.categoria} · ${post.descripcion}</p></div></a>`).join('')}</div>`;
  document.querySelector('.clasificaciones')?.append(seccion);
}
