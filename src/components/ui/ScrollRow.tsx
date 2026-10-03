"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ScrollRowProps {
  children: React.ReactNode;
  /** Classes for the inner flex track (gap, min-w-max, padding...) */
  trackClassName?: string;
}

/**
 * Horizontal card row that clearly tells the user there is more to scroll:
 *  - arrow buttons (only on the side that has hidden content)
 *  - edge fade (only on the side that has hidden content)
 *  - "Scroll for more" hint + progress bar
 *
 * Must be rendered inside a `relative` parent (arrows are positioned against it).
 */
export default function ScrollRow({ children, trackClassName }: ScrollRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);
  const [progress, setProgress] = useState(0);
  const [visibleRatio, setVisibleRatio] = useState(1);
  const [hasInteracted, setHasInteracted] = useState(false);

  const update = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft < max - 4);
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    setVisibleRatio(el.scrollWidth > 0 ? Math.min(1, el.clientWidth / el.scrollWidth) : 1);
  }, []);

  useEffect(() => {
    update();
    const el = scrollRef.current;
    if (!el) return;
    const ro = new ResizeObserver(update);
    ro.observe(el);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scrollByDir = (dir: 1 | -1) => {
    const el = scrollRef.current;
    if (!el) return;
    setHasInteracted(true);
    el.scrollBy({ left: dir * Math.max(240, el.clientWidth * 0.8), behavior: "smooth" });
  };

  const overflowing = canLeft || canRight;

  return (
    <>
      <div
        ref={scrollRef}
        onScroll={() => {
          update();
          setHasInteracted(true);
        }}
        className="overflow-x-auto pb-4 pt-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        <div ref={trackRef} className={trackClassName ?? "flex items-stretch gap-4 min-w-max pr-12"}>
          {children}
        </div>
      </div>

      {/* Edge fades — only where there is hidden content */}
      <div
        className={`pointer-events-none absolute top-0 left-0 bottom-9 w-16 bg-gradient-to-r from-black to-transparent transition-opacity duration-300 ${
          canLeft ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`pointer-events-none absolute top-0 right-0 bottom-9 w-24 bg-gradient-to-l from-black via-black/60 to-transparent transition-opacity duration-300 ${
          canRight ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Arrows */}
      <button
        type="button"
        aria-label="Scroll left"
        onClick={() => scrollByDir(-1)}
        className={`absolute left-2 top-[calc(50%-18px)] -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center bg-black/80 backdrop-blur border border-[#CBAA69]/60 text-[#CBAA69] shadow-[0_0_20px_rgba(203,170,105,0.25)] hover:bg-[#CBAA69] hover:text-black transition-all duration-300 ${
          canLeft ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <ChevronLeft className="w-5 h-5" strokeWidth={2} />
      </button>
      <button
        type="button"
        aria-label="Scroll right to see more"
        onClick={() => scrollByDir(1)}
        className={`absolute right-2 top-[calc(50%-18px)] -translate-y-1/2 z-20 w-11 h-11 rounded-full flex items-center justify-center bg-black/80 backdrop-blur border border-[#CBAA69]/60 text-[#CBAA69] shadow-[0_0_20px_rgba(203,170,105,0.25)] hover:bg-[#CBAA69] hover:text-black transition-all duration-300 ${
          canRight ? "opacity-100" : "opacity-0 pointer-events-none"
        } ${canRight && !hasInteracted ? "animate-pulse" : ""}`}
      >
        <ChevronRight className="w-5 h-5" strokeWidth={2} />
      </button>

      {/* Hint + progress bar */}
      <div
        className={`flex items-center gap-4 mt-1 transition-opacity duration-300 ${
          overflowing ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
        }`}
      >
        <div className="relative flex-1 h-[2px] bg-white/10 rounded-full overflow-hidden">
          <div
            className="absolute top-0 h-full bg-gradient-to-r from-[#CBAA69] to-[#E8D099] rounded-full transition-[left] duration-150"
            style={{ width: `${visibleRatio * 100}%`, left: `${progress * (1 - visibleRatio) * 100}%` }}
          />
        </div>
        <span className="flex items-center gap-1.5 text-[0.6rem] uppercase tracking-[0.2em] text-[#CBAA69]/80 whitespace-nowrap">
          {canRight ? "Scroll for more" : "End of list"}
          {canRight && <ChevronRight className="w-3 h-3" />}
        </span>
      </div>
    </>
  );
}
