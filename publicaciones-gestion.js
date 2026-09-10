const sesionGestion = JSON.parse(localStorage.getItem('longcont_sesion') || 'null');
if (!sesionGestion) window.location.replace('./login.html');

const formGestion = document.getElementById('form-publicacion');
const tituloGestion = document.getElementById('titulo-publicacion');
const categoriaGestion = document.getElementById('categoria-publicacion');
const descripcionGestion = document.getElementById('descripcion-publicacion');
const imagenGestion = document.getElementById('imagen-publicacion');
const mensajeGestion = document.getElementById('mensaje-publicacion');
const vistaImagenGestion = document.getElementById('vista-imagen');
document.getElementById('autor-publicacion').textContent = `Publicás como ${sesionGestion.nombre}`;

const destinoCampo = document.createElement('label');
destinoCampo.innerHTML = '¿Dónde querés publicar?<select id="destino-publicacion" required><option value="novedades">Novedades</option><option value="informacion">Información</option><option value="participacion">Participación</option><option value="sobre-nosotros">Sobre nosotros</option></select>';
formGestion.prepend(destinoCampo);
const destinoGestion = destinoCampo.querySelector('select');
const fuenteCampo = document.createElement('label');
fuenteCampo.id = 'fuente-publicacion';
fuenteCampo.innerHTML = 'URL de la noticia original<input id="url-original-publicacion" type="url" placeholder="https://...">';
imagenGestion.closest('label').before(fuenteCampo);
const urlOriginalGestion = fuenteCampo.querySelector('input');
descripcionGestion.closest('label').firstChild.nodeValue = 'Resumen breve para la tarjeta';
const contenidoCampo = document.createElement('label');
contenidoCampo.innerHTML = 'Contenido completo del artículo<textarea id="contenido-articulo" rows="14" minlength="250" placeholder="Escribí el artículo completo. Separá los párrafos con una línea vacía. Para un subtítulo, empezá la línea con ## " required></textarea><small>El artículo se presentará automáticamente con párrafos y subtítulos.</small>';
descripcionGestion.closest('label').after(contenidoCampo);
const contenidoGestion = contenidoCampo.querySelector('textarea');
const pdfCampo = document.createElement('label');
pdfCampo.innerHTML = 'Cargar artículo desde PDF (opcional)<input id="pdf-articulo" type="file" accept="application/pdf"><small>Extrae el texto y completa el resumen y el contenido. Podés editar ambos antes de publicar.</small>';
contenidoCampo.after(pdfCampo);
const pdfArticulo = pdfCampo.querySelector('input');
let idiomaOrigenArticulo = window.LongContI18n?.getLanguage?.() || 'es';

function crearControlArchivo(input, texto) {
  input.style.display = 'none';
  const control = document.createElement('div');
  control.style.cssText = 'display:flex;align-items:center;gap:10px;flex-wrap:wrap';
  control.innerHTML = `<button type="button" style="border:1px solid #7d1820;background:#fff;color:#7d1820;border-radius:8px;padding:10px 14px;font-weight:800;cursor:pointer">${texto}</button><small>Ningún archivo seleccionado</small>`;
  control.querySelector('button').addEventListener('click', () => input.click());
  input.addEventListener('change', () => { control.querySelector('small').textContent = input.files[0]?.name || 'Ningún archivo seleccionado'; });
  input.after(control);
}
crearControlArchivo(imagenGestion, 'Adjuntar imagen');
crearControlArchivo(pdfArticulo, 'Adjuntar PDF');

