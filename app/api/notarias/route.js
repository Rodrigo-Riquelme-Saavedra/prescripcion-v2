const JSONBIN_API_KEY = process.env.JSONBIN_API_KEY;
const JSONBIN_BIN_NOTARIAS = process.env.JSONBIN_BIN_NOTARIAS;
 
async function getNotarias() {
  try {
    const res = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_NOTARIAS}/latest`, {
      headers: { "X-Master-Key": JSONBIN_API_KEY },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return data.record?.notarias || [];
  } catch { return []; }
}
 
async function saveNotarias(notarias) {
  await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_NOTARIAS}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", "X-Master-Key": JSONBIN_API_KEY },
    body: JSON.stringify({ notarias }),
  });
}
 
export async function GET() {
  const notarias = await getNotarias();
  return Response.json({ notarias });
}
 
export async function POST(req) {
  const form = await req.json();
  const notarias = await getNotarias();
 
  if (form.id) {
    const idx = notarias.findIndex(n => n.id === form.id);
    if (idx >= 0) notarias[idx] = form;
  } else {
    form.id = Date.now().toString();
    form.createdAt = new Date().toISOString();
    notarias.push(form);
  }
 
  await saveNotarias(notarias);
  return Response.json({ ok: true, notaria: form });
}
 
export async function DELETE(req) {
  const { id } = await req.json();
  const notarias = await getNotarias();
  const filtradas = notarias.filter(n => n.id !== id);
  await saveNotarias(filtradas);
  return Response.json({ ok: true });
}
