/**
 * Contenuti dell'area Dev.
 *
 * I numeri vengono dai repository (conteggio righe e commit al 22/10/2026) e dai documenti di
 * progetto. Gestionale e app non sono pubblici: si descrivono, non si mostrano dati reali.
 */

export type LStr = { it: string; en: string };
export type LArr = { it: string[]; en: string[] };

export type DevSlug = "sito-salus" | "gestionale-salus" | "app-salus";

export type DevProject = {
  slug: DevSlug;
  n: string;
  name: string;
  kind: LStr;
  period: string;
  status: LStr;
  color: string;
  blurb: LStr;
  facts: { value: string; label: LStr }[];
  points: LArr;
  tags: string[];
};

export const devProjects: DevProject[] = [
  {
    slug: "sito-salus",
    n: "01",
    name: "Sito web Salus",
    kind: { it: "Sito aziendale", en: "Company website" },
    period: "Giu — Ago 2026",
    status: { it: "Online", en: "Live" },
    color: "#34e7e4",
    blurb: {
      it: "Il sito di Salus AI: home, cinque pagine servizio pensate per la ricerca, una sezione news e una vista 3D dello Smart Med Box che si apre mentre si scorre. Scritto a mano, senza framework.",
      en: "The Salus AI website: home, five search-oriented service pages, a news section and a 3D view of the Smart Med Box that opens as you scroll. Hand-written, with no framework.",
    },
    facts: [
      { value: "5", label: { it: "pagine servizio", en: "service pages" } },
      { value: "17", label: { it: "URL in sitemap", en: "sitemap URLs" } },
      { value: "17", label: { it: "commit in 11 settimane", en: "commits in 11 weeks" } },
    ],
    points: {
      it: [
        "HTML, CSS e JavaScript senza framework",
        "Three.js per la scomposizione del box, modello glTF",
        "PWA installabile, SEO con dati strutturati",
      ],
      en: [
        "HTML, CSS and JavaScript with no framework",
        "Three.js for the box explode, glTF model",
        "Installable PWA, SEO with structured data",
      ],
    },
    tags: ["HTML/CSS/JS", "Three.js", "PWA", "SEO", "Cloudflare"],
  },
  {
    slug: "gestionale-salus",
    n: "02",
    name: "Gestionale interno Salus",
    kind: { it: "Strumento interno", en: "Internal tool" },
    period: "Apr — Lug 2026",
    status: { it: "In uso interno", en: "In internal use" },
    color: "#8b5cff",
    blurb: {
      it: "Il gestionale con cui Salus segue clienti, vendite e preventivi. Un'API FastAPI su PostgreSQL e una dashboard Next.js: preventivi con versioni, timesheet e contratti generati dai template.",
      en: "The system Salus uses to follow clients, sales and quotes. A FastAPI API on PostgreSQL and a Next.js dashboard: versioned quotes, timesheets and contracts generated from templates.",
    },
    facts: [
      { value: "~14.100", label: { it: "righe tra Python e TypeScript", en: "lines across Python and TypeScript" } },
      { value: "20", label: { it: "modelli dati", en: "data models" } },
      { value: "68", label: { it: "commit in due repository", en: "commits across two repositories" } },
    ],
    points: {
      it: [
        "Token di servizio solo lato server, permessi per modulo",
        "Preventivi con più versioni e un flusso fino alla vendita chiusa",
        "Documento economico a 12 fasi e contratto in DOCX",
      ],
      en: [
        "Service token on the server only, per-module permissions",
        "Quotes with multiple versions and a flow through to the closed sale",
        "A 12-phase economic document and a DOCX contract",
      ],
    },
    tags: ["Next.js", "FastAPI", "PostgreSQL", "TypeScript", "Python"],
  },
  {
    slug: "app-salus",
    n: "03",
    name: "App Salus",
    kind: { it: "App mobile", en: "Mobile app" },
    period: "2025 — 2026",
    status: { it: "In sviluppo", en: "In development" },
    color: "#ff2d8e",
    blurb: {
      it: "L'app di Salus per pazienti, caregiver, medici e strutture: terapie e promemoria, documenti sanitari con OCR, un assistente AI e gli abbonamenti. Flutter su Firebase, collegata allo Smart Med Box.",
      en: "The Salus app for patients, caregivers, doctors and facilities: therapies and reminders, health documents with OCR, an AI assistant and subscriptions. Flutter on Firebase, linked to the Smart Med Box.",
    },
    facts: [
      { value: "4", label: { it: "ruoli con permessi propri", en: "roles with their own permissions" } },
      { value: "69", label: { it: "pagine di guida tecnica", en: "pages of technical guide" } },
      { value: "9", label: { it: "scomparti collegati", en: "linked compartments" } },
    ],
    points: {
      it: [
        "Flutter multipiattaforma, backend serverless su Firebase",
        "Assistente AI con RAG sui documenti dell'utente",
        "Abbonamenti con Stripe, notifiche push, ruoli",
      ],
      en: [
        "Cross-platform Flutter, serverless backend on Firebase",
        "AI assistant with RAG over the user's documents",
        "Stripe subscriptions, push notifications, roles",
      ],
    },
    tags: ["Flutter", "Firebase", "Cloud Functions", "Stripe", "AI"],
  },
];

