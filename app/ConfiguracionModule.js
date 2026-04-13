"use client";
import { useState, useEffect } from "react";
import ModuleHero from "./ModuleHero";
 
const C = {
  bg: "#f4f4f4", surface: "#ffffff", border: "#c8b8a2",
  accent: "#b52240", record: "#8b1a2e", text: "#1e1e1e",
  muted: "#555555", dim: "#eeeeee", red: "#c0392b", green: "#27ae60",
};
 
const REGIONES = [
  "Región de Arica y Parinacota","Región de Tarapacá","Región de Antofagasta",
  "Región de Atacama","Región de Coquimbo","Región de Valparaíso",
  "Región Metropolitana de Santiago","Región del Libertador Gral. Bernardo O'Higgins",
  "Región del Maule","Región de Ñuble","Región del Biobío","Región de La Araucanía",
  "Región de Los Ríos","Región de Los Lagos","Región de Aysén","Región de Magallanes",
];
 
const ESPECIALIDADES = [
  "Derecho Tributario","Derecho Civil","Derecho Laboral","Derecho Penal",
  "Derecho Comercial","Derecho de Familia","Derecho Inmobiliario",
  "Derecho Administrativo","Derecho Corporativo","Derecho Notarial","General",
];
 
const EMPTY_NOTARIA = { id: null, nombre: "", notarioTitular: "", rut: "", direccion: "", comuna: "", region: "Región Metropolitana de Santiago", telefono: "", email: "", numeroRepertorio: "" };
const EMPTY_ABOGADO = { id: null, tipo: "abogado", nombre: "", rut: "", domicilio: "", telefono: "", email: "", especialidad: "Derecho Civil", numeroColegiado: "" };
 
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
 
// ── NOTARÍAS ──────────────────────────────────────────────────────────────────
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
        <BtnPrimary onClick={() => onSave(form)}>{form.id ? "💾 Guardar cambios" : "➕ Agregar notaría"}</BtnPrimary>
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
          <div style={{ fontSize: 11, color: "#8b1a2e", fontWeight: 700, letterSpacing: 1 }}>{notaria.region} · {notaria.comuna}</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => onEdit(notaria)} style={{ background: "rgba(139,26,46,0.08)", border: "1px solid #8b1a2e", borderRadius: 4, padding: "4px 12px", fontSize: 11, color: "#8b1a2e", cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>✏️ Editar</button>
          {!confirmDelete
            ? <button onClick={() => setConfirmDelete(true)} style={{ background: "#fef2f2", border: "1px solid #c0392b", borderRadius: 4, padding: "4px 12px", fontSize: 11, color: "#c0392b", cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>🗑️</button>
            : <button onClick={() => onDelete(notaria.id)} style={{ background: "#c0392b", border: "none", borderRadius: 4, padding: "4px 12px", fontSize: 11, color: "#fff", cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>¿Confirmar?</button>}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, fontSize: 11, color: "#555", fontFamily: "'Courier New', monospace" }}>
        {notaria.notarioTitular && <div><span style={{ color: "#888" }}>Titular:</span> {notaria.notarioTitular}</div>}
        {notaria.rut && <div><span style={{ color: "#888" }}>RUT:</span> {notaria.rut}</div>}
        {notaria.telefono && <div><span style={{ color: "#888" }}>Tel:</span> {notaria.telefono}</div>}
        {notaria.email && <div><span style={{ color: "#888" }}>Email:</span> {notaria.email}</div>}
        {notaria.direccion && <div style={{ gridColumn: "1 / -1" }}><span style={{ color: "#888" }}>Dirección:</span> {notaria.direccion}</div>}
        {notaria.numeroRepertorio && <div><span style={{ color: "#888" }}>Repertorio:</span> {notaria.numeroRepertorio}</div>}
      </div>
    </div>
  );
}
 
function NotariasSection() {
  const [notarias, setNotarias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editando, setEditando] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [regionFiltro, setRegionFiltro] = useState("Todas");
  const [saved, setSaved] = useState(false);
 
  useEffect(() => { cargar(); }, []);
 
  const cargar = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/notarias");
      if (res.ok) { const data = await res.json(); setNotarias(data.notarias || []); }
    } catch { setNotarias([]); } finally { setLoading(false); }
  };
 
  const handleSave = async (form) => {
    try {
      const res = await fetch("/api/notarias", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (res.ok) { await cargar(); setShowForm(false); setEditando(null); setSaved(true); setTimeout(() => setSaved(false), 3000); }
    } catch {}
  };
 
  const handleDelete = async (id) => {
    try { await fetch("/api/notarias", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) }); await cargar(); } catch {}
  };
 
  const filtradas = notarias.filter(n => {
    const mb = busqueda === "" || n.nombre?.toLowerCase().includes(busqueda.toLowerCase()) || n.notarioTitular?.toLowerCase().includes(busqueda.toLowerCase()) || n.comuna?.toLowerCase().includes(busqueda.toLowerCase());
    const mr = regionFiltro === "Todas" || n.region === regionFiltro;
    return mb && mr;
  });
 
  const regiones = ["Todas", ...new Set(notarias.map(n => n.region).filter(Boolean))].sort();
 
  return (
    <div>
      {saved && <div style={{ background: "#f0fdf4", border: "1px solid #27ae60", borderRadius: 4, padding: "12px 16px", marginBottom: 16, color: "#27ae60", fontSize: 13, fontWeight: 700 }}>✅ Notaría guardada correctamente</div>}
      {showForm && <NotariaForm notaria={editando || EMPTY_NOTARIA} onSave={handleSave} onCancel={() => { setShowForm(false); setEditando(null); }} />}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: C.muted }}>{notarias.length} notarías registradas</div>
        {!showForm && <BtnPrimary onClick={() => { setEditando(null); setShowForm(true); }}>➕ Nueva Notaría</BtnPrimary>}
      </div>
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
              {regiones.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>
        </div>
      </Box>
      {loading ? (
        <div style={{ textAlign: "center", padding: "48px 0", color: C.muted }}><div style={{ fontSize: 32, marginBottom: 12 }}>⏳</div><div>Cargando...</div></div>
      ) : filtradas.length === 0 ? (
        <div style={{ textAlign: "center", padding: "48px 0", color: C.muted }}><div style={{ fontSize: 40, marginBottom: 12 }}>📋</div><div style={{ fontSize: 14, fontWeight: 700 }}>{busqueda || regionFiltro !== "Todas" ? "Sin resultados" : "Sin notarías registradas"}</div></div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {filtradas.map(n => <NotariaCard key={n.id} notaria={n} onEdit={(n) => { setEditando(n); setShowForm(true); }} onDelete={handleDelete} />)}
        </div>
      )}
    </div>
  );
}
 
