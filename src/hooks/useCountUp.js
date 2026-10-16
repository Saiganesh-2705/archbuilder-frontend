import { useEffect, useRef, useState } from "react";

/**
 * Animates a number from 0 up to `end` over `duration` ms, once `start` is true.
 * Uses requestAnimationFrame with an ease-out curve for a smooth finish.
 */
export default function useCountUp(end, { start = true, duration = 1400 } = {}) {
  const [value, setValue] = useState(0);
  const frame = useRef(null);

  useEffect(() => {
    if (!start) return undefined;

    const numericEnd = Number(end) || 0;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * numericEnd));
      if (progress < 1) {
        frame.current = requestAnimationFrame(tick);
      }
    };

    frame.current = requestAnimationFrame(tick);
    return () => frame.current && cancelAnimationFrame(frame.current);
  }, [end, start, duration]);

  return value;
}
