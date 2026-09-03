import type { Locale } from "./i18n";

/** A localized string / string list — pick with L / LA. */
export type LStr = { it: string; en: string };
export type LArr = { it: string[]; en: string[] };
export const L = (v: LStr, locale: Locale) => v[locale];
export const LA = (v: LArr, locale: Locale) => v[locale];

/* ------------------------------------------------------------------ *
 * PROJECTS — honest, qualitative case studies (no invented metrics).
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
  // case-study detail
  overview: LStr;
  challenge: LStr;
  approach: LStr;
  contributions: LArr;
  results: LArr;
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
      it: "Co-founder · Prodotto, AI & Ops",
      en: "Co-founder · Product, AI & Ops",
    },
    summary: {
      it: "Ecosistema hardware + software + AI per l'aderenza terapeutica.",
      en: "A hardware + software + AI ecosystem for medication adherence.",
    },
    description: {
      it: "Un med box smart con sensori di peso, un'app mobile in Flutter, backend su Firebase e Cloud Functions, e una componente AI per analizzare referti e documenti sanitari.",
      en: "A smart med box with weight sensors, a Flutter mobile app, a Firebase + Cloud Functions backend, and an AI layer that reads medical reports and documents.",
    },
    tags: ["Flutter", "Firebase", "Cloud Functions", "AI", "IoT", "Product", "Business"],
    href: "https://salus-ai-claude-website.vercel.app/",
    accent: "acid",
    overview: {
      it: "Salus AI è una startup healthtech italiana nata per migliorare la gestione della salute personale: aumentare l'aderenza terapeutica e centralizzare in un unico ecosistema digitale farmaci, terapie e documenti sanitari. Non un semplice progetto, ma una vera iniziativa imprenditoriale che unisce hardware, software, prodotto, UX, AI, marketing e business.",
      en: "Salus AI is an Italian healthtech startup built to improve personal health management: increasing medication adherence and centralizing medicines, therapies and health documents in a single digital ecosystem. Not just a project, but a real venture combining hardware, software, product, UX, AI, marketing and business.",
    },
    challenge: {
      it: "Molti pazienti — soprattutto cronici e anziani — faticano a ricordare quali farmaci assumere, quando e in che dosaggio. In più i dati sanitari sono dispersi tra referti, prescrizioni ed esami. Le app di reminder si fermano alla notifica: serviva qualcosa che si avvicinasse al monitoraggio reale dell'assunzione.",
      en: "Many patients — especially chronic and elderly ones — struggle to remember which medicines to take, when and at what dosage. On top of that, health data is scattered across reports, prescriptions and tests. Reminder apps stop at the notification: something closer to real intake monitoring was needed.",
    },
    approach: {
      it: "Un ecosistema integrato: un med box smart diviso in scompartimenti con sensori di peso per stimare l'assunzione reale, un'app Flutter per terapie, promemoria e documenti, un backend serverless su Firebase/Cloud Functions e un livello AI per leggere e sintetizzare i documenti sanitari. Il tutto ragionato da founder: mercato, modello di business, preventivi e posizionamento.",
      en: "An integrated ecosystem: a smart, compartmented med box with weight sensors to estimate real intake, a Flutter app for therapies, reminders and documents, a serverless Firebase/Cloud Functions backend, and an AI layer to read and summarize health documents. All reasoned like a founder: market, business model, pricing and positioning.",
    },
    contributions: {
      it: [
        "Ideazione del prodotto e analisi del problema e del target",
        "Progettazione dell'ecosistema hardware-software e della UX",
        "App mobile in Flutter (terapie, promemoria, documenti)",
        "Architettura backend serverless su Firebase + Cloud Functions",
        "Integrazione AI per analisi di referti e documenti sanitari",
        "CRM interno, preventivi e gestione operativa",
        "Analisi di mercato, modello di business e posizionamento",
        "Branding, comunicazione e sito di presentazione",
      ],
      en: [
        "Product ideation and problem/target analysis",
        "Hardware-software ecosystem and UX design",
        "Flutter mobile app (therapies, reminders, documents)",
        "Serverless backend architecture on Firebase + Cloud Functions",
        "AI integration for medical report/document analysis",
        "Internal CRM, quotes and operational management",
        "Market analysis, business model and positioning",
        "Branding, communication and presentation site",
      ],
    },
    results: {
      it: [
        "Prodotto pensato end-to-end: dal problema reale al sistema completo",
        "Progetto multidisciplinare: hardware, app, AI, cloud, business",
        "Posizionamento B2C chiaro per pazienti, famiglie e caregiver",
        "Dimostrazione concreta di capacità imprenditoriale e tecnica",
      ],
      en: [
        "Product designed end-to-end: from the real problem to a full system",
        "Multidisciplinary project: hardware, app, AI, cloud, business",
        "Clear B2C positioning for patients, families and caregivers",
        "Concrete proof of entrepreneurial and technical capability",
      ],
    },
  },
  {
    id: "ai-lab",
    index: "02",
    name: "AI Lab",
    year: "2025 — 2026",
    kind: { it: "Progetti AI personali", en: "Personal AI Projects" },
    role: { it: "Design & Sviluppo", en: "Design & Development" },
    summary: {
      it: "Strumenti costruiti attorno agli LLM: agenti, automazioni e RAG.",
      en: "Tools built around LLMs: agents, automations and RAG.",
    },
    description: {
      it: "Progetti personali in cui gli LLM sono componenti di sistema, non demo: un assistente conversazionale che scrive su un CRM, una pipeline di lead generation con visione artificiale e l'architettura RAG dell'assistente sanitario di Salus AI.",
      en: "Personal projects where LLMs are system components, not demos: a conversational assistant that writes to a CRM, a lead-generation pipeline with computer vision, and the RAG architecture behind Salus AI's health assistant.",
    },
    tags: [
      "LLM",
      "RAG",
      "AI Agents",
      "Prompt Engineering",
      "Structured Output",
      "Python",
      "OpenAI",
      "Gemini",
      "Vector Search",
    ],
    href: "https://github.com/Fcaro05",
    accent: "violet",
    overview: {
      it: "Fuori dai progetti su commissione ho costruito strumenti personali per capire come si integrano davvero i modelli linguistici in un software reale: output strutturato, orchestrazione di tool esterni, retrieval sui dati dell'utente, controllo di costi e fallimenti del modello.",
      en: "Outside client work I built personal tools to understand how language models really fit into real software: structured output, external-tool orchestration, retrieval over user data, and control of cost and model failures.",
    },
    challenge: {
      it: "Un LLM in un prototipo è facile. Un LLM dentro un sistema che deve restare prevedibile è un altro problema: risposte fuori schema, allucinazioni sui dati, latenza e costo per chiamata. Volevo lavorare esattamente lì.",
      en: "An LLM in a prototype is easy. An LLM inside a system that must stay predictable is another matter: off-schema responses, hallucinations over data, latency and per-call cost. I wanted to work exactly there.",
    },
    approach: {
      it: "Tre progetti, tre problemi diversi. Task Manager conversazionale: un bot Telegram che interpreta messaggi in linguaggio naturale con Gemini come router d'intento a output JSON forzato, poi cerca e scrive le entità corrette su sei database Notion collegati. Lead Scraper con visione: una pipeline Playwright che raccoglie attività locali dalle mappe, ne estrae i contatti e usa un modello vision-language (GPT-4o-mini) per giudicare se il sito è migliorabile, con un agente di follow-up via email a template. Assistente sanitario RAG (Salus AI): architettura retrieval-augmented con embedding dei documenti, vector search su Firestore e prompt vincolati a rispondere solo dai dati del paziente.",
      en: "Three projects, three different problems. Conversational task manager: a Telegram bot that reads natural-language messages with Gemini as a forced-JSON intent router, then looks up and writes the right entities across six linked Notion databases. Lead scraper with vision: a Playwright pipeline that collects local businesses from maps, extracts their contacts and uses a vision-language model (GPT-4o-mini) to judge whether a site is improvable, with a templated email follow-up agent. RAG health assistant (Salus AI): a retrieval-augmented architecture with document embeddings, Firestore vector search and prompts constrained to answer only from the patient's data.",
    },
    contributions: {
      it: [
        "Intent routing con LLM e output strutturato (JSON forzato)",
        "Orchestrazione di lookup e scrittura su sei database collegati",
        "Pipeline di raccolta dati con Playwright e gestione dello stato",
        "Classificazione dei siti con modello vision-language",
        "Agente di outreach via email con template",
        "Progettazione della pipeline embedding + vector search + prompt (RAG)",
        "Regole di sicurezza sui dati sensibili nei prompt",
        "Gestione di costi, errori del modello e risposte non conformi",
      ],
      en: [
        "LLM intent routing with structured output (forced JSON)",
        "Orchestration of lookups and writes across six linked databases",
        "Data-collection pipeline with Playwright and state handling",
        "Website classification with a vision-language model",
        "Templated email outreach agent",
        "Design of the embedding + vector search + prompt pipeline (RAG)",
        "Safety rules for sensitive data in prompts",
        "Handling of cost, model errors and off-schema responses",
      ],
    },
    results: {
      it: [
        "Due strumenti funzionanti e usati in prima persona, uno progettato a livello di architettura",
        "Padronanza pratica di structured output, tool use e RAG",
        "Esperienza reale sui limiti degli LLM: schema, allucinazioni, costo, latenza",
        "Codice Python e integrazioni API scritti da zero, non da template",
      ],
      en: [
        "Two working tools used first-hand, one designed at architecture level",
        "Hands-on command of structured output, tool use and RAG",
        "Real experience with LLM limits: schema, hallucinations, cost, latency",
        "Python code and API integrations written from scratch, not from templates",
      ],
    },
  },
  {
    id: "centro-medico",
    index: "03",
    name: "Centro Medico Ambrosiano",
    year: "2023",
    kind: { it: "Marketing Sanitario", en: "Healthcare Marketing" },
    role: { it: "Digital Marketing & Content", en: "Digital Marketing & Content" },
    summary: {
      it: "Acquisizione pazienti tramite advertising, SEO e creatività.",
      en: "Patient acquisition through advertising, SEO and creative.",
    },
    description: {
      it: "Comunicazione e marketing digitale per un centro medico: Meta Ads, Google Ads, SEO locale e funnel orientati alla conversione, con campagne per trattamenti come Fotona.",
      en: "Digital communication and marketing for a medical center: Meta Ads, Google Ads, local SEO and conversion-focused funnels, with campaigns for treatments such as Fotona.",
    },
    tags: ["Meta Ads", "Google Ads", "SEO", "Copywriting", "Funnel", "Branding"],
    href: "https://www.fotona.centromedicoambrosiano.com/promo/",
    accent: "magenta",
    overview: {
      it: "Esperienza professionale nel settore sanitario, lato comunicazione, marketing digitale e contenuti. Un contesto reale con servizi medici, target locali e obiettivi commerciali, dove ogni contenuto deve unire autorevolezza e conversione.",
      en: "Professional experience in healthcare, on the communication, digital marketing and content side. A real-world context with medical services, local audiences and commercial goals, where every piece of content must combine authority and conversion.",
    },
    challenge: {
      it: "Nel marketing sanitario il paziente non sceglie solo per prezzo, ma per fiducia, chiarezza e professionalità percepita. La sfida: comunicare servizi medico-estetici complessi — come il trattamento Fotona, spesso poco conosciuto — in modo chiaro, credibile e vendibile.",
      en: "In healthcare marketing patients don't choose on price alone, but on trust, clarity and perceived professionalism. The challenge: communicating complex medical-aesthetic services — like the often little-known Fotona treatment — in a clear, credible and sellable way.",
    },
    approach: {
      it: "Campagne Meta e Google costruite sul target e sull'intento di ricerca, creatività e caroselli che spiegano il beneficio in pochi secondi, SEO locale sulle pagine servizio e leve di conversione come la CTA 'valutazione gratuita' per abbassare la barriera d'ingresso.",
      en: "Meta and Google campaigns built around audience and search intent, creatives and carousels that explain the benefit in seconds, local SEO on service pages, and conversion levers like a 'free evaluation' CTA to lower the entry barrier.",
    },
    contributions: {
      it: [
        "Gestione e supporto campagne Meta Ads (Facebook/Instagram)",
        "Google Ads: keyword, annunci e ottimizzazione",
        "SEO locale e ottimizzazione delle pagine servizio",
        "Creatività pubblicitarie, caroselli e materiali per campagne",
        "Copywriting, claim e CTA orientati alla conversione",
        "Comunicazione dei trattamenti Fotona",
      ],
      en: [
        "Managed/supported Meta Ads campaigns (Facebook/Instagram)",
        "Google Ads: keywords, ads and optimization",
        "Local SEO and service-page optimization",
        "Ad creatives, carousels and campaign materials",
        "Conversion-oriented copywriting, claims and CTAs",
        "Communication for Fotona treatments",
      ],
    },
    results: {
      it: [
        "Comunicazione di servizi medici efficace senza perdere credibilità",
        "Contenuti pensati come strumenti di acquisizione, non solo estetici",
        "Esperienza reale su advertising, SEO, copywriting e funnel",
      ],
      en: [
        "Effective medical-service communication without losing credibility",
        "Content designed as acquisition tools, not just decoration",
        "Real experience across advertising, SEO, copywriting and funnels",
      ],
    },
  },
  {
    id: "supermario24",
    index: "04",
    name: "SuperMario24",
    year: "2022",
    kind: { it: "Portale Pronto Intervento", en: "Emergency Services Portal" },
    role: { it: "Web / CMS & Local SEO", en: "Web / CMS & Local SEO" },
    summary: {
      it: "Una macchina di local SEO: servizio × provincia × comune.",
      en: "A local-SEO machine: service × province × town.",
    },
    description: {
      it: "Portale di pronto intervento 24/7 con un'architettura di contenuti altamente serializzabile per servizio, provincia e comune, e funnel telefono + form.",
      en: "A 24/7 emergency-repair portal with a highly serializable content architecture by service, province and town, and phone + form funnels.",
    },
    tags: ["WordPress", "Local SEO", "CMS", "Content Ops", "Funnel"],
    href: "https://supermario24.vercel.app/",
    accent: "cyan",
    overview: {
      it: "Un portale di pronto intervento riparazioni 24h (fabbro, idraulico, elettricista e altro) con copertura su più province lombarde. Un sistema orientato alla conversione immediata: numeri in evidenza, promessa di intervento rapido, pagine geolocalizzate, recensioni, recruiting e pagamenti.",
      en: "A 24h emergency-repair portal (locksmith, plumber, electrician and more) covering several provinces in Lombardy. A system built for immediate conversion: prominent numbers, fast-response promise, geo-located pages, reviews, recruiting and payments.",
    },
    challenge: {
      it: "Intercettare domanda locale ad alta urgenza su una matrice enorme di servizi e territori, senza che le pagine diventino tutte uguali. Serviva un impianto scalabile ma coerente e credibile.",
      en: "Capturing high-urgency local demand across a huge matrix of services and territories, without all pages becoming identical. A scalable yet coherent and credible system was needed.",
    },
    approach: {
      it: "Architettura informativa per servizio/provincia/comune con template riusabili, funnel centrato su click-to-call e form, e aree di trust (recensioni, video) e di rete (recruiting). Contenuti serializzabili su un CMS WordPress per presidiare query informative, transazionali e geolocalizzate.",
      en: "An information architecture by service/province/town with reusable templates, a funnel centered on click-to-call and forms, plus trust areas (reviews, video) and network areas (recruiting). Serializable content on a WordPress CMS to cover informational, transactional and geo queries.",
    },
    contributions: {
      it: [
        "Progettazione dell'architettura informativa e delle tassonomie",
        "Standardizzazione dei template per servizio e territorio",
        "Modellazione delle landing locali e gestione contenuti",
        "Funnel click-to-call e form, gestione delle CTA",
        "Integrazione recensioni / social proof",
        "Ottimizzazione SEO locale e manutenzione",
      ],
      en: [
        "Information architecture and taxonomy design",
        "Template standardization by service and territory",
        "Local landing modeling and content management",
        "Click-to-call and form funnels, CTA management",
        "Reviews / social-proof integration",
        "Local SEO optimization and maintenance",
      ],
    },
    results: {
      it: [
        "Copertura locale capillare su più province e comuni",
        "Sistema di contenuti scalabile e replicabile",
        "Funnel chiaro orientato al lead ad alta urgenza",
      ],
      en: [
        "Capillary local coverage across multiple provinces and towns",
        "A scalable, replicable content system",
        "A clear funnel oriented to high-urgency leads",
      ],
    },
  },
  {
    id: "azienda-multiservice",
    index: "05",
    name: "AziendaMultiservice",
    year: "2021",
    kind: { it: "Hub Multiservizio", en: "Multi-service Hub" },
    role: { it: "Web / CMS & Local SEO", en: "Web / CMS & Local SEO" },
    summary: {
      it: "Hub multiservizio con catalogo ampio e leve commerciali.",
      en: "A multi-service hub with a wide catalog and commercial levers.",
    },
    description: {
      it: "Portale aggregatore con un catalogo molto ampio, landing geolocalizzate, widget recensioni Google e leve commerciali come promo e finanziamento.",
      en: "An aggregator portal with a very broad catalog, geo-located landing pages, Google review widgets and commercial levers like promos and financing.",
    },
    tags: ["WordPress", "Local SEO", "Reviews", "Conversion", "Content"],
    href: "https://azienda-multi-service.vercel.app/",
    accent: "violet",
    overview: {
      it: "Un hub multiservizio con un'offerta molto ampia — fabbro, idraulico, climatizzazione, caldaie, spurghi e altro — pensato per presidiare un ventaglio enorme di query commerciali locali dentro un unico brand, con un'impronta commerciale esplicita.",
      en: "A multi-service hub with a very wide offering — locksmith, plumber, HVAC, boilers, drainage and more — designed to cover a huge range of local commercial queries within a single brand, with an explicit commercial slant.",
    },
    challenge: {
      it: "Gestire un catalogo vastissimo in un solo contenitore di brand mantenendo chiarezza e coerenza, e abbassare l'attrito decisionale dell'utente con leve di prezzo, urgenza e fiducia.",
      en: "Managing a vast catalog within a single brand container while keeping clarity and consistency, and lowering the user's decision friction with price, urgency and trust levers.",
    },
    approach: {
      it: "Logica da hub con landing service-locali, widget recensioni collegati a Google (place_id), embed social e blocchi commerciali (sconti, finanziamento). Contenuti statici, blocchi dinamici e form integrati nello stesso funnel.",
      en: "A hub logic with service-local landings, Google-linked review widgets (place_id), social embeds and commercial blocks (discounts, financing). Static content, dynamic blocks and forms integrated into the same funnel.",
    },
    contributions: {
      it: [
        "Razionalizzazione del catalogo e delle categorie servizi",
        "Creazione di numerose pagine correlate e geolocalizzate",
        "Presidio delle query locali (SEO)",
        "Configurazione dei widget recensioni e degli embed social",
        "Ottimizzazione commerciale del funnel (promo, finanziamento)",
      ],
      en: [
        "Service catalog and category rationalization",
        "Creation of many related, geo-located pages",
        "Local query coverage (SEO)",
        "Review widget and social embed configuration",
        "Commercial funnel optimization (promos, financing)",
      ],
    },
    results: {
      it: [
        "Presenza locale ampia e longeva",
        "Reputazione rafforzata tramite recensioni e prova sociale",
        "Funnel transazionale con leve commerciali chiare",
      ],
      en: [
        "Broad, long-lived local presence",
        "Reputation reinforced through reviews and social proof",
        "A transactional funnel with clear commercial levers",
      ],
    },
  },
  {
    id: "tesi-creativa",
    index: "06",
    name: "Tesi Creativa",
    year: "2026",
    kind: { it: "Tesi interattiva", en: "Interactive Thesis" },
    role: {
      it: "Concept · Direzione creativa · UX/UI · Sviluppo",
      en: "Concept · Creative Direction · UX/UI · Development",
    },
    summary: {
      it: "Il cantiere della mia identità: un portfolio narrativo che trasforma un percorso professionale in un'esperienza interattiva.",
      en: "The construction site of my identity: a narrative portfolio that turns a professional journey into an interactive experience.",
    },
    description: {
      it: "Una tesi-portfolio costruita come un cantiere: sei livelli raccontano la crescita dall'ambizione iniziale alla visione imprenditoriale di Salus AI.",
      en: "A thesis portfolio built like a construction site: six levels trace the journey from early ambition to the entrepreneurial vision behind Salus AI.",
    },
    tags: ["Creative Direction", "UX/UI", "Storytelling", "Web Development"],
    href: "https://tesicreativa.vercel.app/",
    accent: "acid",
    overview: {
      it: "«Un'identità professionale non si trova: si costruisce.» Da questa idea nasce un portfolio autobiografico che non si limita a elencare esperienze, ma le mette in scena come le fasi di un'opera in costruzione. Scavo, Fondamenta, Strutture, Elevazione, Collaudo e Visione diventano i capitoli di un unico racconto.",
      en: "“A professional identity is not found: it is built.” This idea became an autobiographical portfolio that does more than list experiences: it stages them as phases of a structure under construction. Excavation, Foundations, Structures, Elevation, Testing and Vision become chapters of one story.",
    },
    challenge: {
      it: "Raccontare un percorso ibrido — marketing, design, web, strategia e impresa — senza ridurlo a un curriculum lineare. La sfida era dare ordine a esperienze molto diverse e far emergere il filo che le unisce: la volontà di costruire prodotti e progetti propri.",
      en: "Tell a hybrid journey across marketing, design, web, strategy and entrepreneurship without flattening it into a linear résumé. The challenge was to organize very different experiences and reveal their common thread: the drive to build original products and ventures.",
    },
    approach: {
      it: "Ho usato il cantiere come metafora narrativa e sistema di interfaccia. Il percorso si sviluppa in sei livelli progressivi, ciascuno con un linguaggio visivo dedicato: griglie tecniche, tavole di progetto, transizioni legate allo scroll, micro-interazioni e una vista 3D esplosa dello Smart Med Box rendono la crescita visibile, non soltanto descritta.",
      en: "I used the construction site as both narrative metaphor and interface system. The journey unfolds through six progressive levels, each with its own visual language: technical grids, project sheets, scroll-led transitions, micro-interactions and an exploded 3D view of the Smart Med Box make growth visible rather than merely described.",
    },
    contributions: {
      it: [
        "Concept creativo e metafora del cantiere",
        "Architettura narrativa in sei capitoli",
        "Direzione artistica e sistema visivo",
        "UX/UI e sviluppo responsive",
        "Animazioni, transizioni e micro-interazioni",
        "Racconto e impaginazione dei case study",
        "Esperienza 3D dello Smart Med Box",
      ],
      en: [
        "Creative concept and construction-site metaphor",
        "Six-chapter narrative architecture",
        "Art direction and visual system",
        "UX/UI and responsive development",
        "Animation, transitions and micro-interactions",
        "Case-study storytelling and layout",
        "Smart Med Box 3D experience",
      ],
    },
    results: {
      it: [
        "Portfolio narrativo completo, pubblicato e accessibile online",
        "Un racconto coerente che collega formazione, primi progetti, marketing medicale e Salus AI",
        "Sei capitoli distinti riuniti in un'unica identità visiva",
        "Competenze e ambizione rese concrete attraverso interazione, contenuti e prodotto",
      ],
      en: [
        "A complete narrative portfolio, published and available online",
        "A coherent story connecting education, early projects, healthcare marketing and Salus AI",
        "Six distinct chapters united by one visual identity",
        "Skills and ambition made tangible through interaction, content and product",
      ],
    },
  },
];

export const getProject = (slug: string) => projects.find((p) => p.id === slug);
export const projectSlugs = projects.map((p) => p.id);
export const adjacentProject = (slug: string) => {
  const i = projects.findIndex((p) => p.id === slug);
  return projects[(i + 1) % projects.length];
};

export const accentHex: Record<Project["accent"], string> = {
  acid: "#d4ff36",
  magenta: "#ff2d8e",
  cyan: "#34e7e4",
  violet: "#8b5cff",
};

/* ------------------------------------------------------------------ *
 * WORK — four category cards (flagship style) on the home page.
 * Salus AI links to its deep case study; the other three link to
 * intermediate hub pages that list their sub-projects.
 * ------------------------------------------------------------------ */

