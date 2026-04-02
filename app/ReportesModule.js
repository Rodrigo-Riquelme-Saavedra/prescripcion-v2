"use client";
import { useState, useEffect } from "react";
 
const C = {
  bg:      "#f4f4f4",
  surface: "#ffffff",
  border:  "#c8b8a2",
  accent:  "#b52240",
  record:  "#8b1a2e",
  text:    "#1e1e1e",
  muted:   "#555555",
  dim:     "#eeeeee",
  red:     "#c0392b",
  green:   "#27ae60",
};
 
const ADMIN_PASSWORD = "GVSolution2026";
 
const TIPO_COLORS = {
  "Prescripción": "#bf00ff",
  "Mutuo A la Vista": "#3b82f6",
  "Mutuo en Cuotas": "#10b981",
};
 
const TIPO_ICONS = {
  "Prescripción": "⚖",
  "Mutuo A la Vista": "🤝",
  "Mutuo en Cuotas": "📅",
};
 
function Header({ onBack }) {
  return (
    <div style={{ background: "#1e1e1e", borderBottom: "3px solid #8b1a2e", padding: "0 32px", height: 72, display: "flex", alignItems: "center", gap: 18 }}>
      <img src="https://raw.githubusercontent.com/Rodrigo-Riquelme-Saavedra/prescripcion-v2/main/public/PaginaWeb.png" alt="Grupo GV" style={{ height: 54, objectFit: "contain", filter: "drop-shadow(0 0 12px rgba(100,180,255,0.6))" }} onError={(e) => { e.target.style.display = "none"; }} />
      <div style={{ width: 1, height: 36, background: `linear-gradient(to bottom, transparent, ${C.record}, transparent)` }} />
      <div>
        <div style={{ fontWeight: 700, fontSize: 13, letterSpacing: 2, color: "#fff" }}>REPORTES Y ESTADÍSTICAS</div>
        <div style={{ fontSize: 10, color: C.accent, letterSpacing: 1.5, marginTop: 2 }}>Grupo GV · Panel Administrativo</div>
      </div>
      <button onClick={onBack} style={{ marginLeft: "auto", background: "rgba(191,0,255,0.15)", border: `1px solid ${C.record}`, borderRadius: 20, padding: "6px 16px", fontSize: 11, color: C.accent, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
        ← Volver al Portal
      </button>
    </div>
  );
}
 
// ── LOGIN ─────────────────────────────────────────────────────────────────────
function LoginPanel({ onLogin }) {
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
 
  const handleLogin = () => {
    if (pwd === ADMIN_PASSWORD) { onLogin(); }
    else { setError("Clave incorrecta. Intenta nuevamente."); setPwd(""); }
  };
 
  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Courier New', monospace", color: C.text }}>
      <Header onBack={() => {}} />
      <div style={{ maxWidth: 420, margin: "80px auto", padding: "0 24px" }}>
        <div style={{ background: C.surface, border: `2px solid ${C.border}`, borderRadius: 14, padding: 40, boxShadow: "0 4px 20px rgba(168,85,247,0.15)", textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔐</div>
          <div style={{ fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 6 }}>Acceso Restringido</div>
          <div style={{ fontSize: 12, color: C.muted, marginBottom: 28 }}>Ingresa la clave de administrador para ver los reportes</div>
          <input
            type="password"
            placeholder="Clave de administrador"
            value={pwd}
            onChange={(e) => { setPwd(e.target.value); setError(""); }}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            style={{ width: "100%", background: "#f8f6ff", border: `1px solid ${C.border}`, borderRadius: 8, padding: "12px 16px", color: C.text, fontFamily: "inherit", fontSize: 14, boxSizing: "border-box", marginBottom: 12, textAlign: "center", letterSpacing: 4 }}
          />
          {error && <div style={{ color: C.red, fontSize: 12, marginBottom: 12 }}>⚠ {error}</div>}
          <button onClick={handleLogin} style={{ width: "100%", background: `linear-gradient(135deg, ${C.record}, ${C.accent})`, border: "none", color: "#fff", borderRadius: 8, padding: "12px", fontFamily: "inherit", fontSize: 13, fontWeight: 700, letterSpacing: 2, cursor: "pointer" }}>
            INGRESAR
          </button>
        </div>
      </div>
    </div>
  );
}
 
// ── CHARTS ────────────────────────────────────────────────────────────────────
function BarChart({ data }) {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 16, height: 160, padding: "0 8px" }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: d.color }}>{d.value}</div>
          <div style={{ width: "100%", height: Math.max((d.value / max) * 120, 4), background: `linear-gradient(to top, ${d.color}, ${d.color}88)`, borderRadius: "4px 4px 0 0", transition: "height 0.5s" }} />
          <div style={{ fontSize: 10, color: C.muted, textAlign: "center", letterSpacing: 0.5 }}>{d.label}</div>
        </div>
      ))}
    </div>
  );
}
 
