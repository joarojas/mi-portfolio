// ============================================================
//  components/terminal/Terminal.jsx
// ============================================================
import { useState, useRef, useEffect } from "react";
import { TERMINAL_COMMANDS } from "../../data";

export function Terminal({ onClose, t }) {
  const [lines, setLines] = useState([
    { t: "cmd",   v: t.terminal.welcome },
    { t: "muted", v: t.terminal.hint    },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [lines]);
  useEffect(() => { inputRef.current?.focus(); }, []);

  const run = cmd => {
    const c = cmd.trim().toLowerCase();
    const newLines = [{ t: "prompt", v: `${t.terminal.prompt} ${cmd}` }];

    if (c === "clear") {
      setLines([{ t: "muted", v: t.terminal.cleared }]);
      setInput("");
      return;
    }
    if (!c) { setLines(p => [...p, ...newLines]); setInput(""); return; }

    const fn = TERMINAL_COMMANDS[c];
    const result = fn
      ? fn()
      : [{ t: "error", v: t.terminal.notFound.replace("%s", c) }];

    setLines(p => [...p, ...newLines, ...result]);
    setInput("");
  };

  const colMap = {
    cmd: "#f6f740", info: "#a8a8b3", accent: "#ff3cac",
    muted: "#555",  prompt: "#2de2e6", error: "#ff6b6b",
  };

  return (
    <div
      style={{ position:"fixed", inset:0, zIndex:500, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(0,0,0,.85)", backdropFilter:"blur(12px)" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div style={{ width:"min(760px,95vw)", maxHeight:"80vh", background:"#08080f", border:"1px solid rgba(255,60,172,.3)", borderRadius:20, overflow:"hidden", display:"flex", flexDirection:"column", boxShadow:"0 0 80px rgba(255,60,172,.15)", animation:"slideDown .3s ease" }}>

        {/* Title bar */}
        <div style={{ display:"flex", alignItems:"center", padding:".85rem 1.25rem", background:"#0d0d16", borderBottom:"1px solid rgba(255,255,255,.06)", gap:8 }}>
          <div onClick={onClose} style={{ width:12, height:12, borderRadius:"50%", background:"#ff5f57", cursor:"none" }} />
          <div style={{ width:12, height:12, borderRadius:"50%", background:"#febc2e" }} />
          <div style={{ width:12, height:12, borderRadius:"50%", background:"#28c840" }} />
          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".72rem", color:"#555", marginLeft:12, letterSpacing:".08em" }}>joan@joan.dev — terminal</span>
        </div>

        {/* Output */}
        <div style={{ flex:1, overflowY:"auto", padding:"1.25rem 1.5rem", display:"flex", flexDirection:"column", gap:3 }}
          onClick={() => inputRef.current?.focus()}>
          {lines.map((l, i) => (
            <div key={i} className="term-line" style={{ fontFamily:"'JetBrains Mono',monospace", color: colMap[l.t] || "#a8a8b3", whiteSpace:"pre-wrap" }}>
              {l.v}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{ display:"flex", alignItems:"center", padding:".85rem 1.5rem", borderTop:"1px solid rgba(255,255,255,.05)", background:"#0d0d16", gap:8 }}>
          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:".88rem", color:"#2de2e6", flexShrink:0 }}>{t.terminal.prompt}</span>
          <input
            ref={inputRef}
            className="term-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") run(input); }}
            placeholder={t.terminal.placeholder}
          />
          <span style={{ width:8, height:16, background:"#ff3cac", animation:"termCursor 1s step-end infinite", flexShrink:0 }} />
        </div>
      </div>
    </div>
  );
}
