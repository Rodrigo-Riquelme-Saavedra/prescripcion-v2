"use client";
 
const BALANCE_SVG = `<svg viewBox="0 0 800 380" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;opacity:0.12">
  <line x1="400" y1="60" x2="400" y2="280" stroke="#e8eaf0" stroke-width="4"/>
  <rect x="388" y="270" width="24" height="60" fill="#c8ccd8" rx="2"/>
  <rect x="340" y="320" width="120" height="10" fill="#e8eaf0" rx="2"/>
  <rect x="310" y="330" width="180" height="8" fill="#c8ccd8" rx="2"/>
  <line x1="200" y1="110" x2="600" y2="110" stroke="#e8eaf0" stroke-width="3"/>
  <rect x="396" y="56" width="8" height="8" fill="#c9a84c" rx="1"/>
  <line x1="200" y1="110" x2="180" y2="200" stroke="#c8ccd8" stroke-width="2"/>
  <line x1="600" y1="110" x2="620" y2="200" stroke="#c8ccd8" stroke-width="2"/>
  <ellipse cx="180" cy="220" rx="70" ry="25" fill="none" stroke="#e8eaf0" stroke-width="2"/>
  <path d="M 110 200 Q 180 180 250 200" fill="none" stroke="#e8eaf0" stroke-width="2"/>
  <ellipse cx="620" cy="225" rx="70" ry="25" fill="none" stroke="#b52240" stroke-width="2"/>
  <path d="M 550 205 Q 620 185 690 205" fill="none" stroke="#b52240" stroke-width="2"/>
  <circle cx="400" cy="108" r="10" fill="#c9a84c"/>
  <rect x="385" y="50" width="30" height="12" fill="#c9a84c" rx="1"/>
</svg>`;
 
export default function ModuleHero({ title, subtitle, onBack }) {
  return (
    <div>
      <div style={{ background: "#1e1e1e", borderBottom: "3px solid #8b1a2e", padding: "0 40px", height: 70, display: "flex", alignItems: "center", gap: 18, boxShadow: "0 2px 20px rgba(0,0,0,0.4)" }}>
        <img
          src="https://raw.githubusercontent.com/Rodrigo-Riquelme-Saavedra/prescripcion-v2/main/public/PaginaWeb.png"
          alt="Grupo GV"
          style={{ height: 52, objectFit: "contain", flexShrink: 0 }}
          onError={(e) => { e.target.style.display = "none"; }}
        />
        <div style={{ width: 1, height: 36, background: "linear-gradient(to bottom, transparent, #8b1a2e, transparent)" }} />
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, letterSpacing: 2, color: "#f4f4f4", fontFamily: "'Courier New', monospace" }}>PORTAL DE GESTIÓN JURÍDICA</div>
          <div style={{ fontSize: 10, color: "#b52240", letterSpacing: 2, marginTop: 2, fontFamily: "'Courier New', monospace" }}>GRUPO GV · CHILE</div>
        </div>
        <button onClick={onBack} style={{ marginLeft: "auto", background: "rgba(139,26,46,0.1)", border: "1px solid #8b1a2e", borderRadius: 4, padding: "6px 16px", fontSize: 11, color: "#b52240", fontWeight: 700, cursor: "pointer", fontFamily: "'Courier New', monospace", letterSpacing: 1 }}>
          ← Volver al Portal
        </button>
      </div>
      <div style={{ position: "relative", background: "#1e1e1e", height: 180, overflow: "hidden", display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 60 }}
          dangerouslySetInnerHTML={{ __html: BALANCE_SVG }} />
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
