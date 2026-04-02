"use client";
import { useState } from "react";
import MutuoModule from "./MutuoModule";
import ReportesModule from "./ReportesModule";
import DocumentosModule from "./DocumentosModule";
 
const C = {
  bg: "#f4f4f4", surface: "#ffffff", border: "#c8b8a2",
  accent: "#b52240", record: "#8b1a2e", text: "#1e1e1e",
  muted: "#555555", dim: "#eeeeee", red: "#c0392b", green: "#27ae60",
};
 
const fmt = (n) => Number(n || 0).toLocaleString("es-CL");
 
const MODULES = [
  { id: "prescripcion", icon: "⚖", title: "Sistema de Prescripción", desc: "Generador de demandas de prescripción extintiva tributaria. Art. 201 Código Tributario.", tag: "ACTIVO", available: true, comingSoon: false, color: "#8b1a2e" },
  { id: "mutuo", icon: "🤝", title: "Contrato Mutuo", desc: "Generador de contratos de mutuo. Incluye modalidad A la Vista y en Cuotas con todos sus campos.", tag: "ACTIVO", available: true, comingSoon: false, color: "#8b1a2e" },
  { id: "documentos", icon: "📄", title: "Documentos Legales", desc: "Contratos de compraventa, arriendo, civiles y laborales. 15 tipos de documentos.", tag: "ACTIVO", available: true, comingSoon: false, color: "#8b1a2e" },
  { id: "clientes", icon: "👥", title: "Gestión de Clientes", desc: "Administración de clientes, casos y seguimiento de expedientes.", tag: "PRÓXIMAMENTE", available: false, comingSoon: false, color: "#999" },
  { id: "reportes", icon: "📊", title: "Reportes y Estadísticas", desc: "Dashboards, métricas de casos, gráficos y exportación Excel. Acceso solo administrador.", tag: "ACTIVO", available: true, comingSoon: false, color: "#8b1a2e" },
  { id: "configuracion", icon: "⚙", title: "Configuración del Sistema", desc: "Parámetros, usuarios y configuración general de la plataforma.", tag: "PRÓXIMAMENTE", available: false, comingSoon: false, color: "#999" },
];
 
const COURT_SVG = `<svg viewBox="0 0 800 380" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;opacity:0.12">
  <rect x="350" y="50" width="100" height="18" fill="#e8eaf0" rx="2"/>
  <polygon points="400,15 310,70 490,70" fill="#e8eaf0"/>
  <rect x="370" y="25" width="60" height="7" fill="#b52240" rx="1"/>
  <rect x="75" y="70" width="650" height="12" fill="#e8eaf0" rx="2"/>
  <rect x="95" y="82" width="15" height="200" fill="#c8ccd8" rx="2"/>
  <rect x="135" y="82" width="15" height="200" fill="#c8ccd8" rx="2"/>
  <rect x="195" y="82" width="15" height="200" fill="#c8ccd8" rx="2"/>
  <rect x="235" y="82" width="15" height="200" fill="#c8ccd8" rx="2"/>
  <rect x="295" y="82" width="15" height="200" fill="#c8ccd8" rx="2"/>
  <rect x="335" y="82" width="15" height="200" fill="#c8ccd8" rx="2"/>
  <rect x="450" y="82" width="15" height="200" fill="#c8ccd8" rx="2"/>
  <rect x="490" y="82" width="15" height="200" fill="#c8ccd8" rx="2"/>
  <rect x="550" y="82" width="15" height="200" fill="#c8ccd8" rx="2"/>
  <rect x="590" y="82" width="15" height="200" fill="#c8ccd8" rx="2"/>
  <rect x="650" y="82" width="15" height="200" fill="#c8ccd8" rx="2"/>
  <rect x="690" y="82" width="15" height="200" fill="#c8ccd8" rx="2"/>
  <rect x="350" y="120" width="100" height="162" fill="#b0b4c0" rx="2"/>
  <rect x="362" y="132" width="32" height="48" fill="#2d2d2d" rx="1"/>
  <rect x="406" y="132" width="32" height="48" fill="#2d2d2d" rx="1"/>
  <rect x="362" y="192" width="76" height="90" fill="#2d2d2d" rx="1"/>
  <rect x="75" y="282" width="650" height="14" fill="#e8eaf0" rx="2"/>
  <rect x="55" y="296" width="690" height="10" fill="#c8ccd8" rx="2"/>
  <rect x="35" y="306" width="730" height="8" fill="#b0b4c0" rx="2"/>
  <rect x="160" y="190" width="58" height="92" fill="#b52240" rx="2"/>
  <rect x="582" y="190" width="58" height="92" fill="#b52240" rx="2"/>
  <line x1="200" y1="148" x2="200" y2="190" stroke="#c9a84c" stroke-width="2"/>
  <line x1="178" y1="160" x2="222" y2="160" stroke="#c9a84c" stroke-width="2"/>
  <ellipse cx="188" cy="168" rx="9" ry="5" fill="none" stroke="#c9a84c" stroke-width="1.5"/>
  <ellipse cx="212" cy="168" rx="9" ry="5" fill="none" stroke="#c9a84c" stroke-width="1.5"/>
</svg>`;
 
