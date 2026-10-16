import { useEffect, useRef } from "react";
import SafeImg from "./SafeImg";

/** Image that drifts slower than the page as you scroll. */
const Parallax = ({ src, alt = "", className = "", speed = 0.12 }) => {
  const wrap = useRef(null);
  const inner = useRef(null);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return undefined;
    let raf = 0;
    const update = () => {
      raf = 0;
      if (!wrap.current || !inner.current) return;
      const r = wrap.current.getBoundingClientRect();
      const c = r.top + r.height / 2 - window.innerHeight / 2;
      inner.current.style.transform = `translate3d(0, ${-c * speed}px, 0) scale(1.2)`;
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed]);

  return (
    <div ref={wrap} className={`overflow-hidden ${className}`}>
      <div ref={inner} className="w-full h-full will-change-transform">
        <SafeImg src={src} alt={alt} loading="lazy" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default Parallax;
