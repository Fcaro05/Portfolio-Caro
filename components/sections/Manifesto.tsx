"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useI18n } from "@/lib/i18n";
import { GSAP_EASE } from "@/lib/motion";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, useGSAP);

type Line = { pre: string; strike: string; color: string };

export default function Manifesto() {
  const { t, locale } = useI18n();
  const m = t.manifesto;
  const root = useRef<HTMLElement>(null);

  const lines: Line[] = [
    { pre: m.line1, strike: m.strike1, color: "bg-magenta" },
    { pre: m.line2, strike: m.strike2, color: "bg-cyan" },
    { pre: m.line3, strike: m.strike3, color: "bg-violet" },
  ];
  const ghost = locale === "it" ? "IBRIDO" : "HYBRID";

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const rows = q<HTMLElement>("[data-line]");
      const strikes = q<HTMLElement>("[data-strike]");
      const punch = q("[data-punch]");
      const paras = q("[data-para]");
      const ghostEl = q("[data-ghost]");

      const mm = gsap.matchMedia();

      // ---- Desktop: pinned scrub, line-by-line ----
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          // pre-hide (scoped to this matchMedia context, reverted on teardown)
          gsap.set(rows, { opacity: 0.12, yPercent: 80 });
          gsap.set(strikes, { scaleX: 0, transformOrigin: "0% 50%" });
          gsap.set(punch, { opacity: 0, yPercent: 110, scale: 0.9 });
          gsap.set(paras, { opacity: 0, y: 36 });

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "+=2800",
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          rows.forEach((rowEl, i) => {
            tl.to(
              rowEl,
              { opacity: 1, yPercent: 0, duration: 0.6, ease: "back.out(1.4)" },
              i * 1.1
            ).to(
              strikes[i],
              { scaleX: 1, duration: 0.4, ease: "power3.inOut" },
              i * 1.1 + 0.45
            );
          });

          tl.to(
            punch,
            {
              opacity: 1,
              yPercent: 0,
              scale: 1,
              duration: 0.7,
              ease: "back.out(1.7)",
            },
            ">-0.1"
          )
            .fromTo(
              root.current,
              { backgroundColor: "rgba(212,255,54,0)" },
              {
                backgroundColor: "rgba(212,255,54,0.06)",
                duration: 0.15,
                yoyo: true,
                repeat: 1,
              },
              "<"
            )
            .to(
              paras,
              { opacity: 1, y: 0, stagger: 0.15, duration: 0.6, ease: GSAP_EASE },
              ">-0.1"
            );

          tl.to(ghostEl, { xPercent: -30, ease: "none" }, 0);
        }
      );

      // ---- Mobile: scrubbed line-by-line reveal, no pin ----
      mm.add(
        "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
        () => {
          gsap.set(rows, { opacity: 0.12, yPercent: 45 });
          gsap.set(strikes, { scaleX: 0, transformOrigin: "0% 50%" });
          gsap.set(punch, { opacity: 0, yPercent: 60, scale: 0.92 });
          gsap.set(paras, { opacity: 0, y: 26 });

          const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: root.current,
              start: "top 78%",
              end: "bottom 65%",
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });

          rows.forEach((rowEl, i) => {
            tl.to(
              rowEl,
              { opacity: 1, yPercent: 0, duration: 0.5, ease: "back.out(1.3)" },
              i * 0.9
            ).to(
              strikes[i],
              { scaleX: 1, duration: 0.35, ease: "power3.inOut" },
              i * 0.9 + 0.35
            );
          });

          tl.to(
            punch,
            {
              opacity: 1,
              yPercent: 0,
              scale: 1,
              duration: 0.6,
              ease: "back.out(1.6)",
            },
            ">-0.1"
          ).to(
            paras,
            { opacity: 1, y: 0, stagger: 0.12, duration: 0.5, ease: GSAP_EASE },
            ">-0.1"
          );

          tl.to(ghostEl, { xPercent: -18, ease: "none" }, 0);
        }
      );

      return () => mm.revert();
    },
    { scope: root }
  );

  return (
    <section
      ref={root}
      id="about"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden border-t border-line px-5 py-28 md:px-10 md:py-40"
    >
      <span
        data-ghost
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-y-1/2 whitespace-nowrap font-display text-[28vw] leading-none text-fg/[0.03] md:text-[20vw]"
      >
        {ghost} {ghost}
      </span>

      <div className="relative mx-auto w-full max-w-[1600px]">
        <p className="section-label mb-12 md:mb-20">{m.label}</p>

        <div className="font-display text-4xl uppercase leading-[1.05] tracking-tight sm:text-5xl md:text-7xl">
          {lines.map((l, i) => (
            <p key={i} data-line className="text-muted/60">
              {l.pre}{" "}
              <span className="relative inline-block text-fg">
                {l.strike}
                <span
                  data-strike
                  aria-hidden
                  className={`absolute left-0 top-[55%] h-[0.09em] w-full origin-left -translate-y-1/2 ${l.color}`}
                />
              </span>
            </p>
          ))}
          <p data-punch className="mt-6 text-acid glow-acid md:mt-10">
            {m.punch}
          </p>
        </div>

        <div className="mt-16 grid gap-8 border-t border-line pt-12 md:mt-28 md:grid-cols-2 md:gap-16">
          {[m.p1, m.p2].map((p, i) => (
            <p
              key={i}
              data-para
              className="max-w-xl font-sans text-lg leading-relaxed text-fg/80 md:text-xl"
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
