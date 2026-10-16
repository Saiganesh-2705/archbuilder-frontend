import { useEffect, useRef } from "react";

/** Amber ring that trails the mouse and swells over links and buttons. Desktop mouse only. */
const CustomCursor = () => {
  const ring = useRef(null);
  const dot = useRef(null);

  useEffect(() => {
    if (!window.matchMedia?.("(pointer: fine)").matches) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    let x = -100, y = -100, rx = -100, ry = -100, scale = 1, raf = 0, shown = false;

    const onMove = (e) => {
      x = e.clientX; y = e.clientY;
      if (!shown) { shown = true; rx = x; ry = y; ring.current.style.opacity = 1; dot.current.style.opacity = 1; }
      const hot = e.target.closest?.("a, button, [role='button'], input, select, textarea, label, summary");
      scale = hot ? 1.8 : 1;
    };
    const onLeave = () => { shown = false; ring.current.style.opacity = 0; dot.current.style.opacity = 0; };
    const loop = () => {
      rx += (x - rx) * 0.18; ry += (y - ry) * 0.18;
      ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale})`;
      ring.current.style.backgroundColor = scale > 1 ? "rgba(245,180,0,0.18)" : "transparent";
      dot.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={ring} className="pointer-events-none fixed top-0 left-0 z-[300] w-9 h-9 rounded-full border-2 border-amber opacity-0 transition-[opacity,background-color] duration-200" aria-hidden />
      <div ref={dot} className="pointer-events-none fixed top-0 left-0 z-[300] w-1.5 h-1.5 rounded-full bg-amber opacity-0" aria-hidden />
    </>
  );
};

export default CustomCursor;
