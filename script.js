const navegacion = document.getElementById('overlay-navegacion');
const busqueda = document.getElementById('overlay-busqueda');
const campoBusqueda = document.getElementById('campo-busqueda');

function abrir(overlay) {
  overlay.classList.remove('oculto');
  document.body.style.overflow = 'hidden';
  if (overlay === busqueda) setTimeout(() => campoBusqueda.focus(), 50);
}

function cerrar(overlay) {
  overlay.classList.add('oculto');
  if (navegacion.classList.contains('oculto') && busqueda.classList.contains('oculto')) document.body.style.overflow = '';
}

document.getElementById('abrir-navegacion').addEventListener('click', () => abrir(navegacion));
document.getElementById('cerrar-navegacion').addEventListener('click', () => cerrar(navegacion));
document.getElementById('abrir-busqueda-desde-menu').addEventListener('click', () => {
  cerrar(navegacion);
  abrir(busqueda);
});
document.getElementById('cerrar-busqueda').addEventListener('click', () => cerrar(busqueda));

document.querySelectorAll('.columna-navegacion a').forEach((enlace) => {
  enlace.addEventListener('click', () => {
    const destino = enlace.getAttribute('href');
    if (destino && destino.startsWith('#')) {
      document.querySelector(destino)?.closest('details.info-grupo')?.setAttribute('open', '');
    }
    cerrar(navegacion);
  });
});

[navegacion, busqueda].forEach((overlay) => overlay.addEventListener('click', (event) => {
  if (event.target === overlay) cerrar(overlay);
}));

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;
  cerrar(navegacion);
  cerrar(busqueda);
});
//comentario
document.getElementById('form-busqueda').addEventListener('submit', (event) => {
  event.preventDefault();
  const termino = campoBusqueda.value.trim();
  if (termino) window.location.hash = 'novedades';
  cerrar(busqueda);
});

const ventanaNovedades = document.querySelector('.nov-ventana');
const tarjetasNovedades = [...document.querySelectorAll('.nov-ventana .nov-tarjeta')];
const indicadoresNovedades = document.querySelector('.nov-indicadores');

if (ventanaNovedades && tarjetasNovedades.length && indicadoresNovedades) {
  const anterior = document.querySelector('.nov-control-anterior');
  const siguiente = document.querySelector('.nov-control-siguiente');
  const movimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let indiceActual = 0;
  let reproduccion;

  const irANovedad = (indice, suave = true) => {
    indiceActual = (indice + tarjetasNovedades.length) % tarjetasNovedades.length;
    ventanaNovedades.scrollTo({ left: tarjetasNovedades[indiceActual].offsetLeft, behavior: suave && !movimientoReducido ? 'smooth' : 'auto' });
    actualizarIndicadores();
  };

  const actualizarIndicadores = () => {
    [...indicadoresNovedades.children].forEach((indicador, indice) => {
      const activo = indice === indiceActual;
      indicador.classList.toggle('activo', activo);
      indicador.setAttribute('aria-current', activo ? 'true' : 'false');
    });
  };

  tarjetasNovedades.forEach((tarjeta, indice) => {
    const indicador = document.createElement('button');
    indicador.type = 'button';
    indicador.className = 'nov-indicador';
    indicador.setAttribute('aria-label', `Ir a la novedad ${indice + 1}`);
    indicador.addEventListener('click', () => irANovedad(indice));
    indicadoresNovedades.append(indicador);
  });

  anterior.addEventListener('click', () => irANovedad(indiceActual - 1));
  siguiente.addEventListener('click', () => irANovedad(indiceActual + 1));
  ventanaNovedades.addEventListener('scroll', () => {
    const masCercana = tarjetasNovedades.reduce((mejor, tarjeta, indice) => Math.abs(tarjeta.offsetLeft - ventanaNovedades.scrollLeft) < Math.abs(tarjetasNovedades[mejor].offsetLeft - ventanaNovedades.scrollLeft) ? indice : mejor, 0);
    if (masCercana !== indiceActual) { indiceActual = masCercana; actualizarIndicadores(); }
  }, { passive: true });

  const detener = () => { window.clearInterval(reproduccion); };
  const iniciar = () => {
    detener();
    if (!movimientoReducido) reproduccion = window.setInterval(() => irANovedad(indiceActual + 1), 5000);
  };
  [ventanaNovedades, anterior, siguiente, indicadoresNovedades].forEach((elemento) => {
    elemento.addEventListener('mouseenter', detener);
    elemento.addEventListener('mouseleave', iniciar);
    elemento.addEventListener('focusin', detener);
    elemento.addEventListener('focusout', iniciar);
  });
  document.addEventListener('visibilitychange', () => document.hidden ? detener() : iniciar());
  actualizarIndicadores();
  iniciar();
}
