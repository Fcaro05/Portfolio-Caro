import type { SeeAlsoItem } from "@/components/work/parts";

/** Rimandi «Vedi anche» tra le pagine del portfolio. */
export const seeAlso = {
  salus: {
    href: "/work/salus-ai",
    name: "Salus AI",
    hint: { it: "L'azienda per cui sono stati costruiti, in ordine cronologico.", en: "The company they were built for, in chronological order." },
  },
  salusDocs: {
    href: "/work/salus-ai#documenti",
    name: "Salus AI",
    hint: { it: "Il deck PVLM e i documenti dell'azienda.", en: "The PVLM deck and the company's documents." },
  },
  dev: {
    href: "/work/dev",
    name: "Dev",
    hint: { it: "Il sito, il gestionale interno e l'app per i pazienti di Salus.", en: "Salus' website, internal management system and patient app." },
  },
  aiLab: {
    href: "/work/ai-lab",
    name: "AI Lab",
    hint: { it: "I sistemi con un modello linguistico dentro, con schermate e codice.", en: "The systems with a language model inside, with screens and code." },
  },
  aiLabPvlm: {
    href: "/work/ai-lab#pvlm",
    name: "AI Lab",
    hint: { it: "L'AI dentro PVLM, la piattaforma di farmacovigilanza.", en: "The AI inside PVLM, the pharmacovigilance platform." },
  },
  aiLabLead: {
    href: "/work/ai-lab#lead",
    name: "AI Lab",
    hint: { it: "Un agente che si occupa dei contatti in arrivo.", en: "An agent that handles incoming leads." },
  },
  growthTracking: {
    href: "/work/growth#tracciamento",
    name: "Growth",
    hint: { it: "Il caso del tracciamento: contatti inviati a Meta dal server.", en: "The tracking case: leads sent to Meta from the server." },
  },
  sitoSalus: {
    href: "/work/sito-salus",
    name: "Sito web Salus",
    hint: { it: "Il sito che ho costruito, con struttura e SEO.", en: "The website I built, with structure and SEO." },
  },
} satisfies Record<string, SeeAlsoItem>;
