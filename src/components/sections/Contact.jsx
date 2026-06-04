// ============================================================
//  components/sections/Contact.jsx
// ============================================================
import { ME, CERTIFICATES } from "../../data";
import { Reveal } from "../ui/Reveal";

export function Contact({ t, sLabel, sH2, formData, formStatus, handleChange, handleSubmit }) {
  const hasCerts   = CERTIFICATES && CERTIFICATES.length > 0;
  const sectionNum = hasCerts ? 6 : 5;

  const LINKS = [
    { icon: "devicon-google-plain colored",   label: "Email",    val: ME.email,                  href: `mailto:${ME.email}`,                                         color: "#ff3cac" },
    { icon: "devicon-linkedin-plain colored", label: "LinkedIn", val: ME.linkedin,               href: "https://www.linkedin.com/in/joan-francisco-rojas-varela",    color: "#2de2e6" },
    { icon: "devicon-github-original",        label: "GitHub",   val: `github.com/${ME.github}`, href: `https://github.com/${ME.github}`,                            color: "#a855f7" },
  ];

  return (
    <section id="contact" style={{ background: hasCerts ? "#050508" : "#07070c", borderTop: "1px solid rgba(255,255,255,.03)" }}>
      <div className="section-container">
        <Reveal>{sLabel(sectionNum, t.contact.label)}</Reveal>
        <div className="contact-grid">

          {/* Info */}
          <div>
            <Reveal>{sH2(t.contact.title)}</Reveal>
            <Reveal delay={80}>
              <p style={{ color:"#555", lineHeight:1.85, fontWeight:300, marginBottom:"2.5rem" }}>{t.contact.desc}</p>
            </Reveal>
            <div style={{ display:"flex", flexDirection:"column", gap:".85rem" }}>
              {LINKS.map((c, i) => (
                <Reveal key={c.label} delay={i * 70}>
                  <a href={c.href} target="_blank" rel="noreferrer" className="contact-row"
                    style={{ display:"flex", alignItems:"center", gap:"1rem", padding:".9rem 1.2rem", borderRadius:14, background:"#0b0b11", border:"1px solid rgba(255,255,255,.05)", textDecoration:"none", color:"#f0f0f0", transition:"all .25s" }}>
                    <div style={{ width:38, height:38, borderRadius:10, background:c.color+"14", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                      <i className={c.icon} style={{ fontSize:"1.2rem" }} />
                    </div>
                    <div>
                      <div style={{ fontSize:".65rem", color:"#444", letterSpacing:".08em", fontFamily:"'JetBrains Mono',monospace" }}>{c.label.toUpperCase()}</div>
                      <div style={{ fontSize:".88rem", color:c.color, fontWeight:500, marginTop:2 }}>{c.val}</div>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Formulario */}
          <Reveal delay={150}>
            <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:"1rem" }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem" }}>
                <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  <label style={{ fontSize:".65rem", color:"#444", letterSpacing:".12em", fontFamily:"'JetBrains Mono',monospace" }}>{t.contact.nameLabel}</label>
                  <input type="text" name="name" required placeholder={t.contact.namePh} value={formData.name} onChange={handleChange}
                    style={{ background:"#0b0b11", border:"1px solid rgba(255,255,255,.07)", borderRadius:10, padding:".7rem .9rem", color:"#f0f0f0", fontFamily:"'Cabinet Grotesk',sans-serif", fontSize:".9rem", transition:"border-color .2s" }} />
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  <label style={{ fontSize:".65rem", color:"#444", letterSpacing:".12em", fontFamily:"'JetBrains Mono',monospace" }}>{t.contact.emailLabel}</label>
                  <input type="email" name="email" required placeholder="tu@email.com" value={formData.email} onChange={handleChange}
                    style={{ background:"#0b0b11", border:"1px solid rgba(255,255,255,.07)", borderRadius:10, padding:".7rem .9rem", color:"#f0f0f0", fontFamily:"'Cabinet Grotesk',sans-serif", fontSize:".9rem", transition:"border-color .2s" }} />
                </div>
              </div>

              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                <label style={{ fontSize:".65rem", color:"#444", letterSpacing:".12em", fontFamily:"'JetBrains Mono',monospace" }}>{t.contact.msgLabel}</label>
                <textarea name="message" required rows={5} placeholder={t.contact.msgPh} value={formData.message} onChange={handleChange}
                  style={{ background:"#0b0b11", border:"1px solid rgba(255,255,255,.07)", borderRadius:10, padding:".7rem .9rem", color:"#f0f0f0", fontFamily:"'Cabinet Grotesk',sans-serif", fontSize:".9rem", resize:"vertical", transition:"border-color .2s" }} />
              </div>

              {formStatus === "error" && (
                <div style={{ fontSize:".8rem", color:"#ff6b6b", fontFamily:"'JetBrains Mono',monospace", textAlign:"center", padding:".5rem", borderRadius:8, background:"rgba(255,107,107,.08)", border:"1px solid rgba(255,107,107,.2)" }}>
                  {t.contact.errorMsg}
                </div>
              )}

              <button type="submit" disabled={formStatus === "sending"}
                style={{
                  alignSelf:  "center",
                  padding:    ".8rem 2rem",
                  borderRadius: 999,
                  background: formStatus === "sent"    ? "#4ade80"
                            : formStatus === "error"   ? "#ff6b6b"
                            : formStatus === "sending" ? "rgba(255,60,172,.4)"
                            : "linear-gradient(135deg,#ff3cac,#a855f7)",
                  color:      (formStatus === "sent" || formStatus === "error") ? "#000" : "#fff",
                  fontFamily: "'Cabinet Grotesk',sans-serif",
                  fontWeight: 800,
                  fontSize:   ".9rem",
                  border:     "none",
                  cursor:     formStatus === "sending" ? "wait" : "none",
                  transition: "all .4s",
                  opacity:    formStatus === "sending" ? 0.7 : 1,
                  boxShadow:  formStatus === "sent"
                    ? "0 0 30px rgba(74,222,128,.4)"
                    : "0 0 30px rgba(255,60,172,.3)",
                }}>
                {formStatus === "sending" ? t.contact.btnSending
                  : formStatus === "sent"    ? t.contact.btnSent
                  : formStatus === "error"   ? t.contact.btnError
                  : t.contact.btnIdle}
              </button>
            </form>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
