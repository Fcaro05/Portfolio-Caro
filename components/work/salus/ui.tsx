"use client";

import { useI18n } from "@/lib/i18n";
import { scrollToTarget } from "@/components/providers/SmoothScroll";
import Reveal from "@/components/ui/Reveal";
import {
  certaintyLabel,
  domainLabel,
  type Certainty,
  type DocId,
  type Domain,
  type LStr,
} from "./data";

/** Eventi tra sezioni: il documento da aprire nel viewer. */
export const salusBus = {
  doc(id: DocId) {
    window.dispatchEvent(new CustomEvent<DocId>("salus:doc", { detail: id }));
  },
};

export function jump(id: string) {
  scrollToTarget(id);
}

export function useT() {
  const { locale } = useI18n();
  return { locale, tr: (s: LStr) => s[locale] };
}

export function SectionHead({
  id,
  n,
  label,
  title,
  intro,
  color,
}: {
  id: string;
  n: string;
  label: LStr;
  title: LStr;
  intro?: LStr;
  color: string;
}) {
  const { locale } = useI18n();
  return (
    <div id={id} className="scroll-mt-24">
      <Reveal>
        <div className="flex items-center gap-3">
          <span
            className="rounded-full px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-black"
            style={{ background: color }}
          >
            {n}
          </span>
          <span className="section-label">{label[locale]}</span>
        </div>
        <h2 className="mt-5 max-w-4xl font-display text-4xl uppercase leading-[0.9] tracking-tight sm:text-5xl md:text-7xl">
          {title[locale]}
        </h2>
        {intro && (
          <p className="mt-6 max-w-2xl font-sans text-lg leading-relaxed text-fg/80 md:text-xl">
            {intro[locale]}
          </p>
        )}
      </Reveal>
    </div>
  );
}

const certStyle: Record<Certainty, string> = {
  // neutri: acid, cyan e violet sono i colori dei progetti
  fact: "border-fg/60 bg-fg/10 text-fg",
  planned: "border-fg/50 text-fg/80",
  estimate: "border-dashed border-magenta/80 text-magenta",
};

export function CertBadge({ c }: { c: Certainty }) {
  const { locale } = useI18n();
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.14em] ${certStyle[c]}`}
    >
      {certaintyLabel[c][locale]}
    </span>
  );
}

export function DomainChip({ d, active }: { d: Domain; active?: boolean }) {
  const { locale } = useI18n();
  return (
    <span
      className={`tag-chip !text-[0.62rem] ${active ? "!border-fg/50 !text-fg" : ""}`}
    >
      {domainLabel[d][locale]}
    </span>
  );
}

export function Euro({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const { locale } = useI18n();
  return <>{fmtEuro(value, locale, decimals)}</>;
}

/** Raggruppamento esplicito: Intl it-IT non separa le migliaia sotto le cinque cifre (1800, 5000). */
function group(value: number, locale: "it" | "en", decimals: number) {
  const [int, dec] = value.toFixed(decimals).split(".");
  const sepThousands = locale === "it" ? "." : ",";
  const sepDecimal = locale === "it" ? "," : ".";
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, sepThousands);
  return dec ? `${grouped}${sepDecimal}${dec}` : grouped;
}

export function fmtEuro(value: number, locale: "it" | "en", decimals = 0) {
  const n = group(value, locale, decimals);
  return locale === "it" ? `${n} €` : `€${n}`;
}

export function fmtInt(value: number, locale: "it" | "en") {
  return group(value, locale, 0);
}
