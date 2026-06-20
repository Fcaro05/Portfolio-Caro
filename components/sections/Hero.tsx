"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { roleWordsHero } from "@/lib/content";
import Marquee from "@/components/ui/Marquee";
import { scrollToTarget } from "@/components/providers/SmoothScroll";

const HeroCanvas = dynamic(() => import("@/components/three/HeroCanvas"), {
  ssr: false,
});

export default function Hero() {
  const { t, locale } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const [reduced, setReduced] = useState(false);
  const [active, setActive] = useState(true);
  const [roleIdx, setRoleIdx] = useState(0);

  const roles = roleWordsHero[locale];

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Pause the WebGL canvas while the hero is scrolled out of view (perf).
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
    const id = setInterval(
      () => setRoleIdx((i) => (i + 1) % roles.length),
      2000
    );
    return () => clearInterval(id);
  }, [roles.length]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const delayBase = reduced ? 0 : 1.5;

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex h-[100svh] min-h-[640px] w-full flex-col overflow-hidden"
    >
      {/* WebGL background */}
      <div className="absolute inset-0">
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
            <span className="section-label">Milano · IT</span>
            <span className="section-label">Portfolio © 2026</span>
          </div>
          <div className="flex justify-between pb-24">
            <span className="section-label">Lat 45.46 — Lng 9.19</span>
            <span className="section-label">Est. 2021</span>
          </div>
        </div>
      </div>

      {/* Foreground content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-20 flex flex-1 flex-col justify-center px-5 md:px-10"
      >
        <div className="mx-auto w-full max-w-[1600px]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delayBase, duration: 0.8 }}
            className="section-label mb-5 md:mb-8"
          >
            {t.hero.eyebrow}
          </motion.p>

          <h1 className="font-display text-fg">
            <Line text="FRANCESCO" delay={delayBase + 0.1} />
            <span className="flex flex-wrap items-baseline gap-x-[0.12em]">
              <Line text="CARO" className="text-stroke-acid" delay={delayBase + 0.2} />
            </span>
          </h1>

          {/* Rotating role */}
          <div className="mt-4 flex items-center gap-4 md:mt-6">
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

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delayBase + 0.5, duration: 1 }}
            className="mt-8 max-w-xl font-sans text-base leading-relaxed text-muted md:text-lg"
          >
            {t.hero.blurb}
          </motion.p>
        </div>
      </motion.div>

      {/* Bottom marquee + scroll cue */}
      <div className="relative z-20 border-t border-line bg-bg/40 backdrop-blur-sm">
        <Marquee
          className="py-3 font-display text-xl uppercase tracking-tight text-fg/90 md:text-2xl"
          items={[
            "Healthtech",
            "Product",
            "Growth Marketing",
            "Local SEO",
            "AI",
            "Flutter",
            "Next.js",
            "Strategy",
          ]}
        />
      </div>

      <button
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

function Line({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
        className={`block text-[19vw] leading-[0.82] tracking-tight md:text-[15vw] ${className ?? ""}`}
      >
        {text}
      </motion.span>
    </span>
  );
}
