// ============================================================
//  components/ui/GlitchName.jsx
//  Texto con efecto glitch periódico.
// ============================================================
import { useState, useEffect } from "react";

export function GlitchName({ name }) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const base = {
    fontFamily:    "'Bebas Neue',sans-serif",
    fontSize:      "clamp(4.5rem,11vw,10rem)",
    lineHeight:    0.9,
    letterSpacing: "-.01em",
    color:         "#f0f0f0",
    display:       "block",
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <span style={base}>{name}</span>
      {glitch && (
        <>
          <span style={{ ...base, position: "absolute", top: 0, left: "3px",  color: "#ff3cac", clipPath: "polygon(0 20%,100% 20%,100% 38%,0 38%)", opacity: 0.9 }}>{name}</span>
          <span style={{ ...base, position: "absolute", top: 0, left: "-3px", color: "#2de2e6", clipPath: "polygon(0 58%,100% 58%,100% 72%,0 72%)", opacity: 0.9 }}>{name}</span>
        </>
      )}
    </div>
  );
}
