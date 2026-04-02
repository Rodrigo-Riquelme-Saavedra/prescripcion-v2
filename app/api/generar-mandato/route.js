import { Document, Packer, Paragraph, TextRun, AlignmentType, UnderlineType } from "docx";
 
const bold = (text) => new TextRun({ text, bold: true, font: "Times New Roman", size: 24 });
const normal = (text) => new TextRun({ text, font: "Times New Roman", size: 24 });
const boldU = (text) => new TextRun({ text, bold: true, underline: { type: UnderlineType.SINGLE }, font: "Times New Roman", size: 24 });
const para = (children, options = {}) => new Paragraph({ children, spacing: { after: 160 }, alignment: AlignmentType.JUSTIFIED, ...options });
const paraCenter = (children) => new Paragraph({ children, spacing: { after: 160 }, alignment: AlignmentType.CENTER });
 
function generateJuridicaDoc(form) {
  return new Document({
    sections: [{
      properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1800 } } },
      children: [
        paraCenter([bold(form.nombreEmpresa.toUpperCase() + ".")]),
        paraCenter([normal("*********")]),
        para([]),
        para([
          normal("comparece: doña "), bold(form.nombreRep1.toUpperCase()),
          normal(`, chilena, ${form.estadoCivilRep1}, ${form.profesionRep1}, cédula de identidad número ${form.rutRep1}, y doña `),
          bold(form.nombreRep2.toUpperCase()),
          normal(`, chilena, ${form.estadoCivilRep2}, ${form.profesionRep2}, cédula de identidad número ${form.rutRep2}, quienes comparecen en representación de la empresa `),
          bold(form.nombreEmpresa.toUpperCase() + ","),
          normal(` empresa del giro de su denominación, rol único tributario número ${form.rutEmpresa}, todos domiciliados en ${form.domicilioEmpresa}, las comparecientes mayores de edad, quienes acreditan sus identidades con las cédulas antes citadas y exponen:`),
        ]),
        para([boldU("PRIMERO:"), normal(` Que por el presente instrumento vienen en conferir mandato judicial amplio, al abogado, don `), bold(form.nombreAbogado.toUpperCase()), normal(`, cédula de identidad número ${form.rutAbogado}, domiciliado en ${form.domicilioAbogado}, para que en nombre de su representada, como asimismo en representación de las comparecientes, pueda comparecer en cualquier gestión y/o proceso o juicios, con la especial esencial limitación de no poder contestar nuevas demandas ni ser emplazado en gestión jurisdiccional alguna, sin previa notificación legal a las poderdantes. Se confiere al mandatario, las facultades indicadas en los incisos primero y segundo del artículo séptimo del Código de Procedimiento Civil y, especialmente, las de demandar, querellarse, iniciar cualesquiera otra especie de gestión judicial, sean de jurisdicción voluntaria o contenciosa, reconvenir, contestar demandas y reconvenciones, desistirse en primera instancia de la acción deducida, aceptar la demanda contraria previo emplazamiento personal al o los demandantes, renunciar a los recursos o términos legales y/o judiciales, transigir, comprometer, aprobar convenios judiciales y/o extrajudiciales; y percibir. En el desempeño del mandato, el mandatario podrá representarnos en todos los trámites y/o actos judiciales que les sean necesarios para el éxito de la gestión encomendada en cualquier tribunal de orden jurisdiccional y en proceso o causa o juicio de cualquier naturaleza, pudiendo nombrar, en dichas gestiones y/o procesos, abogados patrocinantes y apoderados con todas las facultades que posee este instrumento, y pudiendo delegar este poder y reasumirlo cuantas veces estime conveniente o pertinente.`)]),
        para([boldU("SEGUNDO:"), normal(" Las partes dejan establecido que la obligación que contrae el mandatario es de medios y no de resultados; y en cuanto a los gastos o costas de tramitación, estas serán soportadas por el cliente en la medida que sean necesarias.")]),
        para([boldU("TERCERO:"), normal(` La personería de ${form.nombreRep1}, y ${form.nombreRep2}, para representar a la sociedad ${form.nombreEmpresa} consta en escritura pública de ${form.fechaPersoneria}, suscrita ante la ${form.notaria}, repertorio número ${form.repertorio}. En comprobante y previa lectura, firman las comparecientes ante el Notario que autoriza. Se da copia. Doy Fe.-`)]),
        para([]),
        para([]),
        paraCenter([bold(form.nombreEmpresa.toUpperCase())]),
        paraCenter([normal(`pp ${form.nombreRep1.toUpperCase()}`)]),
        para([]),
        paraCenter([bold(form.nombreEmpresa.toUpperCase())]),
        paraCenter([normal(`pp ${form.nombreRep2.toUpperCase()}`)]),
      ]
    }]
  });
}
 
