// ============================================================
//  components/cards/CertCard.jsx
// ============================================================
import { tx } from "../../utils/tx";

export function CertCard({ cert, i, t }) {
  return (
    <div className="cert-card">
      {cert.image && (
        <div style={{ width:"100%", height:140, borderRadius:12, overflow:"hidden", marginBottom:4 }}>
          <img src={cert.image} alt={tx(cert.title, t.__lang)} style={{ width:"100%", height:"100%", objectFit:"cover" }} />
        </div>
      )}

      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".65rem", color:cert.color||"#ff3cac", letterSpacing:".1em" }}>
          {tx(cert.issuer, t.__lang)}
        </span>
        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".6rem", color:"#444" }}>
          {tx(cert.date, t.__lang)}
        </span>
      </div>

      <h3 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"1.3rem", color:"#f0f0f0", letterSpacing:".04em", lineHeight:1.1 }}>
        {tx(cert.title, t.__lang)}
      </h3>

      {cert.url && (
        <a href={cert.url} target="_blank" rel="noreferrer"
          style={{ display:"inline-flex", alignItems:"center", gap:6, marginTop:4, fontSize:".72rem", color:cert.color||"#ff3cac", textDecoration:"none", fontFamily:"'JetBrains Mono',monospace", letterSpacing:".05em" }}>
          {t.certificates.verify}
        </a>
      )}
    </div>
  );
}
