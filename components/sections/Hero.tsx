"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useI18n } from "@/lib/i18n";
import { roleWordsHero } from "@/lib/content";
import { usePrefersReducedMotion } from "@/lib/motion";
import Marquee from "@/components/ui/Marquee";
import { scrollToTarget } from "@/components/providers/SmoothScroll";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP);

const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), {
  ssr: false,
});

export default function Hero() {
  const { t, locale } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(true);
  const [roleIdx, setRoleIdx] = useState(0);

  const roles = roleWordsHero[locale];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.02 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const id = setInterval(() => setRoleIdx((i) => (i + 1) % roles.length), 2000);
    return () => clearInterval(id);
  }, [roles.length]);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const q = gsap.utils.selector(ref);
      const chars = q<HTMLElement>("[data-hero-char]");
      const intro = q("[data-hero-eyebrow], [data-hero-blurb]");

      // Entrance — plays immediately under the intro loader (z-300), which
      // covers it for ~1.7s. No delay → nothing to leave half-applied.
      const tin = gsap.timeline();
      tin
        .from(chars, {
          yPercent: 120,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.028,
        })
        .from(
          intro,
          {
            autoAlpha: 0,
            y: 22,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
          },
          0.3
        );

      // Pinned dismantle — every width (phones included). The hero locks
      // while the wordmark blows apart and the WebGL backdrop defocuses.
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (!bgRef.current) return;
        const mobile = window.innerWidth < 768;
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: mobile ? "+=115%" : "+=150%",
            scrub: mobile ? 0.4 : 1,
            pin: true,
            pinType: "fixed",
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(
          bgRef.current,
          { scale: 1, filter: "blur(0px)", opacity: 1 },
          {
            scale: mobile ? 1.35 : 1.5,
            filter: `blur(${mobile ? 12 : 14}px)`,
            opacity: 0.32,
            ease: "power1.in",
          },
          0
        )
          .to("[data-hero-eyebrow]", { autoAlpha: 0, yPercent: -120 }, 0)
          .to("[data-hero-meta-tl]", { xPercent: -60, yPercent: -80, autoAlpha: 0 }, 0)
          .to("[data-hero-meta-tr]", { xPercent: 60, yPercent: -80, autoAlpha: 0 }, 0)
          .to("[data-hero-meta-bl]", { xPercent: -60, yPercent: 80, autoAlpha: 0 }, 0)
          .to("[data-hero-meta-br]", { xPercent: 60, yPercent: 80, autoAlpha: 0 }, 0)
          .to("[data-hero-cue]", { autoAlpha: 0 }, 0)
          .to("[data-hero-blurb]", { autoAlpha: 0, yPercent: -60 }, 0.08)
          .to("[data-hero-role]", { scale: 1.3, autoAlpha: 0 }, 0.2)
          .set(q(".hero-line-mask"), { overflow: "visible" }, 0.24)
          .to(
            chars,
            {
              yPercent: () => gsap.utils.random(-260, -120),
              xPercent: () => gsap.utils.random(-160, 160),
              rotation: () => gsap.utils.random(-120, 120),
              scale: () => gsap.utils.random(0.4, 1.4),
              autoAlpha: 0,
              ease: "power2.in",
              stagger: { each: mobile ? 0.02 : 0.015, from: "center" },
            },
            0.25
          )
          .to("[data-hero-marquee]", { xPercent: -18, autoAlpha: 0 }, 0.5)
          .to(ref.current, { autoAlpha: 0 }, 0.92);
      });

      return () => mm.revert();
    },
    { scope: ref }
  );

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex h-[100svh] min-h-[640px] w-full flex-col overflow-hidden"
    >
      <div ref={bgRef} className="absolute inset-0 will-change-transform">
        {reduced ? (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(212,255,54,0.12),transparent_55%),radial-gradient(circle_at_75%_60%,rgba(255,45,142,0.12),transparent_55%)] bg-bg" />
        ) : (
          <HeroCanvas reduced={reduced} active={active} />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-bg/20 via-transparent to-bg" />
      </div>

      {/* Corner meta */}
      <div className="pointer-events-none absolute inset-0 z-10 hidden p-6 md:block">
        <div className="flex h-full flex-col justify-between">
          <div className="flex justify-between pt-16">
            <span data-hero-meta-tl className="section-label">
              Milano · IT
            </span>
            <span data-hero-meta-tr className="section-label">
              Portfolio © 2026
            </span>
          </div>
          <div className="flex justify-between pb-24">
            <span data-hero-meta-bl className="section-label">
              Lat 45.46 — Lng 9.19
            </span>
            <span data-hero-meta-br className="section-label">
              Est. 2021
            </span>
          </div>
        </div>
      </div>

      {/* Foreground content */}
      <div className="relative z-20 flex flex-1 flex-col justify-center px-5 md:px-10">
        <div className="mx-auto w-full max-w-[1600px]">
          <p data-hero-eyebrow className="section-label mb-5 md:mb-8">
            {t.hero.eyebrow}
          </p>

          <h1 className="font-display text-fg">
            <SplitLine text="FRANCESCO" />
            <SplitLine text="CARO" className="text-stroke-acid" />
          </h1>

          {/* Rotating role */}
          <div data-hero-role className="mt-4 flex items-center gap-4 md:mt-6">
            <span className="hidden h-[2px] w-16 bg-acid md:block" />
            <div className="relative h-[1.15em] overflow-hidden font-display text-2xl leading-none text-acid glow-acid sm:text-4xl md:text-5xl">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIdx}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-110%" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="block"
                >
                  {roles[roleIdx]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>

          <p
            data-hero-blurb
            className="mt-8 max-w-xl font-sans text-base leading-relaxed text-muted md:text-lg"
          >
            {t.hero.blurb}
          </p>
        </div>
      </div>

      {/* Bottom marquee + scroll cue */}
      <div
        data-hero-marquee
        className="relative z-20 border-t border-line bg-bg/40 backdrop-blur-sm"
      >
        <Marquee
          className="py-3 font-display text-xl uppercase tracking-tight text-fg/90 md:text-2xl"
          items={[
            "AI",
            "LLM Agents",
            "RAG",
            "Healthtech",
            "Performance Marketing",
            "Local SEO",
            "Flutter",
            "Next.js",
          ]}
        />
      </div>

      <button
        data-hero-cue
        onClick={() => scrollToTarget("#about")}
        aria-label={t.hero.scroll}
        className="absolute bottom-24 left-1/2 z-20 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="section-label">{t.hero.scroll}</span>
        <span className="relative h-10 w-6 rounded-full border border-line">
          <span className="scroll-cue absolute left-1/2 top-2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-acid" />
        </span>
      </button>
    </section>
  );
}

/** Headline line split into per-char spans for GSAP to drive. */
function SplitLine({ text, className }: { text: string; className?: string }) {
  return (
    <span className="hero-line-mask block overflow-hidden">
      <span
        className={`block text-[19vw] leading-[0.82] tracking-tight md:text-[15vw] ${
          className ?? ""
        }`}
      >
        {[...text].map((ch, i) => (
          <span
            key={i}
            data-hero-char
            className="inline-block will-change-transform"
          >
            {ch}
          </span>
        ))}
      </span>
    </span>
  );
}
