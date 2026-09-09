const sidebar = document.getElementById('sidebar');
const botonContraer = document.getElementById('contraer-sidebar');
const botonAbrir = document.getElementById('abrir-sidebar');
const sesion = JSON.parse(localStorage.getItem('longcont_sesion') || 'null');

if (!sesion) {
  window.location.replace('./login.html');
} else {
  const iniciales = sesion.nombre.split(' ').filter(Boolean).slice(0, 2).map((nombre) => nombre[0]).join('').toUpperCase();
  document.getElementById('nombre-usuario').textContent = `Hola, ${sesion.nombre}`;
  document.getElementById('avatar-usuario').textContent = iniciales || 'LC';
}

botonContraer.addEventListener('click', () => {
  sidebar.classList.toggle('contraida');
  botonContraer.setAttribute('aria-expanded', String(!sidebar.classList.contains('contraida')));
});

botonAbrir.addEventListener('click', () => {
  sidebar.classList.toggle('abierta');
});

document.querySelectorAll('.sidebar-enlaces a').forEach((enlace) => {
  enlace.addEventListener('click', () => {
    document.querySelector('.sidebar-enlaces .activo')?.classList.remove('activo');
    enlace.classList.add('activo');
    sidebar.classList.remove('abierta');
  });
});

document.getElementById('cerrar-sesion').addEventListener('click', () => {
  localStorage.removeItem('longcont_sesion');
  window.location.href = './login.html';
});

const formSubirContenido = document.getElementById('form-subir-contenido');
const tituloContenido = document.getElementById('titulo-contenido');
const categoriaContenido = document.getElementById('categoria-contenido');
const descripcionContenido = document.getElementById('descripcion-contenido');
const imagenContenido = document.getElementById('imagen-contenido');
const mensajeSubir = document.getElementById('mensaje-subir-contenido');
const previewImagen = document.getElementById('preview-imagen');
const previewCategoria = document.getElementById('preview-categoria');
const previewTitulo = document.getElementById('preview-titulo');
const previewDescripcion = document.getElementById('preview-descripcion');

function actualizarVistaPrevia() {
  previewCategoria.textContent = categoriaContenido.value || 'CATEGORÍA';
  previewTitulo.textContent = tituloContenido.value.trim() || 'Título de la publicación';
  previewDescripcion.textContent = descripcionContenido.value.trim() || 'La descripción breve aparecerá aquí mientras escribís.';
}

[tituloContenido, categoriaContenido, descripcionContenido].forEach((campo) => campo.addEventListener('input', actualizarVistaPrevia));

imagenContenido.addEventListener('change', () => {
  const archivo = imagenContenido.files[0];
  if (!archivo) return;
  if (archivo.size > 1024 * 1024) {
    mensajeSubir.textContent = 'Elegí una imagen de hasta 1 MB para guardarla localmente.';
    imagenContenido.value = '';
    return;
  }
  const lector = new FileReader();
  lector.addEventListener('load', () => { previewImagen.innerHTML = `<img src="${lector.result}" alt="Vista previa">`; });
  lector.readAsDataURL(archivo);
});

function renderizarPublicaciones() {
  const publicaciones = JSON.parse(localStorage.getItem('longcont_publicaciones') || '[]');
  const lista = document.getElementById('lista-publicaciones');
  if (!publicaciones.length) {
    lista.innerHTML = '<p class="sin-publicaciones">Aún no hay publicaciones guardadas en este navegador.</p>';
    return;
  }
  const escaparHTML = (texto) => String(texto).replace(/[&<>'"]/g, (caracter) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[caracter]);
  lista.innerHTML = publicaciones.map((publicacion) => `<article class="publicacion-local">${publicacion.imagen ? `<img src="${publicacion.imagen}" alt="">` : '<div class="miniatura-local">✦</div>'}<div><span>${escaparHTML(publicacion.categoria).toUpperCase()}</span><h4>${escaparHTML(publicacion.titulo)}</h4><p>${escaparHTML(publicacion.descripcion)}</p></div></article>`).join('');
}

formSubirContenido.addEventListener('submit', (event) => {
  event.preventDefault();
  mensajeSubir.classList.remove('exito');
  if (!tituloContenido.value.trim() || !categoriaContenido.value || !descripcionContenido.value.trim()) {
    mensajeSubir.textContent = 'Completá título, categoría y descripción para guardar el contenido.';
    return;
  }
  const publicaciones = JSON.parse(localStorage.getItem('longcont_publicaciones') || '[]');
  publicaciones.unshift({ titulo: tituloContenido.value.trim(), categoria: categoriaContenido.value, descripcion: descripcionContenido.value.trim(), imagen: previewImagen.querySelector('img')?.src || '' });
  localStorage.setItem('longcont_publicaciones', JSON.stringify(publicaciones));
  formSubirContenido.reset();
  previewImagen.textContent = 'Sin imagen';
  actualizarVistaPrevia();
  mensajeSubir.classList.add('exito');
  mensajeSubir.textContent = 'Contenido guardado localmente en este navegador.';
  renderizarPublicaciones();
});

document.getElementById('limpiar-publicaciones').addEventListener('click', () => {
  localStorage.removeItem('longcont_publicaciones');
  renderizarPublicaciones();
});

renderizarPublicaciones();
