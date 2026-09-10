const articulos = {
  origen: { categoria: 'SOBRE NOSOTROS', titulo: 'Origen de la ONG', bajada: 'La historia de LongCont y el propósito que une a su comunidad.', imagen: 'image/cphoto1.jpg', volver: 'sobre-nosotros.html', texto: ['LongCont nació del deseo de crear un punto de encuentro entre jóvenes y la riqueza viva de la cultura china.', 'Queríamos que la curiosidad se convirtiera en experiencia: conocer una tradición, conversar con otras personas, participar en un taller y descubrir nuevas formas de mirar el mundo.', 'Una comunidad que crece', 'Hoy construimos contenidos, talleres y encuentros abiertos. Cada propuesta busca acercar la historia, el arte, las tradiciones y la China contemporánea desde una mirada cercana y participativa.'] },
  voluntariado: { categoria: 'PARTICIPACIÓN', titulo: 'Voluntariado', bajada: 'Sumá tu tiempo e ideas a las actividades culturales de LongCont.', imagen: 'image/cphoto1.jpg', volver: 'participacion.html', texto: ['El voluntariado es una manera de ser parte activa de la comunidad y hacer posibles nuestros encuentros culturales.', 'Podés colaborar en talleres, eventos, comunicación y actividades para jóvenes. No hace falta experiencia previa: buscamos compromiso, curiosidad y ganas de compartir.', '¿Cómo participar?', 'Escribinos para conocer las próximas convocatorias y encontrar el área que mejor se adapta a tus intereses.'] },
  participacion: { categoria: 'PARTICIPACIÓN', titulo: 'Cómo participar', bajada: 'Encontrá la forma de sumarte a la comunidad de LongCont.', imagen: 'image/footer-cultural.png', volver: 'participacion.html', texto: ['Participar en LongCont es una invitación a acercarte a la cultura china desde tus propios intereses y tiempos.', 'Podés asistir a talleres y eventos, compartir nuestros contenidos, proponer una actividad o sumarte a los equipos de voluntariado.', 'Elegí tu manera de estar', 'Cada aporte cuenta. Seguinos para conocer las próximas actividades o escribinos para encontrar la propuesta que mejor conecta con vos.'] },
  departamentos: { categoria: 'SOBRE NOSOTROS', titulo: 'Nuestros departamentos', bajada: 'Conocé las áreas que hacen crecer a LongCont.', imagen: 'image/cphoto2.jpg', volver: 'sobre-nosotros.html', texto: ['LongCont se construye de manera colectiva. Cada departamento aporta una mirada distinta para que las ideas se conviertan en experiencias.', 'Comunicación comparte nuestras historias; Eventos transforma ideas en encuentros; y Educación desarrolla contenidos para aprender y explorar juntos.', 'Encontrá tu lugar', 'Tu talento puede aportar desde la organización, el diseño, la producción de contenidos o la coordinación de actividades.'] },
  historia: { categoria: 'INFORMACIÓN', titulo: 'Historia de China', bajada: 'Un recorrido por una civilización milenaria.', imagen: 'image/historia.jpg', volver: 'informacion/index.html', texto: ['La historia de China reúne dinastías, descubrimientos y transformaciones sociales que siguen influyendo en el presente.', 'Recorrer sus períodos permite entender el origen de muchas expresiones culturales, desde la arquitectura y el arte hasta las costumbres cotidianas.', 'Un legado que permanece', 'Inventos como el papel, la imprenta y la brújula muestran una tradición de conocimiento que continúa dialogando con el mundo actual.'] },
  cultura: { categoria: 'INFORMACIÓN', titulo: 'Cultura china', bajada: 'Tradiciones que se transforman y siguen vivas.', imagen: 'image/arte.jpg', volver: 'informacion/index.html', texto: ['La cultura china se expresa en la caligrafía, la música, las artes visuales, la filosofía y las prácticas cotidianas.', 'Es un patrimonio diverso: cada celebración, gesto y obra artística conserva una historia y, al mismo tiempo, encuentra nuevas formas de existir.', 'Explorar con curiosidad', 'Acercarse a estas expresiones es descubrir los vínculos entre memoria, creatividad y vida en comunidad.'] }
};
Object.assign(articulos, {
  festivales: { categoria: 'INFORMACIÓN', titulo: 'Festivales', bajada: 'Celebraciones que reúnen a familias y comunidades.', imagen: 'image/cphoto3.jpg', volver: 'informacion/index.html', texto: ['Los festivales tradicionales son momentos de encuentro, memoria y renovación.', 'Cada celebración reúne símbolos, sabores y costumbres que conectan generaciones.', 'Tradiciones compartidas', 'Conocer los festivales permite acercarse a la vida cotidiana y a los valores de la cultura china.'] },
  economia: { categoria: 'INFORMACIÓN', titulo: 'Economía', bajada: 'Transformaciones e innovación en la China contemporánea.', imagen: 'image/novoto.jpg', volver: 'informacion/index.html', texto: ['La economía china combina una historia comercial extensa con una transformación contemporánea acelerada.', 'Innovación, infraestructura e intercambio internacional forman parte de un escenario en constante movimiento.', 'Mirar el presente', 'Explorar estos procesos ayuda a comprender los vínculos entre China, la región y el mundo.'] },
  gastronomia: { categoria: 'INFORMACIÓN', titulo: 'Gastronomía', bajada: 'Sabores, técnicas y tradiciones de una cocina diversa.', imagen: 'image/gastronomia.jpg', volver: 'informacion/index.html', texto: ['La gastronomía china reúne una enorme variedad de ingredientes, técnicas y tradiciones regionales.', 'Cada plato puede contar una historia de territorio, familia y celebración.', 'Una experiencia cultural', 'Conocer sus sabores es también una forma de acercarse a los ritmos y costumbres de la vida cotidiana.'] },
  turismo: { categoria: 'INFORMACIÓN', titulo: 'Turismo', bajada: 'Paisajes, ciudades y patrimonios para descubrir.', imagen: 'image/cphoto2.jpg', volver: 'informacion/index.html', texto: ['China reúne paisajes naturales, ciudades dinámicas y sitios de gran valor histórico.', 'Viajar por su territorio permite descubrir la diversidad cultural y geográfica del país.', 'Rutas para explorar', 'Cada destino ofrece una nueva perspectiva sobre las historias que conviven en China.'] },
  celebridades: { categoria: 'INFORMACIÓN', titulo: 'Celebridades', bajada: 'Figuras que marcan tendencias dentro y fuera de China.', imagen: 'image/cphoto1.jpg', volver: 'informacion/index.html', texto: ['Artistas, deportistas y creadores reflejan la energía de la cultura popular contemporánea.', 'Sus trayectorias conectan audiencias y muestran nuevas formas de expresión.', 'Cultura en movimiento', 'Seguir estas figuras permite conocer las conversaciones que inspiran a nuevas generaciones.'] },
  programas: { categoria: 'INFORMACIÓN', titulo: 'Programas', bajada: 'Formatos que conectan a millones de espectadores.', imagen: 'image/novlunar.jpg', volver: 'informacion/index.html', texto: ['Los programas de entretenimiento reúnen talento, creatividad y una gran diversidad de formatos.', 'Concursos, realities y espectáculos se transforman en espacios de conversación colectiva.', 'Pantallas compartidas', 'Explorarlos es una puerta de entrada a las tendencias culturales actuales.'] },
  'cine-tv': { categoria: 'INFORMACIÓN', titulo: 'Cine y TV', bajada: 'Historias chinas en la pantalla.', imagen: 'image/arte.jpg', volver: 'informacion/index.html', texto: ['El cine y la televisión acercan relatos, géneros y miradas de distintas regiones de China.', 'Desde dramas históricos hasta producciones contemporáneas, las pantallas reflejan una cultura diversa.', 'Nuevas narrativas', 'Cada obra propone una forma distinta de conocer historias y experiencias.'] }
});
const parametrosArticulo = new URLSearchParams(window.location.search);
const publicacionId = parametrosArticulo.get('publicacion');
const publicacion = JSON.parse(localStorage.getItem('longcont_publicaciones') || '[]').find((post) => post.id === publicacionId);
const clave = parametrosArticulo.get('tema') || 'origen';
const volverPublicacion = { informacion: 'informacion/index.html', participacion: 'participacion.html', 'sobre-nosotros': 'sobre-nosotros.html', novedades: 'index.html#novedades' };
const articulo = publicacion ? { categoria: `${publicacion.destino === 'novedades' ? 'NOVEDADES' : publicacion.destino.toUpperCase()} · ${publicacion.categoria}`, titulo: publicacion.titulo, bajada: `Publicado por ${publicacion.autorNombre}`, imagen: publicacion.imagen || 'image/cphoto1.jpg', volver: volverPublicacion[publicacion.destino] || 'index.html', texto: [publicacion.contenido || publicacion.descripcion] } : (articulos[clave] || articulos.origen);
document.title = `${articulo.titulo} | LongCont`;
document.getElementById('articulo-categoria').textContent = articulo.categoria;
document.getElementById('articulo-titulo').textContent = articulo.titulo;
document.getElementById('articulo-bajada').textContent = articulo.bajada;
document.getElementById('articulo-hero').style.setProperty('--articulo-imagen', `url('${articulo.imagen}')`);
document.getElementById('articulo-volver').href = articulo.volver;
const escaparArticulo = (texto) => String(texto).replace(/[&<>'"]/g, (caracter) => ({ '&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;' })[caracter]);
const cuerpoArticulo = document.getElementById('articulo-texto');
if (publicacion) {
  const bloques = articulo.texto[0].split(/\n\s*\n/).filter(Boolean);
  cuerpoArticulo.innerHTML = bloques.map((bloque) => bloque.trim().startsWith('##') ? `<h2>${escaparArticulo(bloque.trim().slice(2).trim())}</h2>` : `<p>${escaparArticulo(bloque).replace(/\n/g, '<br>')}</p>`).join('');
  if (publicacion.imagen) {
    const imagenArticulo = document.createElement('img');
    imagenArticulo.className = 'articulo-imagen-contenido';
    imagenArticulo.src = publicacion.imagen;
    imagenArticulo.alt = publicacion.titulo;
    cuerpoArticulo.insertBefore(imagenArticulo, cuerpoArticulo.children[Math.min(1, cuerpoArticulo.children.length)] || null);
  }
} else {
  cuerpoArticulo.innerHTML = articulo.texto.map((bloque, indice) => indice === 2 ? `<h2>${bloque}</h2>` : `<p${indice === 1 ? ' class="articulo-destacado"' : ''}>${bloque}</p>`).join('');
}
if (publicacion?.urlOriginal) {
  const fuente = document.createElement('a');
  fuente.href = publicacion.urlOriginal;
  fuente.target = '_blank';
  fuente.rel = 'noopener noreferrer';
  fuente.className = 'articulo-volver';
  fuente.textContent = 'Ver noticia original ↗';
  cuerpoArticulo.append(fuente);
}
