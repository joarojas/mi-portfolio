// ============================================================
//  components/effects/ParticleCanvas.jsx
//  Recibe mousePos (ref) para la interacción con partículas
// ============================================================
import { useRef, useEffect } from "react";

export function ParticleCanvas({ mousePos }) {
  const ref = useRef(null);

  useEffect(() => {
    const c = ref.current;
    const ctx = c.getContext("2d");
    let W = c.width  = window.innerWidth;
    let H = c.height = window.innerHeight;

    window.addEventListener("resize", () => {
      W = c.width  = window.innerWidth;
      H = c.height = window.innerHeight;
    });

    const cols = ["#ff3cac", "#2de2e6", "#f6f740", "#a855f7"];
    const pts  = Array.from({ length: 55 }, () => ({
      x:     Math.random() * W,
      y:     Math.random() * H,
      vx:    (Math.random() - 0.5) * 0.3,
      vy:    (Math.random() - 0.5) * 0.3,
      r:     Math.random() * 1.4 + 0.3,
      color: cols[Math.floor(Math.random() * 4)],
      a:     Math.random() * 0.4 + 0.1,
    }));

    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const { x: mx, y: my } = mousePos.current;

      pts.forEach(p => {
        const dx = p.x - mx, dy = p.y - my;
        const d  = Math.hypot(dx, dy);
        if (d < 100) {
          const f = (100 - d) / 100;
          p.vx += (dx / d) * f * 0.3;
          p.vy += (dy / d) * f * 0.3;
        }
        p.vx *= 0.97; p.vy *= 0.97;
        p.x = (p.x + p.vx + W) % W;
        p.y = (p.y + p.vy + H) % H;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle  = p.color;
        ctx.globalAlpha = p.a;
        ctx.fill();
      });
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(raf);
  }, [mousePos]);

  return (
    <canvas
      ref={ref}
      style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
}
