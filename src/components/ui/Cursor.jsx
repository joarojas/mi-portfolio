import { useRef, useEffect } from "react";

export const Cursor = () => {
  const dot = useRef(null), ring = useRef(null);
  const pos = useRef({ x: 0, y: 0 }), rpos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mv = e => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", mv);
    let raf;
    const tick = () => {
      rpos.current.x += (pos.current.x - rpos.current.x) * .12;
      rpos.current.y += (pos.current.y - rpos.current.y) * .12;
      if (dot.current)  { dot.current.style.left = pos.current.x + "px"; dot.current.style.top = pos.current.y + "px"; }
      if (ring.current) { ring.current.style.left = rpos.current.x + "px"; ring.current.style.top = rpos.current.y + "px"; }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { window.removeEventListener("mousemove", mv); cancelAnimationFrame(raf); };
  }, []);

  const base = { position: "fixed", borderRadius: "50%", pointerEvents: "none", zIndex: 9999, transform: "translate(-50%,-50%)" };
  
  return (
    <>
      <div ref={dot}  style={{ ...base, width: 6,  height: 6,  background: "#ff3cac", boxShadow: "0 0 10px #ff3cac" }} />
      <div ref={ring} style={{ ...base, width: 32, height: 32, border: "1px solid rgba(255,60,172,.5)" }} />
    </>
  );
};