"use client";
import { useState, createContext, useContext } from "react";
import ModuleHero from "./ModuleHero";
 
const C = {
  bg: "#f4f4f4", surface: "#ffffff", border: "#c8b8a2",
  accent: "#b52240", record: "#8b1a2e", text: "#1e1e1e",
  muted: "#555555", dim: "#eeeeee", red: "#c0392b",
};
 
const NavContext = createContext(null);
 
const CATEGORIAS = [
  { id: "compraventa", icon: "🏠", titulo: "Contratos de Compraventa", color: "#7c3aed",
    contratos: [
      { id: "cv-bienes-raices", nombre: "Compraventa de Bienes Raíces", desc: "Casas, departamentos, terrenos", activo: false },
      { id: "cv-vehiculos", nombre: "Compraventa de Vehículos", desc: "Autos, camionetas, motocicletas", activo: false },
      { id: "cv-bienes-muebles", nombre: "Compraventa de Bienes Muebles", desc: "Equipos, maquinaria, mobiliario", activo: false },
    ]},
  { id: "arriendo", icon: "🔑", titulo: "Contratos de Arriendo", color: "#0891b2",
    contratos: [
      { id: "arr-vivienda", nombre: "Arrendamiento de Vivienda", desc: "Arriendo residencial de casas o departamentos", activo: false },
      { id: "arr-comercial", nombre: "Arrendamiento Comercial", desc: "Locales, oficinas y espacios comerciales", activo: false },
      { id: "arr-opcion-compra", nombre: "Arriendo con Opción de Compra", desc: "Contrato mixto de arriendo y promesa de compra", activo: false },
    ]},
  { id: "civiles", icon: "📜", titulo: "Contratos Civiles Generales", color: "#059669",
    contratos: [
      { id: "prestacion-servicios", nombre: "Prestación de Servicios", desc: "Servicios profesionales o técnicos", activo: false },
      { id: "mandato", nombre: "Contrato de Mandato", desc: "Representación y gestión de intereses", activo: false },
      { id: "comodato", nombre: "Contrato de Comodato", desc: "Préstamo de uso de bienes", activo: false },
      { id: "mutuo-civil", nombre: "Contrato de Mutuo", desc: "Préstamo de dinero entre particulares", activo: false },
      { id: "transaccion", nombre: "Contrato de Transacción", desc: "Acuerdo para resolver controversias", activo: false },
      { id: "promesa", nombre: "Contrato de Promesa", desc: "Promesa de compraventa u otro contrato", activo: false },
    ]},
  { id: "laborales", icon: "👔", titulo: "Contratos Laborales", color: "#d97706",
    contratos: [
      { id: "contrato-trabajo", nombre: "Contrato de Trabajo", desc: "Vínculo laboral entre empleador y trabajador", activo: false },
      { id: "finiquito", nombre: "Finiquito Laboral", desc: "Término de la relación laboral", activo: false },
      { id: "anexo-contrato", nombre: "Anexo de Contrato", desc: "Modificación o complemento del contrato de trabajo", activo: false },
    ]},
  { id: "familia", icon: "👨‍👩‍👧", titulo: "Actos de Familia", color: "#db2777",
    contratos: [
      { id: "autorizacion-viaje", nombre: "Autorización de Viaje de Menores", desc: "Permiso notarial para viaje de menores al extranjero", activo: false },
      { id: "declaracion-jurada-familia", nombre: "Declaraciones Juradas", desc: "Declaraciones juradas en materia de familia", activo: false },
      { id: "pension-alimenticia", nombre: "Acuerdo de Pensión Alimenticia", desc: "Acuerdo extrajudicial de alimentos", activo: false },
    ]},
  { id: "societarios", icon: "🏢", titulo: "Contratos Societarios y Comerciales", color: "#0369a1",
    contratos: [
      { id: "constitucion-sociedad", nombre: "Constitución de Sociedad", desc: "Escritura de constitución de sociedad", activo: false },
      { id: "modificacion-sociedad", nombre: "Modificación de Sociedad", desc: "Cambios en estatutos o socios", activo: false },
      { id: "cesion-derechos", nombre: "Cesión de Derechos Sociales", desc: "Traspaso de participación social", activo: false },
      { id: "contrato-accionistas", nombre: "Contrato de Accionistas", desc: "Acuerdo entre socios o accionistas", activo: false },
      { id: "acta-junta", nombre: "Actas de Juntas", desc: "Actas de juntas ordinarias o extraordinarias", activo: false },
    ]},
  { id: "notariales", icon: "📋", titulo: "Otros Documentos Notariales", color: "#7c3aed",
    contratos: [
      { id: "poder-simple", nombre: "Poder Simple", desc: "Mandato sin necesidad de escritura pública", activo: false },
      { id: "poder-notarial", nombre: "Poder Notarial", desc: "Poder general o especial ante notario", activo: false },
      { id: "testamento", nombre: "Testamento", desc: "Testamento por escritura pública", activo: false },
      { id: "protocolizacion", nombre: "Protocolización de Documentos", desc: "Incorporación de documentos al registro notarial", activo: false },
      { id: "declaracion-jurada-notarial", nombre: "Declaraciones Juradas", desc: "Declaraciones juradas simples o notariales", activo: false },
    ]},
  { id: "mandatos", icon: "✍️", titulo: "Mandatos", color: "#b45309",
    contratos: [
      { id: "mandato-judicial-juridica", nombre: "Mandato Judicial — Persona Jurídica", desc: "Poder para representar judicialmente a una empresa o sociedad", activo: true },
      { id: "mandato-judicial-natural", nombre: "Mandato Judicial — Persona Natural", desc: "Poder para representar judicialmente a una persona natural", activo: true },
      { id: "mandato-general", nombre: "Mandato General", desc: "Poder amplio para gestionar intereses del mandante", activo: true },
    ]},
];
 
