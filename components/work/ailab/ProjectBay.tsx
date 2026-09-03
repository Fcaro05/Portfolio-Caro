"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { accentHex } from "@/lib/content";
import { EASE, usePrefersReducedMotion } from "@/lib/motion";
import type { Bay } from "./data";

export default function ProjectBay({ bay }: { bay: Bay }) {
  const { locale } = useI18n();
  const reduced = usePrefersReducedMotion();
  const color = accentHex[bay.accent];
  const [open, setOpen] = useState(false);

  return (
    <motion.section
      id={bay.id}
      initial={reduced ? false : { opacity: 0, y: 40 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.7, ease: EASE }}
      className="relative scroll-mt-24 overflow-hidden rounded-2xl border border-line bg-bg-soft"
    >
      <span
        aria-hidden
        className="absolute left-0 top-0 h-full w-1"
        style={{ background: color }}
      />

      {/* header */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 border-b border-line px-6 py-4 md:px-8">
        <motion.span
          className="h-2.5 w-2.5 rounded-full"
          style={{ background: color, boxShadow: `0 0 12px ${color}` }}
          animate={reduced ? undefined : { opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="font-mono text-xs tracking-[0.15em] text-muted">
          [ {bay.index} ]
        </span>
        <h3 className="font-display text-2xl uppercase leading-none tracking-tight md:text-3xl">
          {bay.name}
        </h3>
        <span className="ml-auto hidden font-mono text-[0.7rem] uppercase tracking-[0.1em] text-muted md:block">
          {bay.stack.join(" · ")}
        </span>
      </div>

      {/* body */}
      <div className="grid gap-8 p-6 md:grid-cols-[1.05fr_0.95fr] md:gap-10 md:p-8">
        <div className="flex flex-col">
          <p className="max-w-md font-sans text-lg leading-relaxed text-fg/85">
            {bay.tagline[locale]}
          </p>
          <Flow steps={bay.flow} color={color} reduced={reduced} />
        </div>

        <dl className="self-start font-mono text-xs">
          {bay.specs.map((s) => (
            <div
              key={s.k}
              className="flex items-baseline justify-between gap-4 border-b border-line/60 py-2.5"
            >
              <dt className="uppercase tracking-[0.12em] text-muted">{s.k}</dt>
              <dd className="text-right text-fg/90">{s.v}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* code */}
      <div className="border-t border-line px-6 pb-6 md:px-8 md:pb-8">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="mt-4 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] transition-colors hover:text-fg"
          style={{ color }}
        >
          <span
            className="inline-block transition-transform"
            style={{ transform: open ? "rotate(90deg)" : "none" }}
          >
            ▸
          </span>
          {open
            ? locale === "it"
              ? "nascondi codice"
              : "hide code"
            : locale === "it"
              ? "mostra frammento"
              : "show fragment"}
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.pre
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="mt-3 overflow-x-auto rounded-xl border border-line bg-bg-card p-4 font-mono text-[0.72rem] leading-relaxed"
              style={{ borderLeft: `2px solid ${color}` }}
            >
              <code>
                {bay.code.map((line, i) => (
                  <div
                    key={i}
                    className={
                      line.trimStart().startsWith("//")
                        ? "text-muted"
                        : "text-fg/85"
                    }
                  >
                    {line || " "}
                  </div>
                ))}
              </code>
            </motion.pre>
          )}
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

/* ------- mini pipeline: step chips with a light running across ------- */

function Flow({
  steps,
  color,
  reduced,
}: {
  steps: string[];
  color: string;
  reduced: boolean;
}) {
  return (
    <div className="relative mt-8 flex flex-wrap items-center gap-2">
      {steps.map((s, i) => (
        <div key={s} className="flex items-center gap-2">
          <span
            className="rounded-md border px-2.5 py-1.5 font-mono text-[0.7rem] uppercase tracking-[0.1em] text-fg/80"
            style={{ borderColor: `${color}55`, background: `${color}12` }}
          >
            {s}
          </span>
          {i < steps.length - 1 && (
            <span className="relative h-px w-6 overflow-visible" style={{ background: `${color}44` }}>
              {!reduced && (
                <motion.span
                  className="absolute -top-[2px] left-0 h-[5px] w-[5px] rounded-full"
                  style={{ background: color, boxShadow: `0 0 8px ${color}` }}
                  initial={{ x: 0, opacity: 0 }}
                  animate={{ x: 24, opacity: [0, 1, 0] }}
                  transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "linear",
                    delay: i * 0.4,
                  }}
                />
              )}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
