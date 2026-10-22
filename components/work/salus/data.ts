/**
 * Contenuti della pagina Salus AI.
 *
 * Fonte: vault aziendale (company/, projects/, products/, decisions/, metrics/).
 * Regole di pubblicazione (concordate con Francesco, 22/10/2026):
 *  - clienti anonimizzati, nessun nome di lead;
 *  - nessun dato di cassa, fattura, pipeline con valori o quote dei soci;
 *  - ogni voce non verificata porta `certainty: "planned" | "estimate"`.
 */

export type LStr = { it: string; en: string };
export type Locale = "it" | "en";

export type Domain =
  | "strategy"
  | "product"
  | "technology"
  | "legal"
  | "sales"
  | "marketing"
  | "operations"
  | "team"
  | "finance";

export const domainOrder: Domain[] = [
  "strategy",
  "product",
  "technology",
  "legal",
  "sales",
  "marketing",
  "operations",
  "team",
  "finance",
];

export const domainLabel: Record<Domain, LStr> = {
  strategy: { it: "Strategia", en: "Strategy" },
  product: { it: "Prodotto", en: "Product" },
  technology: { it: "Tecnologia", en: "Technology" },
  legal: { it: "Legale e compliance", en: "Legal & compliance" },
  sales: { it: "Commerciale", en: "Sales" },
  marketing: { it: "Marketing", en: "Marketing" },
  operations: { it: "Operations", en: "Operations" },
  team: { it: "Team", en: "Team" },
  finance: { it: "Finanza", en: "Finance" },
};

/** fact = verificato · planned = data o impegno già fissato · estimate = stima dei founder */
export type Certainty = "fact" | "planned" | "estimate";

export const certaintyLabel: Record<Certainty, LStr> = {
  fact: { it: "Fatto", en: "Fact" },
  planned: { it: "Previsto", en: "Planned" },
  estimate: { it: "Stima", en: "Estimate" },
};

export type EventState = "done" | "now" | "next";

/** I tre progetti di Salus. Una voce senza progetti riguarda l'azienda nel suo insieme. */
export type ProjectId = "medbox" | "pvlm" | "adherence";

export const projectMeta: Record<ProjectId | "company", { label: LStr; color: string }> = {
  medbox: { label: { it: "Med Box", en: "Med Box" }, color: "#8b5cff" },
  pvlm: { label: { it: "PVLM", en: "PVLM" }, color: "#d4ff36" },
  adherence: { label: { it: "Aderenza", en: "Adherence" }, color: "#34e7e4" },
  company: { label: { it: "Azienda", en: "Company" }, color: "#8a8a99" },
};

export type TimelineEvent = {
  id: string;
  /** Progetti a cui si riferisce la voce; vuoto = tutta l'azienda. */
  projects: ProjectId[];
  year: string;
  /** Etichetta breve della data, così come è nota (non si inventano giorni). */
  when: LStr;
  title: LStr;
  body: LStr;
  domains: Domain[];
  state: EventState;
  certainty: Certainty;
  doc?: DocId;
};

export type DocId = "pvlm-deck" | "medbox-piano";