const MANDATOS_IDS = ["mandato-judicial-juridica", "mandato-judicial-natural", "mandato-general"];
 
function ContratoCard({ contrato, color }) {
  const [hovered, setHovered] = useState(false);
  const { navigate } = useContext(NavContext);
  return (
    <div onClick={() => { if (contrato.activo) navigate("contrato", contrato.id); }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: C.surface, border: `1px solid ${hovered && contrato.activo ? color : C.border}`, borderRadius: 10, padding: "16px 18px", cursor: contrato.activo ? "pointer" : "default", transition: "all 0.2s", opacity: contrato.activo ? 1 : 0.75, boxShadow: hovered && contrato.activo ? `0 4px 16px ${color}30` : "none", transform: hovered && contrato.activo ? "translateY(-2px)" : "none", display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", flexShrink: 0, background: contrato.activo ? color : "#d1d5db" }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.text, marginBottom: 2 }}>{contrato.nombre}</div>
        <div style={{ fontSize: 11, color: C.muted }}>{contrato.desc}</div>
      </div>
      {contrato.activo
        ? <div style={{ fontSize: 11, fontWeight: 700, color, letterSpacing: 1, whiteSpace: "nowrap" }}>Generar →</div>
        : <div style={{ background: "#f3f4f6", border: "1px solid #e5e7eb", borderRadius: 20, padding: "3px 10px", fontSize: 9, fontWeight: 700, color: "#9ca3af", letterSpacing: 1.5, whiteSpace: "nowrap" }}>🔒 PRÓXIMAMENTE</div>
      }
    </div>
  );
}
 
function CategoriaCard({ cat }) {
  const [hovered, setHovered] = useState(false);
  const { navigate } = useContext(NavContext);
  const activos = cat.contratos.filter(c => c.activo).length;
  return (
    <div onClick={() => navigate("categoria", cat)}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ background: C.surface, border: `2px solid ${hovered ? cat.color : C.border}`, borderRadius: 14, padding: "24px 20px", cursor: "pointer", transition: "all 0.25s", boxShadow: hovered ? `0 8px 28px ${cat.color}25` : "0 2px 8px rgba(0,0,0,0.06)", transform: hovered ? "translateY(-4px)" : "none" }}>
      <div style={{ fontSize: 36, marginBottom: 12 }}>{cat.icon}</div>
      <div style={{ fontSize: 14, fontWeight: 700, color: hovered ? cat.color : C.text, marginBottom: 6 }}>{cat.titulo}</div>
      <div style={{ fontSize: 11, color: C.muted, marginBottom: 14, lineHeight: 1.5 }}>
        {cat.contratos.slice(0, 2).map(c => c.nombre).join(", ")}{cat.contratos.length > 2 ? ` y ${cat.contratos.length - 2} más` : ""}
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
}
 
