const sidebar = document.getElementById('sidebar');
const botonContraer = document.getElementById('contraer-sidebar');
const botonAbrir = document.getElementById('abrir-sidebar');
const sesion = JSON.parse(localStorage.getItem('longcont_sesion') || 'null');

if (!sesion) {
  window.location.replace('./login.html');
} else {
  const iniciales = sesion.nombre.split(' ').filter(Boolean).slice(0, 2).map((nombre) => nombre[0]).join('').toUpperCase();
  const actualizarSaludo = () => {
    const idioma = window.LongContI18n?.getLanguage() || 'es';
    const saludos = { es: ['Hola, ', 'Bienvenido a '], en: ['Hello, ', 'Welcome, '], zh: ['你好，', '欢迎，'] };
    document.getElementById('nombre-usuario').textContent = `${saludos[idioma][0]}${sesion.nombre}`;
    document.getElementById('bienvenida-nombre').textContent = `${saludos[idioma][1]}${sesion.nombre}`;
  };
  actualizarSaludo();
  document.addEventListener('longcont:languagechange', actualizarSaludo);
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

const mesCalendario = document.getElementById('calendario-mes-actual');
const diasCalendario = document.getElementById('dias-calendario');
let fechaCalendario = new Date(2026, 8, 1);
const eventosBase = [{ fecha: '2026-09-08', titulo: 'Encuentro de comunidad', hora: '18:00', detalle: 'Modalidad online' }, { fecha: '2026-09-18', titulo: 'Taller de caligrafía', hora: '16:00', detalle: 'Sede LongCont' }, { fecha: '2026-09-23', titulo: 'Charla de cultura china', hora: '19:00', detalle: 'Modalidad online' }];
const obtenerEventos = () => [...eventosBase, ...JSON.parse(localStorage.getItem('longcont_eventos_calendario') || '[]')];
function renderizarEventos() {
  const mesActual = `${fechaCalendario.getFullYear()}-${String(fechaCalendario.getMonth() + 1).padStart(2, '0')}`;
  const eventos = obtenerEventos().filter((evento) => evento.fecha.startsWith(mesActual)).sort((a, b) => a.fecha.localeCompare(b.fecha) || a.hora.localeCompare(b.hora));
  document.getElementById('lista-eventos-calendario').innerHTML = eventos.length ? eventos.map((evento) => `<article><span>${new Intl.DateTimeFormat('es-AR', { day: '2-digit', month: 'short' }).format(new Date(`${evento.fecha}T12:00:00`)).toUpperCase()}</span><div><h4>${evento.titulo}</h4><p>${evento.hora} · ${evento.detalle || 'Sin detalle'}</p></div></article>`).join('') : '<p>No hay eventos para este mes.</p>';
}

function renderizarCalendario() {
  const anio = fechaCalendario.getFullYear();
  const mes = fechaCalendario.getMonth();
  mesCalendario.textContent = new Intl.DateTimeFormat('es-AR', { month: 'long', year: 'numeric' }).format(fechaCalendario).replace(/^./, (letra) => letra.toUpperCase());
  const primerDia = (new Date(anio, mes, 1).getDay() + 6) % 7;
  const diasMes = new Date(anio, mes + 1, 0).getDate();
  const diasAnterior = new Date(anio, mes, 0).getDate();
  const fechasConEvento = new Set(obtenerEventos().map((evento) => evento.fecha));
  const celdas = [];
  for (let indice = 0; indice < 42; indice += 1) {
    const dia = indice - primerDia + 1;
    const fecha = new Date(anio, mes, dia);
    const clave = fecha.toISOString().slice(0, 10);
    const fuera = dia < 1 || dia > diasMes;
    const numero = dia < 1 ? diasAnterior + dia : dia > diasMes ? dia - diasMes : dia;
    celdas.push(`<span class="${fuera ? 'fuera ' : ''}${fechasConEvento.has(clave) ? 'evento' : ''}" aria-label="${numero}">${numero}</span>`);
  }
  diasCalendario.innerHTML = celdas.join('');
  renderizarEventos();
}

document.getElementById('calendario-anterior').addEventListener('click', () => { fechaCalendario.setMonth(fechaCalendario.getMonth() - 1); renderizarCalendario(); });
document.getElementById('calendario-siguiente').addEventListener('click', () => { fechaCalendario.setMonth(fechaCalendario.getMonth() + 1); renderizarCalendario(); });
renderizarCalendario();

document.getElementById('fecha-evento').value = fechaCalendario.toISOString().slice(0, 10);
document.getElementById('form-evento-calendario').addEventListener('submit', (evento) => {
  evento.preventDefault();
  const fecha = document.getElementById('fecha-evento').value;
  const titulo = document.getElementById('titulo-evento').value.trim();
  const hora = document.getElementById('hora-evento').value;
  const detalle = document.getElementById('detalle-evento').value.trim();
  if (!fecha || !titulo || !hora) return;
  const eventos = JSON.parse(localStorage.getItem('longcont_eventos_calendario') || '[]');
  eventos.push({ fecha, titulo, hora, detalle }); localStorage.setItem('longcont_eventos_calendario', JSON.stringify(eventos));
  fechaCalendario = new Date(`${fecha}T12:00:00`); fechaCalendario.setDate(1); document.getElementById('form-evento-calendario').reset(); document.getElementById('fecha-evento').value = fecha; document.getElementById('mensaje-evento-calendario').textContent = 'Evento agregado al calendario.'; renderizarCalendario();
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
  const publicaciones = JSON.parse(localStorage.getItem('longcont_publicaciones') || '[]')
    .filter((publicacion) => publicacion.autorEmail === sesion.email);
  const lista = document.getElementById('lista-publicaciones');
  if (!publicaciones.length) {
    lista.innerHTML = '<p class="sin-publicaciones">Todavía no creaste publicaciones desde esta cuenta.</p>';
    return;
  }
  const escaparHTML = (texto) => String(texto).replace(/[&<>'"]/g, (caracter) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[caracter]);
  lista.innerHTML = publicaciones.map((publicacion) => `<article class="publicacion-local">${publicacion.imagen ? `<img src="${publicacion.imagen}" alt="">` : '<div class="miniatura-local">✦</div>'}<div><span>${escaparHTML(publicacion.categoria).toUpperCase()}</span><h4>${escaparHTML(publicacion.titulo)}</h4><p>${escaparHTML(publicacion.descripcion)}</p><small>Publicada por ${escaparHTML(publicacion.autorNombre || sesion.nombre)}</small></div></article>`).join('');
}

formSubirContenido.addEventListener('submit', (event) => {
  event.preventDefault();
  mensajeSubir.classList.remove('exito');
  if (!tituloContenido.value.trim() || !categoriaContenido.value || !descripcionContenido.value.trim()) {
    mensajeSubir.textContent = 'Completá título, categoría y descripción para guardar el contenido.';
    return;
  }
  const publicaciones = JSON.parse(localStorage.getItem('longcont_publicaciones') || '[]');
  publicaciones.unshift({
    titulo: tituloContenido.value.trim(), categoria: categoriaContenido.value,
    descripcion: descripcionContenido.value.trim(), imagen: previewImagen.querySelector('img')?.src || '',
    autorNombre: sesion.nombre, autorUsuario: sesion.username || '', autorEmail: sesion.email,
    creadaEn: new Date().toISOString()
  });
  localStorage.setItem('longcont_publicaciones', JSON.stringify(publicaciones));
  formSubirContenido.reset();
  previewImagen.textContent = 'Sin imagen';
  actualizarVistaPrevia();
  mensajeSubir.classList.add('exito');
  mensajeSubir.textContent = 'Publicación creada desde tu cuenta.';
  renderizarPublicaciones();
});

document.getElementById('limpiar-publicaciones').addEventListener('click', () => {
  const publicacionesDeOtrasCuentas = JSON.parse(localStorage.getItem('longcont_publicaciones') || '[]')
    .filter((publicacion) => publicacion.autorEmail !== sesion.email);
  localStorage.setItem('longcont_publicaciones', JSON.stringify(publicacionesDeOtrasCuentas));
  renderizarPublicaciones();
});

renderizarPublicaciones();

// El editor vive en su propia página; el panel sólo conserva el acceso directo.
document.getElementById('publicaciones-panel')?.remove();
