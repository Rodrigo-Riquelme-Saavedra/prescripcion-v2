"use client";
import { useState } from "react";
 
const C = {
  bg: "#f0f0f5", surface: "#ffffff", border: "#c084fc",
  accent: "#a855f7", record: "#bf00ff", text: "#1e1b2e",
  muted: "#6b21a8", dim: "#e9e4f5", red: "#ef4444",
};
 
const Field = ({ label, k, form, set, placeholder, full, type = "text" }) => (
  <div style={{ gridColumn: full ? "1 / -1" : "span 1" }}>
    <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, letterSpacing: 2, marginBottom: 5, textTransform: "uppercase" }}>{label}</div>
    <input type={type} style={{ width: "100%", background: "#fff", border: `1px solid ${C.border}`, borderRadius: 6, padding: "9px 12px", color: C.text, fontFamily: "inherit", fontSize: 13, boxSizing: "border-box" }}
      value={form[k] || ""} onChange={(e) => set(k, e.target.value)} placeholder={placeholder || ""} />
  </div>
);
 
const Select = ({ label, k, form, set, options, full }) => (
  <div style={{ gridColumn: full ? "1 / -1" : "span 1" }}>
    <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, letterSpacing: 2, marginBottom: 5, textTransform: "uppercase" }}>{label}</div>
    <select style={{ width: "100%", background: "#fff", border: `1px solid ${C.border}`, borderRadius: 6, padding: "9px 12px", color: C.text, fontFamily: "inherit", fontSize: 13, boxSizing: "border-box" }}
      value={form[k] || ""} onChange={(e) => set(k, e.target.value)}>
      <option value="">Seleccionar...</option>
      {options.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
    </select>
  </div>
);
 
const SectionTitle = ({ children }) => (
  <div style={{ borderLeft: `4px solid ${C.record}`, paddingLeft: 14, marginBottom: 20, paddingTop: 4, paddingBottom: 4 }}>
    <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: 1, color: C.record, textTransform: "uppercase" }}>{children}</div>
  </div>
);
 
const Box = ({ children }) => (
  <div style={{ background: C.surface, border: `2px solid ${C.border}`, borderRadius: 12, padding: 28, boxShadow: "0 4px 20px rgba(168,85,247,0.1)", marginBottom: 20 }}>
    {children}
  </div>
);
 
