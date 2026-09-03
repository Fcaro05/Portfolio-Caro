"use client";

import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/motion";

/* Printed-circuit-board backdrop: each trace is drawn twice — a dim static
 * "wire" plus a bright overlay whose short dash slides along the path,
 * reading as a packet of light. Glow is dropped under reduced-motion. */

type Trace = {
  d: string;
  c: string;
  dur: number;
  delay: number;
  pads: [number, number][];
};

const A = "var(--acid)";
const C = "var(--cyan)";
const V = "var(--violet)";

const TRACES: Trace[] = [
  { d: "M-40 46 H240 L280 90 H560 L600 46 H1240", c: V, dur: 6.0, delay: 0.0, pads: [[240, 46], [600, 46]] },
  { d: "M-40 120 H140 L180 150 H480 L520 120 H1240", c: C, dur: 7.6, delay: 0.9, pads: [[140, 120], [520, 120]] },
  { d: "M-40 196 H360 L400 168 H720 L760 196 H1240", c: A, dur: 6.8, delay: 0.5, pads: [[360, 196], [760, 196]] },
  { d: "M-40 262 H200 L240 300 H520 L560 262 H860 L900 300 H1240", c: V, dur: 8.6, delay: 1.6, pads: [[200, 262], [900, 300]] },
  { d: "M-40 338 H300 L340 312 H640 L680 338 H1240", c: C, dur: 7.0, delay: 0.3, pads: [[300, 338], [680, 338]] },
  { d: "M300 -40 V70 L340 110 V240", c: A, dur: 5.4, delay: 2.1, pads: [[340, 110]] },
  { d: "M860 -40 V60 L820 100 V240", c: V, dur: 6.2, delay: 1.1, pads: [[820, 100]] },
  { d: "M-40 84 H70 L110 60 H300", c: C, dur: 5.0, delay: 1.9, pads: [[110, 60]] },
];

export default function CircuitBackdrop({
  className = "",
}: {
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();

  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      viewBox="0 0 1200 400"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      <defs>
        <filter id="cb-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {TRACES.map((t, i) => (
        <g key={i}>
          <path d={t.d} fill="none" stroke="var(--line)" strokeWidth={2} />
          <motion.path
            d={t.d}
            fill="none"
            stroke={t.c}
            strokeWidth={2}
            strokeLinecap="round"
            strokeDasharray="14 220"
            style={{ filter: reduced ? undefined : "url(#cb-glow)" }}
            initial={{ strokeDashoffset: 0, opacity: reduced ? 0.5 : 0.9 }}
            animate={reduced ? undefined : { strokeDashoffset: [0, -234] }}
            transition={{
              duration: t.dur,
              delay: t.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          {t.pads.map((p, j) => (
            <circle
              key={j}
              cx={p[0]}
              cy={p[1]}
              r={3.5}
              fill="var(--bg)"
              stroke={t.c}
              strokeWidth={1.5}
            />
          ))}
        </g>
      ))}
    </svg>
  );
}
