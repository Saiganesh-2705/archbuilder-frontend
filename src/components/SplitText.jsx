import useInView from "../hooks/useInView";

/** Headline whose words rise out of a mask one after another. */
const SplitText = ({ text, as: Tag = "h2", className = "", delay = 0 }) => {
  const [ref, inView] = useInView({ threshold: 0.3 });
  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span key={i} aria-hidden className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em] mr-[0.26em]">
          <span
            className="inline-block transition-transform duration-[900ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
            style={{ transform: inView ? "translateY(0)" : "translateY(115%)", transitionDelay: `${delay + i * 80}ms` }}
          >
            {w}
          </span>
        </span>
      ))}
    </Tag>
  );
};

export default SplitText;
