// ============================================================
//  App.jsx — Orquestador principal
//  Responsabilidad única: conectar componentes y estado global.
//  Sin lógica de UI, sin strings quemados, sin estilos inline.
// ============================================================
import './App.css';
import { useState }        from "react";
import { useMousePos }     from "./hooks/useMousePos";
import { useKonami }       from "./hooks/useKonami";
import { useActiveNav }    from "./hooks/useActiveNav";
import { useContactForm }  from "./hooks/useContactForm";
import { TRANSLATIONS, DEFAULT_LANG } from "./translations";
import { ME, CERTIFICATES }           from "./data";
import { Cursor, Starfield }          from "./components/effects";
import { LangDropdown }               from "./components/ui/LangDropdown";
import { Terminal }                   from "./components/terminal/Terminal";
import {
  Hero, About, Skills, Projects,
  Experience, Certificates, Contact,
} from "./components/sections";

// ── Secciones para el scroll spy ─────────────────────────────
const BASE_SECTION_IDS = ["hero", "about", "skills", "projects", "experience", "contact"];
const getSectionIds = hasCerts =>
  hasCerts
    ? ["hero", "about", "skills", "projects", "experience", "certificates", "contact"]
    : BASE_SECTION_IDS;

// ── MAIN ─────────────────────────────────────────────────────
export default function Portfolio() {
  const [lang,     setLang]     = useState(DEFAULT_LANG);
  const [showTerm, setShowTerm] = useState(false);

  // Objeto de traducciones activo
  const t = { ...TRANSLATIONS[lang], __lang: lang };

  const hasCerts  = Boolean(CERTIFICATES?.length);
  const sectionIds = getSectionIds(hasCerts);

  // NAV dinámico — se recalcula solo si cambia lang o hasCerts
  const NAV_ITEMS = [
    [t.nav.inicio,      "#hero"],
    [t.nav.sobre,       "#about"],
    [t.nav.skills,      "#skills"],
    [t.nav.proyectos,   "#projects"],
    [t.nav.experiencia, "#experience"],
    ...(hasCerts ? [[t.certificates.label, "#certificates"]] : []),
    [t.nav.contacto,    "#contact"],
  ];

  // Hooks
  const mousePos  = useMousePos();
  const activeNav = useActiveNav(sectionIds);
  const form      = useContactForm();   // { formData, formStatus, handleChange, handleSubmit }

  // Easter egg Konami Code → abre terminal
  useKonami(() => setShowTerm(true));

  const openTerminal  = () => setShowTerm(true);
  const closeTerminal = () => setShowTerm(false);

  return (
    <div>
      <Cursor />
      <Starfield />
      {showTerm && <Terminal onClose={closeTerminal} t={t} />}

      {/* ── NAV ── */}
      <nav className="main-nav">
        <div className="nav-logo">JOAROJAS.DEV</div>
        <ul className="nav-links">
          {NAV_ITEMS.map(([label, href], i) => (
            <li key={href}>
              <a href={href} className={`nav-a${activeNav === i ? " active" : ""}`}>
                {label}
              </a>
            </li>
          ))}
          <li>
            <button onClick={openTerminal} className="nav-term-btn">
              {t.nav.terminal}
            </button>
          </li>
          <li><LangDropdown lang={lang} setLang={setLang} /></li>
          <li>
            <a 
              href={process.env.PUBLIC_URL + '/cv.pdf'} 
              download="Joan_Rojas_CV.pdf" 
              className="nav-cv-btn"
            >
              {t.nav.cv}
            </a>
          </li>
        </ul>
      </nav>

      {/* ── SECCIONES ── */}
      <Hero        mousePos={mousePos} t={t} onOpenTerminal={openTerminal} />
      <About       t={t} />
      <Skills      t={t} />
      <Projects    t={t} lang={lang} />
      <Experience  t={t} lang={lang} />
      <Certificates t={t} />
      <Contact     t={t} form={form} />

      {/* ── FOOTER ── */}
      <footer className="main-footer">
        <span className="footer-copy">© 2026 {ME.name}</span>
        <span className="footer-made">{t.footer.made} {ME.location}</span>
        <span className="footer-version">v2.0.0</span>
      </footer>
    </div>
  );
}
