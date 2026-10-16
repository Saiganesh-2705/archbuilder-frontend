import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQuote } from "../context/QuoteContext";
import BlueprintGrid from "./BlueprintGrid";

const checklist = ["High quality construction", "On-site project management", "Transparent, fixed pricing"];

const slides = [
  { src: "photo-1600585154340-be6161a56a0c", label: "Modern homes" },
  { src: "photo-1503387762-592deb58ef4e", label: "Live sites" },
  { src: "photo-1568605114967-8130f3a36994", label: "Villas" },
  { src: "photo-1600607687939-ce8a6c25118c", label: "Interiors" },
];
const url = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1600&q=80`;
const SLIDE_MS = 6000;

const Hero = () => {
  const { openQuote } = useQuote();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return undefined;
    const t = setInterval(() => setActive((a) => (a + 1) % slides.length), SLIDE_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative min-h-[100svh] flex items-end overflow-hidden bg-ink">
      {slides.map((s, i) => (
        <div key={s.src} className={`hero-slide absolute inset-0 ${i === active ? "on" : ""}`} aria-hidden>
          <div className="hero-img absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${url(s.src)}')` }} />
        </div>
      ))}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(180deg, rgba(10,10,10,0.75) 0%, rgba(10,10,10,0.25) 40%, rgba(10,10,10,0.8) 100%)" }}
        aria-hidden
      />

      <BlueprintGrid />

      <div className="container-px w-full pb-28 pt-40 relative">
        <span className="eyebrow animate-fade-up">
          <span className="w-1.5 h-1.5 rounded-full bg-ink mr-2" /> BUILDWORKS IS OUR SCOPE
        </span>

        <h1 className="font-display font-extrabold text-white text-4xl md:text-6xl leading-[1.05] mt-6 max-w-3xl animate-fade-up delay-100">
          Premium homes,
          <br />
          <span className="text-amber">built to last.</span>
        </h1>

        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-2 animate-fade-up delay-200">
          {checklist.map((item) => (
            <p key={item} className="text-white/90 text-sm flex items-center gap-2">
              <span className="text-amber">&#10003;</span> {item}
            </p>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-4 animate-fade-up delay-300">
          <button onClick={openQuote} className="btn-primary btn-shine animate-soft-pulse">
            Get a Quote <span aria-hidden>&rarr;</span>
          </button>
          <Link to="/projects" className="btn-secondary !text-white !border-white/40 hover:!border-white">
            View Projects
          </Link>
        </div>
      </div>

      {/* Slide selector with timed progress */}
      <div className="absolute bottom-6 left-6 md:left-12 lg:left-20 flex gap-3 z-10">
        {slides.map((s, i) => (
          <button key={s.label} onClick={() => setActive(i)} aria-label={`Show ${s.label}`} aria-current={i === active} className="group w-14 sm:w-24 text-left">
            <span className="block h-[3px] bg-white/25 overflow-hidden">
              <span
                key={i === active ? `a${active}` : `i${i}`}
                className="block h-full bg-amber origin-left"
                style={i === active ? { animation: `progressBar ${SLIDE_MS}ms linear forwards` } : { transform: "scaleX(0)" }}
              />
            </span>
            <span className={`hidden sm:block text-[11px] mt-2 transition-colors ${i === active ? "text-white" : "text-white/50 group-hover:text-white/80"}`}>
              {s.label}
            </span>
          </button>
        ))}
      </div>

      <div className="hidden lg:block absolute bottom-0 right-12 w-72 bg-ink/85 backdrop-blur p-6 animate-fade-up delay-400">
        <p className="font-display text-5xl text-white">
          18<span className="text-amber">+</span>
        </p>
        <p className="text-white text-sm font-semibold mt-2">Years of excellence</p>
        <p className="text-white/60 text-xs mt-2 leading-relaxed">
          Decades of expertise, setting the benchmark for trusted construction services.
        </p>
        <button onClick={openQuote} className="btn-primary mt-4 !py-2 !px-4 !text-xs">
          Enquiry
        </button>
      </div>
    </section>
  );
};

export default Hero;
