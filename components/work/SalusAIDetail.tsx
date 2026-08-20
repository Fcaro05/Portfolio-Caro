"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { getProject, accentHex, L } from "@/lib/content";
import {
  BackLink,
  Kicker,
  HeaderMeta,
  HeroIn,
  Prose,
  Contributions,
  Results,
  StackList,
  VisitCard,
  NextProject,
} from "./parts";
import MedBoxReveal from "./MedBoxReveal";

const color = accentHex.acid;

export default function SalusAIDetail() {
  const { t, locale } = useI18n();
  const project = getProject("salus-ai");
  if (!project) return null;

  return (
    <article className="relative">
      {/* HERO — split: text + med box */}
      <header className="relative overflow-hidden border-b border-line px-5 pb-16 pt-28 md:px-10 md:pb-24 md:pt-44">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: `radial-gradient(120% 80% at 12% 0%, ${color}26, transparent 50%)` }}
        />
        <div className="bg-grid absolute inset-0 opacity-25" aria-hidden />

        <div className="relative mx-auto max-w-[1400px]">
          <BackLink />
          <HeroIn>
            <div className="mt-10 mb-5 flex flex-wrap items-center gap-3">
              <span
                className="rounded-full px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-black"
                style={{ background: color }}
              >
                {project.index}
              </span>
              <span className="section-label" style={{ color }}>
                {t.work.flagship}
              </span>
              <span className="section-label">{L(project.kind, locale)}</span>
            </div>
            <h1 className="font-display text-[16vw] uppercase leading-[0.82] tracking-tight sm:text-[12vw] lg:text-[8vw]">
              Salus<br />AI
            </h1>
            <p
              className="mt-5 max-w-2xl font-display text-2xl uppercase leading-tight tracking-tight md:text-3xl"
              style={{ color }}
            >
              {L(project.summary, locale)}
            </p>
          </HeroIn>

          <HeaderMeta project={project} color={color} textColor="#111508" />
        </div>
      </header>

      {/* SIGNATURE: scroll-driven exploded Smart Med Box */}
      <MedBoxReveal color={color} />

      {/* OVERVIEW */}
      <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-20">
        <Prose label={t.project.overview} text={L(project.overview, locale)} />
      </section>

      {/* SIGNATURE: ecosystem */}
      <section className="border-y border-line bg-bg-soft px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1400px]">
          <Kicker>{locale === "it" ? "L'ecosistema" : "The ecosystem"}</Kicker>
          <Ecosystem locale={locale} />
        </div>
      </section>

      {/* CHALLENGE + APPROACH */}
      <section className="mx-auto grid max-w-[1400px] gap-12 px-5 py-16 md:grid-cols-2 md:gap-16 md:px-10 md:py-24">
        <Prose label={t.project.challenge} text={L(project.challenge, locale)} accent={color} />
        <Prose label={t.project.approach} text={L(project.approach, locale)} />
      </section>

      {/* SIGNATURE: intake flow */}
      <section className="border-t border-line px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1400px]">
          <Kicker>{locale === "it" ? "Come funziona" : "How it works"}</Kicker>
          <IntakeFlow locale={locale} />
        </div>
      </section>

      {/* CONTRIBUTIONS + ASIDE */}
      <section className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 border-t border-line px-5 py-16 md:grid-cols-12 md:gap-16 md:px-10 md:py-24">
        <div className="min-w-0 md:col-span-7">
          <Contributions project={project} color={color} />
        </div>
        <aside className="flex min-w-0 flex-col gap-12 md:col-span-5 md:pl-10">
          <Results project={project} color={color} />
          <StackList project={project} />
          <VisitCard project={project} color={color} />
        </aside>
      </section>

      <NextProject slug="salus-ai" />
    </article>
  );
}

/* --------------------------- Ecosystem diagram --------------------------- */

function Ecosystem({ locale }: { locale: "it" | "en" }) {
  const nodes = [
    {
      t: { it: "Med Box", en: "Med Box" },
      c: { it: "Hardware + sensori di peso", en: "Hardware + weight sensors" },
    },
    {
      t: { it: "App Flutter", en: "Flutter App" },
      c: { it: "Terapie, promemoria, documenti", en: "Therapies, reminders, documents" },
    },
    {
      t: { it: "Cloud + AI", en: "Cloud + AI" },
      c: { it: "Firebase · analisi referti", en: "Firebase · report analysis" },
    },
    {
      t: { it: "Insights", en: "Insights" },
      c: { it: "Storico · caregiver · medico", en: "History · caregiver · doctor" },
    },
  ];
  return (
    <div className="mt-8 grid gap-4 md:grid-cols-7 md:items-stretch">
      {nodes.map((n, i) => (
        <div key={i} className="contents">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.6 }}
            className="flex flex-col gap-2 rounded-2xl border border-line bg-bg p-6 md:col-span-2"
          >
            <span className="font-mono text-xs" style={{ color }}>
              0{i + 1}
            </span>
            <span className="font-display text-2xl uppercase leading-none tracking-tight">
              {n.t[locale]}
            </span>
            <span className="font-sans text-sm text-muted">{n.c[locale]}</span>
          </motion.div>
          {i < nodes.length - 1 && (
            <div className="hidden items-center justify-center md:flex">
              <span className="font-display text-2xl" style={{ color }}>
                →
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* --------------------------- Intake flow --------------------------- */

function IntakeFlow({ locale }: { locale: "it" | "en" }) {
  const steps: { it: string; en: string }[] = [
    { it: "Carichi la terapia nell'app", en: "Load the therapy in the app" },
    { it: "Inserisci i farmaci negli scompartimenti", en: "Place meds in the compartments" },
    { it: "L'app ricorda quando assumere", en: "The app reminds you when to take them" },
    { it: "I sensori rilevano la variazione di peso", en: "Sensors detect the weight change" },
    { it: "Il sistema registra: assunto / mancato / dubbio", en: "The system logs: taken / missed / unsure" },
    { it: "L'AI analizza dati e documenti sanitari", en: "AI analyzes health data and documents" },
  ];
  return (
    <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
      {steps.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className="flex items-start gap-4 bg-bg p-6"
        >
          <span className="font-display text-3xl leading-none" style={{ color }}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <span className="font-sans text-base leading-snug text-fg/85">{s[locale]}</span>
        </motion.div>
      ))}
    </div>
  );
}
