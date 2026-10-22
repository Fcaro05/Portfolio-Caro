"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { SectionHead, useT } from "../salus/ui";
import type { LStr } from "./data";

/** Cornice da browser attorno a una schermata. */
export function BrowserFrame({
  src,
  alt,
  url,
  className = "",
}: {
  src: string;
  alt: string;
  url: string;
  className?: string;
}) {
  return (
    <figure className={`overflow-hidden rounded-2xl border border-line bg-bg-soft ${className}`}>
      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-fg/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-fg/20" />
        <span className="h-2.5 w-2.5 rounded-full bg-fg/20" />
        <span className="ml-3 min-w-0 truncate rounded-full border border-line px-3 py-0.5 font-mono text-[0.65rem] text-muted">
          {url}
        </span>
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" width={1280} height={800} className="block h-auto w-full" />
    </figure>
  );
}

/** Cornice da telefono. */
export function PhoneFrame({
  src,
  alt,
  className = "",
  w = 390,
  h = 844,
}: {
  src: string;
  alt: string;
  className?: string;
  w?: number;
  h?: number;
}) {
  return (
    <figure className={`overflow-hidden rounded-[2rem] border-4 border-fg/15 bg-bg-soft ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" width={w} height={h} className="block h-auto w-full" />
    </figure>
  );
}

/** Catena di nodi con frecce: orizzontale da md in su, verticale su mobile. */
export function FlowRow({
  nodes,
  color,
}: {
  nodes: { title: string; sub: LStr }[];
  color: string;
}) {
  const { tr } = useT();
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-stretch md:gap-0">
      {nodes.map((n, i) => (
        <Fragment key={n.title}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="rounded-2xl border border-line bg-bg p-5 md:flex-1"
          >
            <div className="font-mono text-xs" style={{ color }}>
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="mt-2 font-display text-2xl uppercase leading-none tracking-tight">{n.title}</div>
            <div className="mt-2 font-sans text-sm text-muted">{tr(n.sub)}</div>
          </motion.div>
          {i < nodes.length - 1 && (
            <div
              aria-hidden
              className="flex items-center justify-center font-display text-2xl leading-none md:px-3"
              style={{ color }}
            >
              <span className="md:hidden">↓</span>
              <span className="hidden md:inline">→</span>
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
}

/** Griglia di schede titolo + testo, usata per moduli e ruoli. */
export function CardGrid({
  items,
  color,
  cols = "md:grid-cols-2 xl:grid-cols-4",
}: {
  items: { title: LStr; body: LStr }[];
  color: string;
  cols?: string;
}) {
  const { tr } = useT();
  return (
    <div className={`grid gap-3 ${cols}`}>
      {items.map((m, i) => (
        <motion.article
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -6% 0px" }}
          transition={{ delay: (i % 4) * 0.07, duration: 0.5 }}
          className="flex flex-col gap-3 rounded-2xl border border-line bg-bg p-6"
        >
          <span className="font-mono text-xs" style={{ color }}>
            {String(i + 1).padStart(2, "0")}
          </span>
          <h3 className="font-display text-2xl uppercase leading-none tracking-tight">{tr(m.title)}</h3>
          <p className="font-sans text-sm leading-relaxed text-muted">{tr(m.body)}</p>
        </motion.article>
      ))}
    </div>
  );
}

/** Sezione con testata numerata, usata dalle pagine progetto. */
export function DevSection({
  id,
  n,
  label,
  title,
  intro,
  color,
  soft,
  children,
}: {
  id: string;
  n: string;
  label: LStr;
  title: LStr;
  intro?: LStr;
  color: string;
  soft?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section
      className={`border-t border-line px-5 py-16 md:px-10 md:py-24 ${soft ? "bg-bg-soft" : ""}`}
    >
      <div className="mx-auto max-w-[1400px]">
        <SectionHead id={id} n={n} label={label} title={title} intro={intro} color={color} />
        <div className="mt-10 md:mt-12">{children}</div>
      </div>
    </section>
  );
}
