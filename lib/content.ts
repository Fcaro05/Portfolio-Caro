import type { Locale } from "./i18n";

/** A localized string: pick with L(value, locale). */
export type LStr = { it: string; en: string };
export const L = (v: LStr, locale: Locale) => v[locale];

/* ------------------------------------------------------------------ *
 * PROJECTS — honest, qualitative descriptions (no invented metrics).
 * Order: Salus AI is the flagship.
 * ------------------------------------------------------------------ */

export type Project = {
  id: string;
  index: string;
  name: string;
  flagship?: boolean;
  year: string;
  kind: LStr;
  role: LStr;
  summary: LStr;
  description: LStr;
  tags: string[];
  href: string;
  accent: "acid" | "magenta" | "cyan" | "violet";
};

export const projects: Project[] = [
  {
    id: "salus-ai",
    index: "01",
    name: "Salus AI",
    flagship: true,
    year: "2024",
    kind: { it: "Startup Healthtech", en: "Healthtech Startup" },
    role: {
      it: "Co-founder · Product & Digital Ops",
      en: "Co-founder · Product & Digital Ops",
    },
    summary: {
      it: "Ecosistema hardware + software + AI per l'aderenza terapeutica.",
      en: "A hardware + software + AI ecosystem for medication adherence.",
    },
    description: {
      it: "Un med box smart con sensori di peso, un'app mobile in Flutter, backend su Firebase e Cloud Functions, e una componente AI per analizzare referti e documenti sanitari. Ho lavorato su prodotto, tecnologia, UX, CRM interno, preventivi, analisi di mercato e business model: dal problema reale fino al sistema completo.",
      en: "A smart med box with weight sensors, a Flutter mobile app, a Firebase + Cloud Functions backend, and an AI layer that reads medical reports and documents. I worked across product, tech, UX, an internal CRM, pricing, market analysis and the business model — from the real problem to the full system.",
    },
    tags: ["Flutter", "Firebase", "Cloud Functions", "AI", "IoT", "Product", "Business"],
    href: "https://salus-ai-claude-website.vercel.app/",
    accent: "acid",
  },
  {
    id: "centro-medico",
    index: "02",
    name: "Centro Medico Ambrosiano",
    year: "2023",
    kind: { it: "Marketing Sanitario", en: "Healthcare Marketing" },
    role: { it: "Digital Marketing & Content", en: "Digital Marketing & Content" },
    summary: {
      it: "Acquisizione pazienti tramite advertising, SEO e creatività.",
      en: "Patient acquisition through advertising, SEO and creative.",
    },
    description: {
      it: "Comunicazione e marketing digitale per un centro medico: Meta Ads, Google Ads, SEO locale, creatività pubblicitarie e funnel orientati alla conversione. Ho seguito la promozione di trattamenti come Fotona, trasformando servizi medico-estetici complessi in messaggi chiari e credibili.",
      en: "Digital communication and marketing for a medical center: Meta Ads, Google Ads, local SEO, ad creatives and conversion-focused funnels. I handled the promotion of treatments such as Fotona, turning complex medical-aesthetic services into clear, credible messaging.",
    },
    tags: ["Meta Ads", "Google Ads", "SEO", "Copywriting", "Funnel", "Branding"],
    href: "https://www.fotona.centromedicoambrosiano.com/promo/",
    accent: "magenta",
  },
  {
    id: "supermario24",
    index: "03",
    name: "SuperMario24",
    year: "2022",
    kind: { it: "Portale Pronto Intervento", en: "Emergency Services Portal" },
    role: { it: "Web / CMS & Local SEO", en: "Web / CMS & Local SEO" },
    summary: {
      it: "Una macchina di local SEO: servizio × provincia × comune.",
      en: "A local-SEO machine: service × province × town.",
    },
    description: {
      it: "Portale di pronto intervento 24/7 con un'architettura di contenuti altamente serializzabile per servizio, provincia e comune. Funnel telefono + form, aree recensioni, recruiting e pagamenti: un sistema scalabile pensato per intercettare domanda locale ad alta urgenza.",
      en: "A 24/7 emergency-repair portal with a highly serializable content architecture by service, province and town. Phone + form funnels, reviews, recruiting and payments areas: a scalable system built to capture high-urgency local demand.",
    },
    tags: ["WordPress", "Local SEO", "CMS", "Content Ops", "Funnel"],
    href: "https://supermario24.vercel.app/",
    accent: "cyan",
  },
  {
    id: "azienda-multiservice",
    index: "04",
    name: "AziendaMultiservice",
    year: "2021",
    kind: { it: "Hub Multiservizio", en: "Multi-service Hub" },
    role: { it: "Web / CMS & Local SEO", en: "Web / CMS & Local SEO" },
    summary: {
      it: "Hub multiservizio con catalogo ampio e leve commerciali.",
      en: "A multi-service hub with a wide catalog and commercial levers.",
    },
    description: {
      it: "Portale aggregatore con un catalogo molto ampio (fabbro, idraulico, climatizzazione, caldaie, spurghi e altro), landing geolocalizzate, widget recensioni Google e leve commerciali come promo e finanziamento. Contenuti statici, blocchi dinamici e form in un unico funnel.",
      en: "An aggregator portal with a very broad catalog (locksmith, plumber, HVAC, boilers, drainage and more), geo-located landing pages, Google review widgets and commercial levers like promos and financing. Static content, dynamic blocks and forms in a single funnel.",
    },
    tags: ["WordPress", "Local SEO", "Reviews", "Conversion", "Content"],
    href: "https://azienda-multi-service.vercel.app/",
    accent: "violet",
  },
  {
    id: "tesi-creativa",
    index: "05",
    name: "Tesi Creativa",
    year: "2023",
    kind: { it: "Progetto Creativo", en: "Creative Project" },
    role: { it: "Concept & Design", en: "Concept & Design" },
    summary: {
      it: "Un progetto creativo, sperimentale e personale.",
      en: "A creative, experimental and personal project.",
    },
    description: {
      it: "Un progetto creativo che esplora design, contenuto e interazione. (Dettagli da completare — mandami una descrizione e la integro.)",
      en: "A creative project exploring design, content and interaction. (Details to be completed — send me a description and I'll integrate it.)",
    },
    tags: ["Design", "Concept", "Web", "Creative"],
    href: "https://tesicreativa.vercel.app/",
    accent: "acid",
  },
];

