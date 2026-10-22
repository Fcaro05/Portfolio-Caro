"use client";

import { motion } from "framer-motion";
import { accentHex } from "@/lib/content";
import DevDetailShell from "./dev/DevDetailShell";
import { BrowserFrame, CardGrid, DevSection, PhoneFrame } from "./dev/ui";
import { sitoBuild, sitoLog, sitoPages } from "./dev/data";
import { useT } from "./salus/ui";

const color = accentHex.cyan;

export default function SitoSalusDetail() {
  const { locale, tr } = useT();
  const it = locale === "it";

  return (
    <DevDetailShell slug="sito-salus" badge="04" title={<>Sito web<br />Salus</>}>
      {/* SCHERMATE */}
      <DevSection
        id="schermate"
        n="01"
        color={color}
        label={{ it: "Il sito", en: "The site" }}
        title={{ it: "Com'è fatto, visto da fuori", en: "What it looks like" }}
        intro={{
          it: "Le schermate vengono da salus-ai.com, il sito pubblicato.",
          en: "The screens come from salus-ai.com, the published site.",
        }}
      >
        <div className="grid gap-4 md:grid-cols-12 md:items-start">
          <BrowserFrame
            className="md:col-span-7"
            src="/dev/sito-salus/home-desktop.webp"
            alt={it ? "Home di salus-ai.com su desktop" : "salus-ai.com home on desktop"}
            url="salus-ai.com"
          />
          <div className="flex flex-col gap-4 md:col-span-5">
            <BrowserFrame
              src="/dev/sito-salus/servizi-desktop.webp"
              alt={it ? "Sezione servizi di salus-ai.com" : "salus-ai.com services section"}
              url="salus-ai.com/#servizi"
            />
            <div className="flex items-center gap-5">
              <PhoneFrame
                className="w-24 shrink-0 md:w-28"
                src="/dev/sito-salus/home-mobile.webp"
                alt={it ? "Home di salus-ai.com su telefono" : "salus-ai.com home on a phone"}
              />
              <p className="font-sans text-sm leading-relaxed text-muted">
                {it
                  ? "Le stesse sezioni passano su una colonna sul telefono, con il pulsante «Parliamo del progetto» sempre in vista."
                  : "The same sections drop to a single column on a phone, with the “Parliamo del progetto” button always in view."}
              </p>
            </div>
          </div>
        </div>
      </DevSection>

      {/* COME È FATTO */}
      <DevSection
        id="costruzione"
        n="02"
        color={color}
        soft
        label={{ it: "La costruzione", en: "The build" }}
        title={{ it: "Quattro scelte", en: "Four choices" }}
      >
        <CardGrid
          color={color}
          items={sitoBuild.map((b) => ({ title: b.title, body: b.body }))}
        />
      </DevSection>

      {/* STRUTTURA */}
      <DevSection
        id="struttura"
        n="03"
        color={color}
        label={{ it: "La struttura", en: "The structure" }}
        title={{ it: "Cosa c'è dentro", en: "What's inside" }}
        intro={{
          it: "Diciassette URL in sitemap, divisi tra servizi, prodotto e news.",
          en: "Seventeen URLs in the sitemap, split across services, product and news.",
        }}
      >
        <div className="grid gap-4 md:grid-cols-3">
          {sitoPages.map((g, i) => (
            <motion.div
              key={g.group.it}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="rounded-2xl border border-line bg-bg-soft p-6"
            >
              <div className="font-display text-2xl uppercase tracking-tight" style={{ color }}>
                {tr(g.group)}
              </div>
              <ul className="mt-4 flex flex-col gap-2.5">
                {g.items.map((p) => (
                  <li key={p.it} className="flex items-start gap-3 font-sans text-sm text-fg/85">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45" style={{ background: color }} />
                    {tr(p)}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </DevSection>

      {/* DEVLOG */}
      <DevSection
        id="storia"
        n="04"
        color={color}
        soft
        label={{ it: "Il percorso", en: "The path" }}
        title={{ it: "Undici settimane, 17 commit", en: "Eleven weeks, 17 commits" }}
      >
        <ol className="relative ml-2 flex flex-col gap-6 border-l border-line pl-6 md:ml-0 md:pl-10">
          {sitoLog.map((l, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <span
                aria-hidden
                className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full md:-left-[47px]"
                style={{ background: color }}
              />
              <div className="font-mono text-xs uppercase tracking-[0.16em]" style={{ color }}>
                {tr(l.when)}
              </div>
              <p className="mt-1 max-w-2xl font-sans text-base leading-relaxed text-fg/85">{tr(l.text)}</p>
            </motion.li>
          ))}
        </ol>
      </DevSection>
    </DevDetailShell>
  );
}
