"use client";

import { motion } from "framer-motion";
import { accentHex } from "@/lib/content";
import DevDetailShell from "./dev/DevDetailShell";
import { seeAlso as links } from "@/lib/seealso";
import { LeadCase, LinkedinCase, PvlmCase, TaskCase } from "./ailab/Cases";
import { cases, lessons } from "./ailab/data";
import { PinnedRail } from "./ailab/ui";
import { SectionHead, useT } from "./salus/ui";

const color = accentHex.violet;

export default function AiLabDetail() {
  const { locale, tr } = useT();
  const it = locale === "it";

  return (
    <DevDetailShell slug="ai-lab" badge="02" backToDev={false} showStory={false} compactMobile seeAlso={[links.salusDocs, links.growthTracking]} title={<>AI<br />Lab</>}>
      {/* INDICE: i quattro sistemi, con stato e cosa fanno */}
      <section className="border-t border-line px-5 py-8 md:px-10 md:py-16">
        <div className="-mx-5 mx-auto flex max-w-[1400px] snap-x snap-mandatory scroll-pl-5 gap-3 overflow-x-auto px-5 pb-1 [scrollbar-width:none] md:mx-auto md:grid md:grid-cols-2 md:overflow-visible md:px-0 xl:grid-cols-4 [&::-webkit-scrollbar]:hidden">
          {cases.map((c, i) => (
            <motion.a
              key={c.id}
              href={`#${c.id}`}
              data-cursor
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
              className="group flex w-[72%] shrink-0 snap-start flex-col gap-3 rounded-2xl border border-line bg-bg-soft p-5 transition-colors hover:border-fg/40 md:w-auto"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs" style={{ color: c.color }}>
                  {c.n}
                </span>
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted">{tr(c.status)}</span>
              </div>
              <div className="font-display text-2xl uppercase leading-[0.95] tracking-tight">{c.name}</div>
              <div className="font-sans text-sm text-muted">{tr(c.kind)}</div>
              <div className="mt-auto flex items-baseline gap-2 pt-2">
                <span className="font-display text-3xl leading-none" style={{ color: c.color }}>
                  {c.numbers[0].value}
                </span>
                <span className="font-sans text-xs leading-snug text-muted">{tr(c.numbers[0].label)}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      <PvlmCase />
      <LinkedinCase />
      <LeadCase />
      <TaskCase />

      {/* CHIUSURA */}
      <section className="border-t border-line bg-bg-soft px-5 py-10 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1400px]">
          <SectionHead
            id="lezioni"
            n="05"
            color={color}
            label={{ it: "Cosa ho imparato", en: "What I learned" }}
            title={{ it: "Quattro cose, tutte nel codice", en: "Four things, all in the code" }}
            intro={{
              it: "Non sono principi generali: ognuna si vede in uno dei quattro sistemi sopra.",
              en: "These aren't general principles: each one shows up in one of the four systems above.",
            }}
          />
          <div className="mt-8 md:hidden">
            <PinnedRail count={lessons.length} color={color}>
              {lessons.map((l, i) => (
                <div key={i} className="w-[76vw] shrink-0 rounded-2xl border border-line bg-bg p-5">
                  <span className="font-mono text-xs" style={{ color }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-2xl uppercase leading-[0.95] tracking-tight">{tr(l.title)}</h3>
                  <p className="mt-3 font-sans text-sm leading-relaxed text-muted">{tr(l.body)}</p>
                </div>
              ))}
            </PinnedRail>
          </div>
          <div className="mt-10 hidden gap-3 md:grid md:grid-cols-2">
            {lessons.map((l, i) => (
              <div key={i} className="rounded-2xl border border-line bg-bg p-6">
                <span className="font-mono text-xs" style={{ color }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-2xl uppercase leading-[0.95] tracking-tight">{tr(l.title)}</h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-muted">{tr(l.body)}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 font-sans text-xs text-muted">
            {it
              ? "Il codice mostrato è estratto dai file veri. Chiavi, nomi di clienti e dati di aziende non sono pubblicati."
              : "The code shown is excerpted from the real files. Keys, client names and company data aren't published."}
          </p>
        </div>
      </section>
    </DevDetailShell>
  );
}
