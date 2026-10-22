"use client";

import { motion } from "framer-motion";
import { SectionHead, useT } from "./ui";
import type { LStr } from "./data";

type Card = { n: string; title: LStr; body: LStr };

const services: Card[] = [
  {
    n: "01",
    title: { it: "Il cliente paga lo sviluppo", en: "The client pays for development" },
    body: {
      it: "Software su misura per aziende del settore salute, a progetto e a milestone.",
      en: "Custom software for health-sector companies, by project and milestone.",
    },
  },
  {
    n: "02",
    title: { it: "Salus resta titolare", en: "Salus keeps ownership" },
    body: {
      it: "Codice, modelli e configurazioni sono di Salus. Il prodotto si può rivendere.",
      en: "Code, models and configurations belong to Salus. The product can be resold.",
    },
  },
  {
    n: "03",
    title: { it: "Licenza SaaS e canone", en: "SaaS licence and fee" },
    body: {
      it: "Al cliente va una licenza d'uso con canone mensile ricorrente.",
      en: "The client gets a usage licence with a recurring monthly fee.",
    },
  },
];

const rules: { title: LStr; body: LStr }[] = [
  {
    title: { it: "Il margine conta più del fatturato", en: "Margin matters more than revenue" },
    body: {
      it: "Si misura quanto resta dopo i costi vivi. Il tempo dei founder non è un costo di cassa.",
      en: "What counts is what remains after hard costs. Founder time is not a cash cost.",
    },
  },
  {
    title: { it: "Due flussi, mai un totale", en: "Two flows, never a total" },
    body: {
      it: "I servizi entrano, il Med Box assorbe. Sommarli nasconderebbe l'unica cosa che conta.",
      en: "Services bring money in, the Med Box absorbs it. Adding them would hide the one thing that matters.",
    },
  },
  {
    title: { it: "Nessuna quota ceduta a investitori", en: "No equity sold to investors" },
    body: {
      it: "Il prodotto avanza al ritmo dei progetti, quindi più lentamente di come farebbe con un round di capitale.",
      en: "The product moves at the pace of the projects, so more slowly than it would with a funding round.",
    },
  },
];

export default function ModelFlow({ color }: { color: string }) {
  const { tr } = useT();
  return (
    <section className="border-y border-line bg-bg-soft px-5 py-16 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <SectionHead
          id="modello"
          n="01"
          color={color}
          label={{ it: "Il modello", en: "The model" }}
          title={{ it: "I servizi pagano il prodotto", en: "Services pay for the product" }}
          intro={{
            it: "Salus vende sviluppo software nel medicale e usa il margine per costruire un dispositivo suo, senza investitori. Oggi il Med Box è in pausa e a lavorare sono i servizi.",
            en: "Salus sells software development in healthcare and uses the margin to build a device of its own, with no investors. Today the Med Box is paused and services do the work.",
          }}
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-[1fr_auto_minmax(0,0.8fr)] lg:items-stretch">
          {/* SERVIZI */}
          <div className="rounded-3xl border border-line bg-bg p-5 md:p-7">
            <div className="flex items-center justify-between gap-3">
              <span className="font-display text-2xl uppercase tracking-tight md:text-3xl">
                {tr({ it: "Servizi", en: "Services" })}
              </span>
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em]" style={{ color }}>
                {tr({ it: "Generano cassa", en: "Generate cash" })}
              </span>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {services.map((c, i) => (
                <motion.div
                  key={c.n}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="flex flex-col gap-2 rounded-2xl border border-line bg-bg-soft p-4"
                >
                  <span className="font-mono text-xs" style={{ color }}>
                    {c.n}
                  </span>
                  <span className="font-display text-lg uppercase leading-none tracking-tight">
                    {tr(c.title)}
                  </span>
                  <span className="font-sans text-sm leading-snug text-muted">{tr(c.body)}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* MARGINE */}
          <div className="flex items-center justify-center py-1 lg:px-2">
            <div className="flex flex-col items-center gap-2 lg:flex-row lg:gap-0">
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted lg:hidden">
                {tr({ it: "margine", en: "margin" })}
              </span>
              <svg
                viewBox="0 0 120 24"
                className="hidden h-6 w-28 lg:block"
                fill="none"
                aria-hidden
              >
                <path d="M2 12h104" stroke={color} strokeWidth="2" strokeDasharray="4 6">
                  <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1.2s" repeatCount="indefinite" />
                </path>
                <path d="M100 5l14 7-14 7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <svg viewBox="0 0 24 40" className="h-9 w-5 lg:hidden" fill="none" aria-hidden>
                <path d="M12 2v32" stroke={color} strokeWidth="2" strokeDasharray="4 6">
                  <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1.2s" repeatCount="indefinite" />
                </path>
                <path d="M5 28l7 10 7-10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>

          {/* MED BOX */}
          <div className="flex flex-col rounded-3xl border border-dashed border-fg/30 bg-bg p-5 md:p-7">
            <div className="flex items-center justify-between gap-3">
              <span className="font-display text-2xl uppercase tracking-tight md:text-3xl">Med Box</span>
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">
                {tr({ it: "Consuma · in pausa", en: "Consumes · on hold" })}
              </span>
            </div>
            <p className="mt-4 font-sans text-base leading-relaxed text-fg/80">
              {tr({
                it: "Dispositivo proprio per l'aderenza terapeutica, senza clienti e senza ricavi. Riparte quando i servizi hanno accantonato abbastanza.",
                en: "A device of its own for therapy adherence, with no clients and no revenue. It restarts when services have set enough aside.",
              })}
            </p>
            <div className="mt-auto flex gap-6 border-t border-line pt-4">
              <div>
                <div className="font-display text-3xl leading-none" style={{ color }}>
                  250k €
                </div>
                <div className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">
                  {tr({ it: "per ripartire", en: "to restart" })}
                </div>
              </div>
              <div>
                <div className="font-display text-3xl leading-none" style={{ color }}>
                  0,5–1 M€
                </div>
                <div className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted">
                  {tr({ it: "per distribuire", en: "to distribute" })}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {rules.map((r, i) => (
            <div key={i} className="bg-bg p-6">
              <div className="font-display text-xl uppercase leading-tight tracking-tight">
                {tr(r.title)}
              </div>
              <p className="mt-2 font-sans text-sm leading-relaxed text-muted">{tr(r.body)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