function ModuleCard({ mod, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: "#ffffff", border: `1px solid ${hovered && mod.available ? "#8b1a2e" : "#ddd"}`, borderLeft: `4px solid ${mod.available ? (hovered ? "#b52240" : "#8b1a2e") : "#ccc"}`, borderRadius: 4, padding: "24px 22px", cursor: mod.available ? "pointer" : "default", transition: "all 0.2s", boxShadow: hovered && mod.available ? "0 4px 20px rgba(0,0,0,0.12)" : "0 1px 4px rgba(0,0,0,0.06)", transform: hovered && mod.available ? "translateY(-2px)" : "none", opacity: mod.available ? 1 : 0.65, position: "relative" }}>
      {!mod.available && (
        <div style={{ position: "absolute", top: 12, right: 12, background: "#f0f0f0", border: "1px solid #ddd", borderRadius: 3, padding: "2px 8px", fontSize: 9, fontWeight: 700, color: "#999", letterSpacing: 1.5, fontFamily: "'Courier New', monospace" }}>🔒 PRÓXIMAMENTE</div>
      )}
      {mod.available && (
        <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(139,26,46,0.08)", border: "1px solid #8b1a2e", borderRadius: 3, padding: "2px 8px", fontSize: 9, fontWeight: 700, color: "#8b1a2e", letterSpacing: 1.5, fontFamily: "'Courier New', monospace" }}>{mod.tag}</div>
      )}
      <div style={{ fontSize: 28, marginBottom: 14 }}>{mod.icon}</div>
      <div style={{ fontSize: 15, fontWeight: 700, color: "#1e1e1e", marginBottom: 6, fontFamily: "Georgia, serif" }}>{mod.title}</div>
      <div style={{ fontSize: 12, color: "#666", lineHeight: 1.7, marginBottom: 16, fontFamily: "'Courier New', monospace" }}>{mod.desc}</div>
      {mod.available ? (
        <div style={{ fontSize: 11, fontWeight: 700, color: hovered ? "#b52240" : "#8b1a2e", letterSpacing: 1.5, fontFamily: "'Courier New', monospace", transition: "color 0.2s" }}>INGRESAR →</div>
      ) : (
        <div style={{ fontSize: 11, color: "#aaa", fontFamily: "'Courier New', monospace" }}>Disponible próximamente</div>
      )}
    </div>
  );
}
 
