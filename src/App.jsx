// ============================================================
//  App.jsx — Orquestador principal
//  Este archivo NO contiene lógica de UI ni estilos inline.
//  Solo conecta los componentes y maneja el estado global.
// ============================================================
import './App.css';
import { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';

// — Hooks —
import { useMousePos }  from "./hooks/useMousePos";
import { useKonami }    from "./hooks/useKonami";
import { useActiveNav } from "./hooks/useActiveNav";

// — Constantes —
import { EMAILJS_SERVICE, EMAILJS_TEMPLATE, EMAILJS_KEY } from "./constants/emailjs";

// — Traducciones —
import { TRANSLATIONS, DEFAULT_LANG } from "./translations";

// — Datos —
import { CERTIFICATES } from "./data";

// — Efectos —
import { Cursor, Starfield } from "./components/effects";

// — UI —
import { LangDropdown } from "./components/ui/LangDropdown";

// — Terminal —
import { Terminal } from "./components/terminal/Terminal";

// — Secciones —
import {
  Hero, About, Skills, Projects,
  Experience, Certificates, Contact,
} from "./components/sections";

// ── IDs de secciones para el scroll spy ──────────────────────
const SECTION_IDS = [
  "hero", "about", "skills", "projects", "experience",
  ...(CERTIFICATES?.length ? ["certificates"] : []),
  "contact",
];

// ── Helpers de UI compartidos entre secciones ────────────────
// Se pasan como props para no duplicar código en cada sección
const makeSLabel = () => (n, txt) => (
  <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".68rem", letterSpacing:".2em", color:"#ff3cac", textTransform:"uppercase", marginBottom:"1rem", display:"flex", alignItems:"center", gap:12 }}>
    <span style={{ width:20, height:1, background:"#ff3cac", display:"inline-block" }} />
    0{n} — {txt}
  </div>
);

const makeSH2 = () => (txt, accent) => (
  <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(2.8rem,5vw,4.5rem)", letterSpacing:".03em", lineHeight:1, marginBottom:"3rem", color:"#f0f0f0" }}>
    {txt}
    {accent && <><br /><span style={{ color: accent[1] }}>{accent[0]}</span></>}
  </h2>
);

// ── MAIN ─────────────────────────────────────────────────────
export default function Portfolio() {
  // — Idioma —
  const [lang, setLang] = useState(DEFAULT_LANG);
  const t = { ...TRANSLATIONS[lang], __lang: lang };

  // — Nav dinámico según idioma —
  const NAV_ITEMS = [
    [t.nav.inicio,      "#hero"],
    [t.nav.sobre,       "#about"],
    [t.nav.skills,      "#skills"],
    [t.nav.proyectos,   "#projects"],
    [t.nav.experiencia, "#experience"],
    ...(CERTIFICATES?.length ? [[t.certificates.label, "#certificates"]] : []),
    [t.nav.contacto,    "#contact"],
  ];

  // — Hooks —
  const mousePos  = useMousePos();
  const activeNav = useActiveNav(SECTION_IDS);

  // — Terminal —
  const [showTerm, setShowTerm] = useState(false);
  useKonami(() => setShowTerm(true));

  // — Formulario de contacto —
  const [formData,   setFormData]   = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState("idle");

  useEffect(() => { emailjs.init(EMAILJS_KEY); }, []);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setFormStatus("sending");
    try {
      await emailjs.send(EMAILJS_SERVICE, EMAILJS_TEMPLATE, {
        from_name:  formData.name,
        from_email: formData.email,
        message:    formData.message,
      });
      setFormStatus("sent");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setFormStatus("idle"), 4000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 4000);
    }
  };

  // — Helpers compartidos —
  const sLabel = makeSLabel();
  const sH2    = makeSH2();

  return (
    <div style={{ fontFamily:"'Cabinet Grotesk',sans-serif", background:"#050508", color:"#f0f0f0", minHeight:"100vh" }}>

      {/* — Efectos globales — */}
      <Cursor />
      <Starfield />

      {/* — Terminal — */}
      {showTerm && <Terminal onClose={() => setShowTerm(false)} t={t} />}

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
            <button onClick={() => setShowTerm(true)} className="nav-term-btn">
              {t.nav.terminal}
            </button>
          </li>
          <li><LangDropdown lang={lang} setLang={setLang} /></li>
          <li><a href="/cv.pdf" download className="nav-cv-btn">{t.nav.cv}</a></li>
        </ul>
      </nav>

      {/* ── SECCIONES ── */}
      <Hero
        mousePos={mousePos}
        t={t}
        onOpenTerminal={() => setShowTerm(true)}
      />
      <About
        t={t}
        sLabel={sLabel}
        sH2={sH2}
      />
      <Skills
        t={t}
        sLabel={sLabel}
        sH2={sH2}
      />
      <Projects
        lang={lang}
        t={t}
        sLabel={sLabel}
        sH2={sH2}
      />
      <Experience
        lang={lang}
        t={t}
        sLabel={sLabel}
        sH2={sH2}
      />
      <Certificates
        t={t}
        sLabel={sLabel}
        sH2={sH2}
      />
      <Contact
        t={t}
        sLabel={sLabel}
        sH2={sH2}
        formData={formData}
        formStatus={formStatus}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />

      {/* ── FOOTER ── */}
      <footer style={{ borderTop:"1px solid rgba(255,255,255,.04)", padding:"1.75rem 3rem", display:"flex", alignItems:"center", justifyContent:"space-between", color:"#333", fontSize:".78rem" }}>
        <span style={{ fontFamily:"'JetBrains Mono',monospace", letterSpacing:".06em" }}>© 2026 Joan Francisco Rojas Varela</span>
        <span>{t.footer.made} Costa Rica 🇨🇷</span>
        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".68rem" }}>v2.0.0</span>
      </footer>
    </div>
  );
}
