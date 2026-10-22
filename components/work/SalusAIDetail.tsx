"use client";

import { useI18n } from "@/lib/i18n";
import { getProject, accentHex, L } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import {
  BackLink,
  Kicker,
  Meta,
  VisitButton,
  HeroIn,
  Contributions,
  Results,
  StackList,
  VisitCard,
  NextProject,
} from "./parts";
import MedBoxReveal from "./MedBoxReveal";
import ModelFlow from "./salus/ModelFlow";
import Chronicle from "./salus/Chronicle";
import Products from "./salus/Products";
import Domains from "./salus/Domains";
import Economics from "./salus/Economics";
import Documents from "./salus/Documents";

const color = accentHex.acid;

export default function SalusAIDetail() {
  const { t, locale } = useI18n();
  const project = getProject("salus-ai");
  if (!project) return null;
  const it = locale === "it";

  const facts: { label: string; value: string }[] = [
    { label: it ? "Costituita" : "Founded", value: it ? "5 settembre 2025" : "5 September 2025" },
    { label: it ? "Sede" : "Based in", value: "Vergiate (VA)" },
    { label: it ? "Status" : "Status", value: it ? "Startup innovativa" : "Innovative startup" },
    { label: it ? "Team operativo" : "Operating team", value: it ? "2 co-founder" : "2 co-founders" },
    { label: it ? "Prodotti" : "Products", value: it ? "3, a stadi diversi" : "3, at different stages" },
    { label: it ? "Capitale esterno" : "Outside capital", value: it ? "Nessuno" : "None" },
  ];

  return (
    <article className="relative">
      {/* HERO */}
      <header className="relative flex min-h-[100svh] flex-col overflow-hidden border-b border-line px-5 pb-10 pt-28 md:px-10 md:pb-12 md:pt-32">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: `radial-gradient(120% 80% at 12% 0%, ${color}26, transparent 50%)` }}
        />
        <div className="bg-grid absolute inset-0 opacity-25" aria-hidden />

        <div className="relative mx-auto flex w-full max-w-[1400px] flex-1 flex-col">
          <BackLink />
          <HeroIn className="my-10 md:my-auto md:py-8">
            <div className="mb-5 flex flex-wrap items-center gap-3">
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
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-end lg:gap-14">
              <div>
                <h1 className="font-display text-[16vw] uppercase leading-[0.82] tracking-tight sm:text-[12vw] lg:text-[8vw]">
                  Salus<br />AI
                </h1>
                <p
                  className="mt-5 max-w-3xl font-display text-2xl uppercase leading-tight tracking-tight md:text-3xl"
                  style={{ color }}
                >
                  {L(project.summary, locale)}
                </p>
              </div>
              <div>
                <VisitButton project={project} color={color} textColor="#111508" />
                <p className="mt-6 max-w-xl font-sans text-lg leading-relaxed text-fg/80">
                  {L(project.overview, locale)}
                </p>
              </div>
            </div>
          </HeroIn>

          <div className="mt-auto grid grid-cols-2 gap-6 border-t border-line pt-8 md:grid-cols-3 lg:grid-cols-6">
            {facts.map((f) => (
              <Meta key={f.label} label={f.label} value={f.value} />
            ))}
          </div>
        </div>
      </header>

      <ModelFlow color={color} />
      <Chronicle color={color} />
      <Products color={color} />

      {/* SIGNATURE: scroll-driven exploded Smart Med Box */}
      <section id="med-box" className="scroll-mt-0 border-t border-line">
        <div className="mx-auto max-w-[1400px] px-5 pb-10 pt-16 md:px-10 md:pt-24">
          <Reveal>
            <Kicker>{it ? "Smart Med Box, scomposto" : "Smart Med Box, taken apart"}</Kicker>
            <p className="mt-5 max-w-2xl font-sans text-lg leading-relaxed text-fg/80 md:text-xl">
              {it
                ? "Il prodotto che i servizi stanno finanziando. Scorri per aprirlo pezzo per pezzo."
                : "The product the services are funding. Scroll to open it up piece by piece."}
            </p>
          </Reveal>
        </div>
        <MedBoxReveal color={color} />
      </section>

      <Domains color={color} />
      <Economics color={color} />
      <Documents color={color} />

      {/* IL MIO RUOLO */}
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