export const stackGroups: { title: LStr; items: string[] }[] = [
  { title: { it: "Interfacce", en: "Interfaces" }, items: ["React 19", "Next.js 16", "Tailwind CSS 4", "TypeScript", "HTML/CSS/JS"] },
  { title: { it: "Movimento e 3D", en: "Motion and 3D" }, items: ["Three.js", "Framer Motion"] },
  { title: { it: "Mobile", en: "Mobile" }, items: ["Flutter", "Dart"] },
  { title: { it: "Backend e dati", en: "Backend and data" }, items: ["FastAPI", "SQLAlchemy", "PostgreSQL", "Firebase", "Cloud Functions", "SQLite"] },
  { title: { it: "Infrastruttura", en: "Infrastructure" }, items: ["Render", "Cloudflare", "Vercel", "S3", "Stripe"] },
  { title: { it: "AI", en: "AI" }, items: ["OpenAI API", "RAG", "OCR"] },
];

/* ------------------------------------------------------------------ *
 *  Sito web Salus
 * ------------------------------------------------------------------ */

export const sitoBuild: { title: LStr; body: LStr; tag: string }[] = [
  {
    tag: "01",
    title: { it: "Senza framework", en: "No framework" },
    body: {
      it: "Pagine HTML, un foglio di stile e JavaScript scritto a mano. Si apre subito e non ha un passo di build da mantenere.",
      en: "HTML pages, a stylesheet and hand-written JavaScript. It opens instantly and has no build step to maintain.",
    },
  },
  {
    tag: "02",
    title: { it: "Il box che si apre", en: "The box that opens" },
    body: {
      it: "Una scena Three.js carica il modello glTF dello Smart Med Box e lo scompone in base alla posizione dello scroll.",
      en: "A Three.js scene loads the Smart Med Box glTF model and explodes it according to the scroll position.",
    },
  },
  {
    tag: "03",
    title: { it: "Installabile", en: "Installable" },
    body: {
      it: "Manifest e icone fanno del sito una PWA: si può aggiungere alla schermata del telefono.",
      en: "A manifest and icons make the site a PWA: it can be added to the phone's home screen.",
    },
  },
  {
    tag: "04",
    title: { it: "Pensato per la ricerca", en: "Built for search" },
    body: {
      it: "Sitemap con 17 URL, canonical, Open Graph, robots e dati strutturati JSON-LD su sei pagine.",
      en: "A 17-URL sitemap, canonicals, Open Graph, robots and JSON-LD structured data on six pages.",
    },
  },
];

export const sitoPages: { group: LStr; items: LStr[] }[] = [
  {
    group: { it: "Servizi", en: "Services" },
    items: [
      { it: "App sanitarie e medicali", en: "Health and medical apps" },
      { it: "Dispositivi medici connessi", en: "Connected medical devices" },
      { it: "Consulenza AI per l'industria farmaceutica", en: "AI consulting for pharma" },
      { it: "MVP digital health", en: "Digital health MVP" },
      { it: "Patient support program digitale", en: "Digital patient support programme" },
    ],
  },
  {
    group: { it: "Prodotto", en: "Product" },
    items: [
      { it: "Esempio di app, con le schermate", en: "Example app, with screens" },
      { it: "Esempio di hardware, il box in 3D", en: "Example hardware, the 3D box" },
      { it: "Specifiche dell'ecosistema", en: "Ecosystem specifications" },
    ],
  },
  {
    group: { it: "News", en: "News" },
    items: [
      { it: "Sette articoli su eventi e stampa", en: "Seven articles on events and press" },
      { it: "Pagina indice con tutte le news", en: "Index page with all the news" },
    ],
  },
];

