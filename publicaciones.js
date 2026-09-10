const sesionPublicacion = JSON.parse(localStorage.getItem('longcont_sesion') || 'null');
if (!sesionPublicacion) window.location.replace('./login.html');

document.getElementById('autor-publicacion').textContent = `Publicás como ${sesionPublicacion.nombre}`;
const formPublicacion = document.getElementById('form-publicacion');
const tituloPublicacion = document.getElementById('titulo-publicacion');
const categoriaPublicacion = document.getElementById('categoria-publicacion');
const descripcionPublicacion = document.getElementById('descripcion-publicacion');
const imagenPublicacion = document.getElementById('imagen-publicacion');
const mensajePublicacion = document.getElementById('mensaje-publicacion');
const vistaImagen = document.getElementById('vista-imagen');

function escapar(texto) { return String(texto).replace(/[&<>'"]/g, (c) => ({ '&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;' })[c]); }
function actualizarVista() { document.getElementById('vista-titulo').textContent = tituloPublicacion.value || 'Título de la publicación'; document.getElementById('vista-categoria').textContent = (categoriaPublicacion.value || 'CATEGORÍA').toUpperCase(); document.getElementById('vista-descripcion').textContent = descripcionPublicacion.value || 'La descripción aparecerá aquí.'; }
function renderizarMisPublicaciones() { const posts = JSON.parse(localStorage.getItem('longcont_publicaciones') || '[]').filter((post) => post.autorEmail === sesionPublicacion.email); document.getElementById('lista-mis-publicaciones').innerHTML = posts.length ? posts.map((post) => `<article class="publicacion-item"><strong>${escapar(post.titulo)}</strong><p>${escapar(post.categoria)} · ${escapar(post.descripcion)}</p></article>`).join('') : '<p>Todavía no creaste publicaciones.</p>'; }
[tituloPublicacion,categoriaPublicacion,descripcionPublicacion].forEach((field) => field.addEventListener('input', actualizarVista));
imagenPublicacion.addEventListener('change', () => { const file = imagenPublicacion.files[0]; if (!file) return; if (file.size > 1024 * 1024) { mensajePublicacion.textContent = 'La imagen debe pesar como máximo 1 MB.'; imagenPublicacion.value = ''; return; } const reader = new FileReader(); reader.onload = () => { vistaImagen.innerHTML = `<img src="${reader.result}" alt="">`; }; reader.readAsDataURL(file); });
formPublicacion.addEventListener('submit', (event) => { event.preventDefault(); if (!tituloPublicacion.value.trim() || !categoriaPublicacion.value || !descripcionPublicacion.value.trim()) { mensajePublicacion.textContent = 'Completá todos los campos requeridos.'; return; } const posts = JSON.parse(localStorage.getItem('longcont_publicaciones') || '[]'); posts.unshift({ titulo: tituloPublicacion.value.trim(), categoria: categoriaPublicacion.value, descripcion: descripcionPublicacion.value.trim(), imagen: vistaImagen.querySelector('img')?.src || '', autorNombre: sesionPublicacion.nombre, autorUsuario: sesionPublicacion.username || '', autorEmail: sesionPublicacion.email, creadaEn: new Date().toISOString() }); localStorage.setItem('longcont_publicaciones', JSON.stringify(posts)); formPublicacion.reset(); vistaImagen.textContent = 'Sin imagen'; actualizarVista(); mensajePublicacion.textContent = 'Publicación creada correctamente.'; renderizarMisPublicaciones(); });
renderizarMisPublicaciones();