// ── MUTUO A LA VISTA ──────────────────────────────────────────────────────────
function MutuoVista({ onBack }) {
  const [form, setForm] = useState({
    fechaContrato: "", nombreMutuante: "", rutMutuante: "", nacionalidadMutuante: "chileno",
    estadoCivilMutuante: "casado", profesionMutuante: "", domicilioMutuante: "",
    esMutuariaEmpresa: "no", nombreMutuaria: "", rutMutuaria: "", nacionalidadMutuaria: "chilena",
    estadoCivilMutuaria: "casada", profesionMutuaria: "", domicilioMutuaria: "",
    representanteMutuaria: "", rutRepresentanteMutuaria: "",
    relacionPartes: "", monto: "", tasaInteres: "0.125",
  });
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
 
  const handleGenerar = async () => {
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/generar-mutuo", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ tipo: "vista", form }) });
      if (!res.ok) throw new Error("Error");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = `Mutuo_Vista_${form.nombreMutuante.replace(/\s+/g,"_")}.docx`; a.click();
      URL.revokeObjectURL(url);
    } catch { setError("Error generando el documento."); }
    finally { setLoading(false); }
  };
 
  const STEPS = ["1. Mutuante", "2. Mutuaria", "3. Condiciones", "4. Vista Previa"];
 
  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Courier New', monospace", color: C.text }}>
      <Header title="CONTRATO DE MUTUO / A LA VISTA" onBack={onBack} />
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "32px 20px" }}>
        <StepNav steps={STEPS} step={step} setStep={setStep} />
 
        {step === 0 && (
          <Box>
            <SectionTitle>Datos del Mutuante / Acreedor</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
              <Field label="Nombre completo" k="nombreMutuante" form={form} set={set} full />
              <Field label="RUT" k="rutMutuante" form={form} set={set} placeholder="10.164.051-5" />
              <Field label="Profesión / Ocupación" k="profesionMutuante" form={form} set={set} />
              <Select label="Nacionalidad" k="nacionalidadMutuante" form={form} set={set} options={[{v:"chileno",l:"Chileno"},{v:"chilena",l:"Chilena"},{v:"extranjero",l:"Extranjero"}]} />
              <Select label="Estado Civil" k="estadoCivilMutuante" form={form} set={set} options={[{v:"casado",l:"Casado"},{v:"casada",l:"Casada"},{v:"soltero",l:"Soltero"},{v:"soltera",l:"Soltera"},{v:"divorciado",l:"Divorciado"},{v:"divorciada",l:"Divorciada"},{v:"viudo",l:"Viudo"},{v:"viuda",l:"Viuda"}]} />
              <Field label="Domicilio" k="domicilioMutuante" form={form} set={set} full />
            </div>
            <Btn onClick={() => setStep(1)}>Siguiente: Mutuaria →</Btn>
          </Box>
        )}
 
        {step === 1 && (
          <Box>
            <SectionTitle>Datos del Mutuaria / Deudora</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
              <Select label="¿La mutuaria es empresa?" k="esMutuariaEmpresa" form={form} set={set} options={[{v:"no",l:"No, es persona natural"},{v:"si",l:"Sí, es empresa"}]} full />
              <Field label="Nombre completo / Razón Social" k="nombreMutuaria" form={form} set={set} full />
              <Field label="RUT" k="rutMutuaria" form={form} set={set} placeholder="10.400.124-6" />
              {form.esMutuariaEmpresa === "no" && <>
                <Field label="Profesión / Ocupación" k="profesionMutuaria" form={form} set={set} />
                <Select label="Nacionalidad" k="nacionalidadMutuaria" form={form} set={set} options={[{v:"chilena",l:"Chilena"},{v:"chileno",l:"Chileno"},{v:"extranjera",l:"Extranjera"}]} />
                <Select label="Estado Civil" k="estadoCivilMutuaria" form={form} set={set} options={[{v:"casada",l:"Casada"},{v:"casado",l:"Casado"},{v:"soltera",l:"Soltera"},{v:"soltero",l:"Soltero"},{v:"divorciada",l:"Divorciada"},{v:"divorciado",l:"Divorciado"},{v:"viuda",l:"Viuda"},{v:"viudo",l:"Viudo"}]} />
              </>}
              {form.esMutuariaEmpresa === "si" && <>
                <Field label="Nombre Representante Legal" k="representanteMutuaria" form={form} set={set} />
                <Field label="RUT Representante" k="rutRepresentanteMutuaria" form={form} set={set} />
              </>}
              <Field label="Domicilio" k="domicilioMutuaria" form={form} set={set} full />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <BtnSecondary onClick={() => setStep(0)}>← Volver</BtnSecondary>
              <Btn onClick={() => setStep(2)}>Siguiente: Condiciones →</Btn>
            </div>
          </Box>
        )}
 
        {step === 2 && (
          <Box>
            <SectionTitle>Condiciones del Contrato</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
              <Field label="Fecha del contrato" k="fechaContrato" form={form} set={set} placeholder="15 de enero de 2026" full />
              <Field label="Monto del préstamo ($)" k="monto" form={form} set={set} placeholder="160000000" />
              <Field label="Tasa de interés mensual (%)" k="tasaInteres" form={form} set={set} placeholder="0.125" />
              <Field label="Relación entre las partes" k="relacionPartes" form={form} set={set} placeholder="razones de índole familiar" full />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <BtnSecondary onClick={() => setStep(1)}>← Volver</BtnSecondary>
              <Btn onClick={() => setStep(3)}>Vista Previa →</Btn>
            </div>
          </Box>
        )}
 
        {step === 3 && (
          <Box>
            <SectionTitle>Vista Previa — Contrato de Mutuo A la Vista</SectionTitle>
            <div style={{ background: "#faf8ff", border: `1px solid ${C.border}`, borderRadius: 8, padding: "24px 28px", fontSize: 12, lineHeight: 2, marginBottom: 20, maxHeight: 500, overflowY: "auto", fontFamily: "Georgia, serif" }}>
              <p style={{ textAlign: "center", fontWeight: 700, textDecoration: "underline" }}>CONTRATO DE MUTUO A LA VISTA.</p>
              <p style={{ textAlign: "center", fontWeight: 700 }}>{form.nombreMutuante.toUpperCase()}<br />A<br />{form.nombreMutuaria}</p>
              <p style={{ textAlign: "justify", marginTop: 16 }}>
                En Santiago de Chile, a {form.fechaContrato}, comparece como "mutuante y/o acreedor", don <strong>{form.nombreMutuante.toUpperCase()}</strong>, {form.nacionalidadMutuante}, {form.estadoCivilMutuante}, {form.profesionMutuante}, cédula de identidad n° {form.rutMutuante}, domiciliado en {form.domicilioMutuante} y como "mutuaria y/o deudora" {form.esMutuariaEmpresa === "no" ? "doña " : ""}<strong>{form.nombreMutuaria}</strong>{form.esMutuariaEmpresa === "no" ? `, ${form.nacionalidadMutuaria}, ${form.estadoCivilMutuaria}, ${form.profesionMutuaria}, cédula de identidad n° ${form.rutMutuaria}` : `, rol único tributario n° ${form.rutMutuaria}`}, domiciliado en {form.domicilioMutuaria}.
              </p>
              <p style={{ textAlign: "justify" }}><strong>PRIMERO:</strong> Don <strong>{form.nombreMutuante.toUpperCase()}</strong>, por {form.relacionPartes}, da en mutuo a <strong>{form.nombreMutuaria}</strong>, quien acepta para sí, la suma de <strong>${parseInt(form.monto||0).toLocaleString("es-CL")} pesos</strong>.</p>
              <p style={{ textAlign: "justify" }}><strong>SEGUNDO:</strong> La mutuaria o deudora, se obliga a devolver la suma recibida en mutuo al mutuante, sin determinación de un plazo para tal efecto, bastando el solo requerimiento del mutuante.</p>
              <p style={{ textAlign: "justify" }}><strong>TERCERO:</strong> El capital adeudado devengará un interés mensual correspondiente al {form.tasaInteres}% mensual.</p>
              <p style={{ color: C.muted, fontStyle: "italic" }}>[... cláusulas Cuarto a Octavo según plantilla ...]</p>
            </div>
            {error && <div style={{ background: "#fef2f2", border: `1px solid ${C.red}`, borderRadius: 6, padding: "10px 16px", color: C.red, fontSize: 12, marginBottom: 14 }}>⚠ {error}</div>}
            <div style={{ display: "flex", gap: 10 }}>
              <BtnSecondary onClick={() => setStep(2)}>← Editar</BtnSecondary>
              <button onClick={handleGenerar} disabled={loading} style={{ flex: 1, background: loading ? C.dim : `linear-gradient(135deg, ${C.record}, ${C.accent})`, border: "none", color: loading ? C.muted : "#fff", borderRadius: 6, padding: "13px 24px", fontFamily: "inherit", fontSize: 13, fontWeight: 700, letterSpacing: 2, cursor: loading ? "wait" : "pointer" }}>
                {loading ? "⏳ GENERANDO..." : "⬇ GENERAR Y DESCARGAR CONTRATO .DOCX"}
              </button>
            </div>
          </Box>
        )}
      </div>
    </div>
  );
}
 
