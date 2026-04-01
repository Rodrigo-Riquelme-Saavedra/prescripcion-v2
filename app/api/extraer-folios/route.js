export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    if (!file) return Response.json({ error: "No se recibió archivo" }, { status: 400 });
 
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const isPdf = file.name.toLowerCase().endsWith(".pdf");
 
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-opus-4-5",
        max_tokens: 2000,
        messages: [
          {
            role: "user",
            content: [
              isPdf
                ? { type: "document", source: { type: "base64", media_type: "application/pdf", data: base64 } }
                : { type: "text", text: "Archivo con datos de certificado TGR." },
              {
                type: "text",
                text: `Eres un extractor de datos de certificados de deuda de la Tesorería General de la República de Chile (TGR).
 
Extrae TODOS los folios de la tabla "Deuda Morosa (CLP)" del certificado.
Ignora la fila de totales "Total Deuda Morosa".
 
Responde ÚNICAMENTE con un JSON array puro, sin texto adicional, sin bloques de código markdown, sin explicaciones.
 
Formato exacto:
[{"folio":"403662","fechaVcto":"00-00-0000","deudaNeta":48353,"reajuste":0,"interes":0,"multa":0,"total":48353}]
 
Reglas:
- El campo folio es el número de la columna FOLIO
- Los números deben ser enteros sin puntos ni comas
- Si la fecha es 00-00-0000 mantenla exactamente así
- Incluye TODOS los folios de TODAS las páginas`,
              },
            ],
          },
        ],
      }),
    });
 
    const data = await response.json();
    if (!response.ok) {
      console.error("Anthropic error:", data);
      return Response.json({ error: "Error en la API de IA" }, { status: 500 });
    }
 
    const text = data.content?.[0]?.text || "";
    const clean = text.replace(/```json|```/g, "").trim();
    const folios = JSON.parse(clean);
 
    if (!Array.isArray(folios) || folios.length === 0) {
      return Response.json({ error: "No se encontraron folios en el documento" }, { status: 400 });
    }
 
    return Response.json({ folios });
  } catch (err) {
    console.error("Error:", err);
    return Response.json({ error: "Error procesando el documento: " + err.message }, { status: 500 });
  }
}