function PieChart({ data }) {
  const total = data.reduce((s, d) => s + d.value, 0) || 1;
  let cumulative = 0;
  const segments = data.map(d => {
    const pct = d.value / total;
    const start = cumulative;
    cumulative += pct;
    return { ...d, pct, start };
  });
 
  const polarToCartesian = (cx, cy, r, angle) => {
    const rad = (angle - 90) * Math.PI / 180;
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };
 
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
      <svg width={160} height={160} viewBox="0 0 160 160">
        {segments.map((seg, i) => {
          if (seg.value === 0) return null;
          const startAngle = seg.start * 360;
          const endAngle = (seg.start + seg.pct) * 360;
          const s = polarToCartesian(80, 80, 70, startAngle);
          const e = polarToCartesian(80, 80, 70, endAngle);
          const largeArc = seg.pct > 0.5 ? 1 : 0;
          return (
            <path key={i}
              d={`M 80 80 L ${s.x} ${s.y} A 70 70 0 ${largeArc} 1 ${e.x} ${e.y} Z`}
              fill={seg.color} stroke="#fff" strokeWidth={2} />
          );
        })}
        <circle cx={80} cy={80} r={35} fill={C.surface} />
        <text x={80} y={84} textAnchor="middle" fontSize={14} fontWeight={700} fill={C.text}>{total}</text>
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {segments.map((seg, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 12, height: 12, borderRadius: 3, background: seg.color, flexShrink: 0 }} />
            <div style={{ fontSize: 12, color: C.text }}>{seg.label}</div>
            <div style={{ fontSize: 11, color: C.muted, marginLeft: 4 }}>({Math.round(seg.pct * 100)}%)</div>
          </div>
        ))}
      </div>
    </div>
  );
}
 
