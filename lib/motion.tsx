"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

/* ============================================================== *
 *  SHARED MOTION PRIMITIVES
 *  Easings, reduced-motion, Lenis scroll telemetry, text splitting.
 * ============================================================== */

/** Signature "expo out" curve used across the site. */
export const EASE = [0.16, 1, 0.3, 1] as const;
/** Symmetrical curve for wipes / panels. */
export const EASE_IN_OUT = [0.76, 0, 0.24, 1] as const;
/** GSAP string equivalents. */
export const GSAP_EASE = "expo.out";
export const GSAP_EASE_IN_OUT = "power4.inOut";

export const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Live `prefers-reduced-motion` flag (SSR-safe, updates on change). */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/** Matches a media query reactively (SSR-safe, false on first paint). */
export function useMediaQuery(query: string): boolean {
  const [match, setMatch] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return match;
}

type LenisLike = {
  on: (e: "scroll", cb: (s: LenisScrollData) => void) => void;
  off: (e: "scroll", cb: (s: LenisScrollData) => void) => void;
  scroll: number;
  velocity: number;
  direction: number;
  progress: number;
};
type LenisScrollData = {
  scroll: number;
  velocity: number;
  direction: number;
  progress: number;
};

function getLenis(): LenisLike | undefined {
  return (window as unknown as { __lenis?: LenisLike }).__lenis;
}

/**
 * Subscribe to Lenis scroll frames. Falls back to a `scroll` listener with a
 * hand-rolled velocity estimate when Lenis is absent (reduced-motion users).
 * The callback receives a normalised, sign-preserving velocity.
 */
export function useLenisScroll(
  cb: (data: { scroll: number; velocity: number; direction: number }) => void
) {
  const cbRef = useRef(cb);
  cbRef.current = cb;

  useEffect(() => {
    const lenis = getLenis();
    if (lenis) {
      const handler = (s: LenisScrollData) =>
        cbRef.current({
          scroll: s.scroll,
          velocity: s.velocity,
          direction: s.direction,
        });
      lenis.on("scroll", handler);
      return () => lenis.off("scroll", handler);
    }

    let last = window.scrollY;
    let lastT = performance.now();
    const onScroll = () => {
      const now = performance.now();
      const y = window.scrollY;
      const dt = Math.max(1, now - lastT);
      const v = ((y - last) / dt) * 16; // px per frame-ish
      cbRef.current({ scroll: y, velocity: v, direction: Math.sign(y - last) });
      last = y;
      lastT = now;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

/* ------------------------------------------------------------------ *
 *  SplitText — renders words → chars as spans for GSAP / CSS to drive.
 *  No animation of its own. Accessible: real text in aria-label,
 *  visual spans marked aria-hidden.
 * ------------------------------------------------------------------ */

type SplitTextProps = {
  text: string;
  /** granularity of the leaf spans */
  by?: "char" | "word";
  className?: string;
  /** class on each word wrapper (has overflow-hidden by default) */
  wordClassName?: string;
  /** class on each leaf span (the thing you animate) */
  charClassName?: string;
  style?: CSSProperties;
  as?: "span" | "div";
};

export function SplitText({
  text,
  by = "char",
  className,
  wordClassName,
  charClassName,
  style,
  as = "span",
}: SplitTextProps) {
  const Tag = as;
  const words = text.split(" ");
  let leafIndex = 0;

  return (
    <Tag className={className} style={style} aria-label={text} role="text">
      {words.map((word, wi) => (
        <span
          key={wi}
          aria-hidden
          className={`split-word ${wordClassName ?? ""}`}
          style={{
            display: "inline-block",
            overflow: "hidden",
            verticalAlign: "top",
          }}
        >
          {by === "word" ? (
            <span
              className={`split-char ${charClassName ?? ""}`}
              data-si={leafIndex++}
              style={{ display: "inline-block", willChange: "transform" }}
            >
              {word}
            </span>
          ) : (
            [...word].map((ch, ci) => (
              <span
                key={ci}
                className={`split-char ${charClassName ?? ""}`}
                data-si={leafIndex++}
                style={{ display: "inline-block", willChange: "transform" }}
              >
                {ch}
              </span>
            ))
          )}
          {wi < words.length - 1 && (
            <span style={{ display: "inline-block", width: "0.28em" }}>
              &nbsp;
            </span>
          )}
        </span>
      ))}
    </Tag>
  );
}
