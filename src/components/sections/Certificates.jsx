// ============================================================
//  components/sections/Certificates.jsx
//  Se renderiza solo si CERTIFICATES tiene elementos.
// ============================================================
import { CERTIFICATES } from "../../data";
import { Reveal }       from "../ui/Reveal";
import { SectionLabel } from "../ui/SectionLabel";
import { SectionTitle } from "../ui/SectionTitle";
import { CertCard }     from "../cards/CertCard";

export function Certificates({ t }) {
  if (!CERTIFICATES?.length) return null;

  return (
    <section id="certificates" style={{ background:"#07070c", borderTop:"1px solid rgba(255,255,255,.03)" }}>
      <div className="section-container">
        <Reveal><SectionLabel n={5} text={t.certificates.label} /></Reveal>
        <Reveal><SectionTitle line1={t.certificates.title1} line2={t.certificates.title2} accentColor="#a855f7" /></Reveal>
        <div className="cert-grid">
          {CERTIFICATES.map((cert, i) => (
            <CertCard key={i} cert={cert} i={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
