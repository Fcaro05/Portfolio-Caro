"use client";

import { motion } from "framer-motion";
import {
  timeline,
  projectMeta,
  type ProjectId,
  type TimelineEvent,
} from "./data";
import { SectionHead, jump, salusBus, useT } from "./ui";

const YEARS = ["2024", "2025", "2026", "2027", "2028", "Dopo"];

export default function Chronicle({ color }: { color: string }) {
  const { locale, tr } = useT();
  const visible = timeline;

  return (
    <section className="px-5 py-16 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <SectionHead
          id="cronologia"
          n="02"
          color={color}
          label={{ it: "La cronologia", en: "The timeline" }}
          title={{ it: "Dall'idea al 2028", en: "From the idea to 2028" }}
          intro={{
            it: "Ogni voce porta il colore del progetto a cui si riferisce.",
            en: "Each entry carries the colour of the project it belongs to.",
          }}
        />

        {/* PROGETTI */}
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">
            {locale === "it" ? "Progetto" : "Project"}
          </span>
          {(["medbox", "pvlm", "adherence", "company"] as const).map((p) => (
            <span key={p} className="flex items-center gap-2 font-sans text-sm text-fg/85">
              <span
                className="h-3 w-3 rounded-sm"
                style={{ background: projectMeta[p].color }}
              />
              {projectMeta[p].label[locale]}
              {p === "company" && (
                <span className="text-muted">
                  {locale === "it" ? "(tutta Salus)" : "(all of Salus)"}
                </span>
              )}
            </span>
          ))}
        </div>

        {/* YEARS */}
        <div className="mt-14 flex flex-col gap-14 md:gap-20">
            {YEARS.map((y) => {
              const events = visible.filter((e) => e.year === y);
              if (!events.length) return null;
              return (
                <div
                  key={y}
                  className="grid gap-6 md:grid-cols-[200px_minmax(0,1fr)] md:gap-10"
                >
                  <div className="md:sticky md:top-28 md:self-start">
                    <div
                      className="font-display text-7xl leading-none md:text-8xl"
                      style={{ WebkitTextStroke: `1.5px ${color}`, color: "transparent" }}
                    >
                      {y === "Dopo" ? (locale === "it" ? "Poi" : "Later") : y}
                    </div>
                  </div>

                  <ol className="relative flex flex-col gap-5 border-l border-line pl-6 md:pl-10">
                    {events.map((e) => (
                      <Entry key={e.id} e={e} />
                    ))}
                  </ol>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}


function Entry({ e }: { e: TimelineEvent; color?: string }) {
  const { locale, tr } = useT();
  const now = e.state === "now";
  const next = e.state === "next";
  const ids: (ProjectId | "company")[] = e.projects.length ? e.projects : ["company"];
  const colors = ids.map((i) => projectMeta[i].color);
  const color = colors[0];
  const stripe = colors.length > 1 ? `linear-gradient(to bottom, ${colors.join(", ")})` : color;

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      {/* node on the rail */}
      <span
        aria-hidden
        className="absolute -left-[31px] top-5 flex h-3 w-3 items-center justify-center md:-left-[47px]"
      >
        {now && (
          <span
            className="absolute h-6 w-6 animate-ping rounded-full opacity-40"
            style={{ background: color }}
          />
        )}
        <span
          className="relative h-3 w-3 rounded-full border-2"
          style={{
            borderColor: color,
            background: next ? "var(--bg)" : stripe,
          }}
        />
      </span>

      <div
        className={`relative overflow-hidden rounded-2xl border p-5 pl-7 md:p-7 md:pl-9 ${
          next ? "border-dashed border-fg/20" : "border-line"
        }`}
        style={{
          background: `linear-gradient(90deg, ${color}1f, transparent 50%), var(--bg-soft)`,
          ...(now ? { borderColor: color } : null),
        }}
      >
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-1.5"
          style={{ background: stripe }}
        />
        <div className="mb-4 flex flex-wrap gap-2">
          {ids.map((i) => (
            <span
              key={i}
              className="rounded-full px-3 py-1 font-mono text-[0.68rem] font-bold uppercase tracking-[0.14em] text-black"
              style={{ background: projectMeta[i].color }}
            >
              {projectMeta[i].label[locale]}
            </span>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="font-mono text-xs uppercase tracking-[0.16em]" style={{ color }}>
            {tr(e.when)}
          </span>
        </div>
        <h3 className="mt-3 font-display text-2xl uppercase leading-[0.95] tracking-tight md:text-4xl">
          {tr(e.title)}
        </h3>
        <p className="mt-3 max-w-3xl font-sans text-base leading-relaxed text-fg/80 md:text-lg">
          {tr(e.body)}
        </p>
        {e.doc && (
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              data-cursor
              onClick={() => {
                salusBus.doc(e.doc!);
                jump("#documenti");
              }}
              className="font-mono text-xs uppercase tracking-[0.12em] hover:underline"
              style={{ color }}
            >
              {locale === "it" ? "Apri il documento" : "Open the document"} →
            </button>
          </div>
        )}
      </div>
    </motion.li>
  );
}
