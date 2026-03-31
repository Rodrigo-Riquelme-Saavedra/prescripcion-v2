"use client";
import { useState } from "react";
 
const C = {
  bg:      "#f0f0f5",
  surface: "#ffffff",
  border:  "#c084fc",
  accent:  "#a855f7",
  record:  "#bf00ff",
  text:    "#1e1b2e",
  muted:   "#6b21a8",
  dim:     "#e9e4f5",
  green:   "#22c55e",
  red:     "#ef4444",
};
 
const MODULES = [
  {
    id: "prescripcion",
    icon: "⚖",
    title: "Sistema de Prescripción",
    desc: "Generador de demandas de prescripción extintiva tributaria. Art. 201 Código Tributario.",
    tag: "ACTIVO",
    available: true,
    comingSoon: false,
    color: "#bf00ff",
  },
  {
    id: "mutuo-vista",
    icon: "🤝",
    title: "Contrato de Mutuo / A la Vista",
    desc: "Generador de contratos de mutuo a la vista. Incluye monto, intereses, deudor, acreedor y garantías.",
    tag: "EN CONSTRUCCIÓN",
    available: true,
    comingSoon: true,
    color: "#7c3aed",
  },
  {
    id: "mutuo-prestacion",
    icon: "📝",
    title: "Contrato de Mutuo / Prestación",
    desc: "Generador de contratos de mutuo con prestación. Plazo, cuotas, notario y fecha de firma.",
    tag: "EN CONSTRUCCIÓN",
    available: true,
    comingSoon: true,
    color: "#7c3aed",
  },
  {
    id: "documentos",
    icon: "📄",
    title: "Documentos Legales",
    desc: "Generador de otros documentos legales y escritos jurídicos.",
    tag: "PRÓXIMAMENTE",
    available: false,
    comingSoon: false,
    color: "#6b21a8",
  },
  {
    id: "clientes",
    icon: "👥",
    title: "Gestión de Clientes",
    desc: "Administración de clientes, casos y seguimiento de expedientes.",
    tag: "PRÓXIMAMENTE",
    available: false,
    comingSoon: false,
    color: "#6b21a8",
  },
  {
    id: "reportes",
    icon: "📊",
    title: "Reportes y Estadísticas",
    desc: "Dashboards, métricas de casos y reportes de gestión.",
    tag: "PRÓXIMAMENTE",
    available: false,
    comingSoon: false,
    color: "#6b21a8",
  },
  {
    id: "configuracion",
    icon: "⚙",
    title: "Configuración del Sistema",
    desc: "Parámetros, usuarios y configuración general de la plataforma.",
    tag: "PRÓXIMAMENTE",
    available: false,
    comingSoon: false,
    color: "#6b21a8",
  },
];
 