export type WorkCategory = {
  id: string;
  num: string;
  name: string;
  kind: LStr;
  meta: LStr;
  summary: LStr;
  description: LStr;
  tags: string[];
  accent: Project["accent"];
  href: string;
  cta: LStr;
};

export const workCategories: WorkCategory[] = [
  {
    id: "salus-ai",
    num: "01",
    name: "Salus AI",
    kind: { it: "Startup Healthtech", en: "Healthtech Startup" },
    meta: { it: "Case study completo", en: "Full case study" },
    summary: {
      it: "Ecosistema hardware + software + AI per l'aderenza terapeutica.",
      en: "A hardware + software + AI ecosystem for medication adherence.",
    },
    description: {
      it: "La mia iniziativa imprenditoriale: med box smart con sensori, app Flutter, backend serverless su Firebase e un livello AI che legge referti e documenti sanitari. Prodotto, UX, AI e business.",
      en: "My venture: a smart med box with sensors, a Flutter app, a serverless Firebase backend and an AI layer that reads medical reports and documents. Product, UX, AI and business.",
    },
    tags: ["Flutter", "Firebase", "Cloud Functions", "AI", "IoT", "Product"],
    accent: "acid",
    href: "/work/salus-ai",
    cta: { it: "Apri il case study", en: "Open the case study" },
  },
  {
    id: "dev",
    num: "02",
    name: "Dev",
    kind: { it: "Siti & interfacce", en: "Sites & interfaces" },
    meta: { it: "3 progetti", en: "3 projects" },
    summary: {
      it: "Codice che si vede: storytelling, 3D e architetture di contenuto.",
      en: "Code you can see: storytelling, 3D and content architecture.",
    },
    description: {
      it: "Progetti dove il focus è il come sono costruiti: una SPA React con scroll-storytelling e scene Three.js, e portali con architetture di contenuto serializzabili e funnel di conversione.",
      en: "Projects where the focus is how they're built: a React SPA with scroll storytelling and Three.js scenes, and portals with serializable content architectures and conversion funnels.",
    },
    tags: ["Next.js / React", "Three.js", "GSAP", "Framer Motion", "WordPress", "Content Architecture"],
    accent: "cyan",
    href: "/work/dev",
    cta: { it: "Esplora i progetti", en: "Explore the projects" },
  },
  {
    id: "ai-lab",
    num: "03",
    name: "AI Lab",
    kind: { it: "Progetti AI personali", en: "Personal AI projects" },
    meta: { it: "3 progetti", en: "3 projects" },
    summary: {
      it: "Gli LLM come componenti di sistema: agenti, automazioni e RAG.",
      en: "LLMs as system components: agents, automations and RAG.",
    },
    description: {
      it: "Strumenti costruiti attorno ai modelli linguistici: un assistente conversazionale che scrive su un CRM, una pipeline di lead generation con visione artificiale e l'architettura RAG dell'assistente di Salus AI.",
      en: "Tools built around language models: a conversational assistant that writes to a CRM, a lead-generation pipeline with computer vision, and the RAG architecture behind the Salus AI assistant.",
    },
    tags: ["LLM", "RAG", "AI Agents", "Prompt Engineering", "Python", "OpenAI", "Gemini"],
    accent: "violet",
    href: "/work/ai-lab",
    cta: { it: "Esplora i progetti", en: "Explore the projects" },
  },
  {
    id: "growth",
    num: "04",
    name: "Growth",
    kind: { it: "Acquisizione & performance", en: "Acquisition & performance" },
    meta: { it: "3 progetti", en: "3 projects" },
    summary: {
      it: "Traffico qualificato, lead e conversioni in contesti reali.",
      en: "Qualified traffic, leads and conversions in real contexts.",
    },
    description: {
      it: "Advertising su Meta e Google costruito sull'intento, SEO locale su matrici enormi di servizi e territori, creatività e funnel orientati alla conversione, leve commerciali e prova sociale.",
      en: "Meta and Google advertising built on intent, local SEO across huge matrices of services and territories, conversion-focused creatives and funnels, commercial levers and social proof.",
    },
    tags: ["Meta Ads", "Google Ads", "SEO Locale", "Funnel", "CRO", "Copywriting"],
    accent: "magenta",
    href: "/work/growth",
    cta: { it: "Esplora i progetti", en: "Explore the projects" },
  },
];

