import { useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "./Reveal";
import SafeImg from "./SafeImg";

const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;

const panels = [
  { title: "Villas & homes", text: "Independent houses and duplexes planned around your plot.", src: "photo-1568605114967-8130f3a36994" },
  { title: "Commercial", text: "Shops, offices and showrooms built to a fixed schedule.", src: "photo-1541976590-713941681591" },
  { title: "Renovation", text: "Kitchens, bathrooms and full-house remodels.", src: "photo-1556909114-f6e7ad7d3136" },
  { title: "Interiors", text: "Joinery, lighting and finishes fitted by our own crew.", src: "photo-1600607687939-ce8a6c25118c" },
  { title: "Live sites", text: "Weekly photo updates from every active site.", src: "photo-1503387762-592deb58ef4e" },
];

/**
 * Accordion-style image strip: hovering (or tapping / focusing) a panel
 * widens it and reveals its caption. Stacks vertically on mobile.
 */
const ExpandingGallery = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="container-px py-24">
      <Reveal className="flex items-end justify-between flex-wrap gap-4">
        <h2 className="section-title max-w-xl">What we build, up close.</h2>
        <Link to="/projects" className="btn-secondary">See our projects <span aria-hidden>&rarr;</span></Link>
      </Reveal>

      <div className="mt-12 flex flex-col md:flex-row gap-3 md:h-[520px]">
        {panels.map((p, i) => {
          const on = i === active;
          return (
            <button
              key={p.title}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              aria-pressed={on}
              className={`xpanel ${on ? "active" : ""} relative overflow-hidden text-left bg-ink h-24 md:h-auto ${on ? "h-72 md:flex-[5]" : "md:flex-[1]"} flex-none md:flex-initial`}
              style={{ flexGrow: on ? 5 : 1, flexBasis: 0, transition: "height 0.5s ease, flex-grow 0.7s cubic-bezier(0.2,0.8,0.2,1)" }}
            >
              <SafeImg src={img(p.src)} alt="" loading="lazy" className={`absolute inset-0 w-full h-full object-cover ${on ? "" : "grayscale-[60%]"}`} />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="font-display font-bold text-white text-lg md:text-xl md:whitespace-nowrap">{p.title}</p>
                <p className={`text-white/75 text-sm mt-1 max-w-xs transition-all duration-500 ${on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3 md:hidden"} ${on ? "" : "hidden md:block md:pointer-events-none"}`}>
                  {p.text}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default ExpandingGallery;
