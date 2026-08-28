"use client";

import { useScroll, useSpring, motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/motion";

/** Thin gradient bar at the very top that tracks page scroll progress. */
export default function ScrollProgress() {
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    mass: 0.3,
  });

  if (reduced) return null;

  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX }}
      aria-hidden
    />
  );
}
