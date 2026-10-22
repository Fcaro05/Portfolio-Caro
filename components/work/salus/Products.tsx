"use client";

import { motion } from "framer-motion";
import { pvlmSteps, type LStr } from "./data";
import { SectionHead, jump, salusBus, useT } from "./ui";

type Product = {
  name: string;
  stage: LStr;
  tone: "acid" | "cyan" | "violet";
  summary: LStr;
  facts: LStr[];
  cta?: { label: LStr; action: () => void };
};

export default function Products({ color }: { color: string }) {
  const { tr } = useT();

  const products: Product[] = [
    {
      name: "PVLM",
      stage: { it: "Sviluppo concluso · in verifica", en: "Development complete · in verification" },
      tone: "acid",
      summary: {
        it: "Monitoraggio della letteratura scientifica per la farmacovigilanza. Sostituisce alert via email, lettura degli abstract e un Excel diverso per ogni azienda farmaceutica.",
        en: "Scientific literature monitoring for pharmacovigilance. It replaces email alerts, abstract reading and a different Excel file for every pharma company.",
      },
      facts: [
        { it: "Embase e PubMed via API", en: "Embase and PubMed via API" },
        { it: "Classificazione AI sui criteri di ogni prodotto", en: "AI classification on each product's criteria" },
        { it: "Report nel template del cliente", en: "Report in the client's template" },
        { it: "Un operatore valida ogni risultato", en: "An operator validates every result" },
      ],
      cta: {
        label: { it: "Guarda la presentazione", en: "See the presentation" },
        action: () => {
          salusBus.doc("pvlm-deck");
          jump("#documenti");
        },
      },
    },
    {
      name: tr({ it: "Piattaforma di aderenza", en: "Adherence platform" }),
      stage: { it: "In proposta", en: "On offer" },
      tone: "cyan",
      summary: {
        it: "App per il paziente che si personalizza su un farmaco o su una linea di prodotti. I proventi delle commesse finanziano il Med Box.",
        en: "A patient app tailored to a drug or a product line. Project revenue funds the Med Box.",
      },
      facts: [
        { it: "Piano terapeutico e promemoria", en: "Therapy plan and reminders" },
        { it: "Assistente AI su contenuti validati", en: "AI assistant on validated content" },
        { it: "Dati aggregati e anonimi", en: "Aggregated, anonymous data" },
        { it: "Cloud in UE, GDPR e AI Act", en: "EU cloud, GDPR and AI Act" },
      ],
    },
    {
      name: "Smart Med Box",
      stage: { it: "Prototipo · in pausa", en: "Prototype · on hold" },
      tone: "violet",
      summary: {
        it: "Contenitore da comodino a 9 scomparti. Ogni scomparto pesa il contenuto e il sistema capisce se la dose è stata presa.",
        en: "A bedside container with 9 compartments. Each compartment weighs its contents so the system can tell whether the dose was taken.",
      },
      facts: [
        { it: "ESP32 con Wi-Fi e SIM dati di riserva", en: "ESP32 with Wi-Fi and a backup data SIM" },
        { it: "Display touch TFT da 3,5 pollici", en: "3.5-inch TFT touch display" },
        { it: "Batteria tampone per i blackout", en: "Backup battery for power cuts" },
        { it: "App Flutter con ruoli paziente, caregiver, medico, struttura", en: "Flutter app with patient, caregiver, doctor and facility roles" },
      ],
      cta: {
        label: { it: "Scomponilo qui sotto", en: "Take it apart below" },
        action: () => jump("#med-box"),
      },
    },
  ];

  const tone = { acid: "#d4ff36", cyan: "#34e7e4", violet: "#8b5cff" } as const;

  return (
    <section className="border-t border-line px-5 py-16 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1400px]">
        <SectionHead
          id="prodotti"
          n="03"
          color={color}
          label={{ it: "I prodotti", en: "The products" }}
          title={{ it: "Tre prodotti, tre stadi", en: "Three products, three stages" }}
          intro={{
            it: "Uno è finito e in verifica con un cliente, uno è in vendita come progetto, uno aspetta il capitale. Si vedono tutti e tre qui sotto.",
            en: "One is finished and under client verification, one is offered as a project, one waits for capital. All three are below.",
          }}
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {products.map((p, i) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="flex flex-col rounded-3xl border border-line bg-bg-soft p-6 md:p-8"
            >
              <span
                className="self-start rounded-full px-3 py-1 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-black"
                style={{ background: tone[p.tone] }}
              >
                {tr(p.stage)}
              </span>
              <h3 className="mt-5 font-display text-4xl uppercase leading-none tracking-tight md:text-5xl">
                {p.name}
              </h3>
              <p className="mt-4 font-sans text-base leading-relaxed text-fg/80">{tr(p.summary)}</p>
              <ul className="mt-6 flex flex-col gap-2 border-t border-line pt-4">
                {p.facts.map((f, k) => (
                  <li key={k} className="flex items-start gap-3 font-sans text-sm text-fg/85">
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45"
                      style={{ background: tone[p.tone] }}
                    />
                    {tr(f)}
                  </li>
                ))}
              </ul>
              {p.cta && (
                <button
                  type="button"
                  data-cursor
                  onClick={p.cta.action}
                  className="mt-auto self-start pt-6 font-mono text-xs uppercase tracking-[0.12em] hover:underline"
                  style={{ color: tone[p.tone] }}
                >
                  {tr(p.cta.label)} →
                </button>
              )}
            </motion.article>
          ))}
        </div>

        {/* PVLM — il flusso */}
        <div className="mt-6 rounded-3xl border border-line p-6 md:p-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h3 className="font-display text-3xl uppercase leading-none tracking-tight md:text-5xl">
              {tr({ it: "PVLM in sei passaggi", en: "PVLM in six steps" })}
            </h3>
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">
              {tr({ it: "Ambiente demo · dati dimostrativi", en: "Demo environment · demonstration data" })}
            </span>
          </div>
          <ol className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-6">
            {pvlmSteps.map((s, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col gap-3 bg-bg p-5"
              >
                <span className="font-display text-3xl leading-none" style={{ color: tone.acid }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-sans text-sm leading-snug text-fg/90">{tr(s)}</span>
              </motion.li>
            ))}
          </ol>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            <Stat
              big="326"
              label={{ it: "articoli valutati su 7 alert Embase nel dataset dimostrativo", en: "articles assessed across 7 Embase alerts in the demo dataset" }}
            />
            <Stat
              big="7,0%"
              label={{ it: "correzioni umane sulle proposte dell'AI (17 su 242 revisionate)", en: "human corrections to AI proposals (17 of 242 reviewed)" }}
            />
            <Stat
              big="90 / 95%"
              label={{ it: "soglie per promuovere un prompt: accuratezza e recall PSUR, con doppia approvazione", en: "thresholds to promote a prompt: accuracy and PSUR recall, with dual approval" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ big, label }: { big: string; label: LStr }) {
  const { tr } = useT();
  return (
    <div className="border-t border-line pt-4">
      <div className="font-display text-5xl leading-none text-acid">{big}</div>
      <p className="mt-2 font-sans text-sm leading-snug text-muted">{tr(label)}</p>
    </div>
  );
}
