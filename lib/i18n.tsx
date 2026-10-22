"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Locale = "it" | "en";

/* ------------------------------------------------------------------ *
 * UI microcopy dictionaries. Structured project/experience content
 * lives in lib/content.ts (localized per-field).
 * ------------------------------------------------------------------ */

const dictionaries = {
  it: {
    nav: {
      work: "Lavori",
      about: "Profilo",
      capabilities: "Competenze",
      contact: "Contatti",
      menu: "Menu",
      close: "Chiudi",
      available: "Disponibile per progetti",
    },
    hero: {
      eyebrow: "AI Specialist · Sviluppatore · Marketer",
      lead: "Costruisco prodotti digitali",
      leadAccent: "con l'AI dentro",
      roles: [
        "AI",
        "LLM",
        "RAG",
        "Sviluppo",
        "Campagne",
        "Marketing",
      ],
      scroll: "Scorri",
      blurb:
        "Costruisco strumenti e prodotti con l'AI dentro: agenti LLM, RAG e automazioni. Alle spalle: healthtech, sviluppo mobile e web, performance marketing.",
    },
    manifesto: {
      label: "(01) — Manifesto",
      line1: "Non sono solo uno",
      strike1: "specialista AI",
      line2: "Non sono solo uno",
      strike2: "sviluppatore",
      line3: "Non sono solo un",
      strike3: "marketer",
      punch: "Le faccio tutte e tre, sullo stesso progetto.",
      p1: "Costruisco e faccio crescere progetti digitali reali: dagli agenti LLM e i sistemi RAG al prodotto, dal codice alle campagne.",
      p2: "Una figura ibrida che capisce il settore sanitario sia dal lato prodotto e innovazione, sia dal lato marketing e acquisizione clienti.",
    },
    capabilities: {
      label: "(02) — Competenze",
      title: "Cosa so fare",
      subtitle: "AI, sviluppo e marketing, sullo stesso progetto.",
    },
    work: {
      label: "(03) — Lavori",
      title: "Progetti selezionati",
      flagship: "Flagship",
      view: "Apri il sito",
      caseStudy: "Scopri il progetto",
      role: "Ruolo",
      stack: "Stack",
      scrollHint: "Trascina / scorri",
    },
    project: {
      back: "Tutti i lavori",
      overview: "Panoramica",
      challenge: "La sfida",
      approach: "L'approccio",
      contributions: "Cosa ho fatto",
      results: "In sintesi",
      stack: "Stack tecnico",
      role: "Ruolo",
      year: "Anno",
      type: "Tipo",
      visit: "Visita il sito",
      next: "Prossimo progetto",
    },
    timeline: {
      label: "(04) — Formazione",
      title: "Formazione",
    },
    stats: {
      label: "(05) — In sintesi",
      title: "In numeri",
      note: "Solo dati verificabili.",
    },
    contact: {
      label: "(06) — Contatti",
      title: "Lavoriamo insieme",
      lead: "Hai un prodotto, una startup o una crescita da accelerare? Parliamone.",
      cta: "Scrivimi",
      copy: "Copia email",
      copied: "Copiata!",
      elsewhere: "Altrove",
    },
    footer: {
      built: "Progettato e sviluppato da Francesco Caro",
      tech: "Next.js · React Three Fiber · GSAP",
      top: "Torna su",
      rights: "Tutti i diritti riservati",
    },
    loader: {
      tag: "Portfolio",
    },
  },
  en: {
    nav: {
      work: "Work",
      about: "Profile",
      capabilities: "Skills",
      contact: "Contact",
      menu: "Menu",
      close: "Close",
      available: "Available for projects",
    },
    hero: {
      eyebrow: "AI Specialist · Developer · Marketer",
      lead: "I build digital products",
      leadAccent: "with AI inside",
      roles: [
        "AI",
        "LLM",
        "RAG",
        "Development",
        "Campaigns",
        "Marketing",
      ],
      scroll: "Scroll",
      blurb:
        "I build tools and products with AI inside: LLM agents, RAG and automations. Backed by healthtech, mobile and web development, performance marketing.",
    },
    manifesto: {
      label: "(01) — Manifesto",
      line1: "I'm not just an",
      strike1: "AI specialist",
      line2: "I'm not just a",
      strike2: "developer",
      line3: "I'm not just a",
      strike3: "marketer",
      punch: "I do all three, on the same project.",
      p1: "I build and grow real digital projects: from LLM agents and RAG systems to product, from code to campaigns.",
      p2: "A hybrid profile that understands healthcare from both the product/innovation side and the marketing/customer-acquisition side.",
    },
    capabilities: {
      label: "(02) — Skills",
      title: "What I do",
      subtitle: "AI, development and marketing, on the same project.",
    },
    work: {
      label: "(03) — Work",
      title: "Selected projects",
      flagship: "Flagship",
      view: "Open site",
      caseStudy: "View project",
      role: "Role",
      stack: "Stack",
      scrollHint: "Drag / scroll",
    },
    project: {
      back: "All work",
      overview: "Overview",
      challenge: "The challenge",
      approach: "The approach",
      contributions: "What I did",
      results: "Highlights",
      stack: "Tech stack",
      role: "Role",
      year: "Year",
      type: "Type",
      visit: "Visit site",
      next: "Next project",
    },
    timeline: {
      label: "(04) — Education",
      title: "Education",
    },
    stats: {
      label: "(05) — At a glance",
      title: "In numbers",
      note: "Verifiable figures only.",
    },
    contact: {
      label: "(06) — Contact",
      title: "Let's work together",
      lead: "Got a product, a startup or growth to accelerate? Let's talk.",
      cta: "Email me",
      copy: "Copy email",
      copied: "Copied!",
      elsewhere: "Elsewhere",
    },
    footer: {
      built: "Designed & built by Francesco Caro",
      tech: "Next.js · React Three Fiber · GSAP",
      top: "Back to top",
      rights: "All rights reserved",
    },
    loader: {
      tag: "Portfolio",
    },
  },
};

export type Dict = (typeof dictionaries)["it"];

type I18nContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  toggle: () => void;
  t: Dict;
};

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "fc-locale";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("it");

  useEffect(() => {
    const saved =
      (typeof window !== "undefined" &&
        (localStorage.getItem(STORAGE_KEY) as Locale | null)) ||
      null;
    if (saved === "it" || saved === "en") {
      setLocaleState(saved);
    } else if (typeof navigator !== "undefined") {
      setLocaleState(navigator.language.toLowerCase().startsWith("it") ? "it" : "en");
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    if (typeof window !== "undefined") localStorage.setItem(STORAGE_KEY, l);
    if (typeof document !== "undefined") document.documentElement.lang = l;
  }, []);

  const toggle = useCallback(() => {
    setLocale(locale === "it" ? "en" : "it");
  }, [locale, setLocale]);

  const value = useMemo<I18nContextValue>(
    () => ({ locale, setLocale, toggle, t: dictionaries[locale] }),
    [locale, setLocale, toggle]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
