"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useMotionValue,
} from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/motion";

const accent: Record<string, string> = {
  acid: "#d4ff36",
  magenta: "#ff2d8e",
  cyan: "#34e7e4",
  violet: "#8b5cff",
  fg: "#f3f3ec",
};

/**
 * Between-section swipe. Wrap a section's content: as its top crosses the
 * viewport a full-screen accent slab (with a huge section number) sweeps up
 * from the bottom, blanks the screen at the crossover, then exits off the top.
 *
 * The slab is `position: fixed` so it can't be trapped by an ancestor's
 * `overflow` or transformed containing block, and it only mounts while its
 * scroll window is active.
 */
export default function SectionCurtain({
  children,
  num,
  color = "fg",
  className,
}: {
  children: React.ReactNode;
  num: string;
  color?: keyof typeof accent;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });

  // 0 → below screen, 0.5 → covering, 1 → above screen
  const y = useTransform(scrollYProgress, [0, 0.5, 1], ["100%", "0%", "-100%"]);
  const skew = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["-6deg", "0deg", "6deg"]
  );
  const active = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    active.set(v > 0.001 && v < 0.999 ? 1 : 0);
  });
  const display = useTransform(active, (a) => (a ? "flex" : "none"));

  return (
    <div ref={ref} className={`relative ${className ?? ""}`}>
      {children}
      {!reduced && (
        <motion.div
          aria-hidden
          style={{
            y,
            skewY: skew,
            display,
            backgroundColor: accent[color],
          }}
          className="pointer-events-none fixed inset-x-[-10%] inset-y-0 z-[100] scale-110 items-center justify-center overflow-hidden will-change-transform"
        >
          <span className="select-none font-display text-[40vw] leading-[0.7] text-black/85 md:text-[26vw]">
            {num}
          </span>
        </motion.div>
      )}
    </div>
  );
}
