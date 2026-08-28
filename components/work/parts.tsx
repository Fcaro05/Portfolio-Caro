"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { adjacentProject, accentHex, L, LA, type Project } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";

export const fillBg: Record<Project["accent"], string> = {
  acid: "bg-acid",
  magenta: "bg-magenta",
  cyan: "bg-cyan",
  violet: "bg-violet",
};

export const Arrow = ({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} style={style} aria-hidden>
    <path
      d="M7 17L17 7M17 7H8M17 7V16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function BackLink() {
  const { t } = useI18n();
  return (
    <Link
      href="/#work"
      className="hover-line inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted transition-colors hover:text-fg"
    >
      ← {t.project.back}
    </Link>
  );
}

export function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
      {children}
    </h2>
  );
}

export function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mb-1 font-mono text-[0.7rem] uppercase tracking-[0.15em] text-muted">
        {label}
      </div>
      <div className="font-sans text-base text-fg">{value}</div>
    </div>
  );
}

export function VisitButton({
  project,
  color,
  textColor,
}: {
  project: Project;
  color: string;
  textColor?: string;
}) {
  const { t } = useI18n();
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor
      className="group inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 font-mono text-sm uppercase tracking-[0.1em] text-black transition-transform hover:scale-[1.03]"
      style={{ background: color, color: textColor }}
    >
      {t.project.visit}
      <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
    </a>
  );
}

export function VisitCard({ project, color }: { project: Project; color: string }) {
  const { t } = useI18n();
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor
      className="group flex items-center justify-between gap-4 rounded-2xl border border-line p-6 transition-colors hover:border-fg/40"
    >
      <span className="min-w-0">
        <span className="block font-mono text-[0.7rem] uppercase tracking-[0.15em] text-muted">
          {t.project.visit}
        </span>
        <span className="mt-1 block break-words font-display text-lg uppercase tracking-tight md:text-xl">
          {project.href.replace(/^https?:\/\//, "").replace(/\/$/, "")}
        </span>
      </span>
      <Arrow
        className="h-7 w-7 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
        style={{ color }}
      />
    </a>
  );
}

export function Prose({
  label,
  text,
  accent,
}: {
  label: string;
  text: string;
  accent?: string;
}) {
  return (
    <Reveal>
      <Kicker>{label}</Kicker>
      <p
        className="mt-5 max-w-2xl font-sans text-lg leading-relaxed text-fg/85 md:text-xl"
        style={
          accent ? { borderLeft: `2px solid ${accent}`, paddingLeft: "1.25rem" } : undefined
        }
      >
        {text}
      </p>
    </Reveal>
  );
}

export function Contributions({ project, color }: { project: Project; color: string }) {
  const { t, locale } = useI18n();
  return (
    <Reveal>
      <Kicker>{t.project.contributions}</Kicker>
      <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {LA(project.contributions, locale).map((c, i) => (
          <li
            key={i}
            className="flex items-start gap-3 border-t border-line pt-3 font-sans text-base text-fg/85"
          >
            <span
              className="mt-1.5 h-2 w-2 shrink-0 rotate-45"
              style={{ background: color }}
            />
            {c}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export function Results({ project, color }: { project: Project; color: string }) {
  const { t, locale } = useI18n();
  return (
    <Reveal>
      <Kicker>{t.project.results}</Kicker>
      <ul className="mt-6 flex flex-col gap-4">
        {LA(project.results, locale).map((r, i) => (
          <li key={i} className="flex items-start gap-3 font-sans text-lg text-fg/90">
            <span style={{ color }} className="font-display text-xl leading-none">
              →
            </span>
            {r}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export function StackList({ project }: { project: Project }) {
  const { t } = useI18n();
  return (
    <Reveal>
      <Kicker>{t.project.stack}</Kicker>
      <ul className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tg) => (
          <li key={tg} className="tag-chip">
            {tg}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export function NextProject({ slug }: { slug: string }) {
  const { t, locale } = useI18n();
  const next = adjacentProject(slug);
  return (
    <Link
      href={`/work/${next.id}`}
      data-cursor
      className="group relative block overflow-hidden border-t border-line px-5 py-16 md:px-10 md:py-24"
    >
      <span
        className={`absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 ${fillBg[next.accent]}`}
      />
      <div className="relative mx-auto flex max-w-[1400px] items-center justify-between gap-6 transition-colors duration-300 group-hover:text-black">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted transition-colors group-hover:text-black/70">
            {t.project.next}
          </span>
          <span className="mt-2 block font-display text-5xl uppercase leading-none tracking-tight transition-transform duration-300 group-hover:translate-x-2 md:text-8xl">
            {next.name}
          </span>
        </div>
        <Arrow className="h-10 w-10 shrink-0 -rotate-45 transition-transform duration-300 group-hover:rotate-0 md:h-16 md:w-16" />
      </div>
    </Link>
  );
}

/** Shared header meta row (role / year / type + visit). */
export function HeaderMeta({
  project,
  color,
  textColor,
}: {
  project: Project;
  color: string;
  textColor?: string;
}) {
  const { t, locale } = useI18n();
  return (
    <div className="mt-12 grid gap-6 border-t border-line pt-8 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end md:gap-10">
      <Meta label={t.project.role} value={L(project.role, locale)} />
      <Meta label={t.project.year} value={project.year} />
      <Meta label={t.project.type} value={L(project.kind, locale)} />
      <VisitButton project={project} color={color} textColor={textColor} />
    </div>
  );
}

/** Animated entrance wrapper for hero blocks. */
export function HeroIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export { accentHex, L, LA };
