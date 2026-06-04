// ============================================================
//  components/ui/MagBtn.jsx
//  Botón que sigue el cursor con efecto magnético.
//
//  Props:
//    href, bg, color, glow, download, children
// ============================================================
import { useRef } from "react";

export function MagBtn({ children, href, bg, color, glow, download: dl }) {
  const ref = useRef(null);

  const onMove = e => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.transform = `translate(
      ${(e.clientX - r.left - r.width  / 2) * 0.3}px,
      ${(e.clientY - r.top  - r.height / 2) * 0.3}px
    )`;
  };

  const onLeave = () => {
    ref.current.style.transform = "translate(0,0)";
  };

  return (
    <a
      ref={ref}
      href={href}
      download={dl}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        display:        "inline-flex",
        alignItems:     "center",
        gap:            8,
        padding:        ".85rem 2rem",
        borderRadius:   999,
        fontFamily:     "'Cabinet Grotesk',sans-serif",
        fontWeight:     800,
        fontSize:       ".9rem",
        textDecoration: "none",
        cursor:         "none",
        transition:     "transform .35s cubic-bezier(.23,1,.32,1)",
        background:     bg,
        color,
        boxShadow:      glow || "none",
        border:         bg === "transparent" ? "1px solid rgba(255,255,255,.12)" : "none",
      }}
    >
      {children}
    </a>
  );
}