// ── MUTUO EN CUOTAS ───────────────────────────────────────────────────────────
function MutuoCuotas({ onBack }) {
  const [form, setForm] = useState({
    fechaContrato: "", nombreMutuante: "", rutMutuante: "", nacionalidadMutuante: "chileno",
    estadoCivilMutuante: "casado", profesionMutuante: "",
    nombreEmpresaMutuaria: "", nombreAlternativoEmpresa: "", rutEmpresa: "",
    representanteLegal: "", rutRepresentante: "", nacionalidadRepresentante: "chilena",
    estadoCivilRepresentante: "divorciada", profesionRepresentante: "",
    generoRepresentante: "F", domicilio: "",
    monto: "", numeroCuotas: "", valorCuota: "", diaPago: "5", mesInicio: "",
    notario: "", fechaEscritura: "", repertorio: "",
  });
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
 
  const handleGenerar = async () => {
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/generar-mutuo", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ tipo: "cuotas", form }) });
      if (!res.ok) throw new Error("Error");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = `Mutuo_Cuotas_${form.nombreEmpresaMutuaria.replace(/\s+/g,"_")}.docx`; a.click();
      URL.revokeObjectURL(url);
    } catch { setError("Error generando el documento."); }
    finally { setLoading(false); }
  };
 
  const STEPS = ["1. Mutuante", "2. Mutuaria", "3. Condiciones", "4. Notaría", "5. Vista Previa"];
 
  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Courier New', monospace", color: C.text }}>
      <Header title="CONTRATO DE MUTUO / EN CUOTAS" onBack={onBack} />
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "32px 20px" }}>
        <StepNav steps={STEPS} step={step} setStep={setStep} />
 
        {step === 0 && (
          <Box>
            <SectionTitle>Datos del Mutuante / Acreedor</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
              <Field label="Nombre completo" k="nombreMutuante" form={form} set={set} full />
              <Field label="RUT" k="rutMutuante" form={form} set={set} placeholder="9.094.616-1" />
              <Field label="Profesión / Ocupación" k="profesionMutuante" form={form} set={set} />
              <Select label="Nacionalidad" k="nacionalidadMutuante" form={form} set={set} options={[{v:"chileno",l:"Chileno"},{v:"chilena",l:"Chilena"},{v:"extranjero",l:"Extranjero"}]} />
              <Select label="Estado Civil" k="estadoCivilMutuante" form={form} set={set} options={[{v:"casado",l:"Casado"},{v:"casada",l:"Casada"},{v:"soltero",l:"Soltero"},{v:"soltera",l:"Soltera"},{v:"divorciado",l:"Divorciado"},{v:"divorciada",l:"Divorciada"}]} />
            </div>
            <Btn onClick={() => setStep(1)}>Siguiente: Mutuaria →</Btn>
          </Box>
        )}
 
        {step === 1 && (
          <Box>
            <SectionTitle>Datos de la Empresa Mutuaria / Deudora</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
              <Field label="Razón Social" k="nombreEmpresaMutuaria" form={form} set={set} full />
              <Field label="Nombre alternativo / fantasia (opcional)" k="nombreAlternativoEmpresa" form={form} set={set} full placeholder="Ej: TINTA MAESTRA SpA" />
              <Field label="RUT Empresa" k="rutEmpresa" form={form} set={set} placeholder="78.018.021-8" />
              <Field label="Domicilio" k="domicilio" form={form} set={set} full />
              <div style={{ gridColumn: "1 / -1", borderTop: `1px solid ${C.dim}`, paddingTop: 16, marginTop: 4 }}>
                <div style={{ fontSize: 11, color: C.muted, fontWeight: 700, marginBottom: 12 }}>REPRESENTANTE LEGAL</div>
              </div>
              <Field label="Nombre Representante Legal" k="representanteLegal" form={form} set={set} full />
              <Field label="RUT Representante" k="rutRepresentante" form={form} set={set} placeholder="10.760.595-9" />
              <Field label="Profesión" k="profesionRepresentante" form={form} set={set} />
              <Select label="Género" k="generoRepresentante" form={form} set={set} options={[{v:"F",l:"Femenino (doña)"},{v:"M",l:"Masculino (don)"}]} />
              <Select label="Nacionalidad" k="nacionalidadRepresentante" form={form} set={set} options={[{v:"chilena",l:"Chilena"},{v:"chileno",l:"Chileno"},{v:"extranjera",l:"Extranjera"}]} />
              <Select label="Estado Civil" k="estadoCivilRepresentante" form={form} set={set} options={[{v:"divorciada",l:"Divorciada"},{v:"divorciado",l:"Divorciado"},{v:"casada",l:"Casada"},{v:"casado",l:"Casado"},{v:"soltera",l:"Soltera"},{v:"soltero",l:"Soltero"}]} />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <BtnSecondary onClick={() => setStep(0)}>← Volver</BtnSecondary>
              <Btn onClick={() => setStep(2)}>Siguiente: Condiciones →</Btn>
            </div>
          </Box>
        )}
 
        {step === 2 && (
          <Box>
            <SectionTitle>Condiciones del Préstamo</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
              <Field label="Fecha del contrato" k="fechaContrato" form={form} set={set} placeholder="15 de enero de 2026" full />
              <Field label="Monto total del préstamo ($)" k="monto" form={form} set={set} placeholder="30666395" />
              <Field label="Número de cuotas" k="numeroCuotas" form={form} set={set} placeholder="24" />
              <Field label="Valor de cada cuota ($)" k="valorCuota" form={form} set={set} placeholder="1624563" />
              <Field label="Día de pago mensual" k="diaPago" form={form} set={set} placeholder="5" />
              <Field label="Mes de inicio de pagos" k="mesInicio" form={form} set={set} placeholder="enero del año 2026" />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <BtnSecondary onClick={() => setStep(1)}>← Volver</BtnSecondary>
              <Btn onClick={() => setStep(3)}>Siguiente: Notaría →</Btn>
            </div>
          </Box>
        )}
 
        {step === 3 && (
          <Box>
            <SectionTitle>Datos de la Notaría</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
              <Field label="Nombre del Notario" k="notario" form={form} set={set} placeholder="don Francisco Varas Fernández, Notario 32ª Notaría Santiago" full />
              <Field label="Fecha de la escritura" k="fechaEscritura" form={form} set={set} placeholder="08 de enero de 2025" />
              <Field label="N° de Repertorio" k="repertorio" form={form} set={set} placeholder="502" />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <BtnSecondary onClick={() => setStep(2)}>← Volver</BtnSecondary>
              <Btn onClick={() => setStep(4)}>Vista Previa →</Btn>
            </div>
          </Box>
        )}
 
        {step === 4 && (
          <Box>
            <SectionTitle>Vista Previa — Contrato de Mutuo en Cuotas</SectionTitle>
            <div style={{ background: "#faf8ff", border: `1px solid ${C.border}`, borderRadius: 8, padding: "24px 28px", fontSize: 12, lineHeight: 2, marginBottom: 20, maxHeight: 500, overflowY: "auto", fontFamily: "Georgia, serif" }}>
              <p style={{ textAlign: "center", fontWeight: 700, textDecoration: "underline" }}>CONTRATO DE MUTUO.</p>
              <p style={{ textAlign: "center", fontWeight: 700 }}>{form.nombreMutuante.toUpperCase()}<br />A<br />{form.nombreEmpresaMutuaria.toUpperCase()}</p>
              <p style={{ textAlign: "justify", marginTop: 16 }}>
                En Santiago de Chile, a {form.fechaContrato}, comparece como "mutuante y/o acreedor", don <strong>{form.nombreMutuante.toUpperCase()}</strong>, {form.nacionalidadMutuante}, {form.estadoCivilMutuante}, {form.profesionMutuante}, Rut {form.rutMutuante}, y como "mutuaria y/o deudora" la empresa <strong>{form.nombreEmpresaMutuaria.toUpperCase()}</strong>{form.nombreAlternativoEmpresa ? `, también en adelante como ${form.nombreAlternativoEmpresa}` : ""}, rol único tributario n° {form.rutEmpresa}, debidamente representada por {form.generoRepresentante === "F" ? "doña" : "don"} <strong>{form.representanteLegal.toUpperCase()}</strong>, {form.nacionalidadRepresentante}, {form.estadoCivilRepresentante}, {form.profesionRepresentante}, Rut {form.rutRepresentante}, todos domiciliados en {form.domicilio}.
              </p>
              <p style={{ textAlign: "justify" }}><strong>PRIMERO:</strong> Don <strong>{form.nombreMutuante.toUpperCase()}</strong>, dio en préstamo a la deudora o mutuaria, la empresa <strong>{form.nombreEmpresaMutuaria.toUpperCase()}</strong>, la suma de <strong>${parseInt(form.monto||0).toLocaleString("es-CL")} pesos</strong>.</p>
              <p style={{ textAlign: "justify" }}><strong>SEGUNDO:</strong> La mutuaria se obliga a devolver la suma en <strong>{form.numeroCuotas} cuotas</strong> de <strong>${parseInt(form.valorCuota||0).toLocaleString("es-CL")}</strong>, pagaderas los días <strong>{form.diaPago}</strong> de cada mes, partiendo en <strong>{form.mesInicio}</strong>.</p>
              <p style={{ color: C.muted, fontStyle: "italic" }}>[... cláusulas Tercero a Séptimo según plantilla ...]</p>
            </div>
            {error && <div style={{ background: "#fef2f2", border: `1px solid ${C.red}`, borderRadius: 6, padding: "10px 16px", color: C.red, fontSize: 12, marginBottom: 14 }}>⚠ {error}</div>}
            <div style={{ display: "flex", gap: 10 }}>
              <BtnSecondary onClick={() => setStep(3)}>← Editar</BtnSecondary>
              <button onClick={handleGenerar} disabled={loading} style={{ flex: 1, background: loading ? C.dim : `linear-gradient(135deg, ${C.record}, ${C.accent})`, border: "none", color: loading ? C.muted : "#fff", borderRadius: 6, padding: "13px 24px", fontFamily: "inherit", fontSize: 13, fontWeight: 700, letterSpacing: 2, cursor: loading ? "wait" : "pointer" }}>
                {loading ? "⏳ GENERANDO..." : "⬇ GENERAR Y DESCARGAR CONTRATO .DOCX"}
              </button>
            </div>
          </Box>
        )}
      </div>
    </div>
  );
}
 
