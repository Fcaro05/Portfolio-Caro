"use client";

import { motion } from "framer-motion";
import { accentHex } from "@/lib/content";
import DevDetailShell from "./dev/DevDetailShell";
import { CardGrid, DevSection, FlowRow } from "./dev/ui";
import { gestArch, gestModules, gestNumbers, permModules, quoteFlow } from "./dev/data";
import { useT } from "./salus/ui";

const color = accentHex.violet;

const macroFasi: { fasi: string; it: string; en: string }[] = [
  { fasi: "1 · 3", it: "Analisi e UX/UI", en: "Analysis and UX/UI" },
  {
    fasi: "2 · 4 · 5 · 6 · 7",
    it: "Sviluppo: architettura, setup, moduli core e avanzati, sicurezza",
    en: "Development: architecture, setup, core and advanced modules, security",
  },
  { fasi: "8 · 9", it: "Test e rilascio", en: "Testing and release" },
  {
    fasi: "10 · 11 · 12",
    it: "Project management, manutenzione, costi pass-through",
    en: "Project management, maintenance, pass-through costs",
  },
];

const securityNotes: { it: string; en: string }[] = [
  { it: "Il token di servizio non arriva mai nel browser.", en: "The service token never reaches the browser." },
  { it: "Password con hash bcrypt e sessione firmata con JWT.", en: "Bcrypt-hashed passwords and a JWT-signed session." },
  {
    it: "Utenti e permessi della dashboard in un database locale, separato dai dati dell'API.",
    en: "Dashboard users and permissions in a local database, separate from the API data.",
  },
];

type Perm = "edit" | "view" | "none";
const sampleMatrix: { who: { it: string; en: string }; p: Perm[] }[] = [
  { who: { it: "Operatore A", en: "Operator A" }, p: ["edit", "edit", "view", "none", "edit"] },
  { who: { it: "Operatore B", en: "Operator B" }, p: ["view", "view", "view", "none", "edit"] },
  { who: { it: "Operatore C", en: "Operator C" }, p: ["none", "none", "none", "none", "view"] },
];

