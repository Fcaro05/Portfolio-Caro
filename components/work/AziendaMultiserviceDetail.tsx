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

const color = accentHex.violet;

const CATALOG = [
  "Fabbro",
  "Serrature",
  "Serrande",
  "Tapparelle",
  "Idraulico",
  "Climatizzazione",
  "Condizionatori",
  "Caldaie",
  "Spurghi",
  "Disinfestazione",
  "Derattizzazione",
  "Smaltimento rifiuti",
];

export default function AziendaMultiserviceDetail() {
  const { t, locale } = useI18n();
  const project = getProject("azienda-multiservice");
  if (!project) return null;

  return (
    <article className="relative">
      {/* HERO */}
      <header className="relative overflow-hidden border-b border-line px-5 pb-16 pt-28 md:px-10 md:pb-24 md:pt-44">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: `radial-gradient(120% 80% at 15% 0%, ${color}26, transparent 50%)` }}
        />
        <div className="bg-dots absolute inset-0 opacity-30" aria-hidden />

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
              <h1 className="font-display text-[13vw] uppercase leading-[0.82] tracking-tight lg:text-[5.6vw]">
                Azienda<br />Multiservice
              </h1>
              <p
                className="mt-5 max-w-xl font-display text-2xl uppercase leading-tight tracking-tight md:text-3xl"
                style={{ color }}
              >
                {L(project.summary, locale)}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Badge>-15%</Badge>
                <Badge>{locale === "it" ? "Finanziamento" : "Financing"}</Badge>
                <Badge>{locale === "it" ? "Tessera fedeltà" : "Loyalty card"}</Badge>
              </div>
            </HeroIn>

            <HeroIn delay={0.15}>
              <CatalogCloud />
            </HeroIn>
          </div>

          <HeaderMeta project={project} color={color} />
        </div>
      </header>

      {/* OVERVIEW */}
      <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-20">
        <Prose label={t.project.overview} text={L(project.overview, locale)} />
      </section>

      {/* SIGNATURE: catalog */}
      <section className="border-y border-line bg-bg-soft px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1400px]">
          <Kicker>{locale === "it" ? "Catalogo servizi" : "Service catalog"}</Kicker>
          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3 lg:grid-cols-4">
            {CATALOG.map((s, i) => (
              <motion.div
                key={s}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="group flex items-center justify-between gap-2 bg-bg p-5 transition-colors hover:bg-bg-soft"
              >
                <span className="font-display text-xl uppercase tracking-tight">{s}</span>
                <span
                  className="h-1.5 w-1.5 rounded-full opacity-40 transition-opacity group-hover:opacity-100"
                  style={{ background: color }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CHALLENGE + APPROACH */}
      <section className="mx-auto grid max-w-[1400px] gap-12 px-5 py-16 md:grid-cols-2 md:gap-16 md:px-10 md:py-24">
        <Prose label={t.project.challenge} text={L(project.challenge, locale)} accent={color} />
        <Prose label={t.project.approach} text={L(project.approach, locale)} />
      </section>

      {/* SIGNATURE: social proof */}
      <section className="border-t border-line px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-[1400px] gap-8 md:grid-cols-2 md:items-center">
          <div>
            <Kicker>{locale === "it" ? "Prova sociale" : "Social proof"}</Kicker>
            <p className="mt-4 max-w-md font-sans text-base text-muted">
              {locale === "it"
                ? "Widget recensioni collegato a Google e leve di fiducia integrate nelle landing."
                : "Google-linked review widget and trust levers built into the landings."}
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-bg p-6">
            <div className="flex items-center justify-between">
              <span className="text-2xl tracking-widest" style={{ color }}>
                ★★★★★
              </span>
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted">
                Powered by Google
              </span>
            </div>
            <p className="mt-4 font-sans text-base italic text-fg/80">
              {locale === "it"
                ? "“Trovati grazie a Internet, nelle prime posizioni. Intervento rapido e professionale.”"
                : "“Found them online, in the top results. Fast and professional service.”"}
            </p>
          </div>
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

      <NextProject slug="azienda-multiservice" />
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

function CatalogCloud() {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      {CATALOG.slice(0, 9).map((s, i) => (
        <motion.span
          key={s}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 + i * 0.06 }}
          className="flex items-center justify-center rounded-xl border px-3 py-4 text-center font-mono text-[0.7rem] uppercase tracking-[0.08em]"
          style={{ borderColor: `${color}33`, color: "var(--fg)" }}
        >
          {s}
        </motion.span>
      ))}
    </div>
  );
}
