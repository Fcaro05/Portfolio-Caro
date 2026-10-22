"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useT } from "../salus/ui";
import {
  cases,
  leadSnippets,
  leadWeights,
  linkedinCandidates,
  linkedinPosts,
  linkedinRules,
  PVLM_THRESHOLDS,
  pvlmSlides,
  pvlmVersions,
  taskExamples,
  taskSnippets,
  type CaseData,
  type CaseId,
} from "./data";
import { BlockTitle, CaseHead, CodeBlock, Flow, Limits, MobileTabs, Numbers, PinnedRail, Problem } from "./ui";

const byId = (id: CaseId) => cases.find((c) => c.id === id) as CaseData;

function CaseSection({ c, children }: { c: CaseData; children: React.ReactNode }) {
  return (
    <section id={c.id} className="scroll-mt-20 border-t border-line px-5 py-10 md:px-10 md:py-24">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-7 md:gap-14">{children}</div>
    </section>
  );
}

/* ------------------------------- PVLM ------------------------------- */

export function PvlmCase() {
  const c = byId("pvlm");
  const { locale, tr } = useT();
  const it = locale === "it";

  return (
    <CaseSection c={c}>
      <CaseHead c={c} />
      <Problem text={c.problem} />

      <div>
        <BlockTitle color={c.color}>{it ? "Come funziona" : "How it works"}</BlockTitle>
        <Flow c={c} />
      </div>

      <div>
        <BlockTitle color={c.color}>{it ? "Le schermate vere (ambiente dimostrativo)" : "The real screens (demo environment)"}</BlockTitle>
        {/* mobile: ancorate, scorrono di lato con lo scroll verticale */}
        <div className="mt-4 md:hidden">
          <PinnedRail count={pvlmSlides.length} color={c.color}>
            {pvlmSlides.map((s) => (
              <figure key={s.src} className="flex w-[80vw] shrink-0 flex-col overflow-hidden rounded-2xl border border-line bg-bg-soft">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.src} alt={tr(s.caption)} loading="lazy" decoding="async" width={1280} height={720} className="block h-auto w-full bg-white" />
                <figcaption className="p-3 font-sans text-xs leading-relaxed text-muted">{tr(s.caption)}</figcaption>
              </figure>
            ))}
          </PinnedRail>
        </div>
        <div className="mt-5 hidden gap-4 md:grid md:grid-cols-3">
          {pvlmSlides.map((s, i) => (
            <motion.figure
              key={s.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="flex flex-col overflow-hidden rounded-2xl border border-line bg-bg-soft"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.src} alt={tr(s.caption)} loading="lazy" decoding="async" width={1280} height={720} className="block h-auto w-full bg-white" />
              <figcaption className="p-4 font-sans text-sm leading-relaxed text-muted">{tr(s.caption)}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>

      <div>
        <BlockTitle color={c.color}>
          {it ? "Prima di cambiare un prompt, lo si prova su 204 decisioni validate" : "Before a prompt changes, it is tested on 204 validated decisions"}
        </BlockTitle>
        <div className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-line bg-line">
          {pvlmVersions.map((v) => (
            <div key={v.version} className="grid grid-cols-2 gap-x-4 gap-y-3 bg-bg p-4 md:grid-cols-[170px_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.2fr)] md:items-center md:gap-6 md:p-5">
              <div className="col-span-2 flex items-center gap-3 md:col-span-1 md:block">
                <div className="font-display text-3xl leading-none">{v.version}</div>
                <div className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted md:mt-1">{tr(v.state)}</div>
                <div
                  className="inline-block md:mt-2 rounded-full border px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.12em]"
                  style={v.passed ? { background: c.color, borderColor: c.color, color: "#111508" } : { borderColor: "var(--line)", color: "var(--muted)" }}
                >
                  {v.passed ? (it ? "Promossa" : "Promoted") : it ? "Non superata" : "Not passed"}
                </div>
              </div>
              <Meter label={it ? "Accuratezza" : "Accuracy"} value={v.accuracy} threshold={PVLM_THRESHOLDS.accuracy} color={c.color} />
              <Meter label={it ? "Recall PSUR" : "PSUR recall"} value={v.recall} threshold={PVLM_THRESHOLDS.recall} color={c.color} />
              <p className="col-span-2 font-sans text-xs leading-relaxed text-muted md:col-span-1 md:text-sm">{tr(v.note)}</p>
            </div>
          ))}
        </div>
        <p className="mt-3 font-sans text-sm text-muted">
          {it
            ? "Soglie di promozione: accuratezza 90%, recall PSUR 95%, con una prova di regressione e la doppia approvazione. La v1 aveva l'accuratezza più alta e non è stata promossa."
            : "Promotion thresholds: 90% accuracy, 95% PSUR recall, with a regression run and dual approval. v1 had the highest accuracy and was not promoted."}
        </p>
      </div>

      <Numbers c={c} />
      <Limits c={c} />
    </CaseSection>
  );
}

function Meter({ label, value, threshold, color }: { label: string; value: number; threshold: number; color: string }) {
  const { locale } = useT();
  const pct = (n: number) => `${((n - 80) / 20) * 100}%`;
  const ok = value >= threshold;
  return (
    <div>
      <div className="flex items-baseline justify-between font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted">
        <span>{label}</span>
        <span className="font-display text-2xl leading-none tracking-normal" style={{ color: ok ? color : "var(--fg)" }}>
          {value.toLocaleString(locale === "it" ? "it-IT" : "en-GB", { minimumFractionDigits: 1 })}%
        </span>
      </div>
      <div className="relative mt-2 h-2.5 rounded-full bg-line">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: pct(value), background: ok ? color : "#7b7b8c", transformOrigin: "left" }}
        />
        <span
          aria-hidden
          className="absolute -top-1 h-[18px] w-0.5 bg-fg"
          style={{ left: pct(threshold) }}
          title={`${threshold}%`}
        />
      </div>
      <div className="mt-1 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-muted">
        {locale === "it" ? "soglia" : "threshold"} {threshold}%
      </div>
    </div>
  );
}

