// ============================================================
//  components/ui/LangDropdown.jsx
//  Dropdown para cambiar el idioma del portfolio.
// ============================================================
import { useState, useRef, useEffect } from "react";
import { LANGUAGES } from "../../translations";

export function LangDropdown({ lang, setLang }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = LANGUAGES.find(l => l.code === lang);

  useEffect(() => {
    const handler = e => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="lang-dropdown" ref={ref}>
      <button
        className={`lang-trigger${open ? " open" : ""}`}
        onClick={() => setOpen(o => !o)}
      >
        <span>{current.flag}</span>
        <span>{current.code.toUpperCase()}</span>
        <span style={{ fontSize: ".6rem", opacity: 0.6 }}>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="lang-menu">
          {LANGUAGES.map(l => (
            <button
              key={l.code}
              className={`lang-option${lang === l.code ? " active" : ""}`}
              onClick={() => { setLang(l.code); setOpen(false); }}
            >
              <span>{l.flag}</span>
              <span>{l.label}</span>
              {lang === l.code && (
                <span style={{ marginLeft: "auto", color: "#ff3cac" }}>✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
