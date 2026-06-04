import { useState } from "react";
import { Reveal } from "./components/ui/Reveal";
import { tx } from "./utils/helpers"; // Importamos el helper que acabamos de crear

export const ProjCard = ({ p, i, lang, t }) => {
  const [h, setH] = useState(false);
  const desc = tx(p.desc, lang);

  return (
    <Reveal delay={i * 100}>
      <div 
        className="proj-card" 
        onMouseEnter={() => setH(true)} 
        onMouseLeave={() => setH(false)}
        style={{ 
          background: h ? "#0e0e14" : "#09090e", 
          border: `1px solid ${h ? p.accent : "rgba(255,255,255,.06)"}`, 
          borderRadius: 24, 
          overflow: "hidden", 
          transition: "all .4s cubic-bezier(.23,1,.32,1)", 
          boxShadow: h ? `0 30px 80px ${p.accent}1a` : "none", 
          display: "flex", 
          flexDirection: "column" 
        }}
      >
        <div style={{ height: 190, display: "flex", alignItems: "center", justifyContent: "center", background: `radial-gradient(ellipse at 60% 40%,${p.accent}14,transparent 65%),#08080d`, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, opacity: h ? 0.05 : 0, transition: "opacity .4s", backgroundImage: `repeating-linear-gradient(0deg,${p.accent},${p.accent} 1px,transparent 1px,transparent 36px)` }} />
          {p.image ? (
            <img src={p.image} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 }} />
          ) : (
            <i className={p.icon} style={{ fontSize: "4rem", filter: `drop-shadow(0 0 20px ${p.accent}66)` }} />
          )}
          <div style={{ position: "absolute", bottom: 10, right: 14, fontFamily: "'JetBrains Mono',monospace", fontSize: ".6rem", color: p.accent, opacity: 0.5 }}>
            0{i + 1}
          </div>
        </div>

        <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
            {p.tags.map((tag) => (
              <span key={tag.name} style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: ".72rem", fontWeight: 600, padding: "3px 10px", borderRadius: 999, background: `${p.accent}14`, color: p.accent, border: `1px solid ${p.accent}28` }}>
                {tag.icon ? <i className={tag.icon} style={{ fontSize: ".9rem" }} /> : <span style={{ fontSize: ".6rem", fontFamily: "'JetBrains Mono',monospace" }}>{tag.iconText}</span>}
                {tag.name}
              </span>
            ))}
          </div>
          <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.7rem", color: "#f0f0f0", letterSpacing: ".04em" }}>{p.title}</h3>
          <p style={{ color: "#666", fontSize: ".88rem", lineHeight: 1.65, flex: 1 }}>{desc}</p>
          <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
            <a href={p.demo} style={{ flex: 1, textAlign: "center", padding: ".55rem", borderRadius: 10, background: p.accent, color: "#000", fontWeight: 800, fontSize: ".8rem", fontFamily: "'Cabinet Grotesk',sans-serif", textDecoration: "none" }}>{t.projects.demo}</a>
            <a href={p.repo} target="_blank" rel="noreferrer" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: ".55rem", borderRadius: 10, background: "transparent", color: "#888", fontWeight: 700, fontSize: ".8rem", fontFamily: "'Cabinet Grotesk',sans-serif", textDecoration: "none", border: "1px solid rgba(255,255,255,.08)" }}>
              <i className="devicon-github-original" style={{ fontSize: ".9rem" }} /> {t.projects.repo}
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  );
};