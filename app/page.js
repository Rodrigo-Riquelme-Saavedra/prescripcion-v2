"use client";
import { useState } from "react";
 
const fmt = (n) => Number(n || 0).toLocaleString("es-CL");
 
const FOLIOS_EJEMPLO = [
  { folio: "403662",   fechaVcto: "00-00-0000", deudaNeta: 48353,   reajuste: 0,       interes: 0,       multa: 0,       total: 48353   },
  { folio: "1776967",  fechaVcto: "12-Jul-2016", deudaNeta: 1225441, reajuste: 644582,  interes: 1325472, multa: 561007,  total: 3756502 },
  { folio: "1813534",  fechaVcto: "12-Oct-2016", deudaNeta: 2326746, reajuste: 1195948, interes: 2428193, multa: 1056808, total: 7007695 },
];
 
const STEPS = ["1. Demandante", "2. Abogado", "3. Folios", "4. Vista Previa"];
 
// F1 Purple palette
const C = {
  bg:       "#f0f0f5",   // fondo principal oscuro púrpura
  surface:  "#ffffff",   // superficie de cards
  border:   "#c084fc",   // borde púrpura F1
  accent:   "#a855f7",   // púrpura brillante (acento)
  record:   "#bf00ff",   // morado récord F1 puro
  text:     "#1e1b2e",   // texto claro lavanda
  muted:    "#6b21a8",   // texto secundario
  dim:      "#e9e4f5",   // elementos apagados
  green:    "#22c55e",   // éxito
  red:      "#ef4444",   // error
  rowHover: "#f3e8ff",   // hover filas
};
 
const STEPS_CONFIG = STEPS;
 