function crearResumen(texto) {
  const oraciones = texto.replace(/\s+/g, ' ').match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [];
  return oraciones.slice(0, 3).join(' ').trim().slice(0, 450);
}
async function extraerTextoPdf(archivo) {
  const pdfjs = await import('https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.mjs');
  pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@4.10.38/build/pdf.worker.mjs';
  const documento = await pdfjs.getDocument({ data: await archivo.arrayBuffer() }).promise;
  const paginas = [];
  for (let numero = 1; numero <= documento.numPages; numero += 1) {
    const pagina = await documento.getPage(numero);
    const contenido = await pagina.getTextContent();
    const lineas = [];
    contenido.items.forEach((item) => {
      if (!item.str.trim()) return;
      const x = item.transform[4];
      const y = item.transform[5];
      let linea = lineas.find((actual) => Math.abs(actual.y - y) < 2.5);
      if (!linea) { linea = { y, partes: [] }; lineas.push(linea); }
      linea.partes.push({ x, texto: item.str });
    });
    lineas.sort((a, b) => b.y - a.y);
    const separaciones = lineas.slice(1).map((linea, indice) => Math.abs(lineas[indice].y - linea.y)).filter(Boolean);
    const saltoDeParrafo = (separaciones.reduce((suma, valor) => suma + valor, 0) / separaciones.length || 12) * 1.7;
    paginas.push(lineas.map((linea, indice) => {
      const texto = linea.partes.sort((a, b) => a.x - b.x).map((parte) => parte.texto).join(' ');
      const siguiente = lineas[indice + 1];
      return `${texto}${siguiente && Math.abs(linea.y - siguiente.y) > saltoDeParrafo ? '\n\n' : ' '}`;
    }).join('').trim());
  }
  return paginas.join('\n\n').replace(/\s+\n/g, '\n').trim();
}
function detectarIdioma(texto) {
  const chino = (texto.match(/[\u3400-\u9fff]/g) || []).length;
  if (chino > Math.max(8, texto.length * 0.08)) return 'zh';
  const muestra = ` ${texto.toLowerCase()} `;
  const ingles = [' the ', ' and ', ' with ', ' from ', ' this ', ' that ', ' for '].filter((palabra) => muestra.includes(palabra)).length;
  const espanol = [' el ', ' la ', ' de ', ' y ', ' que ', ' para ', ' con '].filter((palabra) => muestra.includes(palabra)).length;
  return ingles > espanol ? 'en' : 'es';
}

