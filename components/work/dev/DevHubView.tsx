"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { accentHex } from "@/lib/content";
import { BackLink, HeroIn, Meta } from "../parts";
import { SectionHead, useT } from "../salus/ui";
import { BrowserFrame, PhoneFrame } from "./ui";
import { appShots, devProjects, quoteFlow, stackGroups, type DevProject } from "./data";

const color = accentHex.cyan;

export default function DevHubView() {
  const { t, locale } = useI18n();
  const it = locale === "it";

  return (
    <article className="relative">
      {/* HERO */}
      <header className="relative flex min-h-[100svh] flex-col overflow-hidden border-b border-line px-5 pb-10 pt-28 md:px-10 md:pb-12 md:pt-32">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: `radial-gradient(120% 80% at 85% 0%, ${color}26, transparent 50%)` }}
        />
        <div className="bg-dots absolute inset-0 opacity-30" aria-hidden />

        <div className="relative mx-auto flex w-full max-w-[1400px] flex-1 flex-col">
          <BackLink />
          <HeroIn className="my-10 md:my-auto md:py-8">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span
                className="rounded-full px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-black"
                style={{ background: color }}
              >
                Dev
              </span>
              <span className="section-label">
                {devProjects.length} {it ? "progetti" : "projects"}
              </span>
            </div>
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-end lg:gap-14">
              <h1 className="font-display text-[14vw] uppercase leading-[0.85] tracking-tight sm:text-[11vw] lg:text-[7.5vw]">
                {it ? "So programmare" : "I can build"}
              </h1>
              <p className="max-w-xl font-sans text-lg leading-relaxed text-fg/80">
                {it
                  ? "Tre progetti in cui conta come sono fatti: il sito di Salus, il gestionale con cui l'azienda lavora e l'app per i pazienti. Dal front-end 3D al backend, fino al mobile."
                  : "Three projects where how they are built is what counts: the Salus website, the system the company runs on and the patient app. From the 3D front end to the backend, down to mobile."}
              </p>
            </div>
          </HeroIn>

          <div className="mt-auto grid grid-cols-2 gap-6 border-t border-line pt-8 md:grid-cols-4">
            <Meta label={it ? "Progetti" : "Projects"} value={`${devProjects.length}`} />
            <Meta label={it ? "Linguaggi" : "Languages"} value="TypeScript · Python · Dart" />
            <Meta label={it ? "Periodo" : "Period"} value="2025 — 2026" />
            <Meta label={it ? "Online" : "Live"} value={it ? "1 su 3, gli altri sono interni" : "1 of 3, the others are internal"} />
          </div>
        </div>
      </header>

      {/* PROJECTS */}
      <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-28">
        <SectionHead
          id="progetti"
          n="01"
          color={color}
          label={{ it: "I progetti", en: "The projects" }}
          title={{ it: "Cosa ho costruito", en: "What I built" }}
          intro={{
            it: "Ogni progetto ha la sua pagina con l'architettura, i numeri e le scelte. Gestionale e app sono strumenti interni: li descrivo senza mostrare dati reali.",
            en: "Each project has its own page with the architecture, the numbers and the choices. The management system and the app are internal: I describe them without showing real data.",
          }}
        />
        <div className="mt-14 flex flex-col gap-6 md:gap-8">
          {devProjects.map((p, i) => (
            <ProjectRow key={p.slug} p={p} flip={i % 2 === 1} />
          ))}
        </div>
      </section>

      {/* STACK */}
      <section className="border-t border-line bg-bg-soft px-5 py-16 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <SectionHead
            id="stack"
            n="02"
            color={color}
            label={{ it: "Lo stack", en: "The stack" }}
            title={{ it: "Con cosa lavoro", en: "What I work with" }}
            intro={{
              it: "Gli strumenti usati davvero in questi tre progetti, raggruppati per ruolo.",
              en: "The tools actually used across these three projects, grouped by role.",
            }}
          />
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 xl:grid-cols-3">
            {stackGroups.map((g) => (
              <StackGroup key={g.title.it} title={locale === "it" ? g.title.it : g.title.en} items={g.items} />
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER NAV */}
      <section className="border-t border-line px-5 py-12 md:px-10 md:py-16">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-6">
          <Link
            href="/#work"
            className="hover-line font-mono text-xs uppercase tracking-[0.18em] text-muted transition-colors hover:text-fg"
          >
            ← {it ? "Tutte le aree" : "All areas"}
          </Link>
          <Link
            href="/#contact"
            data-cursor
            className="inline-flex items-center gap-3 rounded-full px-6 py-3 font-mono text-sm uppercase tracking-[0.1em] text-black transition-transform hover:scale-[1.03]"
            style={{ background: color }}
          >
            {t.contact.cta}
            <span>→</span>
          </Link>
        </div>
      </section>
    </article>
  );
}

