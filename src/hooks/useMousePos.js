// ============================================================
//  hooks/useMousePos.js
//  Devuelve una ref con la posición actual del mouse.
//  Usar ref en vez de state evita re-renders en cada movimiento.
//
//  Uso:
//    const mousePos = useMousePos();
//    // mousePos.current = { x: 123, y: 456 }
// ============================================================
import { useRef, useEffect, useCallback } from "react";

export function useMousePos() {
  const mousePos = useRef({ x: -999, y: -999 });

  const handleMouse = useCallback(e => {
    mousePos.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [handleMouse]);

  return mousePos;
}