// ── ABOGADOS Y BUFETES ────────────────────────────────────────────────────────
function AbogadoForm({ abogado, onSave, onCancel }) {
  const [form, setForm] = useState(abogado);
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  return (
    <Box>
      <SectionTitle>{form.id ? "Editar Registro" : `Nuevo ${form.tipo === "bufete" ? "Bufete" : "Abogado"}`}</SectionTitle>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, letterSpacing: 2, marginBottom: 8, textTransform: "uppercase", fontFamily: "'Courier New', monospace" }}>Tipo de registro</div>
        <div style={{ display: "flex", gap: 10 }}>
          {["abogado", "bufete"].map(t => (
            <button key={t} onClick={() => set("tipo", t)}
              style={{ padding: "8px 20px", borderRadius: 4, border: `1px solid ${form.tipo === t ? "#8b1a2e" : "#ddd"}`, background: form.tipo === t ? "rgba(139,26,46,0.08)" : "#fff", color: form.tipo === t ? "#8b1a2e" : "#555", fontFamily: "inherit", fontSize: 12, fontWeight: 700, cursor: "pointer", letterSpacing: 1 }}>
              {t === "abogado" ? "👤 Abogado" : "🏢 Bufete / Estudio"}
            </button>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
        <Field label={form.tipo === "bufete" ? "Nombre del Bufete" : "Nombre completo"} value={form.nombre} onChange={v => set("nombre", v)} placeholder={form.tipo === "bufete" ? "Estudio Jurídico Pérez & Asociados" : "Juan José Contreras González"} full />
        <Field label="RUT" value={form.rut} onChange={v => set("rut", v)} placeholder={form.tipo === "bufete" ? "77.XXX.XXX-X" : "10.011.754-1"} />
        <Field label="Teléfono" value={form.telefono} onChange={v => set("telefono", v)} placeholder="+56 9 XXXX XXXX" />
        <Field label="Email" value={form.email} onChange={v => set("email", v)} placeholder="contacto@estudio.cl" type="email" />
        <Field label="Domicilio" value={form.domicilio} onChange={v => set("domicilio", v)} placeholder="Huérfanos 979 of. 606, Santiago" full />
        <div>
          <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, letterSpacing: 2, marginBottom: 5, textTransform: "uppercase", fontFamily: "'Courier New', monospace" }}>Especialidad</div>
          <select value={form.especialidad} onChange={e => set("especialidad", e.target.value)}
            style={{ width: "100%", background: "#fff", border: `1px solid ${C.border}`, borderRadius: 4, padding: "9px 12px", color: C.text, fontFamily: "'Courier New', monospace", fontSize: 13 }}>
            {ESPECIALIDADES.map(e => <option key={e} value={e}>{e}</option>)}
          </select>
        </div>
        {form.tipo === "abogado" && <Field label="N° Colegiado" value={form.numeroColegiado} onChange={v => set("numeroColegiado", v)} placeholder="Opcional" />}
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <BtnSecondary onClick={onCancel}>Cancelar</BtnSecondary>
        <BtnPrimary onClick={() => onSave(form)}>{form.id ? "💾 Guardar cambios" : "➕ Agregar registro"}</BtnPrimary>
      </div>
    </Box>
  );
}
 