export const timeline: TimelineEvent[] = [
  {
    id: "idea",
    projects: ["medbox"],
    year: "2024",
    when: { it: "2024", en: "2024" },
    title: { it: "L'idea: l'aderenza terapeutica in un solo sistema", en: "The idea: therapy adherence in a single system" },
    body: {
      it: "Nasce il progetto Salus AI. Un contenitore smart per i farmaci con sensori di peso, un'app e un livello di AI che ricorda le dosi, verifica se sono state prese e raccoglie i documenti sanitari.",
      en: "The Salus AI project begins: a smart medicine container with weight sensors, an app and an AI layer that reminds doses, checks whether they were taken and collects health documents.",
    },
    domains: ["product", "strategy"],
    state: "done",
    certainty: "fact",
  },
  {
    id: "guida",
    projects: ["medbox"],
    year: "2025",
    when: { it: "Giu 2025", en: "Jun 2025" },
    title: { it: "La guida tecnica dell'app", en: "The app's technical guide" },
    body: {
      it: "Si scrive la guida completa del software: app Flutter multipiattaforma, backend serverless su Firebase, quattro ruoli (paziente, caregiver, medico, struttura), assistente AI con RAG e collegamento al dispositivo ESP32.",
      en: "The full software guide is written: cross-platform Flutter app, serverless Firebase backend, four roles (patient, caregiver, doctor, facility), an AI assistant with RAG and the link to the ESP32 device.",
    },
    domains: ["technology", "product"],
    state: "done",
    certainty: "fact",
  },
  {
    id: "costituzione",
    projects: [],
    year: "2025",
    when: { it: "5 set 2025", en: "5 Sep 2025" },
    title: { it: "Nasce Salus AI S.r.l.", en: "Salus AI S.r.l. is founded" },
    body: {
      it: "Costituzione della società a Vergiate (VA). L'oggetto sociale è la piattaforma digitale per l'aderenza terapeutica con un dispositivo fisico proprietario.",
      en: "The company is incorporated in Vergiate (VA). Its registered purpose is a digital platform for therapy adherence with a proprietary physical device.",
    },
    domains: ["legal", "strategy", "team"],
    state: "done",
    certainty: "fact",
  },
  {
    id: "direzione",
    projects: ["medbox", "pvlm"],
    year: "2026",
    when: { it: "Entro lug 2026", en: "By Jul 2026" },
    title: {
      it: "Cambio di direzione: da azienda che vende un box ad azienda di servizi",
      en: "Change of direction: from a company selling a box to a services company",
    },
    body: {
      it: "Salus nasce per vendere un contenitore smart per i farmaci. Costruirlo e distribuirlo richiede capitale che non c'è, e i founder non vogliono cedere quote a investitori. L'azienda diventa una società di servizi: vende sviluppo software su misura nel medicale e con quel margine finanzia il Med Box, che va in pausa.",
      en: "Salus starts out to sell a smart medicine container. Building and distributing it takes capital that isn't there, and the founders don't want to sell equity to investors. The company becomes a services business: it sells custom software development in healthcare and uses that margin to fund the Med Box, which goes on hold.",
    },
    domains: ["strategy", "finance", "product"],
    state: "done",
    certainty: "fact",
  },
  {
    id: "contratto",
    projects: ["pvlm"],
    year: "2026",
    when: { it: "15 lug 2026", en: "15 Jul 2026" },
    title: { it: "Il primo contratto: una piattaforma di farmacovigilanza", en: "First contract: a pharmacovigilance platform" },
    body: {
      it: "Offerta e contratto con una società italiana di servizi di farmacovigilanza per sviluppare PVLM. Sviluppo a corpo in tre tranche più un canone SaaS mensile. Il codice resta di Salus, al cliente va una licenza d'uso.",
      en: "Offer and contract with an Italian pharmacovigilance services company to build PVLM. Fixed-price development in three tranches plus a monthly SaaS fee. The code stays with Salus; the client gets a usage licence.",
    },
    domains: ["sales", "legal", "strategy"],
    state: "done",
    certainty: "fact",
  },
  {
    id: "sviluppo",
    projects: ["pvlm"],
    year: "2026",
    when: { it: "20 lug 2026", en: "20 Jul 2026" },
    title: { it: "Parte lo sviluppo di PVLM", en: "PVLM development starts" },
    body: {
      it: "Dodici fasi in otto settimane: requisiti, architettura, UX, infrastruttura come codice, moduli core e modulo AI, sicurezza, test, validazione CSV e documentazione GxP, rilascio. Sviluppo e lavoro regolatorio li fanno i due founder, senza altre persone.",
      en: "Twelve phases in eight weeks: requirements, architecture, UX, infrastructure as code, core and AI modules, security, testing, CSV validation and GxP documentation, release. The two founders do the development and the regulatory work, with no one else involved.",
    },
    domains: ["product", "technology", "operations", "team"],
    state: "done",
    certainty: "fact",
  },
  {
    id: "ricavo",
    projects: ["pvlm"],
    year: "2026",
    when: { it: "Ago 2026", en: "Aug 2026" },
    title: { it: "Il primo ricavo", en: "First revenue" },
    body: {
      it: "Emessa la fattura di avvio del primo contratto: è il primo ricavo di Salus. Le tranche successive seguono il rilascio e il collaudo.",
      en: "The kick-off invoice of the first contract is issued, Salus' first revenue. The next tranches follow release and acceptance.",
    },
    domains: ["finance", "operations"],
    state: "done",
    certainty: "fact",
  },
  {
    id: "consegna",
    projects: ["pvlm"],
    year: "2026",
    when: { it: "15–20 set 2026", en: "15–20 Sep 2026" },
    title: {
      it: "Sviluppo concluso nei tempi, con la presentazione di PVLM",
      en: "Development finished on time, with the PVLM presentation",
    },
    body: {
      it: "La finestra contrattuale è rispettata, senza slittamenti, e il collaudo iniziale è superato. Il 20 settembre esce il deck di undici slide in ambiente demo con dati dimostrativi: dall'alert al file consegnato, con i controlli e la tracciabilità che servono in ispezione. Resta la verifica in condizioni reali con il cliente.",
      en: "The contractual window is met, with no slippage, and the first acceptance test is passed. On 20 September the eleven-slide deck follows, on a demo environment with demonstration data: from alert to delivered file, with the controls and traceability an inspection needs. Verification in real conditions with the client remains.",
    },
    domains: ["operations", "product", "marketing", "sales"],
    state: "done",
    certainty: "fact",
    doc: "pvlm-deck",
  },
  {
    id: "piano",
    projects: ["medbox"],
    year: "2026",
    when: { it: "Rev. 10.0", en: "Rev. 10.0" },
    title: { it: "Il piano di industrializzazione del Med Box", en: "The Med Box industrialisation plan" },
    body: {
      it: "Revisione 10.0, definitiva: tre fasi industriali (300, 1.500, oltre 5.000 unità), distinta base e costo unitario per fase, flussi di cassa e strategia normativa.",
      en: "Revision 10.0, final: three industrial phases (300, 1,500, 5,000+ units), bill of materials and unit cost per phase, cash flows and regulatory strategy.",
    },
    domains: ["finance", "operations", "legal"],
    state: "done",
    certainty: "fact",
    doc: "medbox-piano",
  },
  {
    id: "aderenza",
    projects: ["adherence"],
    year: "2026",
    when: { it: "Entro set 2026", en: "By Sep 2026" },
    title: { it: "La piattaforma di aderenza esce sul mercato", en: "The adherence platform goes to market" },
    body: {
      it: "Salus propone una piattaforma di aderenza terapeutica a due aziende del settore salute: app paziente, promemoria, assistente AI su contenuti validati, dati aggregati. Il ricavato di queste commesse serve a finanziare il Med Box.",
      en: "Salus offers a therapy-adherence platform to two health-sector companies: patient app, reminders, an AI assistant on validated content, aggregated data. Revenue from these projects funds the Med Box.",
    },
    domains: ["sales", "product", "strategy"],
    state: "done",
    certainty: "fact",
  },
  {
    id: "firma",
    projects: ["adherence"],
    year: "2026",
    when: { it: "Nov 2026", en: "Nov 2026" },
    title: { it: "Firma attesa della piattaforma di aderenza", en: "Adherence platform signing expected" },
    body: {
      it: "Con un'azienda farmaceutica internazionale. La data è già slittata una volta, quindi resta una stima. Se arriva, lo sviluppo dell'app va da febbraio a marzo 2027.",
      en: "With an international pharmaceutical company. The date has already slipped once, so it stays an estimate. If it lands, app development runs February to March 2027.",
    },
    domains: ["sales", "strategy"],
    state: "next",
    certainty: "estimate",
  },
  {
    id: "esercizio",
    projects: ["pvlm"],
    year: "2027",
    when: { it: "1 gen 2027", en: "1 Jan 2027" },
    title: { it: "PVLM in esercizio, parte il canone", en: "PVLM goes live, the fee starts" },
    body: {
      it: "Messa in esercizio e decorrenza del canone mensile del SaaS. Dal 2027 i servizi hanno anche un ricavo ricorrente e non solo i ricavi a progetto.",
      en: "Go-live and start of the monthly SaaS fee. From 2027 services also have recurring revenue, not only project revenue.",
    },
    domains: ["operations", "finance"],
    state: "next",
    certainty: "planned",
  },
  {
    id: "ripartenza",
    projects: ["medbox"],
    year: "2028",
    when: { it: "Inizio 2028", en: "Early 2028" },
    title: { it: "Riparte il Med Box", en: "The Med Box restarts" },
    body: {
      it: "Con circa 250.000 € accantonati dai servizi si riprende lo sviluppo: assemblaggio del prototipo, analisi comportamentale, assistente AI completo. Serviranno anche persone da pagare, di cui numero e profili non sono ancora definiti. È un orizzonte, non una data: prima non ha senso ripartire.",
      en: "With about €250,000 set aside from services, development resumes: prototype assembly, behavioural analysis, a full AI assistant. It will also need paid staff, with numbers and profiles not yet defined. It is a horizon, not a date: restarting earlier makes no sense.",
    },
    domains: ["strategy", "product", "finance", "team"],
    state: "next",
    certainty: "estimate",
  },
  {
    id: "scala",
    projects: ["medbox"],
    year: "Dopo",
    when: { it: "Dopo la ripartenza", en: "After the restart" },
    title: { it: "Pilota, lancio, scala", en: "Pilot, launch, scale" },
    body: {
      it: "Pilota da 300 unità in stampa 3D, lancio fino a 1.500 con stampo a iniezione, poi lotti da oltre 5.000. Per completare e distribuire servono 500.000–1.000.000 €. La strategia normativa (Classe I al lancio, Classe IIa poi) non è ancora decisa.",
      en: "A 300-unit 3D-printed pilot, launch up to 1,500 with injection tooling, then batches of 5,000+. Completing and distributing takes €500,000–1,000,000. The regulatory route (Class I at launch, Class IIa later) is not decided yet.",
    },
    domains: ["product", "operations", "legal", "finance"],
    state: "next",
    certainty: "estimate",
  },
];

