"use client";

import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { getProject, accentHex, L } from "@/lib/content";
import {
  BackLink,
  Kicker,
  HeaderMeta,
  Prose,
  Contributions,
  Results,
  StackList,
  VisitCard,
  NextProject,
} from "./parts";
import Marquee from "@/components/ui/Marquee";
import Reveal from "@/components/ui/Reveal";

const color = accentHex.acid;

const chapters = [
  {
    number: "00",
    name: { it: "Scavo", en: "Excavation" },
    title: { it: "Ambizione allo stato grezzo", en: "Raw ambition" },
    text: {
      it: "La partenza: moltissima energia, tante idee e ancora nessun metodo. Il terreno da cui iniziare a costruire.",
      en: "The starting point: enormous energy, many ideas and no method yet. The ground from which to begin building.",
    },
  },
  {
    number: "01",
    name: { it: "Fondamenta", en: "Foundations" },
    title: { it: "Le prime competenze", en: "The first skills" },
    text: {
      it: "All'ITS l'energia prende forma attraverso marketing, UX/UI, design, advertising, web, copywriting e strategia.",
      en: "At ITS, that energy takes shape through marketing, UX/UI, design, advertising, web, copywriting and strategy.",
    },
  },
  {
    number: "02",
    name: { it: "Strutture", en: "Structures" },
    title: { it: "Dalla teoria al campo", en: "From theory to the field" },
    text: {
      it: "I primi clienti reali: il lancio di una palestra in pre-opening e la presenza digitale di un pronto intervento idraulico.",
      en: "The first real clients: launching a pre-opening gym and building the digital presence of an emergency plumbing service.",
    },
  },
  {
    number: "03",
    name: { it: "Elevazione", en: "Elevation" },
    title: { it: "Il salto di livello", en: "Moving up a level" },
    text: {
      it: "Il passaggio da esecutore a fondatore: con un socio, un'idea diventa società e cambia la scala dell'ambizione.",
      en: "The shift from maker to founder: with a business partner, an idea becomes a company and ambition changes scale.",
    },
  },
  {
    number: "04",
    name: { it: "Collaudo", en: "Testing" },
    title: { it: "La prova sul campo", en: "The field test" },
    text: {
      it: "Il progetto per il Centro Medico Ambrosiano: strategia, funnel e creatività in un settore dove fiducia e responsabilità vengono prima della performance.",
      en: "The Centro Medico Ambrosiano project: strategy, funnels and creative work in a field where trust and responsibility come before performance.",
    },
  },
  {
    number: "05",
    name: { it: "Visione", en: "Vision" },
    title: { it: "Salus AI", en: "Salus AI" },
    text: {
      it: "La sintesi del percorso: app, Smart Med Box, sensori IoT e AI in un ecosistema per la gestione intelligente delle terapie.",
      en: "The journey's synthesis: app, Smart Med Box, IoT sensors and AI in an ecosystem for intelligent therapy management.",
    },
  },
];

const facts = [
  { value: "06", it: "livelli narrativi", en: "narrative levels" },
  { value: "07", it: "discipline di base", en: "core disciplines" },
  { value: "01", it: "identità in costruzione", en: "identity under construction" },
];

