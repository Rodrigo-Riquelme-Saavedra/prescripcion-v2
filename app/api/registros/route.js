const BASE_URL = "https://api.jsonbin.io/v3/b";
const BIN_ID = process.env.JSONBIN_BIN_ID;
const API_KEY = process.env.JSONBIN_API_KEY;
 
async function leerRegistros() {
  const res = await fetch(`${BASE_URL}/${BIN_ID}/latest`, {
    headers: { "X-Master-Key": API_KEY },
  });
  const data = await res.json();
  return data.record?.registros || [];
}
 
async function guardarRegistros(registros) {
  await fetch(`${BASE_URL}/${BIN_ID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": API_KEY,
    },
    body: JSON.stringify({ registros }),
  });
}
 
// GET — obtener todos los registros
export async function GET() {
  try {
    const registros = await leerRegistros();
    return Response.json({ registros });
  } catch (err) {
    console.error("Error leyendo registros:", err);
    return Response.json({ registros: [] });
  }
}
 
// POST — agregar nuevo registro
export async function POST(req) {
  try {
    const body = await req.json();
    const registros = await leerRegistros();
    const nuevo = {
      id: Date.now(),
      fecha: new Date().toLocaleString("es-CL", { timeZone: "America/Santiago" }),
      tipo: body.tipo || "Desconocido",
      cliente: body.cliente || "-",
      rut: body.rut || "-",
      abogado: body.abogado || "-",
      monto: body.monto || null,
    };
    registros.push(nuevo);
    await guardarRegistros(registros);
    return Response.json({ ok: true, registro: nuevo });
  } catch (err) {
    console.error("Error guardando registro:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