export default function GestionaleSalusDetail() {
  const { locale, tr } = useT();
  const it = locale === "it";

  return (
    <DevDetailShell slug="gestionale-salus" badge="07" title={<>Gestionale<br />interno Salus</>}>
      {/* NUMERI */}
      <section className="border-t border-line px-5 py-12 md:px-10 md:py-16">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3 xl:grid-cols-6">
          {gestNumbers.map((n, i) => (
            <motion.div
              key={n.label.it}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="bg-bg p-5 md:p-6"
            >
              <div className="font-display text-4xl leading-none md:text-5xl" style={{ color }}>
                {n.value}
              </div>
              <div className="mt-2 font-sans text-xs leading-snug text-muted">{tr(n.label)}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ARCHITETTURA */}
      <DevSection
        id="architettura"
        n="01"
        color={color}
        label={{ it: "L'architettura", en: "The architecture" }}
        title={{ it: "Dashboard e API separate", en: "Dashboard and API, kept apart" }}
        intro={{
          it: "La dashboard non parla mai con il database. Ogni richiesta dell'utente passa da un controllo dei permessi sul suo server, e solo dopo arriva all'API con il token di servizio.",
          en: "The dashboard never talks to the database. Every user request goes through a permission check on its server, and only then reaches the API with the service token.",
        }}
      >
        <FlowRow nodes={gestArch} color={color} />
        <ul className="mt-8 grid gap-3 md:grid-cols-3">
          {securityNotes.map((n, i) => (
            <li
              key={i}
              className="flex items-start gap-3 rounded-2xl border border-line bg-bg-soft p-5 font-sans text-sm text-fg/85"
            >
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45" style={{ background: color }} />
              {tr(n)}
            </li>
          ))}
        </ul>
      </DevSection>

      {/* MODULI */}
      <DevSection
        id="moduli"
        n="02"
        color={color}
        soft
        label={{ it: "I moduli", en: "The modules" }}
        title={{ it: "Otto aree di lavoro", en: "Eight work areas" }}
      >
        <CardGrid items={gestModules} color={color} />
      </DevSection>

      {/* PREVENTIVI */}
      <DevSection
        id="preventivi"
        n="03"
        color={color}
        label={{ it: "I preventivi", en: "The quotes" }}
        title={{ it: "Versioni e un flusso di stato", en: "Versions and a status flow" }}
        intro={{
          it: "Un preventivo cambia durante la trattativa. Ogni modifica è una nuova versione con le sue righe, e il preventivo avanza lungo un flusso che registra le date che contano.",
          en: "A quote changes during a negotiation. Each change is a new version with its own lines, and the quote moves along a flow that records the dates that matter.",
        }}
      >
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-4">
          {quoteFlow.map((q, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-bg p-6"
            >
              <span className="font-display text-4xl leading-none" style={{ color }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="mt-3 font-display text-2xl uppercase leading-none tracking-tight">{tr(q.label)}</div>
              <p className="mt-2 font-sans text-sm text-muted">{tr(q.note)}</p>
            </motion.div>
          ))}
        </div>
        <p className="mt-4 font-sans text-sm text-muted">
          {it
            ? "Si può anche chiudere come rifiutato o scaduto. I totali di testata seguono sempre la versione attiva."
            : "A quote can also close as rejected or expired. The header totals always follow the active version."}
        </p>
      </DevSection>

      {/* DOCUMENTI */}
      <DevSection
        id="documenti"
        n="04"
        color={color}
        soft
        label={{ it: "I documenti", en: "The documents" }}
        title={{ it: "Dal preventivo al contratto", en: "From quote to contract" }}
        intro={{
          it: "Il documento economico ha dodici fasi, ognuna con le sue sotto-attività, le figure coinvolte e l'unità di misura (giorni, ore, mesi). Da lì si genera il contratto in DOCX, che raggruppa le dodici fasi in quattro.",
          en: "The economic document has twelve phases, each with its sub-activities, the people involved and the unit of measure (days, hours, months). From it the DOCX contract is generated, which groups the twelve phases into four.",
        }}
      >
        <ol className="grid gap-3 md:grid-cols-4">
          {macroFasi.map((m, i) => (
            <li key={i} className="flex flex-col gap-3 rounded-2xl border border-line bg-bg p-6">
              <span className="font-mono text-xs uppercase tracking-[0.14em]" style={{ color }}>
                {it ? "Fasi" : "Phases"} {m.fasi}
              </span>
              <span className="font-display text-xl uppercase leading-tight tracking-tight">{it ? m.it : m.en}</span>
            </li>
          ))}
        </ol>
        <p className="mt-4 font-sans text-sm text-muted">
          {it
            ? "Esporta in Excel, PDF e Word. I costi pass-through si quotano a parte, con testo libero al posto dell'importo."
            : "Exports to Excel, PDF and Word. Pass-through costs are quoted separately, with free text in place of the amount."}
        </p>
      </DevSection>

      {/* PERMESSI */}
      <DevSection
        id="permessi"
        n="05"
        color={color}
        label={{ it: "I permessi", en: "The permissions" }}
        title={{ it: "Lettura o modifica, per modulo", en: "Read or edit, per module" }}
        intro={{
          it: "L'amministratore crea gli operatori e assegna a ciascuno, modulo per modulo, la sola lettura o la modifica. Qui sotto la matrice, con valori d'esempio.",
          en: "The administrator creates operators and grants each one, module by module, read-only or edit access. The matrix below uses example values.",
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[420px] border-collapse text-left">
            <thead>
              <tr className="border-b border-line font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
                <th className="py-3 pr-4 font-medium">{it ? "Operatore" : "Operator"}</th>
                {permModules.map((m) => (
                  <th key={m.it} className="px-2 py-3 text-center font-medium">
                    {it ? m.it : m.en}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="font-sans text-sm">
              {sampleMatrix.map((r) => (
                <tr key={r.who.it} className="border-b border-line/60">
                  <td className="py-3 pr-4 text-fg/90">{tr(r.who)}</td>
                  {r.p.map((v, i) => (
                    <td key={i} className="px-2 py-3 text-center">
                      <span
                        className="inline-block min-w-14 rounded-full border px-2.5 py-1 font-mono text-[0.6rem] uppercase tracking-[0.1em]"
                        style={
                          v === "edit"
                            ? { background: color, borderColor: color, color: "#0b0b10" }
                            : v === "view"
                              ? { borderColor: color, color }
                              : { borderColor: "var(--line)", color: "var(--muted)" }
                        }
                      >
                        {v === "edit" ? (it ? "modifica" : "edit") : v === "view" ? (it ? "lettura" : "view") : "—"}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </DevSection>
    </DevDetailShell>
  );
}