/* ------------------------------------------------------------------ *
 *  Ambiti
 * ------------------------------------------------------------------ */

export const domainCards: Record<Domain, { lead: LStr; points: { it: string[]; en: string[] } }> = {
  strategy: {
    lead: {
      it: "Un'azienda di servizi che finanzia un proprio prodotto, senza investitori.",
      en: "A services company that funds its own product, with no investors.",
    },
    points: {
      it: [
        "I servizi generano cassa, il Med Box la consuma: due flussi che non si sommano.",
        "Il margine conta più del fatturato. Un progetto grande a margine basso finanzia il prodotto meno di uno piccolo e redditizio.",
        "Posizionamento dichiarato dai founder: una startup piccola, veloce ed economica, senza strati di burocrazia.",
      ],
      en: [
        "Services generate cash, the Med Box consumes it: two flows that never add up.",
        "Margin matters more than revenue. A large low-margin project funds the product less than a small profitable one.",
        "Positioning as the founders put it: a small, fast, affordable startup with no layers of bureaucracy.",
      ],
    },
  },
  product: {
    lead: { it: "Tre prodotti a stadi diversi.", en: "Three products at different stages." },
    points: {
      it: [
        "PVLM, monitoraggio della letteratura per la farmacovigilanza: sviluppo concluso.",
        "Piattaforma di aderenza terapeutica: app paziente da personalizzare su un farmaco o su una linea di prodotti.",
        "Smart Med Box: contenitore da comodino a 9 scomparti con sensori di peso, prototipo in pausa.",
      ],
      en: [
        "PVLM, literature monitoring for pharmacovigilance: development complete.",
        "Therapy-adherence platform: patient app tailored to a drug or a product line.",
        "Smart Med Box: bedside container with 9 compartments and weight sensors, prototype on hold.",
      ],
    },
  },
  technology: {
    lead: { it: "Dal firmware al cloud, scritto in casa.", en: "From firmware to cloud, built in-house." },
    points: {
      it: [
        "App Flutter multipiattaforma con backend Firebase e Cloud Functions.",
        "Firmware C/C++ su ESP32 con FreeRTOS, nove celle di carico con amplificatori HX711, aggiornamento OTA.",
        "PVLM: PostgreSQL con row-level security, registro delle attività append-only, infrastruttura come codice con Terraform, MFA.",
        "AI con output a schema rigido, prompt versionati e un operatore che valida. Nell'app un assistente RAG sui documenti dell'utente.",
      ],
      en: [
        "Cross-platform Flutter app with a Firebase and Cloud Functions backend.",
        "C/C++ firmware on ESP32 with FreeRTOS, nine load cells with HX711 amplifiers, OTA updates.",
        "PVLM: PostgreSQL with row-level security, append-only activity log, infrastructure as code with Terraform, MFA.",
        "AI with strict-schema output, versioned prompts and a human validator. In the app, a RAG assistant over the user's documents.",
      ],
    },
  },
  legal: {
    lead: {
      it: "Dati sanitari e software regolato: la compliance fa parte del prodotto.",
      en: "Health data and regulated software: compliance is part of the product.",
    },
    points: {
      it: [
        "Startup innovativa iscritta al Registro delle imprese dall'11 settembre 2025.",
        "Validazione dei sistemi computerizzati (CSV) e documentazione GxP: GAMP 5, EU GMP Annex 11, 21 CFR Part 11, ALCOA+, GVP, GDPR.",
        "Nel primo contratto il cliente paga lo sviluppo, ma codice, modelli e configurazioni restano di Salus. Al cliente va una licenza d'uso in SaaS.",
        "Med Box: percorso verso il dispositivo medico, con Classe I come wellness al lancio e Classe IIa dopo. Da decidere.",
      ],
      en: [
        "Innovative startup on the Business Register since 11 September 2025.",
        "Computer system validation (CSV) and GxP documentation: GAMP 5, EU GMP Annex 11, 21 CFR Part 11, ALCOA+, GVP, GDPR.",
        "In the first contract the client pays for development, but code, models and configurations stay with Salus. The client gets a SaaS usage licence.",
        "Med Box: path to a medical device, Class I as wellness at launch and Class IIa later. Still to be decided.",
      ],
    },
  },
  sales: {
    lead: {
      it: "Aziende del settore salute che hanno bisogno di software attorno al loro prodotto.",
      en: "Health-sector companies that need software around their product.",
    },
    points: {
      it: [
        "Primo cliente: società italiana di farmacovigilanza, contratto firmato a luglio 2026.",
        "Piattaforma di aderenza proposta a due aziende del settore salute, una trattativa avanzata ancora aperta.",
        "Progetti tipici da circa 10.000 a circa 100.000 €. È un ordine di grandezza su pochi casi.",
        "Canali in costruzione: rete commerciale nel mondo farmaceutico, intermediari, rete istituzionale di settore.",
      ],
      en: [
        "First client: an Italian pharmacovigilance company, contract signed July 2026.",
        "Adherence platform offered to two health-sector companies, one advanced negotiation still open.",
        "Typical projects run from about €10,000 to about €100,000. That is an order of magnitude on very few cases.",
        "Channels under construction: a commercial network in pharma, intermediaries, a sector institutional network.",
      ],
    },
  },
  marketing: {
    lead: {
      it: "Posizionamento e materiali per chi compra software regolato.",
      en: "Positioning and materials for buyers of regulated software.",
    },
    points: {
      it: [
        "Deck dimostrativo di PVLM con ambiente demo e dati dimostrativi.",
        "Identità visiva Salus AI, sito di presentazione e comunicazione B2C del Med Box per pazienti, famiglie e caregiver.",
        "Gruppi di lavoro e desk di settore su terapie digitali e startup innovative, usati come canale di visibilità.",
      ],
      en: [
        "A demo-environment PVLM deck with demonstration data.",
        "Salus AI visual identity, presentation site and B2C communication for patients, families and caregivers.",
        "Sector working groups and desks on digital therapeutics and innovative startups, used for visibility.",
      ],
    },
  },
  operations: {
    lead: {
      it: "Due persone che fanno tutto, con processi da azienda regolata.",
      en: "Two people doing everything, with the processes of a regulated company.",
    },
    points: {
      it: [
        "I due founder sviluppano il software e seguono tecnica e regolatorio sui progetti clienti.",
        "Contratti a milestone, con collaudo su caso reale in parallelo al processo manuale e un massimo di due cicli di taratura.",
        "Primo progetto consegnato in otto settimane, nella finestra prevista.",
        "Ambienti separati e costi cloud e AI misurati contro il canone.",
      ],
      en: [
        "The two founders write the software and handle technical and regulatory work on client projects.",
        "Milestone-based contracts, with a real-case acceptance test run alongside the manual process and at most two tuning cycles.",
        "First project delivered in eight weeks, inside the planned window.",
        "Separate environments, with cloud and AI costs measured against the fee.",
      ],
    },
  },
  team: {
    lead: { it: "Due founder operativi, una rete attorno.", en: "Two operating founders, a network around them." },
    points: {
      it: [
        "Francesco Caro e Lorenzo Fiore sono co-founder. Non hanno aree assegnate: coprono insieme prodotto, sviluppo, commerciale e amministrazione.",
        "Lorenzo Fiore è anche amministratore unico.",
        "Intorno a loro una rete commerciale nel farmaceutico e advisor, senza ruoli operativi.",
      ],
      en: [
        "Francesco Caro and Lorenzo Fiore are co-founders. They have no assigned areas: together they cover product, development, sales and administration.",
        "Lorenzo Fiore is also sole director.",
        "Around them, a commercial network in pharma and advisors, with no operating roles.",
      ],
    },
  },
  finance: {
    lead: {
      it: "Autofinanziamento: nessun capitale esterno, la cassa cresce con i progetti.",
      en: "Self-funding: no outside capital, cash grows with the projects.",
    },
    points: {
      it: [
        "Ricavi da sviluppo a progetto e, dal 2027, da canoni SaaS ricorrenti.",
        "Soglie del Med Box: circa 250.000 € per ripartire, 500.000–1.000.000 € per completare e distribuire. Sono stime dei founder.",
        "Piano di industrializzazione: 18.350 € per 300 unità pilota, circa 88.100 € cumulati fino a 1.800 unità.",
      ],
      en: [
        "Revenue from project development and, from 2027, recurring SaaS fees.",
        "Med Box thresholds: about €250,000 to restart, €500,000–1,000,000 to complete and distribute. These are founder estimates.",
        "Industrialisation plan: €18,350 for 300 pilot units, about €88,100 cumulative up to 1,800 units.",
      ],
    },
  },
};

