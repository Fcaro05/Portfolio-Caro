"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EASE_IN_OUT, usePrefersReducedMotion } from "@/lib/motion";

/**
 * Route-change transition. `template.tsx` remounts on every navigation, so a
 * plain mount animation is enough — no AnimatePresence needed.
 *
 * The moving part is a `position: fixed` overlay panel; the content wrapper
 * animates opacity ONLY (never transform) so it can't create a containing
 * block that would break GSAP ScrollTrigger pinning inside the page.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();
  const [wiped, setWiped] = useState(false);

  // Safety net: never leave the fixed overlay covering the page if the
  // animation's completion callback doesn't fire.
  useEffect(() => {
    if (wiped) return;
    const t = window.setTimeout(() => setWiped(true), 1100);
    return () => window.clearTimeout(t);
  }, [wiped]);

  if (reduced) return <>{children}</>;

  return (
    <>
      {!wiped && (
        <motion.div
          className="page-wipe"
          aria-hidden
          initial={{ y: 0 }}
          animate={{ y: "-101%" }}
          transition={{ duration: 0.62, ease: EASE_IN_OUT, delay: 0.06 }}
          onAnimationComplete={() => setWiped(true)}
        >
          <motion.span
            className="page-wipe__mark"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: [0, 1, 1, 0], y: 0 }}
            transition={{ duration: 0.6, ease: EASE_IN_OUT }}
          >
            FC
          </motion.span>
        </motion.div>
      )}
      {children}
    </>
  );
}