export default function Home() {
  const [currentModule, setCurrentModule] = useState(null);
 
  if (currentModule === "prescripcion") {
    return <Prescripcion onBack={() => setCurrentModule(null)} />;
  }
 
  if (currentModule === "mutuo-vista" || currentModule === "mutuo-prestacion") {
    return <ComingSoonModule id={currentModule} onBack={() => setCurrentModule(null)} />;
  }
 
  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Courier New', monospace", color: C.text, position: "relative", overflow: "hidden" }}>
 
      {/* Background logo watermark */}
      <div style={{ position: "fixed", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", zIndex: 0 }}>
        <img
          src="https://raw.githubusercontent.com/Rodrigo-Riquelme-Saavedra/prescripcion-v2/main/public/PaginaWeb.png"
          alt=""
          style={{ width: "60%", maxWidth: 700, opacity: 0.06, filter: "grayscale(30%)" }}
        />
      </div>
 
      {/* Header */}
      <div style={{ position: "relative", zIndex: 10, background: "linear-gradient(135deg, #0a0a2e 0%, #1a0a3e 50%, #0a1a3e 100%)", borderBottom: `3px solid ${C.record}`, padding: "0 40px", height: 72, display: "flex", alignItems: "center", gap: 18, boxShadow: "0 4px 24px rgba(191,0,255,0.15)" }}>
        <img
          src="https://raw.githubusercontent.com/Rodrigo-Riquelme-Saavedra/prescripcion-v2/main/public/PaginaWeb.png"
          alt="Grupo GV Logo"
          style={{ height: 54, width: "auto", objectFit: "contain", filter: "drop-shadow(0 0 12px rgba(100,180,255,0.6))", flexShrink: 0 }}
          onError={(e) => { e.target.style.display = "none"; }}
        />
        <div style={{ width: 1, height: 36, background: `linear-gradient(to bottom, transparent, ${C.record}, transparent)` }} />
        <div>
          <div style={{ fontWeight: 700, fontSize: 16, letterSpacing: 2, color: "#ffffff", textShadow: `0 0 20px ${C.record}` }}>GRUPO GV — PORTAL DE GESTIÓN</div>
          <div style={{ fontSize: 10, color: C.accent, letterSpacing: 1.5, marginTop: 2 }}>Plataforma Integral de Herramientas Jurídicas y Administrativas</div>
        </div>
        <div style={{ marginLeft: "auto", background: "rgba(191,0,255,0.15)", border: `1px solid ${C.record}`, borderRadius: 20, padding: "4px 14px", fontSize: 10, color: C.accent, fontWeight: 700, letterSpacing: 1 }}>
          ● EN LÍNEA
        </div>
      </div>
 
      {/* Main content */}
      <div style={{ position: "relative", zIndex: 10, maxWidth: 1100, margin: "0 auto", padding: "48px 24px" }}>
 
        {/* Welcome */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontSize: 11, color: C.muted, letterSpacing: 4, fontWeight: 700, marginBottom: 10, textTransform: "uppercase" }}>Bienvenido al Portal</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: C.text, marginBottom: 8 }}>¿Qué deseas hacer hoy?</div>
          <div style={{ fontSize: 13, color: C.muted }}>Selecciona un módulo para comenzar</div>
          <div style={{ width: 60, height: 3, background: `linear-gradient(to right, ${C.record}, ${C.accent})`, margin: "16px auto 0", borderRadius: 2 }} />
        </div>
 
        {/* Module grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {MODULES.map((mod) => (
            <ModuleCard
              key={mod.id}
              mod={mod}
              onClick={() => (mod.available) && setCurrentModule(mod.id)}
            />
          ))}
        </div>
 
        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 56, fontSize: 11, color: C.muted, letterSpacing: 1 }}>
          © 2026 Grupo GV · Todos los derechos reservados · Chile
        </div>
      </div>
    </div>
  );
}
 
function ModuleCard({ mod, onClick }) {
  const [hovered, setHovered] = useState(false);
 
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered && mod.available ? "#ffffff" : "#ffffff",
        border: `2px solid ${hovered && mod.available ? mod.color : "#e9e4f5"}`,
        borderRadius: 14,
        padding: "28px 24px",
        cursor: mod.available ? "pointer" : "default",
        transition: "all 0.25s",
        position: "relative",
        overflow: "hidden",
        boxShadow: hovered && mod.available
          ? `0 8px 32px rgba(191,0,255,0.2), 0 0 0 1px ${mod.color}`
          : "0 2px 12px rgba(0,0,0,0.06)",
        transform: hovered && mod.available ? "translateY(-4px)" : "translateY(0)",
        opacity: mod.available ? 1 : 0.7,
      }}
    >
      {/* Glow effect on hover */}
      {hovered && mod.available && (
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(to right, ${mod.color}, #a855f7)`, borderRadius: "12px 12px 0 0" }} />
      )}
 
      {/* Lock overlay for unavailable */}
      {!mod.available && (
        <div style={{ position: "absolute", top: 14, right: 14, fontSize: 16 }}>🔒</div>
      )}
 
      {/* Tag */}
      <div style={{ display: "inline-block", background: mod.available ? "rgba(191,0,255,0.1)" : "rgba(107,33,168,0.08)", border: `1px solid ${mod.available ? "#bf00ff" : "#c084fc"}`, borderRadius: 20, padding: "3px 10px", fontSize: 9, fontWeight: 700, letterSpacing: 2, color: mod.available ? "#bf00ff" : "#9d7ec9", marginBottom: 16, textTransform: "uppercase" }}>
        {mod.tag}
      </div>
 
      {/* Icon */}
      <div style={{ fontSize: 36, marginBottom: 14, filter: mod.available ? "drop-shadow(0 0 8px rgba(191,0,255,0.4))" : "grayscale(50%)" }}>
        {mod.icon}
      </div>
 
      {/* Title */}
      <div style={{ fontSize: 15, fontWeight: 700, color: "#1e1b2e", marginBottom: 8, letterSpacing: 0.5 }}>
        {mod.title}
      </div>
 
      {/* Description */}
      <div style={{ fontSize: 12, color: "#6b21a8", lineHeight: 1.6, marginBottom: mod.available ? 20 : 0 }}>
        {mod.desc}
      </div>
 
      {/* CTA button */}
      {mod.available && !mod.comingSoon && (
        <div style={{ marginTop: 8, display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, color: "#bf00ff", letterSpacing: 1, textTransform: "uppercase" }}>
          Ingresar <span style={{ fontSize: 14 }}>→</span>
        </div>
      )}
 
      {/* Coming soon active module */}
      {mod.available && mod.comingSoon && (
        <div style={{ marginTop: 8, display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 700, color: "#7c3aed", letterSpacing: 1, textTransform: "uppercase" }}>
          Ver avance <span style={{ fontSize: 14 }}>→</span>
        </div>
      )}
 
      {/* Unavailable message */}
      {!mod.available && (
        <div style={{ marginTop: 12, fontSize: 11, color: "#9d7ec9", fontStyle: "italic" }}>
          Disponible próximamente
        </div>
      )}
    </div>
  );
}
 