function AbogadoCard({ abogado, onEdit, onDelete }) {
  const [hovered, setHovered] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const esBufete = abogado.tipo === "bufete";
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => { setHovered(false); setConfirmDelete(false); }}
      style={{ background: "#fff", border: `1px solid ${hovered ? "#8b1a2e" : "#ddd"}`, borderLeft: `4px solid ${esBufete ? "#1a4a8b" : "#8b1a2e"}`, borderRadius: 4, padding: "18px 20px", transition: "all 0.2s", boxShadow: hovered ? "0 4px 16px rgba(0,0,0,0.1)" : "0 1px 4px rgba(0,0,0,0.04)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
            <span style={{ background: esBufete ? "rgba(26,74,139,0.08)" : "rgba(139,26,46,0.08)", border: `1px solid ${esBufete ? "#1a4a8b" : "#8b1a2e"}`, borderRadius: 3, padding: "1px 8px", fontSize: 9, fontWeight: 700, color: esBufete ? "#1a4a8b" : "#8b1a2e", letterSpacing: 1 }}>
              {esBufete ? "🏢 BUFETE" : "👤 ABOGADO"}
            </span>
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#1e1e1e", fontFamily: "Georgia, serif", marginBottom: 2 }}>{abogado.nombre}</div>
          <div style={{ fontSize: 11, color: "#8b1a2e", fontWeight: 700, letterSpacing: 1 }}>{abogado.especialidad}</div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => onEdit(abogado)} style={{ background: "rgba(139,26,46,0.08)", border: "1px solid #8b1a2e", borderRadius: 4, padding: "4px 12px", fontSize: 11, color: "#8b1a2e", cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>✏️ Editar</button>
          {!confirmDelete
            ? <button onClick={() => setConfirmDelete(true)} style={{ background: "#fef2f2", border: "1px solid #c0392b", borderRadius: 4, padding: "4px 12px", fontSize: 11, color: "#c0392b", cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>🗑️</button>
            : <button onClick={() => onDelete(abogado.id)} style={{ background: "#c0392b", border: "none", borderRadius: 4, padding: "4px 12px", fontSize: 11, color: "#fff", cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>¿Confirmar?</button>}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, fontSize: 11, color: "#555", fontFamily: "'Courier New', monospace" }}>
        {abogado.rut && <div><span style={{ color: "#888" }}>RUT:</span> {abogado.rut}</div>}
        {abogado.telefono && <div><span style={{ color: "#888" }}>Tel:</span> {abogado.telefono}</div>}
        {abogado.email && <div style={{ gridColumn: "1 / -1" }}><span style={{ color: "#888" }}>Email:</span> {abogado.email}</div>}
        {abogado.domicilio && <div style={{ gridColumn: "1 / -1" }}><span style={{ color: "#888" }}>Domicilio:</span> {abogado.domicilio}</div>}
        {abogado.numeroColegiado && <div><span style={{ color: "#888" }}>Colegiado:</span> {abogado.numeroColegiado}</div>}
      </div>
    </div>
  );
}
 
function AbogadosSection() {
  const [abogados, setAbogados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editando, setEditando] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [tipoFiltro, setTipoFiltro] = useState("Todos");
  const [saved, setSaved] = useState(false);
 
  useEffect(() => { cargar(); }, []);
 
  const cargar = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/abogados");
      if (res.ok) { const data = await res.json(); setAbogados(data.abogados || []); }
    } catch { setAbogados([]); } finally { setLoading(false); }
  };
 
  const handleSave = async (form) => {
    try {
      const res = await fetch("/api/abogados", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (res.ok) { await cargar(); setShowForm(false); setEditando(null); setSaved(true); setTimeout(() => setSaved(false), 3000); }
    } catch {}
  };
 
  const handleDelete = async (id) => {
    try { await fetch("/api/abogados", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) }); await cargar(); } catch {}
  };
 
  const filtrados = abogados.filter(a => {
    const mb = busqueda === "" || a.nombre?.toLowerCase().includes(busqueda.toLowerCase()) || a.especialidad?.toLowerCase().includes(busqueda.toLowerCase());
    const mt = tipoFiltro === "Todos" || a.tipo === tipoFiltro;
    return mb && mt;
  });
 
  return (
    <div>
      {saved && <div style={{ background: "#f0fdf4", border: "1px solid #27ae60", borderRadius: 4, padding: "12px 16px", marginBottom: 16, color: "#27ae60", fontSize: 13, fontWeight: 700 }}>✅ Registro guardado correctamente</div>}
      {showForm && <AbogadoForm abogado={editando || EMPTY_ABOGADO} onSave={handleSave} onCancel={() => { setShowForm(false); setEditando(null); }} />}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: C.muted }}>{abogados.filter(a => a.tipo === "abogado").length} abogados · {abogados.filter(a => a.tipo === "bufete").length} bufetes</div>
        {!showForm && <BtnPrimary onClick={() => { setEditando(null); setShowForm(true); }}>➕ Nuevo Registro</BtnPrimary>}
      </div>
      <Box style={{ padding: "14px 20px", marginBottom: 16 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, letterSpacing: 2, marginBottom: 5, textTransform: "uppercase" }}>Buscar</div>
            <input value={busqueda} onChange={e => setBusqueda(e.target.value)} placeholder="Nombre o especialidad..."
              style={{ width: "100%", background: "#fff", border: `1px solid ${C.border}`, borderRadius: 4, padding: "8px 12px", color: C.text, fontFamily: "inherit", fontSize: 13, boxSizing: "border-box" }} />
          </div>
          <div>
            <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, letterSpacing: 2, marginBottom: 5, textTransform: "uppercase" }}>Tipo</div>
            <select value={tipoFiltro} onChange={e => setTipoFiltro(e.target.value)}
              style={{ width: "100%", background: "#fff", border: `1px solid ${C.border}`, borderRadius: 4, padding: "8px 12px", color: C.text, fontFamily: "inherit", fontSize: 13 }}>
              <option value="Todos">Todos</option>
              <option value="abogado">Abogados</option>
              <option value="bufete">Bufetes / Estudios</option>
            </select>
          </div>
        </div>
      </Box>
      {loading ? (
        <div style={{ textAlign: "center", padding: "48px 0", color: C.muted }}><div style={{ fontSize: 32, marginBottom: 12 }}>⏳</div><div>Cargando...</div></div>
      ) : filtrados.length === 0 ? (
        <div style={{ textAlign: "center", padding: "48px 0", color: C.muted }}><div style={{ fontSize: 40, marginBottom: 12 }}>👥</div><div style={{ fontSize: 14, fontWeight: 700 }}>{busqueda || tipoFiltro !== "Todos" ? "Sin resultados" : "Sin registros aún"}</div></div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          {filtrados.map(a => <AbogadoCard key={a.id} abogado={a} onEdit={(a) => { setEditando(a); setShowForm(true); }} onDelete={handleDelete} />)}
        </div>
      )}
    </div>
  );
}
 
 
// ── USUARIOS ──────────────────────────────────────────────────────────────────
const PERFILES_OPTS = [
  { v: "abogado",  l: "\u2696 Abogados" },
  { v: "cliente",  l: "\ud83d\udc64 Cliente / Usuario" },
  { v: "notaria",  l: "\ud83d\udccb Notar\u00eda" },
  { v: "estudio",  l: "\ud83c\udfdb Estudio Jur\u00eddico" },
];
 