export default function TesiCreativaDetail() {
  const { t, locale } = useI18n();
  const project = getProject("tesi-creativa");
  if (!project) return null;

  return (
    <article className="relative">
      {/* HERO — experimental, centered editorial */}
      <header className="relative overflow-hidden border-b border-line px-5 pb-12 pt-28 md:px-10 md:pt-40">
        <div className="bg-grid absolute inset-0 opacity-20" aria-hidden />
        {/* floating shapes */}
        <motion.span
          aria-hidden
          className="absolute left-[12%] top-[30%] hidden h-16 w-16 md:block"
          style={{ background: color }}
          animate={{ rotate: [0, 90, 0], y: [0, -20, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.span
          aria-hidden
          className="absolute right-[14%] top-[26%] hidden h-20 w-20 rounded-full border-2 md:block"
          style={{ borderColor: color }}
          animate={{ y: [0, 24, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="relative mx-auto max-w-[1400px]">
          <BackLink />
          <div className="mt-12 flex flex-col items-center text-center">
            <span className="section-label">{L(project.kind, locale)}</span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 font-display text-[18vw] uppercase leading-[0.8] tracking-tight md:text-[13vw]"
            >
              Tesi
              <br />
              <span className="text-stroke-acid">Creativa</span>
            </motion.h1>
            <p className="mt-6 max-w-xl font-sans text-lg text-muted">
              {L(project.summary, locale)}
            </p>
          </div>

          <HeaderMeta project={project} color={color} />
        </div>
      </header>

      {/* Marquee */}
      <div className="border-b border-line py-4">
        <Marquee
          className="font-display text-3xl uppercase tracking-tight text-fg/20 md:text-5xl"
          items={
            locale === "it"
              ? ["Scavo", "Fondamenta", "Strutture", "Elevazione", "Collaudo", "Visione"]
              : ["Excavation", "Foundations", "Structures", "Elevation", "Testing", "Vision"]
          }
        />
      </div>

      {/* OVERVIEW centered */}
      <section className="mx-auto max-w-3xl px-5 py-16 text-center md:py-24">
        <Kicker>{t.project.overview}</Kicker>
        <p className="mt-6 font-sans text-xl leading-relaxed text-fg/85 md:text-2xl">
          {L(project.overview, locale)}
        </p>
      </section>

      {/* THESIS STATEMENT */}
      <section className="mx-auto max-w-[1400px] px-5 md:px-10">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-3xl border p-8 md:p-14"
            style={{ borderColor: `${color}40`, background: `${color}0d` }}
          >
            <span
              aria-hidden
              className="absolute -right-6 -top-12 font-display text-[11rem] leading-none text-transparent opacity-20 md:text-[16rem]"
              style={{ WebkitTextStroke: `1px ${color}` }}
            >
              1:1
            </span>
            <span className="relative font-mono text-xs uppercase tracking-[0.18em]" style={{ color }}>
              {locale === "it" ? "La tesi" : "The thesis"}
            </span>
            <p className="relative mt-5 max-w-5xl font-display text-4xl uppercase leading-[1.05] tracking-tight md:text-7xl">
              {locale === "it"
                ? "Non è un curriculum. È una mappa di dove sono e di dove sto andando."
                : "It is not a résumé. It is a map of where I am and where I am going."}
            </p>
          </div>
        </Reveal>
      </section>

      {/* PROJECT FACTS */}
      <section className="mx-auto grid max-w-[1400px] gap-px px-5 py-16 md:grid-cols-3 md:px-10 md:py-24">
        {facts.map((fact) => (
          <div key={fact.value} className="border border-line p-7 md:p-9">
            <span className="font-display text-6xl leading-none" style={{ color }}>
              {fact.value}
            </span>
            <span className="mt-3 block font-mono text-xs uppercase tracking-[0.16em] text-muted">
              {locale === "it" ? fact.it : fact.en}
            </span>
          </div>
        ))}
      </section>

      {/* NARRATIVE STRUCTURE */}
      <section className="border-y border-line bg-bg-soft px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[1400px]">
          <Reveal className="max-w-3xl">
            <Kicker>{locale === "it" ? "La struttura narrativa" : "The narrative structure"}</Kicker>
            <h2 className="mt-5 font-display text-5xl uppercase leading-none tracking-tight md:text-8xl">
              {locale === "it" ? "Sei livelli. Una costruzione." : "Six levels. One structure."}
            </h2>
            <p className="mt-6 font-sans text-lg leading-relaxed text-muted md:text-xl">
              {locale === "it"
                ? "Ogni fase corrisponde a un passaggio reale del percorso e adotta un linguaggio visivo capace di renderlo esplorabile."
                : "Each phase corresponds to a real step in the journey and adopts a visual language that makes it explorable."}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-px border border-line bg-line md:grid-cols-2 xl:grid-cols-3">
            {chapters.map((chapter, index) => (
              <motion.article
                key={chapter.number}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 0.6, delay: index * 0.06 }}
                className="group relative min-h-80 overflow-hidden bg-bg p-7 md:p-9"
              >
                <span
                  className="absolute right-5 top-2 font-display text-[7rem] leading-none text-transparent opacity-20 transition-opacity group-hover:opacity-40"
                  style={{ WebkitTextStroke: `1px ${color}` }}
                  aria-hidden
                >
                  {chapter.number}
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.18em]" style={{ color }}>
                  LV.{chapter.number} · {L(chapter.name, locale)}
                </span>
                <h3 className="relative mt-20 max-w-xs font-display text-3xl uppercase leading-none tracking-tight md:text-4xl">
                  {L(chapter.title, locale)}
                </h3>
                <p className="relative mt-5 max-w-sm font-sans leading-relaxed text-muted">
                  {L(chapter.text, locale)}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CHALLENGE + APPROACH */}
      <section className="mx-auto grid max-w-[1400px] gap-12 px-5 py-16 md:grid-cols-2 md:gap-16 md:px-10 md:py-24">
        <Prose label={t.project.challenge} text={L(project.challenge, locale)} accent={color} />
        <Prose label={t.project.approach} text={L(project.approach, locale)} />
      </section>

      {/* CONTRIBUTIONS + RESULTS + STACK (row) */}
      <section className="mx-auto grid max-w-[1400px] gap-12 border-t border-line px-5 py-16 md:grid-cols-3 md:gap-16 md:px-10 md:py-24">
        <Contributions project={project} color={color} />
        <Results project={project} color={color} />
        <div className="flex flex-col gap-10">
          <StackList project={project} />
          <VisitCard project={project} color={color} />
        </div>
      </section>

      <NextProject slug="tesi-creativa" />
    </article>
  );
}
