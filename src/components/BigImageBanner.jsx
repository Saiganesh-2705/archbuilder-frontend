import Reveal from "./Reveal";

/**
 * Full-bleed image section with a bold, oversized statement — a visual
 * "breather" between content-heavy sections on the home page.
 */
const BigImageBanner = ({
  image = "https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=1600&q=80",
  lines = ["Engineering", "confidence,", "building legacy"],
}) => (
  <section
    className="relative h-[60vh] md:h-[70vh] flex items-center justify-center bg-fixed bg-cover bg-center overflow-hidden"
    style={{ backgroundImage: `url('${image}')` }}
  >
    <div className="absolute inset-0 bg-ink/55" aria-hidden />
    <Reveal className="relative text-center px-6">
      <h2 className="font-display font-extrabold text-white leading-[0.95] text-4xl sm:text-6xl md:text-7xl">
        {lines.map((line) => (
          <span key={line} className="block">{line}</span>
        ))}
      </h2>
    </Reveal>
  </section>
);

export default BigImageBanner;
