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

const color = accentHex.cyan;

const SERVICES = ["Fabbro", "Idraulico", "Elettricista", "Serramenti", "Clima", "Spurghi"];
const PROVINCES = ["MI", "MB", "CO", "BG", "NO", "PV", "VA"];

export default function SuperMario24Detail() {
  const { t, locale } = useI18n();
  const project = getProject("supermario24");
  if (!project) return null;

  return (
    <article className="relative">
      {/* HERO */}
      <header className="relative overflow-hidden border-b border-line px-5 pb-16 pt-28 md:px-10 md:pb-24 md:pt-44">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: `radial-gradient(120% 80% at 90% 0%, ${color}22, transparent 50%)` }}
        />
        <div className="bg-grid absolute inset-0 opacity-25" aria-hidden />

        <div className="relative mx-auto max-w-[1400px]">
          <BackLink />
          <div className="mt-10 grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
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
              <h1 className="font-display text-[15vw] uppercase leading-[0.82] tracking-tight lg:text-[7vw]">
                SuperMario24
              </h1>
              <p
                className="mt-5 max-w-xl font-display text-2xl uppercase leading-tight tracking-tight md:text-3xl"
                style={{ color }}
              >
                {L(project.summary, locale)}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Badge>24 / 7 / 365</Badge>
                <Badge>{locale === "it" ? "Intervento ≤ 30 min" : "Response ≤ 30 min"}</Badge>
              </div>
            </HeroIn>

            <HeroIn delay={0.15}>
              <Matrix />
            </HeroIn>
          </div>

          <HeaderMeta project={project} color={color} />
        </div>
      </header>

      {/* OVERVIEW */}
      <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-20">
        <Prose label={t.project.overview} text={L(project.overview, locale)} />
      </section>

      {/* SIGNATURE: URL architecture */}
      <section className="border-y border-line bg-bg-soft px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1400px]">
          <Kicker>{locale === "it" ? "Architettura URL" : "URL architecture"}</Kicker>
          <p className="mt-4 max-w-2xl font-sans text-base text-muted">
            {locale === "it"
              ? "Un pattern serializzabile servizio × territorio, replicabile su centinaia di pagine."
              : "A serializable service × territory pattern, replicable across hundreds of pages."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              "/idraulico/como/",
              "/fabbro/bergamo/",
              "/elettricista/milano/",
              "/serramenti/pavia/",
              "/climatizzazione/varese/",
              "/spurghi/monza/",
            ].map((u, i) => (
              <motion.code
                key={u}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="rounded-lg border border-line bg-bg px-4 py-2 font-mono text-sm"
                style={{ color }}
              >
                {u}
              </motion.code>
            ))}
          </div>
        </div>
      </section>

      {/* CHALLENGE + APPROACH */}
      <section className="mx-auto grid max-w-[1400px] gap-12 px-5 py-16 md:grid-cols-2 md:gap-16 md:px-10 md:py-24">
        <Prose label={t.project.challenge} text={L(project.challenge, locale)} accent={color} />
        <Prose label={t.project.approach} text={L(project.approach, locale)} />
      </section>

      {/* SIGNATURE: funnel */}
      <section className="border-t border-line px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1400px]">
          <Kicker>{locale === "it" ? "Il funnel" : "The funnel"}</Kicker>
          <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
            {[
              { it: "Ricerca locale", en: "Local search" },
              { it: "Landing geo", en: "Geo landing" },
              { it: "Click-to-call", en: "Click-to-call" },
              { it: "Intervento", en: "Dispatch" },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-4 bg-bg p-6">
                <span className="font-display text-3xl leading-none" style={{ color }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-sans text-base text-fg/85">
                  {s[locale]}
                </span>
              </div>
            ))}
          </div>
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

      <NextProject slug="supermario24" />
    </article>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-[0.12em]"
      style={{ borderColor: `${color}55`, color }}
    >
      {children}
    </span>
  );
}

/* --------------------------- Service × territory matrix --------------------------- */

function Matrix() {
  return (
    <div className="overflow-x-auto rounded-2xl border border-line bg-bg p-5">
      <div
        className="inline-grid gap-1.5"
        style={{ gridTemplateColumns: `auto repeat(${PROVINCES.length}, minmax(28px, 1fr))` }}
      >
        <span />
        {PROVINCES.map((p) => (
          <span
            key={p}
            className="text-center font-mono text-[0.6rem] uppercase tracking-wide text-muted"
          >
            {p}
          </span>
        ))}
        {SERVICES.map((s, r) => (
          <div key={s} className="contents">
            <span className="pr-3 font-mono text-[0.62rem] uppercase tracking-wide text-muted">
              {s}
            </span>
            {PROVINCES.map((p, c) => (
              <motion.span
                key={p}
                className="aspect-square rounded-[4px] border"
                style={{ borderColor: `${color}22` }}
                animate={{ backgroundColor: [`${color}08`, `${color}40`, `${color}08`] }}
                transition={{
                  duration: 3,
                  delay: (r + c) * 0.18,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
