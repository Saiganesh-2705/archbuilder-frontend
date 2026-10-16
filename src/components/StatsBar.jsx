import useCountUp from "../hooks/useCountUp";
import useInView from "../hooks/useInView";

const stats = [
  { end: 18, suffix: "+", label: "Years experience", body: "Decades of hands-on expertise setting the benchmark for trusted construction." },
  { end: 240, suffix: "+", label: "Completed projects", body: "Delivered on time, across residential, commercial, and interior work." },
  { end: 20, suffix: "K+", label: "Happy homeowners", body: "Committed to client satisfaction through exceptional building services." },
  { end: 100, suffix: "%", label: "Safety record", body: "Maintaining the highest safety standards on every active site." },
];

const StatCard = ({ stat, delay }) => {
  const [ref, inView] = useInView();
  const count = useCountUp(stat.end, { start: inView, duration: 1500 });

  return (
    <div
      ref={ref}
      className={`border-t border-ink/10 pt-6 transition-all duration-700 ease-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <p className="text-xs font-bold tracking-wide text-stone uppercase">{stat.label}</p>
      <p className="font-display font-extrabold text-4xl md:text-5xl text-ink mt-3">
        {count}
        <span className="text-amber">{stat.suffix}</span>
      </p>
      <p className="text-stone text-sm mt-2 max-w-[220px]">{stat.body}</p>
    </div>
  );
};

const StatsBar = () => (
  <section className="container-px py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
    {stats.map((s, i) => (
      <StatCard key={s.label} stat={s} delay={i * 120} />
    ))}
  </section>
);

export default StatsBar;
