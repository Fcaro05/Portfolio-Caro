"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useLenisScroll, usePrefersReducedMotion } from "@/lib/motion";

const SECTIONS = [
  ["top", "Intro"],
  ["about", "Manifesto"],
  ["capabilities", "Skills"],
  ["work", "Work"],
  ["experience", "Path"],
  ["contact", "Contact"],
] as const;

/** Fixed corner readout: section index + live scroll percentage. */
export default function Hud() {
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();
  const [pct, setPct] = useState(0);
  const [idx, setIdx] = useState(0);
  const raf = useRef(0);

  useLenisScroll(() => {
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setPct(max > 0 ? Math.round((window.scrollY / max) * 100) : 0);
      const mid = window.scrollY + window.innerHeight * 0.35;
      let cur = 0;
      SECTIONS.forEach(([id], i) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= mid) cur = i;
      });
      setIdx(cur);
    });
  });

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  if (pathname !== "/") return null;

  const label = SECTIONS[idx]?.[1] ?? "";

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed bottom-4 left-4 z-[115] hidden select-none font-mono text-[0.62rem] uppercase leading-tight tracking-[0.18em] text-muted md:left-6 md:block"
    >
      <div className="flex items-center gap-2">
        <span className="text-acid">
          {String(idx + 1).padStart(2, "0")}
        </span>
        <span className="h-px w-6 bg-line" />
        <span>{String(SECTIONS.length).padStart(2, "0")}</span>
        <span className="ml-1 text-fg/70">{label}</span>
      </div>
      {!reduced && (
        <div className="mt-1.5 flex items-center gap-2">
          <span className="relative block h-px w-24 overflow-hidden bg-line">
            <span
              className="absolute inset-y-0 left-0 bg-acid"
              style={{ width: `${pct}%` }}
            />
          </span>
          <span>{String(pct).padStart(3, "0")}%</span>
        </div>
      )}
    </div>
  );
}
