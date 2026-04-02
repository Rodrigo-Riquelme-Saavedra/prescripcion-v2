"use client";
import { useState } from "react";
 
const C = {
  bg: "#f0f0f5", surface: "#ffffff", border: "#c084fc",
  accent: "#a855f7", record: "#bf00ff", text: "#1e1b2e",
  muted: "#6b21a8", dim: "#e9e4f5", red: "#ef4444",
};
 
const CATEGORIAS = [
  {
    id: "compraventa",
    icon: "🏠",
    titulo: "Contratos de Compraventa",
    color: "#7c3aed",
    contratos: [
      { id: "cv-bienes-raices", nombre: "Compraventa de Bienes Raíces", desc: "Casas, departamentos, terrenos", activo: false },
      { id: "cv-vehiculos", nombre: "Compraventa de Vehículos", desc: "Autos, camionetas, motocicletas", activo: false },
      { id: "cv-bienes-muebles", nombre: "Compraventa de Bienes Muebles", desc: "Equipos, maquinaria, mobiliario", activo: false },
    ],
  },
  {
    id: "arriendo",
    icon: "🔑",
    titulo: "Contratos de Arriendo",
    color: "#0891b2",
    contratos: [
      { id: "arr-vivienda", nombre: "Arrendamiento de Vivienda", desc: "Arriendo residencial de casas o departamentos", activo: false },
      { id: "arr-comercial", nombre: "Arrendamiento Comercial", desc: "Locales, oficinas y espacios comerciales", activo: false },
      { id: "arr-opcion-compra", nombre: "Arriendo con Opción de Compra", desc: "Contrato mixto de arriendo y promesa de compra", activo: false },
    ],
  },
  {
    id: "civiles",
    icon: "📜",
    titulo: "Contratos Civiles Generales",
    color: "#059669",
    contratos: [
      { id: "prestacion-servicios", nombre: "Prestación de Servicios", desc: "Servicios profesionales o técnicos", activo: false },
      { id: "mandato", nombre: "Contrato de Mandato", desc: "Representación y gestión de intereses", activo: false },
      { id: "comodato", nombre: "Contrato de Comodato", desc: "Préstamo de uso de bienes", activo: false },
      { id: "mutuo-civil", nombre: "Contrato de Mutuo", desc: "Préstamo de dinero entre particulares", activo: false },
      { id: "transaccion", nombre: "Contrato de Transacción", desc: "Acuerdo para resolver controversias", activo: false },
      { id: "promesa", nombre: "Contrato de Promesa", desc: "Promesa de compraventa u otro contrato", activo: false },
    ],
  },
  {
    id: "laborales",
    icon: "👔",
    titulo: "Contratos Laborales",
    color: "#d97706",
    contratos: [
      { id: "contrato-trabajo", nombre: "Contrato de Trabajo", desc: "Vínculo laboral entre empleador y trabajador", activo: false },
      { id: "finiquito", nombre: "Finiquito Laboral", desc: "Término de la relación laboral", activo: false },
      { id: "anexo-contrato", nombre: "Anexo de Contrato", desc: "Modificación o complemento del contrato de trabajo", activo: false },
    ],
  },
  {
    id: "familia",
    icon: "👨‍👩‍👧",
    titulo: "Actos de Familia",
    color: "#db2777",
    contratos: [
      { id: "autorizacion-viaje", nombre: "Autorización de Viaje de Menores", desc: "Permiso notarial para viaje de menores al extranjero", activo: false },
      { id: "declaracion-jurada-familia", nombre: "Declaraciones Juradas", desc: "Declaraciones juradas en materia de familia", activo: false },
      { id: "pension-alimenticia", nombre: "Acuerdo de Pensión Alimenticia", desc: "Acuerdo extrajudicial de alimentos", activo: false },
    ],
  },
  {
    id: "societarios",
    icon: "🏢",
    titulo: "Contratos Societarios y Comerciales",
    color: "#0369a1",
    contratos: [
      { id: "constitucion-sociedad", nombre: "Constitución de Sociedad", desc: "Escritura de constitución de sociedad", activo: false },
      { id: "modificacion-sociedad", nombre: "Modificación de Sociedad", desc: "Cambios en estatutos o socios", activo: false },
      { id: "cesion-derechos", nombre: "Cesión de Derechos Sociales", desc: "Traspaso de participación social", activo: false },
      { id: "contrato-accionistas", nombre: "Contrato de Accionistas", desc: "Acuerdo entre socios o accionistas", activo: false },
      { id: "acta-junta", nombre: "Actas de Juntas", desc: "Actas de juntas ordinarias o extraordinarias", activo: false },
    ],
  },
  {
    id: "notariales",
    icon: "📋",
    titulo: "Otros Documentos Notariales",
    color: "#7c3aed",
    contratos: [
      { id: "poder-simple", nombre: "Poder Simple", desc: "Mandato sin necesidad de escritura pública", activo: false },
      { id: "poder-notarial", nombre: "Poder Notarial", desc: "Poder general o especial ante notario", activo: false },
      { id: "testamento", nombre: "Testamento", desc: "Testamento por escritura pública", activo: false },
      { id: "protocolizacion", nombre: "Protocolización de Documentos", desc: "Incorporación de documentos al registro notarial", activo: false },
      { id: "declaracion-jurada-notarial", nombre: "Declaraciones Juradas", desc: "Declaraciones juradas simples o notariales", activo: false },
    ],
  },
];
 