function LineChart({ data }) {
  if (data.length < 2) return <div style={{ fontSize: 12, color: C.muted, padding: 20 }}>Se necesitan al menos 2 registros para mostrar la línea de actividad.</div>;
  const max = Math.max(...data.map(d => d.value), 1);
  const w = 400, h = 120, pad = 20;
  const points = data.map((d, i) => ({
    x: pad + (i / (data.length - 1)) * (w - pad * 2),
    y: h - pad - (d.value / max) * (h - pad * 2),
    ...d
  }));
  const pathD = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
 
  return (
    <div style={{ overflowX: "auto" }}>
      <svg width={w} height={h} style={{ display: "block" }}>
        <defs>
          <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={C.record} stopOpacity={0.3} />
            <stop offset="100%" stopColor={C.record} stopOpacity={0} />
          </linearGradient>
        </defs>
        <path d={`${pathD} L ${points[points.length-1].x} ${h} L ${points[0].x} ${h} Z`} fill="url(#lineGrad)" />
        <path d={pathD} fill="none" stroke={C.record} strokeWidth={2} strokeLinejoin="round" />
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={4} fill={C.record} stroke="#fff" strokeWidth={2} />
            <text x={p.x} y={h - 4} textAnchor="middle" fontSize={9} fill={C.muted}>{p.label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}
 
// ── MAIN DASHBOARD ────────────────────────────────────────────────────────────
function Dashboard({ onBack }) {
  const [registros, setRegistros] = useState([]);
  const [filtroTipo, setFiltroTipo] = useState("Todos");
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const cargar = async () => {
      try {
        const res = await fetch("/api/registros");
        if (res.ok) { const data = await res.json(); setRegistros(data.registros || []); }
      } catch {}
      setLoading(false);
    };
    cargar();
  }, []);
 
  const tipos = ["Todos", "Prescripción", "Mutuo A la Vista", "Mutuo en Cuotas"];
  const filtrados = filtroTipo === "Todos" ? registros : registros.filter(r => r.tipo === filtroTipo);
 
  const conteos = {
    "Prescripción": registros.filter(r => r.tipo === "Prescripción").length,
    "Mutuo A la Vista": registros.filter(r => r.tipo === "Mutuo A la Vista").length,
    "Mutuo en Cuotas": registros.filter(r => r.tipo === "Mutuo en Cuotas").length,
  };
 
  // Group by date for line chart
  const byDate = {};
  registros.forEach(r => {
    const d = r.fecha?.split(" ")[0] || "Sin fecha";
    byDate[d] = (byDate[d] || 0) + 1;
  });
  const lineData = Object.entries(byDate).slice(-7).map(([k, v]) => ({ label: k.slice(5), value: v }));
 
  const exportarExcel = () => {
    const headers = ["Fecha y Hora", "Tipo", "Cliente / Empresa", "RUT", "Abogado", "Monto"];
    const rows = filtrados.map(r => [r.fecha, r.tipo, r.cliente, r.rut || "-", r.abogado, r.monto ? `$${parseInt(r.monto).toLocaleString("es-CL")}` : "-"]);
    const csvContent = [headers, ...rows].map(r => r.map(c => `"${c}"`).join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `Reporte_GV_${new Date().toLocaleDateString("es-CL").replace(/\//g,"-")}.csv`; a.click();
    URL.revokeObjectURL(url);
  };
 
  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Courier New', monospace", color: C.text }}>
      <Header onBack={onBack} />
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 20px" }}>
 
        {/* KPI Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
          {[
            { label: "Total Documentos", value: registros.length, color: C.record, icon: "📋" },
            { label: "Prescripciones", value: conteos["Prescripción"], color: "#bf00ff", icon: "⚖" },
            { label: "Mutuos Vista", value: conteos["Mutuo A la Vista"], color: "#3b82f6", icon: "🤝" },
            { label: "Mutuos Cuotas", value: conteos["Mutuo en Cuotas"], color: "#10b981", icon: "📅" },
          ].map((kpi, i) => (
            <div key={i} style={{ background: C.surface, border: `2px solid ${C.border}`, borderRadius: 12, padding: "20px 18px", boxShadow: "0 2px 12px rgba(168,85,247,0.08)" }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{kpi.icon}</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: kpi.color }}>{loading ? "..." : kpi.value}</div>
              <div style={{ fontSize: 10, color: C.muted, letterSpacing: 1.5, marginTop: 4, textTransform: "uppercase" }}>{kpi.label}</div>
            </div>
          ))}
        </div>
 
        {/* Charts */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 28 }}>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: 2, marginBottom: 16, textTransform: "uppercase" }}>Por Tipo</div>
            <BarChart data={[
              { label: "Prescripción", value: conteos["Prescripción"], color: "#bf00ff" },
              { label: "Mutuo Vista", value: conteos["Mutuo A la Vista"], color: "#3b82f6" },
              { label: "Mutuo Cuotas", value: conteos["Mutuo en Cuotas"], color: "#10b981" },
            ]} />
          </div>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: 2, marginBottom: 16, textTransform: "uppercase" }}>Distribución</div>
            <PieChart data={[
              { label: "Prescripción", value: conteos["Prescripción"], color: "#bf00ff" },
              { label: "Mutuo Vista", value: conteos["Mutuo A la Vista"], color: "#3b82f6" },
              { label: "Mutuo Cuotas", value: conteos["Mutuo en Cuotas"], color: "#10b981" },
            ]} />
          </div>
          <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: 2, marginBottom: 16, textTransform: "uppercase" }}>Actividad Reciente</div>
            <LineChart data={lineData} />
          </div>
        </div>
 
        {/* Table */}
        <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: C.muted, letterSpacing: 2, textTransform: "uppercase" }}>
              Registro de Actividad {filtroTipo !== "Todos" ? `— ${filtroTipo}` : ""}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <select value={filtroTipo} onChange={e => setFiltroTipo(e.target.value)}
                style={{ background: C.dim, border: `1px solid ${C.border}`, borderRadius: 6, padding: "6px 10px", color: C.text, fontFamily: "inherit", fontSize: 11, cursor: "pointer" }}>
                {tipos.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <button onClick={exportarExcel}
                style={{ background: "#10b981", border: "none", color: "#fff", borderRadius: 6, padding: "6px 14px", fontFamily: "inherit", fontSize: 11, fontWeight: 700, cursor: "pointer", letterSpacing: 1 }}>
                ⬇ Exportar Excel
              </button>
            </div>
          </div>
 
          {loading ? (
            <div style={{ textAlign: "center", padding: 40, color: C.muted }}>Cargando registros...</div>
          ) : filtrados.length === 0 ? (
            <div style={{ textAlign: "center", padding: 40, color: C.muted }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>📭</div>
              <div>No hay registros aún. Los documentos generados aparecerán aquí automáticamente.</div>
            </div>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead>
                  <tr style={{ background: C.dim }}>
                    {["Fecha y Hora", "Tipo", "Cliente / Empresa", "Abogado", "Monto", ""].map(h => (
                      <th key={h} style={{ padding: "10px 12px", color: C.muted, fontSize: 10, fontWeight: 700, letterSpacing: 1.5, textAlign: "left", borderBottom: `1px solid ${C.border}`, textTransform: "uppercase" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtrados.slice().reverse().map((r, i) => (
                    <tr key={i} style={{ borderBottom: `1px solid ${C.dim}`, background: i % 2 === 0 ? "#fff" : "#faf8ff" }}>
                      <td style={{ padding: "10px 12px", color: C.muted, fontSize: 11 }}>{r.fecha}</td>
                      <td style={{ padding: "10px 12px" }}>
                        <span style={{ background: `${TIPO_COLORS[r.tipo]}20`, border: `1px solid ${TIPO_COLORS[r.tipo]}`, borderRadius: 20, padding: "3px 10px", fontSize: 10, fontWeight: 700, color: TIPO_COLORS[r.tipo], whiteSpace: "nowrap" }}>
                          {TIPO_ICONS[r.tipo]} {r.tipo}
                        </span>
                      </td>
                      <td style={{ padding: "10px 12px", fontWeight: 600 }}>{r.cliente}</td>
                      <td style={{ padding: "10px 12px", color: C.muted }}>{r.abogado || "-"}</td>
                      <td style={{ padding: "10px 12px", color: C.accent, fontWeight: 700 }}>
                        {r.monto ? `$${parseInt(r.monto).toLocaleString("es-CL")}` : "-"}
                      </td>
                      <td style={{ padding: "10px 12px" }}>
                        <span style={{ fontSize: 10, color: C.muted }}>#{filtrados.length - i}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
 
// ── EXPORT ────────────────────────────────────────────────────────────────────
export default function ReportesModule({ onBack }) {
  return <Dashboard onBack={onBack} />;
}
