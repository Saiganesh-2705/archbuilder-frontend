import { Link } from "react-router-dom";
import { useQuote } from "../context/QuoteContext";
import useInView from "../hooks/useInView";
import { SITE } from "../config/site";

const explore = [
  { label: "Home", to: "/" },
  { label: "About us", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "FAQs", to: "/faqs" },
  { label: "Contact", to: "/contact" },
];

const buildings = [
  // x, width, height, delay
  [20, 60, 90, 0.0], [90, 44, 140, 0.15], [145, 70, 70, 0.3], [230, 52, 170, 0.1],
  [300, 80, 110, 0.4], [400, 46, 200, 0.2], [460, 66, 120, 0.5], [540, 40, 80, 0.35],
  [700, 58, 150, 0.25], [770, 74, 100, 0.45], [860, 48, 190, 0.05], [920, 70, 130, 0.3],
  [1000, 54, 90, 0.55], [1070, 62, 160, 0.15], [1145, 50, 110, 0.4],
];

// Cross-bracing for the crane mast and underside of the jib.
const mastBrace = Array.from({ length: 12 }, (_, i) => {
  const y = 52 + i * 15;
  return `M593 ${y} H607 M${i % 2 ? 607 : 593} ${y} L${i % 2 ? 593 : 607} ${y + 15}`;
}).join(" ");
const jibTruss = Array.from({ length: 11 }, (_, i) => {
  const x = 470 + i * 12;
  return `M${x} 45 L${x + 6} 54 L${x + 12} 45`;
}).join(" ") + " M470 54 H602";

const Skyline = () => {
  const [ref, inView] = useInView({ threshold: 0.3 });
  const ground = 230;
  return (
    <div ref={ref} className={`sky ${inView ? "in" : ""} relative`} aria-hidden>
      <svg viewBox="0 0 1200 240" preserveAspectRatio="xMidYMax slice" className="w-full block aspect-[5/1] min-h-[170px]">
        {buildings.map(([x, w, h, d], i) => (
          <g key={i}>
            <rect className="sky-b" x={x} y={ground - h} width={w} height={h} fill="#232323" style={{ "--d": `${d}s` }} />
            {Array.from({ length: Math.floor(h / 26) }).map((_, r) =>
              [0, 1].map((c) => (
                <rect
                  key={`${r}-${c}`}
                  className="sky-w"
                  x={x + 10 + c * (w / 2 - 4)}
                  y={ground - h + 12 + r * 24}
                  width="8"
                  height="10"
                  fill="#F5B400"
                  style={{ "--d": `${(i * 0.7 + r * 0.9 + c * 1.3) % 5}s` }}
                />
              ))
            )}
          </g>
        ))}

        {/* Tower crane */}
        <g>
          {/* Lattice mast */}
          <line x1="593" y1="52" x2="593" y2={ground} stroke="#F5B400" strokeWidth="2.5" />
          <line x1="607" y1="52" x2="607" y2={ground} stroke="#F5B400" strokeWidth="2.5" />
          <path d={mastBrace} stroke="#F5B400" strokeWidth="1.2" fill="none" opacity="0.85" />
          <rect x="588" y="228" width="24" height="4" fill="#444" />

          {/* Everything above the mast sways together */}
          <g className="crane-jib">
            <rect x="587" y="44" width="26" height="9" fill="#444" />
            <rect x="613" y="38" width="13" height="12" fill="#e6e6e6" />
            <path d="M595 40 L600 8 L605 40" stroke="#F5B400" strokeWidth="2" fill="none" />
            <rect x="466" y="40" width="264" height="5" fill="#F5B400" />
            <path d={jibTruss} stroke="#F5B400" strokeWidth="1.2" fill="none" opacity="0.85" />
            <line x1="600" y1="8" x2="466" y2="40" stroke="#F5B400" strokeWidth="1.2" />
            <line x1="600" y1="8" x2="728" y2="40" stroke="#F5B400" strokeWidth="1.2" />
            <rect x="700" y="45" width="28" height="20" fill="#555" />
            <rect x="494" y="45" width="14" height="6" fill="#444" />
            <g className="crane-hook">
              <line x1="501" y1="51" x2="501" y2="104" stroke="#F5B400" strokeWidth="1.2" />
              <rect x="492" y="104" width="18" height="9" fill="#F5B400" />
              <path d="M497 113 L484 126 M505 113 L518 126" stroke="#F5B400" strokeWidth="1" />
              <rect x="480" y="126" width="42" height="5" fill="#8a8a8a" />
            </g>
          </g>
        </g>

        {/* Ground + truck */}
        <rect x="0" y={ground} width="1200" height="3" fill="#F5B400" />
        <g className="truck">
          <rect x="0" y={ground - 16} width="34" height="14" fill="#F5B400" />
          <rect x="34" y={ground - 11} width="16" height="9" fill="#e6e6e6" />
          <circle cx="10" cy={ground - 1} r="4.5" fill="#111" />
          <circle cx="40" cy={ground - 1} r="4.5" fill="#111" />
        </g>
      </svg>
    </div>
  );
};

