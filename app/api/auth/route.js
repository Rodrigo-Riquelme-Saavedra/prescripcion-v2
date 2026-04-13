const JSONBIN_API_KEY = process.env.JSONBIN_API_KEY;
const JSONBIN_BIN_USUARIOS = process.env.JSONBIN_BIN_USUARIOS;
 
async function getUsuarios() {
  try {
    const res = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_USUARIOS}/latest`, {
      headers: { "X-Master-Key": JSONBIN_API_KEY },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.record?.usuarios || [];
  } catch { return []; }
}
 
export async function POST(req) {
  const { perfil, usuario, password } = await req.json();
 
  if (!perfil || !usuario || !password) {
    return Response.json({ ok: false, error: "Datos incompletos" }, { status: 400 });
  }
 
  const usuarios = await getUsuarios();
  const encontrado = usuarios.find(
    u => u.perfil === perfil &&
         u.usuario === usuario &&
         u.password === password &&
         u.activo !== false
  );
 
  if (encontrado) {
    return Response.json({ ok: true, nombre: encontrado.nombre || usuario, perfil });
  }
 
  return Response.json({ ok: false, error: "Usuario o contraseña incorrectos" }, { status: 401 });
}
