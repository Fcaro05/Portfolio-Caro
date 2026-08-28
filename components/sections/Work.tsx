"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { projects, L, type Project } from "@/lib/content";
import MagneticButton from "@/components/ui/MagneticButton";
import ShowreelPlayer from "@/components/showreel/ShowreelPlayer";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP);

function useTilt() {
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
  return { rotateX, rotateY, onMove, reset };
}

const MotionLink = motion.create(Link);

const cssVar: Record<Project["accent"], string> = {
  acid: "#d4ff36",
  magenta: "#ff2d8e",
  cyan: "#34e7e4",
  violet: "#8b5cff",
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
  const root = useRef<HTMLElement>(null);
  const pinWrap = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const railFill = useRef<HTMLDivElement>(null);
  const stageBg = useRef<HTMLDivElement>(null);
  const counter = useRef<HTMLSpanElement>(null);

  const total = projects.length;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const trackEl = track.current!;
          const amount = () => trackEl.scrollWidth - window.innerWidth;

          const drive = gsap.to(trackEl, {
            x: () => -amount(),
            ease: "none",
            scrollTrigger: {
              trigger: pinWrap.current,
              start: "top top",
              end: () => "+=" + amount(),
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (counter.current) {
                  const n = Math.min(
                    total,
                    1 + Math.round(self.progress * total)
                  );
                  counter.current.textContent = String(n).padStart(2, "0");
                }
              },
            },
          });

          if (railFill.current) {
            gsap.fromTo(
              railFill.current,
              { scaleX: 0 },
              {
                scaleX: 1,
                ease: "none",
                scrollTrigger: {
                  trigger: pinWrap.current,
                  start: "top top",
                  end: () => "+=" + amount(),
                  scrub: true,
                },
              }
            );
          }

          const panels = gsap.utils.toArray<HTMLElement>("[data-panel]");
          panels.forEach((panel) => {
            const num = panel.querySelector<HTMLElement>("[data-num]");
            const inner = panel.querySelector<HTMLElement>("[data-panel-inner]");
            const tint = panel.getAttribute("data-tint");

            if (num) {
              gsap.fromTo(
                num,
                { xPercent: 55 },
                {
                  xPercent: -55,
                  ease: "none",
                  scrollTrigger: {
                    trigger: panel,
                    containerAnimation: drive,
                    start: "left right",
                    end: "right left",
                    scrub: true,
                  },
                }
              );
            }
            if (inner) {
              gsap.fromTo(
                inner,
                { opacity: 0.25, scale: 0.9, yPercent: 8 },
                {
                  opacity: 1,
                  scale: 1,
                  yPercent: 0,
                  ease: "power2.out",
                  scrollTrigger: {
                    trigger: panel,
                    containerAnimation: drive,
                    start: "left right",
                    end: "left center",
                    scrub: true,
                  },
                }
              );
            }
            // flood the pinned stage with the active project's accent
            if (tint && stageBg.current) {
              gsap.to(stageBg.current, {
                backgroundColor: tint,
                ease: "none",
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: drive,
                  start: "left center",
                  end: "right center",
                  scrub: true,
                },
              });
            }
          });
        }
      );

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section ref={root} id="work" className="relative border-t border-line">
      <div className="mx-auto max-w-[1600px] px-5 pt-24 md:px-10 md:pt-36">
        <div className="mb-10 flex items-end justify-between md:mb-14">
          <div>
            <p className="section-label mb-5">{t.work.label}</p>
            <h2 className="font-display text-5xl uppercase leading-[0.9] tracking-tight md:text-8xl">
              {t.work.title}
            </h2>
          </div>
          <span className="hidden font-mono text-sm text-muted md:block">
            <span ref={counter} className="text-acid">
              {String(total).padStart(2, "0")}
            </span>{" "}
            / {String(total).padStart(2, "0")}
          </span>
        </div>
        <p className="mb-2 hidden font-mono text-xs uppercase tracking-[0.18em] text-muted md:block">
          {t.work.scrollHint} →
        </p>
      </div>

      <div ref={pinWrap} className="h-pin h-pin--responsive relative">
        <div
          ref={stageBg}
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden opacity-[0.07] md:block"
        />
        <div
          ref={track}
          className="h-track relative items-center gap-6 px-5 md:gap-12 md:px-10 md:[padding-right:12vw]"
        >
          {/* Showreel panel */}
          <article
            data-panel
            className="h-panel flex w-full items-center md:w-[min(78vw,1180px)]"
          >
            <div
              data-panel-inner
              className="relative w-full overflow-hidden rounded-3xl border border-line bg-bg-soft p-4 md:p-6"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="section-label">— Showreel</span>
                <span className="font-mono text-xs text-muted">MP4 · loop</span>
              </div>
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-line bg-black">
                <ShowreelPlayer />
              </div>
            </div>
          </article>

          {projects.map((p, i) => (
            <WorkPanel key={p.id} project={p} first={i === 0} />
          ))}

          {/* Outro CTA panel */}
          <article
            data-panel
            className="h-panel flex w-full items-center md:w-[min(60vw,640px)]"
          >
            <div
              data-panel-inner
              className="flex w-full flex-col gap-6 rounded-3xl border border-line bg-bg-soft p-8 md:p-12"
            >
              <h3 className="font-display text-4xl uppercase leading-[0.95] tracking-tight md:text-6xl">
                {t.contact.title}
              </h3>
              <p className="max-w-sm font-sans text-base text-muted">
                {t.contact.lead}
              </p>
              <MagneticButton
                as="a"
                href="#contact"
                ariaLabel={t.contact.cta}
                className="inline-flex w-fit items-center gap-3 rounded-full bg-acid px-7 py-3 font-mono text-sm uppercase tracking-[0.1em] text-black"
              >
                {t.contact.cta} <Arrow className="h-4 w-4" />
              </MagneticButton>
            </div>
          </article>
        </div>

        <div className="mx-auto mt-6 hidden max-w-[1600px] px-5 md:block md:px-10">
          <div className="rail">
            <div ref={railFill} className="rail__fill" />
          </div>
        </div>
      </div>

      <div className="h-24 md:h-36" />
    </section>
  );
}

