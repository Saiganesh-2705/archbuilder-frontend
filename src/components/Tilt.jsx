import { useRef } from "react";

/** Card that tilts toward the mouse with a moving highlight. Mouse only. */
const Tilt = ({ children, className = "", max = 7 }) => {
  const ref = useRef(null);

  const move = (e) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    ref.current.style.transform = `perspective(900px) rotateX(${-y * max}deg) rotateY(${x * max}deg) translateY(-6px)`;
    ref.current.style.setProperty("--gx", `${(x + 0.5) * 100}%`);
    ref.current.style.setProperty("--gy", `${(y + 0.5) * 100}%`);
  };
  const leave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div
      ref={ref}
      onPointerMove={move}
      onPointerLeave={leave}
      className={`tilt group relative transition-transform duration-200 ease-out will-change-transform ${className}`}
    >
      {children}
      <span
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: "radial-gradient(260px circle at var(--gx,50%) var(--gy,50%), rgba(255,255,255,0.22), transparent 60%)" }}
        aria-hidden
      />
    </div>
  );
};

export default Tilt;
