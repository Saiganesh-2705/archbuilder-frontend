import Reveal from "./Reveal";

const features = [
  {
    title: "Fixed-price contracts",
    body: "The number you agree to is the number you pay — no surprise change orders.",
    icon: "M9 14l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "Weekly photo updates",
    body: "A running photo log of your site sent every week, so you're never in the dark.",
    icon: "M4 5a2 2 0 012-2h12a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V5zM8 21v-8h8v8",
  },
  {
    title: "Licensed & insured crews",
    body: "Every trade on site is licensed, insured, and directly managed by us — no unknown subcontractors.",
    icon: "M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z",
  },
  {
    title: "12-month warranty",
    body: "A full year of workmanship coverage after handover, on every project we build.",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    title: "In-house design team",
    body: "Architecture, structural, and interior planning under one roof — no handoffs, no delays.",
    icon: "M3 9.5L12 3l9 6.5M4 10v10a1 1 0 001 1h4v-6h6v6h4a1 1 0 001-1V10",
  },
  {
    title: "On-time guarantee",
    body: "Realistic schedules built with buffer, tracked weekly, and kept — or we make it right.",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

const WhyChooseUs = () => (
  <section className="container-px py-24">
    <Reveal className="max-w-xl">
      <span className="eyebrow">// Why BuildWorks</span>
      <h2 className="section-title mt-4">Six reasons clients build with us twice.</h2>
    </Reveal>

    <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-line">
      {features.map((f, i) => (
        <Reveal
          key={f.title}
          delay={(i % 3) * 100}
          className="group bg-sand p-8 hover:bg-ink transition-colors duration-300"
        >
          <div className="w-12 h-12 rounded-full bg-amber flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.7">
              <path d={f.icon} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3 className="font-display text-lg mt-5 group-hover:text-white transition-colors">{f.title}</h3>
          <p className="text-stone text-sm mt-2 leading-relaxed group-hover:text-white/60 transition-colors">
            {f.body}
          </p>
        </Reveal>
      ))}
    </div>
  </section>
);

export default WhyChooseUs;
