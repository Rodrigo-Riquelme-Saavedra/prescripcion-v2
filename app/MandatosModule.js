"use client";
import { useState } from "react";
import ModuleHero from "./ModuleHero";
 
const C = {
  bg: "#f4f4f4", surface: "#ffffff", border: "#c8b8a2",
  accent: "#b52240", record: "#8b1a2e", text: "#1e1e1e",
  muted: "#555555", dim: "#eeeeee", red: "#c0392b", green: "#27ae60",
};
 
async function registrarActividad(tipo, cliente, rut) {
  try {
    await fetch("/api/registros", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tipo, cliente, rut, abogado: "-", monto: null }),
    });
  } catch {}
}
 
const Field = ({ label, k, form, set, placeholder, full }) => (
  <div style={{ gridColumn: full ? "1 / -1" : "span 1" }}>
    <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, letterSpacing: 2, marginBottom: 5, textTransform: "uppercase", fontFamily: "'Courier New', monospace" }}>{label}</div>
    <input style={{ width: "100%", background: "#fff", border: `1px solid ${C.border}`, borderRadius: 4, padding: "9px 12px", color: C.text, fontFamily: "'Courier New', monospace", fontSize: 13, boxSizing: "border-box" }}
      value={form[k] || ""} onChange={(e) => set(k, e.target.value)} placeholder={placeholder || ""} />
  </div>
);
 
const Select = ({ label, k, form, set, options, full }) => (
  <div style={{ gridColumn: full ? "1 / -1" : "span 1" }}>
    <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, letterSpacing: 2, marginBottom: 5, textTransform: "uppercase", fontFamily: "'Courier New', monospace" }}>{label}</div>
    <select style={{ width: "100%", background: "#fff", border: `1px solid ${C.border}`, borderRadius: 4, padding: "9px 12px", color: C.text, fontFamily: "'Courier New', monospace", fontSize: 13, boxSizing: "border-box" }}
      value={form[k] || ""} onChange={(e) => set(k, e.target.value)}>
      <option value="">Seleccionar...</option>
      {options.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
    </select>
  </div>
);
 
