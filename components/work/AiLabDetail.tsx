"use client";

import Link from "next/link";
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
} from "./parts";
import CircuitBackdrop from "./ailab/CircuitBackdrop";
import BootLog from "./ailab/BootLog";
import PatternGate from "./ailab/PatternGate";
import ProjectBay from "./ailab/ProjectBay";
import { bays, capabilities } from "./ailab/data";
import Marquee from "@/components/ui/Marquee";

const color = accentHex.violet;

export default function AiLabDetail() {
  const { t, locale } = useI18n();
  const project = getProject("ai-lab");
  if (!project) return null;

  return (
    <article className="relative">
      {/* HERO — the rig */}
      <header className="relative overflow-hidden border-b border-line px-5 pb-16 pt-28 md:px-10 md:pb-24 md:pt-44">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `radial-gradient(120% 80% at 80% -10%, ${color}2e, transparent 55%)`,
          }}
        />
        <CircuitBackdrop className="opacity-[0.55] [mask-image:linear-gradient(to_bottom,black,transparent)]" />

        <div className="relative mx-auto max-w-[1400px]">
          <BackLink />
          <HeroIn>
            <div className="mb-5 mt-10 flex flex-wrap items-center gap-3">
              <span
                className="rounded-full px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-black"
                style={{ background: color }}
              >
                {project.index}
              </span>
              <span className="section-label">{L(project.kind, locale)}</span>
            </div>
            <h1 className="font-display text-[16vw] uppercase leading-[0.82] tracking-tight sm:text-[12vw] lg:text-[8vw]">
              AI <span className="text-stroke-acid">LAB</span>
            </h1>
            <p
              className="mt-5 max-w-xl font-display text-2xl uppercase leading-tight tracking-tight md:text-3xl"
              style={{ color }}
            >
              {L(project.summary, locale)}
            </p>
            <BootLog />
          </HeroIn>

          <HeaderMeta project={project} color={color} />
        </div>
      </header>

      {/* OVERVIEW */}
      <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-20">
        <Prose label={t.project.overview} text={L(project.overview, locale)} />
      </section>

      {/* THE PATTERN — immersive scroll gate */}
      <PatternGate />

      {/* PROJECT BAYS */}
      <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-24">
        <Kicker>{locale === "it" ? "I tre progetti" : "The three projects"}</Kicker>
        <div className="mt-8 flex flex-col gap-8">
          {bays.map((b) => (
            <ProjectBay key={b.id} bay={b} />
          ))}
        </div>
      </section>

      {/* CHALLENGE + APPROACH */}
      <section className="mx-auto grid max-w-[1400px] gap-12 border-t border-line px-5 py-16 md:grid-cols-2 md:gap-16 md:px-10 md:py-24">
        <Prose label={t.project.challenge} text={L(project.challenge, locale)} accent={color} />
        <Prose label={t.project.approach} text={L(project.approach, locale)} />
      </section>

      {/* CAPABILITIES RAIL */}
      <section className="overflow-hidden border-t border-line py-10 md:py-14">
        <Marquee
          className="font-display text-3xl uppercase tracking-tight text-fg/15 md:text-5xl"
          items={capabilities}
        />
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

      {/* FOOTER NAV */}
      <section className="border-t border-line px-5 py-12 md:px-10 md:py-16">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-6">
          <Link
            href="/#work"
            className="hover-line font-mono text-xs uppercase tracking-[0.18em] text-muted transition-colors hover:text-fg"
          >
            ← {locale === "it" ? "Tutte le aree" : "All areas"}
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
