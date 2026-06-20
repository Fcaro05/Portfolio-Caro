"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { stats, L } from "@/lib/content";

function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const target = parseInt(value, 10) || 0;
  const pad = value.length;
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setN(target);
      return;
    }
    const start = performance.now();
    const dur = 1100;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target]);

  return <span ref={ref}>{String(n).padStart(pad, "0")}</span>;
}

export default function Stats() {
  const { t, locale } = useI18n();

  return (
    <section className="relative border-t border-line py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="mb-14 flex flex-col gap-4 md:mb-20 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-label mb-5">{t.stats.label}</p>
            <h2 className="font-display text-5xl uppercase leading-[0.9] tracking-tight md:text-8xl">
              {t.stats.title}
            </h2>
          </div>
          <p className="max-w-xs font-mono text-xs uppercase tracking-[0.1em] text-muted md:text-right">
            {t.stats.note}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-px overflow-hidden border border-line bg-line lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="flex flex-col gap-3 bg-bg p-7 md:p-10"
            >
              <span className="font-display text-6xl leading-none tracking-tight text-acid md:text-8xl">
                <CountUp value={s.value} />
              </span>
              <span className="font-sans text-sm leading-snug text-muted">
                {L(s.label, locale)}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
