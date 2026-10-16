import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Testimonials from "../components/Testimonials";
import PageHero from "../components/PageHero";
import ProcessSteps from "../components/ProcessSteps";
import Reveal from "../components/Reveal";
import Parallax from "../components/Parallax";
import Tilt from "../components/Tilt";
import SafeImg from "../components/SafeImg";
import SplitText from "../components/SplitText";
import WordBand from "../components/WordBand";
import ImageMarquee from "../components/ImageMarquee";
import useInView from "../hooks/useInView";
import useCountUp from "../hooks/useCountUp";
import { img } from "../config/images";

const stats = [
  { value: "18+", label: "Years of excellence" },
  { value: "240+", label: "Projects delivered" },
  { value: "20K+", label: "Happy homeowners" },
  { value: "40+", label: "Skilled team members" },
];

const timeline = [
  { year: "2008", text: "Founded by two site engineers who wanted one accountable team per project, not a dozen subcontractors." },
  { year: "2014", text: "Opened our in-house design studio, bringing 2D/3D planning under the same roof as construction." },
  { year: "2020", text: "Crossed 200 completed homes across residential, commercial, and interior work." },
  { year: "2026", text: "Building the next generation of energy-conscious homes across Tamil Nadu." },
];

const values = [
  { title: "Safety first", body: "Helmets, harnesses and daily toolbox talks on every site.", src: "photo-1504307651254-35680f356dfd" },
  { title: "Honest pricing", body: "Itemised quotes. What we quote is what you pay.", src: "photo-1600607687939-ce8a6c25118c" },
  { title: "Built to last", body: "Tested materials and a written structural warranty.", src: "photo-1541976590-713941681591" },
  { title: "On-time handover", body: "Weekly progress photos keep the schedule visible.", src: "photo-1600596542815-ffad4c1539a9" },
];

const Stat = ({ value, label }) => {
  const [ref, inView] = useInView();
  const num = parseInt(value, 10);
  const suffix = value.replace(/[0-9]/g, "");
  const n = useCountUp(num, { start: inView, duration: 1600 });
  return (
    <div ref={ref}>
      <p className="font-display text-2xl md:text-3xl text-ink">{n}{suffix}</p>
      <p className="text-stone text-xs mt-1">{label}</p>
    </div>
  );
};

const Timeline = () => {
  const [ref, inView] = useInView({ threshold: 0.25 });
  return (
    <div ref={ref} className="relative mt-14">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-ink/10" />
      <div className="absolute top-0 left-0 h-[3px] bg-amber origin-left transition-transform duration-[1800ms] ease-out w-full" style={{ transform: inView ? "scaleX(1)" : "scaleX(0)" }} />
      <div className="grid md:grid-cols-4">
        {timeline.map((t, i) => (
          <div key={t.year} className={`relative pt-8 pr-6 transition-all duration-700 ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`} style={{ transitionDelay: `${400 + i * 350}ms` }}>
            <span className="absolute -top-[7px] left-0 w-4 h-4 rounded-full bg-amber ring-4 ring-sand" />
            <p className="font-display text-3xl text-amber">{t.year}</p>
            <p className="text-stone text-sm mt-3 leading-relaxed">{t.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const AboutPage = () => (
  <>
    <Navbar />

    <PageHero
      eyebrow="// About company"
      title="About Us"
      crumb="About Us"
      images={[
        "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=1600&q=80",
        "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80",
      ]}
      labels={["Our story", "On site", "Our crew"]}
      subtitle="Architects, engineers and site crews working as one accountable team, from the first sketch to the final handover."
      stat={{ end: 18, suffix: "+", label: "Years of excellence", body: "Decades of hands-on expertise behind every home we deliver." }}
      secondary={{ to: "/projects", label: "See our work" }}
    />

    <section className="container-px py-24 grid md:grid-cols-2 gap-14 items-center">
      <Reveal>
        <span className="eyebrow">// About company</span>
        <SplitText text="Building dreams with lasting value." className="section-title mt-4" />
        <p className="mt-5 text-stone leading-relaxed max-w-lg">
          BuildWorks is a team of architects, engineers, and site crews who
          plan every structure around its land — the light, the slope, the
          existing trees. Founded by builders who started on the tools, we
          still walk every site ourselves before a design is signed off.
        </p>
        <p className="mt-4 text-stone leading-relaxed max-w-lg">
          From individual houses to full turnkey developments, we keep one
          accountable team on your project from first sketch to final
          handover — so nothing falls between contractors.
        </p>

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((s) => (
            <Stat key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      </Reveal>

      <Reveal delay={150} variant="right" className="grid grid-cols-2 gap-4">
        <Parallax src={img("photo-1541976590-713941681591", 700)} alt="Site supervisor reviewing brickwork" className="h-64 w-full col-span-2" speed={0.08} />
        <Parallax src={img("photo-1504307651254-35680f356dfd", 500)} alt="Structural framing" className="h-44 w-full" speed={0.16} />
        <Parallax src={img("photo-1503387762-592deb58ef4e", 500)} alt="Architectural drawings" className="h-44 w-full mt-8" speed={-0.12} />
      </Reveal>
    </section>

    <section className="bg-charcoal text-white py-20">
      <div className="container-px grid md:grid-cols-2 gap-10">
        <Reveal className="border-t border-white/15 pt-6">
          <h3 className="font-display text-xl">Our mission</h3>
          <p className="text-white/60 text-sm mt-3 leading-relaxed">
            To create durable, efficient construction projects that prioritize
            safety, innovation, and customer satisfaction at every stage.
          </p>
        </Reveal>
        <Reveal delay={150} className="border-t border-white/15 pt-6">
          <h3 className="font-display text-xl">Our vision</h3>
          <p className="text-white/60 text-sm mt-3 leading-relaxed">
            To build innovative, sustainable environments that inspire growth
            and create long-term value for the families and businesses we work with.
          </p>
        </Reveal>
      </div>
    </section>

    <WordBand words={["SAFETY", "QUALITY", "TRUST", "SPEED"]} dark reverse />

    <section className="container-px py-24">
      <Reveal className="max-w-xl">
        <SplitText text="What we stand for on every site." className="section-title" />
      </Reveal>
      <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {values.map((v, i) => (
          <Reveal key={v.title} delay={i * 110} variant="zoom">
            <Tilt className="h-80 overflow-hidden bg-ink">
              <SafeImg src={img(v.src, 600)} alt="" loading="lazy" className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-110 transition-all duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <div className="w-10 h-1 bg-amber mb-4 group-hover:w-20 transition-all duration-500" />
                <h3 className="font-display text-xl text-white">{v.title}</h3>
                <p className="text-white/70 text-sm mt-2 leading-relaxed">{v.body}</p>
              </div>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>

    <section className="container-px pb-24">
      <Reveal>
        <span className="eyebrow">// Our journey</span>
        <SplitText text="Two decades of steady growth." className="section-title mt-4 max-w-xl" />
      </Reveal>

      <Timeline />
    </section>

    <ProcessSteps />

    <ImageMarquee />

    <Testimonials />

    <section className="bg-ink text-white py-16">
      <Reveal className="container-px flex flex-wrap items-center justify-between gap-6">
        <h2 className="font-display text-2xl md:text-3xl max-w-lg">
          Want to see the sites for yourself?
        </h2>
        <Link to="/projects" className="btn-primary">
          Browse our projects <span aria-hidden>&rarr;</span>
        </Link>
      </Reveal>
    </section>

    <Footer />
  </>
);

export default AboutPage;
