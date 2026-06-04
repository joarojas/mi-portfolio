// ============================================================
//  components/sections/About.jsx
// ============================================================
import { ME } from "../../data";
import { Reveal } from "../ui/Reveal";
import { GitHubStats } from "../widgets/GitHubStats";

const STAT_COLORS = ["#ff3cac", "#2de2e6", "#f6f740", "#4ade80"];

export function About({ t, sLabel, sH2 }) {
  return (
    <section id="about" style={{ background: "#07070c", borderTop: "1px solid rgba(255,255,255,.03)" }}>
      <div className="section-container">
        <Reveal>{sLabel(1, t.about.label)}</Reveal>
        <div className="about-grid">

          {/* Texto */}
          <div>
            <Reveal>{sH2(t.about.title1, [t.about.title2, "#2de2e6"])}</Reveal>
            <Reveal delay={80}>
              <p style={{ color:"#555", lineHeight:1.85, marginBottom:"1.2rem", fontWeight:300, fontSize:"1rem" }}>{t.about.p1}</p>
            </Reveal>
            <Reveal delay={150}>
              <p style={{ color:"#555", lineHeight:1.85, marginBottom:"1.2rem", fontWeight:300, fontSize:"1rem" }}>{t.about.p2}</p>
            </Reveal>
            <Reveal delay={220}>
              <p style={{ color:"#555", lineHeight:1.85, fontWeight:300, fontSize:"1rem" }}>{t.about.p3}</p>
            </Reveal>
          </div>

          {/* Stats + GitHub */}
          <div style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
            <Reveal delay={100}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
                {t.about.stats.map((s, i) => (
                  <div key={i} style={{ background:"#0b0b11", border:"1px solid rgba(255,255,255,.05)", borderRadius:16, padding:"1.25rem" }}>
                    <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"2.8rem", color:STAT_COLORS[i], lineHeight:1 }}>{s.n}</div>
                    <div style={{ fontSize:".75rem", color:"#444", marginTop:6, letterSpacing:".05em" }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={200}>
              <GitHubStats username={ME.github} t={t} />
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
