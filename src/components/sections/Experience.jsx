// ============================================================
//  components/sections/Experience.jsx
// ============================================================
import { EXPERIENCE } from "../../data";
import { Reveal } from "../ui/Reveal";
import { tx } from "../../utils/tx";

export function Experience({ lang, t, sLabel, sH2 }) {
  return (
    <section id="experience" style={{ background: "#050508" }}>
      <div className="section-container">
        <Reveal>{sLabel(4, t.experience.label)}</Reveal>
        <Reveal>{sH2(t.experience.title1, [t.experience.title2, "#2de2e6"])}</Reveal>

        <div style={{ position:"relative", paddingLeft:"3rem" }}>
          {/* Línea vertical */}
          <div style={{ position:"absolute", left:0, top:0, bottom:0, width:1, background:"linear-gradient(to bottom,#ff3cac,#2de2e6,rgba(45,226,230,0))" }} />

          {EXPERIENCE.map((item, i) => (
            <Reveal key={i} delay={i * 100}>
              <div style={{ position:"relative", marginBottom:"2.5rem", paddingLeft:"1rem" }}>
                {/* Ícono en la línea */}
                <div style={{ position:"absolute", left:"-3.35rem", top:".4rem", width:28, height:28, borderRadius:"50%", background:item.color+"15", border:`1px solid ${item.color}44`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <i className={item.icon} style={{ fontSize:".9rem" }} />
                </div>

                <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".68rem", color:"#444", letterSpacing:".07em", marginBottom:6 }}>
                  {tx(item.date, lang)}
                </div>
                <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.5rem", color:"#f0f0f0", letterSpacing:".04em", marginBottom:4 }}>
                  {tx(item.title, lang)}
                </div>
                <div style={{ color:item.color, fontSize:".88rem", marginBottom:8, fontWeight:500 }}>
                  {tx(item.subtitle, lang)}
                </div>
                <p style={{ color:"#555", fontSize:".88rem", lineHeight:1.7, fontWeight:300 }}>
                  {tx(item.desc, lang)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
