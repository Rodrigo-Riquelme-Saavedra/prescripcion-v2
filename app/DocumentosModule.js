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
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: C.surface,
        border: `1px solid ${hovered && contrato.activo ? color : C.border}`,
        borderRadius: 10,
        padding: "16px 18px",
        cursor: contrato.activo ? "pointer" : "default",
        transition: "all 0.2s",
        opacity: contrato.activo ? 1 : 0.75,
        boxShadow: hovered && contrato.activo ? `0 4px 16px ${color}30` : "none",
        transform: hovered && contrato.activo ? "translateY(-2px)" : "none",
        position: "relative",
        display: "flex",
        alignItems: "center",
        gap: 14,
      }}
    >
      {/* Status indicator */}
      <div style={{
        width: 8, height: 8, borderRadius: "50%", flexShrink: 0,
        background: contrato.activo ? color : "#d1d5db",
        boxShadow: contrato.activo ? `0 0 6px ${color}` : "none",
      }} />
 
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 2 }}>{contrato.nombre}</div>
        <div style={{ fontSize: 11, color: C.muted }}>{contrato.desc}</div>
      </div>
 
      {contrato.activo ? (
        <div style={{ fontSize: 11, fontWeight: 700, color, letterSpacing: 1, whiteSpace: "nowrap" }}>
          Generar →
        </div>
      ) : (
        <div style={{ background: "#f3f4f6", border: "1px solid #e5e7eb", borderRadius: 20, padding: "3px 10px", fontSize: 9, fontWeight: 700, color: "#9ca3af", letterSpacing: 1.5, whiteSpace: "nowrap" }}>
          🔒 PRÓXIMAMENTE
        </div>
      )}
    </div>
  );
}
 
export default function DocumentosModule({ onBack }) {
  const totalActivos = CATEGORIAS.reduce((s, c) => s + c.contratos.filter(x => x.activo).length, 0);
  const totalContratos = CATEGORIAS.reduce((s, c) => s + c.contratos.length, 0);
 
  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Courier New', monospace", color: C.text }}>
      <Header onBack={onBack} />
 
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 20px" }}>
 
        {/* Welcome */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 11, color: C.muted, letterSpacing: 4, fontWeight: 700, marginBottom: 8, textTransform: "uppercase" }}>
            Biblioteca de Documentos
          </div>
          <div style={{ fontSize: 24, fontWeight: 700, color: C.text, marginBottom: 8 }}>
            Contratos y Documentos Legales
          </div>
          <div style={{ fontSize: 12, color: C.muted, marginBottom: 16 }}>
            {totalContratos} documentos disponibles · {totalActivos} activos · {totalContratos - totalActivos} próximamente
          </div>
          <div style={{ width: 50, height: 3, background: `linear-gradient(to right, ${C.record}, ${C.accent})`, margin: "0 auto", borderRadius: 2 }} />
        </div>
 
        {/* Stats bar */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 32 }}>
          {CATEGORIAS.map(cat => (
            <div key={cat.id} style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 10, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ fontSize: 22 }}>{cat.icon}</div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: cat.color }}>{cat.contratos.length} contratos</div>
                <div style={{ fontSize: 10, color: C.muted, marginTop: 1 }}>{cat.titulo.replace("Contratos de ", "").replace("Contratos ", "")}</div>
              </div>
            </div>
          ))}
        </div>
 
        {/* Categories */}
        {CATEGORIAS.map(cat => (
          <div key={cat.id} style={{ marginBottom: 28 }}>
            {/* Category header */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <div style={{ width: 4, height: 28, background: cat.color, borderRadius: 2 }} />
              <div style={{ fontSize: 22 }}>{cat.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: cat.color, letterSpacing: 0.5 }}>{cat.titulo}</div>
              <div style={{ marginLeft: "auto", fontSize: 10, color: C.muted }}>
                {cat.contratos.filter(c => c.activo).length}/{cat.contratos.length} activos
              </div>
            </div>
 
            {/* Contracts grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {cat.contratos.map(contrato => (
                <ContratoCard key={contrato.id} contrato={contrato} color={cat.color} />
              ))}
            </div>
          </div>
        ))}
 
        {/* Footer note */}
        <div style={{ background: C.surface, border: `1px dashed ${C.border}`, borderRadius: 10, padding: "16px 20px", textAlign: "center", marginTop: 8 }}>
          <div style={{ fontSize: 12, color: C.muted }}>
            ¿Necesitas un documento que no está aquí? Contáctanos y lo agregamos.
          </div>
        </div>
      </div>
    </div>
  );
}
