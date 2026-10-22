"use client";

import { motion } from "framer-motion";
import {
  cashSteps,
  costPartLabel,
  phases,
  type Phase,
} from "./data";
import { CertBadge, SectionHead, fmtEuro, fmtInt, jump, salusBus, useT } from "./ui";

const partColor: Record<keyof Phase["parts"], string> = {
  electronics: "#34e7e4",
  body: "#8b5cff",
  assembly: "#ff2d8e",
  logistics: "#d4ff36",
  amortisation: "#5d5d6e",
};
const partKeys = Object.keys(partColor) as (keyof Phase["parts"])[];
const phaseColor: Record<Phase["id"], string> = { p1: "#34e7e4", p2: "#8b5cff", p3: "#d4ff36" };

const total = (p: Phase) => partKeys.reduce((s, k) => s + p.parts[k], 0);

export default function Economics({ color }: { color: string }) {
  const { locale, tr } = useT();
  const maxUnit = Math.max(...phases.map(total));
  const maxCash = cashSteps[cashSteps.length - 1].cumulative;

  return (
    <section className="border-t border-line px-5 py-16 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <SectionHead
          id="economia"
          n="05"
          color={color}
          label={{ it: "L'economia", en: "The economics" }}
          title={{ it: "Quanto costa fare il Med Box", en: "What the Med Box costs to build" }}
          intro={{
            it: "I numeri vengono dal piano di industrializzazione, revisione 10.0. Sono stime di progetto, non consuntivi. I ricavi dei servizi restano separati: si guarda il flusso, non un totale.",
            en: "The numbers come from the industrialisation plan, revision 10.0. They are project estimates, not actuals. Service revenue stays separate: the flow matters, not a total.",
          }}
        />

        {/* SOGLIE */}
        <div className="mt-12 rounded-3xl border border-line bg-bg-soft p-6 md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-display text-3xl uppercase leading-none tracking-tight md:text-4xl">
              {tr({ it: "Le due soglie del Med Box", en: "The two Med Box thresholds" })}
            </h3>
            <CertBadge c="estimate" />
          </div>
          <Thresholds color={color} />
          <p className="mt-6 max-w-3xl font-sans text-sm leading-relaxed text-muted">
            {tr({
              it: "Sono stime di massima dei founder, non un budget articolato. Il piano di industrializzazione sotto copre produzione, stampi e prove di laboratorio. La stima dei founder è più larga: comprende anche il completamento del prodotto e il percorso come dispositivo medico.",
              en: "These are rough founder estimates, not an itemised budget. The industrialisation plan below covers production, tooling and lab tests. The founders' estimate is wider: it also includes finishing the product and the medical-device route.",
            })}
          </p>
        </div>

        {/* COSTO UNITARIO */}
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-line p-6 md:p-10">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-3xl uppercase leading-none tracking-tight md:text-4xl">
                  {tr({ it: "Costo per unità", en: "Cost per unit" })}
                </h3>
                <p className="mt-2 font-sans text-sm text-muted">
                  {tr({
                    it: "Costo reale a scaffale (TCO) per ogni Med Box, per fase.",
                    en: "Real shelf cost (TCO) of each Med Box, by phase.",
                  })}
                </p>
              </div>
              <CertBadge c="estimate" />
            </div>

            <div className="mt-8 flex flex-col gap-6">
              {phases.map((p, i) => {
                const t = total(p);
                return (
                  <div key={p.id}>
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="font-display text-lg uppercase tracking-tight">{tr(p.name)}</span>
                      <span className="font-display text-2xl" style={{ color: phaseColor[p.id] }}>
                        {fmtEuro(t, locale, 2)}
                      </span>
                    </div>
                    <div className="mt-1 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted">
                      {tr(p.units)}
                    </div>
                    <div
                      className="mt-3 flex h-7 overflow-hidden rounded-md"
                      style={{ width: `${(t / maxUnit) * 100}%` }}
                      role="img"
                      aria-label={`${tr(p.name)}: ${fmtEuro(t, locale, 2)}`}
                    >
                      {partKeys.map((k) =>
                        p.parts[k] > 0 ? (
                          <motion.div
                            key={k}
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                              width: `${(p.parts[k] / t) * 100}%`,
                              background: partColor[k],
                              transformOrigin: "left",
                            }}
                            title={`${tr(costPartLabel[k])}: ${fmtEuro(p.parts[k], locale, 2)}`}
                          />
                        ) : null,
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <ul className="mt-8 grid gap-2 border-t border-line pt-5 sm:grid-cols-2">
              {partKeys.map((k) => (
                <li key={k} className="flex items-start gap-2 font-sans text-xs leading-snug text-muted">
                  <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: partColor[k] }} />
                  {tr(costPartLabel[k])}
                </li>
              ))}
            </ul>

            <details className="mt-5 font-sans text-sm text-muted">
              <summary data-cursor className="cursor-pointer font-mono text-[0.7rem] uppercase tracking-[0.12em] hover:text-fg">
                {tr({ it: "Tabella dei dati", en: "Data table" })}
              </summary>
              <div className="mt-3 overflow-x-auto">
                <table className="w-full min-w-[420px] border-collapse text-left text-xs">
                  <thead>
                    <tr className="border-b border-line text-muted">
                      <th className="py-2 pr-3 font-medium">{tr({ it: "Voce", en: "Item" })}</th>
                      {phases.map((p) => (
                        <th key={p.id} className="py-2 pr-3 text-right font-medium">
                          {tr(p.name).split(" · ")[0]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {partKeys.map((k) => (
                      <tr key={k} className="border-b border-line/50">
                        <td className="py-2 pr-3">{tr(costPartLabel[k])}</td>
                        {phases.map((p) => (
                          <td key={p.id} className="py-2 pr-3 text-right tabular-nums">
                            {fmtEuro(p.parts[k], locale, 2)}
                          </td>
                        ))}
                      </tr>
                    ))}
                    <tr className="text-fg">
                      <td className="py-2 pr-3 font-medium">TCO</td>
                      {phases.map((p) => (
                        <td key={p.id} className="py-2 pr-3 text-right font-medium tabular-nums">
                          {fmtEuro(total(p), locale, 2)}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </details>
          </div>

          {/* CASSA CUMULATA */}
          <div className="rounded-3xl border border-line p-6 md:p-10">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-3xl uppercase leading-none tracking-tight md:text-4xl">
                  {tr({ it: "Cassa investita, cumulata", en: "Cash invested, cumulative" })}
                </h3>
                <p className="mt-2 font-sans text-sm text-muted">
                  {tr({
                    it: "Uscita di cassa del Med Box passo per passo, con le unità consegnate.",
                    en: "Med Box cash out step by step, with the units delivered.",
                  })}
                </p>
              </div>
              <CertBadge c="estimate" />
            </div>

            <ol className="mt-8 flex flex-col gap-4">
              {cashSteps.map((s, i) => (
                <li key={i}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="font-sans text-sm text-fg/90">{tr(s.label)}</span>
                    <span className="font-display text-lg tabular-nums" style={{ color: phaseColor[s.phase] }}>
                      {fmtEuro(s.cumulative, locale)}
                    </span>
                  </div>
                  <div className="mt-1.5 h-3 rounded-sm bg-line">
                    <motion.div
                      className="h-3 rounded-sm"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                      style={{
                        width: `${(s.cumulative / maxCash) * 100}%`,
                        background: phaseColor[s.phase],
                        transformOrigin: "left",
                      }}
                    />
                  </div>
                  <div className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted">
                    {s.units > 0
                      ? `${fmtInt(s.units, locale)} ${tr({ it: "unità consegnate in totale", en: "units delivered in total" })}`
                      : tr({ it: "nessuna unità ancora", en: "no units yet" })}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* LETTURE */}
        <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          <Reading
            big={fmtEuro(18350, locale)}
            body={{
              it: "bastano per 300 dispositivi pilota in stampa 3D, senza mettere capitale negli stampi.",
              en: "is enough for 300 pilot devices in 3D print, with no capital sunk into tooling.",
            }}
          />
          <Reading
            big={`≈ ${fmtEuro(88100, locale)}`}
            body={{
              it: "per arrivare a 1.800 dispositivi con stampi propri e prove CE/EMC. Il piano calcola che vendere i 1.500 della Fase 2 a 129–149 € (prezzo retail ipotizzato) copra l'esposizione.",
              en: "to reach 1,800 devices with owned tooling and CE/EMC tests. The plan works out that selling the 1,500 from Phase 2 at €129–149 (assumed retail price) covers the exposure.",
            }}
          />
          <Reading
            big={fmtEuro(25.1, locale, 2)}
            body={{
              it: "per unità dalla Fase 3, con lo stampo già ammortizzato. A quel regime il piano indica un margine lordo oltre l'80%, sempre al prezzo retail ipotizzato.",
              en: "per unit from Phase 3, with the tooling already amortised. At that rate the plan shows a gross margin above 80%, still at the assumed retail price.",
            }}
          />
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            type="button"
            data-cursor
            onClick={() => {
              salusBus.doc("medbox-piano");
              jump("#documenti");
            }}
            className="inline-flex items-center gap-3 rounded-full px-6 py-3 font-mono text-sm uppercase tracking-[0.1em] text-black transition-transform hover:scale-[1.03]"
            style={{ background: color }}
          >
            {tr({ it: "Leggi il piano completo", en: "Read the full plan" })} →
          </button>
          <span className="font-sans text-sm text-muted">
            {tr({
              it: "Sette pagine, con la distinta base e la strategia normativa.",
              en: "Seven pages, with the bill of materials and the regulatory strategy.",
            })}
          </span>
        </div>
      </div>
    </section>
  );
}

function Thresholds({ color }: { color: string }) {
  const { locale, tr } = useT();
  const ticks = [
    { at: 0, label: "0" },
    { at: 25, label: "250k €" },
    { at: 50, label: "500k €" },
    { at: 100, label: "1 M€" },
  ];
  return (
    <div className="mt-10">
      <div className="relative h-4 rounded-full bg-line">
        {/* accumulo */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-l-full"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: "25%", background: color, transformOrigin: "left" }}
        />
        {/* completamento */}
        <motion.div
          className="absolute inset-y-0 rounded-r-full"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          style={{
            left: "50%",
            width: "50%",
            transformOrigin: "left",
            background:
              "repeating-linear-gradient(135deg, #8b5cff 0 8px, rgba(139,92,255,0.35) 8px 16px)",
          }}
        />
        {ticks.map((t) => (
          <span
            key={t.at}
            className={`absolute top-full mt-2 whitespace-nowrap font-mono text-[0.62rem] uppercase tracking-[0.1em] text-muted ${
              t.at === 0 ? "" : t.at === 100 ? "-translate-x-full" : "-translate-x-1/2"
            }`}
            style={{ left: `${t.at}%` }}
          >
            {t.label}
          </span>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted">
        <span className="flex items-center gap-2">
          <span className="h-2.5 w-5 rounded-sm" style={{ background: color }} />
          {tr({ it: "da accumulare per ripartire", en: "to set aside to restart" })}
        </span>
        <span className="flex items-center gap-2">
          <span
            className="h-2.5 w-5 rounded-sm"
            style={{ background: "repeating-linear-gradient(135deg, #8b5cff 0 4px, rgba(139,92,255,0.35) 4px 8px)" }}
          />
          {tr({ it: "fascia per completare e distribuire", en: "range to complete and distribute" })}
        </span>
      </div>

      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-line p-5">
          <div className="font-display text-4xl leading-none" style={{ color }}>
            250.000 €
          </div>
          <div className="mt-2 font-sans text-sm leading-snug text-fg/85">
            {tr({
              it: "accantonati dai servizi: si ricomincia a lavorare sul Med Box. Orizzonte stimato: inizio 2028.",
              en: "set aside from services: work on the Med Box resumes. Estimated horizon: early 2028.",
            })}
          </div>
        </div>
        <div className="rounded-2xl border border-line p-5">
          <div className="font-display text-3xl leading-none text-violet sm:text-4xl">
            {locale === "it" ? "500.000–1.000.000 €" : "€500,000–1,000,000"}
          </div>
          <div className="mt-2 font-sans text-sm leading-snug text-fg/85">
            {tr({
              it: "per completare il progetto e passare alla distribuzione, percorso da dispositivo medico compreso.",
              en: "to complete the project and move to distribution, medical-device route included.",
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function Reading({ big, body }: { big: string; body: { it: string; en: string } }) {
  const { tr } = useT();
  return (
    <div className="bg-bg p-6 md:p-8">
      <div className="font-display text-4xl leading-none text-acid md:text-5xl">{big}</div>
      <p className="mt-3 font-sans text-sm leading-relaxed text-fg/80">{tr(body)}</p>
    </div>
  );
}