/* ------------------------------ LinkedIn ------------------------------ */

const outcomeStyle = {
  chosen: { it: "Scelta", en: "Chosen" },
  dropped: { it: "Scartata", en: "Dropped" },
  out: { it: "Fuori finestra", en: "Out of window" },
};

export function LinkedinCase() {
  const c = byId("linkedin");
  const { locale, tr } = useT();
  const it = locale === "it";
  const [post, setPost] = useState(0);
  const [allRows, setAllRows] = useState(false);
  const [fullText, setFullText] = useState(false);
  const [rules, setRules] = useState(false);
  const p = linkedinPosts[post];

  return (
    <CaseSection c={c}>
      <CaseHead c={c} />
      <Problem text={c.problem} />

      <div>
        <BlockTitle color={c.color}>{it ? "Come funziona" : "How it works"}</BlockTitle>
        <Flow c={c} />
      </div>

      <div>
        <BlockTitle color={c.color}>
          {it ? "La ricerca di settembre: 14 candidati, un punteggio ciascuno (sei righe)" : "The September research: 14 candidates, one score each (six rows)"}
        </BlockTitle>
        <div className="mt-5 overflow-hidden rounded-2xl border border-line">
          {linkedinCandidates.map((k, ki) => (
            <div key={k.id} className={`${ki >= 3 && !allRows ? "hidden md:grid" : "grid"} gap-2 border-b border-line bg-bg p-4 last:border-b-0 md:grid-cols-[48px_minmax(0,1.4fr)_70px_120px_minmax(0,1.6fr)] md:items-center md:gap-5`}>
              <span className="font-mono text-xs" style={{ color: c.color }}>
                {k.id}
              </span>
              <span className="font-sans text-sm text-fg/90">{tr(k.title)}</span>
              <span className="font-mono text-[0.68rem] uppercase tracking-[0.1em] text-muted">{k.date}</span>
              <span
                className="inline-block w-fit rounded-full border px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.12em]"
                style={
                  k.outcome === "chosen"
                    ? { background: c.color, borderColor: c.color, color: "#04201f" }
                    : { borderColor: "var(--line)", color: "var(--muted)" }
                }
              >
                {tr(outcomeStyle[k.outcome])}
              </span>
              <span className="font-sans text-sm leading-relaxed text-muted">{tr(k.note)}</span>
            </div>
          ))}
        </div>
        <button
          type="button"
          data-cursor
          onClick={() => setAllRows((v) => !v)}
          className="mt-3 font-mono text-xs uppercase tracking-[0.12em] hover:underline md:hidden"
          style={{ color: c.color }}
        >
          {allRows ? (it ? "Mostra meno" : "Show less") : it ? "Mostra tutti e 6" : "Show all 6"} {allRows ? "↑" : "↓"}
        </button>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-12 lg:gap-10">
        <div className="min-w-0 lg:col-span-6">
          <BlockTitle color={c.color}>{it ? "Cosa ha pubblicato" : "What it published"}</BlockTitle>
          <div className="mt-5 flex gap-2">
            {linkedinPosts.map((x, i) => (
              <button
                key={x.url}
                type="button"
                data-cursor
                onClick={() => setPost(i)}
                aria-pressed={i === post}
                className="rounded-full border px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.1em] transition-colors"
                style={i === post ? { background: c.color, borderColor: c.color, color: "#04201f" } : { borderColor: "var(--line)", color: "var(--muted)" }}
              >
                {tr(x.date)}
              </button>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-[104px_minmax(0,1fr)] gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] sm:gap-5 md:mt-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.image} alt={it ? "Immagine del post" : "Post image"} loading="lazy" decoding="async" width={720} height={720} className="h-auto w-full rounded-xl border border-line" />
            <div>
              <p className={`whitespace-pre-line font-sans text-sm leading-relaxed text-fg/85 ${fullText ? "" : "line-clamp-[9] md:line-clamp-none"}`}>{tr(p.text)}</p>
              <button type="button" data-cursor onClick={() => setFullText((v) => !v)} className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] md:hidden" style={{ color: c.color }}>
                {fullText ? (it ? "Meno" : "Less") : it ? "Leggi tutto" : "Read more"}
              </button>
              <p className="mt-3 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted">{it ? "Estratto del testo pubblicato" : "Excerpt of the published text"}</p>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor
                className="mt-3 inline-block font-mono text-xs uppercase tracking-[0.12em] hover:underline"
                style={{ color: c.color }}
              >
                {it ? "Vedi il post su LinkedIn" : "See the post on LinkedIn"} →
              </a>
            </div>
          </div>
        </div>
        <div className="min-w-0 lg:col-span-6">
          <button
            type="button"
            data-cursor
            onClick={() => setRules((v) => !v)}
            aria-expanded={rules}
            className="flex w-full items-center justify-between gap-3 text-left md:pointer-events-none"
          >
            <BlockTitle color={c.color}>{it ? "Le regole che l'agente non può saltare" : "The rules the agent can't skip"}</BlockTitle>
            <span aria-hidden className="font-display text-2xl leading-none transition-transform md:hidden" style={{ color: c.color, transform: rules ? "rotate(45deg)" : "none" }}>
              +
            </span>
          </button>
          <div className={`mt-4 md:mt-5 md:block ${rules ? "block" : "hidden"}`}>
            <CodeBlock
              color={c.color}
              s={{
                file: "PIPELINE.md",
                caption: { it: "Il runbook che esegue a ogni run. Estratto.", en: "The runbook it executes on every run. Excerpt." },
                wrap: true,
                lines: linkedinRules,
              }}
            />
          </div>
        </div>
      </div>

      <Numbers c={c} />
      <Limits c={c} />
    </CaseSection>
  );
}