/* ------------------------------------------------------------------ *
 *  Economia — dal piano di industrializzazione rev. 10.0
 * ------------------------------------------------------------------ */

export type Phase = {
  id: "p1" | "p2" | "p3";
  name: LStr;
  units: LStr;
  /** Costo per unità, in €, scomposto. Somma = TCO. */
  parts: { electronics: number; body: number; assembly: number; logistics: number; amortisation: number };
};

export const phases: Phase[] = [
  {
    id: "p1",
    name: { it: "Fase 1 · Pilota", en: "Phase 1 · Pilot" },
    units: { it: "300 unità · stampa 3D in resina", en: "300 units · resin 3D print" },
    parts: { electronics: 18, body: 17, assembly: 2, logistics: 7.5, amortisation: 15 },
  },
  {
    id: "p2",
    name: { it: "Fase 2 · Lancio", en: "Phase 2 · Launch" },
    units: { it: "1.500 unità · stampo a iniezione", en: "1,500 units · injection mould" },
    parts: { electronics: 15, body: 10, assembly: 1.5, logistics: 6, amortisation: 13.33 },
  },
  {
    id: "p3",
    name: { it: "Fase 3 · Scala", en: "Phase 3 · Scale" },
    units: { it: "oltre 5.000 unità · stampo già ammortizzato", en: "5,000+ units · mould already amortised" },
    parts: { electronics: 12, body: 6.6, assembly: 1, logistics: 5.5, amortisation: 0 },
  },
];

