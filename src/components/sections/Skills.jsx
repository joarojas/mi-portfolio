// ============================================================
//  components/sections/Skills.jsx
// ============================================================
import { SKILLS } from "../../data";
import { Reveal } from "../ui/Reveal";
import { SkillCard } from "../cards/SkillCard";

export function Skills({ t, sLabel, sH2 }) {
  return (
    <section id="skills" style={{ background: "#050508" }}>
      <div className="section-container">
        <Reveal>{sLabel(2, t.skills.label)}</Reveal>
        <Reveal>{sH2(t.skills.title1, [t.skills.title2, "#a855f7"])}</Reveal>
        <div className="skills-grid">
          {SKILLS.map((sk, i) => (
            <SkillCard key={sk.cat} sk={sk} i={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
