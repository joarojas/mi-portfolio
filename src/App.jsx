import { useState, useEffect, useRef, useCallback } from "react";
import { ME, PROJECTS, SKILLS, EXPERIENCE, TERMINAL_COMMANDS } from "./data";

const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cabinet+Grotesk:wght@300;400;500;700;800;900&family=JetBrains+Mono:wght@300;400&display=swap');
    @import url('https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: #050508; overflow-x: hidden; cursor: none; }
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: #050508; }
    ::-webkit-scrollbar-thumb { background: #ff3cac; border-radius: 2px; }
    @keyframes blink       { 50%{opacity:0} }
    @keyframes heroIn      { from{opacity:0;transform:translateY(50px)} to{opacity:1;transform:none} }
    @keyframes orbit       { from{transform:rotate(0deg) translateX(130px) rotate(0deg)} to{transform:rotate(360deg) translateX(130px) rotate(-360deg)} }
    @keyframes orbit2      { from{transform:rotate(120deg) translateX(162px) rotate(-120deg)} to{transform:rotate(480deg) translateX(162px) rotate(-480deg)} }
    @keyframes orbit3      { from{transform:rotate(240deg) translateX(108px) rotate(-240deg)} to{transform:rotate(600deg) translateX(108px) rotate(-600deg)} }
    @keyframes ringRotate  { from{transform:rotateX(70deg) rotateZ(0deg)} to{transform:rotateX(70deg) rotateZ(360deg)} }
    @keyframes ringRotate2 { from{transform:rotateX(70deg) rotateZ(45deg)} to{transform:rotateX(70deg) rotateZ(405deg)} }
    @keyframes floatY      { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
    @keyframes pulseGlow   { 0%,100%{box-shadow:0 0 20px rgba(255,60,172,.3),0 0 60px rgba(255,60,172,.1)} 50%{box-shadow:0 0 40px rgba(255,60,172,.6),0 0 100px rgba(255,60,172,.2)} }
    @keyframes gridPulse   { 0%,100%{opacity:.03} 50%{opacity:.06} }
    @keyframes scanH       { 0%{top:-2px} 100%{top:100%} }
    @keyframes termCursor  { 50%{opacity:0} }
    @keyframes slideDown   { from{opacity:0;transform:translateY(-20px)} to{opacity:1;transform:none} }
    @keyframes shimmer     { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
    .nav-a { color:#444; text-decoration:none; font-size:.85rem; font-weight:700; letter-spacing:.05em; transition:color .2s; }
    .nav-a:hover { color:#f0f0f0; }
    .nav-a.active { color:#ff3cac; }
    .skill-card:hover  { transform:translateY(-5px) !important; }
    .proj-card:hover   { transform:translateY(-10px) !important; }
    .contact-row:hover { transform:translateX(10px) !important; border-color:rgba(255,60,172,.25) !important; }
    input:focus, textarea:focus { border-color:rgba(255,60,172,.5) !important; outline:none; }
    ::selection { background:rgba(255,60,172,.3); }
    .term-input { background:transparent; border:none; outline:none; color:#f0f0f0; font-family:'JetBrains Mono',monospace; font-size:.88rem; flex:1; caret-color:#ff3cac; }
    .term-line  { line-height:1.7; font-size:.85rem; }
    .di { font-size:1.4rem; line-height:1; }
    .di-sm { font-size:1.1rem; line-height:1; }
  `}</style>
);

/* ── Devicon helper ── */
function DevIcon({ icon, iconText, size = "1.4rem", color }) {
  if (icon) return <i className={`${icon}`} style={{ fontSize: size, lineHeight: 1 }} />;
  return (
    <span style={{ fontSize: "0.65rem", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, color: color || "#888", letterSpacing: "0.05em" }}>
      {iconText}
    </span>
  );
}

/* ── CUSTOM CURSOR ── */
function Cursor() {
  const dot = useRef(null), ring = useRef(null);
  const pos = useRef({ x: 0, y: 0 }), rpos = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const mv = e => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", mv);
    let raf;
    const tick = () => {
      rpos.current.x += (pos.current.x - rpos.current.x) * .12;
      rpos.current.y += (pos.current.y - rpos.current.y) * .12;
      if (dot.current)  { dot.current.style.left  = pos.current.x + "px"; dot.current.style.top  = pos.current.y + "px"; }
      if (ring.current) { ring.current.style.left = rpos.current.x + "px"; ring.current.style.top = rpos.current.y + "px"; }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { window.removeEventListener("mousemove", mv); cancelAnimationFrame(raf); };
  }, []);
  const base = { position: "fixed", borderRadius: "50%", pointerEvents: "none", zIndex: 9999, transform: "translate(-50%,-50%)" };
  return (<>
    <div ref={dot}  style={{ ...base, width: 6,  height: 6,  background: "#ff3cac", boxShadow: "0 0 10px #ff3cac" }} />
    <div ref={ring} style={{ ...base, width: 32, height: 32, border: "1px solid rgba(255,60,172,.5)" }} />
  </>);
}

/* ── STARFIELD ── */
function Starfield() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, ctx = c.getContext("2d");
    let W = c.width = window.innerWidth, H = c.height = window.innerHeight;
    const resize = () => { W = c.width = window.innerWidth; H = c.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    const stars = Array.from({ length: 220 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 1.2 + .2, t: Math.random() * Math.PI * 2, s: Math.random() * .012 + .004,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      stars.forEach(s => { s.t += s.s; const a = (Math.sin(s.t) + 1) / 2 * .7 + .1; ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(255,255,255,${a})`; ctx.fill(); });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}

/* ── PARTICLES ── */
function ParticleCanvas({ mousePos }) {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, ctx = c.getContext("2d");
    let W = c.width = window.innerWidth, H = c.height = window.innerHeight;
    window.addEventListener("resize", () => { W = c.width = window.innerWidth; H = c.height = window.innerHeight; });
    const cols = ["#ff3cac", "#2de2e6", "#f6f740", "#a855f7"];
    const pts = Array.from({ length: 55 }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3, r: Math.random() * 1.4 + .3, color: cols[Math.floor(Math.random() * 4)], a: Math.random() * .4 + .1 }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const { x: mx, y: my } = mousePos.current;
      pts.forEach(p => {
        const dx = p.x - mx, dy = p.y - my, d = Math.hypot(dx, dy);
        if (d < 100) { const f = (100 - d) / 100; p.vx += (dx / d) * f * .3; p.vy += (dy / d) * f * .3; }
        p.vx *= .97; p.vy *= .97; p.x = (p.x + p.vx + W) % W; p.y = (p.y + p.vy + H) % H;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = p.color; ctx.globalAlpha = p.a; ctx.fill();
      });
      pts.forEach((a, i) => pts.slice(i + 1).forEach(b => { const d = Math.hypot(a.x - b.x, a.y - b.y); if (d < 85) { ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.strokeStyle = a.color; ctx.globalAlpha = (1 - d / 85) * .07; ctx.lineWidth = .5; ctx.stroke(); } }));
      ctx.globalAlpha = 1; raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}

/* ── ORBITAL PHOTO ── */
function OrbitalPhoto() {
  const orbiters = [
    { anim: "orbit 6s linear infinite",  color: "#ff3cac", icon: "devicon-react-original colored",  sz: 30 },
    { anim: "orbit2 9s linear infinite", color: "#2de2e6", icon: "devicon-python-plain colored",     sz: 28 },
    { anim: "orbit3 7s linear infinite", color: "#f6f740", icon: "devicon-nodejs-plain colored",     sz: 28 },
  ];
  return (
    <div style={{ position: "relative", width: 340, height: 340, display: "flex", alignItems: "center", justifyContent: "center", animation: "floatY 4s ease-in-out infinite" }}>
      <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", border: "1px solid rgba(255,60,172,.2)", animation: "ringRotate 12s linear infinite", transformStyle: "preserve-3d" }} />
      <div style={{ position: "absolute", width: 340, height: 340, borderRadius: "50%", border: "1px solid rgba(45,226,230,.15)", animation: "ringRotate2 18s linear infinite", transformStyle: "preserve-3d" }} />
      {orbiters.map((o, i) => (
        <div key={i} style={{ position: "absolute", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ animation: o.anim, width: o.sz + 12, height: o.sz + 12, borderRadius: "50%", background: o.color + "22", border: `1px solid ${o.color}66`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <i className={o.icon} style={{ fontSize: o.sz * .7 }} />
          </div>
        </div>
      ))}
      <div style={{ position: "absolute", width: 220, height: 220, borderRadius: "50%", background: "radial-gradient(circle,rgba(255,60,172,.15),transparent 70%)", filter: "blur(20px)" }} />
      <div style={{ width: 200, height: 200, borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(255,60,172,.4)", boxShadow: "0 0 40px rgba(255,60,172,.25),0 0 80px rgba(45,226,230,.1)", animation: "pulseGlow 3s ease-in-out infinite", position: "relative", zIndex: 2 }}>
        <div style={{ position: "absolute", inset: 0, zIndex: 3, pointerEvents: "none", background: "repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,.07) 3px,rgba(0,0,0,.07) 4px)" }} />
        <div style={{ position: "absolute", left: 0, right: 0, height: 2, background: "rgba(255,60,172,.3)", zIndex: 4, animation: "scanH 3s linear infinite" }} />
        <img src={ME.photo} alt={ME.name} style={{ width: "100%", height: "100%", objectFit: "cover", filter: "contrast(1.05) saturate(.9)" }} />
      </div>
      {[[-10, -10, "top", "left"], [-10, null, "top", "right"], [null, -10, "bottom", "left"], [null, null, "bottom", "right"]].map(([t, l, vt, hl], i) => (
        <div key={i} style={{ position: "absolute", top: t !== null ? t : undefined, left: l !== null ? l : undefined, bottom: t === null ? -10 : undefined, right: l === null ? -10 : undefined, width: 18, height: 18, borderTop: vt === "top" ? "2px solid #2de2e6" : "none", borderBottom: vt === "bottom" ? "2px solid #2de2e6" : "none", borderLeft: hl === "left" ? "2px solid #2de2e6" : "none", borderRight: hl === "right" ? "2px solid #2de2e6" : "none", zIndex: 5 }} />
      ))}
    </div>
  );
}

/* ── TYPEWRITER ── */
function Typewriter() {
  const [text, setText] = useState(""); const [idx, setIdx] = useState(0); const [del, setDel] = useState(false);
  useEffect(() => {
    const role = ME.roles[idx];
    const t = setTimeout(() => {
      if (!del && text === role) { setTimeout(() => setDel(true), 1800); return; }
      if (del && text === "") { setDel(false); setIdx(i => (i + 1) % ME.roles.length); return; }
      setText(p => del ? p.slice(0, -1) : role.slice(0, p.length + 1));
    }, del ? 35 : 75);
    return () => clearTimeout(t);
  }, [text, del, idx]);
  return (
    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "clamp(.9rem,1.8vw,1.15rem)", color: "#2de2e6", fontWeight: 300 }}>
      <span style={{ color: "#444" }}>$ </span>{text}
      <span style={{ borderRight: "2px solid #ff3cac", marginLeft: 3, animation: "blink .9s step-end infinite" }}>&nbsp;</span>
    </span>
  );
}

/* ── GLITCH NAME ── */
function GlitchName({ name }) {
  const [g, setG] = useState(false);
  useEffect(() => { const iv = setInterval(() => { setG(true); setTimeout(() => setG(false), 150); }, 3500); return () => clearInterval(iv); }, []);
  const s = { fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(4rem,11vw,10rem)", lineHeight: .9, letterSpacing: "-.01em", color: "#f0f0f0", display: "block" };
  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <span style={s}>{name}</span>
      {g && <><span style={{ ...s, position: "absolute", top: 0, left: "3px", color: "#ff3cac", clipPath: "polygon(0 20%,100% 20%,100% 38%,0 38%)", opacity: .9 }}>{name}</span><span style={{ ...s, position: "absolute", top: 0, left: "-3px", color: "#2de2e6", clipPath: "polygon(0 58%,100% 58%,100% 72%,0 72%)", opacity: .9 }}>{name}</span></>}
    </div>
  );
}

/* ── MAGNETIC BTN ── */
function MagBtn({ children, href, bg, color, glow, download: dl }) {
  const ref = useRef(null);
  const onMove = e => { const r = ref.current.getBoundingClientRect(); ref.current.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .3}px,${(e.clientY - r.top - r.height / 2) * .3}px)`; };
  const onLeave = () => { ref.current.style.transform = "translate(0,0)"; };
  return (
    <a ref={ref} href={href} download={dl} onMouseMove={onMove} onMouseLeave={onLeave}
      style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: ".85rem 2rem", borderRadius: 999, fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 800, fontSize: ".9rem", textDecoration: "none", cursor: "none", transition: "transform .35s cubic-bezier(.23,1,.32,1)", background: bg, color, boxShadow: glow || "none", border: bg === "transparent" ? "1px solid rgba(255,255,255,.12)" : "none" }}>
      {children}
    </a>
  );
}

/* ── REVEAL ── */
function Reveal({ children, delay = 0 }) {
  const ref = useRef(null); const [v, setV] = useState(false);
  useEffect(() => { const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold: .08 }); obs.observe(ref.current); return () => obs.disconnect(); }, []);
  return <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "none" : "translateY(28px)", transition: `opacity .8s ease ${delay}ms,transform .8s ease ${delay}ms` }}>{children}</div>;
}

/* ── GITHUB STATS ── */
function GitHubStats({ username }) {
  const [data, setData] = useState(null); const [status, setStatus] = useState("loading");
  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`, { headers: { "Accept": "application/vnd.github+json" } })
      .then(r => { if (!r.ok) throw new Error(); return r.json(); })
      .then(d => { if (d.message) throw new Error(); setData(d); setStatus("ok"); })
      .catch(() => setStatus("error"));
  }, [username]);
  const shimmer = { background: "linear-gradient(90deg,#111 25%,#1a1a1a 50%,#111 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite", borderRadius: 8, height: 28 };
  const fallback = [{ val: "1+", label: "REPOS", color: "#ff3cac" }, { val: "3", label: "SEGUIDORES", color: "#2de2e6" }, { val: "5", label: "SIGUIENDO", color: "#f6f740" }];
  const live     = data ? [{ val: data.public_repos, label: "REPOS", color: "#ff3cac" }, { val: data.followers, label: "SEGUIDORES", color: "#2de2e6" }, { val: data.following, label: "SIGUIENDO", color: "#f6f740" }] : [];

  return (
    <div style={{ background: "#0b0b12", border: "1px solid rgba(255,255,255,.07)", borderRadius: 20, padding: "1.5rem", fontFamily: "'JetBrains Mono',monospace" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: "1.25rem" }}>
        <i className="devicon-github-original" style={{ fontSize: "1rem", color: "#888" }} />
        <span style={{ fontSize: ".62rem", color: "#ff3cac", letterSpacing: ".15em" }}>github.com/{username}</span>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: status === "ok" ? "#4ade80" : status === "loading" ? "#f6f740" : "#ff3cac", boxShadow: `0 0 8px ${status === "ok" ? "#4ade80" : "#f6f740"}`, animation: "blink 2s infinite", flexShrink: 0 }} />
      </div>
      {status === "loading" && <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem", marginBottom: "1.25rem" }}>{[0, 1, 2].map(i => <div key={i} style={shimmer} />)}</div>}
      {(status === "ok" || status === "error") && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem", marginBottom: "1.25rem" }}>
          {(status === "ok" ? live : fallback).map(s => (
            <div key={s.label} style={{ textAlign: "center", background: "rgba(255,255,255,.03)", borderRadius: 12, padding: ".85rem .5rem" }}>
              <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.4rem", color: s.color, lineHeight: 1 }}>{s.val}</div>
              <div style={{ fontSize: ".58rem", color: "#555", letterSpacing: ".1em", marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      )}
      <div style={{ paddingTop: "1rem", borderTop: "1px solid rgba(255,255,255,.05)", fontSize: ".72rem", color: "#555", lineHeight: 1.6 }}>
        {status === "ok" && data?.bio ? data.bio : "Estudiante de tecnologías de la computación."}
      </div>
      <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, marginTop: "1rem", fontSize: ".68rem", color: "#2de2e6", textDecoration: "none", letterSpacing: ".06em" }}>
        VER PERFIL EN GITHUB →
      </a>
    </div>
  );
}

/* ── TERMINAL ── */
function Terminal({ onClose }) {
  const [lines, setLines] = useState([{ t: "cmd", v: "Bienvenido al sistema JOAN.DEV v1.0.0" }, { t: "muted", v: 'Escribe "help" para ver los comandos disponibles.' }]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null); const inputRef = useRef(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [lines]);
  useEffect(() => { inputRef.current?.focus(); }, []);
  const run = cmd => {
    const c = cmd.trim().toLowerCase();
    const newLines = [{ t: "prompt", v: `guest@joan.dev:~$ ${cmd}` }];
    if (c === "clear") { setLines([{ t: "muted", v: 'Terminal limpiada. Escribe "help" para continuar.' }]); setInput(""); return; }
    if (!c) { setLines(p => [...p, ...newLines]); setInput(""); return; }
    const fn = TERMINAL_COMMANDS[c];
    const result = fn ? fn() : [{ t: "error", v: `Comando no encontrado: "${c}". Escribe "help".` }];
    setLines(p => [...p, ...newLines, ...result]); setInput("");
  };
  const colMap = { cmd: "#f6f740", info: "#a8a8b3", accent: "#ff3cac", muted: "#555", prompt: "#2de2e6", error: "#ff6b6b" };
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,.85)", backdropFilter: "blur(12px)" }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ width: "min(760px,95vw)", maxHeight: "80vh", background: "#08080f", border: "1px solid rgba(255,60,172,.3)", borderRadius: 20, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 0 80px rgba(255,60,172,.15)", animation: "slideDown .3s ease" }}>
        <div style={{ display: "flex", alignItems: "center", padding: ".85rem 1.25rem", background: "#0d0d16", borderBottom: "1px solid rgba(255,255,255,.06)", gap: 8 }}>
          <div onClick={onClose} style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57", cursor: "none" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".72rem", color: "#555", marginLeft: 12, letterSpacing: ".08em" }}>joan@joan.dev — terminal</span>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "1.25rem 1.5rem", display: "flex", flexDirection: "column", gap: 3 }} onClick={() => inputRef.current?.focus()}>
          {lines.map((l, i) => <div key={i} className="term-line" style={{ fontFamily: "'JetBrains Mono',monospace", color: colMap[l.t] || "#a8a8b3", whiteSpace: "pre-wrap" }}>{l.v}</div>)}
          <div ref={bottomRef} />
        </div>
        <div style={{ display: "flex", alignItems: "center", padding: ".85rem 1.5rem", borderTop: "1px solid rgba(255,255,255,.05)", background: "#0d0d16", gap: 8 }}>
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".88rem", color: "#2de2e6", flexShrink: 0 }}>guest@joan.dev:~$</span>
          <input ref={inputRef} className="term-input" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter") run(input); }} placeholder="escribe un comando..." />
          <span style={{ width: 8, height: 16, background: "#ff3cac", animation: "termCursor 1s step-end infinite", flexShrink: 0 }} />
        </div>
      </div>
    </div>
  );
}