export default function Home() {
  const [currentModule, setCurrentModule] = useState(null);
 
  if (currentModule === "prescripcion") return <Prescripcion onBack={() => setCurrentModule(null)} />;
  if (currentModule === "mutuo") return <MutuoModule onBack={() => setCurrentModule(null)} />;
  if (currentModule === "reportes") return <ReportesModule onBack={() => setCurrentModule(null)} />;
  if (currentModule === "documentos") return <DocumentosModule onBack={() => setCurrentModule(null)} />;
 
  return (
    <div style={{ minHeight: "100vh", background: "#f4f4f4", fontFamily: "Georgia, 'Times New Roman', serif", color: "#1e1e1e" }}>
 
      {/* Header */}
      <div style={{ background: "#1e1e1e", borderBottom: "3px solid #8b1a2e", padding: "0 40px", height: 70, display: "flex", alignItems: "center", gap: 18, boxShadow: "0 2px 20px rgba(0,0,0,0.4)" }}>
        <img src="https://raw.githubusercontent.com/Rodrigo-Riquelme-Saavedra/prescripcion-v2/main/public/PaginaWeb.png" alt="Grupo GV" style={{ height: 52, objectFit: "contain", flexShrink: 0 }} onError={(e) => { e.target.style.display = "none"; }} />
        <div style={{ width: 1, height: 36, background: "linear-gradient(to bottom, transparent, #8b1a2e, transparent)" }} />
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: 2, color: "#f4f4f4", fontFamily: "'Courier New', monospace" }}>PORTAL DE GESTIÓN JURÍDICA</div>
          <div style={{ fontSize: 10, color: "#b52240", letterSpacing: 2, marginTop: 2, fontFamily: "'Courier New', monospace" }}>GRUPO GV · CHILE</div>
        </div>
        <div style={{ marginLeft: "auto", background: "rgba(139,26,46,0.2)", border: "1px solid #8b1a2e", borderRadius: 4, padding: "4px 14px", fontSize: 10, color: "#b52240", fontWeight: 700, letterSpacing: 2, fontFamily: "'Courier New', monospace" }}>● EN LÍNEA</div>
      </div>
 
      {/* Hero */}
      <div style={{ position: "relative", background: "#1e1e1e", height: 300, overflow: "hidden", display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }} dangerouslySetInnerHTML={{ __html: COURT_SVG }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #1e1e1e 35%, transparent 65%, #1e1e1e 90%)" }} />
        <div style={{ position: "relative", zIndex: 2, padding: "0 60px", maxWidth: 580 }}>
          <div style={{ fontSize: 11, color: "#b52240", letterSpacing: 4, fontWeight: 700, marginBottom: 12, fontFamily: "'Courier New', monospace" }}>BIENVENIDO AL PORTAL</div>
          <div style={{ fontSize: 34, fontWeight: 700, color: "#f4f4f4", lineHeight: 1.3, marginBottom: 12, fontFamily: "Georgia, serif" }}>Gestión Jurídica<br /><span style={{ color: "#b52240" }}>Profesional</span></div>
          <div style={{ fontSize: 13, color: "#aaaaaa", lineHeight: 1.8, maxWidth: 400, fontFamily: "'Courier New', monospace" }}>Plataforma integral para la generación y gestión de documentos legales. Diseñada para bufetes de abogados y notarías.</div>
          <div style={{ marginTop: 20, width: 50, height: 2, background: "#8b1a2e" }} />
        </div>
      </div>
 
      {/* Divider */}
      <div style={{ background: "#2d2d2d", padding: "12px 60px", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 6, height: 6, background: "#8b1a2e", borderRadius: 1 }} />
        <span style={{ fontSize: 11, color: "#888", letterSpacing: 3, fontFamily: "'Courier New', monospace" }}>SELECCIONE UN MÓDULO PARA COMENZAR</span>
      </div>
 
      {/* Modules */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {MODULES.map((mod) => (
            <ModuleCard key={mod.id} mod={mod} onClick={() => mod.available && setCurrentModule(mod.id)} />
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 48, paddingTop: 24, borderTop: "1px solid #ddd" }}>
          <div style={{ fontSize: 11, color: "#888", letterSpacing: 2, fontFamily: "'Courier New', monospace" }}>© 2026 GRUPO GV · TODOS LOS DERECHOS RESERVADOS · CHILE</div>
        </div>
      </div>
    </div>
  );
}
