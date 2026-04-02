import { promises as fs } from "fs";
import path from "path";
 
const FILE = path.join("/tmp", "registros_gv.json");
 
async function leerRegistros() {
  try {
    const data = await fs.readFile(FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}
 
async function guardarRegistros(registros) {
  await fs.writeFile(FILE, JSON.stringify(registros), "utf-8");
}
 
// GET — obtener todos los registros
export async function GET() {
  const registros = await leerRegistros();
  return Response.json({ registros });
}
 
// POST — agregar nuevo registro
export async function POST(req) {
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
}