const Box = ({ children }) => (
  <div style={{ background: C.surface, border: `1px solid #ddd`, borderLeft: `4px solid #8b1a2e`, borderRadius: 4, padding: 28, marginBottom: 20, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
    {children}
  </div>
);
 
const SectionTitle = ({ children }) => (
  <div style={{ marginBottom: 20 }}>
    <div style={{ fontSize: 13, fontWeight: 700, color: "#8b1a2e", letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "'Courier New', monospace" }}>{children}</div>
    <div style={{ width: 30, height: 2, background: "#8b1a2e", marginTop: 6 }} />
  </div>
);
 
const BtnPrimary = ({ onClick, children, disabled }) => (
  <button onClick={onClick} disabled={disabled}
    style={{ flex: 1, background: disabled ? "#eee" : "linear-gradient(135deg, #8b1a2e, #b52240)", border: "none", color: disabled ? "#999" : "#fff", borderRadius: 4, padding: "11px 20px", fontFamily: "inherit", fontSize: 12, fontWeight: 700, letterSpacing: 1, cursor: disabled ? "default" : "pointer" }}>
    {children}
  </button>
);
 
const BtnSecondary = ({ onClick, children }) => (
  <button onClick={onClick} style={{ background: "#f4f4f4", border: "1px solid #ddd", color: "#1e1e1e", borderRadius: 4, padding: "11px 20px", fontFamily: "inherit", fontSize: 12, cursor: "pointer" }}>
    {children}
  </button>
);
 
function StepNav({ steps, step, setStep }) {
  return (
    <div style={{ display: "flex", marginBottom: 28, border: "1px solid #ddd", borderRadius: 4, overflow: "hidden" }}>
      {steps.map((s, i) => (
        <button key={s} onClick={() => i <= step && setStep(i)}
          style={{ flex: 1, padding: "11px 0", background: i === step ? "#8b1a2e" : i < step ? "#f0e8e8" : "#ffffff", border: "none", borderRight: i < steps.length - 1 ? "1px solid #ddd" : "none", color: i === step ? "#fff" : i < step ? "#8b1a2e" : "#888", fontFamily: "inherit", fontSize: 11, fontWeight: 700, letterSpacing: 1, cursor: i <= step ? "pointer" : "default" }}>
          {i < step ? "✓ " : ""}{s}
        </button>
      ))}
    </div>
  );
}
 
// ── MANDATO JUDICIAL PERSONA JURÍDICA ─────────────────────────────────────────
function MandatoJuridicaForm({ onBack }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    nombreRep1: "", rutRep1: "", estadoCivilRep1: "casada", profesionRep1: "empresaria",
    nombreRep2: "", rutRep2: "", estadoCivilRep2: "casada", profesionRep2: "empresaria",
    nombreEmpresa: "", rutEmpresa: "", domicilioEmpresa: "",
    nombreAbogado: "", rutAbogado: "", domicilioAbogado: "",
    fechaPersoneria: "", notaria: "", repertorio: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
 
  const handleGenerar = async () => {
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/generar-mandato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipo: "judicial-juridica", form }),
      });
      if (!res.ok) throw new Error("Error");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Mandato_Judicial_${form.nombreEmpresa.replace(/\s+/g, "_")}.docx`;
      a.click();
      URL.revokeObjectURL(url);
      await registrarActividad("Mandato Judicial — Persona Jurídica", form.nombreEmpresa, form.rutEmpresa);
    } catch { setError("Error generando el documento."); }
    finally { setLoading(false); }
  };
 
  const STEPS = ["1. Representantes", "2. Empresa", "3. Abogado", "4. Notaría", "5. Vista Previa"];
 
  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Courier New', monospace", color: C.text }}>
      <ModuleHero title="Mandato Judicial" subtitle="Persona Jurídica · Dos representantes" onBack={onBack} />
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "32px 20px" }}>
        <StepNav steps={STEPS} step={step} setStep={setStep} />
 
        {step === 0 && (
          <Box>
            <SectionTitle>Datos de los Representantes</SectionTitle>
            <div style={{ marginBottom: 20, paddingBottom: 16, borderBottom: "1px solid #eee" }}>
              <div style={{ fontSize: 11, color: "#8b1a2e", fontWeight: 700, marginBottom: 12, letterSpacing: 1 }}>REPRESENTANTE 1</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <Field label="Nombre completo" k="nombreRep1" form={form} set={set} full />
                <Field label="RUT" k="rutRep1" form={form} set={set} placeholder="12.503.495-0" />
                <Select label="Estado Civil" k="estadoCivilRep1" form={form} set={set} options={[{v:"casada",l:"Casada"},{v:"casado",l:"Casado"},{v:"soltera",l:"Soltera"},{v:"soltero",l:"Soltero"},{v:"divorciada",l:"Divorciada"},{v:"divorciado",l:"Divorciado"}]} />
                <Field label="Profesión" k="profesionRep1" form={form} set={set} placeholder="empresaria" />
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: "#8b1a2e", fontWeight: 700, marginBottom: 12, letterSpacing: 1 }}>REPRESENTANTE 2</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <Field label="Nombre completo" k="nombreRep2" form={form} set={set} full />
                <Field label="RUT" k="rutRep2" form={form} set={set} placeholder="10.760.595-9" />
                <Select label="Estado Civil" k="estadoCivilRep2" form={form} set={set} options={[{v:"casada",l:"Casada"},{v:"casado",l:"Casado"},{v:"soltera",l:"Soltera"},{v:"soltero",l:"Soltero"},{v:"divorciada",l:"Divorciada"},{v:"divorciado",l:"Divorciado"}]} />
                <Field label="Profesión" k="profesionRep2" form={form} set={set} placeholder="empresaria" />
              </div>
            </div>
            <div style={{ marginTop: 24 }}>
              <BtnPrimary onClick={() => setStep(1)}>Siguiente: Empresa →</BtnPrimary>
            </div>
          </Box>
        )}
 
        {step === 1 && (
          <Box>
            <SectionTitle>Datos de la Empresa</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
              <Field label="Razón Social" k="nombreEmpresa" form={form} set={set} full />
              <Field label="RUT Empresa" k="rutEmpresa" form={form} set={set} placeholder="77.987.070-7" />
              <Field label="Domicilio" k="domicilioEmpresa" form={form} set={set} placeholder="Av. Kennedy 1234, Vitacura, RM" full />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <BtnSecondary onClick={() => setStep(0)}>← Volver</BtnSecondary>
              <BtnPrimary onClick={() => setStep(2)}>Siguiente: Abogado →</BtnPrimary>
            </div>
          </Box>
        )}
 
        {step === 2 && (
          <Box>
            <SectionTitle>Datos del Abogado Mandatario</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
              <Field label="Nombre completo" k="nombreAbogado" form={form} set={set} full />
              <Field label="RUT" k="rutAbogado" form={form} set={set} placeholder="10.011.754-1" />
              <Field label="Domicilio profesional" k="domicilioAbogado" form={form} set={set} placeholder="Huérfanos 979 of. 606, Santiago" full />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <BtnSecondary onClick={() => setStep(1)}>← Volver</BtnSecondary>
              <BtnPrimary onClick={() => setStep(3)}>Siguiente: Notaría →</BtnPrimary>
            </div>
          </Box>
        )}
 
        {step === 3 && (
          <Box>
            <SectionTitle>Datos de la Notaría — Personería</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
              <Field label="Fecha de la escritura" k="fechaPersoneria" form={form} set={set} placeholder="quince de octubre del año dos mil veintiuno" full />
              <Field label="Notaría" k="notaria" form={form} set={set} placeholder="Vigésima Séptima Notaría de Santiago" full />
              <Field label="N° Repertorio" k="repertorio" form={form} set={set} placeholder="dieciséis mil ciento noventa y seis, del año dos mil veintiuno" full />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <BtnSecondary onClick={() => setStep(2)}>← Volver</BtnSecondary>
              <BtnPrimary onClick={() => setStep(4)}>Vista Previa →</BtnPrimary>
            </div>
          </Box>
        )}
 
        {step === 4 && (
          <Box>
            <SectionTitle>Vista Previa — Mandato Judicial Persona Jurídica</SectionTitle>
            <div style={{ background: "#fafaf8", border: "1px solid #ddd", borderRadius: 4, padding: "24px 28px", fontSize: 12, lineHeight: 2, marginBottom: 20, maxHeight: 400, overflowY: "auto", fontFamily: "Georgia, serif" }}>
              <p style={{ textAlign: "center", fontWeight: 700, marginBottom: 16 }}>{form.nombreEmpresa}</p>
              <p style={{ textAlign: "justify" }}>
                Comparece: doña <strong>{form.nombreRep1}</strong>, {form.estadoCivilRep1}, {form.profesionRep1}, cédula de identidad número {form.rutRep1}, y doña <strong>{form.nombreRep2}</strong>, {form.estadoCivilRep2}, {form.profesionRep2}, cédula de identidad número {form.rutRep2}, quienes comparecen en representación de la empresa <strong>{form.nombreEmpresa}</strong>, rol único tributario número {form.rutEmpresa}, todos domiciliados en {form.domicilioEmpresa}.
              </p>
              <p style={{ textAlign: "justify", marginTop: 12 }}>
                <strong>PRIMERO:</strong> Que por el presente instrumento vienen en conferir mandato judicial amplio al abogado don <strong>{form.nombreAbogado}</strong>, cédula de identidad número {form.rutAbogado}, domiciliado en {form.domicilioAbogado}.
              </p>
              <p style={{ textAlign: "justify", marginTop: 12 }}>
                <strong>TERCERO:</strong> La personería de {form.nombreRep1} y {form.nombreRep2} para representar a la sociedad {form.nombreEmpresa} consta en escritura pública de {form.fechaPersoneria}, suscrita ante la {form.notaria}, repertorio número {form.repertorio}.
              </p>
              <p style={{ color: "#999", fontStyle: "italic", marginTop: 12 }}>[... texto legal completo según plantilla ...]</p>
            </div>
            {error && <div style={{ background: "#fef2f2", border: "1px solid #c0392b", borderRadius: 4, padding: "10px 16px", color: "#c0392b", fontSize: 12, marginBottom: 14 }}>⚠ {error}</div>}
            <div style={{ display: "flex", gap: 10 }}>
              <BtnSecondary onClick={() => setStep(3)}>← Editar</BtnSecondary>
              <button onClick={handleGenerar} disabled={loading}
                style={{ flex: 1, background: loading ? "#eee" : "linear-gradient(135deg, #8b1a2e, #b52240)", border: "none", color: loading ? "#999" : "#fff", borderRadius: 4, padding: "13px 24px", fontFamily: "inherit", fontSize: 13, fontWeight: 700, letterSpacing: 2, cursor: loading ? "wait" : "pointer" }}>
                {loading ? "⏳ GENERANDO..." : "⬇ GENERAR Y DESCARGAR .DOCX"}
              </button>
            </div>
          </Box>
        )}
      </div>
    </div>
  );
}
 
// ── MANDATO JUDICIAL PERSONA NATURAL ─────────────────────────────────────────
function MandatoNaturalForm({ onBack }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    nombreMandante: "", rutMandante: "", estadoCivilMandante: "casado",
    profesionMandante: "empresario", domicilioMandante: "",
    nombreAbogado: "", rutAbogado: "", domicilioAbogado: "",
    tienePlazo: "no", plazo: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
 
  const handleGenerar = async () => {
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/generar-mandato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipo: "judicial-natural", form }),
      });
      if (!res.ok) throw new Error("Error");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Mandato_Judicial_${form.nombreMandante.replace(/\s+/g, "_")}.docx`;
      a.click();
      URL.revokeObjectURL(url);
      await registrarActividad("Mandato Judicial — Persona Natural", form.nombreMandante, form.rutMandante);
    } catch { setError("Error generando el documento."); }
    finally { setLoading(false); }
  };
 
  const STEPS = ["1. Mandante", "2. Abogado", "3. Vista Previa"];
 
  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Courier New', monospace", color: C.text }}>
      <ModuleHero title="Mandato Judicial" subtitle="Persona Natural · Representación individual" onBack={onBack} />
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "32px 20px" }}>
        <StepNav steps={STEPS} step={step} setStep={setStep} />
 
        {step === 0 && (
          <Box>
            <SectionTitle>Datos del Mandante</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
              <Field label="Nombre completo" k="nombreMandante" form={form} set={set} full />
              <Field label="RUT" k="rutMandante" form={form} set={set} placeholder="5.897.630-K" />
              <Select label="Estado Civil" k="estadoCivilMandante" form={form} set={set} options={[{v:"casado",l:"Casado"},{v:"casada",l:"Casada"},{v:"soltero",l:"Soltero"},{v:"soltera",l:"Soltera"},{v:"divorciado",l:"Divorciado"},{v:"divorciada",l:"Divorciada"},{v:"viudo",l:"Viudo"},{v:"viuda",l:"Viuda"}]} />
              <Field label="Profesión" k="profesionMandante" form={form} set={set} placeholder="empresario" />
              <Field label="Domicilio" k="domicilioMandante" form={form} set={set} placeholder="Recreo 625, Rancagua" full />
              <Select label="¿Incluir plazo del mandato?" k="tienePlazo" form={form} set={set} options={[{v:"no",l:"No, mandato indefinido"},{v:"si",l:"Sí, con plazo determinado"}]} full />
              {form.tienePlazo === "si" && (
                <Field label="Plazo del mandato" k="plazo" form={form} set={set} placeholder="dos años desde la fecha del instrumento" full />
              )}
            </div>
            <BtnPrimary onClick={() => setStep(1)}>Siguiente: Abogado →</BtnPrimary>
          </Box>
        )}
 
        {step === 1 && (
          <Box>
            <SectionTitle>Datos del Abogado Mandatario</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
              <Field label="Nombre completo" k="nombreAbogado" form={form} set={set} full />
              <Field label="RUT" k="rutAbogado" form={form} set={set} placeholder="10.011.754-1" />
              <Field label="Domicilio profesional" k="domicilioAbogado" form={form} set={set} placeholder="Huérfanos 979 of. 606, Santiago" full />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <BtnSecondary onClick={() => setStep(0)}>← Volver</BtnSecondary>
              <BtnPrimary onClick={() => setStep(2)}>Vista Previa →</BtnPrimary>
            </div>
          </Box>
        )}
 
        {step === 2 && (
          <Box>
            <SectionTitle>Vista Previa — Mandato Judicial Persona Natural</SectionTitle>
            <div style={{ background: "#fafaf8", border: "1px solid #ddd", borderRadius: 4, padding: "24px 28px", fontSize: 12, lineHeight: 2, marginBottom: 20, maxHeight: 400, overflowY: "auto", fontFamily: "Georgia, serif" }}>
              <p style={{ textAlign: "center", fontWeight: 700, marginBottom: 16 }}>{form.nombreAbogado?.toUpperCase()}</p>
              <p style={{ textAlign: "justify" }}>
                Comparece: don <strong>{form.nombreMandante}</strong>, {form.estadoCivilMandante}, {form.profesionMandante}, cédula de identidad número {form.rutMandante}, domiciliado en {form.domicilioMandante}.
              </p>
              <p style={{ textAlign: "justify", marginTop: 12 }}>
                <strong>PRIMERO:</strong> Que por el presente instrumento viene en conferir mandato judicial amplio al abogado señor <strong>{form.nombreAbogado}</strong>, cédula de identidad número {form.rutAbogado}, domiciliado en {form.domicilioAbogado}.
              </p>
              {form.tienePlazo === "si" && (
                <p style={{ textAlign: "justify", marginTop: 12 }}>
                  <strong>TERCERO:</strong> El presente mandato se otorga por un plazo de {form.plazo}.
                </p>
              )}
              <p style={{ color: "#999", fontStyle: "italic", marginTop: 12 }}>[... texto legal completo según plantilla ...]</p>
            </div>
            {error && <div style={{ background: "#fef2f2", border: "1px solid #c0392b", borderRadius: 4, padding: "10px 16px", color: "#c0392b", fontSize: 12, marginBottom: 14 }}>⚠ {error}</div>}
            <div style={{ display: "flex", gap: 10 }}>
              <BtnSecondary onClick={() => setStep(1)}>← Editar</BtnSecondary>
              <button onClick={handleGenerar} disabled={loading}
                style={{ flex: 1, background: loading ? "#eee" : "linear-gradient(135deg, #8b1a2e, #b52240)", border: "none", color: loading ? "#999" : "#fff", borderRadius: 4, padding: "13px 24px", fontFamily: "inherit", fontSize: 13, fontWeight: 700, letterSpacing: 2, cursor: loading ? "wait" : "pointer" }}>
                {loading ? "⏳ GENERANDO..." : "⬇ GENERAR Y DESCARGAR .DOCX"}
              </button>
            </div>
          </Box>
        )}
      </div>
    </div>
  );
}
 