function StackGroup({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="bg-bg p-6 md:p-8">
      <div className="font-mono text-[0.7rem] uppercase tracking-[0.16em] text-muted">{title}</div>
      <ul className="mt-4 flex flex-wrap gap-2">
        {items.map((s) => (
          <li key={s} className="tag-chip !text-fg/85">
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectRow({ p, flip }: { p: DevProject; flip: boolean }) {
  const { locale, tr } = useT();
  const it = locale === "it";

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="grid overflow-hidden rounded-3xl border border-line bg-bg-soft md:grid-cols-12"
    >
      <div
        className={`relative flex min-h-[260px] items-center justify-center overflow-hidden border-b border-line p-6 md:col-span-5 md:border-b-0 md:p-8 ${
          flip ? "md:order-2 md:border-l" : "md:border-r"
        }`}
        style={{ background: `radial-gradient(100% 80% at 50% 0%, ${p.color}22, transparent 70%)` }}
      >
        <Visual p={p} />
      </div>

      <div className={`flex flex-col p-6 md:col-span-7 md:p-10 ${flip ? "md:order-1" : ""}`}>
        <div className="flex flex-wrap items-center gap-3">
          <span
            className="rounded-full px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-black"
            style={{ background: p.color }}
          >
            {p.n}
          </span>
          <span className="section-label">{tr(p.kind)}</span>
          <span className="section-label">· {p.period}</span>
          <span
            className="ml-auto rounded-full border px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em]"
            style={{ borderColor: `${p.color}88`, color: p.color }}
          >
            {tr(p.status)}
          </span>
        </div>

        <h2 className="mt-5 font-display text-4xl uppercase leading-[0.9] tracking-tight md:text-6xl">{p.name}</h2>
        <p className="mt-4 max-w-2xl font-sans text-base leading-relaxed text-fg/80 md:text-lg">{tr(p.blurb)}</p>

        <div className="mt-6 grid grid-cols-3 gap-4 border-t border-line pt-5">
          {p.facts.map((f) => (
            <div key={f.label.it}>
              <div className="font-display text-3xl leading-none md:text-4xl" style={{ color: p.color }}>
                {f.value}
              </div>
              <div className="mt-1.5 font-sans text-xs leading-snug text-muted">{tr(f.label)}</div>
            </div>
          ))}
        </div>

        <ul className="mt-6 flex flex-col gap-2">
          {(it ? p.points.it : p.points.en).map((pt) => (
            <li key={pt} className="flex items-start gap-3 font-sans text-sm text-fg/85">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45" style={{ background: p.color }} />
              {pt}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          {p.tags.map((tg) => (
            <span key={tg} className="tag-chip">
              {tg}
            </span>
          ))}
        </div>

        <Link
          href={`/work/${p.slug}`}
          data-cursor
          className="mt-8 inline-flex items-center gap-3 self-start rounded-full px-6 py-3 font-mono text-sm uppercase tracking-[0.1em] text-black transition-transform hover:scale-[1.03]"
          style={{ background: p.color }}
        >
          {it ? "Apri il progetto" : "Open the project"}
          <span>→</span>
        </Link>
      </div>
    </motion.article>
  );
}

/* ----------------------------- visuals ----------------------------- */

function Visual({ p }: { p: DevProject }) {
  if (p.slug === "sito-salus") return <SitoVisual />;
  if (p.slug === "gestionale-salus") return <GestVisual color={p.color} />;
  return <AppVisual color={p.color} />;
}

function SitoVisual() {
  return (
    <div className="relative w-full max-w-md pb-6 pr-10">
      <BrowserFrame src="/dev/sito-salus/home-desktop.webp" alt="salus-ai.com" url="salus-ai.com" />
      <PhoneFrame
        src="/dev/sito-salus/home-mobile.webp"
        alt="salus-ai.com mobile"
        className="absolute bottom-0 right-0 w-20 shadow-xl md:w-24"
      />
    </div>
  );
}

function GestVisual({ color }: { color: string }) {
  const { tr } = useT();
  const stages = ["lead", "qualified", "proposal", "negotiation", "won"];
  return (
    <div className="flex w-full max-w-sm flex-col gap-5" aria-hidden>
      <div className="flex flex-col gap-1.5">
        {stages.map((s, i) => (
          <motion.div
            key={s}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.6 }}
            className="rounded-md px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-black"
            style={{ width: `${100 - i * 14}%`, background: color, opacity: 1 - i * 0.1, transformOrigin: "left" }}
          >
            {s}
          </motion.div>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-1.5">
        {quoteFlow.map((q, i) => (
          <span key={i} className="flex items-center gap-1.5">
            <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.1em] text-fg/85">
              {tr(q.label)}
            </span>
            {i < quoteFlow.length - 1 && <span style={{ color }}>→</span>}
          </span>
        ))}
      </div>
    </div>
  );
}

function AppVisual({ color }: { color: string }) {
  const { tr } = useT();
  const shots = appShots.filter((s) => /03-dashboard|04-farmaci/.test(s.src));
  return (
    <div className="flex items-end justify-center gap-4 pb-2" aria-hidden={false}>
      {shots.map((s, i) => (
        <PhoneFrame
          key={s.src}
          src={s.src}
          alt={tr(s.caption)}
          w={640}
          h={1424}
          className={`w-28 shadow-xl md:w-32 ${i === 1 ? "mb-8" : ""}`}
        />
      ))}
      <span className="sr-only" style={{ color }}>
        {tr({ it: "Schermate dell'app Salus", en: "Salus app screens" })}
      </span>
    </div>
  );
}