export const sitoLog: { when: LStr; text: LStr }[] = [
  { when: { it: "3 giu 2026", en: "3 Jun 2026" }, text: { it: "Prima versione del sito.", en: "First version of the site." } },
  {
    when: { it: "23 lug 2026", en: "23 Jul 2026" },
    text: {
      it: "Si passa al deploy su Cloudflare e si toglie il workflow Vercel.",
      en: "Deployment moves to Cloudflare and the Vercel workflow is removed.",
    },
  },
  {
    when: { it: "25 lug 2026", en: "25 Jul 2026" },
    text: {
      it: "Arrivano le pagine servizio, la sezione news, la PWA e le basi della SEO.",
      en: "Service pages, the news section, the PWA and the SEO basics arrive.",
    },
  },
  {
    when: { it: "18 ago 2026", en: "18 Aug 2026" },
    text: {
      it: "Pulizia: icone PWA, immagini non ottimizzate e CSS morto tolti; corrette le immagini hero e il layout mobile delle news.",
      en: "Cleanup: PWA icons, unoptimised images and dead CSS dealt with; hero images and the mobile news layout fixed.",
    },
  },
];

/* ------------------------------------------------------------------ *
 *  Gestionale interno
 * ------------------------------------------------------------------ */

export const gestNumbers: { value: string; label: LStr }[] = [
  { value: "4.674", label: { it: "righe di Python, API", en: "lines of Python, API" } },
  { value: "9.472", label: { it: "righe di TypeScript, dashboard", en: "lines of TypeScript, dashboard" } },
  { value: "20", label: { it: "modelli dati", en: "data models" } },
  { value: "12", label: { it: "router API", en: "API routers" } },
  { value: "68", label: { it: "commit", en: "commits" } },
  { value: "3", label: { it: "mesi, da aprile a luglio 2026", en: "months, April to July 2026" } },
];

export const gestArch: { title: string; sub: LStr }[] = [
  { title: "Dashboard", sub: { it: "Next.js 16 · React 19", en: "Next.js 16 · React 19" } },
  { title: "Proxy", sub: { it: "Il token resta sul server", en: "The token stays on the server" } },
  { title: "API", sub: { it: "FastAPI · SQLAlchemy", en: "FastAPI · SQLAlchemy" } },
  { title: "Dati", sub: { it: "PostgreSQL · S3", en: "PostgreSQL · S3" } },
];

export const gestModules: { title: LStr; body: LStr }[] = [
  {
    title: { it: "Aziende e contatti", en: "Companies and contacts" },
    body: {
      it: "Anagrafica delle aziende. I contatti si collegano a più aziende, con lo storico dei ruoli.",
      en: "A company registry. Contacts link to several companies, keeping the role history.",
    },
  },
  {
    title: { it: "Vendite", en: "Sales" },
    body: {
      it: "Pipeline di opportunità, da lead a vinta o persa, con chiamate, incontri ed email registrati.",
      en: "An opportunity pipeline from lead to won or lost, with calls, meetings and emails logged.",
    },
  },
  {
    title: { it: "Preventivi", en: "Quotes" },
    body: {
      it: "Ogni preventivo ha più versioni, ognuna con le sue righe e i suoi documenti allegati.",
      en: "Each quote has several versions, each with its own lines and attached documents.",
    },
  },
  {
    title: { it: "Prodotti", en: "Products" },
    body: {
      it: "Catalogo con aliquota e unità di misura, da cui si compongono le righe dei preventivi.",
      en: "A catalogue with tax rate and unit of measure, used to build quote lines.",
    },
  },
  {
    title: { it: "Task", en: "Tasks" },
    body: {
      it: "Attività con stato, priorità e assegnazioni, per tipo: sviluppo, vendite, documenti.",
      en: "Tasks with status, priority and assignments, by type: development, sales, documents.",
    },
  },
  {
    title: { it: "Timesheet e risorse", en: "Timesheet and resources" },
    body: {
      it: "Ore lavorate, collaboratori e tariffe che cambiano nel tempo, per sapere quanto costa un progetto.",
      en: "Hours worked, workers and rates that change over time, to know what a project costs.",
    },
  },
  {
    title: { it: "Team e permessi", en: "Team and permissions" },
    body: {
      it: "Utenti per dipartimento. Ogni modulo si può dare in sola lettura o in modifica.",
      en: "Users by department. Each module can be granted as read-only or editable.",
    },
  },
  {
    title: { it: "File", en: "Files" },
    body: {
      it: "Caricamento dei documenti su storage S3, collegati alla versione del preventivo a cui appartengono.",
      en: "Document upload to S3 storage, tied to the quote version they belong to.",
    },
  },
];