// ─── COMING SOON MODULE ────────────────────────────────────────────────────
 
const MUTUO_FIELDS = [
  "Monto del préstamo",
  "Tasa de interés",
  "Plazo y cuotas",
  "Datos del deudor y acreedor",
  "Garantías / Avales",
  "Notario y fecha de firma",
];
 
function ComingSoonModule({ id, onBack }) {
  const title = id === "mutuo-vista" ? "Contrato de Mutuo / A la Vista" : "Contrato de Mutuo / Prestación";
  return (
    <div style={{ minHeight: "100vh", background: "#f0f0f5", fontFamily: "'Courier New', monospace", color: "#1e1b2e" }}>
      <div style={{ background: "linear-gradient(135deg, #0a0a2e 0%, #1a0a3e 50%, #0a1a3e 100%)", borderBottom: "3px solid #bf00ff", padding: "0 32px", height: 72, display: "flex", alignItems: "center", gap: 18 }}>
        <img src="https://raw.githubusercontent.com/Rodrigo-Riquelme-Saavedra/prescripcion-v2/main/public/PaginaWeb.png" alt="Grupo GV" style={{ height: 54, width: "auto", objectFit: "contain", filter: "drop-shadow(0 0 12px rgba(100,180,255,0.6))" }} onError={(e) => { e.target.style.display = "none"; }} />
        <div style={{ width: 1, height: 36, background: "linear-gradient(to bottom, transparent, #bf00ff, transparent)" }} />
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, letterSpacing: 2, color: "#ffffff" }}>{title.toUpperCase()}</div>
          <div style={{ fontSize: 10, color: "#a855f7", letterSpacing: 1.5, marginTop: 2 }}>Grupo GV · En construcción</div>
        </div>
        <button onClick={onBack} style={{ marginLeft: "auto", background: "rgba(191,0,255,0.15)", border: "1px solid #bf00ff", borderRadius: 20, padding: "6px 16px", fontSize: 11, color: "#a855f7", fontWeight: 700, letterSpacing: 1, cursor: "pointer", fontFamily: "inherit" }}>
          ← Volver al Portal
        </button>
      </div>
 
      <div style={{ maxWidth: 680, margin: "60px auto", padding: "0 24px", textAlign: "center" }}>
        <div style={{ fontSize: 56, marginBottom: 24 }}>🚧</div>
        <div style={{ background: "#ffffff", border: "2px solid #c084fc", borderRadius: 14, padding: 40, boxShadow: "0 4px 20px rgba(168,85,247,0.1)" }}>
          <div style={{ fontSize: 11, color: "#6b21a8", letterSpacing: 3, fontWeight: 700, marginBottom: 12, textTransform: "uppercase" }}>Módulo en Construcción</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: "#1e1b2e", marginBottom: 12 }}>{title}</div>
          <div style={{ width: 50, height: 3, background: "linear-gradient(to right, #bf00ff, #a855f7)", margin: "0 auto 24px", borderRadius: 2 }} />
          <p style={{ fontSize: 13, color: "#6b21a8", lineHeight: 1.8, marginBottom: 28 }}>
            Este módulo está siendo desarrollado. Incluirá los siguientes campos:
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 32, textAlign: "left" }}>
            {MUTUO_FIELDS.map((f) => (
              <div key={f} style={{ background: "#f0f0f5", border: "1px solid #e9e4f5", borderRadius: 8, padding: "10px 14px", fontSize: 12, color: "#1e1b2e", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ color: "#bf00ff", fontSize: 14 }}>✓</span> {f}
              </div>
            ))}
          </div>
          <div style={{ background: "rgba(191,0,255,0.06)", border: "1px dashed #c084fc", borderRadius: 8, padding: "14px 20px", fontSize: 12, color: "#6b21a8", fontStyle: "italic" }}>
            ⏳ Estará disponible muy pronto. El equipo de Grupo GV está trabajando en ello.
          </div>
        </div>
      </div>
    </div>
  );
}
 
 
// ─── PRESCRIPCION MODULE (full form) ───────────────────────────────────────
 
