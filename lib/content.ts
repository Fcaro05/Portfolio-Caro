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
    year: "2024 →",
    kind: { it: "Startup Healthtech", en: "Healthtech Startup" },
    role: {
      it: "Co-founder · Prodotto, AI & Ops",
      en: "Co-founder · Product, AI & Ops",
    },
    summary: {
      it: "Software su misura per il medicale che finanzia un dispositivo proprio.",
      en: "Custom medical software that funds a device of its own.",
    },
    description: {
      it: "Un'azienda di servizi che sviluppa software nel settore salute e usa il margine per finanziare Smart Med Box, un dispositivo per l'aderenza terapeutica. Oggi: la piattaforma di farmacovigilanza PVLM, una piattaforma di aderenza e il prototipo del Med Box.",
      en: "A services company building software for the health sector and using the margin to fund Smart Med Box, a therapy-adherence device. Today: the PVLM pharmacovigilance platform, an adherence platform and the Med Box prototype.",
    },
    tags: ["Flutter", "Firebase", "Cloud Functions", "AI", "IoT", "Product", "Business"],
    href: "https://salus-ai-claude-website.vercel.app/",
    accent: "acid",
    overview: {
      it: "Salus AI è una startup healthtech italiana, nata dall'idea di un contenitore smart per i farmaci con app e AI. Oggi vende sviluppo software su misura ad aziende del settore salute e con quel margine finanzia il Med Box, senza cedere quote a investitori. Questa pagina racconta l'azienda in ordine cronologico, in tutti i suoi ambiti, con i documenti allegati.",
      en: "Salus AI is an Italian healthtech startup that began as a smart medicine container with an app and AI. Today it sells custom software development to health-sector companies and uses the margin to fund the Med Box, without selling equity to investors. This page tells the company's story in chronological order, across all its domains, with the documents attached.",
    },
    challenge: {
      it: "Molti pazienti — soprattutto cronici e anziani — faticano a ricordare quali farmaci assumere, quando e in che dosaggio. In più i dati sanitari sono dispersi tra referti, prescrizioni ed esami. Le app di reminder si fermano alla notifica: serviva qualcosa che si avvicinasse al monitoraggio reale dell'assunzione.",
      en: "Many patients — especially chronic and elderly ones — struggle to remember which medicines to take, when and at what dosage. On top of that, health data is scattered across reports, prescriptions and tests. Reminder apps stop at the notification: something closer to real intake monitoring was needed.",
    },
    approach: {
      it: "Un ecosistema integrato: un med box smart diviso in scompartimenti con sensori di peso per stimare l'assunzione reale, un'app Flutter per terapie, promemoria e documenti, un backend serverless su Firebase/Cloud Functions e un livello AI per leggere e sintetizzare i documenti sanitari. Intorno, un modello d'impresa che lo paga con i servizi.",
      en: "An integrated ecosystem: a smart, compartmented med box with weight sensors to estimate real intake, a Flutter app for therapies, reminders and documents, a serverless Firebase/Cloud Functions backend, and an AI layer to read and summarize health documents. Around it, a business model that pays for it with services.",
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
        "Sviluppo di PVLM, piattaforma di farmacovigilanza con validazione CSV/GxP",
        "Offerte, contratti e piano economico del Med Box",
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
        "Development of PVLM, a pharmacovigilance platform with CSV/GxP validation",
        "Offers, contracts and the Med Box economic plan",
      ],
    },
    results: {
      it: [
        "Prodotto pensato end-to-end: dal problema reale al sistema completo",
        "Progetto multidisciplinare: hardware, app, AI, cloud, business",
        "Posizionamento B2C chiaro per pazienti, famiglie e caregiver",
        "Dimostrazione concreta di capacità imprenditoriale e tecnica",
        "Primo progetto per un cliente consegnato in otto settimane, nei tempi",
      ],
      en: [
        "Product designed end-to-end: from the real problem to a full system",
        "Multidisciplinary project: hardware, app, AI, cloud, business",
        "Clear B2C positioning for patients, families and caregivers",
        "Concrete proof of entrepreneurial and technical capability",
        "First client project delivered in eight weeks, on schedule",
      ],
    },
  },
  {
    id: "ai-lab",
    index: "02",
    name: "AI Lab",
    year: "2026",
    kind: { it: "Sistemi con un LLM dentro", en: "Systems with an LLM inside" },
    role: { it: "Progettazione e sviluppo", en: "Design and development" },
    summary: {
      it: "Quattro sistemi che usano un modello linguistico per fare un lavoro vero.",
      en: "Four systems that use a language model to do real work.",
    },
    description: {
      it: "L'AI di PVLM in farmacovigilanza, un agente che scrive e pubblica un post LinkedIn a settimana, un lead agent che legge i siti delle piccole aziende, un bot Telegram che scrive sul CRM. Per ognuno: schermate, regole, codice e limiti veri.",
      en: "The AI in PVLM for pharmacovigilance, an agent that writes and publishes a LinkedIn post a week, a lead agent that reads small businesses' websites, a Telegram bot that writes to the CRM. For each: real screens, rules, code and limits.",
    },
    tags: ["LLM", "Structured Output", "Human in the loop", "Agenti", "Python", "TypeScript", "OpenAI", "Gemini", "Claude"],
    href: "",
    accent: "violet",
    overview: {
      it: "Questa pagina mostra quattro sistemi che ho costruito intorno a un modello linguistico. Uno è un prodotto di Salus in verifica con un cliente, uno pubblica ogni settimana sulla pagina LinkedIn dell'azienda, due sono strumenti miei. Per ciascuno ci sono un esempio vero, i numeri, il codice e cosa non funziona ancora.",
      en: "This page shows four systems I built around a language model. One is a Salus product under verification with a client, one publishes every week on the company's LinkedIn page, two are my own tools. Each comes with a real example, the numbers, the code and what still doesn't work.",
    },
    challenge: {
      it: "Un modello in un prototipo è facile. Dentro un sistema che deve restare prevedibile ci sono risposte fuori formato, dati inventati, regole da rispettare e qualcuno che ne risponde.",
      en: "A model in a prototype is easy. Inside a system that has to stay predictable you get off-format answers, invented data, rules to respect and someone accountable.",
    },
    approach: {
      it: "Il modello propone e il resto del sistema decide: controlli a regole, soglie scritte prima, un nuovo tentativo sul formato, un ramo per quando non c'è niente da fare.",
      en: "The model proposes and the rest of the system decides: rule checks, thresholds written beforehand, one retry on the format, a branch for when there is nothing to do.",
    },
    contributions: {
      it: [
        "Classificazione AI con output a schema rigido e revisione di un operatore (PVLM)",
        "Versioni del prompt provate su decisioni validate, con soglie di promozione",
        "Agente di ricerca, scrittura e pubblicazione su LinkedIn con un runbook",
        "Pipeline di analisi dei siti: Places, Firecrawl, PageSpeed, modello, punteggio",
        "Bot Telegram che trasforma una frase in righe collegate su sei database Notion",
        "Formule e soglie dichiarate nel codice, non nel prompt",
      ],
      en: [
        "AI classification with strict-schema output and operator review (PVLM)",
        "Prompt versions tested on validated decisions, with promotion thresholds",
        "An agent that researches, writes and publishes on LinkedIn from a runbook",
        "A site-analysis pipeline: Places, Firecrawl, PageSpeed, model, score",
        "A Telegram bot turning one sentence into linked rows across six Notion databases",
        "Formulas and thresholds stated in code, not in the prompt",
      ],
    },
    results: {
      it: [
        "Un sistema AI in verifica con un cliente in farmacovigilanza",
        "Due post pubblicati dall'agente sulla pagina LinkedIn di Salus",
        "1.246 righe di TypeScript e 227 di Python, scritte da me",
        "Limiti di ogni sistema scritti accanto a come funziona",
      ],
      en: [
        "An AI system under verification with a pharmacovigilance client",
        "Two posts published by the agent on Salus' LinkedIn page",
        "1,246 lines of TypeScript and 227 of Python, written by me",
        "Each system's limits written next to how it works",
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
    id: "sito-salus",
    index: "06",
    name: "Sito web Salus",
    year: "2026",
    kind: { it: "Sito aziendale", en: "Company website" },
    role: {
      it: "Design e sviluppo front-end · SEO",
      en: "Front-end design and development · SEO",
    },
    summary: {
      it: "Il sito di Salus AI, scritto a mano, con il Med Box in 3D.",
      en: "The Salus AI website, hand-written, with the Med Box in 3D.",
    },
    description: {
      it: "Home, cinque pagine servizio per la ricerca, sezione news e una scena Three.js che scompone lo Smart Med Box mentre si scorre.",
      en: "Home, five search-oriented service pages, a news section and a Three.js scene that explodes the Smart Med Box as you scroll.",
    },
    tags: ["HTML/CSS/JS", "Three.js", "PWA", "SEO", "Cloudflare"],
    href: "https://salus-ai.com",
    accent: "cyan",
    overview: {
      it: "Il sito di Salus AI è la vetrina dell'azienda: spiega i servizi per il settore salute e pharma, mostra lo Smart Med Box e raccoglie i contatti. È scritto in HTML, CSS e JavaScript, senza framework, ed è pubblicato su Cloudflare.",
      en: "The Salus AI website is the company's storefront: it explains the services for health and pharma, shows the Smart Med Box and collects leads. It is written in HTML, CSS and JavaScript with no framework, and published on Cloudflare.",
    },
    challenge: {
      it: "Il sito deve parlare a due pubblici: chi compra software per il pharma e chi cerca un'app o un dispositivo per la salute. Deve caricarsi in fretta, farsi trovare dai motori di ricerca e mostrare un prodotto fisico che sul web non si può toccare.",
      en: "The site has to speak to two audiences: people buying software for pharma and people looking for a health app or device. It has to load fast, be found by search engines and show a physical product that can't be touched on the web.",
    },
    approach: {
      it: "Pagine statiche e nessun passo di build: poco da mantenere e veloci. Una pagina per ogni servizio, con titolo, descrizione e dati strutturati propri. Il box si mostra con una scena Three.js che lo scompone seguendo lo scroll, e il sito è installabile come PWA.",
      en: "Static pages and no build step: little to maintain, and fast. One page per service, each with its own title, description and structured data. The box is shown with a Three.js scene that explodes it along the scroll, and the site is installable as a PWA.",
    },
    contributions: {
      it: [
        "Struttura e navigazione del sito",
        "Cinque pagine servizio con SEO dedicata",
        "Sezione news con sette articoli",
        "Scena 3D dello Smart Med Box (Three.js, glTF)",
        "PWA: manifest e icone",
        "Sitemap, canonical, Open Graph e dati strutturati JSON-LD",
        "Pulizia di asset e CSS",
        "Deploy su Cloudflare",
      ],
      en: [
        "Site structure and navigation",
        "Five service pages with dedicated SEO",
        "News section with seven articles",
        "3D scene of the Smart Med Box (Three.js, glTF)",
        "PWA: manifest and icons",
        "Sitemap, canonicals, Open Graph and JSON-LD structured data",
        "Asset and CSS cleanup",
        "Deployment on Cloudflare",
      ],
    },
    results: {
      it: [
        "Sito pubblicato su salus-ai.com",
        "17 URL in sitemap, di cui cinque pagine servizio",
        "Il box scomposto in 3D, senza un framework",
        "17 commit in undici settimane, dalla prima versione alla pulizia",
      ],
      en: [
        "Site published at salus-ai.com",
        "17 URLs in the sitemap, five of them service pages",
        "The exploded 3D box, with no framework",
        "17 commits in eleven weeks, from first version to cleanup",
      ],
    },
  },
  {
    id: "gestionale-salus",
    index: "07",
    name: "Gestionale interno Salus",
    year: "2026",
    kind: { it: "Strumento interno", en: "Internal tool" },
    role: {
      it: "Architettura · Backend · Dashboard",
      en: "Architecture · Backend · Dashboard",
    },
    summary: {
      it: "Il sistema con cui Salus gestisce clienti, preventivi e ore di lavoro.",
      en: "The system Salus uses to manage clients, quotes and working hours.",
    },
    description: {
      it: "Un'API FastAPI su PostgreSQL e una dashboard Next.js: pipeline di vendita, preventivi con versioni, timesheet e documenti generati dai template.",
      en: "A FastAPI API on PostgreSQL and a Next.js dashboard: sales pipeline, versioned quotes, timesheets and documents generated from templates.",
    },
    tags: ["Next.js", "FastAPI", "PostgreSQL", "TypeScript", "Python", "S3"],
    href: "",
    accent: "violet",
    overview: {
      it: "Il gestionale tiene insieme il lavoro commerciale e operativo di Salus: aziende e contatti, pipeline di vendita, preventivi con versioni, task e timesheet. Si compone di un'API (FastAPI, PostgreSQL) e di una dashboard Next.js che la usa. È uno strumento interno: qui lo descrivo senza mostrare dati.",
      en: "The management system holds together Salus' sales and operations: companies and contacts, a sales pipeline, versioned quotes, tasks and timesheets. It is an API (FastAPI, PostgreSQL) and a Next.js dashboard that uses it. It is an internal tool: here I describe it without showing any data.",
    },
    challenge: {
      it: "Con pochi clienti e due persone che fanno tutto, serviva un posto solo per sapere a che punto è ogni trattativa e quanto costa ogni progetto. I preventivi cambiano spesso durante la trattativa, e ogni versione deve restare consultabile insieme ai suoi documenti.",
      en: "With few clients and two people doing everything, one place was needed to know where each negotiation stands and what each project costs. Quotes change often during a negotiation, and every version has to stay available along with its documents.",
    },
    approach: {
      it: "Un'API REST con SQLAlchemy e PostgreSQL per i dati, separata da una dashboard che non tocca mai il database: il token di servizio resta sul server della dashboard e ogni richiesta passa da un controllo dei permessi per modulo. I preventivi hanno versioni e un flusso di stato. Documenti economici e contratti si generano dai template.",
      en: "A REST API with SQLAlchemy and PostgreSQL for the data, separate from a dashboard that never touches the database: the service token stays on the dashboard's server and every request goes through a per-module permission check. Quotes have versions and a status flow. Economic documents and contracts are generated from templates.",
    },
    contributions: {
      it: [
        "Modello dati e API REST con 12 router",
        "Dashboard Next.js responsive",
        "Preventivi con versioni e flusso fino alla vendita chiusa",
        "Documento economico a 12 fasi e contratto in DOCX",
        "Timesheet, collaboratori e tariffe nel tempo",
        "Permessi per modulo, in sola lettura o in modifica",
        "Caricamento file su S3",
        "Interfaccia in stile liquid glass con sfondo animato",
      ],
      en: [
        "Data model and REST API with 12 routers",
        "Responsive Next.js dashboard",
        "Quotes with versions and a flow through to the closed sale",
        "A 12-phase economic document and a DOCX contract",
        "Timesheets, workers and rates over time",
        "Per-module permissions, read-only or editable",
        "File upload to S3",
        "Liquid-glass interface with an animated background",
      ],
    },
    results: {
      it: [
        "Un posto solo per aziende, trattative, preventivi e ore",
        "Preventivi versionati, con lo storico dei documenti",
        "Documenti economici e contratti generati dai template",
        "Oltre 14.000 righe in 68 commit, in circa tre mesi",
      ],
      en: [
        "One place for companies, negotiations, quotes and hours",
        "Versioned quotes, with a history of documents",
        "Economic documents and contracts generated from templates",
        "Over 14,000 lines in 68 commits, in about three months",
      ],
    },
  },
  {
    id: "app-salus",
    index: "08",
    name: "App Salus",
    year: "2025 — 2026",
    kind: { it: "App mobile", en: "Mobile app" },
    role: {
      it: "Progettazione · Sviluppo · UX",
      en: "Design · Development · UX",
    },
    summary: {
      it: "L'app per pazienti, caregiver, medici e strutture che segue la terapia.",
      en: "The app for patients, caregivers, doctors and facilities that follows the therapy.",
    },
    description: {
      it: "Flutter su Firebase: terapie e promemoria, documenti sanitari con OCR, un assistente AI, abbonamenti e il collegamento con lo Smart Med Box.",
      en: "Flutter on Firebase: therapies and reminders, health documents with OCR, an AI assistant, subscriptions and the link to the Smart Med Box.",
    },
    tags: ["Flutter", "Firebase", "Cloud Functions", "Stripe", "AI"],
    href: "",
    accent: "magenta",
    overview: {
      it: "L'app Salus aiuta a non dimenticare le terapie e a tenere in ordine i documenti sanitari. Si usa in quattro ruoli (paziente, caregiver, medico, struttura), è scritta in Flutter su un backend Firebase e dialoga con lo Smart Med Box. Oggi funziona nei moduli principali; mancano ancora l'analisi comportamentale e un assistente AI completo.",
      en: "The Salus app helps people keep up with their therapies and keep health documents in order. It is used in four roles (patient, caregiver, doctor, facility), is written in Flutter on a Firebase backend and talks to the Smart Med Box. Today it works in its main modules; behavioural analysis and a full AI assistant are still missing.",
    },
    challenge: {
      it: "Chi segue molte terapie, spesso una persona anziana, dimentica le dosi e ha i documenti sparsi. L'app deve restare semplice da usare e intanto gestire quattro ruoli con permessi diversi sui dati sanitari.",
      en: "People on many therapies, often elderly, forget doses and have scattered documents. The app has to stay simple to use while handling four roles with different permissions over health data.",
    },
    approach: {
      it: "Un solo codice Flutter per Android e iOS, con Firebase per accesso, dati in tempo reale e notifiche. Le Cloud Functions tengono fuori dall'app le chiavi di OpenAI e Stripe. L'app è a moduli, da sviluppare e provare uno alla volta, e parla con il box passando dal cloud.",
      en: "A single Flutter codebase for Android and iOS, with Firebase for sign-in, real-time data and notifications. Cloud Functions keep the OpenAI and Stripe keys out of the app. The app is modular, built and tested one module at a time, and talks to the box through the cloud.",
    },
    contributions: {
      it: [
        "Guida tecnica di 69 pagine",
        "Architettura Flutter e Firebase",
        "Ruoli e permessi: paziente, caregiver, medico, struttura",
        "Terapie, farmaci e promemoria",
        "Documenti sanitari con OCR",
        "Assistente AI con RAG",
        "Abbonamenti con Stripe",
        "Collegamento con lo Smart Med Box",
      ],
      en: [
        "A 69-page technical guide",
        "Flutter and Firebase architecture",
        "Roles and permissions: patient, caregiver, doctor, facility",
        "Therapies, medicines and reminders",
        "Health documents with OCR",
        "AI assistant with RAG",
        "Subscriptions with Stripe",
        "Link to the Smart Med Box",
      ],
    },
    results: {
      it: [
        "Software funzionante nei moduli principali",
        "Grafica completa",
        "Fatturazione degli abbonamenti completa",
        "Da fare: analisi comportamentale e assistente AI completo",
      ],
      en: [
        "Software working in its main modules",
        "Complete graphics",
        "Complete subscription billing",
        "To do: behavioural analysis and a full AI assistant",
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
    meta: { it: "Storia completa", en: "The full story" },
    summary: {
      it: "Software su misura per il medicale che finanzia un dispositivo proprio.",
      en: "Custom medical software that funds a device of its own.",
    },
    description: {
      it: "La mia azienda, raccontata in ordine cronologico: il modello, i prodotti, tutti gli ambiti, i numeri e i documenti economici. Dal Med Box con sensori alla piattaforma di farmacovigilanza PVLM.",
      en: "My company, told in chronological order: the model, the products, every domain, the numbers and the economic documents. From the Med Box with sensors to the PVLM pharmacovigilance platform.",
    },
    tags: ["Flutter", "Firebase", "Cloud Functions", "AI", "IoT", "Product"],
    accent: "acid",
    href: "/work/salus-ai",
    cta: { it: "Leggi la storia", en: "Read the story" },
  },
  {
    id: "dev",
    num: "02",
    name: "Dev",
    kind: { it: "Siti & interfacce", en: "Sites & interfaces" },
    meta: { it: "3 progetti", en: "3 projects" },
    summary: {
      it: "Dal front-end 3D al backend e al mobile.",
      en: "From the 3D front end to the backend and mobile.",
    },
    description: {
      it: "Tre progetti in cui conta come sono fatti: il sito di Salus con il Med Box in 3D, il gestionale interno con API e dashboard, e l'app Flutter per i pazienti.",
      en: "Three projects where how they're built is what counts: the Salus website with the Med Box in 3D, the internal management system with API and dashboard, and the Flutter patient app.",
    },
    tags: ["Three.js", "Next.js / React", "FastAPI", "PostgreSQL", "Flutter", "Firebase"],
    accent: "cyan",
    href: "/work/dev",
    cta: { it: "Esplora i progetti", en: "Explore the projects" },
  },
  {
    id: "ai-lab",
    num: "03",
    name: "AI Lab",
    kind: { it: "Sistemi con un LLM dentro", en: "Systems with an LLM inside" },
    meta: { it: "4 sistemi", en: "4 systems" },
    summary: {
      it: "Quattro sistemi che usano un modello linguistico per fare un lavoro vero.",
      en: "Four systems that use a language model to do real work.",
    },
    description: {
      it: "L'AI di PVLM in farmacovigilanza, un agente che pubblica su LinkedIn, un lead agent e un bot che scrive sul CRM. Con schermate, regole, codice e limiti veri.",
      en: "The AI in PVLM for pharmacovigilance, an agent that publishes on LinkedIn, a lead agent and a bot that writes to the CRM. With real screens, rules, code and limits.",
    },
    tags: ["LLM", "Human in the loop", "Structured Output", "Agenti", "Python", "TypeScript"],
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
      it: "Tre progetti in cui conta come sono fatti: il sito di Salus, il gestionale interno e l'app per i pazienti.",
      en: "Three projects where how they are built is what counts: the Salus website, the internal management system and the patient app.",
    },
    accent: "cyan",
    // la pagina Dev legge i suoi contenuti da components/work/dev/data.ts
    entries: [],
  },
  growth: {
    id: "growth",
    label: { it: "Growth", en: "Growth" },
    title: { it: "So far crescere", en: "I can grow it" },
    intro: {
      it: "Progetti in cui conta il risultato commerciale: traffico qualificato, lead, conversioni.",
      en: "Projects where what matters is the commercial result: qualified traffic, leads, conversions.",
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