export const quoteFlow: { label: LStr; note: LStr }[] = [
  { label: { it: "Bozza", en: "Draft" }, note: { it: "Si lavora sulle versioni", en: "Work happens on versions" } },
  { label: { it: "Inviato", en: "Sent" }, note: { it: "In negoziazione", en: "Under negotiation" } },
  { label: { it: "Accettato", en: "Accepted" }, note: { it: "Diventa commessa e salva la data di firma", en: "Becomes an order and stores the signing date" } },
  { label: { it: "Completato", en: "Completed" }, note: { it: "Vendita chiusa, con la data", en: "Sale closed, with the date" } },
];

export const permModules: { it: string; en: string }[] = [
  { it: "Aziende", en: "Companies" },
  { it: "Vendite", en: "Sales" },
  { it: "Prodotti", en: "Products" },
  { it: "Utenti", en: "Users" },
  { it: "Task", en: "Tasks" },
];

/* ------------------------------------------------------------------ *
 *  App Salus
 * ------------------------------------------------------------------ */

export const appRoles: { title: LStr; body: LStr }[] = [
  {
    title: { it: "Paziente", en: "Patient" },
    body: {
      it: "Gestisce la propria terapia: farmaci, orari, promemoria, documenti. Vede e modifica solo i suoi dati.",
      en: "Manages their own therapy: drugs, times, reminders, documents. Sees and edits only their own data.",
    },
  },
  {
    title: { it: "Caregiver", en: "Caregiver" },
    body: {
      it: "Segue uno o più pazienti e riceve un avviso quando una dose viene saltata.",
      en: "Follows one or more patients and is notified when a dose is missed.",
    },
  },
  {
    title: { it: "Medico", en: "Doctor" },
    body: {
      it: "Consulta terapie e documenti dei pazienti che hanno dato l'autorizzazione.",
      en: "Reads therapies and documents of the patients who have granted access.",
    },
  },
  {
    title: { it: "Struttura", en: "Facility" },
    body: {
      it: "Cliniche e residenze: una dashboard con tutti i pazienti dell'organizzazione.",
      en: "Clinics and care homes: a dashboard with all the organisation's patients.",
    },
  },
];

export const appFlow: { title: string; sub: LStr }[] = [
  { title: "Flutter", sub: { it: "Android · iOS", en: "Android · iOS" } },
  { title: "Firebase", sub: { it: "Auth · Firestore · FCM", en: "Auth · Firestore · FCM" } },
  { title: "Cloud Functions", sub: { it: "OpenAI · Stripe", en: "OpenAI · Stripe" } },
  { title: "Med Box", sub: { it: "ESP32 · HTTPS/MQTT", en: "ESP32 · HTTPS/MQTT" } },
];