/* ------------------------------------------------------------------ *
 * CAPABILITIES — three pillars.
 * ------------------------------------------------------------------ */

export type Pillar = {
  id: string;
  num: string;
  title: LStr;
  blurb: LStr;
  items: string[];
  accent: "acid" | "magenta" | "cyan";
};

export const pillars: Pillar[] = [
  {
    id: "product",
    num: "01",
    title: { it: "Prodotto & Tech", en: "Product & Tech" },
    blurb: {
      it: "Dall'idea al prodotto funzionante: app, web, AI e hardware connesso.",
      en: "From idea to working product: apps, web, AI and connected hardware.",
    },
    items: [
      "Flutter",
      "Firebase",
      "Cloud Functions",
      "Next.js / React",
      "WordPress / CMS",
      "AI Integration",
      "IoT / Sensori",
      "REST API",
      "UX / Product",
    ],
    accent: "acid",
  },
  {
    id: "growth",
    num: "02",
    title: { it: "Growth & Marketing", en: "Growth & Marketing" },
    blurb: {
      it: "Traffico, lead e conversioni. Performance marketing end-to-end.",
      en: "Traffic, leads and conversions. End-to-end performance marketing.",
    },
    items: [
      "Meta Ads",
      "Google Ads",
      "SEO Locale",
      "Funnel Design",
      "Copywriting",
      "Content",
      "CRO",
      "Branding",
      "Analytics",
    ],
    accent: "magenta",
  },
  {
    id: "business",
    num: "03",
    title: { it: "Impresa & Strategia", en: "Business & Strategy" },
    blurb: {
      it: "Penso come un founder: mercato, modello di business e operations.",
      en: "I think like a founder: market, business model and operations.",
    },
    items: [
      "Business Model",
      "Analisi di Mercato",
      "Preventivi",
      "CRM",
      "Posizionamento",
      "Operations",
      "Pricing",
      "Strategia",
    ],
    accent: "cyan",
  },
];