function generateNaturalDoc(form) {
  return new Document({
    sections: [{
      properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1800 } } },
      children: [
        paraCenter([bold(form.nombreAbogado.toUpperCase() + ".")]),
        para([]),
        para([
          normal("Comparece: don "), bold(form.nombreMandante.toUpperCase()),
          normal(`, chileno, ${form.estadoCivilMandante}, ${form.profesionMandante}, cédula de identidad número ${form.rutMandante}, domiciliado en ${form.domicilioMandante}, quien comparece por sí, el compareciente mayor de edad, quien acredita su identidad con la cédula antes citada y expone:`),
        ]),
        para([boldU("PRIMERO:"), normal(` Que por el presente instrumento viene en conferir mandato judicial amplio al abogado, señor `), bold(form.nombreAbogado.toUpperCase()), normal(`, cédula nacional de identidad número ${form.rutAbogado}, domiciliado en ${form.domicilioAbogado}, quien podrá actuar en su representación personal, en cualquier gestión y/o proceso o juicios, cualquiera sea su naturaleza, cuantía o entidad, actualmente pendiente o que ocurran en el futuro, con esencial limitación de no poder contestar nuevas demandas ni ser emplazado en gestión jurisdiccional alguna, sin previa notificación legal al poderdante. Se confiere al mandatario, las facultades indicadas en los incisos primero y segundo del artículo séptimo del Código de Procedimiento Civil y, especialmente, las de demandar, iniciar cualesquiera otra especie de gestión judicial, sean de jurisdicción voluntaria o contenciosa, reconvenir, contestar demandas y reconvenciones, desistirse en primera instancia de la acción deducida, aceptar la demanda contraria previo emplazamiento personal al o los demandantes, renunciar a los recursos o términos legales y/o judiciales, transigir, comprometer, aprobar convenios judiciales y/o extrajudiciales; y percibir. En el desempeño del mandato, el mandatario podrá representar al mandante en todos los trámites y/o actos judiciales que les sean necesarios para el éxito de la gestión encomendada en cualquier tribunal de orden jurisdiccional y en proceso o causa o juicio de cualquier naturaleza, pudiendo nombrar, en dichas gestiones y/o procesos, abogados patrocinantes y apoderados con todas las facultades que posee este instrumento, y pudiendo delegar este poder y reasumirlo cuantas veces estime conveniente o pertinente.`)]),
        para([boldU("SEGUNDO:"), normal(" Las partes dejan establecido que la obligación que contrae el mandatario es de medios y no de resultados; y en cuanto a los gastos o costas de tramitación, estas serán soportadas por el cliente en la medida que sean necesarias.")]),
        ...(form.tienePlazo === "si" ? [para([boldU("TERCERO:"), normal(` El presente mandato se otorga por un plazo de ${form.plazo}, el que se cuenta a partir de la fecha de este instrumento.`)])] : []),
        para([normal("Minuta redactada por abogado don "), bold(form.nombreAbogado), normal(". En comprobante y previa lectura, firma la compareciente ante el Notario que autoriza, quedando anotada en el repertorio bajo el Número:")]),
        para([]),
        para([]),
        paraCenter([bold(form.nombreMandante.toUpperCase())]),
      ]
    }]
  });
}
 
function generateGeneralDoc(form) {
  const mandatariosTexto = form.mandatarios.filter(m => m.nombre).map(m =>
    `${bold(m.nombre.toUpperCase())}`
  );
 
  return new Document({
    sections: [{
      properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, right: 1440, bottom: 1440, left: 1800 } } },
      children: [
        paraCenter([bold("MANDATO GENERAL.")]),
        paraCenter([normal("********")]),
        paraCenter([bold(form.nombreMandante.toUpperCase() + ".")]),
        paraCenter([bold("A")]),
        paraCenter([bold(form.mandatarios[0]?.nombre?.toUpperCase() + " Y OTROS.")]),
        paraCenter([normal("************")]),
        para([
          normal("comparece: doña "), bold(form.nombreMandante.toUpperCase()),
          normal(`, chilena, ${form.estadoCivilMandante}, ${form.profesionMandante}, cédula nacional de identidad número ${form.rutMandante}, con domicilio en ${form.domicilioMandante}, la compareciente mayor de edad, quien acredita su identidad con la cédula antes citada y expone: Que viene en conferir poder general amplio, con administración y disposición de bienes, en `),
          ...form.mandatarios.filter(m => m.nombre).flatMap((m, i, arr) => [
            bold(m.nombre.toUpperCase()),
            normal(`, chileno/a, ${m.estadoCivil}, ${m.profesion}, cédula nacional de identidad número ${m.rut}${i < arr.length - 1 ? "; " : ", "}`),
          ]),
          normal(`quienes para representarme plenamente, se requerirá la comparecencia de al menos ${form.quorum} de los ${form.mandatarios.filter(m => m.nombre).length} antes indicados, me representarán en todos los asuntos, juicios y negocios de cualquier naturaleza que sean y que actualmente tenga pendientes o les ocurran en lo sucesivo ante cualquier persona, natural o jurídica y ante cualquier autoridad, institución o corporación, ya sea civil, militar, judicial, religiosa o administrativa. En el ejercicio de este mandato los mandatarios podrán representar a la mandante con las más amplias facultades, sin limitación alguna.`),
        ]),
        para([normal("La presente escritura ha sido extendida a requerimiento y por instrucciones del compareciente, en conformidad al artículo cuatrocientos uno, número uno del Código Orgánico de Tribunales. En comprobante y previa lectura firma el compareciente. Se da copia. Anotada bajo el repertorio número.")]),
        para([]),
        para([]),
        paraCenter([bold(form.nombreMandante.toUpperCase())]),
      ]
    }]
  });
}
 
export async function POST(req) {
  const { tipo, form } = await req.json();
 
  let doc;
  let filename;
 
  if (tipo === "judicial-juridica") {
    doc = generateJuridicaDoc(form);
    filename = `Mandato_Judicial_Juridica_${form.nombreEmpresa.replace(/\s+/g, "_")}.docx`;
  } else if (tipo === "judicial-natural") {
    doc = generateNaturalDoc(form);
    filename = `Mandato_Judicial_Natural_${form.nombreMandante.replace(/\s+/g, "_")}.docx`;
  } else {
    doc = generateGeneralDoc(form);
    filename = `Mandato_General_${form.nombreMandante.replace(/\s+/g, "_")}.docx`;
  }
 
  const buffer = await Packer.toBuffer(doc);
 
  return new Response(buffer, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
