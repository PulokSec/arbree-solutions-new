"use client";

import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";

/** Animates the numeric portion of a string like "100+" or "51" up from 0 when scrolled into view. */
export function useCountUp(value: string, duration = 1400) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : null;
  const suffix = match ? match[2] : "";
  const [display, setDisplay] = useState(target === null ? value : "0" + suffix);

  useEffect(() => {
    if (!inView || target === null) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }

    let frame: number;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * target) + suffix);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, target, suffix, duration]);

  return { ref, display: target === null ? value : display };
}
