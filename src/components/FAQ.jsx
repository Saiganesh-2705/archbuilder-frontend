import { useState } from "react";
import Reveal from "./Reveal";

const faqs = [
  {
    q: "How long does a typical project take?",
    a: "A single-family home usually runs 8–14 months from final design to move-in, depending on size and site conditions. We give you a firm schedule once permits are approved.",
  },
  {
    q: "Do you handle permits and approvals?",
    a: "Yes. Our team manages zoning review, permitting, and inspections from start to finish, so you're not chasing paperwork.",
  },
  {
    q: "Can you work with an architect we've already hired?",
    a: "Absolutely. We regularly build from outside architectural drawings, and we're happy to review them with you before breaking ground.",
  },
  {
    q: "What's included in a Schedule a Call consultation?",
    a: "A 30-minute conversation about your site, goals, and budget range, plus a rough scope and next-steps outline — no cost, no obligation.",
  },
  {
    q: "Do you offer sustainable or low-impact building options?",
    a: "Yes, from passive solar orientation to reclaimed materials and native landscaping. Tell us your priorities and we'll build a plan around them.",
  },
];

const FAQItem = ({ item, isOpen, onToggle }) => (
  <div className="border-b border-ink/10 py-6">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between text-left gap-4"
      aria-expanded={isOpen}
    >
      <span className="font-display text-lg">{item.q}</span>
      <span
        className={`flex-shrink-0 w-8 h-8 rounded-full border border-ink/20 flex items-center justify-center transition-all duration-300 hover:border-amber hover:text-amber ${
          isOpen ? "rotate-45 border-amber text-amber" : ""
        }`}
        aria-hidden
      >
        +
      </span>
    </button>
    <div
      className={`grid transition-all duration-300 ease-in-out ${
        isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
      }`}
      style={{ display: "grid" }}
    >
      <div className="overflow-hidden">
        <p className="text-stone text-sm leading-relaxed max-w-xl">{item.a}</p>
      </div>
    </div>
  </div>
);

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faqs" className="container-px py-24 max-w-3xl mx-auto">
      <Reveal>
        <div className="flex justify-center">
          <p className="eyebrow">FAQ's</p>
        </div>
        <h2 className="section-title mt-3 text-center">Questions homeowners ask us most.</h2>
      </Reveal>

      <div className="mt-12">
        {faqs.map((item, i) => (
          <Reveal key={item.q} delay={i * 60}>
            <FAQItem
              item={item}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
            />
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
