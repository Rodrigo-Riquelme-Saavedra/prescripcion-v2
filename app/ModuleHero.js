"use client";
 
const BALANCE_SVG = `<svg viewBox="0 0 800 380" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;">
  <!-- Soporte vertical central -->
  <line x1="400" y1="40" x2="400" y2="300" stroke="#ffffff" stroke-width="6" opacity="0.8"/>
  <!-- Base -->
  <rect x="350" y="300" width="100" height="14" fill="#dddddd" rx="3" opacity="0.8"/>
  <rect x="320" y="314" width="160" height="10" fill="#bbbbbb" rx="2" opacity="0.7"/>
  <rect x="290" y="324" width="220" height="8" fill="#999999" rx="2" opacity="0.6"/>
  <!-- Barra horizontal -->
  <line x1="180" y1="120" x2="620" y2="120" stroke="#ffffff" stroke-width="5" opacity="0.85"/>
  <!-- Pivote central -->
  <circle cx="400" cy="120" r="14" fill="#f0c060" opacity="0.9"/>
  <circle cx="400" cy="120" r="8" fill="#d4a030" opacity="0.9"/>
  <!-- Soporte arriba -->
  <rect x="388" y="40" width="24" height="16" fill="#f0c060" rx="3" opacity="0.9"/>
  <!-- Cadenas izquierda -->
  <line x1="200" y1="120" x2="180" y2="210" stroke="#cccccc" stroke-width="3" opacity="0.8"/>
  <line x1="180" y1="120" x2="180" y2="210" stroke="#cccccc" stroke-width="3" opacity="0.8"/>
  <!-- Plato izquierdo -->
  <ellipse cx="180" cy="218" rx="75" ry="18" fill="none" stroke="#ffffff" stroke-width="3" opacity="0.85"/>
  <ellipse cx="180" cy="210" rx="75" ry="12" fill="#444444" stroke="#cccccc" stroke-width="2" opacity="0.6"/>
  <!-- Cadenas derecha (más bajo = más pesado) -->
  <line x1="600" y1="120" x2="620" y2="230" stroke="#e05070" stroke-width="3" opacity="0.8"/>
  <line x1="620" y1="120" x2="620" y2="230" stroke="#e05070" stroke-width="3" opacity="0.8"/>
  <!-- Plato derecho -->
  <ellipse cx="620" cy="238" rx="75" ry="18" fill="none" stroke="#e05070" stroke-width="3" opacity="0.85"/>
  <ellipse cx="620" cy="230" rx="75" ry="12" fill="#3a1020" stroke="#e05070" stroke-width="2" opacity="0.6"/>
  <!-- Texto IUSTITIA -->
  <text x="360" y="355" fill="#f0c060" font-size="18" font-family="Georgia, serif" opacity="0.7" letter-spacing="6">IUSTITIA</text>
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
      <div style={{ position: "relative", background: "#1e1e1e", height: 200, overflow: "hidden", display: "flex", alignItems: "center" }}>
        <div style={{ position: "absolute", right: 0, top: 0, width: "55%", height: "100%" }}
          dangerouslySetInnerHTML={{ __html: BALANCE_SVG }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #1e1e1e 35%, rgba(30,30,30,0.7) 60%, rgba(30,30,30,0.2) 100%)" }} />
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
