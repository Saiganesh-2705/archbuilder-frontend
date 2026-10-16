import { useEffect, useRef } from "react";

/** Faint drafting grid that lights up around the mouse. Sits inside a relatively positioned parent. */
const BlueprintGrid = () => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!parent) return undefined;
    const on = (e) => {
      const r = parent.getBoundingClientRect();
      el.style.setProperty("--px", `${e.clientX - r.left}px`);
      el.style.setProperty("--py", `${e.clientY - r.top}px`);
    };
    parent.addEventListener("mousemove", on);
    return () => parent.removeEventListener("mousemove", on);
  }, []);

  return <div ref={ref} className="blueprint-grid" aria-hidden />;
};

export default BlueprintGrid;
