// ============================================================
//  components/sections/Hero.jsx
// ============================================================
import { ME } from "../../data";
import { ParticleCanvas } from "../effects/ParticleCanvas";
import { GlitchName, Typewriter, OrbitalPhoto, MagBtn } from "../ui";

export function Hero({ mousePos, t, onOpenTerminal }) {
  return (
    <section id="hero" className="hero-section">
      <ParticleCanvas mousePos={mousePos} />
      <div className="hero-bg-grid" />
      <div className="hero-bg-glow" />

      <div className="hero-grid">
        <div className="hero-text-col">
          {/* Badge */}
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            <span className="hero-badge-text">{t.hero.badge}</span>
          </div>

          {/* Nombre con glitch */}
          <div className="hero-glitch">
            <GlitchName name="JOAN" />
            <GlitchName name="ROJAS" />
          </div>

          {/* Typewriter */}
          <div className="hero-typewriter">
            <Typewriter />
          </div>

          {/* Descripción */}
          <p className="hero-desc">{t.hero.desc}</p>

          {/* CTAs */}
          <div className="hero-btns">
            <MagBtn href="#projects" bg="#ff3cac" color="#000" glow="0 0 40px rgba(255,60,172,.4)">
              {t.hero.btnProjects}
            </MagBtn>
            <MagBtn href="#contact" bg="transparent" color="#f0f0f0">
              {t.hero.btnTalk}
            </MagBtn>
            <MagBtn href={ME.cv} bg="rgba(45,226,230,.08)" color="#2de2e6" download>
              {t.hero.btnCv}
            </MagBtn>
          </div>

          {/* Terminal hint */}
          <div className="hero-term-wrapper">
            <button onClick={onOpenTerminal} className="hero-term-link">
              {t.hero.terminalHint} <span>{t.hero.terminalLink}</span>
            </button>
          </div>
        </div>

        <OrbitalPhoto />
      </div>

      <div className="hero-scroll">
        <span>SCROLL</span>
        <div />
      </div>
    </section>
  );
}
