const longcontSupabase = window.supabase.createClient(
  'https://hklcccrianbawgomehxt.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrbGNjY3JpYW5iYXdnb21laHh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg5OTc3MjcsImV4cCI6MjEwNDU3MzcyN30.KKb75X2VxOtSmUqJuhNfgTXeVtVvu9a54pWig1euuYo'
);

function guardarSesionSupabase(user) {
  const metadata = user.user_metadata || {};
  const nombre = metadata.full_name || metadata.nombre || user.email?.split('@')[0] || 'Usuario';
  localStorage.setItem('longcont_sesion', JSON.stringify({ nombre, username: metadata.username || '', email: user.email, supabaseId: user.id }));
}
