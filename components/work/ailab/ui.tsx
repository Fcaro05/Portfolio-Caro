"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useT } from "../salus/ui";
import type { CaseData, LStr, Snippet } from "./data";

/** Testata di un caso: numero, nome, tipo, stato e periodo. */
export function CaseHead({ c }: { c: CaseData }) {
  const { tr } = useT();
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <span
          className="rounded-full px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-black"
          style={{ background: c.color }}
        >
          {c.n}
        </span>
        <span className="section-label">{tr(c.kind)}</span>
        <span className="section-label">· {tr(c.when)}</span>
        <span
          className="rounded-full border px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] md:ml-auto"
          style={{ borderColor: `${c.color}88`, color: c.color }}
        >
          {tr(c.status)}
        </span>
      </div>
      <h2 className="mt-5 font-display text-4xl uppercase leading-[0.9] tracking-tight sm:text-5xl md:text-7xl">{c.name}</h2>
    </div>
  );
}

export function BlockTitle({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <h3 className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-muted">
      <span className="h-px w-6" style={{ background: color }} />
      {children}
    </h3>
  );
}

/** I passaggi di un sistema, numerati. */
export function Flow({ c }: { c: CaseData }) {
  const { tr } = useT();
  return (
    <>
      {/* mobile: le schede scorrono di lato mentre si scrolla in verticale */}
      <div className="sm:hidden">
        <PinnedRail count={c.flow.length} color={c.color}>
          {c.flow.map((s, i) => (
            <div key={i} className="flex w-[76vw] shrink-0 flex-col gap-2 rounded-2xl border border-line bg-bg p-4">
              <span className="font-display text-2xl leading-none" style={{ color: c.color }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-lg uppercase leading-none tracking-tight">{tr(s.title)}</span>
              <span className="font-sans text-sm leading-relaxed text-muted">{tr(s.note)}</span>
            </div>
          ))}
        </PinnedRail>
      </div>

      <ol className="mt-5 hidden gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid sm:grid-cols-2 lg:grid-cols-3">
        {c.flow.map((s, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 3) * 0.06 }}
            className="flex flex-col gap-2 bg-bg p-5"
          >
            <span className="font-display text-3xl leading-none" style={{ color: c.color }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="font-display text-xl uppercase leading-none tracking-tight">{tr(s.title)}</span>
            <span className="font-sans text-sm leading-relaxed text-muted">{tr(s.note)}</span>
          </motion.li>
        ))}
        {/* caselle vuote dell'ultima riga: stesso fondo delle altre, niente buco grigio */}
        {Array.from({ length: (3 - (c.flow.length % 3)) % 3 }, (_, i) => (
          <li key={`f3-${i}`} aria-hidden className="hidden bg-bg lg:block" />
        ))}
        {c.flow.length % 2 === 1 && <li aria-hidden className="hidden bg-bg sm:block lg:hidden" />}
      </ol>
    </>
  );
}

export function Numbers({ c }: { c: CaseData }) {
  const { tr } = useT();
  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
      {c.numbers.map((n) => (
        <div key={n.label.it} className="bg-bg p-5 md:p-6">
          <div className="font-display text-4xl leading-none md:text-5xl" style={{ color: c.color }}>
            {n.value}
          </div>
          <p className="mt-2 font-sans text-xs leading-snug text-muted">{tr(n.label)}</p>
        </div>
      ))}
    </div>
  );
}

