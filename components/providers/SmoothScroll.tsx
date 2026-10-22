"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  // Mobile browsers fire resize on every URL-bar show/hide; without this,
  // pinned sections jump around on phones.
  ScrollTrigger.config({ ignoreMobileResize: true });
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

    // ScrollTrigger measures pixel offsets up front; recalc once late-loading
    // fonts, the WebGL canvas and the intro loader have settled the layout.
    const refresh = () => ScrollTrigger.refresh();
    const t1 = window.setTimeout(refresh, 300);
    const t2 = window.setTimeout(refresh, 1600);
    if (document.fonts?.ready) document.fonts.ready.then(refresh).catch(() => {});
    window.addEventListener("load", refresh);
    window.addEventListener("fc:loader-done", refresh);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("load", refresh);
      window.removeEventListener("fc:loader-done", refresh);
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
    // con un #ancora le immagini e i font cambiano l'altezza della pagina dopo il primo scroll:
    // si ripete il salto finché il layout non si assesta
    const timers = window.location.hash.length > 1 ? [300, 900].map((ms) => window.setTimeout(go, ms)) : [];
    return () => {
      cancelAnimationFrame(raf);
      timers.forEach((t) => window.clearTimeout(t));
    };
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
