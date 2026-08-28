"use client";

import { useEffect, useRef } from "react";
import { useLenisScroll, usePrefersReducedMotion } from "@/lib/motion";

type MarqueeProps = {
  items: string[];
  reverse?: boolean;
  separator?: React.ReactNode;
  className?: string;
  /** how strongly scroll velocity skews / speeds the track (0 disables) */
  reactivity?: number;
};

/**
 * Infinite horizontal marquee (CSS-driven). On scroll it skews and speeds up
 * proportionally to Lenis scroll velocity, then eases back to rest — a cheap
 * way to make the whole page feel physically connected to the scrollbar.
 */
export default function Marquee({
  items,
  reverse = false,
  separator,
  className,
  reactivity = 1,
}: MarqueeProps) {
  const skewRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  const target = useRef(0); // raw velocity signal
  const current = useRef(0); // eased value

  useLenisScroll(({ velocity }) => {
    target.current = velocity;
  });

  useEffect(() => {
    if (reduced || reactivity === 0) return;
    let raf = 0;
    const loop = () => {
      target.current *= 0.9; // decay the impulse
      current.current += (target.current - current.current) * 0.1;
      const el = skewRef.current;
      if (el) {
        const skew = Math.max(
          -14,
          Math.min(14, current.current * 0.9 * reactivity)
        );
        el.style.setProperty("--vskew", `${skew.toFixed(2)}deg`);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [reduced, reactivity]);

  const sep = separator ?? (
    <span className="mx-6 inline-block h-3 w-3 rotate-45 bg-acid align-middle md:mx-10" />
  );
  const row = (
    <span className="inline-flex items-center">
      {items.map((it, i) => (
        <span key={i} className="inline-flex items-center">
          <span>{it}</span>
          {sep}
        </span>
      ))}
    </span>
  );

  return (
    <div className={`marquee overflow-hidden ${className ?? ""}`}>
      <div ref={skewRef} className="marquee-skew">
        <div className={`marquee-track ${reverse ? "rev" : ""}`}>
          {row}
          {row}
        </div>
      </div>
    </div>
  );
}
