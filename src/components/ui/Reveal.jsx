// ============================================================
//  components/ui/Reveal.jsx
//  Anima sus hijos cuando entran al viewport.
//
//  Props:
//    delay (ms) — retraso de la animación (default: 0)
// ============================================================
import { useRef, useState, useEffect } from "react";

export function Reveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.08 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? "none" : "translateY(28px)",
        transition: `opacity .8s ease ${delay}ms, transform .8s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
