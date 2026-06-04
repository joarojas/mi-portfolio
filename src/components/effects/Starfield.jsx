// ============================================================
//  components/effects/Starfield.jsx
// ============================================================
import { useRef, useEffect } from "react";

export function Starfield() {
  const ref = useRef(null);

  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext("2d");
    let W = c.width  = window.innerWidth;
    let H = c.height = window.innerHeight;

    const resize = () => {
      W = c.width  = window.innerWidth;
      H = c.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    const stars = Array.from({ length: 220 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.2 + 0.2,
      t: Math.random() * Math.PI * 2,
      s: Math.random() * 0.012 + 0.004,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      stars.forEach(s => {
        s.t += s.s;
        const a = (Math.sin(s.t) + 1) / 2 * 0.7 + 0.1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
}
