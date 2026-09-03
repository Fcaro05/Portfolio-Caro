"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/motion";
import { Kicker } from "../parts";

const PatternFieldCanvas = dynamic(
  () => import("@/components/three/PatternFieldCanvas"),
  { ssr: false }
);

type L = { it: string; en: string };
type Stage = { id: string; label: L; lines: L[] };

const STAGES: Stage[] = [
  {
    id: "prompt",
    label: { it: "Prompt + contesto", en: "Prompt + context" },
    lines: [
      { it: "system + user", en: "system + user" },
      { it: "+ retrieval / OCR", en: "+ retrieval / OCR" },
    ],
  },
  {
    id: "model",
    label: { it: "Modello", en: "Model" },
    lines: [
      { it: "gemini-2.5-flash · gpt-4o-mini", en: "gemini-2.5-flash · gpt-4o-mini" },
      { it: "1 call · temperatura bassa", en: "1 call · low temperature" },
    ],
  },
  {
    id: "schema",
    label: { it: "Schema", en: "Schema" },
    lines: [
      { it: "response_mime_type: application/json", en: "response_mime_type: application/json" },
      { it: "parse · validate · retry", en: "parse · validate · retry" },
      { it: "niente testo libero", en: "no free text" },
    ],
  },
  {
    id: "tool",
    label: { it: "Tool · azione", en: "Tool · action" },
    lines: [
      { it: "Notion · Sheets · Firestore", en: "Notion · Sheets · Firestore" },
      { it: "lookup → write", en: "lookup → write" },
    ],
  },
  {
    id: "result",
    label: { it: "Risultato", en: "Result" },
    lines: [
      { it: "vincolato ai dati", en: "bound to the data" },
      { it: "log: costo · token · esito", en: "log: cost · tokens · outcome" },
    ],
  },
];

const START = 0.14;
const END = 0.9;

const thesis: L = {
  it: "Tre progetti separati. Un solo modo di far entrare l'LLM nel sistema.",
  en: "Three separate projects. One way of letting the LLM into the system.",
};
const outro: L = {
  it: "Ogni progetto qui sotto applica questo pattern per conto suo.",
  en: "Each project below applies this pattern on its own.",
};

