const BASE_URL = "https://api.jsonbin.io/v3/b";
const BIN_ID = process.env.JSONBIN_BIN_ID;
const API_KEY = process.env.JSONBIN_API_KEY;
 
async function leerRegistros() {
  try {
    const res = await fetch(`${BASE_URL}/${BIN_ID}/latest`, {
      headers: { 
        "X-Master-Key": API_KEY,
        "X-Bin-Meta": "false"
      },
    });
    if (!res.ok) {
      console.error("JSONBin GET error:", res.status, await res.text());
      return [];
    }
    const data = await res.json();
    return Array.isArray(data.registros) ? data.registros : [];
  } catch (err) {
    console.error("Error leerRegistros:", err);
    return [];
  }
}
 
async function guardarRegistros(registros) {
  const res = await fetch(`${BASE_URL}/${BIN_ID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Master-Key": API_KEY,
    },
    body: JSON.stringify({ registros }),
  });
  if (!res.ok) {
    const text = await res.text();
    console.error("JSONBin PUT error:", res.status, text);
    throw new Error(`JSONBin PUT failed: ${res.status}`);
  }
  return res.json();
}
 
// GET — obtener todos los registros
export async function GET() {
  try {
    if (!BIN_ID || !API_KEY) {
      console.error("Faltan variables: JSONBIN_BIN_ID o JSONBIN_API_KEY");
      return Response.json({ registros: [], error: "Variables de entorno no configuradas" });
    }
    const registros = await leerRegistros();
    return Response.json({ registros });
  } catch (err) {
    console.error("GET error:", err);
    return Response.json({ registros: [], error: err.message });
  }
}
 
// POST — agregar nuevo registro
export async function POST(req) {
  try {
    if (!BIN_ID || !API_KEY) {
      console.error("Faltan variables: JSONBIN_BIN_ID o JSONBIN_API_KEY");
      return Response.json({ error: "Variables de entorno no configuradas" }, { status: 500 });
    }
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
    console.log("Registro guardado:", nuevo);
    return Response.json({ ok: true, registro: nuevo });
  } catch (err) {
    console.error("POST error:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