const categorias = {
  novedades: ['Noticia', 'Economía', 'Educación', 'Salud', 'Cultura'],
  informacion: ['Historia', 'Cultura', 'Festivales', 'Economía', 'Gastronomía', 'Turismo', 'Celebridades', 'Programas', 'Cine y TV'],
  participacion: ['Voluntariado', 'Actividades', 'Comunidad'],
  'sobre-nosotros': ['Origen', 'Departamentos', 'Comunidad']
};
function configurarDestino() {
  const esNovedad = destinoGestion.value === 'novedades';
  fuenteCampo.hidden = !esNovedad;
  urlOriginalGestion.required = esNovedad;
  categoriaGestion.innerHTML = '<option value="">Elegí una categoría</option>' + categorias[destinoGestion.value].map((categoria) => `<option>${categoria}</option>`).join('');
  actualizarVistaGestion();
}
function actualizarVistaGestion() {
  document.getElementById('vista-titulo').textContent = tituloGestion.value.trim() || 'Título de la publicación';
  document.getElementById('vista-categoria').textContent = (categoriaGestion.value || destinoGestion.value).toUpperCase();
  document.getElementById('vista-descripcion').textContent = descripcionGestion.value.trim() || 'La descripción aparecerá aquí.';
}
function escaparGestion(texto) { return String(texto).replace(/[&<>'"]/g, (c) => ({ '&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;' })[c]); }
function renderizarGestion() {
  const posts = JSON.parse(localStorage.getItem('longcont_publicaciones') || '[]').filter((post) => post.autorEmail === sesionGestion.email);
  document.getElementById('lista-mis-publicaciones').innerHTML = posts.length ? posts.map((post) => `<article class="publicacion-item"><strong>${escaparGestion(post.titulo)}</strong><p>${post.destino === 'informacion' ? 'Información' : 'Novedades'} · ${escaparGestion(post.categoria)}</p></article>`).join('') : '<p>Todavía no creaste publicaciones.</p>';
}
destinoGestion.addEventListener('change', configurarDestino);
[tituloGestion, categoriaGestion, descripcionGestion].forEach((campo) => campo.addEventListener('input', actualizarVistaGestion));
imagenGestion.addEventListener('change', () => { const archivo = imagenGestion.files[0]; if (!archivo) return; const lector = new FileReader(); lector.onload = () => { vistaImagenGestion.innerHTML = `<img src="${lector.result}" alt="">`; }; lector.readAsDataURL(archivo); });
pdfArticulo.addEventListener('change', async () => {
  const archivo = pdfArticulo.files[0];
  if (!archivo) return;
  if (archivo.size > 5 * 1024 * 1024) { mensajeGestion.textContent = 'El PDF debe pesar como máximo 5 MB.'; pdfArticulo.value = ''; return; }
  mensajeGestion.textContent = 'Leyendo el PDF…';
  try {
    const texto = await extraerTextoPdf(archivo);
    if (!texto) throw new Error('empty');
    idiomaOrigenArticulo = detectarIdioma(texto);
    descripcionGestion.value = crearResumen(texto);
    contenidoGestion.value = texto.slice(0, 100000);
    actualizarVistaGestion();
    const idiomaLegible = { es: 'español', en: 'inglés', zh: 'chino' }[idiomaOrigenArticulo];
    mensajeGestion.textContent = texto.length > 100000 ? `PDF procesado en ${idiomaLegible}. Se cargaron los primeros 100.000 caracteres; revisá el contenido.` : `PDF procesado en ${idiomaLegible}. El texto se organizó por párrafos; revisalo antes de publicar.`;
  } catch {
    mensajeGestion.textContent = 'No se pudo leer el PDF. Probá con un PDF que contenga texto seleccionable.';
  }
});
formGestion.addEventListener('submit', (evento) => { evento.preventDefault(); const destino = destinoGestion.value; if (!tituloGestion.value.trim() || !categoriaGestion.value || !descripcionGestion.value.trim() || contenidoGestion.value.trim().length < 250 || (destino === 'novedades' && !urlOriginalGestion.validity.valid)) { mensajeGestion.textContent = destino === 'novedades' ? 'Completá el artículo y una URL válida de la noticia original.' : 'Escribí un artículo de al menos 250 caracteres y completá los demás campos.'; return; } const posts = JSON.parse(localStorage.getItem('longcont_publicaciones') || '[]'); posts.unshift({ id: crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`, destino, titulo: tituloGestion.value.trim(), categoria: categoriaGestion.value, descripcion: descripcionGestion.value.trim(), contenido: contenidoGestion.value.trim(), idiomaOrigen: idiomaOrigenArticulo, imagen: vistaImagenGestion.querySelector('img')?.src || '', urlOriginal: urlOriginalGestion.value.trim(), autorNombre: sesionGestion.nombre, autorUsuario: sesionGestion.username || '', autorEmail: sesionGestion.email, creadaEn: new Date().toISOString() }); localStorage.setItem('longcont_publicaciones', JSON.stringify(posts)); formGestion.reset(); idiomaOrigenArticulo = window.LongContI18n?.getLanguage?.() || 'es'; vistaImagenGestion.textContent = 'Sin imagen'; configurarDestino(); mensajeGestion.textContent = destino === 'novedades' ? 'Novedad publicada en la portada.' : 'Artículo agregado a Información.'; renderizarGestion(); });
function renderizarGestion() {
  const posts = JSON.parse(localStorage.getItem('longcont_publicaciones') || '[]').filter((post) => post.autorEmail === sesionGestion.email);
  const lista = document.getElementById('lista-mis-publicaciones');
  lista.innerHTML = posts.length ? posts.map((post) => `<article class="publicacion-item"><strong>${escaparGestion(post.titulo)}</strong><p>${post.destino === 'informacion' ? 'Información' : 'Novedades'} · ${escaparGestion(post.categoria)}</p><div style="display:flex;gap:12px;margin-top:10px"><a style="color:#7d1820;font-weight:700" href="articulo-contenido.html?publicacion=${encodeURIComponent(post.id)}">Abrir artículo</a><button style="border:0;background:transparent;color:#8f2026;font-weight:700;cursor:pointer" type="button" data-eliminar-publicacion="${escaparGestion(post.id)}">Eliminar</button></div></article>`).join('') : '<p>Todavía no creaste publicaciones.</p>';
}
document.getElementById('lista-mis-publicaciones').addEventListener('click', (evento) => {
  const boton = evento.target.closest('[data-eliminar-publicacion]');
  if (!boton) return;
  const id = boton.dataset.eliminarPublicacion;
  const posts = JSON.parse(localStorage.getItem('longcont_publicaciones') || '[]');
  localStorage.setItem('longcont_publicaciones', JSON.stringify(posts.filter((post) => !(post.id === id && post.autorEmail === sesionGestion.email))));
  mensajeGestion.textContent = 'Artículo eliminado.';
  renderizarGestion();
});
configurarDestino(); renderizarGestion();

let idEditando = null;
const botonContenidoGrande = document.createElement('button');
botonContenidoGrande.type = 'button';
botonContenidoGrande.textContent = 'Abrir contenido en grande';
contenidoCampo.append(botonContenidoGrande);
const modalEditor = document.createElement('dialog');
modalEditor.innerHTML = '<form method="dialog" style="width:min(900px,92vw);padding:8px"><div style="display:flex;justify-content:space-between;align-items:center;gap:16px"><h2>Contenido completo del artículo</h2><button type="submit">Cerrar</button></div><textarea id="editor-contenido-grande" style="width:100%;min-height:60vh;padding:14px;margin-top:12px;font:16px/1.65 system-ui"></textarea></form>';
document.body.append(modalEditor);
const editorContenidoGrande = modalEditor.querySelector('textarea');
botonContenidoGrande.addEventListener('click', () => { editorContenidoGrande.value = contenidoGestion.value; modalEditor.showModal(); });
editorContenidoGrande.addEventListener('input', () => { contenidoGestion.value = editorContenidoGrande.value; });
const botonVistaArticulo = document.createElement('button');
botonVistaArticulo.type = 'button';
botonVistaArticulo.textContent = 'Vista previa del artículo';
contenidoCampo.append(botonVistaArticulo);
const modalVistaArticulo = document.createElement('dialog');
modalVistaArticulo.innerHTML = '<form method="dialog" style="width:min(1000px,94vw);padding:0;overflow:hidden;border-radius:14px;background:#f8f7ff"><button type="submit" style="position:absolute;right:20px;top:16px;z-index:2;border:0;border-radius:999px;padding:9px 14px;cursor:pointer">Cerrar ×</button><section id="vista-articulo-completa"></section></form>';
document.body.append(modalVistaArticulo);
function crearVistaArticulo() {
  const titulo = escaparGestion(tituloGestion.value.trim() || 'Título del artículo');
  const categoria = escaparGestion((categoriaGestion.value || destinoGestion.value || 'PUBLICACIÓN').toUpperCase());
  const cuerpo = (contenidoGestion.value.trim() || 'El contenido completo del artículo aparecerá aquí.').split(/\n\s*\n/).filter(Boolean).map((bloque) => bloque.trim().startsWith('##') ? `<h2>${escaparGestion(bloque.trim().slice(2).trim())}</h2>` : `<p>${escaparGestion(bloque).replace(/\n/g, '<br>')}</p>`).join('');
  const imagen = vistaImagenGestion.querySelector('img')?.src || '';
  document.getElementById('vista-articulo-completa').innerHTML = `<header style="min-height:280px;padding:44px;display:flex;align-items:end;color:white;background:linear-gradient(0deg,rgba(31,7,61,.82),rgba(31,7,61,.2)),url('${imagen}') center/cover,#42124c"><div style="max-width:720px"><p style="font-weight:800;letter-spacing:.1em;font-size:12px">${categoria}</p><h1 style="font-size:clamp(30px,5vw,48px);margin:10px 0">${titulo}</h1><span>Vista previa del artículo</span></div></header><article style="max-width:760px;margin:auto;padding:38px 30px 56px;color:#514a5a;font:16px/1.8 system-ui"><p style="font-size:19px;color:#332640">${escaparGestion(descripcionGestion.value.trim())}</p>${imagen ? `<img src="${imagen}" alt="" style="width:100%;max-height:420px;object-fit:cover;border-radius:12px;margin:22px 0">` : ''}<div class="cuerpo-vista-articulo">${cuerpo}</div></article>`;
}
botonVistaArticulo.addEventListener('click', () => { crearVistaArticulo(); modalVistaArticulo.showModal(); });
const botonVistaTarjeta = document.createElement('button');
botonVistaTarjeta.type = 'button';
botonVistaTarjeta.textContent = 'Vista previa de tarjeta';
contenidoCampo.append(botonVistaTarjeta);
const modalVistaTarjeta = document.createElement('dialog');
modalVistaTarjeta.innerHTML = '<form method="dialog" style="width:min(760px,94vw);padding:28px;background:#f8f7ff"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:22px"><h2 style="margin:0;color:#2b064d">Vista previa de tarjeta</h2><button type="submit">Cerrar ×</button></div><div id="vista-tarjeta-grande"></div></form>';
document.body.append(modalVistaTarjeta);
botonVistaTarjeta.addEventListener('click', () => {
  const imagen = vistaImagenGestion.querySelector('img')?.src || '';
  document.getElementById('vista-tarjeta-grande').innerHTML = `<article style="overflow:hidden;border-radius:18px;background:#fff;box-shadow:0 10px 32px #2b064d1a"><div style="height:300px;background:${imagen ? `url('${imagen}') center/cover` : '#e8e1d6'}"></div><div style="padding:28px"><p style="margin:0 0 12px;color:#9c2020;font:800 12px system-ui;letter-spacing:.1em">${escaparGestion((categoriaGestion.value || destinoGestion.value).toUpperCase())}</p><h3 style="margin:0 0 14px;color:#2b064d;font-size:clamp(24px,4vw,34px)">${escaparGestion(tituloGestion.value.trim() || 'Título de la publicación')}</h3><p style="margin:0;color:#514a5a;font:17px/1.65 system-ui">${escaparGestion(descripcionGestion.value.trim() || 'El resumen breve de la publicación aparecerá aquí.')}</p></div></article>`;
  modalVistaTarjeta.showModal();
});

function datosDelFormulario() {
  return { destino: destinoGestion.value, titulo: tituloGestion.value.trim(), categoria: categoriaGestion.value, descripcion: descripcionGestion.value.trim(), contenido: contenidoGestion.value.trim(), idiomaOrigen: idiomaOrigenArticulo, imagen: vistaImagenGestion.querySelector('img')?.src || '', urlOriginal: urlOriginalGestion.value.trim(), autorNombre: sesionGestion.nombre, autorUsuario: sesionGestion.username || '', autorEmail: sesionGestion.email, creadaEn: new Date().toISOString() };
}
formGestion.addEventListener('submit', (evento) => {
  evento.preventDefault(); evento.stopImmediatePropagation();
  const datos = datosDelFormulario();
  if (!datos.titulo || !datos.categoria || !datos.descripcion || datos.contenido.length < 250 || (datos.destino === 'novedades' && !urlOriginalGestion.validity.valid)) { mensajeGestion.textContent = datos.destino === 'novedades' ? 'Completá el artículo y una URL válida de la noticia original.' : 'Escribí un artículo de al menos 250 caracteres y completá los demás campos.'; return; }
  const posts = JSON.parse(localStorage.getItem('longcont_publicaciones') || '[]');
  const indice = posts.findIndex((post) => post.id === idEditando && post.autorEmail === sesionGestion.email);
  if (indice >= 0) { posts[indice] = { ...posts[indice], ...datos, creadaEn: posts[indice].creadaEn }; mensajeGestion.textContent = 'Artículo actualizado correctamente.'; }
  else { posts.unshift({ id: crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`, ...datos }); mensajeGestion.textContent = datos.destino === 'novedades' ? 'Novedad publicada en la portada.' : 'Artículo publicado correctamente.'; }
  localStorage.setItem('longcont_publicaciones', JSON.stringify(posts));
  idEditando = null; formGestion.reset(); vistaImagenGestion.textContent = 'Sin imagen'; configurarDestino(); renderizarGestion();
}, true);
function renderizarGestion() {
  const posts = JSON.parse(localStorage.getItem('longcont_publicaciones') || '[]').filter((post) => post.autorEmail === sesionGestion.email);
  const lista = document.getElementById('lista-mis-publicaciones');
  lista.innerHTML = posts.length ? posts.map((post) => `<article class="publicacion-item"><strong>${escaparGestion(post.titulo)}</strong><p>${escaparGestion(post.destino)} · ${escaparGestion(post.categoria)}</p><div style="display:flex;gap:12px;margin-top:10px"><a style="color:#7d1820;font-weight:700" href="articulo-contenido.html?publicacion=${encodeURIComponent(post.id)}">Abrir artículo</a><button type="button" data-editar-publicacion="${escaparGestion(post.id)}">Editar</button><button type="button" data-eliminar-publicacion="${escaparGestion(post.id)}">Eliminar</button></div></article>`).join('') : '<p>Todavía no creaste publicaciones.</p>';
}
document.getElementById('lista-mis-publicaciones').addEventListener('click', (evento) => {
  const boton = evento.target.closest('[data-editar-publicacion]');
  if (!boton) return;
  const post = JSON.parse(localStorage.getItem('longcont_publicaciones') || '[]').find((item) => item.id === boton.dataset.editarPublicacion && item.autorEmail === sesionGestion.email);
  if (!post) return;
  idEditando = post.id; destinoGestion.value = post.destino || 'novedades'; configurarDestino(); tituloGestion.value = post.titulo; categoriaGestion.value = post.categoria; descripcionGestion.value = post.descripcion; contenidoGestion.value = post.contenido || post.descripcion; urlOriginalGestion.value = post.urlOriginal || ''; idiomaOrigenArticulo = post.idiomaOrigen || 'es'; vistaImagenGestion.innerHTML = post.imagen ? `<img src="${post.imagen}" alt="">` : 'Sin imagen'; actualizarVistaGestion(); editorContenidoGrande.value = contenidoGestion.value; modalEditor.showModal(); window.scrollTo({ top: 0, behavior: 'smooth' });
});
