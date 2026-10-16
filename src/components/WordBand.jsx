/** Oversized outlined words scrolling across the page between sections. */
const WordBand = ({ words = ["DESIGN", "BUILD", "DELIVER", "REPEAT"], dark = false, reverse = false }) => {
  const row = [...words, ...words, ...words, ...words];
  return (
    <div className={`overflow-hidden py-6 border-y ${dark ? "bg-ink border-white/10" : "bg-sand border-line"}`} aria-hidden>
      <div className={`flex w-max whitespace-nowrap animate-marquee-slow ${reverse ? "marquee-rev" : ""}`}>
        {row.map((w, i) => (
          <span key={i} className="flex items-center">
            <span
              className={`font-display font-extrabold text-6xl md:text-8xl leading-none px-6 ${i % 2 ? (dark ? "text-white" : "text-ink") : "outline-text"}`}
              style={i % 2 ? undefined : { WebkitTextStroke: `1.5px ${dark ? "rgba(255,255,255,0.45)" : "rgba(17,17,17,0.5)"}` }}
            >
              {w}
            </span>
            <span className="text-amber text-3xl">&#9670;</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default WordBand;