function Header({ onBack }) {
  return (
    <div style={{ background: "linear-gradient(135deg, #0a0a2e 0%, #1a0a3e 50%, #0a1a3e 100%)", borderBottom: `3px solid ${C.record}`, padding: "0 32px", height: 72, display: "flex", alignItems: "center", gap: 18 }}>
      <img src="https://raw.githubusercontent.com/Rodrigo-Riquelme-Saavedra/prescripcion-v2/main/public/PaginaWeb.png" alt="Grupo GV" style={{ height: 54, objectFit: "contain", filter: "drop-shadow(0 0 12px rgba(100,180,255,0.6))" }} onError={(e) => { e.target.style.display = "none"; }} />
      <div style={{ width: 1, height: 36, background: `linear-gradient(to bottom, transparent, ${C.record}, transparent)` }} />
      <div>
        <div style={{ fontWeight: 700, fontSize: 13, letterSpacing: 2, color: "#fff" }}>DOCUMENTOS LEGALES</div>
        <div style={{ fontSize: 10, color: C.accent, letterSpacing: 1.5, marginTop: 2 }}>Grupo GV · Generador de Contratos</div>
      </div>
      <button onClick={onBack} style={{ marginLeft: "auto", background: "rgba(191,0,255,0.15)", border: `1px solid ${C.record}`, borderRadius: 20, padding: "6px 16px", fontSize: 11, color: C.accent, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
        ← Volver al Portal
      </button>
    </div>
  );
}
 
function ContratoCard({ contrato, color }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: C.surface, border: `1px solid ${hovered && contrato.activo ? color : C.border}`, borderRadius: 10, padding: "16px 18px", cursor: contrato.activo ? "pointer" : "default", transition: "all 0.2s", opacity: contrato.activo ? 1 : 0.75, boxShadow: hovered && contrato.activo ? `0 4px 16px ${color}30` : "none", transform: hovered && contrato.activo ? "translateY(-2px)" : "none", display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", flexShrink: 0, background: contrato.activo ? color : "#d1d5db", boxShadow: contrato.activo ? `0 0 6px ${color}` : "none" }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 2 }}>{contrato.nombre}</div>
        <div style={{ fontSize: 11, color: C.muted }}>{contrato.desc}</div>
      </div>
      {contrato.activo ? (
        <div style={{ fontSize: 11, fontWeight: 700, color, letterSpacing: 1, whiteSpace: "nowrap" }}>Generar →</div>
      ) : (
        <div style={{ background: "#f3f4f6", border: "1px solid #e5e7eb", borderRadius: 20, padding: "3px 10px", fontSize: 9, fontWeight: 700, color: "#9ca3af", letterSpacing: 1.5, whiteSpace: "nowrap" }}>🔒 PRÓXIMAMENTE</div>
      )}
    </div>
  );
}
 
// ── VISTA DE CATEGORÍA ESPECÍFICA ─────────────────────────────────────────────
function CategoriaView({ categoria, onBack }) {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Courier New', monospace", color: C.text }}>
      <Header onBack={onBack} />
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "32px 20px" }}>
 
        {/* Breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, fontSize: 12, color: C.muted }}>
          <span style={{ cursor: "pointer", color: C.accent }} onClick={onBack}>Documentos Legales</span>
          <span>→</span>
          <span style={{ color: C.text, fontWeight: 700 }}>{categoria.titulo}</span>
        </div>
 
        {/* Category header */}
        <div style={{ background: C.surface, border: `2px solid ${categoria.color}`, borderRadius: 14, padding: "24px 28px", marginBottom: 24, boxShadow: `0 4px 20px ${categoria.color}20` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ fontSize: 40 }}>{categoria.icon}</div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, color: categoria.color, marginBottom: 4 }}>{categoria.titulo}</div>
              <div style={{ fontSize: 12, color: C.muted }}>
                {categoria.contratos.length} documentos · {categoria.contratos.filter(c => c.activo).length} activos · {categoria.contratos.filter(c => !c.activo).length} próximamente
              </div>
            </div>
          </div>
        </div>
 
        {/* Contracts */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {categoria.contratos.map(contrato => (
            <ContratoCard key={contrato.id} contrato={contrato} color={categoria.color} />
          ))}
        </div>
 
        {/* Footer */}
        <div style={{ background: C.surface, border: `1px dashed ${C.border}`, borderRadius: 10, padding: "14px 20px", textAlign: "center", marginTop: 20 }}>
          <div style={{ fontSize: 12, color: C.muted }}>¿Necesitas un documento que no está aquí? Contáctanos y lo agregamos.</div>
        </div>
      </div>
    </div>
  );
}
 
