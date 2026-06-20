"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { pillars, L } from "@/lib/content";
import Marquee from "@/components/ui/Marquee";

const accentText: Record<string, string> = {
  acid: "text-acid",
  magenta: "text-magenta",
  cyan: "text-cyan",
};
const accentBar: Record<string, string> = {
  acid: "bg-acid",
  magenta: "bg-magenta",
  cyan: "bg-cyan",
};
const accentHover: Record<string, string> = {
  acid: "hover:border-acid",
  magenta: "hover:border-magenta",
  cyan: "hover:border-cyan",
};

export default function Capabilities() {
  const { t, locale } = useI18n();

  return (
    <section
      id="capabilities"
      className="relative overflow-hidden border-t border-line py-24 md:py-36"
    >
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="mb-14 flex flex-col gap-4 md:mb-24 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-label mb-5">{t.capabilities.label}</p>
            <h2 className="font-display text-5xl uppercase leading-[0.9] tracking-tight md:text-8xl">
              {t.capabilities.title}
            </h2>
          </div>
          <p className="max-w-xs font-sans text-base text-muted md:text-right">
            {t.capabilities.subtitle}
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {pillars.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative flex flex-col gap-6 border border-transparent bg-bg p-8 transition-colors duration-300 md:p-10 ${accentHover[p.accent]}`}
            >
              <div className="flex items-start justify-between">
                <span className={`font-mono text-sm ${accentText[p.accent]}`}>
                  {p.num}
                </span>
                <span
                  className={`h-2 w-2 rounded-full ${accentBar[p.accent]} opacity-40 transition-opacity duration-300 group-hover:opacity-100`}
                />
              </div>

              <h3 className="font-display text-3xl uppercase leading-none tracking-tight md:text-4xl">
                {L(p.title, locale)}
              </h3>

              <p className="font-sans text-base leading-relaxed text-muted">
                {L(p.blurb, locale)}
              </p>

              <span
                className={`h-[2px] w-12 origin-left ${accentBar[p.accent]} transition-all duration-500 group-hover:w-full`}
              />

              <ul className="mt-auto flex flex-wrap gap-2 pt-2">
                {p.items.map((it) => (
                  <li key={it} className="tag-chip">
                    {it}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-20 border-y border-line py-4 md:mt-32">
        <Marquee
          reverse
          className="font-display text-3xl uppercase tracking-tight text-fg/15 md:text-5xl"
          items={[
            "Product",
            "Marketing",
            "Strategy",
            "Code",
            "Design",
            "Growth",
            "AI",
            "Business",
          ]}
        />
      </div>
    </section>
  );
}
