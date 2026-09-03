"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { workCategories, L, type WorkCategory } from "@/lib/content";
import { EASE } from "@/lib/motion";
import MagneticButton from "@/components/ui/MagneticButton";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP);

function useTilt() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const spring = { stiffness: 150, damping: 18, mass: 0.4 };
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), spring);
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), spring);

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

const cssVar: Record<WorkCategory["accent"], string> = {
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
  const total = workCategories.length;
  const [active, setActive] = useState(1);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(root);

        // Giant index numbers slide as each card passes through the viewport.
        q<HTMLElement>("[data-idx]").forEach((el) => {
          gsap.fromTo(
            el,
            { yPercent: 26 },
            {
              yPercent: -26,
              ease: "none",
              scrollTrigger: {
                trigger: el.closest("[data-card]"),
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        });

        // Ghost wordmark behind the grid drifts against the scroll.
        gsap.fromTo(
          q("[data-work-ghost]"),
          { xPercent: 6 },
          {
            xPercent: -10,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          }
        );

        // Live counter in the header.
        q<HTMLElement>("[data-card]").forEach((card, i) => {
          ScrollTrigger.create({
            trigger: card,
            start: "top center",
            end: "bottom center",
            onToggle: (self) => self.isActive && setActive(i + 1),
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="work"
      className="relative overflow-hidden border-t border-line py-24 md:py-36"
    >
      <span
        data-work-ghost
        aria-hidden
        className="pointer-events-none absolute -right-[5%] top-1/3 select-none font-display text-[30vw] leading-none text-fg/[0.025]"
      >
        WORK
      </span>

      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="mb-12 flex items-end justify-between md:mb-20">
          <div>
            <p className="section-label mb-5">{t.work.label}</p>
            <h2 className="font-display text-5xl uppercase leading-[0.9] tracking-tight md:text-8xl">
              {t.work.title}
            </h2>
          </div>
          <span className="hidden font-mono text-sm text-muted md:block">
            <span className="text-acid">{String(active).padStart(2, "0")}</span> /{" "}
            {String(total).padStart(2, "0")}
          </span>
        </div>

        <div className="flex flex-col gap-8 md:gap-12">
          {workCategories.map((c, i) => (
            <CategoryCard key={c.id} category={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- Category card --------------------------- */

function CategoryCard({
  category,
  index,
}: {
  category: WorkCategory;
  index: number;
}) {
  const { locale } = useI18n();
  const color = cssVar[category.accent];
  const { rotateX, rotateY, onMove, reset } = useTilt();

  return (
    <motion.div
      data-card
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.8, delay: (index % 2) * 0.06, ease: EASE }}
      className="grid gap-8 rounded-3xl border border-line bg-bg-soft p-6 md:grid-cols-2 md:gap-12 md:p-10"
    >
      {/* Left: content */}
      <motion.div
        className="flex flex-col"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
      >
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span
            className="rounded-full px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-black"
            style={{ background: color }}
          >
            {L(category.meta, locale)}
          </span>
          <span className="section-label">{L(category.kind, locale)}</span>
        </div>

        <h3 className="font-display text-5xl uppercase leading-[0.9] tracking-tight md:text-7xl">
          {category.name}
        </h3>

        <p
          className="mt-4 font-display text-xl uppercase tracking-tight md:text-2xl"
          style={{ color }}
        >
          {L(category.summary, locale)}
        </p>

        <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-muted">
          {L(category.description, locale)}
        </p>

        <ul className="mt-8 flex flex-wrap gap-2 border-t border-line pt-6">
          {category.tags.map((tg) => (
            <li key={tg} className="tag-chip">
              {tg}
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <MagneticButton
            as="link"
            href={category.href}
            ariaLabel={`${L(category.cta, locale)} — ${category.name}`}
            className="group inline-flex items-center gap-3 rounded-full border border-line px-6 py-3 font-mono text-sm uppercase tracking-[0.1em] transition-colors hover:bg-fg hover:text-black"
          >
            {L(category.cta, locale)}
            <Arrow className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </MagneticButton>
        </div>
      </motion.div>

      {/* Right: tilt visual */}
      <div className="[perspective:1200px]">
        <MotionLink
          href={category.href}
          onMouseMove={onMove}
          onMouseLeave={reset}
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          data-cursor
          className="relative flex aspect-[4/3] w-full items-end justify-between overflow-hidden rounded-2xl border border-line p-6 md:aspect-auto md:h-full"
          aria-label={`${L(category.cta, locale)} — ${category.name}`}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 28% 22%, ${color}33, transparent 55%), linear-gradient(150deg, ${color}1a, transparent 70%)`,
            }}
          />
          <div className="bg-grid absolute inset-0 opacity-40" />
          <span
            data-idx
            className="pointer-events-none absolute right-4 top-0 font-display text-[10rem] leading-none text-transparent will-change-transform md:text-[14rem]"
            style={{ WebkitTextStroke: `1.5px ${color}66` }}
          >
            {category.num}
          </span>
          <div className="relative z-10 flex flex-wrap gap-2">
            {category.tags.slice(0, 4).map((tg) => (
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
