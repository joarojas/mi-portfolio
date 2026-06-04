// ============================================================
//  hooks/useActiveNav.js
//  Detecta qué sección está visible y devuelve su índice.
//
//  Uso:
//    const activeNav = useActiveNav(["hero","about","skills"]);
// ============================================================
import { useState, useEffect } from "react";

export function useActiveNav(sectionIds) {
  const [activeNav, setActiveNav] = useState(0);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setActiveNav(sectionIds.indexOf(e.target.id));
          }
        });
      },
      { threshold: 0.35 }
    );

    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, [sectionIds]);

  return activeNav;
}