const fmt = (n) => Number(n || 0).toLocaleString("es-CL");
 
const FOLIOS_EJEMPLO = [
  { folio: "403662",  fechaVcto: "00-00-0000", deudaNeta: 48353,   reajuste: 0,       interes: 0,       multa: 0,       total: 48353   },
  { folio: "1776967", fechaVcto: "12-Jul-2016", deudaNeta: 1225441, reajuste: 644582,  interes: 1325472, multa: 561007,  total: 3756502 },
  { folio: "1813534", fechaVcto: "12-Oct-2016", deudaNeta: 2326746, reajuste: 1195948, interes: 2428193, multa: 1056808, total: 7007695 },
];
 
const STEPS = ["1. Demandante", "2. Abogado", "3. Folios", "4. Vista Previa"];
 
function Prescripcion({ onBack }) {
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
 
  const addFolio = () => setFolios((p) => [...p, { folio: "", fechaVcto: "", deudaNeta: 0, reajuste: 0, interes: 0, multa: 0, total: 0 }]);
  const removeFolio = (i) => setFolios((p) => p.filter((_, idx) => idx !== i));
  const updateFolio = (i, k, v) => setFolios((p) => {
    const next = [...p];
    next[i] = { ...next[i], [k]: v };
    const r = next[i];
    next[i].total = (parseFloat(r.deudaNeta)||0)+(parseFloat(r.reajuste)||0)+(parseFloat(r.interes)||0)+(parseFloat(r.multa)||0);
    return next;
  });
 
  const handleGenerar = async () => {
    setLoading(true); setError("");
    try {
      const res = await fetch("/api/generar-demanda", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ form, folios, totalDeuda }) });
      if (!res.ok) throw new Error("Error");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = `Demanda_Prescripcion_${form.empresa.replace(/\s+/g, "_")}.docx`; a.click();
      URL.revokeObjectURL(url);
    } catch { setError("Hubo un error generando el documento. Intenta nuevamente."); }
    finally { setLoading(false); }
  };
 
  const Field = ({ label, k, placeholder, full }) => (
    <div style={{ gridColumn: full ? "1 / -1" : "span 1" }}>
      <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, letterSpacing: 2, marginBottom: 5, textTransform: "uppercase" }}>{label}</div>
      <input style={{ width: "100%", background: "#ffffff", border: `1px solid ${C.border}`, borderRadius: 6, padding: "9px 12px", color: C.text, fontFamily: "inherit", fontSize: 13, boxSizing: "border-box", outline: "none" }}
        value={form[k]} onChange={(e) => set(k, e.target.value)} placeholder={placeholder || ""} />
    </div>
  );
 
  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Courier New', monospace", color: C.text }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #0a0a2e 0%, #1a0a3e 50%, #0a1a3e 100%)", borderBottom: `3px solid ${C.record}`, padding: "0 32px", height: 72, display: "flex", alignItems: "center", gap: 18, boxShadow: "0 4px 24px rgba(191,0,255,0.15)" }}>
        <img src="https://raw.githubusercontent.com/Rodrigo-Riquelme-Saavedra/prescripcion-v2/main/public/PaginaWeb.png" alt="Grupo GV" style={{ height: 54, width: "auto", objectFit: "contain", filter: "drop-shadow(0 0 12px rgba(100,180,255,0.6))", flexShrink: 0 }} onError={(e) => { e.target.style.display = "none"; }} />
        <div style={{ width: 1, height: 36, background: `linear-gradient(to bottom, transparent, ${C.record}, transparent)` }} />
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, letterSpacing: 2, color: "#ffffff" }}>SISTEMA PRESCRIPCIÓN TRIBUTARIA</div>
          <div style={{ fontSize: 10, color: C.accent, letterSpacing: 1.5, marginTop: 2 }}>Chile · Art. 201 Código Tributario · Grupo GV</div>
        </div>
        <button onClick={onBack} style={{ marginLeft: "auto", background: "rgba(191,0,255,0.15)", border: `1px solid ${C.record}`, borderRadius: 20, padding: "6px 16px", fontSize: 11, color: C.accent, fontWeight: 700, letterSpacing: 1, cursor: "pointer", fontFamily: "inherit" }}>
          ← Volver al Portal
        </button>
      </div>
 
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "32px 20px" }}>
        {/* Steps */}
        <div style={{ display: "flex", marginBottom: 32, border: `1px solid ${C.border}`, borderRadius: 8, overflow: "hidden" }}>
          {STEPS.map((s, i) => (
            <button key={s} onClick={() => i <= step && setStep(i)}
              style={{ flex: 1, padding: "11px 0", background: i === step ? C.record : i < step ? "#e9e4f5" : C.surface, border: "none", borderRight: i < 3 ? `1px solid ${C.border}` : "none", color: i === step ? "#fff" : i < step ? C.accent : C.muted, fontFamily: "inherit", fontSize: 11, fontWeight: 700, letterSpacing: 1, cursor: i <= step ? "pointer" : "default", transition: "all 0.2s" }}>
              {i < step ? "✓ " : ""}{s}
            </button>
          ))}
        </div>
 
        {/* STEP 0 */}
        {step === 0 && (
          <div style={{ background: C.surface, border: `2px solid ${C.border}`, borderRadius: 12, padding: 28, boxShadow: "0 4px 20px rgba(168,85,247,0.1)" }}>
            <SectionTitle>Datos del Demandante</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
              <Field label="Razón Social / Nombre completo" k="empresa" full />
              <Field label="RUT Empresa" k="rutEmpresa" placeholder="77.453.510-1" />
              <Field label="Representante Legal" k="representante" />
              <Field label="Cargo del Representante" k="cargoRepresentante" placeholder="gerente general" />
              <Field label="RUT Representante" k="rutRepresentante" placeholder="11.852.128-5" />
              <Field label="Domicilio" k="domicilioEmpresa" full />
            </div>
            <Btn onClick={() => setStep(1)}>Siguiente: Abogado →</Btn>
          </div>
        )}
 
        {/* STEP 1 */}
        {step === 1 && (
          <div style={{ background: C.surface, border: `2px solid ${C.border}`, borderRadius: 12, padding: 28, boxShadow: "0 4px 20px rgba(168,85,247,0.1)" }}>
            <SectionTitle>Datos del Abogado Patrocinante</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
              <Field label="Nombre Abogado" k="abogado" />
              <Field label="RUT Abogado" k="rutAbogado" />
              <Field label="Domicilio Profesional" k="domicilioAbogado" full />
              <Field label="Correo Electrónico" k="emailAbogado" />
              <Field label="Fecha del Certificado de Deuda" k="fechaCertificado" placeholder="15-12-2025" />
              <Field label="N° Expediente(s) Administrativo(s)" k="expedientes" placeholder="Opcional" full />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <BtnSecondary onClick={() => setStep(0)}>← Volver</BtnSecondary>
              <Btn onClick={() => setStep(2)}>Siguiente: Folios →</Btn>
            </div>
          </div>
        )}
 
        {/* STEP 2 */}
        {step === 2 && (
          <div style={{ background: C.surface, border: `2px solid ${C.border}`, borderRadius: 12, padding: 28, boxShadow: "0 4px 20px rgba(168,85,247,0.1)" }}>
            <SectionTitle>Folios del Certificado de Deuda</SectionTitle>
            <div style={{ overflowX: "auto", marginBottom: 16 }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead>
                  <tr style={{ background: "#e9e4f5" }}>
                    {["Folio", "Fecha Vcto.", "Deuda Neta $", "Reajuste $", "Interés $", "Multa $", "Total $", ""].map((h) => (
                      <th key={h} style={{ padding: "8px", color: C.muted, fontSize: 10, letterSpacing: 1, fontWeight: 700, borderBottom: `1px solid ${C.border}`, textAlign: "right" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {folios.map((f, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${C.dim}` }}>
                      {[{k:"folio",w:80,a:"left"},{k:"fechaVcto",w:100,a:"left"},{k:"deudaNeta",w:90,a:"right"},{k:"reajuste",w:80,a:"right"},{k:"interes",w:80,a:"right"},{k:"multa",w:80,a:"right"}].map(({k,w,a}) => (
                        <td key={k} style={{ padding: "4px" }}>
                          <input value={f[k]} onChange={(e) => updateFolio(i, k, e.target.value)}
                            style={{ width: w, background: "#f8f6ff", border: `1px solid ${C.border}`, borderRadius: 4, color: C.text, fontFamily: "inherit", fontSize: 12, padding: "4px 6px", textAlign: a }} />
                        </td>
                      ))}
                      <td style={{ padding: "4px 8px", color: C.accent, fontWeight: 700, textAlign: "right" }}>$ {fmt(f.total)}</td>
                      <td><button onClick={() => removeFolio(i)} style={{ background: "none", border: "none", color: C.red, cursor: "pointer", fontSize: 18 }}>×</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <button onClick={addFolio} style={{ background: C.dim, border: `1px dashed ${C.border}`, color: C.accent, borderRadius: 6, padding: "8px 16px", fontFamily: "inherit", fontSize: 12, cursor: "pointer" }}>+ Agregar Folio</button>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 10, color: C.muted, marginBottom: 2 }}>TOTAL DEUDA MOROSA</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: C.record }}>$ {fmt(totalDeuda)}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <BtnSecondary onClick={() => setStep(1)}>← Volver</BtnSecondary>
              <Btn onClick={() => setStep(3)}>Vista Previa →</Btn>
            </div>
          </div>
        )}
 
        {/* STEP 3 */}
        {step === 3 && (
          <div style={{ background: C.surface, border: `2px solid ${C.border}`, borderRadius: 12, padding: 28, boxShadow: "0 4px 20px rgba(168,85,247,0.1)" }}>
            <SectionTitle>Vista Previa — Resumen de la Demanda</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 24 }}>
              {[["Demandante", form.empresa, `RUT ${form.rutEmpresa}`],["Representante", form.representante, form.cargoRepresentante],["Abogado", form.abogado, form.emailAbogado]].map(([l,v,s]) => (
                <div key={l} style={{ background: C.dim, border: `1px solid ${C.border}`, borderRadius: 8, padding: "12px 14px" }}>
                  <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, marginBottom: 6, textTransform: "uppercase", letterSpacing: 2 }}>{l}</div>
                  <div style={{ fontSize: 12, color: C.text, fontWeight: 600, marginBottom: 2 }}>{v}</div>
                  <div style={{ fontSize: 11, color: C.accent }}>{s}</div>
                </div>
              ))}
            </div>
            <div style={{ background: C.dim, border: `1px solid ${C.border}`, borderRadius: 8, padding: 20, fontSize: 12, lineHeight: 2, marginBottom: 20, maxHeight: 280, overflowY: "auto" }}>
              <p style={{ textAlign: "center", fontWeight: 700, color: C.record, marginBottom: 12 }}>DEMANDA DE DECLARACIÓN DE PRESCRIPCIÓN EXTINTIVA</p>
              <p><strong>{form.empresa}</strong>, RUT <strong>{form.rutEmpresa}</strong>, representada por <strong>{form.representante}</strong>, {form.cargoRepresentante}, RUT <strong>{form.rutRepresentante}</strong>, domiciliados en {form.domicilioEmpresa}.</p>
              <p style={{ marginTop: 8 }}>Certificado de Deuda: <strong>{form.fechaCertificado}</strong> · Folios: <strong>{folios.map(f=>f.folio).filter(Boolean).join(", ")}</strong></p>
              <p style={{ marginTop: 8 }}>Total: <strong style={{ color: C.record }}>$ {fmt(totalDeuda)}</strong></p>
              <p style={{ marginTop: 8, color: C.muted, fontStyle: "italic" }}>[... texto legal completo según plantilla ...]</p>
            </div>
            {error && <div style={{ background: "#fef2f2", border: `1px solid ${C.red}`, borderRadius: 6, padding: "10px 16px", color: C.red, fontSize: 12, marginBottom: 14 }}>⚠ {error}</div>}
            <div style={{ display: "flex", gap: 10 }}>
              <BtnSecondary onClick={() => setStep(2)}>← Editar</BtnSecondary>
              <button onClick={handleGenerar} disabled={loading}
                style={{ flex: 1, background: loading ? "#e9e4f5" : `linear-gradient(135deg, ${C.record}, ${C.accent})`, border: "none", color: loading ? C.muted : "#fff", borderRadius: 6, padding: "13px 24px", fontFamily: "inherit", fontSize: 13, fontWeight: 700, letterSpacing: 2, cursor: loading ? "wait" : "pointer", transition: "all 0.3s" }}>
                {loading ? "⏳ GENERANDO..." : "⬇ GENERAR Y DESCARGAR DEMANDA .DOCX"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
 
const SectionTitle = ({ children }) => (
  <div style={{ borderLeft: `4px solid #bf00ff`, paddingLeft: 14, marginBottom: 24, paddingTop: 4, paddingBottom: 4 }}>
    <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: 1, color: "#bf00ff", textTransform: "uppercase" }}>{children}</div>
  </div>
);
 
const Btn = ({ onClick, children }) => (
  <button onClick={onClick} style={{ flex: 1, background: `linear-gradient(135deg, #bf00ff, #a855f7)`, border: "none", color: "#fff", borderRadius: 6, padding: "11px 20px", fontFamily: "inherit", fontSize: 12, fontWeight: 700, letterSpacing: 1, cursor: "pointer" }}>
    {children}
  </button>
);
 
const BtnSecondary = ({ onClick, children }) => (
  <button onClick={onClick} style={{ background: "#f0f0f5", border: "1px solid #c084fc", color: "#1e1b2e", borderRadius: 6, padding: "11px 20px", fontFamily: "inherit", fontSize: 12, cursor: "pointer" }}>
    {children}
  </button>
);
