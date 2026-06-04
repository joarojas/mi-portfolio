// ============================================================
//  components/sections/Certificates.jsx
//  Solo se renderiza si CERTIFICATES tiene elementos.
// ============================================================
import { CERTIFICATES } from "../../data";
import { Reveal } from "../ui/Reveal";
import { CertCard } from "../cards/CertCard";

export function Certificates({ t, sLabel, sH2 }) {
  if (!CERTIFICATES || CERTIFICATES.length === 0) return null;

  return (
    <section id="certificates" style={{ background: "#07070c", borderTop: "1px solid rgba(255,255,255,.03)" }}>
      <div className="section-container">
        <Reveal>{sLabel(5, t.certificates.label)}</Reveal>
        <Reveal>{sH2(t.certificates.title1, [t.certificates.title2, "#a855f7"])}</Reveal>
        <div className="cert-grid">
          {CERTIFICATES.map((cert, i) => (
            <CertCard key={i} cert={cert} i={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
