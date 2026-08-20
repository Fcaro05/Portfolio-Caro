"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { timeline, L } from "@/lib/content";

export default function Timeline() {
  const { t, locale } = useI18n();

  return (
    <section
      id="education"
      className="relative border-t border-line py-24 md:py-36"
    >
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="mb-14 md:mb-24">
          <p className="section-label mb-5">{t.timeline.label}</p>
          <h2 className="font-display text-5xl uppercase leading-[0.9] tracking-tight md:text-8xl">
            {t.timeline.title}
          </h2>
        </div>

        <div className="relative">
          {/* vertical line */}
          <span className="absolute left-0 top-0 hidden h-full w-px bg-line md:block md:left-[22%]" />

          {timeline.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative grid gap-3 border-t border-line py-8 md:grid-cols-[22%_1fr] md:gap-10 md:py-12"
            >
              <div className="flex items-center gap-4 md:block">
                <span className="font-mono text-sm text-acid">
                  {L(item.period, locale)}
                </span>
              </div>

              {/* node */}
              <span className="absolute left-[22%] top-8 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 border-bg bg-muted transition-colors duration-300 group-hover:bg-acid md:block md:top-12" />

              <div className="md:pl-10">
                <h3 className="font-display text-3xl uppercase leading-none tracking-tight md:text-5xl">
                  {item.org}
                </h3>
                <p className="mt-2 font-mono text-sm uppercase tracking-[0.1em] text-fg/70">
                  {L(item.role, locale)}
                </p>
                <p className="mt-4 max-w-2xl font-sans text-base leading-relaxed text-muted">
                  {L(item.desc, locale)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
