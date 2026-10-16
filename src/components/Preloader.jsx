import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SITE } from "../config/site";

const KEY = "bw_intro";

/** Short intro shown once per session: a plan draws itself, then the screen lifts away. */
const Preloader = () => {
  const { pathname } = useLocation();
  const [show, setShow] = useState(() => {
    if (pathname.startsWith("/admin")) return false;
    try { return !sessionStorage.getItem(KEY); } catch { return false; }
  });
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!show) return undefined;
    try { sessionStorage.setItem(KEY, "1"); } catch { /* ignore */ }
    const a = setTimeout(() => setLeaving(true), 1700);
    const b = setTimeout(() => setShow(false), 2500);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, [show]);

  if (!show) return null;
  return (
    <div className={`fixed inset-0 z-[400] bg-ink flex flex-col items-center justify-center ${leaving ? "preloader-out" : ""}`} role="status" aria-label="Loading">
      <svg viewBox="0 0 240 120" className="w-56 sm:w-72" fill="none" stroke="#F5B400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path className="draw-path pre-1" pathLength="1" d="M10 110 H230" />
        <path className="draw-path pre-2" pathLength="1" d="M40 110 V60 H90 V110 M90 110 V30 H150 V110 M150 110 V70 H200 V110" />
        <path className="draw-path pre-3" pathLength="1" d="M60 75 H72 M60 90 H72 M108 48 H130 M108 66 H130 M108 84 H130 M168 86 H182" />
        <path className="draw-path pre-4" pathLength="1" d="M205 110 V10 H150 M205 10 L225 22" />
      </svg>
      <p className="font-display font-extrabold text-white text-2xl tracking-[0.25em] mt-8 animate-fade-up delay-300">{SITE.name.toUpperCase()}</p>
      <div className="w-40 h-[3px] bg-white/10 mt-6 overflow-hidden"><div className="h-full bg-amber pre-bar" /></div>
    </div>
  );
};

export default Preloader;
