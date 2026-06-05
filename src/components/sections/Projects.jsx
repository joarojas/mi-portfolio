// ============================================================
//  components/sections/Projects.jsx
// ============================================================
import { PROJECTS }      from "../../data";
import { Reveal }        from "../ui/Reveal";
import { SectionLabel }  from "../ui/SectionLabel";
import { SectionTitle }  from "../ui/SectionTitle";
import { ProjCard }      from "../cards/ProjCard";

export function Projects({ t, lang }) {
  return (
    <section id="projects" style={{ background:"#07070c", borderTop:"1px solid rgba(255,255,255,.03)" }}>
      <div className="section-container">
        <Reveal><SectionLabel n={3} text={t.projects.label} /></Reveal>
        <Reveal><SectionTitle line1={t.projects.title1} line2={t.projects.title2} accentColor="#ff3cac" /></Reveal>

        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <ProjCard key={p.id} p={p} i={i} lang={lang} t={t} />
          ))}

          {/* Card próximo proyecto */}
          <Reveal delay={320}>
            <div
              className="next-project-card"
              style={{ border:"2px dashed rgba(255,255,255,.07)", borderRadius:24, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"1rem", padding:"3rem", minHeight:280, cursor:"none", transition:"all .3s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor="rgba(255,60,172,.3)"; e.currentTarget.style.background="rgba(255,60,172,.02)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor="rgba(255,255,255,.07)"; e.currentTarget.style.background="transparent"; }}
            >
              <div style={{ width:52, height:52, borderRadius:"50%", border:"2px dashed rgba(255,255,255,.12)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.3rem", color:"#444" }}>+</div>
              <div style={{ textAlign:"center" }}>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.3rem", color:"#333", letterSpacing:".05em" }}>{t.projects.next}</div>
                <div style={{ fontSize:".78rem", color:"#333", marginTop:4 }}>{t.projects.nextSub}</div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
