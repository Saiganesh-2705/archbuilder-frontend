import Reveal from "./Reveal";

const steps = [
  {
    step: "Step 01",
    title: "Consult & plan",
    body: "We walk your site, understand how you want to live or operate in it, and turn that into a detailed plan and budget.",
    icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
  },
  {
    step: "Step 02",
    title: "Build & manage",
    body: "A dedicated site lead runs the day-to-day work with weekly photo and progress updates, so you're never in the dark.",
    icon: "M4 21V9l8-6 8 6v12M4 21h16M9 21v-6h6v6",
  },
  {
    step: "Step 03",
    title: "Inspect & hand over",
    body: "A final walkthrough and quality checklist before keys change hands — plus a 12-month workmanship warranty.",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
  },
];

const ProcessSteps = () => (
  <section className="container-px py-24">
    <div className="grid md:grid-cols-2 gap-10 items-end">
      <Reveal>
        <span className="eyebrow">// How we work</span>
        <h2 className="section-title mt-4">Efficient, transparent, reliable, professional.</h2>
      </Reveal>
      <Reveal delay={120}>
        <p className="text-stone max-w-md md:ml-auto md:text-right">
          We follow a clear, repeatable workflow that keeps quality high,
          delivery on schedule, and you in the loop the whole way through.
        </p>
      </Reveal>
    </div>

    <div className="mt-14 grid md:grid-cols-3 border-t border-ink/10">
      {steps.map((s, i) => (
        <Reveal key={s.title} delay={i * 140} className="border-b md:border-b-0 md:border-r last:border-r-0 border-ink/10 p-8">
          <span className="inline-block bg-amber text-ink text-xs font-bold px-3 py-1">{s.step}</span>
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="1.6" className="mt-6">
            <path d={s.icon} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <h3 className="font-display text-xl mt-4">{s.title}</h3>
          <p className="text-stone text-sm mt-2 leading-relaxed">{s.body}</p>
        </Reveal>
      ))}
    </div>
  </section>
);

export default ProcessSteps;
