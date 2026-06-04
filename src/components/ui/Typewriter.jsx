// ============================================================
//  components/ui/Typewriter.jsx
//  Cicla por ME.roles escribiendo y borrando cada rol.
// ============================================================
import { useState, useEffect } from "react";
import { ME } from "../../data";

export function Typewriter() {
  const [text,  setText]  = useState("");
  const [idx,   setIdx]   = useState(0);
  const [del,   setDel]   = useState(false);

  useEffect(() => {
    const role = ME.roles[idx];
    const speed = del ? 35 : 75;

    const timer = setTimeout(() => {
      if (!del && text === role) {
        setTimeout(() => setDel(true), 1800);
        return;
      }
      if (del && text === "") {
        setDel(false);
        setIdx(i => (i + 1) % ME.roles.length);
        return;
      }
      setText(p => del ? p.slice(0, -1) : role.slice(0, p.length + 1));
    }, speed);

    return () => clearTimeout(timer);
  }, [text, del, idx]);

  return (
    <span style={{
      fontFamily: "'JetBrains Mono',monospace",
      fontSize:   "clamp(.9rem,1.8vw,1.15rem)",
      color:      "#2de2e6",
      fontWeight: 300,
    }}>
      <span style={{ color: "#444" }}>$ </span>
      {text}
      <span style={{ borderRight: "2px solid #ff3cac", marginLeft: 3, animation: "blink .9s step-end infinite" }}>
        &nbsp;
      </span>
    </span>
  );
}