/* ------------------------------------------------------------------ *
 * EXPERIENCE TIMELINE
 * ------------------------------------------------------------------ */

export type TimelineItem = {
  id: string;
  period: LStr;
  role: LStr;
  org: string;
  desc: LStr;
};

export const timeline: TimelineItem[] = [
  {
    id: "salus",
    period: { it: "2024 — Oggi", en: "2024 — Present" },
    role: { it: "Co-founder · Product & Digital Ops", en: "Co-founder · Product & Digital Ops" },
    org: "Salus AI",
    desc: {
      it: "Costruzione da zero di una startup healthtech: prodotto, hardware, app Flutter, AI, CRM, preventivi e business model.",
      en: "Building a healthtech startup from scratch: product, hardware, Flutter app, AI, CRM, pricing and business model.",
    },
  },
  {
    id: "cma",
    period: { it: "2023 — 2024", en: "2023 — 2024" },
    role: { it: "Digital Marketing & Content", en: "Digital Marketing & Content" },
    org: "Centro Medico Ambrosiano",
    desc: {
      it: "Meta & Google Ads, SEO locale, creatività e funnel per l'acquisizione pazienti. Campagne per trattamenti come Fotona.",
      en: "Meta & Google Ads, local SEO, creatives and funnels for patient acquisition. Campaigns for treatments such as Fotona.",
    },
  },
  {
    id: "web-eco",
    period: { it: "2021 — 2023", en: "2021 — 2023" },
    role: { it: "Web / CMS & Local SEO", en: "Web / CMS & Local SEO" },
    org: "SuperMario24 · AziendaMultiservice",
    desc: {
      it: "Ecosistema web multi-sito di servizi locali: architettura SEO servizio/territorio, content operations e funnel di conversione.",
      en: "A multi-site web ecosystem for local services: service/territory SEO architecture, content operations and conversion funnels.",
    },
  },
  {
    id: "edu",
    period: { it: "Formazione", en: "Education" },
    role: { it: "— da completare —", en: "— to be completed —" },
    org: "—",
    desc: {
      it: "Sezione formazione: mandami titolo di studio, scuola/università e anni e la completo.",
      en: "Education section: send me your degree, school/university and years and I'll complete it.",
    },
  },
];

/* ------------------------------------------------------------------ *
 * STATS — only honest, defensible figures.
 * ------------------------------------------------------------------ */

export type Stat = { value: string; label: LStr };

export const stats: Stat[] = [
  { value: "05", label: { it: "Progetti in vetrina", en: "Featured projects" } },
  { value: "03", label: { it: "Ambiti: Prodotto · Growth · Web", en: "Domains: Product · Growth · Web" } },
  { value: "02", label: { it: "Lingue", en: "Languages" } },
  { value: "1", label: { it: "Startup costruita da zero", en: "Startup built from scratch" } },
];

/* ------------------------------------------------------------------ *
 * CONTACT
 * ------------------------------------------------------------------ */

export const contact = {
  email: "fcaro.personale@gmail.com",
  socials: [
    { label: "LinkedIn", href: "#", handle: "/in/francescocaro" },
    { label: "GitHub", href: "#", handle: "@fcaro" },
    { label: "Instagram", href: "#", handle: "@fcaro" },
  ],
};

export const roleWordsHero = {
  it: ["SVILUPPATORE", "MARKETER", "FOUNDER", "STRATEGA", "BUILDER"],
  en: ["DEVELOPER", "MARKETER", "FOUNDER", "STRATEGIST", "BUILDER"],
};