const PERFIL_COLORS = {
  abogado: "#8b1a2e", cliente: "#1a2f5a", notaria: "#8b1a2e", estudio: "#1a2f5a",
};
 
function UsuarioForm({ usuario, onSave, onCancel }) {
  const [form, setForm] = useState(usuario);
  const [showPass, setShowPass] = useState(false);
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const isEdit = !!form.id;
  return (
    <Box>
      <SectionTitle>{isEdit ? "Editar Usuario" : "Nuevo Usuario"}</SectionTitle>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, letterSpacing: 2, marginBottom: 5, textTransform: "uppercase", fontFamily: "'Courier New', monospace" }}>Perfil</div>
          <select value={form.perfil} onChange={e => set("perfil", e.target.value)}
            style={{ width: "100%", background: "#fff", border: `1px solid ${C.border}`, borderRadius: 4, padding: "9px 12px", color: C.text, fontFamily: "'Courier New', monospace", fontSize: 13 }}>
            {PERFILES_OPTS.map(p => <option key={p.v} value={p.v}>{p.l}</option>)}
          </select>
        </div>
        <Field label="Nombre completo" value={form.nombre} onChange={v => set("nombre", v)} placeholder="Juan P\u00e9rez" />
        <Field label="Usuario (login)" value={form.usuario} onChange={v => set("usuario", v)} placeholder="juanperez" />
        <div>
          <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, letterSpacing: 2, marginBottom: 5, textTransform: "uppercase", fontFamily: "'Courier New', monospace" }}>
            {isEdit ? "Nueva contrase\u00f1a (vac\u00edo = no cambiar)" : "Contrase\u00f1a"}
          </div>
          <div style={{ position: "relative" }}>
            <input type={showPass ? "text" : "password"} value={form.password || ""} onChange={e => set("password", e.target.value)}
              placeholder={isEdit ? "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" : "m\u00ednimo 6 caracteres"}
              style={{ width: "100%", background: "#fff", border: `1px solid ${C.border}`, borderRadius: 4, padding: "9px 40px 9px 12px", color: C.text, fontFamily: "'Courier New', monospace", fontSize: 13, boxSizing: "border-box" }} />
            <button onClick={() => setShowPass(!showPass)} style={{ position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", fontSize: 14, color: C.muted }}>
              {showPass ? "\ud83d\ude48" : "\ud83d\udc41"}
            </button>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, letterSpacing: 2, marginBottom: 5, textTransform: "uppercase", fontFamily: "'Courier New', monospace" }}>Estado</div>
          <select value={form.activo ? "true" : "false"} onChange={e => set("activo", e.target.value === "true")}
            style={{ width: "100%", background: "#fff", border: `1px solid ${C.border}`, borderRadius: 4, padding: "9px 12px", color: C.text, fontFamily: "'Courier New', monospace", fontSize: 13 }}>
            <option value="true">Activo</option>
            <option value="false">Inactivo</option>
          </select>
        </div>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        <BtnSecondary onClick={onCancel}>Cancelar</BtnSecondary>
        <BtnPrimary onClick={() => onSave(form)}>{isEdit ? "Guardar cambios" : "Crear usuario"}</BtnPrimary>
      </div>
    </Box>
  );
}
 
