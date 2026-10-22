"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { accentHex } from "@/lib/content";
import { useT } from "../salus/ui";
import { DevSection, FlowRow } from "../dev/ui";
import { BlockTitle, CodeBlock } from "../ailab/ui";
import { beforeAfter, carousels, growthNumbers, landingBlocks, notDone, research, stillOpen, trackingFlow, trackingSnippet, trackingSteps, type LStr } from "./data";
import { flowCompare, flows, flowVideos, formatInfo, type AdFormat, type Flow, type FlowId } from "./flows";

const color = accentHex.magenta;

/** Una scheda di testo con numero, per i passaggi e i principi. */
function Card({ n, title, body, kicker }: { n: number; title: LStr; body: LStr; kicker?: LStr }) {
  const { tr } = useT();
  return (
    <>
      <div className="flex items-baseline justify-between gap-3">
        <span className="font-mono text-xs" style={{ color }}>
          {String(n).padStart(2, "0")}
        </span>
        {kicker && <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted">{tr(kicker)}</span>}
      </div>
      <h3 className="mt-3 font-display text-2xl uppercase leading-[0.95] tracking-tight">{tr(title)}</h3>
      <p className="mt-3 font-sans text-sm leading-relaxed text-muted">{tr(body)}</p>
    </>
  );
}

/** Sul telefono un elenco in verticale, compatto; da md in su una griglia di schede. */
function ListOrGrid({
  items,
  cols = "md:grid-cols-2 xl:grid-cols-3",
}: {
  items: { title: LStr; body: LStr; kicker?: LStr }[];
  cols?: string;
}) {
  const { tr } = useT();
  return (
    <>
      <ol className="flex flex-col md:hidden">
        {items.map((c, i) => (
          <li key={i} className="flex gap-4 border-t border-line py-4 first:border-t-0 first:pt-0">
            <span className="w-6 shrink-0 pt-0.5 font-mono text-xs" style={{ color }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              {c.kicker && (
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted">{tr(c.kicker)}</span>
              )}
              <h3 className="font-display text-xl uppercase leading-[0.95] tracking-tight">{tr(c.title)}</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-muted">{tr(c.body)}</p>
            </div>
          </li>
        ))}
      </ol>
      <div className={`hidden gap-3 md:grid ${cols}`}>
        {items.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -6% 0px" }}
            transition={{ delay: (i % 3) * 0.06, duration: 0.5 }}
            className="rounded-2xl border border-line bg-bg p-6"
          >
            <Card n={i + 1} {...c} />
          </motion.div>
        ))}
      </div>
    </>
  );
}

/**
 * Selettore: pulsanti veri, con bordo pieno, indicatore di scelta e una riga che dice cosa si può cambiare.
 * Il pulsante scelto è pieno e ha la spunta; gli altri sono vuoti e si sollevano al passaggio.
 */
