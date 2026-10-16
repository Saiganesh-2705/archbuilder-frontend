import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuote } from "../context/QuoteContext";
import { SITE } from "../config/site";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/contact", label: "Contact Us" },
];

// Pages that start with a full-screen photo: the header floats over it.
const OVERLAY_ROUTES = ["/", "/about", "/services", "/projects", "/contact", "/faqs"];

const Navbar = () => {
  const { pathname } = useLocation();
  const { openQuote } = useQuote();
  const overlay = OVERLAY_ROUTES.includes(pathname);

  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hover, setHover] = useState(-1);
  const [pos, setPos] = useState({ x: 0, w: 0 });
  const [ready, setReady] = useState(false);

  const tapeRef = useRef(null);
  const itemRefs = useRef([]);

  const activeIdx = links.findIndex((l) => (l.to === "/" ? pathname === "/" : pathname === l.to || pathname.startsWith(`${l.to}/`)));
  const shown = hover >= 0 ? hover : activeIdx;

  // The amber highlight slides to the hovered link, then settles back on the current page.
  useLayoutEffect(() => {
    const measure = () => {
      const el = itemRefs.current[shown];
      if (el) setPos({ x: el.offsetLeft, w: el.offsetWidth });
    };
    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);
    return () => window.removeEventListener("resize", measure);
  }, [shown]);

  // No slide-in from zero on first paint.
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 60);
    return () => clearTimeout(t);
  }, []);

  // Scroll progress is drawn as a measuring tape that extends along the bottom of the bar.
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, y / max) : 0;
      if (tapeRef.current) tapeRef.current.style.clipPath = `inset(0 ${(1 - p) * 100}% 0 0)`;
      setScrolled(y > 40);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [pathname]);

  useEffect(() => { setOpen(false); setHover(-1); }, [pathname]);
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  const glass = "bg-ink/75 backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.25)]";

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 pointer-events-none">
        <div className={`container-px transition-all duration-500 ${scrolled ? "pt-3" : "pt-5"}`}>
          <div className="grid grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center gap-4">
            {/* Logo: the name folds away once you scroll, leaving just the mark */}
            <Link to="/" aria-label={`${SITE.name} home`} className={`pointer-events-auto justify-self-start flex items-center rounded-full p-1.5 ${glass}`}>
              <span className="w-10 h-10 rounded-full bg-amber text-ink flex items-center justify-center font-display font-extrabold shrink-0">B</span>
              <span className={`hidden sm:block overflow-hidden whitespace-nowrap font-display font-extrabold text-base tracking-tight text-white transition-all duration-500 ${scrolled ? "max-w-0 opacity-0 pl-0 pr-0" : "max-w-[220px] opacity-100 pl-3 pr-4"}`}>
                {SITE.name.toUpperCase()}
              </span>
            </Link>

            {/* Centre pill with sliding highlight and measuring-tape progress */}
            <nav aria-label="Main" className={`pointer-events-auto hidden md:block relative rounded-full px-1.5 pt-1.5 pb-3.5 ${glass}`}>
              <ul className="relative flex items-center" onMouseLeave={() => setHover(-1)}>
                <span
                  aria-hidden
                  className="absolute top-0 bottom-0 left-0 rounded-full bg-amber"
                  style={{
                    width: pos.w,
                    transform: `translateX(${pos.x}px)`,
                    opacity: shown >= 0 ? 1 : 0,
                    transition: ready ? "transform 0.55s cubic-bezier(0.34,1.35,0.5,1), width 0.55s cubic-bezier(0.34,1.35,0.5,1), opacity 0.25s" : "none",
                  }}
                />
                {links.map((l, i) => (
                  <li key={l.to} ref={(el) => { itemRefs.current[i] = el; }} onMouseEnter={() => setHover(i)}>
                    <Link
                      to={l.to}
                      aria-current={i === activeIdx ? "page" : undefined}
                      onFocus={() => setHover(i)}
                      onBlur={() => setHover(-1)}
                      className={`relative block px-5 lg:px-6 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors duration-300 ${shown === i ? "text-ink" : "text-white/80"}`}
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="absolute left-6 right-6 bottom-1.5 h-2 pointer-events-none" aria-hidden>
                <div className="ruler absolute inset-0" />
                <div ref={tapeRef} className="ruler ruler-amber absolute inset-0" style={{ clipPath: "inset(0 100% 0 0)" }} />
              </div>
            </nav>

            <div className="pointer-events-auto justify-self-end flex items-center gap-3">
              <button onClick={openQuote} className="btn-sweep hidden md:inline-flex items-center gap-2 rounded-full bg-amber text-ink pl-6 pr-5 py-3.5 text-sm font-bold shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
                <span className="relative z-10">Get a Quote</span>
                <svg className="relative z-10 arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
              </button>

              <button className={`md:hidden relative w-12 h-12 rounded-full ${glass}`} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
                <span className={`absolute left-4 right-4 h-0.5 bg-white rounded transition-all duration-300 ${open ? "top-1/2 rotate-45" : "top-[19px]"}`} />
                <span className={`absolute left-4 right-4 h-0.5 bg-white rounded transition-all duration-300 ${open ? "top-1/2 -rotate-45" : "top-[28px]"}`} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-screen mobile menu that opens as a circle from the button */}
      <div
        className="md:hidden fixed inset-0 z-40 bg-ink flex flex-col justify-between px-8 pt-28 pb-10"
        style={{
          clipPath: open ? "circle(150% at calc(100% - 46px) 44px)" : "circle(0% at calc(100% - 46px) 44px)",
          visibility: open ? "visible" : "hidden",
          transition: `clip-path 0.8s cubic-bezier(0.7,0,0.2,1), visibility 0s linear ${open ? "0s" : "0.8s"}`,
        }}
        aria-hidden={!open}
      >
        <ul className="space-y-2">
          {links.map((l, i) => (
            <li key={l.to} className="overflow-hidden">
              <Link
                to={l.to}
                tabIndex={open ? 0 : -1}
                className={`block font-display font-extrabold text-4xl py-1 transition-all duration-700 ${i === activeIdx ? "text-amber" : "text-white"} ${open ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"}`}
                style={{ transitionDelay: open ? `${300 + i * 80}ms` : "0ms" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className={`transition-all duration-700 ${open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: open ? "750ms" : "0ms" }}>
          <p className="text-white/60 text-sm">{SITE.email}</p>
          <p className="text-white/60 text-sm mt-1">{SITE.shortLocation}</p>
          <button tabIndex={open ? 0 : -1} onClick={() => { setOpen(false); openQuote(); }} className="btn-primary mt-5 !rounded-full">Get a Quote</button>
        </div>
      </div>

      {!overlay && <div className="h-[88px]" aria-hidden />}
    </>
  );
};

export default Navbar;
