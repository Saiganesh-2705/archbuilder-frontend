import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageHero from "../components/PageHero";
import ProcessSteps from "../components/ProcessSteps";
import Reveal from "../components/Reveal";
import Tilt from "../components/Tilt";
import WordBand from "../components/WordBand";
import ImageMarquee from "../components/ImageMarquee";
import CostEstimator from "../components/CostEstimator";
import SplitText from "../components/SplitText";
import { useQuote } from "../context/QuoteContext";
import { services, icons } from "../components/servicesData";

const ServicesPage = () => {
  const { openQuote } = useQuote();
  return (
  <>
    <Navbar />

    <PageHero
      eyebrow="// Explore our services"
      title="Our Services"
      crumb="Our Services"
      images={[
        "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
      ]}
      labels={["Construction", "Villas", "Renovation", "Interiors"]}
      subtitle="One accountable team for design, construction, renovation and interiors, so you never chase a dozen subcontractors."
      stat={{ end: 240, suffix: "+", label: "Projects delivered", body: "Residential, commercial and interior work finished on schedule." }}
    />

    <section className="container-px py-24">
      <Reveal>
        <span className="eyebrow">// Explore our services</span>
        <SplitText as="h1" text="Building dreams with quality and trust." className="section-title mt-4 max-w-2xl" />
        <p className="text-stone mt-4 max-w-lg">
          From first sketch to final handover, our in-house teams cover every
          stage of your build — so you deal with one accountable partner, not
          a dozen subcontractors.
        </p>
      </Reveal>

      <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((s, i) => (
          <Reveal key={s.slug} delay={(i % 3) * 120} variant={["left", "up", "right"][i % 3]}>
          <Tilt className="h-full border border-line rounded-xl overflow-hidden bg-white/60 flex flex-col hover:shadow-xl">
            <div className="p-6 flex-1">
              <h3 className="font-display text-xl">{s.title}</h3>
              <p className="text-stone text-sm mt-3">{s.summary}</p>
              <ul className="mt-4 space-y-1.5">
                {s.points.map((pt) => (
                  <li key={pt} className="text-sm text-ink/80 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber mt-1.5 flex-shrink-0" /> {pt}
                  </li>
                ))}
              </ul>
              <Link to="/contact" className="inline-flex items-center gap-1 text-xs font-semibold text-ink mt-5 group-hover:text-amber transition-colors">
                Learn more <span aria-hidden className="group-hover:translate-x-1 transition-transform inline-block">&rarr;</span>
              </Link>
            </div>
            <div className="relative h-40 overflow-hidden">
              <img
                src={s.image}
                alt={s.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3 w-9 h-9 rounded bg-amber flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.8">
                  <path d={icons[s.icon]} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </Tilt>
          </Reveal>
        ))}
      </div>
    </section>

    <WordBand words={["PLAN", "BUILD", "FINISH", "HANDOVER"]} />

    <ProcessSteps />

    <ImageMarquee />

    <CostEstimator />

    <section className="bg-ink text-white py-16">
      <Reveal className="container-px flex flex-wrap items-center justify-between gap-6">
        <div>
          <h2 className="font-display text-2xl md:text-3xl max-w-lg">
            Not sure which service fits your project?
          </h2>
          <p className="text-white/60 text-sm mt-2 max-w-md">
            Tell us about your site and goals — we'll recommend the right scope and a realistic budget range.
          </p>
        </div>
        <button onClick={openQuote} className="btn-primary animate-soft-pulse">
          Get a free quote <span aria-hidden>&rarr;</span>
        </button>
      </Reveal>
    </section>

    <Footer />
  </>
  );
};

export default ServicesPage;
