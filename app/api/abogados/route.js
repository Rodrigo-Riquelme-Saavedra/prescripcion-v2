const JSONBIN_API_KEY = process.env.JSONBIN_API_KEY;
const JSONBIN_BIN_ABOGADOS = process.env.JSONBIN_BIN_ABOGADOS;
 
async function getAbogados() {
  try {
    const res = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ABOGADOS}/latest`, {
      headers: { "X-Master-Key": JSONBIN_API_KEY },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.record?.abogados || [];
  } catch { return []; }
}
 
async function saveAbogados(abogados) {
  await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ABOGADOS}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", "X-Master-Key": JSONBIN_API_KEY },
    body: JSON.stringify({ abogados }),
  });
}
 
export async function GET() {
  const abogados = await getAbogados();
  return Response.json({ abogados });
}
 
export async function POST(req) {
  const form = await req.json();
  const abogados = await getAbogados();
  if (form.id) {
    const idx = abogados.findIndex(a => a.id === form.id);
    if (idx >= 0) abogados[idx] = form;
  } else {
    form.id = Date.now().toString();
    form.createdAt = new Date().toISOString();
    abogados.push(form);
  }
  await saveAbogados(abogados);
  return Response.json({ ok: true, abogado: form });
}
 
export async function DELETE(req) {
  const { id } = await req.json();
  const abogados = await getAbogados();
  await saveAbogados(abogados.filter(a => a.id !== id));
  return Response.json({ ok: true });
}
