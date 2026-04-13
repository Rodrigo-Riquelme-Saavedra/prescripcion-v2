"use client";
import { useState } from "react";
import RutField from "./RutField";
import MutuoModule from "./MutuoModule";
import ReportesModule from "./ReportesModule";
import DocumentosModule from "./DocumentosModule";
import MandatosModule from "./MandatosModule";
import ConfiguracionModule from "./ConfiguracionModule";
 
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
  { id: "configuracion", icon: "⚙", title: "Configuración del Sistema", desc: "Gestión de notarías, parámetros y configuración general.", tag: "ACTIVO", available: true, comingSoon: false, color: "#8b1a2e" },
];
 
const COURT_SVG = `<svg viewBox="0 0 800 380" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;opacity:0.45">
  <rect x="350" y="50" width="100" height="18" fill="#ffffff" rx="2"/>
  <polygon points="400,15 310,70 490,70" fill="#ffffff"/>
  <rect x="370" y="25" width="60" height="7" fill="#d03050" rx="1"/>
  <rect x="75" y="70" width="650" height="12" fill="#ffffff" rx="2"/>
  <rect x="95" y="82" width="15" height="200" fill="#dddddd" rx="2"/>
  <rect x="135" y="82" width="15" height="200" fill="#dddddd" rx="2"/>
  <rect x="195" y="82" width="15" height="200" fill="#dddddd" rx="2"/>
  <rect x="235" y="82" width="15" height="200" fill="#dddddd" rx="2"/>
  <rect x="295" y="82" width="15" height="200" fill="#dddddd" rx="2"/>
  <rect x="335" y="82" width="15" height="200" fill="#dddddd" rx="2"/>
  <rect x="450" y="82" width="15" height="200" fill="#dddddd" rx="2"/>
  <rect x="490" y="82" width="15" height="200" fill="#dddddd" rx="2"/>
  <rect x="550" y="82" width="15" height="200" fill="#dddddd" rx="2"/>
  <rect x="590" y="82" width="15" height="200" fill="#dddddd" rx="2"/>
  <rect x="650" y="82" width="15" height="200" fill="#dddddd" rx="2"/>
  <rect x="690" y="82" width="15" height="200" fill="#dddddd" rx="2"/>
  <rect x="350" y="120" width="100" height="162" fill="#cccccc" rx="2"/>
  <rect x="362" y="132" width="32" height="48" fill="#1a1a1a" rx="1"/>
  <rect x="406" y="132" width="32" height="48" fill="#1a1a1a" rx="1"/>
  <rect x="362" y="192" width="76" height="90" fill="#1a1a1a" rx="1"/>
  <rect x="75" y="282" width="650" height="14" fill="#ffffff" rx="2"/>
  <rect x="55" y="296" width="690" height="10" fill="#dddddd" rx="2"/>
  <rect x="35" y="306" width="730" height="8" fill="#cccccc" rx="2"/>
  <rect x="160" y="190" width="58" height="92" fill="#d03050" rx="2"/>
  <rect x="582" y="190" width="58" height="92" fill="#d03050" rx="2"/>
  <line x1="200" y1="148" x2="200" y2="190" stroke="#f0c060" stroke-width="2"/>
  <line x1="178" y1="160" x2="222" y2="160" stroke="#f0c060" stroke-width="2"/>
  <ellipse cx="188" cy="168" rx="9" ry="5" fill="none" stroke="#f0c060" stroke-width="1.5"/>
  <ellipse cx="212" cy="168" rx="9" ry="5" fill="none" stroke="#f0c060" stroke-width="1.5"/>
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
 
// ── LOGIN MODAL ──────────────────────────────────────────────────────────────
function LoginModal({ perfil, onSuccess, onCancel }) {
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
 
  const CREDS = {
    "abogado":  [{ u: "abogado",  p: "gv2026" }],
    "notaria":  [{ u: "notaria",  p: "gv2026" }],
  };
 
  const handleLogin = () => {
    const valid = (CREDS[perfil] || []).find(c => c.u === user && c.p === pass);
    if (valid) { onSuccess(); }
    else { setError("Usuario o contraseña incorrectos"); }
  };
 
  const iconos = { abogado: "⚖", notaria: "📋" };
  const nombres = { abogado: "Abogados", notaria: "Notaría" };
 
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.65)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#ffffff", borderRadius: 8, width: 380, padding: "36px 32px", boxShadow: "0 20px 60px rgba(0,0,0,0.3)", borderTop: "4px solid #8b1a2e" }}>
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div style={{ fontSize: 36, marginBottom: 8 }}>{iconos[perfil]}</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#1e1e1e", fontFamily: "Georgia, serif", marginBottom: 4 }}>Acceso — {nombres[perfil]}</div>
          <div style={{ fontSize: 12, color: "#888", fontFamily: "'Courier New', monospace" }}>Ingresa tus credenciales para continuar</div>
        </div>
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 10, color: "#555", fontWeight: 700, letterSpacing: 2, marginBottom: 5, textTransform: "uppercase", fontFamily: "'Courier New', monospace" }}>Usuario</div>
          <input
            value={user} onChange={e => { setUser(e.target.value); setError(""); }}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            style={{ width: "100%", border: "1px solid #c8b8a2", borderRadius: 4, padding: "10px 12px", fontSize: 13, fontFamily: "'Courier New', monospace", boxSizing: "border-box" }}
            placeholder="tu usuario" autoFocus
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 10, color: "#555", fontWeight: 700, letterSpacing: 2, marginBottom: 5, textTransform: "uppercase", fontFamily: "'Courier New', monospace" }}>Contraseña</div>
          <input
            type="password" value={pass} onChange={e => { setPass(e.target.value); setError(""); }}
            onKeyDown={e => e.key === "Enter" && handleLogin()}
            style={{ width: "100%", border: "1px solid #c8b8a2", borderRadius: 4, padding: "10px 12px", fontSize: 13, fontFamily: "'Courier New', monospace", boxSizing: "border-box" }}
            placeholder="••••••••"
          />
        </div>
        {error && (
          <div style={{ background: "#fef2f2", border: "1px solid #c0392b", borderRadius: 4, padding: "8px 12px", color: "#c0392b", fontSize: 12, marginBottom: 16, fontFamily: "'Courier New', monospace" }}>
            ⚠ {error}
          </div>
        )}
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={onCancel} style={{ flex: 1, background: "#f4f4f4", border: "1px solid #ddd", color: "#555", borderRadius: 4, padding: "10px", fontFamily: "inherit", fontSize: 12, cursor: "pointer" }}>Cancelar</button>
          <button onClick={handleLogin} style={{ flex: 2, background: "linear-gradient(135deg, #8b1a2e, #b52240)", border: "none", color: "#fff", borderRadius: 4, padding: "10px", fontFamily: "inherit", fontSize: 12, fontWeight: 700, letterSpacing: 1, cursor: "pointer" }}>INGRESAR →</button>
        </div>
      </div>
    </div>
  );
}
 
// ── PORTAL SELECTOR ──────────────────────────────────────────────────────────
const PERFILES = [
  {
    id: "abogado",
    icon: "⚖",
    titulo: "Abogados",
    desc: "Acceso al sistema de generación de documentos jurídicos, prescripciones, mandatos y contratos.",
    requiereLogin: true,
    color: "#8b1a2e",
  },
  {
    id: "cliente",
    icon: "👤",
    titulo: "Cliente / Usuario",
    desc: "Consulta de documentos, seguimiento de expedientes y gestión de información personal.",
    requiereLogin: false,
    color: "#1a2f5a",
  },
  {
    id: "notaria",
    icon: "📋",
    titulo: "Notaría",
    desc: "Gestión de escrituras, repertorios, notarías registradas y documentos notariales.",
    requiereLogin: true,
    color: "#8b1a2e",
  },
  {
    id: "estudio",
    icon: "🏛",
    titulo: "Estudio Jurídico",
    desc: "Administración del estudio, bufete de abogados, reportes y configuración del sistema.",
    requiereLogin: false,
    color: "#1a2f5a",
  },
];
 
 
function PerfilCard({ perfil, onSelect }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={() => onSelect(perfil)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ background: hovered ? perfil.color : "#ffffff", border: `1px solid ${hovered ? perfil.color : "#ddd"}`, borderLeft: `5px solid ${perfil.color}`, borderRadius: 4, padding: "28px 24px", cursor: "pointer", transition: "all 0.2s", boxShadow: hovered ? "0 6px 24px rgba(0,0,0,0.15)" : "0 1px 4px rgba(0,0,0,0.06)", transform: hovered ? "translateY(-3px)" : "none" }}
    >
      <div style={{ fontSize: 36, marginBottom: 14 }}>{perfil.icon}</div>
      <div style={{ fontSize: 18, fontWeight: 700, color: hovered ? "#ffffff" : "#1e1e1e", fontFamily: "Georgia, serif", marginBottom: 8 }}>{perfil.titulo}</div>
      <div style={{ fontSize: 12, color: hovered ? "rgba(255,255,255,0.8)" : "#666", lineHeight: 1.7, fontFamily: "'Courier New', monospace", marginBottom: 16 }}>{perfil.desc}</div>
      {perfil.requiereLogin && (
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: hovered ? "rgba(255,255,255,0.15)" : "rgba(139,26,46,0.08)", border: `1px solid ${hovered ? "rgba(255,255,255,0.3)" : "#8b1a2e"}`, borderRadius: 3, padding: "3px 10px", fontSize: 10, color: hovered ? "#fff" : "#8b1a2e", fontWeight: 700, letterSpacing: 1, fontFamily: "'Courier New', monospace" }}>
          🔒 REQUIERE LOGIN
        </div>
      )}
      <div style={{ marginTop: perfil.requiereLogin ? 10 : 0, fontSize: 11, fontWeight: 700, color: hovered ? "rgba(255,255,255,0.9)" : perfil.color, letterSpacing: 1.5, fontFamily: "'Courier New', monospace" }}>
        {hovered ? "INGRESAR →" : "SELECCIONAR →"}
      </div>
    </div>
  );
}
 
export default function Home() {
  const [currentModule, setCurrentModule] = useState(null);
  const [mandatoTipo, setMandatoTipo] = useState(null);
  const [perfilActivo, setPerfilActivo] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [perfilPendiente, setPerfilPendiente] = useState(null);
 
  const handlePerfilSelect = (perfil) => {
    if (perfil.requiereLogin) {
      setPerfilPendiente(perfil);
      setShowLogin(true);
    } else {
      setPerfilActivo(perfil);
    }
  };
 
  const handleLoginSuccess = () => {
    setShowLogin(false);
    setPerfilActivo(perfilPendiente);
    setPerfilPendiente(null);
  };
 
  const handleLogout = () => {
    setPerfilActivo(null);
    setCurrentModule(null);
    setMandatoTipo(null);
  };
 
  if (currentModule === "prescripcion") return <Prescripcion onBack={() => setCurrentModule(null)} />;
  if (currentModule === "mutuo") return <MutuoModule onBack={() => setCurrentModule(null)} />;
  if (currentModule === "reportes") return <ReportesModule onBack={() => setCurrentModule(null)} />;
  if (currentModule === "configuracion") return <ConfiguracionModule onBack={() => setCurrentModule(null)} />;
  if (currentModule === "mandatos") return <MandatosModule onBack={() => { setCurrentModule("documentos"); setMandatoTipo(null); }} initialTipo={mandatoTipo} />;
  if (currentModule === "documentos") return <DocumentosModule 
    onBack={() => setCurrentModule(null)} 
    onMandato={(tipo) => { setMandatoTipo(tipo); setCurrentModule("mandatos"); }}
  />;
 
  // Si no hay perfil activo → mostrar selector de perfiles
  if (!perfilActivo) {
    return (
      <div style={{ minHeight: "100vh", background: "#f4f4f4", fontFamily: "Georgia, serif", color: "#1e1e1e" }}>
        {showLogin && (
          <LoginModal
            perfil={perfilPendiente?.id}
            onSuccess={handleLoginSuccess}
            onCancel={() => { setShowLogin(false); setPerfilPendiente(null); }}
          />
        )}
 
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
        <div style={{ position: "relative", background: "#1e1e1e", height: 260, overflow: "hidden", display: "flex", alignItems: "center" }}>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }} dangerouslySetInnerHTML={{ __html: COURT_SVG }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #1e1e1e 35%, transparent 65%, #1e1e1e 90%)" }} />
          <div style={{ position: "relative", zIndex: 2, padding: "0 60px", maxWidth: 620 }}>
            <div style={{ fontSize: 11, color: "#b52240", letterSpacing: 4, fontWeight: 700, marginBottom: 10, fontFamily: "'Courier New', monospace" }}>BIENVENIDO AL PORTAL</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: "#f4f4f4", lineHeight: 1.3, marginBottom: 10, fontFamily: "Georgia, serif" }}>Gestión Jurídica<br /><span style={{ color: "#b52240" }}>Profesional</span></div>
            <div style={{ fontSize: 12, color: "#aaaaaa", lineHeight: 1.7, maxWidth: 440, fontFamily: "'Courier New', monospace" }}>Selecciona tu perfil para acceder a las herramientas correspondientes.</div>
            <div style={{ marginTop: 16, width: 50, height: 2, background: "#8b1a2e" }} />
          </div>
        </div>
 
        {/* Divider */}
        <div style={{ background: "#2d2d2d", padding: "12px 60px", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 6, height: 6, background: "#8b1a2e", borderRadius: 1 }} />
          <span style={{ fontSize: 11, color: "#888", letterSpacing: 3, fontFamily: "'Courier New', monospace" }}>¿CON QUÉ PERFIL INGRESAS HOY?</span>
        </div>
 
        {/* Perfil cards */}
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 24px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, marginBottom: 40 }}>
            {PERFILES.map(p => <PerfilCard key={p.id} perfil={p} onSelect={handlePerfilSelect} />)}
          </div>
          <div style={{ textAlign: "center", paddingTop: 24, borderTop: "1px solid #ddd" }}>
            <div style={{ fontSize: 11, color: "#888", letterSpacing: 2, fontFamily: "'Courier New', monospace" }}>© 2026 GRUPO GV · TODOS LOS DERECHOS RESERVADOS · CHILE</div>
          </div>
        </div>
      </div>
    );
  }
 
  // Portal principal de módulos (con perfil activo)
  return (
    <div style={{ minHeight: "100vh", background: "#f4f4f4", fontFamily: "Georgia, 'Times New Roman', serif", color: "#1e1e1e" }}>
 
      {/* Header con perfil activo */}
      <div style={{ background: "#1e1e1e", borderBottom: "3px solid #8b1a2e", padding: "0 40px", height: 70, display: "flex", alignItems: "center", gap: 18, boxShadow: "0 2px 20px rgba(0,0,0,0.4)" }}>
        <img src="https://raw.githubusercontent.com/Rodrigo-Riquelme-Saavedra/prescripcion-v2/main/public/PaginaWeb.png" alt="Grupo GV" style={{ height: 52, objectFit: "contain", flexShrink: 0 }} onError={(e) => { e.target.style.display = "none"; }} />
        <div style={{ width: 1, height: 36, background: "linear-gradient(to bottom, transparent, #8b1a2e, transparent)" }} />
        <div>
          <div style={{ fontWeight: 700, fontSize: 15, letterSpacing: 2, color: "#f4f4f4", fontFamily: "'Courier New', monospace" }}>PORTAL DE GESTIÓN JURÍDICA</div>
          <div style={{ fontSize: 10, color: "#b52240", letterSpacing: 2, marginTop: 2, fontFamily: "'Courier New', monospace" }}>GRUPO GV · CHILE</div>
        </div>
        {/* Perfil badge */}
        <div style={{ marginLeft: 20, background: "rgba(139,26,46,0.15)", border: "1px solid #8b1a2e", borderRadius: 4, padding: "4px 14px", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: 14 }}>{perfilActivo.icon}</span>
          <span style={{ fontSize: 11, color: "#b52240", fontWeight: 700, letterSpacing: 1, fontFamily: "'Courier New', monospace" }}>{perfilActivo.titulo.toUpperCase()}</span>
        </div>
        <button onClick={handleLogout} style={{ marginLeft: "auto", background: "transparent", border: "1px solid #555", color: "#999", borderRadius: 4, padding: "4px 14px", fontSize: 10, fontFamily: "'Courier New', monospace", cursor: "pointer", letterSpacing: 1 }}>
          ← CAMBIAR PERFIL
        </button>
      </div>
 
      {/* Hero */}
      <div style={{ position: "relative", background: "#1e1e1e", height: 300, overflow: "hidden", display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }} dangerouslySetInnerHTML={{ __html: COURT_SVG }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #1e1e1e 35%, transparent 65%, #1e1e1e 90%)" }} />
        <div style={{ position: "relative", zIndex: 2, padding: "0 60px", maxWidth: 580 }}>
          <div style={{ fontSize: 11, color: "#b52240", letterSpacing: 4, fontWeight: 700, marginBottom: 12, fontFamily: "'Courier New', monospace" }}>BIENVENIDO — {perfilActivo.titulo.toUpperCase()}</div>
          <div style={{ fontSize: 34, fontWeight: 700, color: "#f4f4f4", lineHeight: 1.3, marginBottom: 12, fontFamily: "Georgia, serif" }}>Gestión Jurídica<br /><span style={{ color: "#b52240" }}>Profesional</span></div>
          <div style={{ fontSize: 13, color: "#aaaaaa", lineHeight: 1.8, maxWidth: 400, fontFamily: "'Courier New', monospace" }}>Plataforma integral para la generación y gestión de documentos legales.</div>
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
 
 
const BALANCE_SVG_PAGE = `<svg viewBox="0 0 800 380" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;opacity:0.45">
  <line x1="400" y1="60" x2="400" y2="280" stroke="#ffffff" stroke-width="5"/>
  <rect x="388" y="270" width="24" height="60" fill="#dddddd" rx="2"/>
  <rect x="340" y="320" width="120" height="10" fill="#ffffff" rx="2"/>
  <rect x="310" y="330" width="180" height="8" fill="#dddddd" rx="2"/>
  <line x1="200" y1="110" x2="600" y2="110" stroke="#ffffff" stroke-width="3"/>
  <rect x="396" y="56" width="8" height="8" fill="#f0c060" rx="1"/>
  <line x1="200" y1="110" x2="180" y2="200" stroke="#cccccc" stroke-width="2.5"/>
  <line x1="600" y1="110" x2="620" y2="200" stroke="#cccccc" stroke-width="2.5"/>
  <ellipse cx="180" cy="220" rx="70" ry="25" fill="none" stroke="#dddddd" stroke-width="2.5"/>
  <path d="M 110 200 Q 180 180 250 200" fill="none" stroke="#dddddd" stroke-width="2.5"/>
  <ellipse cx="620" cy="225" rx="70" ry="25" fill="none" stroke="#e05070" stroke-width="2.5"/>
  <path d="M 550 205 Q 620 185 690 205" fill="none" stroke="#e05070" stroke-width="2.5"/>
  <circle cx="400" cy="108" r="10" fill="#f0c060"/>
  <rect x="385" y="50" width="30" height="12" fill="#f0c060" rx="1"/>
