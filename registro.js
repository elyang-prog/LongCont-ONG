const formRegistro = document.getElementById('form-registro');
const nombreRegistro = document.getElementById('nombre-registro');
const usuarioRegistro = document.getElementById('usuario-registro');
const correoRegistro = document.getElementById('correo-registro');
const contrasenaRegistro = document.getElementById('contrasena-registro');
const confirmarRegistro = document.getElementById('confirmar-registro');
const terminosRegistro = document.getElementById('terminos-registro');
const mensajeRegistro = document.getElementById('mensaje-registro');

try {
  if (JSON.parse(localStorage.getItem('longcont_sesion') || 'null')) {
    window.location.replace('./panel.html');
  }
} catch {
  localStorage.removeItem('longcont_sesion');
}

async function cifrarContrasena(contrasena) {
  if (!crypto.subtle) {
    return `local-${Array.from(contrasena).reduce((hash, caracter) => ((hash << 5) - hash + caracter.charCodeAt(0)) | 0, 0)}`;
  }
  const datos = new TextEncoder().encode(contrasena);
  const hash = await crypto.subtle.digest('SHA-256', datos);
  return Array.from(new Uint8Array(hash)).map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

document.querySelectorAll('.mostrar-registro').forEach((boton) => {
  boton.addEventListener('click', () => {
    const campo = boton.previousElementSibling;
    const visible = campo.type === 'text';
    campo.type = visible ? 'password' : 'text';
    boton.setAttribute('aria-pressed', String(!visible));
    boton.setAttribute('aria-label', visible ? 'Mostrar contraseña' : 'Ocultar contraseña');
  });
});

formRegistro.addEventListener('submit', async (event) => {
  event.preventDefault();
  mensajeRegistro.classList.remove('exito');
  const username = usuarioRegistro.value.trim().toLowerCase();
  if (nombreRegistro.value.trim().length < 3 || !/^[a-z0-9_]{3,24}$/.test(username) || !correoRegistro.validity.valid || contrasenaRegistro.value.length < 8) {
    mensajeRegistro.textContent = 'Completá tu nombre, un usuario válido, un correo válido y una contraseña de al menos 8 caracteres.';
    return;
  }
  if (contrasenaRegistro.value !== confirmarRegistro.value) {
    mensajeRegistro.textContent = 'Las contraseñas no coinciden.';
    return;
  }
  if (!terminosRegistro.checked) {
    mensajeRegistro.textContent = 'Necesitás aceptar los términos y condiciones para continuar.';
    return;
  }
  const usuarios = JSON.parse(localStorage.getItem('longcont_usuarios') || '[]');
  const email = correoRegistro.value.trim().toLowerCase();
  if (usuarios.some((usuario) => usuario.email === email)) {
    mensajeRegistro.textContent = 'Ya existe una cuenta con ese correo. Iniciá sesión o usá otro email.';
    return;
  }
  if (usuarios.some((usuario) => usuario.username === username)) {
    mensajeRegistro.textContent = 'Ese nombre de usuario ya está en uso. Elegí otro.';
    return;
  }
  const usuario = { nombre: nombreRegistro.value.trim(), username, email, password: await cifrarContrasena(contrasenaRegistro.value) };
  usuarios.push(usuario);
  localStorage.setItem('longcont_usuarios', JSON.stringify(usuarios));
  localStorage.setItem('longcont_sesion', JSON.stringify({ nombre: usuario.nombre, username: usuario.username, email: usuario.email }));
  mensajeRegistro.classList.add('exito');
  mensajeRegistro.textContent = 'Cuenta creada en este navegador. Redirigiendo al panel…';
  window.setTimeout(() => { window.location.href = './panel.html'; }, 600);
});

document.getElementById('registro-google').addEventListener('click', () => {
  mensajeRegistro.textContent = 'El registro con Google requiere un servicio externo; para esta versión usá el registro local.';
});
