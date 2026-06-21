"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Lenis smooth scroll, synced with the GSAP ticker and ScrollTrigger.
 * Resets scroll on route change (to top, or to a hash target if present).
 * Respects prefers-reduced-motion.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    return () => {
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisRef.current = null;
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  // On route change: jump to the hash target if any, otherwise to the top.
  useEffect(() => {
    const lenis = lenisRef.current;
    const go = () => {
      const hash = window.location.hash;
      if (hash && hash.length > 1) {
        const el = document.querySelector(hash);
        if (el) {
          if (lenis) lenis.scrollTo(el as HTMLElement, { immediate: true });
          else (el as HTMLElement).scrollIntoView();
          return;
        }
      }
      if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
    };
    const raf = requestAnimationFrame(go);
    return () => cancelAnimationFrame(raf);
  }, [pathname]);

  return <>{children}</>;
}

/** Programmatic smooth-scroll to a selector or offset, falling back to native. */
export function scrollToTarget(target: string | number) {
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  if (lenis) {
    lenis.scrollTo(target, { offset: 0, duration: 1.2 });
  } else if (typeof target === "string") {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
  } else {
    window.scrollTo({ top: target, behavior: "smooth" });
  }
}