export default function DocumentosModule({ onBack, onMandato }) {
  const [screen, setScreen] = useState("portal");
  const [categoriaActiva, setCategoriaActiva] = useState(null);
 
  const navigate = (destino, data) => {
    console.log("NAVIGATE:", destino, data, "onMandato:", !!onMandato);
    if (destino === "categoria") { setCategoriaActiva(data); setScreen("categoria"); }
    if (destino === "contrato") {
      console.log("CONTRATO - is mandato:", MANDATOS_IDS.includes(data), "onMandato exists:", !!onMandato);
      if (MANDATOS_IDS.includes(data) && onMandato) {
        const tipo = data.replace("mandato-", "");
        console.log("CALLING onMandato with tipo:", tipo);
        onMandato(tipo);
      }
    }
    if (destino === "portal") { setCategoriaActiva(null); setScreen("portal"); }
  };
 
  const totalActivos = CATEGORIAS.reduce((s, c) => s + c.contratos.filter(x => x.activo).length, 0);
  const totalContratos = CATEGORIAS.reduce((s, c) => s + c.contratos.length, 0);
 
  if (screen === "categoria" && categoriaActiva) {
    return (
      <NavContext.Provider value={{ navigate }}>
        <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Courier New', monospace", color: C.text }}>
          <ModuleHero title="Documentos Legales" subtitle="Selecciona un documento para generar" onBack={() => navigate("portal")} />
          <div style={{ maxWidth: 860, margin: "0 auto", padding: "32px 20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, fontSize: 12, color: C.muted }}>
              <span style={{ cursor: "pointer", color: C.accent }} onClick={() => navigate("portal")}>Documentos Legales</span>
              <span>→</span>
              <span style={{ color: C.text, fontWeight: 700 }}>{categoriaActiva.titulo}</span>
            </div>
            <div style={{ background: C.surface, border: `2px solid ${categoriaActiva.color}`, borderRadius: 14, padding: "24px 28px", marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ fontSize: 40 }}>{categoriaActiva.icon}</div>
                <div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: categoriaActiva.color, marginBottom: 4 }}>{categoriaActiva.titulo}</div>
                  <div style={{ fontSize: 12, color: C.muted }}>{categoriaActiva.contratos.length} documentos · {categoriaActiva.contratos.filter(c => c.activo).length} activos</div>
                </div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {categoriaActiva.contratos.map(contrato => (
                <ContratoCard key={contrato.id} contrato={contrato} color={categoriaActiva.color} />
              ))}
            </div>
          </div>
        </div>
      </NavContext.Provider>
    );
  }
 
  return (
    <NavContext.Provider value={{ navigate }}>
      <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Courier New', monospace", color: C.text }}>
        <ModuleHero title="Documentos Legales" subtitle="Biblioteca de contratos y documentos jurídicos" onBack={onBack} />
        <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 20px" }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <div style={{ fontSize: 11, color: C.muted, letterSpacing: 4, fontWeight: 700, marginBottom: 8, textTransform: "uppercase" }}>Biblioteca de Documentos</div>
            <div style={{ fontSize: 24, fontWeight: 700, color: C.text, marginBottom: 8 }}>Contratos y Documentos Legales</div>
            <div style={{ fontSize: 12, color: C.muted, marginBottom: 16 }}>{totalContratos} documentos · {totalActivos} activos · {totalContratos - totalActivos} próximamente</div>
            <div style={{ width: 50, height: 3, background: `linear-gradient(to right, ${C.record}, ${C.accent})`, margin: "0 auto", borderRadius: 2 }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {CATEGORIAS.map(cat => <CategoriaCard key={cat.id} cat={cat} />)}
          </div>
        </div>
      </div>
    </NavContext.Provider>
  );