// ── MANDATO GENERAL ───────────────────────────────────────────────────────────
function MandatoGeneralForm({ onBack }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    nombreMandante: "", rutMandante: "", estadoCivilMandante: "casada",
    profesionMandante: "comerciante", domicilioMandante: "",
    mandatarios: [
      { nombre: "", rut: "", estadoCivil: "divorciada", profesion: "comerciante" },
      { nombre: "", rut: "", estadoCivil: "casado", profesion: "comerciante" },
      { nombre: "", rut: "", estadoCivil: "casado", profesion: "comerciante" },
      { nombre: "", rut: "", estadoCivil: "casada", profesion: "comerciante" },
    ],
    quorum: "3",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
 
  const setMandatario = (i, k, v) => setForm(p => {
    const m = [...p.mandatarios];
    m[i] = { ...m[i], [k]: v };
    return { ...p, mandatarios: m };
  });
 
  const handleGenerar = async () => {
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/generar-mandato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipo: "general", form }),
      });
      if (!res.ok) throw new Error("Error");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Mandato_General_${form.nombreMandante.replace(/\s+/g, "_")}.docx`;
      a.click();
      URL.revokeObjectURL(url);
      await registrarActividad("Mandato General", form.nombreMandante, form.rutMandante);
    } catch { setError("Error generando el documento."); }
    finally { setLoading(false); }
  };
 
  const STEPS = ["1. Mandante", "2. Mandatarios", "3. Vista Previa"];
  const estadosCiviles = [{v:"casada",l:"Casada"},{v:"casado",l:"Casado"},{v:"soltera",l:"Soltera"},{v:"soltero",l:"Soltero"},{v:"divorciada",l:"Divorciada"},{v:"divorciado",l:"Divorciado"},{v:"viuda",l:"Viuda"},{v:"viudo",l:"Viudo"}];
 
  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Courier New', monospace", color: C.text }}>
      <ModuleHero title="Mandato General" subtitle="Poder amplio con administración y disposición de bienes" onBack={onBack} />
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "32px 20px" }}>
        <StepNav steps={STEPS} step={step} setStep={setStep} />
 
        {step === 0 && (
          <Box>
            <SectionTitle>Datos del Mandante</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
              <Field label="Nombre completo" k="nombreMandante" form={form} set={set} full />
              <Field label="RUT" k="rutMandante" form={form} set={set} placeholder="4.365.135-8" />
              <Select label="Estado Civil" k="estadoCivilMandante" form={form} set={set} options={estadosCiviles} />
              <Field label="Profesión" k="profesionMandante" form={form} set={set} placeholder="comerciante" />
              <Field label="Domicilio" k="domicilioMandante" form={form} set={set} placeholder="Santo Domingo 5023, Quinta Normal, RM" full />
              <div style={{ gridColumn: "1 / -1" }}>
                <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, letterSpacing: 2, marginBottom: 5, textTransform: "uppercase" }}>Quórum requerido para actuar</div>
                <select style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: 4, padding: "9px 12px", color: C.text, fontFamily: "inherit", fontSize: 13 }}
                  value={form.quorum} onChange={e => set("quorum", e.target.value)}>
                  <option value="1">Al menos 1 de 4 mandatarios</option>
                  <option value="2">Al menos 2 de 4 mandatarios</option>
                  <option value="3">Al menos 3 de 4 mandatarios</option>
                  <option value="4">Los 4 mandatarios en conjunto</option>
                </select>
              </div>
            </div>
            <BtnPrimary onClick={() => setStep(1)}>Siguiente: Mandatarios →</BtnPrimary>
          </Box>
        )}
 
        {step === 1 && (
          <Box>
            <SectionTitle>Datos de los Mandatarios (hasta 4)</SectionTitle>
            {form.mandatarios.map((m, i) => (
              <div key={i} style={{ marginBottom: 20, paddingBottom: 16, borderBottom: i < 3 ? "1px solid #eee" : "none" }}>
                <div style={{ fontSize: 11, color: "#8b1a2e", fontWeight: 700, marginBottom: 12, letterSpacing: 1 }}>MANDATARIO {i + 1}</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div style={{ gridColumn: "1 / -1" }}>
                    <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, letterSpacing: 2, marginBottom: 5, textTransform: "uppercase" }}>Nombre completo</div>
                    <input style={{ width: "100%", background: "#fff", border: `1px solid ${C.border}`, borderRadius: 4, padding: "9px 12px", color: C.text, fontFamily: "inherit", fontSize: 13, boxSizing: "border-box" }}
                      value={m.nombre} onChange={e => setMandatario(i, "nombre", e.target.value)} />
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, letterSpacing: 2, marginBottom: 5, textTransform: "uppercase" }}>RUT</div>
                    <input style={{ width: "100%", background: "#fff", border: `1px solid ${C.border}`, borderRadius: 4, padding: "9px 12px", color: C.text, fontFamily: "inherit", fontSize: 13, boxSizing: "border-box" }}
                      value={m.rut} onChange={e => setMandatario(i, "rut", e.target.value)} />
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, letterSpacing: 2, marginBottom: 5, textTransform: "uppercase" }}>Estado Civil</div>
                    <select style={{ width: "100%", background: "#fff", border: `1px solid ${C.border}`, borderRadius: 4, padding: "9px 12px", color: C.text, fontFamily: "inherit", fontSize: 13, boxSizing: "border-box" }}
                      value={m.estadoCivil} onChange={e => setMandatario(i, "estadoCivil", e.target.value)}>
                      {estadosCiviles.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
                    </select>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, letterSpacing: 2, marginBottom: 5, textTransform: "uppercase" }}>Profesión</div>
                    <input style={{ width: "100%", background: "#fff", border: `1px solid ${C.border}`, borderRadius: 4, padding: "9px 12px", color: C.text, fontFamily: "inherit", fontSize: 13, boxSizing: "border-box" }}
                      value={m.profesion} onChange={e => setMandatario(i, "profesion", e.target.value)} placeholder="comerciante" />
                  </div>
                </div>
              </div>
            ))}
            <div style={{ display: "flex", gap: 10 }}>
              <BtnSecondary onClick={() => setStep(0)}>← Volver</BtnSecondary>
              <BtnPrimary onClick={() => setStep(2)}>Vista Previa →</BtnPrimary>
            </div>
          </Box>
        )}
 
        {step === 2 && (
          <Box>
            <SectionTitle>Vista Previa — Mandato General</SectionTitle>
            <div style={{ background: "#fafaf8", border: "1px solid #ddd", borderRadius: 4, padding: "24px 28px", fontSize: 12, lineHeight: 2, marginBottom: 20, maxHeight: 400, overflowY: "auto", fontFamily: "Georgia, serif" }}>
              <p style={{ textAlign: "center", fontWeight: 700, marginBottom: 4 }}>MANDATO GENERAL.</p>
              <p style={{ textAlign: "center", fontWeight: 700, marginBottom: 16 }}>{form.nombreMandante?.toUpperCase()}<br />A<br />{form.mandatarios[0]?.nombre?.toUpperCase()} Y OTROS.</p>
              <p style={{ textAlign: "justify" }}>
                Comparece: doña <strong>{form.nombreMandante}</strong>, {form.estadoCivilMandante}, {form.profesionMandante}, cédula número {form.rutMandante}, domiciliada en {form.domicilioMandante}, quien viene en conferir poder general amplio, con administración y disposición de bienes, en:
              </p>
              <ul style={{ marginTop: 8 }}>
                {form.mandatarios.filter(m => m.nombre).map((m, i) => (
                  <li key={i}><strong>{m.nombre}</strong>, {m.estadoCivil}, {m.profesion}, RUT {m.rut}</li>
                ))}
              </ul>
              <p style={{ marginTop: 12 }}>Para representarla plenamente se requerirá la comparecencia de al menos <strong>{form.quorum}</strong> de los {form.mandatarios.filter(m => m.nombre).length} mandatarios indicados.</p>
              <p style={{ color: "#999", fontStyle: "italic", marginTop: 12 }}>[... texto legal completo según plantilla ...]</p>
            </div>
            {error && <div style={{ background: "#fef2f2", border: "1px solid #c0392b", borderRadius: 4, padding: "10px 16px", color: "#c0392b", fontSize: 12, marginBottom: 14 }}>⚠ {error}</div>}
            <div style={{ display: "flex", gap: 10 }}>
              <BtnSecondary onClick={() => setStep(1)}>← Editar</BtnSecondary>
              <button onClick={handleGenerar} disabled={loading}
                style={{ flex: 1, background: loading ? "#eee" : "linear-gradient(135deg, #8b1a2e, #b52240)", border: "none", color: loading ? "#999" : "#fff", borderRadius: 4, padding: "13px 24px", fontFamily: "inherit", fontSize: 13, fontWeight: 700, letterSpacing: 2, cursor: loading ? "wait" : "pointer" }}>
                {loading ? "⏳ GENERANDO..." : "⬇ GENERAR Y DESCARGAR .DOCX"}
              </button>
            </div>
          </Box>
        )}
      </div>
    </div>
  );
}
 
// ── SELECTOR ──────────────────────────────────────────────────────────────────
export default function MandatosModule({ onBack }) {
  const [tipo, setTipo] = useState(null);
 
  if (tipo === "judicial-juridica") return <MandatoJuridicaForm onBack={() => setTipo(null)} />;
  if (tipo === "judicial-natural") return <MandatoNaturalForm onBack={() => setTipo(null)} />;
  if (tipo === "general") return <MandatoGeneralForm onBack={() => setTipo(null)} />;
 
  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Courier New', monospace", color: C.text }}>
      <ModuleHero title="Mandatos" subtitle="Selecciona el tipo de mandato a generar" onBack={onBack} />
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {[
            { id: "judicial-juridica", icon: "🏢", title: "Mandato Judicial", sub: "Persona Jurídica", desc: "Dos representantes confieren mandato judicial en nombre de una empresa o sociedad.", fields: ["2 representantes", "Datos empresa", "Abogado mandatario", "Datos notaría"] },
            { id: "judicial-natural", icon: "👤", title: "Mandato Judicial", sub: "Persona Natural", desc: "Una persona natural confiere mandato judicial a un abogado.", fields: ["Datos mandante", "Abogado mandatario", "Plazo opcional"] },
            { id: "general", icon: "📜", title: "Mandato General", sub: "Hasta 4 mandatarios", desc: "Poder general amplio con administración y disposición de bienes.", fields: ["Datos mandante", "Hasta 4 mandatarios", "Quórum de actuación"] },
          ].map(opt => {
            const [hovered, setHovered] = useState(false);
            return (
              <div key={opt.id} onClick={() => setTipo(opt.id)}
                onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
                style={{ background: "#fff", border: `1px solid ${hovered ? "#8b1a2e" : "#ddd"}`, borderLeft: `4px solid ${hovered ? "#b52240" : "#8b1a2e"}`, borderRadius: 4, padding: "24px 20px", cursor: "pointer", transition: "all 0.2s", boxShadow: hovered ? "0 4px 16px rgba(0,0,0,0.1)" : "0 1px 4px rgba(0,0,0,0.06)", transform: hovered ? "translateY(-2px)" : "none" }}>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{opt.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#1e1e1e", fontFamily: "Georgia, serif", marginBottom: 2 }}>{opt.title}</div>
                <div style={{ fontSize: 11, color: "#8b1a2e", fontWeight: 700, marginBottom: 10, letterSpacing: 1 }}>{opt.sub}</div>
                <div style={{ fontSize: 12, color: "#666", lineHeight: 1.6, marginBottom: 14 }}>{opt.desc}</div>
                <div style={{ borderTop: "1px solid #eee", paddingTop: 10 }}>
                  {opt.fields.map(f => (
                    <div key={f} style={{ fontSize: 11, color: "#555", marginBottom: 3, display: "flex", gap: 6 }}>
                      <span style={{ color: "#8b1a2e" }}>✓</span> {f}
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 14, fontSize: 11, fontWeight: 700, color: hovered ? "#b52240" : "#8b1a2e", letterSpacing: 1.5 }}>GENERAR →</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