export const costPartLabel: Record<keyof Phase["parts"], LStr> = {
  electronics: { it: "Elettronica (scheda, ESP32, batteria, ADC)", en: "Electronics (board, ESP32, battery, ADC)" },
  body: { it: "Meccanica e involucro", en: "Mechanics and enclosure" },
  assembly: { it: "Assemblaggio e taratura", en: "Assembly and calibration" },
  logistics: { it: "Spedizione e ultimo miglio", en: "Shipping and last mile" },
  amortisation: { it: "Ammortamento (ingegneria, stampi, certificazioni)", en: "Amortisation (engineering, tooling, certification)" },
};

export type CashStep = {
  label: LStr;
  /** Uscita di cassa cumulata, in €. */
  cumulative: number;
  /** Unità consegnate cumulate. */
  units: number;
  phase: Phase["id"];
};

export const cashSteps: CashStep[] = [
  { label: { it: "Setup ingegneria e dima", en: "Engineering setup and jig" }, cumulative: 5000, units: 0, phase: "p1" },
  { label: { it: "Produzione pilota", en: "Pilot production" }, cumulative: 18350, units: 300, phase: "p1" },
  { label: { it: "Prove CE/EMC", en: "CE/EMC lab tests" }, cumulative: 24350, units: 300, phase: "p2" },
  { label: { it: "Stampi a iniezione", en: "Injection tooling" }, cumulative: 39350, units: 300, phase: "p2" },
  { label: { it: "Produzione lancio", en: "Launch production" }, cumulative: 88100, units: 1800, phase: "p2" },
  { label: { it: "Lotto scala 1", en: "Scale batch 1" }, cumulative: 213600, units: 6800, phase: "p3" },
  { label: { it: "Lotto scala 2", en: "Scale batch 2" }, cumulative: 339100, units: 11800, phase: "p3" },
];

