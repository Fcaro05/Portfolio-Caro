"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { workHubs, accentHex, L, type WorkHub as Hub } from "@/lib/content";
import { BackLink, Kicker, HeroIn, Prose } from "./parts";

function HubView({ hub }: { hub: Hub }) {
  const { t, locale } = useI18n();
  const color = accentHex[hub.accent];

  return (
    <article className="relative">
      {/* HERO */}
      <header className="relative overflow-hidden border-b border-line px-5 pb-16 pt-28 md:px-10 md:pb-24 md:pt-44">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: `radial-gradient(120% 80% at 85% 0%, ${color}26, transparent 50%)`,
          }}
        />
        <div className="bg-dots absolute inset-0 opacity-30" aria-hidden />

        <div className="relative mx-auto max-w-[1400px]">
          <BackLink />
          <HeroIn>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <span
                className="rounded-full px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-black"
                style={{ background: color }}
              >
                {L(hub.label, locale)}
              </span>
              <span className="section-label">
                {hub.entries.length} {locale === "it" ? "progetti" : "projects"}
              </span>
            </div>
            <h1 className="mt-5 font-display text-[13vw] uppercase leading-[0.85] tracking-tight sm:text-[10vw] lg:text-[6vw]">
              {L(hub.title, locale)}
            </h1>
            <p className="mt-6 max-w-2xl font-sans text-lg leading-relaxed text-fg/80 md:text-xl">
              {L(hub.intro, locale)}
            </p>
          </HeroIn>
        </div>
      </header>

      {/* ENTRIES */}
      <section className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-24">
        <Kicker>{locale === "it" ? "I progetti" : "The projects"}</Kicker>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {hub.entries.map((e, i) => (
            <motion.div
              key={e.name + e.href}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <Link
                href={e.href}
                data-cursor
                className="group flex h-full flex-col gap-4 rounded-2xl border border-line bg-bg-soft p-7 transition-colors hover:border-fg/40"
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: color }}
                />
                <span className="font-display text-2xl uppercase leading-none tracking-tight md:text-3xl">
                  {e.name}
                </span>
                <span className="font-sans text-sm leading-relaxed text-muted">
                  {L(e.blurb, locale)}
                </span>
                <ul className="mt-auto flex flex-wrap gap-2 pt-2">
                  {e.tags.map((tg) => (
                    <li key={tg} className="tag-chip">
                      {tg}
                    </li>
                  ))}
                </ul>
                <span
                  className="mt-2 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em]"
                  style={{ color }}
                >
                  {t.work.caseStudy}
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
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

export function DevHub() {
  return <HubView hub={workHubs.dev} />;
}

export function GrowthHub() {
  return <HubView hub={workHubs.growth} />;
}
