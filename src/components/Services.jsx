import { Link } from "react-router-dom";
import { services, icons } from "./servicesData";
import Reveal from "./Reveal";
import Tilt from "./Tilt";
import SplitText from "./SplitText";

const Services = ({ limit }) => {
  const list = limit ? services.slice(0, limit) : services;

  return (
    <section id="services" className="bg-ink text-white py-24">
      <div className="container-px">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="eyebrow">// Explore our services</span>
            <SplitText text="Building dreams with quality and trust." className="section-title mt-4 text-white" />
          </div>
          {limit && (
            <Link to="/services" className="btn-primary">
              All services <span aria-hidden>&rarr;</span>
            </Link>
          )}
        </Reveal>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {list.map((s, i) => (
            <Reveal key={s.slug} delay={i * 100} variant="zoom">
            <Tilt className="rounded-xl overflow-hidden h-64">
              <img src={s.image} alt={s.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
              <div className="absolute top-4 left-4 w-10 h-10 rounded bg-amber flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8">
                  <path d={icons[s.icon]} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="absolute bottom-0 p-5">
                <h3 className="font-display text-lg leading-snug">{s.title}</h3>
                <p className="text-white/60 text-xs mt-2 line-clamp-2">{s.summary}</p>
              </div>
            </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
