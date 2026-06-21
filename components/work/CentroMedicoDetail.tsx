"use client";

import Image from "next/image";
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

const color = accentHex.magenta;

export default function CentroMedicoDetail() {
  const { t, locale } = useI18n();
  const project = getProject("centro-medico");
  if (!project) return null;

  return (
    <article className="relative">
      {/* HERO */}
      <header className="relative overflow-hidden border-b border-line px-5 pb-16 pt-28 md:px-10 md:pb-24 md:pt-44">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: `radial-gradient(120% 80% at 85% 0%, ${color}26, transparent 50%)` }}
        />
        <div className="bg-dots absolute inset-0 opacity-30" aria-hidden />

        <div className="relative mx-auto max-w-[1400px]">
          <BackLink />
          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <HeroIn>
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span
                  className="rounded-full px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-black"
                  style={{ background: color }}
                >
                  {project.index}
                </span>
                <span className="section-label">{L(project.kind, locale)}</span>
              </div>
              <h1 className="font-display text-[13vw] uppercase leading-[0.85] tracking-tight sm:text-[10vw] lg:text-[5.6vw]">
                Centro Medico<br />Ambrosiano
              </h1>
              <p
                className="mt-5 max-w-xl font-display text-2xl uppercase leading-tight tracking-tight md:text-3xl"
                style={{ color }}
              >
                {L(project.summary, locale)}
              </p>
            </HeroIn>

            <HeroIn delay={0.15}>
              <Funnel locale={locale} />
            </HeroIn>
          </div>

          <HeaderMeta project={project} color={color} />
        </div>
      </header>

      {/* OVERVIEW */}
      <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-20">
        <Prose label={t.project.overview} text={L(project.overview, locale)} />
      </section>

      {/* SIGNATURE: channels */}
      <section className="border-y border-line bg-bg-soft px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1400px]">
          <Kicker>{locale === "it" ? "I canali" : "The channels"}</Kicker>
          <Channels locale={locale} />
        </div>
      </section>

      {/* CHALLENGE + APPROACH */}
      <section className="mx-auto grid max-w-[1400px] gap-12 px-5 py-16 md:grid-cols-2 md:gap-16 md:px-10 md:py-24">
        <Prose label={t.project.challenge} text={L(project.challenge, locale)} accent={color} />
        <Prose label={t.project.approach} text={L(project.approach, locale)} />
      </section>

      {/* SIGNATURE: ad creatives */}
      <section className="border-t border-line px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1400px]">
          <Kicker>{locale === "it" ? "Creatività & funnel" : "Creative & funnel"}</Kicker>
          <AdMocks locale={locale} />
        </div>
      </section>

      {/* CONTRIBUTIONS + ASIDE */}
      <section className="mx-auto grid max-w-[1400px] gap-12 border-t border-line px-5 py-16 md:grid-cols-12 md:gap-16 md:px-10 md:py-24">
        <div className="md:col-span-7">
          <Contributions project={project} color={color} />
        </div>
        <aside className="flex flex-col gap-12 md:col-span-5 md:pl-10">
          <Results project={project} color={color} />
          <StackList project={project} />
          <VisitCard project={project} color={color} />
        </aside>
      </section>

      <NextProject slug="centro-medico" />
    </article>
  );
}

/* --------------------------- Funnel --------------------------- */

function Funnel({ locale }: { locale: "it" | "en" }) {
  const stages = [
    { it: "Impressioni", en: "Impressions", w: "100%" },
    { it: "Click", en: "Clicks", w: "76%" },
    { it: "Landing page", en: "Landing page", w: "54%" },
    { it: "Lead / Contatto", en: "Lead / Contact", w: "34%" },
  ];
  return (
    <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-2">
      {stages.map((s, i) => (
        <div key={i} className="flex w-full flex-col items-center gap-2">
          <motion.div
            initial={{ opacity: 0, scaleX: 0.5 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.5 }}
            className="flex items-center justify-center rounded-xl border py-4 text-center"
            style={{
              width: s.w,
              borderColor: `${color}44`,
              background: `linear-gradient(180deg, ${color}22, ${color}0a)`,
              boxShadow: i === stages.length - 1 ? `0 0 40px ${color}33` : "none",
            }}
          >
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-fg/90">
              {s[locale]}
            </span>
          </motion.div>
          {i < stages.length - 1 && (
            <span style={{ color }} className="text-sm">
              ↓
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

/* --------------------------- Channels --------------------------- */

function Channels({ locale }: { locale: "it" | "en" }) {
  const ch = [
    {
      t: "Meta Ads",
      c: {
        it: "Facebook & Instagram. Target per interessi, area e comportamento.",
        en: "Facebook & Instagram. Targeting by interest, area and behavior.",
      },
    },
    {
      t: "Google Ads",
      c: {
        it: "Intercetta la domanda consapevole di chi cerca già un servizio.",
        en: "Captures the conscious demand of those already searching.",
      },
    },
    {
      t: "SEO Locale",
      c: {
        it: "Visibilità organica sulle ricerche locali e sulle pagine servizio.",
        en: "Organic visibility on local searches and service pages.",
      },
    },
  ];
  return (
    <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
      {ch.map((c, i) => (
        <motion.div
          key={c.t}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.6 }}
          className="flex flex-col gap-3 bg-bg p-8"
        >
          <span className="h-2 w-2 rounded-full" style={{ background: color }} />
          <span className="font-display text-3xl uppercase leading-none tracking-tight">
            {c.t}
          </span>
          <span className="font-sans text-sm leading-relaxed text-muted">{c.c[locale]}</span>
        </motion.div>
      ))}
    </div>
  );
}

/* --------------------------- Ad mocks --------------------------- */

function AdMocks({ locale }: { locale: "it" | "en" }) {
  const ads = [
    {
      src: "/images/feed 2.png",
      alt: {
        it: "Creatività Centro Medico Ambrosiano per il trattamento Fotona Laser SMOOTH",
        en: "Centro Medico Ambrosiano creative for the Fotona Laser SMOOTH treatment",
      },
    },
    {
      src: "/images/Feed 3.png",
      alt: {
        it: "Creatività Centro Medico Ambrosiano per dolore e difficoltà nei rapporti intimi",
        en: "Centro Medico Ambrosiano creative for pain and difficulty during intimacy",
      },
    },
  ];
  return (
    <div className="mx-auto mt-8 grid max-w-5xl gap-6 md:grid-cols-2">
      {ads.map((a, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.12, duration: 0.6 }}
          className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-bg"
        >
          <Image
            src={a.src}
            alt={a.alt[locale]}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-contain"
          />
        </motion.div>
      ))}
    </div>
  );
}
