"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/motion";

const LINES = [
  "> boot ai-lab.rig",
  "> mount llm-router ........... ok   gemini-2.5-flash",
  "> mount vision-judge ........ ok   gpt-4o-mini",
  "> mount vector-store ........ ok   firestore · findNearest",
  "> link  notion-db[6] ........ ok",
  "> guardrails: schema · cost · latency ... armed",
  "> ready",
];

export default function BootLog() {
  const reduced = usePrefersReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (reduced) {
      setN(LINES.length);
      return;
    }
    if (n >= LINES.length) return;
    const id = setTimeout(() => setN((v) => v + 1), n === 0 ? 350 : 430);
    return () => clearTimeout(id);
  }, [n, reduced]);

  return (
    <div className="mt-8 max-w-md rounded-xl border border-line bg-bg-card/70 p-4 font-mono text-[0.72rem] leading-relaxed text-muted backdrop-blur-sm">
      {LINES.slice(0, n).map((l, i) => (
        <div key={i} className={i === LINES.length - 1 ? "text-cyan" : undefined}>
          {l}
        </div>
      ))}
      {n < LINES.length ? (
        <span className="text-cyan">_</span>
      ) : (
        <motion.span
          className="text-cyan"
          animate={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: 0.55, repeat: Infinity, repeatType: "reverse" }}
        >
          _
        </motion.span>
      )}
    </div>
  );
}
