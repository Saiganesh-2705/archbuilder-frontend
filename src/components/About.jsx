const stats = [
  { value: "18", label: "Years building" },
  { value: "240+", label: "Projects delivered" },
  { value: "20K+", label: "Happy homeowners" },
];

const About = () => {
  return (
    <section id="about" className="container-px py-24 grid md:grid-cols-2 gap-12 items-center">
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=900&q=80"
          alt="Architect reviewing house plans on site"
          className="rounded-2xl w-full h-[420px] object-cover"
        />
        <div className="absolute -bottom-8 -left-8 bg-ink text-sand rounded-2xl p-6 hidden md:block max-w-[220px]">
          <p className="font-display text-3xl">18</p>
          <p className="text-sand/70 text-sm mt-1">Years designing homes that fit their land</p>
        </div>
      </div>

      <div>
        <p className="text-clay text-sm font-medium">Who we are</p>
        <h2 className="section-title mt-3">
          We build with the land, not over it.
        </h2>
        <p className="mt-5 text-stone leading-relaxed max-w-lg">
          RealGo is a team of architects, landscape designers, and builders
          who plan every structure around its site — the light, the slope,
          the existing trees. The result is a home that feels like it was
          always meant to be there.
        </p>

        <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-display text-2xl text-ink">{s.value}</p>
              <p className="text-stone text-xs mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
