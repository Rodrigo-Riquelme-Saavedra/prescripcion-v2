"use client";
import { useState, useEffect } from "react";
import ModuleHero from "./ModuleHero";
 
const C = {
  bg: "#f4f4f4", surface: "#ffffff", border: "#c8b8a2",
  accent: "#b52240", record: "#8b1a2e", text: "#1e1e1e",
  muted: "#555555", dim: "#eeeeee", red: "#c0392b", green: "#27ae60",
};
 
const REGIONES = [
  "Región de Arica y Parinacota",
  "Región de Tarapacá",
  "Región de Antofagasta",
  "Región de Atacama",
  "Región de Coquimbo",
  "Región de Valparaíso",
  "Región Metropolitana de Santiago",
  "Región del Libertador Gral. Bernardo O'Higgins",
  "Región del Maule",
  "Región de Ñuble",
  "Región del Biobío",
  "Región de La Araucanía",
  "Región de Los Ríos",
  "Región de Los Lagos",
  "Región de Aysén",
  "Región de Magallanes",
];
 
const EMPTY_NOTARIA = {
  id: null, nombre: "", notarioTitular: "", rut: "", direccion: "",
  comuna: "", region: "Región Metropolitana de Santiago",
  telefono: "", email: "", numeroRepertorio: "",
};
 
const Box = ({ children, style }) => (
  <div style={{ background: C.surface, border: "1px solid #ddd", borderLeft: "4px solid #8b1a2e", borderRadius: 4, padding: 24, marginBottom: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", ...style }}>
    {children}
  </div>
);
 
const SectionTitle = ({ children }) => (
  <div style={{ marginBottom: 16 }}>
    <div style={{ fontSize: 12, fontWeight: 700, color: "#8b1a2e", letterSpacing: 1.5, textTransform: "uppercase", fontFamily: "'Courier New', monospace" }}>{children}</div>
    <div style={{ width: 30, height: 2, background: "#8b1a2e", marginTop: 5 }} />
  </div>
);
 
const Field = ({ label, value, onChange, placeholder, full, type = "text" }) => (
  <div style={{ gridColumn: full ? "1 / -1" : "span 1" }}>
    <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, letterSpacing: 2, marginBottom: 5, textTransform: "uppercase", fontFamily: "'Courier New', monospace" }}>{label}</div>
    <input type={type} value={value || ""} onChange={e => onChange(e.target.value)} placeholder={placeholder || ""}
      style={{ width: "100%", background: "#fff", border: `1px solid ${C.border}`, borderRadius: 4, padding: "9px 12px", color: C.text, fontFamily: "'Courier New', monospace", fontSize: 13, boxSizing: "border-box" }} />
  </div>
);
 
const BtnPrimary = ({ onClick, children }) => (
  <button onClick={onClick} style={{ background: "linear-gradient(135deg, #8b1a2e, #b52240)", border: "none", color: "#fff", borderRadius: 4, padding: "10px 20px", fontFamily: "inherit", fontSize: 12, fontWeight: 700, letterSpacing: 1, cursor: "pointer" }}>{children}</button>
);
 
const BtnSecondary = ({ onClick, children }) => (
  <button onClick={onClick} style={{ background: "#f4f4f4", border: "1px solid #ddd", color: "#555", borderRadius: 4, padding: "10px 16px", fontFamily: "inherit", fontSize: 12, cursor: "pointer" }}>{children}</button>
);
 
