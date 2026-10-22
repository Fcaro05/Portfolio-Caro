"use client";

import { useI18n } from "@/lib/i18n";
import { getProject, accentHex, L } from "@/lib/content";
import {
  BackLink,
  HeaderMeta,
  HeroIn,
  Prose,
  Contributions,
  Results,
  StackList,
  VisitCard,
  NextProject,
} from "../parts";

/**
 * Impalcatura comune alle pagine progetto dell'area Dev: hero, panoramica, sfida e approccio,
 * poi le sezioni specifiche del progetto (children), poi ruolo, risultati e stack.
 */
export default function DevDetailShell({
  slug,
  title,
  badge,
  visual,
  children,
}: {
  slug: string;
  title: React.ReactNode;
  badge: string;
  /** Immagini a destra della hero (da lg in su; sotto il testo su mobile). */
  visual?: React.ReactNode;
  children: React.ReactNode;
}) {
  const { t, locale } = useI18n();
  const project = getProject(slug);
  if (!project) return null;
  const color = accentHex[project.accent];

  return (
    <article className="relative">
      <header className="relative overflow-hidden border-b border-line px-5 pb-16 pt-28 md:px-10 md:pb-24 md:pt-40">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: `radial-gradient(120% 80% at 12% 0%, ${color}26, transparent 50%)` }}
        />
        <div className="bg-grid absolute inset-0 opacity-25" aria-hidden />

        <div className="relative mx-auto max-w-[1400px]">
          <BackLink dev />
          <div
            className={visual ? "grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-6" : undefined}
          >
          <HeroIn>
            <div className="mb-5 mt-10 flex flex-wrap items-center gap-3">
              <span
                className="rounded-full px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-black"
                style={{ background: color }}
              >
                {badge}
              </span>
              <span className="section-label">{L(project.kind, locale)}</span>
            </div>
            <h1 className="font-display text-[13vw] uppercase leading-[0.85] tracking-tight sm:text-[10vw] lg:text-[6.5vw]">
              {title}
            </h1>
            <p
              className="mt-5 max-w-3xl font-display text-2xl uppercase leading-tight tracking-tight md:text-3xl"
              style={{ color }}
            >
              {L(project.summary, locale)}
            </p>
          </HeroIn>
          {visual && <div className="relative">{visual}</div>}
          </div>
          <HeaderMeta project={project} color={color} />
        </div>
      </header>

      <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-20">
        <Prose label={t.project.overview} text={L(project.overview, locale)} />
      </section>

      {children}

      <section className="mx-auto grid max-w-[1400px] gap-12 border-t border-line px-5 py-16 md:grid-cols-2 md:gap-16 md:px-10 md:py-24">
        <Prose label={t.project.challenge} text={L(project.challenge, locale)} accent={color} />
        <Prose label={t.project.approach} text={L(project.approach, locale)} />
      </section>

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

      <NextProject slug={slug} />
    </article>
  );
}
