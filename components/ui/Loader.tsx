"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export default function Loader() {
  const { t } = useI18n();
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setCount(100);
      setDone(true);
      return;
    }
    const start = performance.now();
    const dur = 1500;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 200);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[300] flex flex-col justify-between bg-bg p-6 md:p-10"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.2em] text-muted">
            <span>Francesco Caro</span>
            <span>{t.loader.tag}</span>
          </div>

          <div className="flex items-end justify-between">
            <motion.span
              className="font-display text-[18vw] leading-[0.8] text-fg md:text-[12vw]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              FC
            </motion.span>
            <span className="font-display text-[14vw] leading-[0.8] text-acid md:text-[8vw]">
              {count}
              <span className="text-fg">%</span>
            </span>
          </div>

          <div className="relative h-[2px] w-full overflow-hidden bg-line">
            <div
              className="absolute inset-y-0 left-0 bg-acid"
              style={{ width: `${count}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
