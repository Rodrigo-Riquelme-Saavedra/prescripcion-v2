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
 
async function saveUsuarios(usuarios) {
  await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_USUARIOS}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", "X-Master-Key": JSONBIN_API_KEY },
    body: JSON.stringify({ usuarios }),
  });
}
 
export async function GET() {
  const usuarios = await getUsuarios();
  // Never return passwords
  return Response.json({ usuarios: usuarios.map(u => ({ ...u, password: "••••••••" })) });
}
 
export async function POST(req) {
  const form = await req.json();
  const usuarios = await getUsuarios();
 
  if (!form.usuario || !form.password || !form.perfil) {
    return Response.json({ ok: false, error: "Datos incompletos" }, { status: 400 });
  }
 
  if (form.id) {
    const idx = usuarios.findIndex(u => u.id === form.id);
    if (idx >= 0) {
      // Keep existing password if not changed
      if (form.password === "••••••••") form.password = usuarios[idx].password;
      usuarios[idx] = form;
    }
  } else {
    // Check duplicate username per perfil
    const existe = usuarios.find(u => u.usuario === form.usuario && u.perfil === form.perfil);
    if (existe) return Response.json({ ok: false, error: "Ya existe un usuario con ese nombre en este perfil" }, { status: 409 });
    form.id = Date.now().toString();
    form.createdAt = new Date().toISOString();
    form.activo = true;
    usuarios.push(form);
  }
 
  await saveUsuarios(usuarios);
  return Response.json({ ok: true });
}
 
export async function DELETE(req) {
  const { id } = await req.json();
  const usuarios = await getUsuarios();
  await saveUsuarios(usuarios.filter(u => u.id !== id));
  return Response.json({ ok: true });
}
