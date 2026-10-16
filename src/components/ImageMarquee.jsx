import SafeImg from "./SafeImg";
import { img } from "../config/images";

const row1 = [
  ["photo-1600596542815-ffad4c1539a9", "Courtyard villa"],
  ["photo-1503387762-592deb58ef4e", "Structure going up"],
  ["photo-1600607687939-ce8a6c25118c", "Living space"],
  ["photo-1613490493576-7fde63acd811", "Modern elevation"],
  ["photo-1504307651254-35680f356dfd", "Site inspection"],
];
const row2 = [
  ["photo-1600047509807-ba8f99d2cdde", "Duplex home"],
  ["photo-1556909114-f6e7ad7d3136", "Kitchen remodel"],
  ["photo-1541976590-713941681591", "Brickwork"],
  ["photo-1600210492486-724fe5c67fb0", "Interior finish"],
  ["photo-1568605114967-8130f3a36994", "Family home"],
];

const Row = ({ items, reverse, speed }) => (
  <div className="marquee-pause overflow-hidden">
    <div className={`flex w-max gap-4 ${reverse ? "marquee-rev" : ""}`} style={{ animation: `marquee ${speed}s linear infinite`, animationDirection: reverse ? "reverse" : "normal" }}>
      {[...items, ...items].map(([id, label], i) => (
        <figure key={i} className="group relative w-64 sm:w-80 h-44 sm:h-56 flex-shrink-0 overflow-hidden bg-ink">
          <SafeImg src={img(id, 700)} alt={label} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <figcaption className="absolute left-0 bottom-0 bg-amber text-ink text-xs font-semibold px-3 py-1.5 -translate-x-full group-hover:translate-x-0 transition-transform duration-300">
            {label}
          </figcaption>
        </figure>
      ))}
    </div>
  </div>
);

/** Two rows of site photos drifting in opposite directions. Pauses on hover. */
const ImageMarquee = () => (
  <section className="py-16 space-y-4 overflow-hidden" aria-label="Photos from our sites">
    <Row items={row1} speed={50} />
    <Row items={row2} speed={60} reverse />
  </section>
);

export default ImageMarquee;