// ── SHARED COMPONENTS ─────────────────────────────────────────────────────────
function Header({ title, onBack }) {
  return (
    <div style={{ background: "linear-gradient(135deg, #0a0a2e 0%, #1a0a3e 50%, #0a1a3e 100%)", borderBottom: `3px solid ${C.record}`, padding: "0 32px", height: 72, display: "flex", alignItems: "center", gap: 18 }}>
      <img src="https://raw.githubusercontent.com/Rodrigo-Riquelme-Saavedra/prescripcion-v2/main/public/PaginaWeb.png" alt="Grupo GV" style={{ height: 54, objectFit: "contain", filter: "drop-shadow(0 0 12px rgba(100,180,255,0.6))" }} onError={(e) => { e.target.style.display = "none"; }} />
      <div style={{ width: 1, height: 36, background: `linear-gradient(to bottom, transparent, ${C.record}, transparent)` }} />
      <div>
        <div style={{ fontWeight: 700, fontSize: 13, letterSpacing: 2, color: "#fff" }}>{title}</div>
        <div style={{ fontSize: 10, color: C.accent, letterSpacing: 1.5, marginTop: 2 }}>Grupo GV · Generador de Documentos Legales</div>
      </div>
      <button onClick={onBack} style={{ marginLeft: "auto", background: "rgba(191,0,255,0.15)", border: `1px solid ${C.record}`, borderRadius: 20, padding: "6px 16px", fontSize: 11, color: C.accent, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
        ← Volver al Portal
      </button>
    </div>
  );
}
 
function StepNav({ steps, step, setStep }) {
  return (
    <div style={{ display: "flex", marginBottom: 32, border: `1px solid ${C.border}`, borderRadius: 8, overflow: "hidden" }}>
      {steps.map((s, i) => (
        <button key={s} onClick={() => i <= step && setStep(i)}
          style={{ flex: 1, padding: "11px 0", background: i === step ? C.record : i < step ? C.dim : C.surface, border: "none", borderRight: i < steps.length - 1 ? `1px solid ${C.border}` : "none", color: i === step ? "#fff" : i < step ? C.accent : C.muted, fontFamily: "inherit", fontSize: 10, fontWeight: 700, letterSpacing: 1, cursor: i <= step ? "pointer" : "default" }}>
          {i < step ? "✓ " : ""}{s}
        </button>
      ))}
    </div>
  );
}
 
const Btn = ({ onClick, children }) => (
  <button onClick={onClick} style={{ flex: 1, background: `linear-gradient(135deg, ${C.record}, ${C.accent})`, border: "none", color: "#fff", borderRadius: 6, padding: "11px 20px", fontFamily: "inherit", fontSize: 12, fontWeight: 700, letterSpacing: 1, cursor: "pointer" }}>{children}</button>
);
 
const BtnSecondary = ({ onClick, children }) => (
  <button onClick={onClick} style={{ background: C.dim, border: `1px solid ${C.border}`, color: C.text, borderRadius: 6, padding: "11px 20px", fontFamily: "inherit", fontSize: 12, cursor: "pointer" }}>{children}</button>
);
 
// ── SELECTOR DE TIPO ──────────────────────────────────────────────────────────
export default function MutuoModule({ onBack }) {
  const [tipo, setTipo] = useState(null);
 
  if (tipo === "vista") return <MutuoVista onBack={() => setTipo(null)} />;
  if (tipo === "cuotas") return <MutuoCuotas onBack={() => setTipo(null)} />;
 
  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Courier New', monospace", color: C.text }}>
      <Header title="CONTRATOS DE MUTUO" onBack={onBack} />
      <div style={{ maxWidth: 700, margin: "60px auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ fontSize: 11, color: C.muted, letterSpacing: 4, fontWeight: 700, marginBottom: 10 }}>SELECCIONA EL TIPO DE CONTRATO</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: C.text, marginBottom: 8 }}>¿Qué contrato deseas generar?</div>
          <div style={{ width: 50, height: 3, background: `linear-gradient(to right, ${C.record}, ${C.accent})`, margin: "0 auto", borderRadius: 2 }} />
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {[
            { id: "vista", icon: "🤝", title: "Mutuo A la Vista", desc: "Sin plazo fijo. El mutuante puede exigir el pago en cualquier momento mediante requerimiento.", fields: ["Datos mutuante y mutuaria", "Monto del préstamo", "Tasa de interés mensual", "Relación entre partes"] },
            { id: "cuotas", icon: "📅", title: "Mutuo en Cuotas", desc: "Con plan de pagos definido. Cuotas iguales y sucesivas con fecha de inicio determinada.", fields: ["Datos mutuante y empresa", "Representante legal", "N° cuotas y valor", "Datos notaría"] },
          ].map(mod => (
            <div key={mod.id} onClick={() => setTipo(mod.id)}
              style={{ background: C.surface, border: `2px solid ${C.border}`, borderRadius: 14, padding: "28px 24px", cursor: "pointer", transition: "all 0.2s", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
              onMouseEnter={e => { e.currentTarget.style.border = `2px solid ${C.record}`; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 8px 32px rgba(191,0,255,0.2)`; }}
              onMouseLeave={e => { e.currentTarget.style.border = `2px solid ${C.border}`; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)"; }}>
              <div style={{ fontSize: 36, marginBottom: 14 }}>{mod.icon}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 8 }}>{mod.title}</div>
              <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.6, marginBottom: 16 }}>{mod.desc}</div>
              <div style={{ borderTop: `1px solid ${C.dim}`, paddingTop: 12 }}>
                {mod.fields.map(f => (
                  <div key={f} style={{ fontSize: 11, color: C.text, marginBottom: 4, display: "flex", gap: 6 }}>
                    <span style={{ color: C.record }}>✓</span> {f}
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, fontSize: 11, fontWeight: 700, color: C.record, letterSpacing: 1 }}>Generar contrato →</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