export function Limits({ c }: { c: CaseData }) {
  const { locale } = useT();
  const it = locale === "it";
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-2xl border border-dashed border-fg/25 p-4 md:p-7">
      <button
        type="button"
        data-cursor
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-3 text-left md:pointer-events-none"
      >
        <BlockTitle color={c.color}>{it ? "Cosa non fa, e dove si ferma" : "What it doesn't do, and where it stops"}</BlockTitle>
        <span aria-hidden className="font-display text-2xl leading-none transition-transform md:hidden" style={{ color: c.color, transform: open ? "rotate(45deg)" : "none" }}>
          +
        </span>
      </button>
      <ul className={`mt-4 gap-3 md:grid md:grid-cols-2 ${open ? "grid" : "hidden"}`}>
        {(it ? c.limits.it : c.limits.en).map((l) => (
          <li key={l} className="flex items-start gap-3 font-sans text-sm leading-relaxed text-fg/85">
            <span className="mt-0.5 font-mono text-sm" style={{ color: c.color }}>
              ○
            </span>
            {l}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Su mobile mostra una sola scheda per volta, scelta da linguette; da lg in su le mostra tutte (renderAll). */
export function MobileTabs({
  tabs,
  color,
  renderAll,
}: {
  tabs: { label: string; node: React.ReactNode }[];
  color: string;
  renderAll: React.ReactNode;
}) {
  const [a, setA] = useState(0);
  return (
    <>
      <div className="lg:hidden">
        <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist">
          {tabs.map((t, i) => (
            <button
              key={t.label}
              type="button"
              role="tab"
              aria-selected={i === a}
              data-cursor
              onClick={() => setA(i)}
              className="shrink-0 rounded-full border px-3.5 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.08em] transition-colors"
              style={i === a ? { background: color, borderColor: color, color: "#0b0b10" } : { borderColor: "var(--line)", color: "var(--muted)" }}
            >
              {t.label}
            </button>
          ))}
        </div>
        <div className="mt-3 min-w-0">{tabs[a].node}</div>
      </div>
      <div className="hidden lg:block">{renderAll}</div>
    </>
  );
}

/** Frammento di codice o di testo vero, con il nome del file. */
export function CodeBlock({ s, color }: { s: Snippet; color: string }) {
  const { tr } = useT();
  return (
    <figure className="min-w-0 overflow-hidden rounded-2xl border border-line bg-[#0b0b10]">
      <figcaption className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5">
        <span className="truncate font-mono text-[0.7rem]" style={{ color }}>
          {s.file}
        </span>
        <span className="hidden truncate font-sans text-xs text-muted sm:block">{tr(s.caption)}</span>
      </figcaption>
      <pre className="overflow-x-auto p-4 font-mono text-[0.72rem] leading-relaxed text-fg/85 md:text-[0.78rem]">
        {s.lines.map((l, i) => (
          <div key={i} className="flex gap-4">
            <span className="w-5 shrink-0 select-none text-right text-fg/25">{i + 1}</span>
            <code className={s.wrap ? "min-w-0 whitespace-pre-wrap break-words" : "whitespace-pre"}>{l || " "}</code>
          </div>
        ))}
      </pre>
      <p className="border-t border-line px-4 py-2 font-sans text-xs text-muted sm:hidden">{tr(s.caption)}</p>
    </figure>
  );
}

export function Problem({ text }: { text: LStr }) {
  const { tr } = useT();
  return <p className="max-w-3xl font-sans text-base leading-relaxed text-fg/90 md:text-xl">{tr(text)}</p>;
}

/**
 * Mobile: la fila di schede si ancora al centro dello schermo e lo scroll verticale normale la fa
 * scorrere in orizzontale. Finita l'ultima scheda, la pagina riprende a scendere.
 * Le schede devono avere una larghezza fissa in vw (la traccia è w-max).
 *
 * Le misure verticali sono tutte in CSS (svh) e si leggono dal DOM: se si usasse window.innerHeight,
 * la barra degli indirizzi che si nasconde mentre si scrolla cambierebbe l'altezza e la pagina salterebbe.
 */
export function PinnedRail({
  children,
  count,
  color,
  label,
  perItem = 16,
}: {
  children: React.ReactNode;
  count: number;
  color: string;
  label?: React.ReactNode;
  /** altezza di scroll (in svh) per passare da una scheda alla successiva */
  perItem?: number;
}) {
  const box = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const near = useRef(true);
  const last = useRef(0);
  const [h, setH] = useState(320);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = inner.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setH(el.offsetHeight));
    ro.observe(el);
    setH(el.offsetHeight);
    // fuori dallo schermo non si calcola niente: meno lavoro a ogni scroll
    const io = new IntersectionObserver(([e]) => (near.current = e.isIntersecting), { rootMargin: "100% 0px" });
    if (box.current) io.observe(box.current);
    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  const { scrollY } = useScroll();
  const progress = useTransform(scrollY, () => {
    const b = box.current;
    const n = inner.current;
    if (!b || !n || !near.current) return last.current;
    const travel = b.offsetHeight - n.offsetHeight;
    if (travel <= 0) return 0;
    const top = parseFloat(getComputedStyle(n).top) || 0;
    last.current = Math.max(0, Math.min(1, (top - b.getBoundingClientRect().top) / travel));
    return last.current;
  });
  const x = useTransform(progress, (v) => {
    const t = track.current;
    const vp = t?.parentElement;
    const max = t && vp ? Math.max(0, t.scrollWidth - vp.clientWidth) : 0;
    return `${-v * max}px`;
  });
  useMotionValueEvent(progress, "change", (v) => {
    const i = Math.round(v * (count - 1));
    setActive((p) => (p === i ? p : i));
  });

  return (
    <div ref={box} style={{ height: `calc(${h}px + ${(count - 1) * perItem}svh)` }}>
      <div
        ref={inner}
        className="sticky flex flex-col gap-4"
        style={{ top: `max(4.5rem, calc((100svh - ${h}px) / 2))` }}
      >
        {label}
        <div className="-mx-5 overflow-hidden">
          <motion.div ref={track} style={{ x, willChange: "transform" }} className="flex w-max gap-3 px-5">
            {children}
          </motion.div>
        </div>
        <div className="flex items-center gap-1.5" aria-hidden>
          {Array.from({ length: count }, (_, i) => (
            <span
              key={i}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{ width: i === active ? 22 : 8, background: i === active ? color : "var(--line)" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
