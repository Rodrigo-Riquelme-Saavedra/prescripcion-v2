"use client";
import { useState } from "react";
 
// Formatea RUT: 12345678 -> 12.345.678
function formatRut(rut) {
  const clean = rut.replace(/[^0-9kK]/g, "").toUpperCase();
  if (clean.length === 0) return "";
  const dv = clean.slice(-1);
  const num = clean.slice(0, -1);
  if (num.length === 0) return dv;
  const formatted = num.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${formatted}-${dv}`;
}
 
// Valida dígito verificador
function validarRut(rut) {
  const clean = rut.replace(/[^0-9kK]/g, "").toUpperCase();
  if (clean.length < 2) return false;
  const dv = clean.slice(-1);
  const num = clean.slice(0, -1);
  if (num.length === 0) return false;
 
  let suma = 0;
  let multiplo = 2;
  for (let i = num.length - 1; i >= 0; i--) {
    suma += parseInt(num[i]) * multiplo;
    multiplo = multiplo === 7 ? 2 : multiplo + 1;
  }
  const resto = suma % 11;
  const dvEsperado = resto === 0 ? "0" : resto === 1 ? "K" : String(11 - resto);
  return dv === dvEsperado;
}
 
export default function RutField({ label, value, onChange, placeholder, full, required }) {
  const [touched, setTouched] = useState(false);
  const [raw, setRaw] = useState(value || "");
 
  const handleChange = (e) => {
    const input = e.target.value.replace(/[^0-9kK]/g, "").toUpperCase();
    setRaw(input);
    const formatted = formatRut(input);
    onChange(formatted);
  };
 
  const handleBlur = () => setTouched(true);
 
  const formatted = formatRut(raw);
  const isValid = validarRut(raw);
  const showError = touched && raw.length > 0 && !isValid;
  const showOk = touched && raw.length > 0 && isValid;
 
  return (
    <div style={{ gridColumn: full ? "1 / -1" : "span 1" }}>
      <div style={{ fontSize: 10, color: "#555", fontWeight: 700, letterSpacing: 2, marginBottom: 5, textTransform: "uppercase", fontFamily: "'Courier New', monospace" }}>
        {label}{required && <span style={{ color: "#b52240" }}> *</span>}
      </div>
      <div style={{ position: "relative" }}>
        <input
          type="text"
          value={formatted}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder={placeholder || "12.345.678-9"}
          maxLength={12}
          style={{
            width: "100%",
            background: "#fff",
            border: `1px solid ${showError ? "#c0392b" : showOk ? "#27ae60" : "#c8b8a2"}`,
            borderRadius: 4,
            padding: "9px 36px 9px 12px",
            color: "#1e1e1e",
            fontFamily: "'Courier New', monospace",
            fontSize: 13,
            boxSizing: "border-box",
            outline: "none",
          }}
        />
        {showOk && (
          <div style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", color: "#27ae60", fontSize: 14, fontWeight: 700 }}>✓</div>
        )}
        {showError && (
          <div style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", color: "#c0392b", fontSize: 14, fontWeight: 700 }}>✗</div>
        )}
      </div>
      {showError && (
        <div style={{ fontSize: 10, color: "#c0392b", marginTop: 4, fontFamily: "'Courier New', monospace" }}>
          RUT inválido — verifica el dígito verificador
        </div>
      )}
      {showOk && (
        <div style={{ fontSize: 10, color: "#27ae60", marginTop: 4, fontFamily: "'Courier New', monospace" }}>
          RUT válido ✓
        </div>
      )}
    </div>
  );
}
 
export { validarRut, formatRut };