function Chips<T extends string | number>({
  items,
  value,
  onChange,
  label,
  accent,
  compact,
}: {
  items: { id: T; label: string; color?: string }[];
  value: T;
  onChange: (v: T) => void;
  label?: LStr;
  accent?: string;
  /** pulsanti più bassi: servono quando i selettori stanno attaccati a un'immagine */
  compact?: boolean;
}) {
  const { tr, locale } = useT();
  const hint = label ? tr(label) : locale === "it" ? "Tocca per cambiare" : "Tap to change";
  return (
    <div>
      <p className={`flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted ${compact ? "mb-2" : "mb-2.5"}`}>
        <span aria-hidden className="text-sm leading-none" style={{ color }}>
          ↓
        </span>
        {hint}
      </p>
      <div className={`flex flex-wrap ${compact ? "gap-2" : "gap-2.5"}`} role="tablist">
        {items.map((it) => {
          const on = it.id === value;
          const c = it.color ?? accent ?? color;
          return (
            <button
              key={String(it.id)}
              type="button"
              role="tab"
              aria-selected={on}
              data-cursor
              onClick={() => onChange(it.id)}
              className={`inline-flex items-center rounded-xl border-2 font-mono uppercase tracking-[0.08em] transition-all ${compact ? "min-h-10 gap-2 px-3 py-1.5 text-[0.68rem]" : "min-h-11 gap-2.5 px-4 py-2 text-xs"} duration-200 active:scale-[0.97] ${
                on ? "font-bold" : "bg-bg text-fg hover:-translate-y-0.5 hover:border-fg"
              }`}
              style={on ? { background: c, borderColor: c, color: "#0b0b10" } : { borderColor: "color-mix(in srgb, var(--fg) 35%, transparent)" }}
            >
              <span
                aria-hidden
                className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 text-[0.6rem] leading-none"
                style={on ? { borderColor: "#0b0b10", background: "#0b0b10", color: c } : { borderColor: "color-mix(in srgb, var(--fg) 45%, transparent)" }}
              >
                {on ? "✓" : ""}
              </span>
              {it.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------------------------- hero ---------------------------------- */

export function HeroVisual() {
  const imgs = [
    { src: "/growth/ads/a1-feed.webp", w: 1080, h: 1350, cls: "left-0 top-[10%] w-[34%]" },
    { src: "/growth/ads/crio.webp", w: 1080, h: 1080, cls: "left-[33%] top-0 z-10 w-[34%]" },
    { src: "/growth/ads/nightlase.webp", w: 1080, h: 1080, cls: "left-[66%] top-[10%] w-[34%]" },
  ];
  return (
    <div className="relative mx-auto h-[250px] w-full max-w-[520px] sm:h-[340px] lg:h-[400px]" aria-hidden>
      {imgs.map((im) => (
        <Image
          key={im.src}
          src={im.src}
          alt=""
          width={im.w}
          height={im.h}
          sizes="(min-width: 640px) 180px, 120px"
          quality={85}
          priority
          className={`absolute h-auto rounded-xl border border-line ${im.cls}`}
        />
      ))}
    </div>
  );
}

export function NumbersRow() {
  const { tr } = useT();
  return (
    <section className="border-t border-line px-5 py-8 md:px-10 md:py-14">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
        {growthNumbers.map((n) => (
          <div key={n.label.it} className="bg-bg p-5 md:p-6">
            <div className="font-display text-4xl leading-none md:text-5xl" style={{ color }}>
              {n.value}
            </div>
            <p className="mt-2 font-sans text-xs leading-snug text-muted">{tr(n.label)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------------- flussi ---------------------------------- */

/** Titolo di un blocco dentro il flusso scelto. */
function SubHead({ n, title, accent }: { n: string; title: LStr; accent: string }) {
  const { tr } = useT();
  return (
    <h3 className="flex items-baseline gap-3 border-b border-line pb-3">
      <span className="font-mono text-xs" style={{ color: accent }}>
        {n}
      </span>
      <span className="font-display text-2xl uppercase leading-none tracking-tight md:text-3xl">{tr(title)}</span>
    </h3>
  );
}

function StrategyBlock({ f, letter }: { f: Flow; letter: string }) {
  const { tr } = useT();
  return (
    <div>
      <SubHead n={letter} accent={f.color} title={{ it: "La strategia", en: "The strategy" }} />
      <dl className="mt-5 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2">
        {f.strategy.map((r) => (
          <div key={r.label.it} className="bg-bg p-4 md:p-6">
            <dt className="font-mono text-[0.62rem] uppercase tracking-[0.14em] md:text-[0.65rem]" style={{ color: f.color }}>
              {tr(r.label)}
            </dt>
            <dd className="mt-1.5 font-sans text-sm leading-relaxed text-fg/90 md:mt-2 md:text-base">{tr(r.text)}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function AdsBlock({ f, letter }: { f: Flow; letter: string }) {
  const { tr, locale } = useT();
  const it = locale === "it";
  const [v, setV] = useState(0);
  const [fm, setFm] = useState<AdFormat>(Object.keys(f.ads[0].images)[0] as AdFormat);
  const ad = f.ads[v];
  const avail = Object.keys(ad.images) as AdFormat[];
  const cur = avail.includes(fm) ? fm : avail[0];
  const info = formatInfo[cur];

  return (
    <div>
      <SubHead n={letter} accent={f.color} title={{ it: "Gli annunci", en: "The ads" }} />
      <div className="mt-5 grid gap-6 lg:grid-cols-2 lg:items-start lg:gap-14">
        {/* i selettori stanno dentro lo stesso riquadro dell'immagine: si vede cosa cambiano */}
        <div className="flex flex-col gap-4 rounded-2xl border border-line bg-bg-soft p-4 md:p-6">
          {f.ads.length > 1 && (
            <Chips
              accent={f.color}
              compact
              items={f.ads.map((a, i) => ({ id: i, label: tr(a.name).replace(/^(Variante|Variant) /, "").replace(/^(Creatività|Creative) /, "") }))}
              value={v}
              onChange={setV}
              label={{ it: "Scegli la variante dell'annuncio", en: "Choose the ad variant" }}
            />
          )}
          {avail.length > 1 && (
            <Chips
              accent={f.color}
              compact
              items={avail.map((x) => ({ id: x, label: `${tr(formatInfo[x].label)} ${formatInfo[x].ratio}` }))}
              value={cur}
              onChange={setFm}
              label={{ it: "Scegli il formato", en: "Choose the format" }}
            />
          )}
          <div className="flex min-h-[260px] items-center justify-center rounded-xl bg-bg/60 p-3 md:p-5">
            <div
              className="relative overflow-hidden rounded-xl border border-line bg-bg"
              style={{ aspectRatio: String(info.r), width: `min(100%, calc(min(66svh, 560px) * ${info.r}))` }}
            >
              <Image
                key={`${ad.id}-${cur}`}
                src={ad.images[cur]!}
                alt={tr(ad.headline)}
                fill
                sizes="(min-width: 1024px) 480px, 90vw"
                quality={85}
                className="object-cover"
              />
            </div>
          </div>
          <p className="font-sans text-sm leading-relaxed text-muted">{tr(info.note)}</p>
        </div>

        <div className="min-w-0">
          <h4 className="font-display text-3xl uppercase leading-[0.95] tracking-tight md:text-4xl">{tr(ad.headline)}</h4>
          <p className="mt-3 font-sans text-base leading-relaxed text-fg/85">{tr(ad.note)}</p>
          {f.id === "fotona" && ad.id !== "nuovo" && (
            <p className="mt-4 font-sans text-xs text-muted">
              {it
                ? "Il testo sull'immagine è quello dei file originali, refusi compresi."
                : "The text on the image is that of the original files, typos included."}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function VideosBlock({ f, letter }: { f: Flow; letter: string }) {
  const { tr, locale } = useT();
  const it = locale === "it";
  return (
    <div>
      <SubHead n={letter} accent={f.color} title={{ it: "I video con la specialista", en: "The videos with the specialist" }} />
      <p className="mt-5 max-w-3xl font-sans text-sm leading-relaxed text-muted md:text-base">
        {it
          ? "Un video per ogni sintomo, sempre in verticale e con i sottotitoli scritti sull'immagine, perché sui social si guarda senza audio. Qui sono i primi 24 secondi."
          : "One video per symptom, always vertical and with captions written on the image, because on social you watch without sound. Here are the first 24 seconds."}
      </p>
      <div className="mt-6 grid gap-7 sm:grid-cols-2 lg:max-w-3xl">
        {flowVideos.map((v) => (
          <figure key={v.id} className="min-w-0">
            <video
              controls
              playsInline
              preload="none"
              poster={v.poster}
              className="block aspect-[9/16] w-full max-w-[240px] rounded-2xl md:max-w-[280px] border border-line bg-bg-soft object-cover"
            >
              <source src={v.src} type="video/mp4" />
            </video>
            <figcaption className="mt-3 max-w-[240px] md:max-w-[280px]">
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.12em]" style={{ color: f.color }}>
                {tr(v.title)}
              </span>
              <p className="mt-1 font-sans text-sm leading-relaxed text-muted">{tr(v.note)}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

/** Un percorso a passi: elenco compatto su mobile, schede con frecce da md in su. */
function PathList({ nodes, color: accent }: { nodes: { title: string; sub: LStr }[]; color: string }) {
  const { tr } = useT();
  return (
    <>
      <ol className="flex flex-col md:hidden">
        {nodes.map((n, i) => (
          <li key={n.title} className="flex gap-4 border-t border-line py-3 first:border-t-0 first:pt-0">
            <span className="w-6 shrink-0 pt-1 font-mono text-xs" style={{ color: accent }}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <span className="font-display text-xl uppercase leading-none tracking-tight">{n.title}</span>
              <span className="mt-1 block font-sans text-sm text-muted">{tr(n.sub)}</span>
            </div>
          </li>
        ))}
      </ol>
      <div className="hidden md:block">
        <FlowRow nodes={nodes} color={accent} />
      </div>
    </>
  );
}

function PathBlock({ f, letter }: { f: Flow; letter: string }) {
  const { tr } = useT();
  return (
    <div>
      <SubHead n={letter} accent={f.color} title={{ it: "Il percorso del contatto", en: "The lead's path" }} />
      <div className="mt-5">
        <PathList nodes={f.path} color={f.color} />
      </div>
      <ul className="mt-5 flex flex-col gap-3">
        {f.pathNotes.map((n) => (
          <li key={n.it} className="flex items-start gap-3 font-sans text-sm leading-relaxed text-fg/85">
            <span className="mt-0.5 font-mono text-sm" style={{ color: f.color }}>
              →
            </span>
            {tr(n)}
          </li>
        ))}
      </ul>
    </div>
  );
}

function LandingBlock({ f, letter }: { f: Flow; letter: string }) {
  const { tr, locale } = useT();
  const it = locale === "it";
  return (
    <div>
      <SubHead n={letter} accent={f.color} title={{ it: "La landing", en: "The landing page" }} />
      {f.landing ? (
        <div className="mt-5 grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:gap-10">
          <figure className="min-w-0 self-start overflow-hidden rounded-2xl border border-line bg-bg">
            <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
              <span className="h-2.5 w-2.5 rounded-full bg-fg/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-fg/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-fg/20" />
              <span className="ml-3 min-w-0 truncate rounded-full border border-line px-3 py-0.5 font-mono text-[0.65rem] text-muted">
                {tr(f.landing.caption)}
              </span>
              <span className="ml-auto hidden font-mono text-[0.6rem] uppercase tracking-[0.12em] text-muted sm:block">
                {it ? "scorri la pagina ↓" : "scroll the page ↓"}
              </span>
            </div>
            <div data-lenis-prevent className="h-[440px] overflow-y-auto overscroll-contain md:h-[600px]">
              <Image
                src={f.landing.image}
                alt={tr(f.landing.caption)}
                width={f.landing.size[0]}
                height={f.landing.size[1]}
                sizes="(min-width: 1024px) 780px, 100vw"
                quality={85}
                className="block h-auto w-full"
              />
            </div>
          </figure>
          <dl className="flex min-w-0 flex-col gap-5">
            {f.landing.chosen.map((r) => (
              <div key={r.label.it}>
                <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em]" style={{ color: f.color }}>
                  {tr(r.label)}
                </dt>
                <dd className="mt-1.5 font-sans text-sm leading-relaxed text-fg/90">{tr(r.text)}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : (
        <p className="mt-5 rounded-2xl border border-dashed border-fg/25 p-5 font-sans text-sm leading-relaxed text-muted md:p-7">
          {f.noLanding && tr(f.noLanding)}
        </p>
      )}
    </div>
  );
}

/** Solo Fotona: la ricerca fatta prima di scrivere la pagina. */
function ResearchBlock({ f, letter }: { f: Flow; letter: string }) {
  const { tr, locale } = useT();
  const it = locale === "it";
  return (
    <div>
      <SubHead n={letter} accent={f.color} title={{ it: "La ricerca dietro la pagina", en: "The research behind the page" }} />
      <p className="mt-5 max-w-3xl font-sans text-sm leading-relaxed text-muted md:text-base">
        {it
          ? "Prima di scrivere una riga ho fatto un brief di strategia: cosa prova chi cerca questo trattamento, di cosa ha paura e dove i concorrenti lasciano spazio. La pagina segue da lì, in sei blocchi."
          : "Before writing a line I wrote a strategy brief: what people looking for this treatment feel, what they fear and where competitors leave room. The page follows from it, in six blocks."}
      </p>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {research.map((r) => (
          <div key={r.title.it} className="rounded-2xl border border-line bg-bg-soft p-5 md:p-6">
            <BlockTitle color={f.color}>{tr(r.title)}</BlockTitle>
            <ul className="mt-4 flex flex-col gap-3">
              {r.items.map((x) => (
                <li key={x.it} className="flex items-start gap-3 font-sans text-sm leading-relaxed text-fg/85">
                  <span className="mt-0.5 font-mono text-sm" style={{ color: f.color }}>
                    ○
                  </span>
                  {tr(x)}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-10 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">{it ? "I sei blocchi della pagina" : "The six blocks of the page"}</p>
      <div className="mt-4">
        <ListOrGrid items={landingBlocks} />
      </div>
    </div>
  );
}

export function FlowsSection() {
  const { tr, locale } = useT();
  const it = locale === "it";
  const [id, setId] = useState<FlowId>("fotona");
  const f = flows.find((x) => x.id === id)!;
  const hasVideos = f.id === "fotona";
  const hasResearch = f.id === "fotona";
  // le lettere dei blocchi seguono quelli presenti
  let k = 0;
  const next = () => "ABCDEF"[k++];
  return (
    <DevSection
      id="campagne"
      n="01"
      color={color}
      label={{ it: "Le campagne", en: "The campaigns" }}
      title={{ it: "Tre campagne, tre strategie", en: "Three campaigns, three strategies" }}
      intro={{
        it: "Lo stesso centro e lo stesso strumento, ma tre persone diverse da convincere. Ognuna ha il suo angolo, il suo tono e il suo percorso: nessuna è la copia dell'altra. Scegli quale flusso guardare.",
        en: "The same centre and the same tool, but three different people to convince. Each has its own angle, tone and path: none is a copy of another. Choose which flow to look at.",
      }}
    >
      <p className="mb-3 flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
        <span aria-hidden className="text-sm leading-none" style={{ color }}>
          ↓
        </span>
        {it ? "Scegli il flusso da vedere" : "Choose the flow to view"}
      </p>
      <div className="grid gap-3 md:grid-cols-3" role="tablist">
        {flows.map((x) => {
          const on = x.id === id;
          return (
            <button
              key={x.id}
              type="button"
              role="tab"
              aria-selected={on}
              data-cursor
              onClick={() => {
                setId(x.id);
                // su mobile le schede stanno sopra il flusso: si porta in vista il flusso scelto
                if (window.matchMedia("(max-width: 767px)").matches) {
                  window.setTimeout(() => {
                    const el = document.getElementById("flusso");
                    if (!el) return;
                    const lenis = (window as unknown as { __lenis?: { scrollTo: (t: HTMLElement, o: object) => void } }).__lenis;
                    if (lenis) lenis.scrollTo(el, { offset: -80, duration: 1 });
                    else el.scrollIntoView({ behavior: "smooth" });
                  }, 60);
                }
              }}
              className={`flex flex-col gap-3 rounded-2xl border-2 p-5 text-left transition-all duration-200 active:scale-[0.99] ${on ? "" : "bg-bg hover:-translate-y-0.5 hover:border-fg"}`}
              style={on ? { borderColor: x.color, background: `${x.color}1a` } : { borderColor: "color-mix(in srgb, var(--fg) 30%, transparent)" }}
            >
              <span className="flex items-center justify-between gap-3">
                <span className="font-mono text-xs" style={{ color: x.color }}>
                  {x.n} · {tr(x.when)}
                </span>
                <span
                  aria-hidden
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 text-[0.65rem] leading-none"
                  style={on ? { borderColor: x.color, background: x.color, color: "#0b0b10" } : { borderColor: "color-mix(in srgb, var(--fg) 45%, transparent)" }}
                >
                  {on ? "✓" : ""}
                </span>
              </span>
              <span className="font-display text-3xl uppercase leading-[0.95] tracking-tight">{tr(x.name)}</span>
              <span className="font-sans text-sm leading-relaxed text-fg/85">{tr(x.angle)}</span>
              <span className="mt-auto flex flex-col gap-1.5 border-t border-line pt-3">
                {flowCompare.map((c) => (
                  <span key={c.label.it} className="flex items-baseline gap-2 font-sans text-xs leading-snug">
                    <span className="w-[5.5rem] shrink-0 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-muted">{tr(c.label)}</span>
                    <span className="text-fg/85">{tr(c.values[x.id])}</span>
                  </span>
                ))}
              </span>
            </button>
          );
        })}
      </div>

      <div
        key={f.id}
        id="flusso"
        className="mt-8 rounded-3xl border-2 p-4 md:p-10"
        style={{ borderColor: `${f.color}66`, background: `linear-gradient(180deg, ${f.color}12, transparent 22%)` }}
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.15em] text-black" style={{ background: f.color }}>
            {f.n}
          </span>
          <span className="section-label">{tr(f.treatment)}</span>
          <span className="section-label">· {tr(f.when)}</span>
        </div>
        <h3 className="mt-4 font-display text-5xl uppercase leading-[0.9] tracking-tight md:text-7xl">{tr(f.name)}</h3>
        <p className="mt-4 max-w-3xl font-display text-xl uppercase leading-tight tracking-tight md:text-2xl" style={{ color: f.color }}>
          {tr(f.angle)}
        </p>
        <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-sans text-sm text-muted">
          <span>
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em]" style={{ color: f.color }}>
              {it ? "Tono" : "Tone"}
            </span>{" "}
            {tr(f.tone)}
          </span>
          <span>
            <span className="font-mono text-[0.62rem] uppercase tracking-[0.12em]" style={{ color: f.color }}>
              {it ? "Stato" : "Status"}
            </span>{" "}
            {tr(f.status)}
          </span>
        </p>

        <div className="mt-8 flex flex-col gap-10 md:mt-10 md:gap-16">
          <div>
            <StrategyBlock f={f} letter={next()} />
          </div>
          <div>
            <AdsBlock f={f} letter={next()} />
          </div>
          {hasVideos && (
            <div>
              <VideosBlock f={f} letter={next()} />
            </div>
          )}
          <div>
            <PathBlock f={f} letter={next()} />
          </div>
          <div>
            <LandingBlock f={f} letter={next()} />
          </div>
          {hasResearch && (
            <div>
              <ResearchBlock f={f} letter={next()} />
            </div>
          )}
        </div>
      </div>
    </DevSection>
  );
}

/* -------------------------------- tracciamento ------------------------------- */

export function TrackingSection() {
  const { tr, locale } = useT();
  const it = locale === "it";
  return (
    <DevSection
      id="tracciamento"
      n="02"
      color={color}
      label={{ it: "Il motore comune", en: "The shared engine" }}
      title={{ it: "Quando Meta non vede i contatti", en: "When Meta can't see the leads" }}
      intro={{
        it: "La strategia è diversa per ogni campagna, il tracciamento no: serve a tutte. È nato sulla campagna Fotona, che spendeva senza ottenere dati per migliorare. Il problema non era nella pagina: era il dominio. Questo è come l'ho trovato e come l'ho aggirato senza aggirare le regole.",
        en: "Strategy differs for every campaign, tracking doesn't: it serves them all. It started on the Fotona campaign, which was spending without getting data to improve on. The problem wasn't the page: it was the domain. This is how I found it and how I worked around it without working around the rules.",
      }}
      soft
    >
      <div className="flex flex-col items-start gap-6 rounded-2xl border border-line bg-bg p-6 md:flex-row md:items-center md:gap-12 md:p-10">
        <div className="flex items-baseline gap-4">
          <span className="font-display text-5xl leading-none md:text-7xl" style={{ color }}>
            33.000
          </span>
          <span className="font-sans text-sm text-muted">{it ? "visite alla pagina" : "page views"}</span>
        </div>
        <span aria-hidden className="font-display text-3xl leading-none text-muted md:text-5xl">
          →
        </span>
        <div className="flex items-baseline gap-4">
          <span className="font-display text-5xl leading-none md:text-7xl" style={{ color }}>
            2
          </span>
          <span className="font-sans text-sm text-muted">{it ? "contatti registrati, in 30 giorni" : "leads recorded, in 30 days"}</span>
        </div>
      </div>

      <div className="mt-10">
        <ListOrGrid
          items={trackingSteps.map((s) => ({ title: s.title, body: s.body, kicker: s.when }))}
          cols="md:grid-cols-2 lg:grid-cols-3"
        />
      </div>

      <div className="mt-14">
        <BlockTitle color={color}>{it ? "Cosa è cambiato" : "What changed"}</BlockTitle>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {([
            { key: "before", title: it ? "Prima" : "Before", items: it ? beforeAfter.before.it : beforeAfter.before.en, mark: "✕", dashed: true },
            { key: "after", title: it ? "Dopo" : "After", items: it ? beforeAfter.after.it : beforeAfter.after.en, mark: "✓", dashed: false },
          ] as const).map((c) => (
            <div
              key={c.key}
              className={`rounded-2xl border p-5 md:p-7 ${c.dashed ? "border-dashed border-fg/25" : "border-line bg-bg"}`}
              style={c.dashed ? undefined : { borderColor: `${color}66` }}
            >
              <p className="font-display text-3xl uppercase leading-none tracking-tight" style={c.dashed ? undefined : { color }}>
                {c.title}
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {c.items.map((x) => (
                  <li key={x} className="flex items-start gap-3 font-sans text-sm leading-relaxed text-fg/85">
                    <span className="mt-0.5 font-mono text-sm" style={{ color }}>
                      {c.mark}
                    </span>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14">
        <BlockTitle color={color}>{it ? "Il percorso, dopo" : "The path, after"}</BlockTitle>
        <div className="mt-5">
          <PathList nodes={trackingFlow} color={color} />
        </div>
      </div>

      <div className="mt-10">
        <CodeBlock s={trackingSnippet} color={color} />
      </div>

      <div className="mt-10 grid gap-3 lg:grid-cols-2">
        <div className={`rounded-2xl border border-line bg-bg p-5 md:p-7 `}>
          <BlockTitle color={color}>{it ? "Cosa ho scelto di non fare" : "What I chose not to do"}</BlockTitle>
          <ul className="mt-4 flex flex-col gap-3">
            {(it ? notDone.it : notDone.en).map((x) => (
              <li key={x} className="flex items-start gap-3 font-sans text-sm leading-relaxed text-fg/85">
                <span className="mt-0.5 font-mono text-sm" style={{ color }}>
                  ✕
                </span>
                {x}
              </li>
            ))}
          </ul>
        </div>
        <div className={`rounded-2xl border border-dashed border-fg/25 p-5 md:p-7 `}>
          <BlockTitle color={color}>{it ? "Cosa è ancora aperto" : "What is still open"}</BlockTitle>
          <ul className="mt-4 flex flex-col gap-3">
            {(it ? stillOpen.it : stillOpen.en).map((x) => (
              <li key={x} className="flex items-start gap-3 font-sans text-sm leading-relaxed text-fg/85">
                <span className="mt-0.5 font-mono text-sm" style={{ color }}>
                  ○
                </span>
                {x}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="mt-6 font-sans text-xs text-muted">
        {it
          ? "Il codice è un estratto del file vero. Token, identificativi degli account e dati dei pazienti non sono pubblicati; i numeri sono quelli del tracciamento e dei contatti ricevuti, senza dati di spesa."
          : "The code is an excerpt of the real file. Tokens, account IDs and patient data aren't published; the figures are tracking figures and leads received, with no spend data."}
      </p>
    </DevSection>
  );
}

/* ----------------------------------- social ---------------------------------- */

export function SocialSection() {
  const { tr, locale } = useT();
  const it = locale === "it";
  const [c, setC] = useState(carousels[0].id);
  const [i, setI] = useState(0);
  const car = carousels.find((x) => x.id === c)!;
  const n = car.slides.length;

  return (
    <DevSection
      id="social"
      n="03"
      color={color}
      label={{ it: "Social", en: "Social" }}
      title={{ it: "Caroselli che spiegano in cinque slide", en: "Carousels that explain in five slides" }}
      intro={{
        it: "Fuori dalle tre campagne, due caroselli per altri servizi del centro: fisioterapia e medicina estetica. Una copertina che ferma lo scroll, cinque slide che spiegano e una chiusura con l'invito a prenotare.",
        en: "Beyond the three campaigns, two carousels for other services at the centre: physiotherapy and aesthetic medicine. A cover that stops the scroll, five slides that explain and a close inviting to book.",
      }}
    >
      <Chips
        items={carousels.map((x) => ({ id: x.id, label: tr(x.name) }))}
        value={c}
        label={{ it: "Scegli il carosello", en: "Choose the carousel" }}
        onChange={(v) => {
          setC(v);
          setI(0);
        }}
      />

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,380px)_minmax(0,1fr)] lg:gap-14">
        <div className="min-w-0">
          <div className="relative overflow-hidden rounded-2xl border border-line bg-bg">
            <Image
              key={`${c}-${i}`}
              src={`${car.prefix}${i + 1}.webp`}
              alt={tr(car.slides[i])}
              width={1122}
              height={1402}
              sizes="(min-width: 1024px) 380px, 90vw"
              quality={85}
              className="block h-auto w-full"
            />
          </div>
          <div className="mt-3 flex items-center justify-between gap-3">
            <button
              type="button"
              data-cursor
              aria-label={it ? "Slide precedente" : "Previous slide"}
              onClick={() => setI((x) => (x - 1 + n) % n)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line font-mono text-sm transition-colors hover:border-fg/40"
            >
              ←
            </button>
            <span className="font-mono text-xs text-muted">
              {i + 1} / {n}
            </span>
            <button
              type="button"
              data-cursor
              aria-label={it ? "Slide successiva" : "Next slide"}
              onClick={() => setI((x) => (x + 1) % n)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line font-mono text-sm transition-colors hover:border-fg/40"
            >
              →
            </button>
          </div>
        </div>

        <div className="min-w-0">
        <p className="mb-2.5 flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-muted">
          <span aria-hidden className="text-sm leading-none" style={{ color }}>
            ↓
          </span>
          {it ? "Tocca una slide per vederla" : "Tap a slide to view it"}
        </p>
        <ol className="flex min-w-0 flex-col gap-2">
          {car.slides.map((s, k) => (
            <li key={k}>
              <button
                type="button"
                data-cursor
                onClick={() => setI(k)}
                aria-current={k === i}
                className={`flex w-full items-start gap-4 rounded-xl border-2 px-4 py-3 text-left transition-all duration-200 ${
                  k === i ? "" : "hover:-translate-y-0.5 hover:border-fg"
                }`}
                style={k === i ? { borderColor: color, background: `${color}1f` } : { borderColor: "color-mix(in srgb, var(--fg) 25%, transparent)" }}
              >
                <span className="w-6 shrink-0 font-mono text-xs" style={{ color }}>
                  {String(k + 1).padStart(2, "0")}
                </span>
                <span className={`font-sans text-sm leading-relaxed ${k === i ? "text-fg" : "text-fg/80"}`}>{tr(s)}</span>
              </button>
            </li>
          ))}
        </ol>
        </div>
      </div>
    </DevSection>
  );
}
