// ============================================================
//  components/widgets/GitHubStats.jsx
// ============================================================
import { useState, useEffect } from "react";

export function GitHubStats({ username, t }) {
  const [data,   setData]   = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`, {
      headers: { "Accept": "application/vnd.github+json" },
    })
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(d => { if (d.message) throw new Error(); setData(d); setStatus("ok"); })
      .catch(() => setStatus("error"));
  }, [username]);

  const shimmer = {
    background:         "linear-gradient(90deg,#111 25%,#1a1a1a 50%,#111 75%)",
    backgroundSize:     "200% 100%",
    animation:          "shimmer 1.5s infinite",
    borderRadius:       8,
    height:             28,
  };

  const statsData = data
    ? [
        { val: data.public_repos, label: "REPOS",     color: "#ff3cac" },
        { val: data.followers,    label: "FOLLOWERS",  color: "#2de2e6" },
        { val: data.following,    label: "FOLLOWING",  color: "#f6f740" },
      ]
    : [
        { val: "4+", label: "REPOS",     color: "#ff3cac" },
        { val: "3",  label: "FOLLOWERS",  color: "#2de2e6" },
        { val: "5",  label: "FOLLOWING",  color: "#f6f740" },
      ];

  return (
    <div style={{ background: "#0b0b12", border: "1px solid rgba(255,255,255,.07)", borderRadius: 20, padding: "1.5rem", fontFamily: "'JetBrains Mono',monospace" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.25rem" }}>
        <i className="devicon-github-original" style={{ fontSize: "1rem", color: "#888" }} />
        <span style={{ fontSize: ".62rem", color: "#ff3cac", letterSpacing: ".15em" }}>github.com/{username}</span>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: status === "ok" ? "#4ade80" : "#f6f740", boxShadow: `0 0 8px ${status === "ok" ? "#4ade80" : "#f6f740"}`, animation: "blink 2s infinite", flexShrink: 0 }} />
      </div>

      {status === "loading"
        ? <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem", marginBottom: "1.25rem" }}>{[0,1,2].map(i => <div key={i} style={shimmer} />)}</div>
        : <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem", marginBottom: "1.25rem" }}>
            {statsData.map(s => (
              <div key={s.label} style={{ textAlign: "center", background: "rgba(255,255,255,.03)", borderRadius: 12, padding: ".85rem .5rem" }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.4rem", color: s.color, lineHeight: 1 }}>{s.val}</div>
                <div style={{ fontSize: ".58rem", color: "#555", letterSpacing: ".1em", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
      }

      <div style={{ paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,.05)", fontSize: ".72rem", color: "#555", lineHeight: 1.6 }}>
        {status === "ok" && data?.bio ? data.bio : t.about.githubBio}
      </div>

      <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer"
        style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: "1rem", fontSize: ".68rem", color: "#2de2e6", textDecoration: "none", letterSpacing: ".06em" }}>
        {t.about.githubLabel}
      </a>
    </div>
  );
}