/* ── PROJECT CARD ── */
function ProjCard({ p, i }) {
  const [h, setH] = useState(false);
  return (
    <Reveal delay={i * 100}>
      <div className="proj-card" onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
        style={{ background: h ? "#0e0e14" : "#09090e", border: `1px solid ${h ? p.accent : "rgba(255,255,255,.06)"}`, borderRadius: 24, overflow: "hidden", transition: "all .4s cubic-bezier(.23,1,.32,1)", boxShadow: h ? `0 30px 80px ${p.accent}1a` : "none", display: "flex", flexDirection: "column" }}>
        {/* Banner con logo o imagen */}
        <div style={{ height: 180, display: "flex", alignItems: "center", justifyContent: "center", background: `radial-gradient(ellipse at 60% 40%,${p.accent}14,transparent 65%),#08080d`, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, opacity: h ? .05 : 0, transition: "opacity .4s", backgroundImage: `repeating-linear-gradient(0deg,${p.accent},${p.accent} 1px,transparent 1px,transparent 36px)` }} />
          {p.image
            ? <img src={p.image} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: .8 }} />
            : <i className={p.icon} style={{ fontSize: "4rem", filter: `drop-shadow(0 0 20px ${p.accent}66)` }} />
          }
          <div style={{ position: "absolute", bottom: 10, right: 14, fontFamily: "'JetBrains Mono',monospace", fontSize: ".6rem", color: p.accent, opacity: .5 }}>0{i + 1}</div>
        </div>
        <div style={{ padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
          {/* Tags con Devicons */}
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
            {p.tags.map(tag => (
              <span key={tag.name} style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: ".72rem", fontWeight: 600, padding: "3px 10px", borderRadius: 999, background: `${p.accent}14`, color: p.accent, border: `1px solid ${p.accent}28` }}>
                {tag.icon
                  ? <i className={tag.icon} style={{ fontSize: ".9rem" }} />
                  : <span style={{ fontSize: ".6rem", fontFamily: "'JetBrains Mono',monospace" }}>{tag.iconText}</span>
                }
                {tag.name}
              </span>
            ))}
          </div>
          <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.7rem", color: "#f0f0f0", letterSpacing: ".04em" }}>{p.title}</h3>
          <p style={{ color: "#666", fontSize: ".88rem", lineHeight: 1.65, flex: 1 }}>{p.desc}</p>
          <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
            <a href={p.demo} style={{ flex: 1, textAlign: "center", padding: ".55rem", borderRadius: 10, background: p.accent, color: "#000", fontWeight: 800, fontSize: ".8rem", fontFamily: "'Cabinet Grotesk',sans-serif", textDecoration: "none" }}>Demo →</a>
            <a href={p.repo} target="_blank" rel="noreferrer" style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: ".55rem", borderRadius: 10, background: "transparent", color: "#888", fontWeight: 700, fontSize: ".8rem", fontFamily: "'Cabinet Grotesk',sans-serif", textDecoration: "none", border: "1px solid rgba(255,255,255,.08)" }}>
              <i className="devicon-github-original" style={{ fontSize: ".9rem" }} /> GitHub
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ── SKILL CARD ── */
function SkillCard({ sk, i }) {
  return (
    <Reveal delay={i * 70}>
      <div className="skill-card" style={{ background: "#0b0b11", border: "1px solid rgba(255,255,255,.05)", borderRadius: 20, padding: "1.5rem", transition: "border-color .3s,transform .3s" }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = sk.color + "33"; e.currentTarget.style.transform = "translateY(-5px)"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,.05)"; e.currentTarget.style.transform = "none"; }}>
        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1rem", color: sk.color, letterSpacing: ".1em", marginBottom: "1.1rem" }}>{sk.cat}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {sk.items.map(item => (
            <div key={item.name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5, padding: "8px 12px", borderRadius: 12, background: sk.color + "0c", border: `1px solid ${sk.color}18`, transition: "all .2s", cursor: "default" }}
              onMouseEnter={e => { e.currentTarget.style.background = sk.color + "1a"; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = sk.color + "0c"; e.currentTarget.style.transform = "none"; }}>
              {/* Ícono */}
              <div style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {item.icon
                  ? <i className={item.icon} style={{ fontSize: "1.6rem" }} />
                  : <span style={{ fontSize: ".65rem", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, color: sk.color, letterSpacing: ".04em" }}>{item.iconText}</span>
                }
              </div>
              {/* Nombre */}
              <span style={{ fontSize: ".65rem", color: "#777", fontFamily: "'JetBrains Mono',monospace", letterSpacing: ".04em", whiteSpace: "nowrap" }}>{item.name}</span>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/* ══ MAIN APP ══ */
const NAV_ITEMS = [["Inicio","#hero"],["Sobre mí","#about"],["Skills","#skills"],["Proyectos","#projects"],["Experiencia","#experience"],["Contacto","#contact"]];

export default function Portfolio() {
  const mousePos = useRef({ x: -999, y: -999 });
  const [activeNav, setActiveNav] = useState(0);
  const [showTerm,  setShowTerm]  = useState(false);
  const [sent,      setSent]      = useState(false);
  const handleMouse = useCallback(e => { mousePos.current = { x: e.clientX, y: e.clientY }; }, []);

  useEffect(() => { window.addEventListener("mousemove", handleMouse); return () => window.removeEventListener("mousemove", handleMouse); }, []);
  useEffect(() => {
    const ids = ["hero","about","skills","projects","experience","contact"];
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) setActiveNav(ids.indexOf(e.target.id)); }), { threshold: .35 });
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    const seq = [38,38,40,40,37,39,37,39,66,65]; let pos = 0;
    const kd = e => { pos = e.keyCode === seq[pos] ? pos + 1 : 0; if (pos === seq.length) { setShowTerm(true); pos = 0; } };
    window.addEventListener("keydown", kd); return () => window.removeEventListener("keydown", kd);
  }, []);

  const sLabel = (n, txt) => (
    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".68rem", letterSpacing: ".2em", color: "#ff3cac", textTransform: "uppercase", marginBottom: "1rem", display: "flex", alignItems: "center", gap: 12 }}>
      <span style={{ width: 20, height: 1, background: "#ff3cac", display: "inline-block" }} />0{n} — {txt}
    </div>
  );
  const sH2 = (txt, accent) => (
    <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(2.8rem,5vw,4.5rem)", letterSpacing: ".03em", lineHeight: 1, marginBottom: "3rem", color: "#f0f0f0" }}>
      {txt}{accent && <><br /><span style={{ color: accent[1] }}>{accent[0]}</span></>}
    </h2>
  );

  return (
    <div style={{ fontFamily: "'Cabinet Grotesk',sans-serif", background: "#050508", color: "#f0f0f0", minHeight: "100vh" }} onMouseMove={handleMouse}>
      <FontLoader />
      <Cursor />
      <Starfield />
      {showTerm && <Terminal onClose={() => setShowTerm(false)} />}

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem 3rem", background: "rgba(5,5,8,.88)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,.04)" }}>
        <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.5rem", letterSpacing: ".08em", background: "linear-gradient(90deg,#ff3cac,#2de2e6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>JOAROJAS.DEV</div>
        <ul style={{ display: "flex", gap: "1.75rem", listStyle: "none", alignItems: "center" }}>
          {NAV_ITEMS.map(([lbl, href], i) => <li key={lbl}><a href={href} className={`nav-a${activeNav === i ? " active" : ""}`}>{lbl}</a></li>)}
          <li>
            <button onClick={() => setShowTerm(true)} style={{ padding: ".4rem 1rem", borderRadius: 999, background: "rgba(255,60,172,.1)", border: "1px solid rgba(255,60,172,.3)", color: "#ff3cac", fontFamily: "'JetBrains Mono',monospace", fontSize: ".72rem", cursor: "none", letterSpacing: ".06em", transition: "all .2s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,60,172,.2)"; }} onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,60,172,.1)"; }}>
              &gt;_ terminal
            </button>
          </li>
          <li><a href={ME.cv} download style={{ padding: ".4rem 1.1rem", borderRadius: 999, background: "#ff3cac", color: "#000", fontWeight: 800, fontSize: ".78rem", textDecoration: "none", fontFamily: "'Cabinet Grotesk',sans-serif" }}>↓ CV</a></li>
        </ul>
      </nav>

      {/* ═══ HERO ═══ */}
      <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden", padding: "0 3rem" }}>
        <ParticleCanvas mousePos={mousePos} />
        <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px)", backgroundSize: "60px 60px", animation: "gridPulse 4s ease-in-out infinite" }} />
        <div style={{ position: "absolute", top: "10%", right: "5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(168,85,247,.08),rgba(255,60,172,.04) 40%,transparent 70%)", filter: "blur(40px)", pointerEvents: "none", zIndex: 0 }} />
        <div style={{ position: "relative", zIndex: 2, maxWidth: 1150, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr auto", gap: "3rem", alignItems: "center" }}>
          <div>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: "2rem", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 999, padding: "7px 16px", animation: "heroIn .6s ease both" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", boxShadow: "0 0 8px #4ade80", animation: "blink 2s infinite" }} />
              <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".68rem", color: "#666", letterSpacing: ".12em" }}>OPEN TO WORK · {ME.location}</span>
            </div>
            <div style={{ animation: "heroIn .8s .1s ease both", animationFillMode: "both", opacity: 0 }}>
              <GlitchName name="JOAN" />
              <GlitchName name="ROJAS" />
            </div>
            <div style={{ marginTop: "1.2rem", marginBottom: "2rem", animation: "heroIn .8s .25s ease both", animationFillMode: "both", opacity: 0 }}><Typewriter /></div>
            <p style={{ maxWidth: 480, color: "#555", fontSize: "1rem", lineHeight: 1.8, marginBottom: "2.5rem", fontWeight: 300, animation: "heroIn .8s .4s ease both", animationFillMode: "both", opacity: 0 }}>
              Construyo software que importa. Estudiante de Ingeniería en Computación apasionado por el código limpio, los retos imposibles y el espacio exterior.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", animation: "heroIn .8s .55s ease both", animationFillMode: "both", opacity: 0 }}>
              <MagBtn href="#projects" bg="#ff3cac" color="#000" glow="0 0 40px rgba(255,60,172,.4)">Ver proyectos →</MagBtn>
              <MagBtn href="#contact"  bg="transparent" color="#f0f0f0">Hablemos</MagBtn>
              <MagBtn href={ME.cv}     bg="rgba(45,226,230,.08)" color="#2de2e6" download>↓ CV</MagBtn>
            </div>
            <div style={{ marginTop: "2rem", animation: "heroIn .8s .7s ease both", animationFillMode: "both", opacity: 0 }}>
              <button onClick={() => setShowTerm(true)} style={{ background: "transparent", border: "none", cursor: "none", padding: 0 }}>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".7rem", color: "#333", letterSpacing: ".1em" }}>&gt;_ prueba la <span style={{ color: "#ff3cac" }}>terminal interactiva</span></span>
              </button>
            </div>
          </div>
          <div style={{ animation: "heroIn .9s .3s ease both", animationFillMode: "both", opacity: 0 }}><OrbitalPhoto /></div>
        </div>
        <div style={{ position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: "#333", fontSize: ".6rem", letterSpacing: ".18em", zIndex: 2 }}>
          <span>SCROLL</span>
          <div style={{ width: 1, height: 50, background: "linear-gradient(to bottom,#ff3cac,transparent)" }} />
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section id="about" style={{ background: "#07070c", borderTop: "1px solid rgba(255,255,255,.03)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "7rem 2rem" }}>
          <Reveal>{sLabel(1, "Sobre mí")}</Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
            <div>
              <Reveal>{sH2("Código, café", ["y estrellas.", "#2de2e6"])}</Reveal>
              {ME.bio.map((p, i) => <Reveal key={i} delay={i * 70}><p style={{ color: "#555", lineHeight: 1.85, marginBottom: "1.2rem", fontWeight: 300, fontSize: "1rem" }} dangerouslySetInnerHTML={{ __html: p.replace("Joan Francisco Rojas Varela", "<span style='color:#f0f0f0;font-weight:500'>Joan Francisco Rojas Varela</span>").replace("ingeniería y diseño", "<span style='color:#f0f0f0;font-weight:500'>ingeniería y diseño</span>") }} /></Reveal>)}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <Reveal delay={100}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  {ME.stats.map(s => (
                    <div key={s.label} style={{ background: "#0b0b11", border: "1px solid rgba(255,255,255,.05)", borderRadius: 16, padding: "1.25rem" }}>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.8rem", color: s.color, lineHeight: 1 }}>{s.n}</div>
                      <div style={{ fontSize: ".75rem", color: "#444", marginTop: 6, letterSpacing: ".05em" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
              <Reveal delay={200}><GitHubStats username={ME.github} /></Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SKILLS ═══ */}
      <section id="skills" style={{ background: "#050508" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "7rem 2rem" }}>
          <Reveal>{sLabel(2, "Stack tecnológico")}</Reveal>
          <Reveal>{sH2("Herramientas", ["de mi arsenal.", "#a855f7"])}</Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: "1rem" }}>
            {SKILLS.map((sk, i) => <SkillCard key={sk.cat} sk={sk} i={i} />)}
          </div>
        </div>
      </section>

      {/* ═══ PROJECTS ═══ */}
      <section id="projects" style={{ background: "#07070c", borderTop: "1px solid rgba(255,255,255,.03)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "7rem 2rem" }}>
          <Reveal>{sLabel(3, "Proyectos")}</Reveal>
          <Reveal>{sH2("Lo que he", ["construido.", "#ff3cac"])}</Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(310px,1fr))", gap: "1.5rem" }}>
            {PROJECTS.map((p, i) => <ProjCard key={p.id} p={p} i={i} />)}
            <Reveal delay={320}>
              <div style={{ border: "2px dashed rgba(255,255,255,.07)", borderRadius: 24, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem", padding: "3rem", minHeight: 280, cursor: "none", transition: "all .3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,60,172,.3)"; e.currentTarget.style.background = "rgba(255,60,172,.02)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,.07)"; e.currentTarget.style.background = "transparent"; }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", border: "2px dashed rgba(255,255,255,.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem", color: "#444" }}>+</div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.3rem", color: "#333", letterSpacing: ".05em" }}>PRÓXIMO PROYECTO</div>
                  <div style={{ fontSize: ".78rem", color: "#333", marginTop: 4 }}>Siempre construyendo algo nuevo</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ EXPERIENCE ═══ */}
      <section id="experience" style={{ background: "#050508" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "7rem 2rem" }}>
          <Reveal>{sLabel(4, "Experiencia & Educación")}</Reveal>
          <Reveal>{sH2("Mi camino", ["hasta aquí.", "#2de2e6"])}</Reveal>
          <div style={{ position: "relative", paddingLeft: "3rem" }}>
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 1, background: "linear-gradient(to bottom,#ff3cac,#2de2e6,rgba(45,226,230,0))" }} />
            {EXPERIENCE.map((item, i) => (
              <Reveal key={i} delay={i * 100}>
                <div style={{ position: "relative", marginBottom: "2.5rem", paddingLeft: "1rem" }}>
                  <div style={{ position: "absolute", left: "-3.35rem", top: ".4rem", width: 28, height: 28, borderRadius: "50%", background: item.color + "15", border: `1px solid ${item.color}44`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <i className={item.icon} style={{ fontSize: ".9rem" }} />
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".68rem", color: "#444", letterSpacing: ".07em", marginBottom: 6 }}>{item.date}</div>
                  <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.5rem", color: "#f0f0f0", letterSpacing: ".04em", marginBottom: 4 }}>{item.role}</div>
                  <div style={{ color: item.color, fontSize: ".88rem", marginBottom: 8, fontWeight: 500 }}>{item.place}</div>
                  <p style={{ color: "#555", fontSize: ".88rem", lineHeight: 1.7, fontWeight: 300 }}>{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CONTACT ═══ */}
      <section id="contact" style={{ background: "#07070c", borderTop: "1px solid rgba(255,255,255,.03)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "7rem 2rem" }}>
          <Reveal>{sLabel(5, "Contacto")}</Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
            <div>
              <Reveal>{sH2("¿Hablamos?", ["🚀", "#ff3cac"])}</Reveal>
              <Reveal delay={80}><p style={{ color: "#555", lineHeight: 1.85, fontWeight: 300, marginBottom: "2.5rem" }}>Abierto a prácticas, proyectos freelance o simplemente intercambiar ideas. Respondo en menos de 24h.</p></Reveal>
              <div style={{ display: "flex", flexDirection: "column", gap: ".85rem" }}>
                {[
                  { icon: "devicon-google-plain colored", label: "Email",    val: ME.email,    href: `mailto:${ME.email}`,                     color: "#ff3cac" },
                  { icon: "devicon-linkedin-plain colored", label: "LinkedIn", val: ME.linkedin, href: "#",                                      color: "#2de2e6" },
                  { icon: "devicon-github-original",        label: "GitHub",   val: `github.com/${ME.github}`, href: `https://github.com/${ME.github}`, color: "#a855f7" },
                ].map((c, i) => (
                  <Reveal key={c.label} delay={i * 70}>
                    <a href={c.href} target="_blank" rel="noreferrer" className="contact-row"
                      style={{ display: "flex", alignItems: "center", gap: "1rem", padding: ".9rem 1.2rem", borderRadius: 14, background: "#0b0b11", border: "1px solid rgba(255,255,255,.05)", textDecoration: "none", color: "#f0f0f0", transition: "all .25s" }}>
                      <div style={{ width: 38, height: 38, borderRadius: 10, background: c.color + "14", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <i className={c.icon} style={{ fontSize: "1.2rem" }} />
                      </div>
                      <div>
                        <div style={{ fontSize: ".65rem", color: "#444", letterSpacing: ".08em", fontFamily: "'JetBrains Mono',monospace" }}>{c.label.toUpperCase()}</div>
                        <div style={{ fontSize: ".88rem", color: c.color, fontWeight: 500, marginTop: 2 }}>{c.val}</div>
                      </div>
                    </a>
                  </Reveal>
                ))}
                <Reveal delay={280}>
                  <a href={ME.cv} download className="contact-row"
                    style={{ display: "flex", alignItems: "center", gap: "1rem", padding: ".9rem 1.2rem", borderRadius: 14, background: "#0b0b11", border: "1px solid rgba(255,255,255,.05)", textDecoration: "none", color: "#f0f0f0", transition: "all .25s" }}>
                    <div style={{ width: 38, height: 38, borderRadius: 10, background: "#f6f74014", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "1.1rem" }}>📄</div>
                    <div>
                      <div style={{ fontSize: ".65rem", color: "#444", letterSpacing: ".08em", fontFamily: "'JetBrains Mono',monospace" }}>CV</div>
                      <div style={{ fontSize: ".88rem", color: "#f6f740", fontWeight: 500, marginTop: 2 }}>Descargar PDF</div>
                    </div>
                  </a>
                </Reveal>
              </div>
            </div>
            <Reveal delay={150}>
              <form onSubmit={e => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 3000); }} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  {[["Nombre","text","Tu nombre"],["Email","email",ME.email]].map(([lbl, type, ph]) => (
                    <div key={lbl} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <label style={{ fontSize: ".65rem", color: "#444", letterSpacing: ".12em", fontFamily: "'JetBrains Mono',monospace" }}>{lbl.toUpperCase()}</label>
                      <input type={type} required placeholder={ph} style={{ background: "#0b0b11", border: "1px solid rgba(255,255,255,.07)", borderRadius: 10, padding: ".7rem .9rem", color: "#f0f0f0", fontFamily: "'Cabinet Grotesk',sans-serif", fontSize: ".9rem", transition: "border-color .2s" }} />
                    </div>
                  ))}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <label style={{ fontSize: ".65rem", color: "#444", letterSpacing: ".12em", fontFamily: "'JetBrains Mono',monospace" }}>MENSAJE</label>
                  <textarea required rows={5} placeholder="Cuéntame sobre tu idea o proyecto..." style={{ background: "#0b0b11", border: "1px solid rgba(255,255,255,.07)", borderRadius: 10, padding: ".7rem .9rem", color: "#f0f0f0", fontFamily: "'Cabinet Grotesk',sans-serif", fontSize: ".9rem", resize: "vertical", transition: "border-color .2s" }} />
                </div>
                <button type="submit" style={{ alignSelf: "flex-end", padding: ".8rem 2rem", borderRadius: 999, background: sent ? "#4ade80" : "linear-gradient(135deg,#ff3cac,#a855f7)", color: sent ? "#000" : "#fff", fontFamily: "'Cabinet Grotesk',sans-serif", fontWeight: 800, fontSize: ".9rem", border: "none", cursor: "none", transition: "all .4s", boxShadow: sent ? "0 0 30px rgba(74,222,128,.4)" : "0 0 30px rgba(255,60,172,.3)" }}>
                  {sent ? "✓ ¡Enviado!" : "Enviar mensaje →"}
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,.04)", padding: "1.75rem 3rem", display: "flex", alignItems: "center", justifyContent: "space-between", color: "#333", fontSize: ".78rem" }}>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", letterSpacing: ".06em" }}>© 2025 {ME.name}</span>
        <span>Hecho con <span style={{ color: "#ff3cac" }}>♥</span> desde {ME.location}</span>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: ".68rem" }}>v1.0.0</span>
      </footer>
    </div>
  );
}
