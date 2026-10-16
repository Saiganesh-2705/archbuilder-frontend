import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import SplitText from "./SplitText";
import BlueprintGrid from "./BlueprintGrid";
import useInView from "../hooks/useInView";
import useCountUp from "../hooks/useCountUp";
import { useQuote } from "../context/QuoteContext";

const SLIDE_MS = 6000;
const keywords = ["Residential", "Commercial", "Renovation", "Interiors", "Turnkey", "Landscape"];

const StatCard = ({ stat }) => {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const n = useCountUp(stat.end, { start: inView, duration: 1600 });
  return (
    <div ref={ref} className="hidden lg:block absolute bottom-16 right-12 w-72 bg-ink/70 backdrop-blur-xl border border-white/10 p-6 animate-fade-up delay-500">
      <p className="font-display text-5xl text-white">{n}<span className="text-amber">{stat.suffix}</span></p>
      <p className="text-white text-sm font-semibold mt-2">{stat.label}</p>
      <p className="text-white/60 text-xs mt-2 leading-relaxed">{stat.body}</p>
    </div>
  );
};

/**
 * Full-screen opening for interior pages, matching the Home page: photo
 * slideshow, word-by-word title, blueprint grid that lights up around the
 * mouse, a stat card and a keyword ticker.
 */
const PageHero = ({ eyebrow, title, crumb, image, images, labels = [], subtitle, stat, secondary = { to: "/projects", label: "View Projects" } }) => {
  const { openQuote } = useQuote();
  const list = images?.length ? images : [image];
  const [active, setActive] = useState(0);
  const scrollLayer = useRef(null);
  const mouseLayer = useRef(null);

  useEffect(() => {
    if (list.length < 2 || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return undefined;
    const t = setInterval(() => setActive((a) => (a + 1) % list.length), SLIDE_MS);
    return () => clearInterval(t);
  }, [list.length]);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return undefined;
    let raf = 0;
    const update = () => {
      raf = 0;
      if (scrollLayer.current) scrollLayer.current.style.transform = `translate3d(0, ${Math.min(window.scrollY, 800) * 0.25}px, 0)`;
    };
    const on = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener("scroll", on, { passive: true });
    return () => { window.removeEventListener("scroll", on); if (raf) cancelAnimationFrame(raf); };
  }, []);

  const onMouseMove = (e) => {
    if (!mouseLayer.current) return;
    const x = e.clientX / window.innerWidth - 0.5;
    const y = e.clientY / window.innerHeight - 0.5;
    mouseLayer.current.style.transform = `translate3d(${x * -18}px, ${y * -12}px, 0) scale(1.06)`;
  };

  const SecondaryTag = secondary.href ? "a" : Link;
  const secondaryProps = secondary.href ? { href: secondary.href } : { to: secondary.to };

  return (
    <section onMouseMove={onMouseMove} className="relative min-h-[100svh] md:min-h-[92vh] flex items-end overflow-hidden bg-ink">
      <div ref={scrollLayer} className="absolute inset-x-0 -top-16 -bottom-16 will-change-transform" aria-hidden>
        <div ref={mouseLayer} className="absolute inset-0 transition-transform duration-500 ease-out will-change-transform">
          {list.map((src, i) => (
            <div key={src} className={`hero-slide absolute inset-0 ${i === active ? "on" : ""}`}>
              <div className="hero-img absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${src}')` }} />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(10,10,10,0.75) 0%, rgba(10,10,10,0.25) 38%, rgba(10,10,10,0.88) 100%)" }} aria-hidden />
      <BlueprintGrid />

      <div className="container-px w-full relative pb-40 pt-44">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-white/70 animate-fade-up">
          <Link to="/" className="hover:text-amber transition-colors">Home</Link>
          <span aria-hidden className="text-amber">/</span>
          <span className="text-white">{crumb}</span>
        </nav>

        {eyebrow && <p className="eyebrow mt-5 animate-fade-up delay-100">{eyebrow}</p>}

        <SplitText as="h1" text={title} delay={200} className="font-display font-extrabold text-white text-5xl md:text-7xl leading-[1.02] mt-5 max-w-4xl" />

        {subtitle && <p className="text-white/80 text-base md:text-lg max-w-xl mt-6 leading-relaxed animate-fade-up delay-300">{subtitle}</p>}

        <div className="mt-8 flex flex-wrap gap-4 animate-fade-up delay-400">
          <button onClick={openQuote} className="btn-primary btn-shine animate-soft-pulse">
            Get a Quote <span aria-hidden>&rarr;</span>
          </button>
          <SecondaryTag {...secondaryProps} className="btn-secondary !text-white !border-white/40 hover:!border-white">
            {secondary.label}
          </SecondaryTag>
        </div>
      </div>

      {stat && <StatCard stat={stat} />}

      {list.length > 1 && (
        <div className="absolute bottom-16 left-6 md:left-12 lg:left-20 flex gap-3 z-10">
          {list.map((src, i) => (
            <button key={src} onClick={() => setActive(i)} aria-label={`Show photo ${i + 1}`} aria-current={i === active} className="group w-14 sm:w-24 text-left">
              <span className="block h-[3px] bg-white/25 overflow-hidden">
                <span
                  key={i === active ? `a${active}` : `i${i}`}
                  className="block h-full bg-amber origin-left"
                  style={i === active ? { animation: `progressBar ${SLIDE_MS}ms linear forwards` } : { transform: "scaleX(0)" }}
                />
              </span>
              {labels[i] && (
                <span className={`hidden sm:block text-[11px] mt-2 transition-colors ${i === active ? "text-white" : "text-white/50 group-hover:text-white/80"}`}>{labels[i]}</span>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Keyword ticker */}
      <div className="absolute bottom-0 inset-x-0 border-t border-white/15 bg-black/30 backdrop-blur-sm overflow-hidden py-3" aria-hidden>
        <div className="flex w-max whitespace-nowrap animate-marquee-slow">
          {[...keywords, ...keywords, ...keywords, ...keywords].map((k, i) => (
            <span key={i} className="mx-6 text-white/55 text-xs font-semibold tracking-[0.2em] uppercase">
              {k} <span className="text-amber mx-4">&#9670;</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PageHero;