function WorkPanel({
  project,
  first,
}: {
  project: Project;
  first: boolean;
}) {
  const { t, locale } = useI18n();
  const color = cssVar[project.accent];
  const { rotateX, rotateY, onMove, reset } = useTilt();

  return (
    <article
      data-panel
      data-tint={color}
      className={`h-panel flex w-full items-center ${
        first ? "md:w-[min(88vw,1320px)]" : "md:w-[min(72vw,1080px)]"
      }`}
    >
      <div
        data-panel-inner
        className={`grid w-full gap-8 rounded-3xl border border-line bg-bg-soft p-6 md:gap-12 md:p-10 ${
          first ? "md:grid-cols-2" : "md:grid-cols-[1fr_1.1fr]"
        }`}
      >
        {/* content */}
        <div className="flex flex-col">
          <div className="mb-6 flex items-center gap-3">
            {project.flagship && (
              <span
                className="rounded-full px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-black"
                style={{ background: color }}
              >
                {t.work.flagship}
              </span>
            )}
            <span className="section-label">{L(project.kind, locale)}</span>
          </div>

          <h3 className="font-display text-4xl uppercase leading-[0.9] tracking-tight md:text-6xl">
            {project.name}
          </h3>

          <p
            className="mt-4 font-display text-lg uppercase tracking-tight md:text-2xl"
            style={{ color }}
          >
            {L(project.summary, locale)}
          </p>

          <p className="mt-5 max-w-xl font-sans text-sm leading-relaxed text-muted md:text-base">
            {L(project.description, locale)}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-line pt-5 font-mono text-xs">
            <div>
              <div className="mb-1 text-muted/60">{t.work.role}</div>
              <div className="text-fg">{L(project.role, locale)}</div>
            </div>
            <div>
              <div className="mb-1 text-muted/60">{t.work.stack}</div>
              <div className="text-fg">
                {project.tags.slice(0, 4).join(" · ")}
              </div>
            </div>
          </div>

          <div className="mt-7">
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

        {/* visual */}
        <div className="[perspective:1200px]">
          <MotionLink
            href={`/work/${project.id}`}
            onMouseMove={onMove}
            onMouseLeave={reset}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            data-cursor
            className="relative flex aspect-[4/3] w-full items-end justify-between overflow-hidden rounded-2xl border border-line p-6"
          >
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at 28% 22%, ${color}33, transparent 55%), linear-gradient(150deg, ${color}1a, transparent 70%)`,
              }}
            />
            <div className="bg-grid absolute inset-0 opacity-40" />
            <span
              data-num
              className="pointer-events-none absolute right-4 top-2 font-display text-[8rem] leading-none text-transparent md:text-[12rem]"
              style={{ WebkitTextStroke: `1.5px ${color}55` }}
            >
              {project.index}
            </span>
            <div className="relative z-10 flex flex-wrap gap-2">
              {project.tags.slice(0, 4).map((tg) => (
                <span
                  key={tg}
                  className="tag-chip border-white/20 text-fg/80"
                >
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
      </div>
    </article>
  );
}