function NotariaForm({ notaria, onSave, onCancel }) {
  const [form, setForm] = useState(notaria);
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
 
  return (
    <Box>
      <SectionTitle>{form.id ? "Editar Notaría" : "Nueva Notaría"}</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
        <Field label="Nombre de la Notaría" value={form.nombre} onChange={v => set("nombre", v)} placeholder="Vigésima Séptima Notaría de Santiago" full />
        <Field label="Notario Titular" value={form.notarioTitular} onChange={v => set("notarioTitular", v)} placeholder="María Patricia González" full />
        <Field label="RUT Notaría" value={form.rut} onChange={v => set("rut", v)} placeholder="70.XXX.XXX-X" />
        <Field label="Teléfono" value={form.telefono} onChange={v => set("telefono", v)} placeholder="+56 2 2XXX XXXX" />
        <Field label="Email" value={form.email} onChange={v => set("email", v)} placeholder="contacto@notaria.cl" type="email" />
        <Field label="N° Repertorio actual" value={form.numeroRepertorio} onChange={v => set("numeroRepertorio", v)} placeholder="16.196" />
        <div style={{ gridColumn: "1 / -1" }}>
          <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, letterSpacing: 2, marginBottom: 5, textTransform: "uppercase", fontFamily: "'Courier New', monospace" }}>Región</div>
          <select value={form.region} onChange={e => set("region", e.target.value)}
            style={{ width: "100%", background: "#fff", border: `1px solid ${C.border}`, borderRadius: 4, padding: "9px 12px", color: C.text, fontFamily: "'Courier New', monospace", fontSize: 13 }}>
            {REGIONES.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>
        <Field label="Comuna" value={form.comuna} onChange={v => set("comuna", v)} placeholder="Santiago" />
        <Field label="Dirección" value={form.direccion} onChange={v => set("direccion", v)} placeholder="Teatinos 28, piso 2" />
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <BtnSecondary onClick={onCancel}>Cancelar</BtnSecondary>
        <BtnPrimary onClick={() => onSave(form)}>
          {form.id ? "💾 Guardar cambios" : "➕ Agregar notaría"}
        </BtnPrimary>
      </div>
    </Box>
  );
}
 