// ── PORTAL DE CATEGORÍAS ──────────────────────────────────────────────────────
function PortalDocumentos({ onBack }) {
  const [categoriaActiva, setCategoriaActiva] = useState(null);
  const totalActivos = CATEGORIAS.reduce((s, c) => s + c.contratos.filter(x => x.activo).length, 0);
  const totalContratos = CATEGORIAS.reduce((s, c) => s + c.contratos.length, 0);
 
  if (categoriaActiva) {
    return <CategoriaView categoria={categoriaActiva} onBack={() => setCategoriaActiva(null)} />;
  }
 
  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Courier New', monospace", color: C.text }}>
      <Header onBack={onBack} />
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 20px" }}>
 
        {/* Welcome */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 11, color: C.muted, letterSpacing: 4, fontWeight: 700, marginBottom: 8, textTransform: "uppercase" }}>Biblioteca de Documentos</div>
          <div style={{ fontSize: 24, fontWeight: 700, color: C.text, marginBottom: 8 }}>Contratos y Documentos Legales</div>
          <div style={{ fontSize: 12, color: C.muted, marginBottom: 16 }}>{totalContratos} documentos · {totalActivos} activos · {totalContratos - totalActivos} próximamente</div>
          <div style={{ width: 50, height: 3, background: `linear-gradient(to right, ${C.record}, ${C.accent})`, margin: "0 auto", borderRadius: 2 }} />
        </div>
 
        {/* Category cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {CATEGORIAS.map(cat => {
            const activos = cat.contratos.filter(c => c.activo).length;
            const [hovered, setHovered] = useState(false);
            return (
              <div key={cat.id}
                onClick={() => setCategoriaActiva(cat)}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{ background: C.surface, border: `2px solid ${hovered ? cat.color : C.border}`, borderRadius: 14, padding: "24px 20px", cursor: "pointer", transition: "all 0.25s", boxShadow: hovered ? `0 8px 28px ${cat.color}25` : "0 2px 8px rgba(0,0,0,0.06)", transform: hovered ? "translateY(-4px)" : "none" }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{cat.icon}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: hovered ? cat.color : C.text, marginBottom: 6, transition: "color 0.2s" }}>{cat.titulo}</div>
                <div style={{ fontSize: 11, color: C.muted, marginBottom: 14, lineHeight: 1.5 }}>
                  {cat.contratos.map(c => c.nombre).slice(0, 2).join(", ")} {cat.contratos.length > 2 ? `y ${cat.contratos.length - 2} más` : ""}
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: 10, color: C.muted }}>{cat.contratos.length} documentos</div>
                  {activos > 0
                    ? <div style={{ background: `${cat.color}15`, border: `1px solid ${cat.color}`, borderRadius: 20, padding: "2px 10px", fontSize: 9, fontWeight: 700, color: cat.color }}>{activos} ACTIVO{activos > 1 ? "S" : ""}</div>
                    : <div style={{ background: "#f3f4f6", border: "1px solid #e5e7eb", borderRadius: 20, padding: "2px 10px", fontSize: 9, fontWeight: 700, color: "#9ca3af" }}>🔒 PRÓX.</div>
                  }
                </div>
                <div style={{ marginTop: 14, fontSize: 11, fontWeight: 700, color: cat.color, letterSpacing: 1 }}>Ver documentos →</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
 
export default function DocumentosModule({ onBack }) {
  return <PortalDocumentos onBack={onBack} />;
}
