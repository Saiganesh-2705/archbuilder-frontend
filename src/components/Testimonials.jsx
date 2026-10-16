import { useEffect, useState } from "react";
import { testimonialsAPI } from "../services/api";
import Reveal from "./Reveal";

const fallback = [
  {
    _id: "f1",
    name: "Sarah Mitchell",
    role: "Homeowner, Aspen CO",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    quote: "They shaped our home around the land instead of against it. Every room finds the view.",
  },
  {
    _id: "f2",
    name: "David Chen",
    role: "Homeowner, Austin TX",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    quote: "Precise, on schedule, and honest about trade-offs the whole way through.",
  },
];

const Testimonials = () => {
  const [items, setItems] = useState(fallback);
  const [active, setActive] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    testimonialsAPI
      .getAll()
      .then(({ data }) => {
        if (data?.length) setItems(data);
      })
      .catch(() => {});
  }, []);

  // Auto-advance every 6s, pausing is unnecessary since a click resets the timer.
  useEffect(() => {
    if (items.length <= 1) return undefined;
    const id = setInterval(() => {
      goTo((active + 1) % items.length);
    }, 6000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, items.length]);

  const goTo = (i) => {
    if (i === active) return;
    setFade(false);
    setTimeout(() => {
      setActive(i);
      setFade(true);
    }, 200);
  };

  const t = items[active];

  return (
    <section className="container-px py-24 overflow-hidden">
      <Reveal>
        <p className="eyebrow">Client stories</p>
        <h2 className="section-title mt-3 max-w-xl">What homeowners say after moving in.</h2>
      </Reveal>

      <Reveal delay={150} className="mt-12 grid md:grid-cols-[auto_1fr] gap-8 items-start">
        <img
          src={t.avatar}
          alt={t.name}
          className={`w-16 h-16 rounded-full object-cover transition-opacity duration-200 ${fade ? "opacity-100" : "opacity-0"}`}
        />
        <div className={`transition-all duration-200 ${fade ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
          <p className="font-display text-xl md:text-2xl leading-snug max-w-2xl">
            &ldquo;{t.quote}&rdquo;
          </p>
          <p className="mt-4 text-sm text-stone">
            {t.name} &middot; {t.role}
          </p>

          <div className="mt-6 flex gap-2">
            {items.map((item, i) => (
              <button
                key={item._id}
                onClick={() => goTo(i)}
                aria-label={`Show testimonial from ${item.name}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === active ? "w-8 bg-amber" : "w-4 bg-ink/20 hover:bg-ink/40"
                }`}
              />
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default Testimonials;
