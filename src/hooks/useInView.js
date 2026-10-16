import { useEffect, useRef, useState } from "react";

/**
 * Tracks whether an element has scrolled into the viewport.
 * Returns a ref to attach and a boolean that flips to true once
 * (and stays true) after the element is first seen — good for
 * one-shot reveal/count-up animations.
 */
export default function useInView({ threshold = 0.2, rootMargin = "0px 0px -60px 0px" } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    // Respect users who've asked for reduced motion: show immediately.
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, inView];
}
