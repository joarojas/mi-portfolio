// ============================================================
//  components/sections/Skills.jsx
// ============================================================
import { SKILLS }        from "../../data";
import { Reveal }        from "../ui/Reveal";
import { SectionLabel }  from "../ui/SectionLabel";
import { SectionTitle }  from "../ui/SectionTitle";
import { SkillCard }     from "../cards/SkillCard";

export function Skills({ t }) {
  return (
    <section id="skills" style={{ background:"#050508" }}>
      <div className="section-container">
        <Reveal><SectionLabel n={2} text={t.skills.label} /></Reveal>
        <Reveal><SectionTitle line1={t.skills.title1} line2={t.skills.title2} accentColor="#a855f7" /></Reveal>
        <div className="skills-grid">
          {SKILLS.map((sk, i) => (
            <SkillCard key={sk.cat} sk={sk} i={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