/* ------------------------------------------------------------------ *
 * WORK HUBS — intermediate pages listing sub-projects per category.
 * ------------------------------------------------------------------ */

export type HubEntry = {
  name: string;
  blurb: LStr;
  href: string;
  tags: string[];
};

export type WorkHub = {
  id: string;
  label: LStr;
  title: LStr;
  intro: LStr;
  accent: Project["accent"];
  entries: HubEntry[];
};

export const workHubs: Record<string, WorkHub> = {
  dev: {
    id: "dev",
    label: { it: "Dev", en: "Dev" },
    title: { it: "So programmare", en: "I can build" },
    intro: {
      it: "Progetti in cui conta il come sono fatti: architettura, interazione, performance. Gli stessi portali tornano nell'area Growth, raccontati dal lato acquisizione.",
      en: "Projects where what matters is how they're made: architecture, interaction, performance. The same portals also appear under Growth, told from the acquisition side.",
    },
    accent: "cyan",
    entries: [
      {
        name: "Tesi Creativa",
        blurb: {
          it: "SPA React/Vite con storytelling guidato dallo scroll: animazioni Framer Motion, scroll inerziale Lenis e scene 3D Three.js, incluso il modello esploso dello Smart Med Box. Circa 5.000 righe di sorgente.",
          en: "A React/Vite SPA with scroll-driven storytelling: Framer Motion animation, Lenis inertial scroll and Three.js 3D scenes, including the exploded Smart Med Box model. Around 5,000 lines of source.",
        },
        href: "/work/tesi-creativa",
        tags: ["React", "Vite", "Three.js", "GSAP", "Framer Motion"],
      },
      {
        name: "SuperMario24",
        blurb: {
          it: "Architettura di contenuti serializzabile su servizio × provincia × comune, con template riusabili e coerenti su una matrice enorme di pagine, e funnel click-to-call.",
          en: "A content architecture serializable across service × province × town, with reusable, coherent templates over a huge matrix of pages, and a click-to-call funnel.",
        },
        href: "/work/supermario24",
        tags: ["Next.js", "Content Architecture", "Templating"],
      },
      {
        name: "AziendaMultiservice",
        blurb: {
          it: "Hub con catalogo molto ampio, blocchi dinamici, widget recensioni collegati a Google via place_id ed embed social, tutto integrato nello stesso funnel.",
          en: "A hub with a very broad catalog, dynamic blocks, Google-linked review widgets via place_id and social embeds, all wired into the same funnel.",
        },
        href: "/work/azienda-multiservice",
        tags: ["WordPress", "CMS", "Dynamic Blocks"],
      },
    ],
  },
  growth: {
    id: "growth",
    label: { it: "Growth", en: "Growth" },
    title: { it: "So far crescere", en: "I can grow it" },
    intro: {
      it: "Progetti in cui conta il risultato commerciale: traffico qualificato, lead, conversioni. I due portali tornano nell'area Dev, raccontati dal lato di come sono costruiti.",
      en: "Projects where what matters is the commercial result: qualified traffic, leads, conversions. The two portals also appear under Dev, told from the build side.",
    },
    accent: "magenta",
    entries: [
      {
        name: "Centro Medico Ambrosiano",
        blurb: {
          it: "Campagne Meta e Google costruite su target e intento di ricerca, SEO locale sulle pagine servizio, creatività che spiegano il beneficio in pochi secondi e CTA 'valutazione gratuita' per abbassare la barriera.",
          en: "Meta and Google campaigns built on audience and search intent, local SEO on service pages, creatives that explain the benefit in seconds, and a 'free evaluation' CTA to lower the barrier.",
        },
        href: "/work/centro-medico",
        tags: ["Meta Ads", "Google Ads", "SEO Locale", "Copywriting"],
      },
      {
        name: "SuperMario24",
        blurb: {
          it: "Macchina di SEO locale: presidio di query informative, transazionali e geolocalizzate su una matrice enorme di servizi e territori, con funnel centrato su click-to-call e form.",
          en: "A local-SEO machine: covering informational, transactional and geo queries across a huge matrix of services and territories, with a funnel centered on click-to-call and forms.",
        },
        href: "/work/supermario24",
        tags: ["Local SEO", "Content Ops", "Funnel"],
      },
      {
        name: "AziendaMultiservice",
        blurb: {
          it: "Leve commerciali esplicite — promo, finanziamento — e prova sociale via recensioni Google per abbassare l'attrito decisionale su un ventaglio vastissimo di query locali.",
          en: "Explicit commercial levers — promos, financing — and social proof via Google reviews to lower decision friction across a vast range of local queries.",
        },
        href: "/work/azienda-multiservice",
        tags: ["Local SEO", "CRO", "Reviews"],
      },
    ],
  },
};

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
    id: "ai",
    num: "01",
    title: { it: "AI Specialist", en: "AI Specialist" },
    blurb: {
      it: "Gli LLM come componenti di sistema: agenti, RAG, output strutturato e automazioni che reggono in produzione.",
      en: "LLMs as system components: agents, RAG, structured output and automations that hold up in production.",
    },
    items: [
      "LLM Integration",
      "RAG",
      "AI Agents",
      "Prompt Engineering",
      "Structured Output",
      "Embeddings & Vector Search",
      "OpenAI API",
      "Gemini API",
      "Computer Vision",
    ],
    accent: "acid",
  },
  {
    id: "dev",
    num: "02",
    title: { it: "Sviluppo", en: "Development" },
    blurb: {
      it: "Dall'idea al prodotto funzionante: app mobile, web app e backend serverless.",
      en: "From idea to working product: mobile apps, web apps and serverless backends.",
    },
    items: [
      "Flutter",
      "Next.js / React",
      "Firebase",
      "Cloud Functions",
      "Python",
      "REST API",
      "WordPress / CMS",
      "IoT / Sensori",
      "UX",
    ],
    accent: "cyan",
  },
  {
    id: "growth",
    num: "03",
    title: { it: "Growth", en: "Growth" },
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
      "Analytics",
    ],
    accent: "magenta",
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
    id: "its-incom",
    period: { it: "2024 — 2026", en: "2024 — 2026" },
    role: { it: "ITS — Digital Marketing Manager", en: "ITS — Digital Marketing Manager" },
    org: "ITS Incom",
    desc: {
      it: "Percorso biennale ITS (2.000 ore, EQF 5) in digital marketing: strategia, social media, SEO/SEM, advertising e content marketing.",
      en: "Two-year ITS program (2,000 hours, EQF 5) in digital marketing: strategy, social media, SEO/SEM, advertising and content marketing.",
    },
  },
  {
    id: "diploma",
    period: { it: "2024", en: "2024" },
    role: {
      it: "Diploma — Informatica e Telecomunicazioni",
      en: "Diploma — Computer Science & Telecommunications",
    },
    org: "ISIS Keynes, Gazzada Schianno (VA)",
    desc: {
      it: "Diploma di Istituto Tecnico Tecnologico, indirizzo Informatica e Telecomunicazioni.",
      en: "Technical high school diploma, Computer Science & Telecommunications track.",
    },
  },
];

/* ------------------------------------------------------------------ *
 * STATS — only honest, defensible figures.
 * ------------------------------------------------------------------ */

export type Stat = { value: string; label: LStr };

export const stats: Stat[] = [
  { value: "06", label: { it: "Progetti in vetrina", en: "Featured projects" } },
  { value: "03", label: { it: "Ambiti: AI · Sviluppo · Growth", en: "Domains: AI · Development · Growth" } },
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
    { label: "GitHub", href: "https://github.com/Fcaro05", handle: "@Fcaro05" },
  ],
};

export const roleWordsHero = {
  it: ["AI SPECIALIST", "SVILUPPATORE", "BUILDER", "MARKETER", "FOUNDER"],
  en: ["AI SPECIALIST", "DEVELOPER", "BUILDER", "MARKETER", "FOUNDER"],
};
