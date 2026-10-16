import { useCallback, useRef, useState } from "react";
import Reveal from "./Reveal";

/**
 * Drag (mouse or touch) to reveal the "after" image beneath the "before"
 * one — a common pattern on renovation sites, built here with plain React
 * state and pointer events (no library).
 */
const BeforeAfterSlider = ({
  before = "https://images.unsplash.com/photo-1600607687644-c7f34b5063ac?auto=format&fit=crop&w=1200&q=80",
  after = "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
}) => {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const trackRef = useRef(null);

  const updateFromClientX = useCallback((clientX) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  const onPointerMove = (e) => {
    if (!dragging) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    updateFromClientX(clientX);
  };

  const startDrag = (e) => {
    setDragging(true);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    updateFromClientX(clientX);
  };

  const stopDrag = () => setDragging(false);

  return (
    <section className="container-px py-24">
      <Reveal className="max-w-xl mb-10">
        <span className="eyebrow">// See the difference</span>
        <h2 className="section-title mt-4">Drag to compare before &amp; after.</h2>
        <p className="text-stone mt-3">
          A real look at what a BuildWorks renovation changes — not just the
          finishes, but how the whole space feels.
        </p>
      </Reveal>

      <Reveal delay={150}>
        <div
          ref={trackRef}
          className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden rounded-2xl select-none cursor-ew-resize touch-none"
          onMouseMove={onPointerMove}
          onMouseDown={startDrag}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
          onTouchStart={startDrag}
          onTouchMove={onPointerMove}
          onTouchEnd={stopDrag}
        >
          <img src={after} alt="After renovation" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
          <div
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          >
            <img src={before} alt="Before renovation" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
          </div>

          <span className="absolute top-4 left-4 bg-ink/80 text-white text-xs font-bold px-3 py-1.5 rounded-full pointer-events-none">
            BEFORE
          </span>
          <span className="absolute top-4 right-4 bg-amber text-ink text-xs font-bold px-3 py-1.5 rounded-full pointer-events-none">
            AFTER
          </span>

          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white pointer-events-none"
            style={{ left: `${pos}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-white shadow-lg flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.2">
                <path d="M8 7l-5 5 5 5M16 7l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default BeforeAfterSlider;
