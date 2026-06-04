// ============================================================
//  hooks/useKonami.js
//  Detecta el Konami Code (↑↑↓↓←→←→BA) y ejecuta un callback.
//
//  Uso:
//    useKonami(() => setShowTerm(true));
// ============================================================
import { useEffect } from "react";

const SEQUENCE = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

export function useKonami(onActivate) {
  useEffect(() => {
    let pos = 0;
    const handler = e => {
      pos = e.keyCode === SEQUENCE[pos] ? pos + 1 : 0;
      if (pos === SEQUENCE.length) {
        onActivate();
        pos = 0;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onActivate]);
}