/* ------------------------------------------------------------------ *
 *  Prodotti
 * ------------------------------------------------------------------ */

export const pvlmSteps: LStr[] = [
  { it: "Acquisizione", en: "Ingestion" },
  { it: "Parsing", en: "Parsing" },
  { it: "Proposta AI", en: "AI proposal" },
  { it: "Controlli a regole", en: "Rule checks" },
  { it: "Revisione operatore", en: "Operator review" },
  { it: "Export", en: "Export" },
];

export const docs: {
  id: DocId;
  kind: LStr;
  title: LStr;
  note: LStr;
  pages: number;
  ratio: "landscape" | "portrait";
  folder: string;
  pdf: string;
  size: string;
}[] = [
  {
    id: "pvlm-deck",
    kind: { it: "Presentazione", en: "Presentation" },
    title: {
      it: "PVLM · literature monitoring per la farmacovigilanza",
      en: "PVLM · literature monitoring for pharmacovigilance",
    },
    note: {
      it: "Flusso operativo, controlli e tracciabilità. Ambiente demo con dati dimostrativi.",
      en: "Operating flow, controls and traceability. Demo environment with demonstration data.",
    },
    pages: 11,
    ratio: "landscape",
    folder: "/salus/docs/pvlm-deck",
    pdf: "/salus/docs/salus-pvlm-presentazione.pdf",
    size: "2,9 MB",
  },
  {
    id: "medbox-piano",
    kind: { it: "Documento economico", en: "Economic document" },
    title: {
      it: "Med Box · piano di industrializzazione e flussi di cassa",
      en: "Med Box · industrialisation plan and cash flows",
    },
    note: {
      it: "Revisione 10.0. Ingegnerizzazione, distinta base, strategia normativa e piano di cassa in tre fasi.",
      en: "Revision 10.0. Engineering, bill of materials, regulatory strategy and a three-phase cash plan.",
    },
    pages: 7,
    ratio: "portrait",
    folder: "/salus/docs/medbox-piano",
    pdf: "/salus/docs/salus-medbox-piano-industrializzazione.pdf",
    size: "136 KB",
  },
];
