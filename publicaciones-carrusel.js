(() => {
  const escape = (text) => String(text).replace(/[&<>'"]/g, (c) => ({ '&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;' })[c]);
  document.querySelectorAll('#form-publicacion button[type="button"]').forEach((button) => {
    if (/vista previa|abrir contenido/i.test(button.textContent)) button.remove();
  });
  document.querySelectorAll('dialog').forEach((dialog) => dialog.remove());

  const imagen = document.getElementById('vista-imagen');
  const categoria = document.getElementById('vista-categoria');
  const titulo = document.getElementById('vista-titulo');
  const resumen = document.getElementById('vista-descripcion');
  const aside = imagen?.closest('aside');
  if (!aside) return;
  aside.style.minHeight = '600px';

  const tarjeta = document.createElement('div');
  [imagen, categoria, titulo, resumen].forEach((node) => tarjeta.append(node));
  const articulo = document.createElement('div');
  articulo.style.cssText = 'display:none;overflow:hidden;border-radius:10px;background:#fff';
  const estado = document.createElement('p');
  estado.style.cssText = 'margin:16px 0 0;font-size:12px;color:#7d1820;text-align:center;cursor:pointer';
  const selector = document.createElement('div');
  selector.style.cssText = 'display:flex;gap:8px;margin:10px 0 16px';
  selector.innerHTML = '<button type="button" data-vista="tarjeta">Tarjeta</button><button type="button" data-vista="articulo">Artículo</button>';
  aside.append(selector, tarjeta, articulo, estado);
  let modo = 'articulo';
  tarjeta.style.display = 'none';
  articulo.style.display = 'block';
  estado.textContent = 'Artículo · tocá aquí para ver la tarjeta';

  function actualizar() {
    const campoTitulo = document.getElementById('titulo-publicacion');
    const campoCategoria = document.getElementById('categoria-publicacion');
    const campoDestino = document.getElementById('destino-publicacion');
    const campoResumen = document.getElementById('descripcion-publicacion');
    const campoContenido = document.getElementById('contenido-articulo');
    const imagenUrl = imagen.querySelector('img')?.src || '';
    imagen.style.backgroundImage = imagenUrl ? `url("${imagenUrl}")` : 'none';
    imagen.style.backgroundPosition = 'center';
    imagen.style.backgroundSize = 'cover';
    const texto = (campoContenido?.value || 'El contenido completo aparecerá aquí.').split(/\n\s*\n/).filter(Boolean).map((bloque) => bloque.trim().startsWith('##') ? `<h4 style="margin:18px 0 8px;color:#2b064d">${escape(bloque.trim().slice(2).trim())}</h4>` : `<p style="margin:0 0 13px">${escape(bloque).replace(/\n/g, '<br>')}</p>`).join('');
    articulo.innerHTML = `<div style="min-height:155px;padding:22px;display:flex;align-items:end;color:#fff;background:linear-gradient(0deg,rgba(31,7,61,.82),rgba(31,7,61,.2)),url('${imagenUrl}') center/cover,#42124c"><div><small style="font-weight:800;letter-spacing:.1em">${escape((campoCategoria?.value || campoDestino?.value || 'PUBLICACIÓN').toUpperCase())}</small><h3 style="margin:7px 0 0;font-size:24px">${escape(campoTitulo?.value || 'Título de la publicación')}</h3></div></div>${imagenUrl ? `<img src="${imagenUrl}" alt="Imagen del artículo" style="display:block;width:calc(100% - 40px);max-height:300px;object-fit:cover;margin:20px;border-radius:10px">` : ''}<div style="max-height:650px;overflow:auto;padding:20px;color:#514a5a;font:14px/1.65 system-ui"><p style="font-size:16px;color:#332640">${escape(campoResumen?.value || 'El resumen breve aparecerá aquí.')}</p>${texto}</div>`;
  }
  function cambiar() {
    modo = modo === 'tarjeta' ? 'articulo' : 'tarjeta';
    tarjeta.style.display = modo === 'tarjeta' ? 'block' : 'none';
    articulo.style.display = modo === 'articulo' ? 'block' : 'none';
    estado.textContent = modo === 'tarjeta' ? 'Tarjeta · tocá aquí para ver el artículo' : 'Artículo · tocá aquí para ver la tarjeta';
  }
  function mostrar(modoNuevo) {
    modo = modoNuevo;
    tarjeta.style.display = modo === 'tarjeta' ? 'block' : 'none';
    articulo.style.display = modo === 'articulo' ? 'block' : 'none';
    estado.textContent = modo === 'tarjeta' ? 'Tarjeta · tocá aquí para ver el artículo' : 'Artículo · tocá aquí para ver la tarjeta';
  }
  selector.querySelectorAll('[data-vista]').forEach((boton) => boton.addEventListener('click', () => mostrar(boton.dataset.vista)));
  estado.addEventListener('click', cambiar);
  document.querySelectorAll('#form-publicacion input, #form-publicacion select, #form-publicacion textarea').forEach((field) => field.addEventListener('input', actualizar));
  function aplicarImagenDeFondo() {
    const url = imagen.querySelector('img')?.src;
    imagen.style.backgroundImage = url ? `url("${url}")` : 'none';
    imagen.style.backgroundPosition = 'center';
    imagen.style.backgroundSize = 'cover';
    imagen.style.backgroundColor = '#eee7dd';
    const imagenInterna = imagen.querySelector('img');
    if (imagenInterna) imagenInterna.style.opacity = '1';
  }
  new MutationObserver(() => { aplicarImagenDeFondo(); actualizar(); }).observe(imagen, { childList: true });
  aplicarImagenDeFondo();
  actualizar();
})();
