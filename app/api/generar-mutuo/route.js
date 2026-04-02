import {
  Document, Packer, Paragraph, TextRun, AlignmentType, BorderStyle, UnderlineType
} from "docx";
 
const bold = (text) => new TextRun({ text, bold: true, font: "Times New Roman", size: 24 });
const normal = (text) => new TextRun({ text, font: "Times New Roman", size: 24 });
const boldUnderline = (text) => new TextRun({ text, bold: true, underline: { type: UnderlineType.SINGLE }, font: "Times New Roman", size: 24 });
const para = (children, options = {}) => new Paragraph({ children, spacing: { after: 160 }, ...options });
const paraJust = (children) => new Paragraph({ children, spacing: { after: 160 }, alignment: AlignmentType.JUSTIFIED });
 
function numToWords(n) {
  const units = ["", "un", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve",
    "diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve"];
  const tens = ["", "", "veinte", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
  const hundreds = ["", "ciento", "doscientos", "trescientos", "cuatrocientos", "quinientos",
    "seiscientos", "setecientos", "ochocientos", "novecientos"];
  if (n === 0) return "cero";
  if (n === 100) return "cien";
  if (n === 1000000) return "un millón";
  let result = "";
  if (n >= 1000000) {
    const m = Math.floor(n / 1000000);
    result += (m === 1 ? "un millón" : numToWords(m) + " millones") + " ";
    n %= 1000000;
  }
  if (n >= 1000) {
    const t = Math.floor(n / 1000);
    result += (t === 1 ? "mil" : numToWords(t) + " mil") + " ";
    n %= 1000;
  }
  if (n >= 100) { result += hundreds[Math.floor(n / 100)] + " "; n %= 100; }
  if (n >= 20) { result += tens[Math.floor(n / 10)] + (n % 10 ? " y " + units[n % 10] : "") + " "; n = 0; }
  else if (n > 0) result += units[n] + " ";
  return result.trim();
}
 
function generateMutuoVista(f) {
  const montoNum = parseInt(f.monto.replace(/\D/g, ""));
  const montoWords = numToWords(montoNum);
 
  return new Document({
    sections: [{
      properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1800 } } },
      children: [
        para([boldUnderline("CONTRATO DE MUTUO A LA VISTA.")], { alignment: AlignmentType.CENTER }),
        para([normal("********************")], { alignment: AlignmentType.CENTER }),
        para([bold(f.nombreMutuante.toUpperCase())], { alignment: AlignmentType.CENTER }),
        para([bold("A")], { alignment: AlignmentType.CENTER }),
        para([bold(f.nombreMutuaria)], { alignment: AlignmentType.CENTER }),
        para([normal("********************")], { alignment: AlignmentType.CENTER }),
        para([]),
        paraJust([
          normal(`En Santiago de Chile, a ${f.fechaContrato}, comparece como "mutuante y/o acreedor", don `),
          bold(f.nombreMutuante.toUpperCase()),
          normal(`, ${f.nacionalidadMutuante}, ${f.estadoCivilMutuante}, ${f.profesionMutuante}, cédula de identidad n° ${f.rutMutuante}, domiciliado en ${f.domicilioMutuante} y como "mutuaria y/o deudora" `),
          normal(f.esMutuariaEmpresa === "si" ? "" : "doña "),
          bold(f.nombreMutuaria),
          normal(f.esMutuariaEmpresa === "si"
            ? `, rol único tributario n° ${f.rutMutuaria}, debidamente representada por doña ${f.representanteMutuaria}, RUT ${f.rutRepresentanteMutuaria}`
            : `, ${f.nacionalidadMutuaria}, ${f.estadoCivilMutuaria}, ${f.profesionMutuaria}, cédula de identidad n° ${f.rutMutuaria}`),
          normal(`, domiciliado en ${f.domicilioMutuaria}, entre quienes se ha convenido el siguiente contrato de mutuo:`),
        ]),
        para([]),
        paraJust([
          bold("PRIMERO"), normal(`: Don `), bold(f.nombreMutuante.toUpperCase()),
          normal(`, por ${f.relacionPartes}, da en mutuo a `),
          bold(f.nombreMutuaria),
          normal(`, quien acepta para sí, la suma de `),
          bold(`$${parseInt(f.monto.replace(/\D/g,"")).toLocaleString("es-CL")} (${montoWords} pesos).`),
        ]),
        para([]),
        paraJust([bold("SEGUNDO:"), normal(" La mutuaria o deudora, se obliga a devolver la suma recibida en mutuo al mutuante, sin determinación de un plazo para tal efecto, bastando el solo requerimiento del mutuante. Requerido el pago antes indicado, se deberá materializar el pago dentro del plazo más breve, el que se podrá prorrogar razonablemente por restricciones o limitaciones de orden bancarias, motivos de seguridad o restricciones o limitaciones administrativas de alguna autoridad competente.")]),
        para([]),
        paraJust([bold("TERCERO:"), normal(` El capital adeudado devengará un interés mensual correspondiente al ${f.tasaInteres}% mensual, siendo también de cargo de la deudora cualquier cargo o impuesto fiscal que grava este contrato.`)]),
        para([]),
        paraJust([bold("CUARTO:"), normal(" El no pago de la suma recibida en mutuo al requerimiento del mutuante, dentro del plazo acordado, dará derecho a este para cobrar el máximo de interés que la Ley permita para estas operaciones de créditos, siendo de cargo de la mutuaria los honorarios profesionales, costas judiciales y cualquier otro gasto en que el mutuante incurriera para el cobro judicial o extrajudicial de la deuda.")]),
        para([]),
        paraJust([bold("QUINTO:"), normal(" Las partes asimismo acuerdan limitar la cesión del presente crédito por parte del mutuante, sea total o parcialmente, por lo cual esa cesión solo se podrá materializar cuando la mutuaria o deudora preste su pleno consentimiento, el que deberá constar por escrito.")]),
        para([]),
        paraJust([bold("SEXTO:"), normal(" Todas las obligaciones contraídas por el mutuario en el presente instrumento serán indivisibles para sus herederos.")]),
        para([]),
        paraJust([bold("SÉPTIMO:"), normal(` Todos los gastos originados por el presente contrato, serán asumidos íntegramente por parte de la mutuaria, ${f.esMutuariaEmpresa === "si" ? "" : "doña "}${bold(f.nombreMutuaria)}.`)]),
        para([]),
        paraJust([bold("OCTAVO:"), normal(" Para todos los efectos legales de este contrato, los comparecientes fijan su domicilio en la ciudad de Santiago, y prorrogan competencia para ante los Tribunales de la misma.")]),
        para([]),
        para([]),
        para([bold(f.nombreMutuante.toUpperCase())]),
        para([normal(`Rut ${f.rutMutuante}`)]),
        para([normal("Mutuante")]),
        para([]),
        para([]),
        para([bold(f.nombreMutuaria)]),
        para([normal(`Rut ${f.rutMutuaria}`)]),
        para([normal("Mutuaria")]),
      ]
    }]
  });
}
 
