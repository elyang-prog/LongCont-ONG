const formLogin = document.getElementById('form-login');
const identificadorLogin = document.getElementById('identificador-login');
const contrasenaLogin = document.getElementById('contrasena-login');
const mensajeLogin = document.getElementById('mensaje-login');
const mostrarContrasena = document.getElementById('mostrar-contrasena');

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

mostrarContrasena.addEventListener('click', () => {
  const visible = contrasenaLogin.type === 'text';
  contrasenaLogin.type = visible ? 'password' : 'text';
  mostrarContrasena.setAttribute('aria-pressed', String(!visible));
  mostrarContrasena.setAttribute('aria-label', visible ? 'Mostrar contraseña' : 'Ocultar contraseña');
});

formLogin.addEventListener('submit', async (event) => {
  event.preventDefault();
  mensajeLogin.classList.remove('exito');
  if (!identificadorLogin.value.trim() || contrasenaLogin.value.length < 6) {
    mensajeLogin.textContent = 'Ingresá tu correo o nombre de usuario y una contraseña de al menos 6 caracteres.';
    return;
  }
  const identificador = identificadorLogin.value.trim().toLowerCase();
  if (!identificador.includes('@')) {
    mensajeLogin.textContent = 'Para iniciar sesión desde cualquier dispositivo, ingresá el correo electrónico de tu cuenta.';
    return;
  }
  const { data, error } = await longcontSupabase.auth.signInWithPassword({ email: identificador, password: contrasenaLogin.value });
  if (!error && data.user) {
    guardarSesionSupabase(data.user);
    mensajeLogin.classList.add('exito');
    mensajeLogin.textContent = 'Sesión iniciada. Redirigiendo al panel…';
    window.setTimeout(() => { window.location.href = './panel.html'; }, 600);
    return;
  }
  const usuarios = JSON.parse(localStorage.getItem('longcont_usuarios') || '[]');
  const usuario = usuarios.find((item) => item.email === identificador || item.username === identificador);
  const contrasenaCifrada = await cifrarContrasena(contrasenaLogin.value);
  if (!usuario || usuario.password !== contrasenaCifrada) {
    mensajeLogin.textContent = error?.message === 'Email not confirmed' ? 'Confirmá el correo que Supabase te envió antes de iniciar sesión.' : 'El correo o contraseña no coinciden. Revisá los datos con los que creaste tu cuenta.';
    return;
  }
  localStorage.setItem('longcont_sesion', JSON.stringify({ nombre: usuario.nombre, username: usuario.username, email: usuario.email }));
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