</svg>`;
 
function ModuleHero({ title, subtitle, onBack }) {
  return (
    <div>
      <div style={{ background: "#1e1e1e", borderBottom: "3px solid #8b1a2e", padding: "0 40px", height: 70, display: "flex", alignItems: "center", gap: 18, boxShadow: "0 2px 20px rgba(0,0,0,0.4)" }}>
        <img src="https://raw.githubusercontent.com/Rodrigo-Riquelme-Saavedra/prescripcion-v2/main/public/PaginaWeb.png" alt="Grupo GV" style={{ height: 52, objectFit: "contain", flexShrink: 0 }} onError={(e) => { e.target.style.display = "none"; }} />
        <div style={{ width: 1, height: 36, background: "linear-gradient(to bottom, transparent, #8b1a2e, transparent)" }} />
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, letterSpacing: 2, color: "#f4f4f4", fontFamily: "'Courier New', monospace" }}>PORTAL DE GESTIÓN JURÍDICA</div>
          <div style={{ fontSize: 10, color: "#b52240", letterSpacing: 2, marginTop: 2, fontFamily: "'Courier New', monospace" }}>GRUPO GV · CHILE</div>
        </div>
        <button onClick={onBack} style={{ marginLeft: "auto", background: "rgba(139,26,46,0.1)", border: "1px solid #8b1a2e", borderRadius: 4, padding: "6px 16px", fontSize: 11, color: "#b52240", fontWeight: 700, cursor: "pointer", fontFamily: "'Courier New', monospace", letterSpacing: 1 }}>← Volver al Portal</button>
      </div>
      <div style={{ position: "relative", background: "#1e1e1e", height: 180, overflow: "hidden", display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 60 }} dangerouslySetInnerHTML={{ __html: BALANCE_SVG_PAGE }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #1e1e1e 40%, transparent 70%, #1e1e1e 95%)" }} />
        <div style={{ position: "relative", zIndex: 2, padding: "0 48px" }}>
          <div style={{ fontSize: 10, color: "#b52240", letterSpacing: 4, fontWeight: 700, marginBottom: 8, fontFamily: "'Courier New', monospace" }}>PORTAL DE GESTIÓN JURÍDICA · GRUPO GV</div>
          <div style={{ fontSize: 26, fontWeight: 700, color: "#f4f4f4", fontFamily: "Georgia, serif", marginBottom: 4 }}>{title}</div>
          <div style={{ fontSize: 11, color: "#aaaaaa", fontFamily: "'Courier New', monospace", letterSpacing: 1 }}>{subtitle}</div>
          <div style={{ marginTop: 12, width: 40, height: 2, background: "#8b1a2e" }} />
        </div>
      </div>
    </div>
  );
}
 
// ── REGISTRO DE ACTIVIDAD ─────────────────────────────────────────────────────
async function registrarActividad(tipo, cliente, rut, abogado, monto) {
  try {
    await fetch("/api/registros", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tipo, cliente, rut, abogado, monto }),
    });
  } catch {}
}
 
// ── PRESCRIPCION MODULE ───────────────────────────────────────────────────────
const FOLIOS_EJEMPLO = [];
const STEPS = ["1. Demandante", "2. Abogado", "3. Folios", "4. Vista Previa"];
 
function Prescripcion({ onBack }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    empresa: "", rutEmpresa: "", representante: "", cargoRepresentante: "gerente general",
    rutRepresentante: "", domicilioEmpresa: "", abogado: "", rutAbogado: "",
    domicilioAbogado: "", emailAbogado: "", fechaCertificado: "", expedientes: "",
  });
  const [folios, setFolios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [extracting, setExtracting] = useState(false);
  const [extractError, setExtractError] = useState("");
  const [fileName, setFileName] = useState("");
 
  const totalDeuda = folios.reduce((s, f) => s + (parseFloat(f.total) || 0), 0);
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));
 
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    setExtracting(true);
    setExtractError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("/api/extraer-folios", { method: "POST", body: formData });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Error desconocido");
      if (!Array.isArray(data.folios) || data.folios.length === 0) throw new Error("No se encontraron folios");
      setFolios(data.folios);
    } catch (err) {
      setExtractError(err.message || "No se pudieron extraer los folios.");
    } finally {
      setExtracting(false);
    }
  };
 
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
      await registrarActividad("Prescripción", form.empresa, form.rutEmpresa, form.abogado, totalDeuda);
    } catch { setError("Hubo un error generando el documento. Intenta nuevamente."); }
    finally { setLoading(false); }
  };
 
  const Field = ({ label, k, placeholder, full }) => (
    <div style={{ gridColumn: full ? "1 / -1" : "span 1" }}>
      <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, letterSpacing: 2, marginBottom: 5, textTransform: "uppercase", fontFamily: "'Courier New', monospace" }}>{label}</div>
      <input style={{ width: "100%", background: "#ffffff", border: `1px solid ${C.border}`, borderRadius: 4, padding: "9px 12px", color: C.text, fontFamily: "'Courier New', monospace", fontSize: 13, boxSizing: "border-box" }}
        value={form[k]} onChange={(e) => set(k, e.target.value)} placeholder={placeholder || ""} />
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
 
  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Courier New', monospace", color: C.text }}>
      <div style={{ background: "#1e1e1e", borderBottom: "3px solid #8b1a2e", padding: "0 40px", height: 70, display: "flex", alignItems: "center", gap: 18 }}>
        <img src="https://raw.githubusercontent.com/Rodrigo-Riquelme-Saavedra/prescripcion-v2/main/public/PaginaWeb.png" alt="Grupo GV" style={{ height: 52, objectFit: "contain", flexShrink: 0 }} onError={(e) => { e.target.style.display = "none"; }} />
        <div style={{ width: 1, height: 36, background: "linear-gradient(to bottom, transparent, #8b1a2e, transparent)" }} />
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, letterSpacing: 2, color: "#f4f4f4", fontFamily: "'Courier New', monospace" }}>PORTAL DE GESTIÓN JURÍDICA</div>
          <div style={{ fontSize: 10, color: "#b52240", letterSpacing: 2, marginTop: 2, fontFamily: "'Courier New', monospace" }}>GRUPO GV · CHILE</div>
        </div>
        <button onClick={onBack} style={{ marginLeft: "auto", background: "rgba(139,26,46,0.1)", border: "1px solid #8b1a2e", borderRadius: 4, padding: "6px 16px", fontSize: 11, color: "#b52240", fontWeight: 700, cursor: "pointer", fontFamily: "'Courier New', monospace", letterSpacing: 1 }}>← Volver al Portal</button>
      </div>
      <div style={{ position: "relative", background: "#1e1e1e", height: 180, overflow: "hidden", display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 60 }} dangerouslySetInnerHTML={{ __html: `<svg viewBox="0 0 800 380" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;opacity:0.45">
  <line x1="400" y1="60" x2="400" y2="280" stroke="#ffffff" stroke-width="5"/>
  <rect x="388" y="270" width="24" height="60" fill="#dddddd" rx="2"/>
  <rect x="340" y="320" width="120" height="10" fill="#ffffff" rx="2"/>
  <rect x="310" y="330" width="180" height="8" fill="#dddddd" rx="2"/>
  <line x1="200" y1="110" x2="600" y2="110" stroke="#ffffff" stroke-width="3"/>
  <rect x="396" y="56" width="8" height="8" fill="#f0c060" rx="1"/>
  <line x1="200" y1="110" x2="180" y2="200" stroke="#cccccc" stroke-width="2.5"/>
  <line x1="600" y1="110" x2="620" y2="200" stroke="#cccccc" stroke-width="2.5"/>
  <ellipse cx="180" cy="220" rx="70" ry="25" fill="none" stroke="#dddddd" stroke-width="2.5"/>
  <path d="M 110 200 Q 180 180 250 200" fill="none" stroke="#dddddd" stroke-width="2.5"/>
  <ellipse cx="620" cy="225" rx="70" ry="25" fill="none" stroke="#e05070" stroke-width="2.5"/>
  <path d="M 550 205 Q 620 185 690 205" fill="none" stroke="#e05070" stroke-width="2.5"/>
  <circle cx="400" cy="108" r="10" fill="#f0c060"/>
  <rect x="385" y="50" width="30" height="12" fill="#f0c060" rx="1"/>
