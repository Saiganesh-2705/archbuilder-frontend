import Reveal from "./Reveal";

const panels = [
  {
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=700&q=80",
    bg: "bg-amber",
    text: "text-ink",
    heading: "Quality construction, lasting value",
    body: "Delivering exceptional craftsmanship and durable results for every project, from single homes to full developments.",
  },
  {
    image: "https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=700&q=80",
    bg: "bg-ink",
    text: "text-white",
    heading: "Reliable construction, lasting value",
    body: "Ensuring dependable building solutions that stand the test of time, backed by a dedicated site team.",
  },
];

const QualitySplit = () => {
  return (
    <section className="grid md:grid-cols-2">
      {panels.map((p, i) => (
        <Reveal key={p.heading} delay={i * 150} as="div" className="grid grid-cols-1 sm:grid-cols-2">
          <div className="overflow-hidden">
            <img
              src={p.image}
              alt=""
              className="w-full h-full object-cover min-h-[260px] sm:min-h-[320px] hover:scale-110 transition-transform duration-700 ease-out"
            />
          </div>
          <div className={`${p.bg} ${p.text} p-8 md:p-10 flex flex-col justify-center`}>
            <h3 className="font-display font-extrabold text-2xl md:text-3xl leading-tight">{p.heading}</h3>
            <p className="mt-4 text-sm opacity-80 max-w-xs">{p.body}</p>
          </div>
        </Reveal>
      ))}
    </section>
  );
};

export default QualitySplit;
