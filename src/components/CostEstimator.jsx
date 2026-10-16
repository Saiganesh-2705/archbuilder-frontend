import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import { useQuote } from "../context/QuoteContext";
import { SITE } from "../config/site";

const finishes = [
  { key: "Basic", note: "Standard fittings, simple finishes", color: "#d9d5c9" },
  { key: "Standard", note: "Vitrified tiles, branded fittings", color: "#e9c75f" },
  { key: "Premium", note: "Designer finishes, custom joinery", color: "#F5B400" },
];

const useTween = (target, ms = 600) => {
  const [v, setV] = useState(target);
  const from = useRef(target);
  useEffect(() => {
    const start = performance.now();
    const begin = from.current;
    let raf;
    const tick = (now) => {
      const p = Math.min(1, (now - start) / ms);
      const val = begin + (target - begin) * (1 - Math.pow(1 - p, 3));
      from.current = val;
      setV(val);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return v;
};

const money = (n) => {
  if (n >= 1e7) return `₹${(n / 1e7).toFixed(2)} Cr`;
  return `₹${(n / 1e5).toFixed(1)} Lakh`;
};

/** Interactive ballpark estimate. The house on the right grows as inputs change. */
const CostEstimator = () => {
  const { openQuote } = useQuote();
  const [area, setArea] = useState(1500);
  const [floors, setFloors] = useState(2);
  const [finish, setFinish] = useState("Standard");

  const rate = SITE.rates[finish];
  const total = area * floors * rate;
  const shown = useTween(total);
  const fin = finishes.find((f) => f.key === finish);
  const width = 52 + ((area - 600) / 2400) * 44; // % of the stage

  return (
    <section className="container-px py-24">
      <Reveal className="max-w-xl">
        <h2 className="section-title">What could your home cost?</h2>
        <p className="text-stone mt-4">Move the sliders for a ballpark figure. Our team confirms the exact amount after a site visit.</p>
      </Reveal>

      <Reveal delay={120} className="mt-12 grid lg:grid-cols-2 bg-charcoal text-white overflow-hidden">
        <div className="p-8 md:p-12 space-y-9">
          <div>
            <div className="flex justify-between items-baseline">
              <label htmlFor="area" className="font-semibold">Built-up area per floor</label>
              <span className="font-display text-2xl text-amber">{area.toLocaleString("en-IN")} sq ft</span>
            </div>
            <input id="area" type="range" min="600" max="3000" step="50" value={area} onChange={(e) => setArea(+e.target.value)} className="range-amber w-full mt-4" />
          </div>

          <div>
            <p className="font-semibold">Floors</p>
            <div className="flex gap-3 mt-3">
              {[1, 2, 3].map((n) => (
                <button key={n} onClick={() => setFloors(n)} aria-pressed={floors === n} className={`flex-1 py-3 text-sm font-semibold border transition-colors ${floors === n ? "bg-amber text-ink border-amber" : "border-white/20 hover:border-white"}`}>
                  {n === 1 ? "Ground" : `G + ${n - 1}`}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="font-semibold">Finish level</p>
            <div className="grid sm:grid-cols-3 gap-3 mt-3">
              {finishes.map((f) => (
                <button key={f.key} onClick={() => setFinish(f.key)} aria-pressed={finish === f.key} className={`text-left p-4 border transition-colors ${finish === f.key ? "border-amber bg-white/5" : "border-white/15 hover:border-white/50"}`}>
                  <span className="block font-semibold">{f.key}</span>
                  <span className="block text-xs text-white/55 mt-1 leading-snug">{f.note}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="relative bg-[#161616] p-8 md:p-12 flex flex-col justify-between min-h-[480px] overflow-hidden">
          <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "32px 32px" }} aria-hidden />

          <div className="relative flex-1 flex flex-col-reverse items-center justify-start pb-2" aria-hidden>
            <div className="h-1 w-[96%] bg-amber" />
            {Array.from({ length: floors }).map((_, i) => (
              <div key={`${i}-${floors}`} className="floor-in h-14 flex items-center justify-around px-3 transition-all duration-500 border-x border-t border-black/20"
                style={{ width: `${width}%`, background: fin.color, animationDelay: `${i * 90}ms` }}>
                {Array.from({ length: Math.max(2, Math.round(width / 16)) }).map((__, w) => (
                  <span key={w} className="w-5 h-7 bg-[#1a202b]/80" />
                ))}
              </div>
            ))}
            <div className="transition-all duration-500 h-10 bg-[#2a2a2a]" style={{ width: `${width + 6}%`, clipPath: "polygon(8% 100%, 92% 100%, 100% 0, 0 0)" }} />
          </div>

          <div className="relative mt-6">
            <p className="text-white/60 text-sm">Estimated build cost</p>
            <p className="font-display font-extrabold text-5xl md:text-6xl mt-1">{money(shown)}</p>
            <p className="text-white/50 text-xs mt-2">
              {(area * floors).toLocaleString("en-IN")} sq ft total at ₹{rate.toLocaleString("en-IN")}/sq ft. Indicative only.
            </p>
            <button onClick={openQuote} className="btn-primary btn-shine mt-6">Get an exact quote <span aria-hidden>&rarr;</span></button>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default CostEstimator;