export default function Home() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    empresa: "EMBALAJES INDUSTRIALES EMBATEK SpA",
    rutEmpresa: "77.453.510-1",
    representante: "CRISTIAN E. RIQUELME PARADA",
    cargoRepresentante: "ingeniero comercial",
    rutRepresentante: "11.852.128-5",
    domicilioEmpresa: "Sierra Bella n° 1581, comuna de Santiago, RM",
    abogado: "JUAN JOSÉ CONTRERAS GONZÁLEZ",
    rutAbogado: "10.011.754-1",
    domicilioAbogado: "Huérfanos 979 oficina 606, comuna de Santiago, RM",
    emailAbogado: "juancontre@fen.uchile.cl",
    fechaCertificado: "15-12-2025",
    expedientes: "",
  });
  const [folios, setFolios] = useState(FOLIOS_EJEMPLO);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
 
  const totalDeuda = folios.reduce((s, f) => s + (parseFloat(f.total) || 0), 0);
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));
 
  const addFolio = () =>
    setFolios((p) => [...p, { folio: "", fechaVcto: "", deudaNeta: 0, reajuste: 0, interes: 0, multa: 0, total: 0 }]);
 
  const removeFolio = (i) => setFolios((p) => p.filter((_, idx) => idx !== i));
 
  const updateFolio = (i, k, v) =>
    setFolios((p) => {
      const next = [...p];
      next[i] = { ...next[i], [k]: v };
      const r = next[i];
      next[i].total =
        (parseFloat(r.deudaNeta) || 0) + (parseFloat(r.reajuste) || 0) +
        (parseFloat(r.interes) || 0) + (parseFloat(r.multa) || 0);
      return next;
    });
 
  const handleGenerar = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/generar-demanda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form, folios, totalDeuda }),
      });
      if (!res.ok) throw new Error("Error");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Demanda_Prescripcion_${form.empresa.replace(/\s+/g, "_")}.docx`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("Hubo un error generando el documento. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };
 
  const Field = ({ label, k, placeholder, full }) => (
    <div style={{ gridColumn: full ? "1 / -1" : "span 1" }}>
      <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, letterSpacing: 2, marginBottom: 5, textTransform: "uppercase" }}>
        {label}
      </div>
      <input
        style={{ width: "100%", background: "#ffffff", border: `1px solid ${C.border}`, borderRadius: 6, padding: "9px 12px", color: C.text, fontFamily: "inherit", fontSize: 13, boxSizing: "border-box", outline: "none", transition: "border 0.2s" }}
        value={form[k]}
        onChange={(e) => set(k, e.target.value)}
        placeholder={placeholder || ""}
        onFocus={(e) => e.target.style.border = `1px solid ${C.accent}`}
        onBlur={(e) => e.target.style.border = `1px solid ${C.dim}`}
      />
    </div>
  );
 
  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Courier New', monospace", color: C.text }}>
 
      {/* Header */}
      <div style={{ background: C.surface, borderBottom: `2px solid ${C.record}`, padding: "0 32px", height: 58, display: "flex", alignItems: "center", gap: 14 }}>
        <div style={{ width: 32, height: 32, background: `linear-gradient(135deg, ${C.record}, ${C.accent})`, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0 }}>⚖</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 13, letterSpacing: 2, color: C.text }}>SISTEMA PRESCRIPCIÓN TRIBUTARIA</div>
          <div style={{ fontSize: 10, color: C.muted, letterSpacing: 1 }}>Chile · Art. 201 Código Tributario</div>
        </div>
        <div style={{ marginLeft: "auto", background: C.dim, borderRadius: 20, padding: "3px 12px", fontSize: 10, color: C.accent, fontWeight: 700, letterSpacing: 1 }}>
          ● EN LÍNEA
        </div>
      </div>
 
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "32px 20px" }}>
 
        {/* Steps */}
        <div style={{ display: "flex", marginBottom: 32, border: `1px solid ${C.border}`, borderRadius: 8, overflow: "hidden" }}>
          {STEPS_CONFIG.map((s, i) => (
            <button key={s} onClick={() => i <= step && setStep(i)}
              style={{
                flex: 1, padding: "11px 0",
                background: i === step ? C.record : i < step ? C.dim : C.surface,
                border: "none",
                borderRight: i < 3 ? `1px solid ${C.border}` : "none",
                color: i === step ? "#fff" : i < step ? C.accent : C.muted,
                fontFamily: "inherit", fontSize: 11, fontWeight: 700, letterSpacing: 1,
                cursor: i <= step ? "pointer" : "default",
                transition: "all 0.2s",
              }}>
              {i < step ? "✓ " : ""}{s}
            </button>
          ))}
        </div>
 
        {/* STEP 0 — Demandante */}
        {step === 0 && (
          <div>
            <SectionTitle color={C}>Datos del Demandante</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
              <Field label="Razón Social / Nombre completo" k="empresa" full />
              <Field label="RUT Empresa" k="rutEmpresa" placeholder="77.453.510-1" />
              <Field label="Representante Legal" k="representante" />
              <Field label="Cargo del Representante" k="cargoRepresentante" placeholder="gerente general" />
              <Field label="RUT Representante" k="rutRepresentante" placeholder="11.852.128-5" />
              <Field label="Domicilio" k="domicilioEmpresa" placeholder="Calle N°, comuna, región" full />
            </div>
            <Btn color={C} onClick={() => setStep(1)}>Siguiente: Abogado →</Btn>
          </div>
        )}
 
        {/* STEP 1 — Abogado */}
        {step === 1 && (
          <div>
            <SectionTitle color={C}>Datos del Abogado Patrocinante</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
              <Field label="Nombre Abogado" k="abogado" />
              <Field label="RUT Abogado" k="rutAbogado" placeholder="10.011.754-1" />
              <Field label="Domicilio Profesional" k="domicilioAbogado" full />
              <Field label="Correo Electrónico" k="emailAbogado" placeholder="abogado@dominio.cl" />
              <Field label="Fecha del Certificado de Deuda" k="fechaCertificado" placeholder="15-12-2025" />
              <Field label="N° Expediente(s) Administrativo(s)" k="expedientes" placeholder="Ej: 1234-2020 (opcional)" full />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <BtnSecondary color={C} onClick={() => setStep(0)}>← Volver</BtnSecondary>
              <Btn color={C} onClick={() => setStep(2)}>Siguiente: Folios →</Btn>
            </div>
          </div>
        )}
 
        {/* STEP 2 — Folios */}
        {step === 2 && (
          <div>
            <SectionTitle color={C}>Folios del Certificado de Deuda</SectionTitle>
            <div style={{ overflowX: "auto", marginBottom: 16 }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead>
                  <tr style={{ background: C.dim }}>
                    {["Folio", "Fecha Vcto.", "Deuda Neta $", "Reajuste $", "Interés $", "Multa $", "Total $", ""].map((h) => (
                      <th key={h} style={{ padding: "8px 8px", color: C.accent, fontSize: 10, letterSpacing: 1, fontWeight: 700, borderBottom: `1px solid ${C.border}`, textAlign: "right", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {folios.map((f, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${C.dim}` }}>
                      {[
                        { k: "folio", w: 80, align: "left" },
                        { k: "fechaVcto", w: 100, align: "left" },
                        { k: "deudaNeta", w: 90, align: "right" },
                        { k: "reajuste", w: 80, align: "right" },
                        { k: "interes", w: 80, align: "right" },
                        { k: "multa", w: 80, align: "right" },
                      ].map(({ k, w, align }) => (
                        <td key={k} style={{ padding: "4px 4px" }}>
                          <input value={f[k]} onChange={(e) => updateFolio(i, k, e.target.value)}
                            style={{ width: w, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 4, color: C.text, fontFamily: "inherit", fontSize: 12, padding: "4px 6px", textAlign: align }} />
                        </td>
                      ))}
                      <td style={{ padding: "4px 8px", color: C.accent, fontWeight: 700, whiteSpace: "nowrap", textAlign: "right" }}>
                        $ {fmt(f.total)}
                      </td>
                      <td style={{ padding: "4px 4px" }}>
                        <button onClick={() => removeFolio(i)} style={{ background: "none", border: "none", color: C.red, cursor: "pointer", fontSize: 18 }}>×</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <button onClick={addFolio} style={{ background: C.surface, border: `1px dashed ${C.border}`, color: C.accent, borderRadius: 6, padding: "8px 16px", fontFamily: "inherit", fontSize: 12, cursor: "pointer" }}>
                + Agregar Folio
              </button>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 10, color: C.muted, marginBottom: 2 }}>TOTAL DEUDA MOROSA</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: C.record }}>$ {fmt(totalDeuda)}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <BtnSecondary color={C} onClick={() => setStep(1)}>← Volver</BtnSecondary>
              <Btn color={C} onClick={() => setStep(3)}>Vista Previa →</Btn>
            </div>
          </div>
        )}
 
        {/* STEP 3 — Vista Previa */}
        {step === 3 && (
          <div>
            <SectionTitle color={C}>Vista Previa — Resumen de la Demanda</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 24 }}>
              <Card color={C} label="Demandante" value={form.empresa} sub={`RUT ${form.rutEmpresa}`} />
              <Card color={C} label="Representante Legal" value={form.representante} sub={form.cargoRepresentante} />
              <Card color={C} label="Abogado Patrocinante" value={form.abogado} sub={form.emailAbogado} />
            </div>
 
            <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: 20, fontSize: 12, lineHeight: 2, color: C.text, marginBottom: 20, maxHeight: 300, overflowY: "auto" }}>
              <p style={{ textAlign: "center", fontWeight: 700, marginBottom: 12, fontSize: 13, color: C.accent }}>DEMANDA DE DECLARACIÓN DE PRESCRIPCIÓN EXTINTIVA</p>
              <p><strong>{form.empresa}</strong>, RUT n° <strong>{form.rutEmpresa}</strong>, representada por <strong>{form.representante}</strong>, {form.cargoRepresentante}, RUT <strong>{form.rutRepresentante}</strong>, domiciliados en {form.domicilioEmpresa}.</p>
              <p style={{ marginTop: 8 }}>Certificado de Deuda de fecha <strong>{form.fechaCertificado}</strong>.</p>
              <p style={{ marginTop: 8 }}><strong>Folios:</strong> {folios.map((f) => f.folio).filter(Boolean).join(", ")}</p>
              <p style={{ marginTop: 8 }}>Total deuda: <strong style={{ color: C.record }}>$ {fmt(totalDeuda)}</strong></p>
              <p style={{ marginTop: 8, color: C.muted, fontStyle: "italic" }}>[... texto legal completo según plantilla ...]</p>
              <p style={{ marginTop: 8 }}>Abogado: <strong>{form.abogado}</strong> — {form.emailAbogado}</p>
            </div>
 
            {error && (
              <div style={{ background: "#2d0a0a", border: `1px solid ${C.red}`, borderRadius: 6, padding: "10px 16px", color: C.red, fontSize: 12, marginBottom: 14 }}>
                ⚠ {error}
              </div>
            )}
 
            <div style={{ display: "flex", gap: 10 }}>
              <BtnSecondary color={C} onClick={() => setStep(2)}>← Editar</BtnSecondary>
              <button onClick={handleGenerar} disabled={loading}
                style={{ flex: 1, background: loading ? C.dim : `linear-gradient(135deg, ${C.record}, ${C.accent})`, border: "none", color: "#fff", borderRadius: 6, padding: "13px 24px", fontFamily: "inherit", fontSize: 13, fontWeight: 700, letterSpacing: 2, cursor: loading ? "wait" : "pointer", transition: "all 0.3s" }}>
                {loading ? "⏳ GENERANDO DOCUMENTO..." : "⬇ GENERAR Y DESCARGAR DEMANDA .DOCX"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
 
const SectionTitle = ({ children, color: C }) => (
  <div style={{ borderLeft: `3px solid ${C.record}`, paddingLeft: 12, marginBottom: 20 }}>
    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: C.muted, textTransform: "uppercase" }}>{children}</div>
  </div>
);
 
const Card = ({ label, value, sub, color: C }) => (
  <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 8, padding: "12px 14px" }}>
    <div style={{ fontSize: 10, color: C.dim, letterSpacing: 2, fontWeight: 700, marginBottom: 6, textTransform: "uppercase", color: C.muted }}>{label}</div>
    <div style={{ fontSize: 12, color: C.text, fontWeight: 600, marginBottom: 2 }}>{value}</div>
    <div style={{ fontSize: 11, color: C.accent }}>{sub}</div>
  </div>
);
 
const Btn = ({ onClick, children, color: C }) => (
  <button onClick={onClick} style={{ flex: 1, background: `linear-gradient(135deg, ${C.record}, ${C.accent})`, border: "none", color: "#fff", borderRadius: 6, padding: "11px 20px", fontFamily: "inherit", fontSize: 12, fontWeight: 700, letterSpacing: 1, cursor: "pointer" }}>
    {children}
  </button>
);
 
const BtnSecondary = ({ onClick, children, color: C }) => (
  <button onClick={onClick} style={{ background: C.surface, border: `1px solid ${C.border}`, color: C.text, borderRadius: 6, padding: "11px 20px", fontFamily: "inherit", fontSize: 12, cursor: "pointer" }}>
    {children}
  </button>
);
