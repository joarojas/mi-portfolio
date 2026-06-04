// ============================================================
//  components/cards/SkillCard.jsx
// ============================================================

export function SkillCard({ sk, i, t }) {
  const catName = t.skills.cats?.[sk.cat] ?? sk.cat;

  return (
    <div
      className="skill-card"
      style={{ background:"#0b0b11", border:"1px solid rgba(255,255,255,.05)", borderRadius:20, padding:"1.5rem", transition:"border-color .3s,transform .3s" }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = sk.color + "33"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,.05)"; }}
    >
      <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1rem", color:sk.color, letterSpacing:".1em", marginBottom:"1.1rem" }}>
        {catName}
      </div>

      <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
        {sk.items.map(item => (
          <div key={item.name}
            style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:5, padding:"8px 12px", borderRadius:12, background:sk.color+"0c", border:`1px solid ${sk.color}18`, transition:"all .2s", cursor:"default" }}
            onMouseEnter={e => { e.currentTarget.style.background = sk.color + "1a"; e.currentTarget.style.transform = "translateY(-3px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = sk.color + "0c"; e.currentTarget.style.transform = "none"; }}
          >
            <div style={{ width:32, height:32, display:"flex", alignItems:"center", justifyContent:"center" }}>
              {item.icon
                ? <i className={item.icon} style={{ fontSize:"1.6rem" }} />
                : <span style={{ fontSize:".65rem", fontFamily:"'JetBrains Mono',monospace", fontWeight:700, color:sk.color, letterSpacing:".04em" }}>{item.iconText}</span>
              }
            </div>
            <span style={{ fontSize:".65rem", color:"#777", fontFamily:"'JetBrains Mono',monospace", letterSpacing:".04em", whiteSpace:"nowrap" }}>
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
