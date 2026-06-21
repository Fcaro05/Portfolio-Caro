"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { projects, L, type Project } from "@/lib/content";
import MagneticButton from "@/components/ui/MagneticButton";

const MotionLink = motion.create(Link);

const cssVar: Record<Project["accent"], string> = {
  acid: "#d4ff36",
  magenta: "#ff2d8e",
  cyan: "#34e7e4",
  violet: "#8b5cff",
};
const fillBg: Record<Project["accent"], string> = {
  acid: "bg-acid",
  magenta: "bg-magenta",
  cyan: "bg-cyan",
  violet: "bg-violet",
};

const Arrow = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
    <path
      d="M7 17L17 7M17 7H8M17 7V16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function Work() {
  const { t } = useI18n();
  const [flagship, ...rest] = projects;

  return (
    <section id="work" className="relative border-t border-line py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="mb-12 flex items-end justify-between md:mb-20">
          <div>
            <p className="section-label mb-5">{t.work.label}</p>
            <h2 className="font-display text-5xl uppercase leading-[0.9] tracking-tight md:text-8xl">
              {t.work.title}
            </h2>
          </div>
          <span className="hidden font-mono text-sm text-muted md:block">
            {String(projects.length).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        <FlagshipCard project={flagship} />
      </div>

      <div className="mx-auto mt-16 max-w-[1600px] border-t border-line md:mt-24">
        {rest.map((p) => (
          <ProjectRow key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}

/* ----------------------------- Flagship ----------------------------- */

function FlagshipCard({ project }: { project: Project }) {
  const { t, locale } = useI18n();
  const color = cssVar[project.accent];

  // tilt
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 150, damping: 18, mass: 0.4 };
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), spring);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), spring);

  const onMove = (e: React.MouseEvent) => {
    const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="grid gap-8 rounded-3xl border border-line bg-bg-soft p-6 md:grid-cols-2 md:gap-12 md:p-10"
    >
      {/* Left: content */}
      <div className="flex flex-col">
        <div className="mb-6 flex items-center gap-3">
          <span
            className="rounded-full px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-black"
            style={{ background: color }}
          >
            {t.work.flagship}
          </span>
          <span className="section-label">{L(project.kind, locale)}</span>
        </div>

        <h3 className="font-display text-5xl uppercase leading-[0.9] tracking-tight md:text-7xl">
          {project.name}
        </h3>

        <p
          className="mt-4 font-display text-xl uppercase tracking-tight md:text-2xl"
          style={{ color }}
        >
          {L(project.summary, locale)}
        </p>

        <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-muted">
          {L(project.description, locale)}
        </p>

        <div className="mt-8 grid grid-cols-2 gap-4 border-t border-line pt-6 font-mono text-xs">
          <div>
            <div className="mb-1 text-muted/60">{t.work.role}</div>
            <div className="text-fg">{L(project.role, locale)}</div>
          </div>
          <div>
            <div className="mb-1 text-muted/60">{t.work.stack}</div>
            <div className="text-fg">{project.tags.slice(0, 4).join(" · ")}</div>
          </div>
        </div>

        <div className="mt-8">
          <MagneticButton
            as="link"
            href={`/work/${project.id}`}
            ariaLabel={`${t.work.caseStudy} — ${project.name}`}
            className="group inline-flex items-center gap-3 rounded-full border border-line px-6 py-3 font-mono text-sm uppercase tracking-[0.1em] transition-colors hover:bg-fg hover:text-black"
          >
            {t.work.caseStudy}
            <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </MagneticButton>
        </div>
      </div>

      {/* Right: tilt visual */}
      <div className="[perspective:1200px]">
        <MotionLink
          href={`/work/${project.id}`}
          onMouseMove={onMove}
          onMouseLeave={reset}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          data-cursor
          className="relative flex aspect-[4/3] w-full items-end justify-between overflow-hidden rounded-2xl border border-line p-6 md:aspect-auto md:h-full"
        >
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 28% 22%, ${color}33, transparent 55%), linear-gradient(150deg, ${color}1a, transparent 70%)`,
            }}
          />
          <div className="bg-grid absolute inset-0 opacity-40" />
          <span
            className="pointer-events-none absolute right-4 top-2 font-display text-[9rem] leading-none text-transparent md:text-[12rem]"
            style={{ WebkitTextStroke: `1.5px ${color}55` }}
          >
            {project.index}
          </span>
          <div className="relative z-10 flex flex-wrap gap-2">
            {project.tags.map((tg) => (
              <span key={tg} className="tag-chip border-white/20 text-fg/80">
                {tg}
              </span>
            ))}
          </div>
          <div
            className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full text-black"
            style={{ background: color }}
          >
            <Arrow className="h-5 w-5" />
          </div>
        </MotionLink>
      </div>
    </motion.div>
  );
}

/* ----------------------------- Rows ----------------------------- */

function ProjectRow({ project }: { project: Project }) {
  const { t, locale } = useI18n();

  return (
    <MotionLink
      href={`/work/${project.id}`}
      data-cursor
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative block overflow-hidden border-b border-line px-5 md:px-10"
    >
      {/* accent fill */}
      <span
        className={`absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100 ${fillBg[project.accent]}`}
      />

      <div className="relative z-10 flex items-center gap-4 py-7 transition-colors duration-300 group-hover:text-black md:gap-10 md:py-10">
        <span className="w-10 font-mono text-sm text-muted transition-colors group-hover:text-black/70 md:w-16 md:text-base">
          {project.index}
        </span>

        <div className="flex-1">
          <h3 className="font-display text-3xl uppercase leading-none tracking-tight transition-transform duration-300 group-hover:translate-x-2 md:text-6xl">
            {project.name}
          </h3>
          <p className="mt-2 font-sans text-sm text-muted transition-colors duration-300 group-hover:text-black/70 md:text-base">
            {L(project.summary, locale)}
          </p>
        </div>

        <div className="hidden max-w-[14rem] flex-wrap justify-end gap-2 lg:flex">
          {project.tags.slice(0, 3).map((tg) => (
            <span
              key={tg}
              className="tag-chip transition-colors group-hover:border-black/30 group-hover:text-black/80"
            >
              {tg}
            </span>
          ))}
        </div>

        <span className="font-mono text-[0.7rem] uppercase tracking-[0.1em] text-muted transition-colors group-hover:text-black/70">
          {L(project.kind, locale)}
        </span>

        <Arrow className="h-6 w-6 shrink-0 -rotate-45 text-muted transition-all duration-300 group-hover:rotate-0 group-hover:text-black md:h-8 md:w-8" />
      </div>
    </MotionLink>
  );
}