/* ------------------------------ Lead agent ------------------------------ */

const PRIORITY = {
  HIGH: { it: "Alta", en: "High" },
  MEDIUM: { it: "Media", en: "Medium" },
  LOW: { it: "Bassa", en: "Low" },
};

export function LeadCase() {
  const c = byId("lead");
  const { locale, tr } = useT();
  const it = locale === "it";
  const [vals, setVals] = useState<number[]>(leadWeights.map((w) => w.initial));

  // la stessa formula di scoring.ts
  const score = Math.max(0, Math.min(100, vals.reduce((s, v, i) => s + v * leadWeights[i].weight, 0)));
  const priority = score >= 75 ? "HIGH" : score >= 55 ? "MEDIUM" : "LOW";

  return (
    <CaseSection c={c}>
      <CaseHead c={c} />
      <Problem text={c.problem} />

      <div>
        <BlockTitle color={c.color}>{it ? "Come funziona" : "How it works"}</BlockTitle>
        <Flow c={c} />
      </div>

      <div>
        <BlockTitle color={c.color}>{it ? "Provalo: la formula vera, con punteggi scelti da te" : "Try it: the real formula, with scores you choose"}</BlockTitle>
        <div className="mt-5 grid gap-6 rounded-2xl border border-line bg-bg-soft p-5 md:p-8 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:gap-10">
          <div className="flex flex-col gap-5">
            {leadWeights.map((w, i) => (
              <label key={w.key} className="block">
                <div className="flex items-baseline justify-between gap-3 font-sans text-sm text-fg/90">
                  <span>
                    {tr(w.label)} <span className="font-mono text-[0.65rem] text-muted">× {w.weight.toLocaleString(it ? "it-IT" : "en-GB")}</span>
                  </span>
                  <span className="font-display text-2xl leading-none" style={{ color: c.color }}>
                    {vals[i]}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={vals[i]}
                  onChange={(e) => setVals((prev) => prev.map((x, k) => (k === i ? Number(e.target.value) : x)))}
                  className="mt-2 w-full cursor-pointer"
                  style={{ accentColor: c.color }}
                  aria-label={tr(w.label)}
                />
              </label>
            ))}
          </div>
          <div className="flex flex-col justify-center rounded-2xl border border-line bg-bg p-6 text-center">
            <div className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">{it ? "Punteggio di opportunità" : "Opportunity score"}</div>
            <div className="mt-2 font-display text-7xl leading-none" style={{ color: c.color }}>
              {score.toLocaleString(it ? "it-IT" : "en-GB", { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
            </div>
            <div
              className="mx-auto mt-4 rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-[0.14em]"
              style={priority === "LOW" ? { border: "1px solid var(--line)", color: "var(--muted)" } : { background: c.color, color: "#1a0410" }}
            >
              {it ? "Priorità" : "Priority"} {tr(PRIORITY[priority])}
            </div>
            <p className="mt-4 font-sans text-xs leading-snug text-muted">
              {it ? "Alta da 75, media da 55. Gli stessi numeri del codice." : "High from 75, medium from 55. The same numbers as the code."}
            </p>
          </div>
        </div>
      </div>

      <div>
        <BlockTitle color={c.color}>{it ? "Il codice vero" : "The real code"}</BlockTitle>
        <div className="mt-4 md:mt-5">
          <MobileTabs
            color={c.color}
            tabs={leadSnippets.map((s, i) => ({
              label: ["scoring", it ? "regole del prompt" : "prompt rules", it ? "nuovo tentativo" : "retry"][i] ?? s.file,
              node: <CodeBlock s={s} color={c.color} />,
            }))}
            renderAll={
              <div className="grid grid-cols-2 gap-4">
                {leadSnippets.map((s, i) => (
                  <div key={i} className={`min-w-0 ${i === 0 ? "row-span-2" : ""}`}>
                    <CodeBlock s={s} color={c.color} />
                  </div>
                ))}
              </div>
            }
          />
        </div>
      </div>

      <Numbers c={c} />
      <Limits c={c} />
    </CaseSection>
  );
}

/* ------------------------------ Task manager ------------------------------ */

export function TaskCase() {
  const c = byId("task");
  const { locale, tr } = useT();
  const it = locale === "it";
  const [ex, setEx] = useState(0);
  const e = taskExamples[ex];
  const MSGPANEL = (
    <div className="rounded-2xl border border-line bg-bg-soft p-5">
      <div className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">1 · {it ? "Messaggio su Telegram" : "Telegram message"}</div>
      <p className="mt-4 rounded-2xl rounded-tl-sm border border-line bg-bg p-4 font-sans text-sm leading-relaxed text-fg/90">{tr(e.message)}</p>
    </div>
  );
  const JSONPANEL = (
    <CodeBlock
      color={c.color}
      s={{
        file: it ? "2 · JSON restituito da Gemini" : "2 · JSON returned by Gemini",
        caption: { it: "Esempio", en: "Example" },
        lines: e.json,
      }}
              />
  );
  const WRITESPANEL = (
    <div className="rounded-2xl border border-line bg-bg-soft p-5">
      <div className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">3 · {it ? "Cosa fa il codice su Notion" : "What the code does in Notion"}</div>
      <ol className="mt-4 flex flex-col gap-2.5">
        {e.writes.map((w, i) => (
          <li key={i} className="flex items-start gap-3 font-sans text-sm leading-snug text-fg/85">
            <span className="mt-0.5 font-mono text-xs" style={{ color: c.color }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            {tr(w)}
          </li>
        ))}
      </ol>
    </div>
  );

  return (
    <CaseSection c={c}>
      <CaseHead c={c} />
      <Problem text={c.problem} />

      <div>
        <BlockTitle color={c.color}>{it ? "Come funziona" : "How it works"}</BlockTitle>
        <Flow c={c} />
      </div>

      <div>
        <BlockTitle color={c.color}>{it ? "Tre esempi, dal messaggio alle righe su Notion" : "Three examples, from message to Notion rows"}</BlockTitle>
        <div className="mt-5 flex flex-wrap gap-2">
          {taskExamples.map((x, i) => (
            <button
              key={i}
              type="button"
              data-cursor
              onClick={() => setEx(i)}
              aria-pressed={i === ex}
              className="rounded-full border px-4 py-2 font-mono text-[0.68rem] uppercase tracking-[0.1em] transition-colors"
              style={i === ex ? { background: c.color, borderColor: c.color, color: "#0b0620" } : { borderColor: "var(--line)", color: "var(--muted)" }}
            >
              {it ? "Esempio" : "Example"} {i + 1}
            </button>
          ))}
        </div>

        <div className="mt-4 md:mt-5">
          <MobileTabs
            color={c.color}
            tabs={[
              { label: it ? "1 messaggio" : "1 message", node: MSGPANEL },
              { label: "2 JSON", node: JSONPANEL },
              { label: it ? "3 Notion" : "3 Notion", node: WRITESPANEL },
            ]}
            renderAll={
              <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.1fr)] gap-4">
                {MSGPANEL}
                {JSONPANEL}
                {WRITESPANEL}
              </div>
            }
          />
        </div>
        <p className="mt-3 font-sans text-sm text-muted">
          {it
            ? "Esempi con nomi inventati. Il formato del JSON è quello che il prompt vero richiede; la data usa «oggi è il 20 marzo 2026», come nel prompt."
            : "Examples with made-up names. The JSON format is what the real prompt asks for; the date uses “today is 20 March 2026”, as in the prompt."}
        </p>
      </div>

      <div>
        <BlockTitle color={c.color}>{it ? "Il codice vero" : "The real code"}</BlockTitle>
        <div className="mt-4 md:mt-5">
          <MobileTabs
            color={c.color}
            tabs={taskSnippets.map((s, i) => ({
              label: [it ? "il prompt" : "the prompt", it ? "trova o crea" : "find or create"][i] ?? s.file,
              node: <CodeBlock s={s} color={c.color} />,
            }))}
            renderAll={
              <div className="grid grid-cols-2 gap-4">
                {taskSnippets.map((s, i) => (
                  <CodeBlock key={i} s={s} color={c.color} />
                ))}
              </div>
            }
          />
        </div>
      </div>

      <Numbers c={c} />
      <Limits c={c} />
    </CaseSection>
  );
}