/** Funzioni dell'app, ognuna con la schermata vera che la mostra (file in /public/dev/app-salus). */
export const appFeatures: { shot: string; title: LStr; body: LStr }[] = [
  {
    shot: "03-dashboard",
    title: { it: "Terapie e promemoria", en: "Therapies and reminders" },
    body: {
      it: "La home mostra le prossime dosi, l'aderenza della settimana e le terapie attive. I promemoria arrivano come notifiche push e, se una dose viene saltata, lo sa anche il caregiver.",
      en: "The home screen shows the next doses, the week's adherence and the active therapies. Reminders arrive as push notifications and, if a dose is missed, the caregiver knows too.",
    },
  },
  {
    shot: "04-farmaci",
    title: { it: "Farmaci", en: "Medicines" },
    body: {
      it: "Ogni farmaco ha i suoi giorni e i suoi orari. La lista dice a colpo d'occhio cosa si prende e quando.",
      en: "Every medicine has its own days and times. The list shows at a glance what to take and when.",
    },
  },
  {
    shot: "05-dettaglio-farmaco",
    title: { it: "Dose per dose", en: "Dose by dose" },
    body: {
      it: "Il dettaglio di un farmaco elenca le dosi giorno per giorno, con quelle già prese spuntate e quelle ancora da prendere.",
      en: "A medicine's detail lists the doses day by day, with the ones already taken ticked and the ones still to take.",
    },
  },
  {
    shot: "06-nuovo-farmaco",
    title: { it: "Aggiungere una terapia", en: "Adding a therapy" },
    body: {
      it: "Nome, dosaggio, principio attivo, giorni della settimana e orari, più un'icona per riconoscere il farmaco subito. La guida prevede anche la scansione del codice AIC sulla confezione.",
      en: "Name, dosage, active ingredient, days of the week and times, plus an icon to recognise the medicine at once. The guide also plans scanning the AIC code on the pack.",
    },
  },
  {
    shot: "07-documenti",
    title: { it: "Documenti sanitari", en: "Health documents" },
    body: {
      it: "Referti, analisi e ricette si caricano dall'app e si ordinano per tipo. L'OCR delle ricette è ancora da completare.",
      en: "Reports, tests and prescriptions are uploaded from the app and sorted by type. Prescription OCR is still to be completed.",
    },
  },
  {
    shot: "08-assistente-ai",
    title: { it: "Assistente AI", en: "AI assistant" },
    body: {
      it: "Risponde a domande sui dati dell'utente cercando nei suoi documenti. Lo dice anche la schermata: le risposte si basano solo sui documenti disponibili e non sostituiscono il parere del medico. Oggi è una versione di base.",
      en: "Answers questions about the user's data by searching their documents. The screen says it too: answers rely only on the available documents and don't replace a doctor's opinion. Today it is a basic version.",
    },
  },
  {
    shot: "09-dispositivo",
    title: { it: "Smart Med Box", en: "Smart Med Box" },
    body: {
      it: "La pagina del dispositivo mostra lo stato del box e gli eventi che arrivano dal cloud: dose assunta, scomparto, peso rilevato e variazione, e anche le letture anomale.",
      en: "The device page shows the box's state and the events coming from the cloud: dose taken, compartment, measured weight and change, and also anomalous readings.",
    },
  },
];

/** Cose dell'app senza una schermata dedicata. */
export const appExtras: { title: LStr; body: LStr }[] = [
  {
    title: { it: "Abbonamenti", en: "Subscriptions" },
    body: {
      it: "Pagamenti con Stripe, con il piano dell'utente letto dal token di accesso. Il sistema di fatturazione è completo.",
      en: "Payments with Stripe, with the user's plan read from the access token. The billing system is complete.",
    },
  },
  {
    title: { it: "Chiavi fuori dall'app", en: "Keys outside the app" },
    body: {
      it: "Le chiavi di OpenAI e Stripe stanno nelle Cloud Functions, mai nel codice dell'app.",
      en: "The OpenAI and Stripe keys live in Cloud Functions, never in the app code.",
    },
  },
];

/**
 * Schermate vere dell'app, versione di dicembre 2025 (foto del telefono, 31/12/2025).
 * Vuoto = la galleria non appare. Le immagini sono in /public/dev/app-salus.
 */
export const appShots: { src: string; caption: LStr }[] = [
  { src: "/dev/app-salus/01-splash.webp", caption: { it: "Avvio dell'app", en: "App launch" } },
  { src: "/dev/app-salus/02-onboarding-promemoria.webp", caption: { it: "Onboarding: promemoria smart", en: "Onboarding: smart reminders" } },
  { src: "/dev/app-salus/03-dashboard.webp", caption: { it: "Dashboard: prossime dosi, aderenza, terapie", en: "Dashboard: next doses, adherence, therapies" } },
  { src: "/dev/app-salus/04-farmaci.webp", caption: { it: "Farmaci: la lista con gli orari", en: "Medicines: the list with schedules" } },
  { src: "/dev/app-salus/05-dettaglio-farmaco.webp", caption: { it: "Dettaglio di un farmaco, dose per dose", en: "A medicine's detail, dose by dose" } },
  { src: "/dev/app-salus/06-nuovo-farmaco.webp", caption: { it: "Nuovo farmaco: dosaggio, giorni e orari", en: "New medicine: dosage, days and times" } },
  { src: "/dev/app-salus/07-documenti.webp", caption: { it: "Documenti: referti e analisi", en: "Documents: reports and tests" } },
  { src: "/dev/app-salus/08-assistente-ai.webp", caption: { it: "Assistente AI: risponde solo dai documenti", en: "AI assistant: answers only from the documents" } },
  { src: "/dev/app-salus/09-dispositivo.webp", caption: { it: "Dispositivo: gli eventi che arrivano dal box", en: "Device: the events coming from the box" } },
];
