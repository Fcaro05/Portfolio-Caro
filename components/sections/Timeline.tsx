"use client";

import { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { timeline, L } from "@/lib/content";
import { EASE, usePrefersReducedMotion } from "@/lib/motion";

export default function Timeline() {
  const { t, locale } = useI18n();
  const listRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 70%", "end 80%"],
  });
  const fill = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.4,
  });
  const fillScale = useTransform(fill, [0, 1], [0, 1]);

  const { scrollYProgress: ghostProg } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const ghostX = useTransform(ghostProg, [0, 1], ["8%", "-14%"]);

  return (
    <section
      ref={sectionRef}
      id="education"
      className="relative overflow-hidden border-t border-line py-24 md:py-36"
    >
      <motion.span
        aria-hidden
        style={reduced ? undefined : { x: ghostX }}
        className="pointer-events-none absolute -left-[3%] top-1/2 select-none font-display text-[30vw] leading-none text-fg/[0.025]"
      >
        EDU
      </motion.span>

      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="mb-14 md:mb-24">
          <p className="section-label mb-5">{t.timeline.label}</p>
          <h2 className="font-display text-5xl uppercase leading-[0.9] tracking-tight md:text-8xl">
            {t.timeline.title}
          </h2>
        </div>

        <div ref={listRef} className="relative">
          {/* vertical track + scroll-driven fill */}
          <span className="absolute left-0 top-0 hidden h-full w-px bg-line md:left-[22%] md:block" />
          {!reduced && (
            <motion.span
              aria-hidden
              style={{ scaleY: fillScale }}
              className="absolute left-0 top-0 hidden h-full w-px origin-top bg-acid md:left-[22%] md:block"
            />
          )}

          {timeline.map((item, i) => (
            <TimelineRow
              key={item.id}
              index={i}
              reduced={reduced}
              org={item.org}
              period={L(item.period, locale)}
              role={L(item.role, locale)}
              desc={L(item.desc, locale)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineRow({
  index,
  reduced,
  org,
  period,
  role,
  desc,
}: {
  index: number;
  reduced: boolean;
  org: string;
  period: string;
  role: string;
  desc: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-45% 0px -45% 0px" });
  const fromX = index % 2 ? 70 : -70;

  return (
    <motion.div
      ref={ref}
      initial={reduced ? false : { opacity: 0, x: fromX, y: 24 }}
      whileInView={reduced ? undefined : { opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.8, delay: index * 0.06, ease: EASE }}
      className="group relative grid gap-3 border-t border-line py-10 md:grid-cols-[22%_1fr] md:gap-10 md:py-16"
    >
      {/* huge ghost ordinal */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none font-display text-[22vw] leading-none text-transparent md:text-[12rem]"
        style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.05)" }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative flex items-center gap-4 md:block">
        <span className="font-mono text-sm text-acid">{period}</span>
      </div>

      {/* node — flips to acid + scales when the row is centred */}
      <span
        className="absolute left-[22%] top-10 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 border-bg md:top-16 md:block"
        style={{
          background: inView && !reduced ? "var(--acid)" : "var(--muted)",
          boxShadow:
            inView && !reduced ? "0 0 0 6px rgba(212,255,54,0.14)" : "none",
          transform: `translateX(-50%) scale(${inView && !reduced ? 1.35 : 1})`,
          transition: "background .4s, box-shadow .4s, transform .4s",
        }}
      />

      <div className="relative md:pl-10">
        <h3 className="font-display text-3xl uppercase leading-none tracking-tight md:text-5xl">
          {org}
        </h3>
        <p className="mt-2 font-mono text-sm uppercase tracking-[0.1em] text-fg/70">
          {role}
        </p>
        <p className="mt-4 max-w-2xl font-sans text-base leading-relaxed text-muted">
          {desc}
        </p>
      </div>
    </motion.div>
  );
}
