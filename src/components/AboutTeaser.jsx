import { Link } from "react-router-dom";
import Reveal from "./Reveal";

const AboutTeaser = () => (
  <section className="container-px py-24 grid md:grid-cols-2 gap-14 items-center">
    <Reveal>
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80"
          alt="Site engineer reviewing structural framing"
          className="w-full h-[420px] object-cover"
        />
        <div className="absolute -bottom-6 -right-6 bg-amber text-ink p-6 hidden sm:block max-w-[200px]">
          <p className="font-display text-3xl font-extrabold">240+</p>
          <p className="text-xs font-semibold mt-1">Projects delivered on time, on budget.</p>
        </div>
      </div>
    </Reveal>

    <Reveal delay={150}>
      <span className="eyebrow">// Why BuildWorks</span>
      <h2 className="section-title mt-4">
        We build around your site, not over it.
      </h2>
      <p className="text-stone mt-5 leading-relaxed max-w-lg">
        Every project starts with a walk of the land — the light, the slope,
        the neighbours. That's how we plan foundations that fit, layouts that
        make sense, and finishes that hold up for decades.
      </p>

      <div className="mt-8 grid sm:grid-cols-2 gap-6">
        <div className="border-t-2 border-amber pt-4">
          <p className="font-display text-lg">Our mission</p>
          <p className="text-stone text-sm mt-2">
            Durable, efficient builds that prioritize safety and client satisfaction.
          </p>
        </div>
        <div className="border-t-2 border-ink pt-4">
          <p className="font-display text-lg">Our vision</p>
          <p className="text-stone text-sm mt-2">
            Sustainable environments that create long-term value for every family we build for.
          </p>
        </div>
      </div>

      <Link to="/about" className="btn-dark mt-8">
        More about us <span aria-hidden>&rarr;</span>
      </Link>
    </Reveal>
  </section>
);

export default AboutTeaser;
