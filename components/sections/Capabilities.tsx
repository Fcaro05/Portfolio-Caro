"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { pillars, L } from "@/lib/content";
import { EASE, usePrefersReducedMotion } from "@/lib/motion";
import Marquee from "@/components/ui/Marquee";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP);

const accentText: Record<string, string> = {
  acid: "text-acid",
  magenta: "text-magenta",
  cyan: "text-cyan",
};
const accentBar: Record<string, string> = {
  acid: "bg-acid",
  magenta: "bg-magenta",
  cyan: "bg-cyan",
};
const accentHover: Record<string, string> = {
  acid: "hover:border-acid",
  magenta: "hover:border-magenta",
  cyan: "hover:border-cyan",
};

export default function Capabilities() {
  const { t, locale } = useI18n();
  const root = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useGSAP(
    () => {
      if (reduced) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const q = gsap.utils.selector(root);
        const st = {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        };
        // the grid drifts up as one block (keeps the 1px seams intact)
        gsap.fromTo(
          q("[data-pillars]"),
          { yPercent: 6 },
          { yPercent: -6, ease: "none", scrollTrigger: st }
        );
        // content inside each card counter-drifts a touch — parallax depth
        q<HTMLElement>("[data-pillar-inner]").forEach((inner, i) => {
          gsap.fromTo(
            inner,
            { y: 10 + i * 6 },
            { y: -(10 + i * 6), ease: "none", scrollTrigger: st }
          );
        });
        // title drifts against the scroll
        gsap.fromTo(
          q("[data-cap-title]"),
          { xPercent: -4 },
          { xPercent: 4, ease: "none", scrollTrigger: st }
        );
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [reduced] }
  );

  return (
    <section
      ref={root}
      id="capabilities"
      className="relative overflow-hidden border-t border-line py-24 md:py-36"
    >
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="mb-14 flex flex-col gap-4 md:mb-24 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-label mb-5">{t.capabilities.label}</p>
            <h2
              data-cap-title
              className="font-display text-5xl uppercase leading-[0.9] tracking-tight md:text-8xl"
            >
              {t.capabilities.title}
            </h2>
          </div>
          <p className="max-w-xs font-sans text-base text-muted md:text-right">
            {t.capabilities.subtitle}
          </p>
        </div>

        <div
          data-pillars
          className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3"
        >
          {pillars.map((p, i) => (
            <motion.div
              key={p.id}
              initial={reduced ? false : { opacity: 0, y: 40 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
              className={`group relative flex flex-col border border-transparent bg-bg p-8 transition-colors duration-300 md:p-10 ${accentHover[p.accent]}`}
            >
              <div data-pillar-inner className="flex flex-1 flex-col gap-6">
                <div className="flex items-start justify-between">
                  <span
                    className={`font-mono text-sm ${accentText[p.accent]}`}
                  >
                    {p.num}
                  </span>
                  <span
                    className={`h-2 w-2 rounded-full ${accentBar[p.accent]} opacity-40 transition-opacity duration-300 group-hover:opacity-100`}
                  />
                </div>

                <h3 className="font-display text-3xl uppercase leading-none tracking-tight md:text-4xl">
                  {L(p.title, locale)}
                </h3>

                <p className="font-sans text-base leading-relaxed text-muted">
                  {L(p.blurb, locale)}
                </p>

                <span
                  className={`h-[2px] w-12 origin-left ${accentBar[p.accent]} transition-all duration-500 group-hover:w-full`}
                />

                <ul className="mt-auto flex flex-wrap gap-2 pt-2">
                  {p.items.map((it) => (
                    <li key={it} className="tag-chip">
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-20 border-y border-line py-4 md:mt-32">
        <Marquee
          reverse
          className="font-display text-3xl uppercase tracking-tight text-fg/15 md:text-5xl"
          items={[
            "AI",
            "LLM",
            "RAG",
            "Code",
            "Growth",
            "Marketing",
            "Design",
            "Product",
          ]}
        />
      </div>
    </section>
  );
}
