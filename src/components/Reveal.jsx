import useInView from "../hooks/useInView";

const hidden = {
  up: "opacity-0 translate-y-8",
  left: "opacity-0 -translate-x-12",
  right: "opacity-0 translate-x-12",
  zoom: "opacity-0 scale-90",
  blur: "opacity-0 blur-md translate-y-4",
};
const shown = "opacity-100 translate-y-0 translate-x-0 scale-100 blur-0";

/**
 * Reveals children the first time they scroll into view.
 * variant: "up" (default) | "left" | "right" | "zoom" | "blur"
 */
const Reveal = ({ children, delay = 0, as: Tag = "div", className = "", variant = "up" }) => {
  const [ref, inView] = useInView();

  return (
    <Tag
      ref={ref}
      className={`transition-all duration-[800ms] ease-out ${inView ? shown : hidden[variant] || hidden.up} ${className}`}
      style={{ transitionDelay: inView ? `${delay}ms` : "0ms" }}
    >
      {children}
    </Tag>
  );
};

export default Reveal;