const Footer = () => {
  const { openQuote } = useQuote();
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#141414] text-white/70 overflow-hidden">
      {/* Blueprint grid */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
        aria-hidden
      />

      <div className="relative container-px pt-20 pb-14 grid lg:grid-cols-[1.4fr_1fr] gap-12 items-end">
        <div>
          <h2 className="font-display font-extrabold text-white text-4xl md:text-6xl leading-[1.02] max-w-2xl">
            Got a plot?
            <br />
            Let&rsquo;s draw the plan.
          </h2>
          <button onClick={openQuote} className="btn-primary btn-shine mt-8 !px-8 !py-4">
            Get a free quote <span aria-hidden>&rarr;</span>
          </button>
        </div>
        <p className="text-white/60 max-w-sm lg:ml-auto leading-relaxed">
          Share your site, budget and timeline. We reply within one working day with a clear scope and an itemised estimate.
        </p>
      </div>

      <div className="relative container-px grid sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-16 border-t border-white/10 pt-12">
        <div>
          <p className="text-white font-display text-lg">Visit the office</p>
          <address className="not-italic text-sm mt-3 leading-relaxed">
            {SITE.address.map((l) => (<span key={l} className="block">{l}</span>))}
          </address>
        </div>

        <div>
          <p className="text-white font-display text-lg">Talk to us</p>
          <ul className="text-sm mt-3 space-y-2">
            {SITE.phones.map((p) => (
              <li key={p}><a href={`tel:${p.replace(/\s/g, "")}`} className="hover:text-amber transition-colors">{p}</a></li>
            ))}
            <li><a href={`mailto:${SITE.email}`} className="hover:text-amber transition-colors">{SITE.email}</a></li>
          </ul>
        </div>

        <div>
          <p className="text-white font-display text-lg">Site hours</p>
          <ul className="text-sm mt-3 space-y-2">
            {SITE.hours.map((h) => (
              <li key={h.days} className="flex justify-between gap-4 max-w-[240px]"><span>{h.days}</span><span className="text-white/90">{h.time}</span></li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-white font-display text-lg">Explore</p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm mt-3 max-w-[260px]">
            {explore.map((l) => (
              <li key={l.label}>
                <Link to={l.to} className="group inline-flex items-center gap-1 hover:text-white transition-colors">
                  <span className="w-0 group-hover:w-3 h-px bg-amber transition-all duration-300" />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Skyline />

      <div className="relative bg-[#0c0c0c] container-px py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <p>&copy; {year} {SITE.name}. All rights reserved.</p>
        <div className="flex items-center gap-6">
          <Link to="/admin/login" className="hover:text-white transition-colors">Admin login</Link>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group inline-flex items-center gap-2 hover:text-amber transition-colors"
            aria-label="Back to top"
          >
            Back to top
            <span className="w-8 h-8 rounded-full border border-white/25 flex items-center justify-center group-hover:-translate-y-1 group-hover:border-amber transition-all duration-300">&uarr;</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