function UsuarioCard({ usuario, onEdit, onDelete }) {
  const [hovered, setHovered] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const color = PERFIL_COLORS[usuario.perfil] || "#555";
  const perfilLabel = PERFILES_OPTS.find(p => p.v === usuario.perfil)?.l || usuario.perfil;
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => { setHovered(false); setConfirmDelete(false); }}
      style={{ background: "#fff", border: `1px solid ${hovered ? color : "#ddd"}`, borderLeft: `4px solid ${color}`, borderRadius: 4, padding: "16px 18px", transition: "all 0.2s", boxShadow: hovered ? "0 4px 16px rgba(0,0,0,0.1)" : "0 1px 4px rgba(0,0,0,0.04)", display: "flex", alignItems: "center", gap: 14 }}>
      <div style={{ width: 42, height: 42, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <span style={{ fontSize: 18, color: "#fff" }}>{PERFILES_OPTS.find(p => p.v === usuario.perfil)?.l?.split(" ")[0] || "?"}</span>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#1e1e1e", fontFamily: "Georgia, serif", marginBottom: 4 }}>{usuario.nombre || usuario.usuario}</div>
        <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ fontSize: 10, background: `${color}15`, border: `1px solid ${color}`, borderRadius: 3, padding: "1px 8px", color, fontWeight: 700, fontFamily: "'Courier New', monospace" }}>{perfilLabel}</span>
          <span style={{ fontSize: 11, color: "#666", fontFamily: "'Courier New', monospace" }}>@{usuario.usuario}</span>
          {!usuario.activo && <span style={{ fontSize: 10, background: "#fee2e2", border: "1px solid #c0392b", borderRadius: 3, padding: "1px 8px", color: "#c0392b", fontWeight: 700 }}>INACTIVO</span>}
        </div>
      </div>
      <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
        <button onClick={() => onEdit(usuario)} style={{ background: "rgba(139,26,46,0.08)", border: "1px solid #8b1a2e", borderRadius: 4, padding: "4px 12px", fontSize: 11, color: "#8b1a2e", cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>Editar</button>
        {!confirmDelete
          ? <button onClick={() => setConfirmDelete(true)} style={{ background: "#fef2f2", border: "1px solid #c0392b", borderRadius: 4, padding: "4px 12px", fontSize: 11, color: "#c0392b", cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>Eliminar</button>
          : <button onClick={() => onDelete(usuario.id)} style={{ background: "#c0392b", border: "none", borderRadius: 4, padding: "4px 12px", fontSize: 11, color: "#fff", cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>Confirmar</button>
        }
      </div>
    </div>
  );
}
 
function UsuariosSection() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editando, setEditando] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [perfilFiltro, setPerfilFiltro] = useState("Todos");
  const [saved, setSaved] = useState("");
  const [error, setError] = useState("");
  const EMPTY_USER = { id: null, perfil: "abogado", nombre: "", usuario: "", password: "", activo: true };
 
  useEffect(() => { cargar(); }, []);
 
  const cargar = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/usuarios");
      if (res.ok) { const data = await res.json(); setUsuarios(data.usuarios || []); }
    } catch {} finally { setLoading(false); }
  };
 
  const handleSave = async (form) => {
    setError("");
    if (!form.nombre || !form.usuario) { setError("Nombre y usuario son obligatorios"); return; }
    if (!form.id && !form.password) { setError("La contrase\u00f1a es obligatoria para nuevos usuarios"); return; }
    if (form.password && form.password.length > 0 && form.password !== "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" && form.password.length < 6) { setError("La contrase\u00f1a debe tener al menos 6 caracteres"); return; }
    try {
      const res = await fetch("/api/usuarios", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Error al guardar"); return; }
      await cargar(); setShowForm(false); setEditando(null);
      setSaved(form.id ? "Usuario actualizado correctamente" : "Usuario creado correctamente");
      setTimeout(() => setSaved(""), 3000);
    } catch { setError("Error de conexi\u00f3n"); }
  };
 
  const handleDelete = async (id) => {
    try {
      await fetch("/api/usuarios", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
      await cargar();
    } catch {}
  };
 
  const filtrados = usuarios.filter(u => {
    const mb = busqueda === "" || u.nombre?.toLowerCase().includes(busqueda.toLowerCase()) || u.usuario?.toLowerCase().includes(busqueda.toLowerCase());
    const mp = perfilFiltro === "Todos" || u.perfil === perfilFiltro;
    return mb && mp;
  });
 
  return (
    <div>
      {saved && <div style={{ background: "#f0fdf4", border: "1px solid #27ae60", borderRadius: 4, padding: "12px 16px", marginBottom: 16, color: "#27ae60", fontSize: 13, fontWeight: 700 }}>{saved}</div>}
      {error && <div style={{ background: "#fef2f2", border: "1px solid #c0392b", borderRadius: 4, padding: "12px 16px", marginBottom: 16, color: "#c0392b", fontSize: 13 }}>{error}</div>}
      {showForm && <UsuarioForm usuario={editando || EMPTY_USER} onSave={handleSave} onCancel={() => { setShowForm(false); setEditando(null); setError(""); }} />}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ fontSize: 11, color: C.muted }}>{usuarios.filter(u => u.activo !== false).length} activos de {usuarios.length} usuarios</div>
        {!showForm && <BtnPrimary onClick={() => { setEditando(null); setShowForm(true); setError(""); }}>+ Nuevo Usuario</BtnPrimary>}
      </div>
      <Box style={{ padding: "14px 20px", marginBottom: 16 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div>
            <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, letterSpacing: 2, marginBottom: 5, textTransform: "uppercase" }}>Buscar</div>
            <input value={busqueda} onChange={e => setBusqueda(e.target.value)} placeholder="Nombre o usuario..."
              style={{ width: "100%", background: "#fff", border: `1px solid ${C.border}`, borderRadius: 4, padding: "8px 12px", color: C.text, fontFamily: "inherit", fontSize: 13, boxSizing: "border-box" }} />
          </div>
          <div>
            <div style={{ fontSize: 10, color: C.muted, fontWeight: 700, letterSpacing: 2, marginBottom: 5, textTransform: "uppercase" }}>Filtrar por perfil</div>
            <select value={perfilFiltro} onChange={e => setPerfilFiltro(e.target.value)}
              style={{ width: "100%", background: "#fff", border: `1px solid ${C.border}`, borderRadius: 4, padding: "8px 12px", color: C.text, fontFamily: "inherit", fontSize: 13 }}>
              <option value="Todos">Todos los perfiles</option>
              {PERFILES_OPTS.map(p => <option key={p.v} value={p.v}>{p.l}</option>)}
            </select>
          </div>
        </div>
      </Box>
      {loading ? (
        <div style={{ textAlign: "center", padding: "40px 0", color: C.muted }}><div style={{ fontSize: 32, marginBottom: 12 }}>...</div><div>Cargando usuarios...</div></div>
      ) : filtrados.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px 0", color: C.muted }}><div style={{ fontSize: 40, marginBottom: 12 }}>?</div><div style={{ fontSize: 14, fontWeight: 700 }}>Sin resultados</div></div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {filtrados.map(u => <UsuarioCard key={u.id} usuario={u} onEdit={(u) => { setEditando({ ...u, password: "" }); setShowForm(true); }} onDelete={handleDelete} />)}
        </div>
      )}
    </div>
  );
}
 
 
// ── MÓDULO PRINCIPAL ──────────────────────────────────────────────────────────
export default function ConfiguracionModule({ onBack }) {
  const [seccion, setSeccion] = useState("notarias");
 
  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Courier New', monospace", color: C.text }}>
      <ModuleHero title="Configuración del Sistema" subtitle="Gestión de notarías, abogados y bufetes" onBack={onBack} />
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "32px 20px" }}>
 
        {/* Tab selector */}
        <div style={{ display: "flex", marginBottom: 28, border: "1px solid #ddd", borderRadius: 4, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          {[
            { id: "notarias", icon: "📋", label: "Notarías" },
            { id: "abogados", icon: "👥", label: "Abogados y Bufetes" },
            { id: "usuarios", icon: "🔑", label: "Usuarios del Sistema" },
          ].map((tab, idx) => (
            <button key={tab.id} onClick={() => setSeccion(tab.id)}
              style={{ flex: 1, padding: "14px 0", background: seccion === tab.id ? "#1e1e1e" : "#ffffff", border: "none", borderRight: idx < 2 ? "1px solid #ddd" : "none", color: seccion === tab.id ? "#ffffff" : "#555", fontFamily: "'Courier New', monospace", fontSize: 12, fontWeight: 700, letterSpacing: 1, cursor: "pointer", transition: "all 0.2s" }}>
              {tab.icon} {tab.label}
              {seccion === tab.id && <div style={{ width: 30, height: 2, background: "#b52240", margin: "4px auto 0" }} />}
            </button>
          ))}
        </div>
 
        {seccion === "notarias" && <NotariasSection />}
        {seccion === "abogados" && <AbogadosSection />}
        {seccion === "usuarios" && <UsuariosSection />}
      </div>
    </div>
  );
}
