// ============================================================
//  components/ui/SectionLabel.jsx
//  Etiqueta de sección: "01 — Sobre mí"
//  Reemplaza la función sLabel() que se recreaba en cada render.
// ============================================================

export function SectionLabel({ n, text }) {
  return (
    <div style={{
      fontFamily:    "'JetBrains Mono',monospace",
      fontSize:      ".68rem",
      letterSpacing: ".2em",
      color:         "#ff3cac",
      textTransform: "uppercase",
      marginBottom:  "1rem",
      display:       "flex",
      alignItems:    "center",
      gap:           12,
    }}>
      <span style={{ width: 20, height: 1, background: "#ff3cac", display: "inline-block" }} />
      0{n} — {text}
    </div>
  );
}
