import { SITE_URL } from "@/lib/site";

/**
 * Titoli, descrizioni e testi delle anteprime (Open Graph) di ogni pagina.
 * Una sola fonte: la usano generateMetadata, le immagini di anteprima e la sitemap.
 */
export type PageSeo = {
  /** titolo del tag <title> e dell'anteprima, senza il nome */
  title: string;
  description: string;
  /** riga sopra il titolo nell'immagine */
  eyebrow: string;
  /** titolo grande nell'immagine, breve */
  card: string;
  accent: string;
};

const ACID = "#d4ff36";
const MAGENTA = "#ff2d8e";
const CYAN = "#34e7e4";
const VIOLET = "#8b5cff";

export const homeSeo: PageSeo = {
  title: "Francesco Caro — AI specialist, sviluppatore e marketer per l'healthtech",
  description:
    "Costruisco software e AI per il medicale e faccio crescere i prodotti digitali. Founder di Salus AI, Milano. Quattro aree di lavoro con schermate, codice e numeri veri.",
  eyebrow: "Portfolio",
  card: "Francesco Caro",
  accent: ACID,
};

export const workSeo: Record<string, PageSeo> = {
  "salus-ai": {
    title: "Salus AI: software su misura per il medicale, in ordine cronologico",
    description:
      "La mia azienda raccontata dall'inizio: il modello, il Med Box con sensori, la piattaforma di farmacovigilanza PVLM, i numeri e i documenti economici.",
    eyebrow: "Startup healthtech",
    card: "Salus AI",
    accent: ACID,
  },
  dev: {
    title: "Dev: sito, gestionale e app di Salus AI",
    description:
      "Tre progetti dove conta come sono fatti: il sito di Salus AI, il gestionale interno e l'app per i pazienti, con schermate, architettura e stack.",
    eyebrow: "Sviluppo",
    card: "Dev",
    accent: CYAN,
  },
  "ai-lab": {
    title: "AI Lab: quattro sistemi con un modello linguistico dentro",
    description:
      "L'AI di PVLM in farmacovigilanza, un agente che pubblica su LinkedIn, un lead agent e un bot che scrive sul CRM. Con schermate, regole, codice e limiti veri.",
    eyebrow: "AI specialist",
    card: "AI Lab",
    accent: VIOLET,
  },
  marketing: {
    title: "Marketing: tre campagne Meta per un centro medico",
    description:
      "Strategie, annunci, landing e un tracciamento che regge al blocco di Meta, per il Centro Medico Ambrosiano di Milano.",
    eyebrow: "Campagne, landing e tracciamento",
    card: "Marketing",
    accent: MAGENTA,
  },
  "sito-salus": {
    title: "Sito web Salus: scritto a mano, con il Med Box in 3D",
    description:
      "Il sito di Salus AI: home, cinque pagine servizio pensate per la ricerca, sezione news e una scena Three.js che scompone lo Smart Med Box mentre si scorre.",
    eyebrow: "Dev · Sito",
    card: "Sito web Salus",
    accent: CYAN,
  },
  "gestionale-salus": {
    title: "Gestionale interno Salus: clienti, preventivi e ore di lavoro",
    description:
      "Il sistema con cui Salus AI gestisce clienti, preventivi e ore di lavoro: architettura, backend e dashboard.",
    eyebrow: "Dev · Gestionale",
    card: "Gestionale Salus",
    accent: CYAN,
  },
  "app-salus": {
    title: "App Salus: l'app per pazienti, caregiver e medici",
    description:
      "L'app mobile di Salus AI per pazienti, caregiver, medici e strutture che segue la terapia: progettazione, sviluppo e UX, con schermate vere.",
    eyebrow: "Dev · App",
    card: "App Salus",
    accent: CYAN,
  },
};

export const workSlugs = Object.keys(workSeo);

export const absoluteUrl = (path: string) => `${SITE_URL}${path}`;