</svg>` }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #1e1e1e 40%, transparent 70%, #1e1e1e 95%)" }} />
        <div style={{ position: "relative", zIndex: 2, padding: "0 48px" }}>
          <div style={{ fontSize: 10, color: "#b52240", letterSpacing: 4, fontWeight: 700, marginBottom: 8, fontFamily: "'Courier New', monospace" }}>PORTAL DE GESTIÓN JURÍDICA · GRUPO GV</div>
          <div style={{ fontSize: 26, fontWeight: 700, color: "#f4f4f4", fontFamily: "Georgia, serif", marginBottom: 4 }}>Sistema de Prescripción</div>
          <div style={{ fontSize: 11, color: "#aaaaaa", fontFamily: "'Courier New', monospace", letterSpacing: 1 }}>Prescripción Extintiva Tributaria · Art. 201 Código Tributario</div>
          <div style={{ marginTop: 12, width: 40, height: 2, background: "#8b1a2e" }} />
        </div>
      </div>
 
      <div style={{ maxWidth: 880, margin: "0 auto", padding: "32px 20px" }}>
        <div style={{ display: "flex", marginBottom: 28, border: "1px solid #ddd", borderRadius: 4, overflow: "hidden" }}>
          {STEPS.map((s, i) => (
            <button key={s} onClick={() => i <= step && setStep(i)}
              style={{ flex: 1, padding: "11px 0", background: i === step ? "#8b1a2e" : i < step ? "#f0e8e8" : "#ffffff", border: "none", borderRight: i < 3 ? "1px solid #ddd" : "none", color: i === step ? "#fff" : i < step ? "#8b1a2e" : "#888", fontFamily: "inherit", fontSize: 11, fontWeight: 700, letterSpacing: 1, cursor: i <= step ? "pointer" : "default" }}>
              {i < step ? "✓ " : ""}{s}
            </button>
          ))}
        </div>
 
        {step === 0 && (
          <Box>
            <SectionTitle>Datos del Demandante</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
              <Field label="Razón Social / Nombre completo" k="empresa" full />
              <RutField label="RUT Empresa" value={form.rutEmpresa} onChange={(v) => set("rutEmpresa", v)} />
              <Field label="Representante Legal" k="representante" />
              <Field label="Cargo del Representante" k="cargoRepresentante" />
              <RutField label="RUT Representante" value={form.rutRepresentante} onChange={(v) => set("rutRepresentante", v)} />
              <Field label="Domicilio" k="domicilioEmpresa" full />
            </div>
            <BtnPrimary onClick={() => setStep(1)}>Siguiente: Abogado →</BtnPrimary>
          </Box>
        )}
 
        {step === 1 && (
          <Box>
            <SectionTitle>Datos del Abogado Patrocinante</SectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
              <Field label="Nombre Abogado" k="abogado" />
              <RutField label="RUT Abogado" value={form.rutAbogado} onChange={(v) => set("rutAbogado", v)} />
              <Field label="Domicilio Profesional" k="domicilioAbogado" full />
              <Field label="Correo Electrónico" k="emailAbogado" />
              <Field label="Fecha del Certificado de Deuda" k="fechaCertificado" placeholder="15-12-2025" />
              <Field label="N° Expediente(s)" k="expedientes" placeholder="Opcional" full />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <BtnSecondary onClick={() => setStep(0)}>← Volver</BtnSecondary>
              <BtnPrimary onClick={() => setStep(2)}>Siguiente: Folios →</BtnPrimary>
            </div>
          </Box>
        )}
 
        {step === 2 && (
          <Box>
            <SectionTitle>Certificado de Deuda — Carga de Folios</SectionTitle>
            {!extracting && folios.length === 0 && (
              <div>
                <p style={{ fontSize: 13, color: C.muted, marginBottom: 20, lineHeight: 1.7 }}>
                  Sube el <strong>Certificado de Deuda emitido por la TGR</strong> (PDF o Excel). El sistema extraerá automáticamente todos los folios, fechas y montos.
                </p>
                <label style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: `2px dashed #c8b8a2`, borderRadius: 4, padding: "40px 24px", cursor: "pointer", background: "#fafaf8" }}>
                  <div style={{ fontSize: 40, marginBottom: 12 }}>📄</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.muted, marginBottom: 6 }}>Arrastra aquí o haz clic para subir</div>
                  <div style={{ fontSize: 11, color: "#8b1a2e" }}>Certificado TGR en formato PDF o Excel (.xlsx)</div>
                  <input type="file" accept=".pdf,.xlsx,.xls" onChange={handleFileUpload} style={{ display: "none" }} />
                </label>
                {extractError && <div style={{ marginTop: 16, background: "#fef2f2", border: "1px solid #c0392b", borderRadius: 4, padding: "12px 16px", color: "#c0392b", fontSize: 12 }}>⚠ {extractError}</div>}
              </div>
            )}
            {extracting && (
              <div style={{ textAlign: "center", padding: "48px 0" }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>🤖</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.muted, marginBottom: 8 }}>Analizando certificado...</div>
                <div style={{ fontSize: 12, color: "#8b1a2e" }}>La IA está extrayendo los folios y montos del documento</div>
              </div>
            )}
            {!extracting && folios.length > 0 && (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16, background: "#f0f7f0", border: "1px solid #27ae60", borderRadius: 4, padding: "10px 16px" }}>
                  <span>✅</span>
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#1a6b2a" }}>{folios.length} folios extraídos · {fileName}</div>
                  <button onClick={() => { setFolios([]); setFileName(""); }} style={{ marginLeft: "auto", background: "none", border: "1px solid #27ae60", borderRadius: 4, padding: "3px 10px", fontSize: 11, color: "#27ae60", cursor: "pointer", fontFamily: "inherit" }}>Cambiar archivo</button>
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                    <thead>
                      <tr style={{ background: "#f0f0f0" }}>
                        {["Folio", "Fecha Vcto.", "Deuda Neta", "Reajuste", "Interés", "Multa", "Total"].map(h => (
                          <th key={h} style={{ padding: "8px 10px", color: "#555", fontSize: 10, fontWeight: 700, borderBottom: "1px solid #ddd", textAlign: "right" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {folios.map((f, i) => (
                        <tr key={i} style={{ borderBottom: "1px solid #eee", background: i % 2 === 0 ? "#fff" : "#fafaf8" }}>
                          <td style={{ padding: "6px 10px", textAlign: "left", fontWeight: 600 }}>{f.folio}</td>
                          <td style={{ padding: "6px 10px", textAlign: "right" }}>{f.fechaVcto}</td>
                          <td style={{ padding: "6px 10px", textAlign: "right" }}>$ {fmt(f.deudaNeta)}</td>
                          <td style={{ padding: "6px 10px", textAlign: "right" }}>$ {fmt(f.reajuste)}</td>
                          <td style={{ padding: "6px 10px", textAlign: "right" }}>$ {fmt(f.interes)}</td>
                          <td style={{ padding: "6px 10px", textAlign: "right" }}>$ {fmt(f.multa)}</td>
                          <td style={{ padding: "6px 10px", textAlign: "right", fontWeight: 700, color: "#8b1a2e" }}>$ {fmt(f.total)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr style={{ background: "#f0f0f0", fontWeight: 700 }}>
                        <td colSpan={6} style={{ padding: "8px 10px", textAlign: "right", color: "#555" }}>TOTAL DEUDA MOROSA</td>
                        <td style={{ padding: "8px 10px", textAlign: "right", color: "#8b1a2e", fontSize: 14 }}>$ {fmt(totalDeuda)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            )}
            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              <BtnSecondary onClick={() => setStep(1)}>← Volver</BtnSecondary>
              <button onClick={() => setStep(3)} disabled={folios.length === 0}
                style={{ flex: 1, background: folios.length === 0 ? "#eee" : "linear-gradient(135deg, #8b1a2e, #b52240)", border: "none", color: folios.length === 0 ? "#999" : "#fff", borderRadius: 4, padding: "11px 20px", fontFamily: "inherit", fontSize: 12, fontWeight: 700, letterSpacing: 1, cursor: folios.length === 0 ? "default" : "pointer" }}>
                {folios.length === 0 ? "Sube el certificado para continuar" : "Vista Previa →"}
              </button>
            </div>
          </Box>
        )}
 
        {step === 3 && (
          <Box>
            <SectionTitle>Vista Previa — Texto de la Demanda</SectionTitle>
            <div style={{ background: "#fafaf8", border: "1px solid #ddd", borderRadius: 4, padding: "24px 28px", fontSize: 12, lineHeight: 2, marginBottom: 20, maxHeight: 500, overflowY: "auto", fontFamily: "Georgia, serif", color: "#1e1e1e" }}>
              <p style={{ textAlign: "center", fontWeight: 700, marginBottom: 4, fontSize: 13 }}>EN LO PRINCIPAL: DEMANDA DE DECLARACIÓN DE PRESCRIPCIÓN EXTINTIVA;</p>
              <p style={{ textAlign: "center", fontWeight: 700, marginBottom: 20, fontSize: 13 }}>PRIMER OTROSÍ: ACOMPAÑA DOCUMENTO; SEGUNDO OTROSÍ: PATROCINIO Y PODER.</p>
              <p style={{ textAlign: "center", fontWeight: 700, marginBottom: 20 }}>S. J. L.</p>
              <p style={{ textAlign: "justify", marginBottom: 14 }}>
                <strong>{form.empresa}</strong>, RUT n° <strong>{form.rutEmpresa}</strong>, representada legalmente por don <strong>{form.representante}</strong>, {form.cargoRepresentante}, RUT <strong>{form.rutRepresentante}</strong>, domiciliados en {form.domicilioEmpresa}, a S.S., respetuosamente digo:
              </p>
              <p style={{ textAlign: "justify", marginBottom: 14 }}>
                Que vengo en demandar al <strong>FISCO – TESORERÍA GENERAL DE LA REPÚBLICA</strong>, con el objeto que se declare la <strong>PRESCRIPCIÓN EXTINTIVA</strong> de la acción de cobro de impuestos, según Certificado de Deuda de fecha <strong>{form.fechaCertificado}</strong>.
              </p>
              <p style={{ textAlign: "justify", marginBottom: 14 }}><strong>Folios:</strong> {folios.map(f => f.folio).filter(Boolean).join(", ")}</p>
              <p style={{ textAlign: "justify", marginBottom: 14 }}>Total deuda: <strong style={{ color: "#8b1a2e" }}>$ {fmt(totalDeuda)}</strong></p>
              <p style={{ color: "#999", fontStyle: "italic", marginBottom: 14 }}>[... texto legal completo según plantilla Art. 201 C.T. ...]</p>
              <p style={{ textAlign: "justify" }}>Abogado patrocinante: <strong>{form.abogado}</strong>, RUT {form.rutAbogado} — {form.domicilioAbogado} — {form.emailAbogado}</p>
            </div>
            {error && <div style={{ background: "#fef2f2", border: "1px solid #c0392b", borderRadius: 4, padding: "10px 16px", color: "#c0392b", fontSize: 12, marginBottom: 14 }}>⚠ {error}</div>}
            <div style={{ display: "flex", gap: 10 }}>
              <BtnSecondary onClick={() => setStep(2)}>← Editar</BtnSecondary>
              <button onClick={handleGenerar} disabled={loading}
                style={{ flex: 1, background: loading ? "#eee" : "linear-gradient(135deg, #8b1a2e, #b52240)", border: "none", color: loading ? "#999" : "#fff", borderRadius: 4, padding: "13px 24px", fontFamily: "inherit", fontSize: 13, fontWeight: 700, letterSpacing: 2, cursor: loading ? "wait" : "pointer" }}>
                {loading ? "⏳ GENERANDO..." : "⬇ GENERAR Y DESCARGAR DEMANDA .DOCX"}
              </button>
            </div>
          </Box>
        )}
      </div>
    </div>
  );
}
 
const BtnPrimary = ({ onClick, children }) => (
  <button onClick={onClick} style={{ flex: 1, background: "linear-gradient(135deg, #8b1a2e, #b52240)", border: "none", color: "#fff", borderRadius: 4, padding: "11px 20px", fontFamily: "inherit", fontSize: 12, fontWeight: 700, letterSpacing: 1, cursor: "pointer" }}>{children}</button>
);
 
const BtnSecondary = ({ onClick, children }) => (
  <button onClick={onClick} style={{ background: "#f4f4f4", border: "1px solid #ddd", color: "#1e1e1e", borderRadius: 4, padding: "11px 20px", fontFamily: "inherit", fontSize: 12, cursor: "pointer" }}>{children}</button>
);