export default function PatternGate() {
  const { locale } = useI18n();
  const reduced = usePrefersReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const trackRef = useRef<HTMLElement>(null);
  const [idx, setIdx] = useState(-1);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  const pos = useTransform(scrollYProgress, [START, END], ["0%", "100%"], {
    clamp: true,
  });
  // screen-space x of the packet (rail spans 10%..90%) — feeds the shader scan
  const scanX = useTransform(scrollYProgress, [START, END], [0.1, 0.9], {
    clamp: true,
  });
  const thesisOpacity = useTransform(scrollYProgress, [0, 0.04, 0.09], [1, 1, 0]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const railOpacity = useTransform(
    scrollYProgress,
    [START - 0.06, START, END, END + 0.05],
    [0, 1, 1, 0.35]
  );
  const outroOpacity = useTransform(scrollYProgress, [0.82, 0.94], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v < START - 0.01) {
      setIdx((p) => (p === -1 ? p : -1));
      return;
    }
    const f = (v - START) / (END - START);
    const i = Math.max(0, Math.min(STAGES.length - 1, Math.floor(f * STAGES.length)));
    setIdx((p) => (p === i ? p : i));
  });

  /* ---------------- reduced motion: static fallback ---------------- */
  if (reduced) {
    return (
      <section className="border-y border-line bg-bg-soft px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1400px]">
          <Kicker>{locale === "it" ? "Il pattern" : "The pattern"}</Kicker>
          <p className="mt-4 max-w-2xl font-sans text-lg leading-relaxed text-fg/80 md:text-xl">
            {thesis[locale]}
          </p>
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {STAGES.map((s, i) => (
              <li
                key={s.id}
                className="rounded-2xl border border-line bg-bg p-5"
              >
                <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-lg uppercase leading-tight tracking-tight">
                  {s.label[locale]}
                </h3>
                <ul className="mt-3 flex flex-col gap-1 font-mono text-[0.7rem] text-muted">
                  {s.lines.map((ln) => (
                    <li key={ln.en}>{ln[locale]}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <p className="mt-8 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-violet">
            guardrails · schema × cost × latency
          </p>
          <p className="mt-6 font-sans text-sm text-muted">{outro[locale]}</p>
        </div>
      </section>
    );
  }

  /* ---------------- immersive version ---------------- */
  const railFrac = (i: number) => `${(i / (STAGES.length - 1)) * 100}%`;

  return (
    <section
      ref={trackRef}
      className="relative border-y border-line bg-bg"
      style={{ height: "360vh" }}
    >
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden">
        <PatternFieldCanvas progress={scrollYProgress} scan={scanX} />

        {/* legibility scrims */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-bg via-bg/70 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-bg via-bg/75 to-transparent"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/2 h-56 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(8,8,10,0.72),transparent_72%)]"
        />

        {/* top meta — sits below the fixed nav */}
        <div className="pointer-events-none absolute inset-x-0 top-[13%] flex items-start justify-between px-5 md:px-10">
          <motion.span
            style={{ opacity: thesisOpacity }}
            className="max-w-md rounded-2xl bg-bg/55 p-4 backdrop-blur-md"
          >
            <span className="section-label text-violet">
              [ {locale === "it" ? "il pattern" : "the pattern"} ]
            </span>
            <span className="mt-3 block font-display text-xl uppercase leading-[1.05] tracking-tight text-fg md:text-3xl">
              {thesis[locale]}
            </span>
          </motion.span>
          <motion.span style={{ opacity: hintOpacity }} className="section-label">
            {locale === "it" ? "scrolla" : "scroll"}
          </motion.span>
        </div>

        {/* pipeline rail */}
        <motion.div
          style={{ opacity: railOpacity }}
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute left-[10%] right-[10%] top-1/2 hidden -translate-y-1/2 md:block">
            <div className="relative h-px w-full bg-white/15">
              <div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-violet via-cyan to-acid opacity-40"
                style={{ width: "100%" }}
              />
              {STAGES.map((s, i) => (
                <div
                  key={s.id}
                  className="absolute top-0 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: railFrac(i) }}
                >
                  <span
                    className={`block h-3 w-3 rotate-45 border transition-all duration-300 ${
                      idx === i
                        ? "scale-125 border-acid bg-acid"
                        : idx > i
                          ? "border-cyan bg-cyan/50"
                          : "border-white/40 bg-bg"
                    }`}
                    style={
                      idx === i
                        ? { boxShadow: "0 0 22px var(--acid)" }
                        : undefined
                    }
                  />
                  <span
                    className={`absolute left-1/2 top-6 w-44 -translate-x-1/2 text-center font-mono text-[0.7rem] uppercase tracking-[0.1em] transition-colors duration-300 ${
                      idx === i
                        ? "text-fg [text-shadow:0_0_10px_rgba(0,0,0,0.9)]"
                        : idx > i
                          ? "text-fg/55"
                          : "text-fg/35"
                    }`}
                  >
                    {s.label[locale]}
                  </span>
                </div>
              ))}
              {/* packet */}
              <motion.span
                className="absolute top-0 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
                style={{
                  left: pos,
                  boxShadow:
                    "0 0 16px #fff, 0 0 34px var(--cyan), 0 0 60px var(--violet)",
                }}
              />
            </div>
          </div>

          {/* mobile vertical rail */}
          <div className="absolute bottom-[16%] left-[14%] top-[16%] w-px bg-line md:hidden">
            <div
              className="absolute inset-x-0 top-0 bg-gradient-to-b from-violet via-cyan to-acid"
              style={{ height: "100%", opacity: 0.35 }}
            />
            {STAGES.map((s, i) => (
              <div
                key={s.id}
                className="absolute left-0 -translate-x-1/2"
                style={{ top: railFrac(i) }}
              >
                <span
                  className={`block h-3 w-3 rotate-45 border ${
                    idx === i
                      ? "border-acid bg-acid"
                      : idx > i
                        ? "border-cyan bg-cyan/40"
                        : "border-muted bg-bg"
                  }`}
                />
                <span
                  className={`absolute left-6 top-1/2 w-48 -translate-y-1/2 font-mono text-[0.7rem] uppercase tracking-[0.1em] ${
                    idx === i ? "text-fg" : "text-muted"
                  }`}
                >
                  {s.label[locale]}
                </span>
              </div>
            ))}
            <motion.span
              className="absolute left-0 h-4 w-4 -translate-x-1/2 rounded-full bg-white"
              style={{
                top: pos,
                boxShadow:
                  "0 0 14px #fff, 0 0 30px var(--cyan), 0 0 48px var(--violet)",
              }}
            />
          </div>
        </motion.div>

        {/* detail card */}
        <div className="pointer-events-none absolute inset-x-4 bottom-[20%] md:inset-x-0 md:bottom-auto md:top-[60%] md:flex md:justify-center">
          <AnimatePresence mode="wait">
            {idx >= 0 && (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-md rounded-2xl border border-line bg-bg-card/80 p-5 backdrop-blur-md md:p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[0.7rem] tracking-[0.15em] text-acid">
                    [ {String(idx + 1).padStart(2, "0")} ]
                  </span>
                  <h3 className="font-display text-xl uppercase leading-none tracking-tight md:text-2xl">
                    {STAGES[idx].label[locale]}
                  </h3>
                </div>
                <ul className="mt-4 flex flex-col gap-2 border-t border-line pt-4 font-mono text-xs text-fg/85">
                  {STAGES[idx].lines.map((ln) => (
                    <li key={ln.en} className="flex gap-2">
                      <span className="text-violet">→</span>
                      {ln[locale]}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* guardrail meter */}
        <motion.div
          style={{ opacity: railOpacity }}
          className="pointer-events-none absolute inset-x-5 bottom-[13%] md:inset-x-10"
        >
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <span className="font-mono text-[0.7rem] uppercase tracking-[0.15em] text-violet">
              guardrails
            </span>
            {["schema", "cost", "latency"].map((g, i) => (
              <div key={g} className="flex items-center gap-2">
                <span className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-muted">
                  {g}
                </span>
                <span className="relative block h-1 w-16 overflow-hidden rounded-full bg-line">
                  <motion.span
                    className="absolute inset-y-0 left-0 rounded-full bg-cyan"
                    animate={{ width: ["18%", "92%", "40%", "72%"] }}
                    transition={{
                      duration: 3.2 + i * 0.6,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "easeInOut",
                    }}
                  />
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* outro */}
        <motion.p
          style={{ opacity: outroOpacity }}
          className="pointer-events-none absolute inset-x-0 bottom-[9%] text-center font-mono text-[0.72rem] uppercase tracking-[0.14em] text-muted"
        >
          {outro[locale]}
        </motion.p>
      </div>
    </section>
  );
}