function generateMutuoCuotas(f) {
  const montoNum = parseInt(f.monto.replace(/\D/g, ""));
  const montoWords = numToWords(montoNum);
  const cuotaNum = parseInt(f.valorCuota.replace(/\D/g, ""));
  const cuotaWords = numToWords(cuotaNum);
 
  return new Document({
    sections: [{
      properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1800 } } },
      children: [
        para([boldUnderline("CONTRATO DE MUTUO.")], { alignment: AlignmentType.CENTER }),
        para([normal("********************")], { alignment: AlignmentType.CENTER }),
        para([bold(f.nombreMutuante.toUpperCase())], { alignment: AlignmentType.CENTER }),
        para([bold("A")], { alignment: AlignmentType.CENTER }),
        para([bold(f.nombreEmpresaMutuaria.toUpperCase())], { alignment: AlignmentType.CENTER }),
        para([normal("********************")], { alignment: AlignmentType.CENTER }),
        para([]),
        paraJust([
          normal(`En Santiago de Chile, a ${f.fechaContrato}, comparece como "mutuante y/o acreedor", don `),
          bold(f.nombreMutuante.toUpperCase()),
          normal(`, ${f.nacionalidadMutuante}, ${f.estadoCivilMutuante}, ${f.profesionMutuante}, Rut ${f.rutMutuante}, y como "mutuaria y/o deudora" la empresa `),
          bold(f.nombreEmpresaMutuaria.toUpperCase()),
          normal(f.nombreAlternativoEmpresa ? `, también en adelante como ` : ""),
          f.nombreAlternativoEmpresa ? bold(f.nombreAlternativoEmpresa) : normal(""),
          normal(`, rol único tributario n° ${f.rutEmpresa}, debidamente representada por `),
          normal(f.generoRepresentante === "M" ? "don " : "doña "),
          bold(f.representanteLegal.toUpperCase()),
          normal(`, ${f.nacionalidadRepresentante}, ${f.estadoCivilRepresentante}, ${f.profesionRepresentante}, Rut ${f.rutRepresentante}, todos domiciliados para estos efectos en ${f.domicilio}, entre quienes se ha convenido el siguiente contrato de mutuo:`),
        ]),
        para([]),
        paraJust([
          bold("PRIMERO"), normal(`: Don `), bold(f.nombreMutuante.toUpperCase()),
          normal(`, dio en préstamo a la deudora o mutuaria, la empresa `),
          bold(f.nombreEmpresaMutuaria.toUpperCase()),
          normal(`, la suma de `),
          bold(`$${montoNum.toLocaleString("es-CL")} (${montoWords} pesos)`),
          normal(`.`),
        ]),
        para([]),
        paraJust([
          bold("SEGUNDO:"), normal(` La mutuaria o deudora, se obliga a devolver la suma recibida en mutuo al mutuante, en ${f.numeroCuotas} cuotas iguales y sucesivas de $${cuotaNum.toLocaleString("es-CL")} (${cuotaWords} pesos), pagaderas los días ${f.diaPago} de cada mes, partiendo por el mes de ${f.mesInicio}.`),
        ]),
        para([]),
        paraJust([bold("TERCERO:"), normal(" La Mutuaria o deudora, se obliga desde ya a pagar todo gasto, cargo o impuesto fiscal que grave este contrato.")]),
        para([]),
        paraJust([bold("CUARTO:"), normal(` El no pago de una o más cuotas en las fechas acordadas en la cláusula segunda, o el simple retardo de estos pagos por un plazo de 30 o más días, dará derecho al acreedor o mutuante, para acelerar el vencimiento de la o las cuotas restantes, como si fueran de plazo vencido. Asimismo, las partes desde ya pactan que todo gasto o desembolso que deba incurrir el mutuante o acreedor para llevar a cabo esta cobranza, sea por honorarios profesionales, costas judiciales y cualquier otro, serán de cargo de la deudora o mutuaria.`)]),
        para([]),
        paraJust([bold("QUINTO:"), normal(` Todos los gastos originados por el presente contrato, serán asumidos íntegramente por parte del mutuario, la empresa `), bold(f.nombreEmpresaMutuaria.toUpperCase()), normal(".")]),
        para([]),
        paraJust([bold("SEXTO:"), normal(" Para todos los efectos legales de este contrato, los comparecientes fijan su domicilio en la ciudad de Santiago, y prorrogan competencia para ante los Tribunales de la misma.")]),
        para([]),
        paraJust([
          bold("SÉPTIMO:"), normal(` El poder de `),
          normal(f.generoRepresentante === "M" ? "don " : "doña "),
          bold(f.representanteLegal.toUpperCase()),
          normal(`, para representar a la empresa `),
          bold(f.nombreEmpresaMutuaria.toUpperCase()),
          normal(`, consta en escritura de fecha ${f.fechaEscritura}, suscrita en la notaría de ${f.notario}, Repertorio N° ${f.repertorio}, la que se tiene a la vista por el Sr. Notario que autoriza.`),
        ]),
        para([]),
        para([normal("Firman para constancia.")]),
        para([]),
        para([]),
        para([bold(f.nombreMutuante.toUpperCase())]),
        para([normal(`Rut ${f.rutMutuante}`)]),
        para([normal("Mutuante")]),
        para([]),
        para([]),
        para([bold(f.nombreEmpresaMutuaria.toUpperCase())]),
        para([normal(`Rut ${f.rutEmpresa}`)]),
        para([normal(`pp ${f.representanteLegal.toUpperCase()}`)]),
        para([normal(`Rut ${f.rutRepresentante}`)]),
        para([normal("Mutuario")]),
      ]
    }]
  });
}
 
export async function POST(req) {
  const { tipo, form } = await req.json();
 
  const doc = tipo === "vista" ? generateMutuoVista(form) : generateMutuoCuotas(form);
  const buffer = await Packer.toBuffer(doc);
  const filename = tipo === "vista"
    ? `Mutuo_Vista_${form.nombreMutuante.replace(/\s+/g, "_")}.docx`
    : `Mutuo_Cuotas_${form.nombreEmpresaMutuaria.replace(/\s+/g, "_")}.docx`;
 
  // Registrar actividad
  try {
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";
    await fetch(`${baseUrl}/api/registros`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tipo: tipo === "vista" ? "Mutuo A la Vista" : "Mutuo en Cuotas",
        cliente: tipo === "vista" ? form.nombreMutuaria : form.nombreEmpresaMutuaria,
        rut: tipo === "vista" ? form.rutMutuaria : form.rutEmpresa,
        abogado: "-",
        monto: tipo === "vista" ? form.monto?.replace(/\D/g,"") : form.monto?.replace(/\D/g,""),
      }),
    });
  } catch {}
 
  return new Response(buffer, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
