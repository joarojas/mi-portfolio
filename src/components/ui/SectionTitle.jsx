// ============================================================
//  components/ui/SectionTitle.jsx
//  Título de sección con línea de acento opcional.
//  Reemplaza la función sH2() que se recreaba en cada render.
//
//  Props:
//    line1       — primera línea del título
//    line2       — segunda línea (opcional)
//    accentColor — color de line2 (opcional, default: #ff3cac)
// ============================================================

export function SectionTitle({ line1, line2, accentColor = "#ff3cac" }) {
  return (
    <h2 style={{
      fontFamily:    "'Bebas Neue',sans-serif",
      fontSize:      "clamp(2.8rem,5vw,4.5rem)",
      letterSpacing: ".03em",
      lineHeight:    1,
      marginBottom:  "3rem",
      color:         "#f0f0f0",
    }}>
      {line1}
      {line2 && (
        <>
          <br />
          <span style={{ color: accentColor }}>{line2}</span>
        </>
      )}
    </h2>
  );
}