function NotariaCard({ notaria, onEdit, onDelete }) {
  const [hovered, setHovered] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
 
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => { setHovered(false); setConfirmDelete(false); }}
      style={{ background: "#fff", border: `1px solid ${hovered ? "#8b1a2e" : "#ddd"}`, borderLeft: "4px solid #8b1a2e", borderRadius: 4, padding: "18px 20px", transition: "all 0.2s", boxShadow: hovered ? "0 4px 16px rgba(0,0,0,0.1)" : "0 1px 4px rgba(0,0,0,0.04)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#1e1e1e", fontFamily: "Georgia, serif", marginBottom: 2 }}>{notaria.nombre}</div>
          <div style={{ fontSize: 11, color: "#8b1a2e", fontWeight: 700, letterSpacing: 1 }}>{notaria.region}</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => onEdit(notaria)} style={{ background: "rgba(139,26,46,0.08)", border: "1px solid #8b1a2e", borderRadius: 4, padding: "4px 12px", fontSize: 11, color: "#8b1a2e", cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>✏️ Editar</button>
          {!confirmDelete
            ? <button onClick={() => setConfirmDelete(true)} style={{ background: "#fef2f2", border: "1px solid #c0392b", borderRadius: 4, padding: "4px 12px", fontSize: 11, color: "#c0392b", cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>🗑️</button>
            : <button onClick={() => onDelete(notaria.id)} style={{ background: "#c0392b", border: "none", borderRadius: 4, padding: "4px 12px", fontSize: 11, color: "#fff", cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>¿Confirmar?</button>
          }
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, fontSize: 11, color: "#555", fontFamily: "'Courier New', monospace" }}>
        {notaria.notarioTitular && <div><span style={{ color: "#888" }}>Titular:</span> {notaria.notarioTitular}</div>}
        {notaria.comuna && <div><span style={{ color: "#888" }}>Comuna:</span> {notaria.comuna}</div>}
        {notaria.rut && <div><span style={{ color: "#888" }}>RUT:</span> {notaria.rut}</div>}
        {notaria.telefono && <div><span style={{ color: "#888" }}>Tel:</span> {notaria.telefono}</div>}
        {notaria.email && <div style={{ gridColumn: "1 / -1" }}><span style={{ color: "#888" }}>Email:</span> {notaria.email}</div>}
        {notaria.direccion && <div style={{ gridColumn: "1 / -1" }}><span style={{ color: "#888" }}>Dirección:</span> {notaria.direccion}</div>}
      </div>
    </div>
  );
}
 
export default function ConfiguracionModule({ onBack }) {
  const [notarias, setNotarias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editando, setEditando] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [regionFiltro, setRegionFiltro] = useState("Todas");
  const [saved, setSaved] = useState(false);
 
  useEffect(() => {
    cargarNotarias();
  }, []);
 
  const cargarNotarias = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/notarias");
      if (res.ok) {
        const data = await res.json();
        setNotarias(data.notarias || []);
      }
    } catch { setNotarias([]); }
    finally { setLoading(false); }
  };
 
  const handleSave = async (form) => {
    try {
      const res = await fetch("/api/notarias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        await cargarNotarias();
        setShowForm(false);
        setEditando(null);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch {}
  };
 
  const handleDelete = async (id) => {
    try {
      await fetch("/api/notarias", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      await cargarNotarias();
    } catch {}
  };
 
  const handleEdit = (notaria) => {
    setEditando(notaria);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
 
  const notariasFiltradas = notarias.filter(n => {
    const matchBusqueda = busqueda === "" ||
      n.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      n.notarioTitular?.toLowerCase().includes(busqueda.toLowerCase()) ||
      n.comuna?.toLowerCase().includes(busqueda.toLowerCase());
    const matchRegion = regionFiltro === "Todas" || n.region === regionFiltro;
    return matchBusqueda && matchRegion;
  });
 
  const regionesConNotarias = ["Todas", ...new Set(notarias.map(n => n.region).filter(Boolean))].sort();
 
  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Courier New', monospace", color: C.text }}>
      <ModuleHero title="Configuración del Sistema" subtitle="Gestión de notarías y parámetros del portal" onBack={onBack} />
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 20px" }}>
 
        {saved && (
          <div style={{ background: "#f0fdf4", border: "1px solid #27ae60", borderRadius: 4, padding: "12px 16px", marginBottom: 16, color: "#27ae60", fontSize: 13, fontWeight: 700 }}>
            ✅ Notaría guardada correctamente
          </div>
        )}
 
        {/* Form */}
        {showForm && (
          <NotariaForm
            notaria={editando || EMPTY_NOTARIA}
            onSave={handleSave}
            onCancel={() => { setShowForm(false); setEditando(null); }}
          />
        )}
 
        {/* Header actions */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 18, fontWeight: 700, color: C.text, fontFamily: "Georgia, serif" }}>Notarías</div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{notarias.length} notarías registradas</div>
          </div>
          {!showForm && (
            <BtnPrimary onClick={() => { setEditando(null); setShowForm(true); }}>
              ➕ Nueva Notaría
            </BtnPrimary>
          )}
        </div>
 
        {/* Filters */}
        <Box style={{ padding: "14px 20px", marginBottom: 16 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, letterSpacing: 2, marginBottom: 5, textTransform: "uppercase" }}>Buscar</div>
              <input value={busqueda} onChange={e => setBusqueda(e.target.value)} placeholder="Nombre, notario o comuna..."
                style={{ width: "100%", background: "#fff", border: `1px solid ${C.border}`, borderRadius: 4, padding: "8px 12px", color: C.text, fontFamily: "inherit", fontSize: 13, boxSizing: "border-box" }} />
            </div>
            <div>
              <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, letterSpacing: 2, marginBottom: 5, textTransform: "uppercase" }}>Región</div>
              <select value={regionFiltro} onChange={e => setRegionFiltro(e.target.value)}
                style={{ width: "100%", background: "#fff", border: `1px solid ${C.border}`, borderRadius: 4, padding: "8px 12px", color: C.text, fontFamily: "inherit", fontSize: 13 }}>
                {regionesConNotarias.map(r => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
          </div>
        </Box>
 
        {/* Notarias list */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "48px 0", color: C.muted }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>⏳</div>
            <div style={{ fontSize: 13 }}>Cargando notarías...</div>
          </div>
        ) : notariasFiltradas.length === 0 ? (
          <div style={{ textAlign: "center", padding: "48px 0", color: C.muted }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📋</div>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>{busqueda || regionFiltro !== "Todas" ? "Sin resultados" : "Sin notarías registradas"}</div>
            <div style={{ fontSize: 12 }}>{busqueda || regionFiltro !== "Todas" ? "Intenta con otros filtros" : 'Haz clic en "Nueva Notaría" para agregar la primera'}</div>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {notariasFiltradas.map(n => (
              <NotariaCard key={n.id} notaria={n} onEdit={handleEdit} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
