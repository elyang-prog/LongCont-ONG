const formLogin = document.getElementById('form-login');
const correoLogin = document.getElementById('correo-login');
const contrasenaLogin = document.getElementById('contrasena-login');
const mensajeLogin = document.getElementById('mensaje-login');
const mostrarContrasena = document.getElementById('mostrar-contrasena');

async function cifrarContrasena(contrasena) {
  if (!crypto.subtle) {
    return `local-${Array.from(contrasena).reduce((hash, caracter) => ((hash << 5) - hash + caracter.charCodeAt(0)) | 0, 0)}`;
  }
  const datos = new TextEncoder().encode(contrasena);
  const hash = await crypto.subtle.digest('SHA-256', datos);
  return Array.from(new Uint8Array(hash)).map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

mostrarContrasena.addEventListener('click', () => {
  const visible = contrasenaLogin.type === 'text';
  contrasenaLogin.type = visible ? 'password' : 'text';
  mostrarContrasena.setAttribute('aria-pressed', String(!visible));
  mostrarContrasena.setAttribute('aria-label', visible ? 'Mostrar contraseña' : 'Ocultar contraseña');
});

formLogin.addEventListener('submit', async (event) => {
  event.preventDefault();
  mensajeLogin.classList.remove('exito');
  if (!correoLogin.validity.valid || contrasenaLogin.value.length < 6) {
    mensajeLogin.textContent = 'Ingresá un correo válido y una contraseña de al menos 6 caracteres.';
    return;
  }
  const usuarios = JSON.parse(localStorage.getItem('longcont_usuarios') || '[]');
  const usuario = usuarios.find((item) => item.email === correoLogin.value.trim().toLowerCase());
  const contrasenaCifrada = await cifrarContrasena(contrasenaLogin.value);
  if (!usuario || usuario.password !== contrasenaCifrada) {
    mensajeLogin.textContent = 'El correo o la contraseña no son correctos. Si aún no tenés cuenta, registrate primero.';
    return;
  }
  localStorage.setItem('longcont_sesion', JSON.stringify({ nombre: usuario.nombre, email: usuario.email }));
  mensajeLogin.classList.add('exito');
  mensajeLogin.textContent = 'Sesión iniciada. Redirigiendo al panel…';
  window.setTimeout(() => { window.location.href = './panel.html'; }, 600);
});

document.getElementById('olvido-contrasena').addEventListener('click', () => {
  mensajeLogin.textContent = 'Sin servidor no es posible recuperar una contraseña. Podés crear una cuenta nueva desde Registro.';
});

document.getElementById('login-google').addEventListener('click', () => {
  mensajeLogin.textContent = 'El acceso con Google requiere un servicio externo; para esta versión usá el registro local.';
});
