"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { domainCards, domainLabel, domainOrder, timeline } from "./data";
import { SectionHead, useT } from "./ui";

export default function Domains({ color }: { color: string }) {
  const { locale, tr } = useT();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="border-t border-line bg-bg-soft px-5 py-16 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <SectionHead
          id="ambiti"
          n="04"
          color={color}
          label={{ it: "Gli ambiti", en: "The domains" }}
          title={{ it: "Tutto quello che fa un'azienda", en: "Everything a company does" }}
          intro={{
            it: "Nove ambiti, con quello che Salus fa in ciascuno.",
            en: "Nine domains, with what Salus does in each.",
          }}
        />

        <div className="mt-10 grid gap-3 md:mt-12 md:grid-cols-2 md:gap-4 xl:grid-cols-3">
          {domainOrder.map((d, i) => {
            const card = domainCards[d];
            const n = timeline.filter((e) => e.domains.includes(d)).length;
            // su mobile è una fisarmonica (una voce aperta alla volta); da md in su tutto resta aperto
            const isOpen = open === i;
            return (
              <motion.article
                key={d}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                transition={{ delay: (i % 3) * 0.08, duration: 0.6 }}
                className={`rounded-3xl border bg-bg p-5 transition-colors md:border-line md:p-8 ${
                  isOpen ? "border-acid/40" : "border-line"
                }`}
              >
                <div className="hidden items-center justify-between md:flex">
                  <span className="font-mono text-xs" style={{ color }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">
                    {n} {locale === "it" ? (n === 1 ? "voce" : "voci") : n === 1 ? "entry" : "entries"}
                  </span>
                </div>
                <h3 className="md:mt-4">
                  <button
                    type="button"
                    data-cursor
                    aria-expanded={isOpen}
                    aria-controls={`ambito-${d}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center gap-4 text-left md:pointer-events-none md:cursor-default"
                  >
                    <span className="font-mono text-xs md:hidden" style={{ color }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 font-display text-2xl uppercase leading-none tracking-tight md:text-4xl">
                      {domainLabel[d][locale]}
                    </span>
                    <span
                      aria-hidden
                      className="font-display text-2xl leading-none transition-transform duration-300 md:hidden"
                      style={{ color, transform: isOpen ? "rotate(45deg)" : "none" }}
                    >
                      +
                    </span>
                  </button>
                </h3>
                <div
                  id={`ambito-${d}`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out md:grid-rows-[1fr] ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="min-h-0 overflow-hidden">
                    <p className="mt-4 font-sans text-base font-medium leading-snug md:mt-3" style={{ color }}>
                      {tr(card.lead)}
                    </p>
                    <ul className="mt-5 flex flex-col gap-3 border-t border-line pt-4">
                      {card.points[locale].map((p, k) => (
                        <li key={k} className="flex items-start gap-3 font-sans text-sm leading-relaxed text-fg/80">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-fg/50" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
