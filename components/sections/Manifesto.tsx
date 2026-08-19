"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export default function Manifesto() {
  const { t } = useI18n();
  const m = t.manifesto;

  const lines: { pre: string; strike: string; color: string }[] = [
    { pre: m.line1, strike: m.strike1, color: "bg-magenta" },
    { pre: m.line2, strike: m.strike2, color: "bg-cyan" },
    { pre: m.line3, strike: m.strike3, color: "bg-violet" },
  ];

  return (
    <section
      id="about"
      className="relative border-t border-line px-5 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-[1600px]">
        <p className="section-label mb-12 md:mb-20">{m.label}</p>

        <div className="font-display text-4xl uppercase leading-[1.05] tracking-tight sm:text-5xl md:text-7xl">
          {lines.map((l, i) => (
            <motion.p
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-15%" }}
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="text-muted/60"
            >
              {l.pre}{" "}
              <Strike color={l.color}>{l.strike}</Strike>
            </motion.p>
          ))}

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-acid glow-acid md:mt-10"
          >
            {m.punch}
          </motion.p>
        </div>

        <div className="mt-16 grid gap-8 border-t border-line pt-12 md:mt-28 md:grid-cols-2 md:gap-16">
          {[m.p1, m.p2].map((p, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              className="max-w-xl font-sans text-lg leading-relaxed text-fg/80 md:text-xl"
            >
              {p}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
}

function Strike({
  children,
  color,
}: {
  children: React.ReactNode;
  color: string;
}) {
  return (
    <span className="relative inline-block text-fg">
      {children}
      <motion.span
        aria-hidden
        className={`absolute left-0 top-[55%] h-[0.09em] w-full origin-left -translate-y-1/2 ${color}`}
        variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </span>
  );
}
