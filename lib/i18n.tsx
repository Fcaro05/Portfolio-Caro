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
      eyebrow: "Sviluppatore · Marketer · Builder",
      lead: "Costruisco prodotti digitali",
      leadAccent: "che funzionano davvero",
      roles: [
        "Prodotto",
        "Tecnologia",
        "Growth",
        "Marketing",
        "Strategia",
        "AI",
      ],
      scroll: "Scorri",
      blurb:
        "Healthtech, marketing performance e sistemi web scalabili. Unisco tecnologia, crescita e visione imprenditoriale.",
    },
    manifesto: {
      label: "(01) — Manifesto",
      line1: "Non sono solo uno",
      strike1: "sviluppatore",
      line2: "Non sono solo un",
      strike2: "marketer",
      line3: "Non sono solo un",
      strike3: "creativo",
      punch: "Sono tutte e tre le cose insieme.",
      p1: "Costruisco e faccio crescere progetti digitali reali: dal prodotto al codice, dalle campagne alla strategia di business.",
      p2: "Una figura ibrida che capisce il settore sanitario sia dal lato prodotto e innovazione, sia dal lato marketing e acquisizione clienti.",
    },
    capabilities: {
      label: "(02) — Competenze",
      title: "Cosa so fare",
      subtitle: "Tre mondi, un'unica testa.",
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
      title: "I numeri (onesti)",
      note: "Niente metriche gonfiate. Solo ciò che è reale.",
    },
    contact: {
      label: "(06) — Contatti",
      title: "Costruiamo qualcosa",
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
      eyebrow: "Developer · Marketer · Builder",
      lead: "I build digital products",
      leadAccent: "that actually work",
      roles: [
        "Product",
        "Technology",
        "Growth",
        "Marketing",
        "Strategy",
        "AI",
      ],
      scroll: "Scroll",
      blurb:
        "Healthtech, performance marketing and scalable web systems. I blend technology, growth and an entrepreneurial mindset.",
    },
    manifesto: {
      label: "(01) — Manifesto",
      line1: "I'm not just a",
      strike1: "developer",
      line2: "I'm not just a",
      strike2: "marketer",
      line3: "I'm not just a",
      strike3: "creative",
      punch: "I'm all three at once.",
      p1: "I build and grow real digital projects: from product to code, from campaigns to business strategy.",
      p2: "A hybrid profile that understands healthcare from both the product/innovation side and the marketing/customer-acquisition side.",
    },
    capabilities: {
      label: "(02) — Skills",
      title: "What I do",
      subtitle: "Three worlds, one mind.",
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
      title: "The (honest) numbers",
      note: "No inflated metrics. Only what's real.",
    },
    contact: {
      label: "(06) — Contact",
      title: "Let's build something",
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
