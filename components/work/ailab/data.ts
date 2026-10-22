/**
 * Contenuti della pagina AI Lab.
 *
 * Tutto viene da file veri: il deck di PVLM (dati dimostrativi), il runbook e gli output
 * dell'automazione LinkedIn, il codice di lead-agent (TypeScript) e dello script del task manager.
 * Le righe di codice sono estratti, accorciati dove indicato; non sono ricostruzioni.
 * Nessuna chiave, nessun dato di cliente.
 */

export type LStr = { it: string; en: string };
export type LArr = { it: string[]; en: string[] };

export type CaseId = "pvlm" | "linkedin" | "lead" | "task";

export type CaseData = {
  id: CaseId;
  n: string;
  name: string;
  kind: LStr;
  status: LStr;
  when: LStr;
  color: string;
  problem: LStr;
  flow: { title: LStr; note: LStr }[];
  numbers: { value: string; label: LStr }[];
  limits: LArr;
};

export const cases: CaseData[] = [
  /* ------------------------------ PVLM ------------------------------ */
  {
    id: "pvlm",
    n: "01",
    name: "PVLM",
    kind: { it: "AI in farmacovigilanza", en: "AI in pharmacovigilance" },
    status: { it: "In verifica con il cliente", en: "Under client verification" },
    when: { it: "Lug — Set 2026", en: "Jul — Sep 2026" },
    color: "#d4ff36",
    problem: {
      it: "Una società di farmacovigilanza riceve ogni settimana un alert per ogni principio attivo, legge gli abstract uno per uno e compila un Excel diverso per ogni azienda farmaceutica. L'AI propone un verdetto per ogni articolo. A decidere resta una persona, e tutto deve reggere a un'ispezione.",
      en: "A pharmacovigilance company gets a weekly alert for every active substance, reads the abstracts one by one and fills in a different Excel file for every pharma company. The AI proposes a verdict for each article. A person still decides, and everything has to hold up in an inspection.",
    },
    flow: [
      { title: { it: "Acquisizione", en: "Ingestion" }, note: { it: "Alert Embase e PubMed archiviati non modificabili; mittenti non autorizzati scartati.", en: "Embase and PubMed alerts archived unmodifiable; unauthorised senders discarded." } },
      { title: { it: "Parsing", en: "Parsing" }, note: { it: "Titolo, autori, abstract, DOI. Se il conteggio degli articoli non torna, l'errore è visibile: non si procede in silenzio.", en: "Title, authors, abstract, DOI. If the article count doesn't match, the error is visible: no silent continuing." } },
      { title: { it: "Proposta AI", en: "AI proposal" }, note: { it: "Verdetto, confidenza e motivazione strutturata sui criteri del prodotto. Il prompt è versionato.", en: "Verdict, confidence and a structured rationale on the product's criteria. The prompt is versioned." } },
      { title: { it: "Controlli a regole", en: "Rule checks" }, note: { it: "Verifiche deterministiche dopo l'AI: esito incoerente con i dati di sicurezza, paese fuori perimetro, principio attivo non trovato, confidenza bassa.", en: "Deterministic checks after the AI: outcome inconsistent with safety data, country out of scope, active substance not found, low confidence." } },
      { title: { it: "Revisione", en: "Review" }, note: { it: "L'operatore conferma o corregge uno per uno, mai in blocco. Ogni correzione richiede un motivo.", en: "The operator confirms or corrects one by one, never in bulk. Every correction needs a reason." } },
      { title: { it: "Export", en: "Export" }, note: { it: "Excel nel formato del cliente, solo a lotto interamente approvato. Ogni export è numerato e porta un hash SHA-256.", en: "Excel in the client's format, only once the whole batch is approved. Every export is numbered and carries a SHA-256 hash." } },
    ],
    numbers: [
      { value: "326", label: { it: "articoli valutati nel dataset dimostrativo", en: "articles assessed in the demo dataset" } },
      { value: "7,0%", label: { it: "proposte corrette da una persona (17 su 242 revisionate)", en: "proposals corrected by a person (17 of 242 reviewed)" } },
      { value: "204", label: { it: "decisioni validate su cui si prova ogni prompt", en: "validated decisions every prompt is tested on" } },
      { value: "20/20", label: { it: "campione ri-verificato da un'altra persona, ultimo trimestre", en: "sample re-checked by a different person, last quarter" } },
    ],
    limits: {
      it: [
        "I numeri vengono da un ambiente dimostrativo con dati dimostrativi, non da dati del cliente.",
        "Lo sviluppo è concluso e il collaudo iniziale è superato; la verifica in condizioni reali con il cliente è in corso e il sign-off formale non c'è ancora.",
        "Il codice è di Salus e non è pubblico: qui si vedono le schermate del deck e le regole, non i sorgenti.",
      ],
      en: [
        "The numbers come from a demo environment with demonstration data, not client data.",
        "Development is complete and the first acceptance test is passed; verification in real conditions with the client is under way and formal sign-off isn't in yet.",
        "The code belongs to Salus and isn't public: what you see here is the deck's screens and the rules, not the source.",
      ],
    },
  },

  /* ----------------------------- LinkedIn ----------------------------- */
  {
    id: "linkedin",
    n: "02",
    name: "Post LinkedIn automatico",
    kind: { it: "Agente con ricerca, scrittura e pubblicazione", en: "Agent that researches, writes and publishes" },
    status: { it: "In uso: 2 post pubblicati", en: "In use: 2 posts published" },
    when: { it: "Da agosto 2026", en: "Since August 2026" },
    color: "#34e7e4",
    problem: {
      it: "La pagina LinkedIn di Salus ha bisogno di un post a settimana su una notizia vera del settore, scritto nel tono del sito e senza inventare niente. Farlo a mano costa mezza giornata. L'agente cerca la notizia, la verifica, scrive il testo, prepara l'immagine e pubblica dalla pagina, dove il runbook dice che non deve fermarsi a chiedere conferme.",
      en: "Salus' LinkedIn page needs one post a week on a real industry story, written in the site's voice with nothing made up. Doing it by hand takes half a day. The agent finds the story, checks it, writes the text, prepares the image and publishes from the page, with a runbook that says it must not stop to ask for confirmation.",
    },
    flow: [
      { title: { it: "Ricerca", en: "Research" }, note: { it: "15–20 ricerche su quattro assi (settore, AI pharma, regolatorio, mercato Italia/UE), almeno 10 candidati.", en: "15–20 searches across four axes (sector, AI pharma, regulation, Italy/EU market), at least 10 candidates." } },
      { title: { it: "Filtro", en: "Filter" }, note: { it: "L'evento deve cadere entro 8 giorni. Il fatto centrale su almeno due fonti indipendenti, o su una fonte primaria.", en: "The event must fall within 8 days. The central fact on at least two independent sources, or a primary one." } },
      { title: { it: "Testo", en: "Copy" }, note: { it: "Al massimo il 30% sulla notizia, almeno il 60% su Salus, con un servizio nominato e dettagli presi dal profilo aziendale.", en: "At most 30% on the news, at least 60% on Salus, with one service named and details taken from the company profile." } },
      { title: { it: "Immagine", en: "Image" }, note: { it: "Foto da Unsplash con la parola chiave scelta dall'agente, template 1080×1080 con i colori del marchio.", en: "Unsplash photo with the keyword chosen by the agent, a 1080×1080 template in the brand colours." } },
      { title: { it: "Pubblicazione", en: "Publishing" }, note: { it: "Dal browser, sulla pagina LinkedIn di Salus, con Claude in Chrome. Poi verifica che il post sia comparso.", en: "From the browser, on Salus' LinkedIn page, via Claude in Chrome. Then it checks the post appeared." } },
      { title: { it: "Registro", en: "Log" }, note: { it: "Storico dei post e notizie già usate, per non ripetere i temi.", en: "History of posts and used stories, so themes don't repeat." } },
    ],
    numbers: [
      { value: "2", label: { it: "post pubblicati: 8 settembre e 9 ottobre 2026", en: "posts published: 8 September and 9 October 2026" } },
      { value: "14", label: { it: "candidati valutati con un punteggio nel run di settembre", en: "candidates scored in the September run" } },
      { value: "8", label: { it: "giorni: finestra massima tra l'evento e il post", en: "days: the maximum gap between the event and the post" } },
      { value: "6", label: { it: "passaggi nel runbook, con due rami di uscita", en: "steps in the runbook, with two exit branches" } },
    ],
    limits: {
      it: [
        "Se non trova una notizia recente e verificata, o una foto adatta, non pubblica: scrive una nota in un file (NEEDS_MANUAL) e avvisa.",
        "Il run del 9 ottobre è stato fatto in modalità interattiva e con 9 ricerche invece delle 15–20 previste. Il file dei candidati lo dice.",
        "Una notizia scelta dall'agente è stata scartata a mano: il post non doveva toccare il tema della responsabilità.",
        "Funziona solo con Chrome aperto e già collegato a LinkedIn: la pubblicazione passa dal browser, non da un'API.",
      ],
      en: [
        "If it can't find a recent, verified story or a suitable photo, it doesn't publish: it writes a note to a file (NEEDS_MANUAL) and notifies.",
        "The 9 October run was done interactively, with 9 searches instead of the planned 15–20. The candidates file says so.",
        "One story picked by the agent was dropped by hand: the post wasn't supposed to touch the topic of accountability.",
        "It only works with Chrome open and already signed in to LinkedIn: publishing goes through the browser, not an API.",
      ],
    },
  },

  /* ------------------------------ Lead agent ------------------------------ */
  {
    id: "lead",
    n: "03",
    name: "Lead agent",
    kind: { it: "Strumento da riga di comando", en: "Command-line tool" },
    status: { it: "Strumento personale", en: "Personal tool" },
    when: { it: "2026", en: "2026" },
    color: "#ff2d8e",
    problem: {
      it: "Per proporre un lavoro a una piccola attività locale serve arrivare con qualcosa di specifico, non con una mail generica. L'agente cerca le attività, legge il loro sito, misura la velocità da telefono e scrive un mini-audit con una bozza di email. Non invia niente: salva tutto su un foglio.",
      en: "To offer work to a small local business you need to arrive with something specific, not a generic email. The agent finds businesses, reads their site, measures mobile speed and writes a mini-audit with a draft email. It sends nothing: it saves everything to a sheet.",
    },
    flow: [
      { title: { it: "Google Places", en: "Google Places" }, note: { it: "Cerca per query («dentisti Varese») e tiene solo chi ha un sito e un rating decente.", en: "Searches by query (“dentists Varese”) and keeps only those with a website and a decent rating." } },
      { title: { it: "Firecrawl", en: "Firecrawl" }, note: { it: "Legge le pagine del sito e ne ricava il testo. L'email si estrae con codice, non con il modello.", en: "Reads the site's pages and extracts the text. The email is extracted by code, not by the model." } },
      { title: { it: "PageSpeed", en: "PageSpeed" }, note: { it: "Prestazioni, accessibilità, SEO e buone pratiche, misurate da mobile.", en: "Performance, accessibility, SEO and best practices, measured on mobile." } },
      { title: { it: "Modello", en: "Model" }, note: { it: "GPT-4o-mini restituisce quattro punteggi, i problemi principali, un mini-audit e una bozza di email, in JSON.", en: "GPT-4o-mini returns four scores, the main problems, a mini-audit and a draft email, as JSON." } },
      { title: { it: "Punteggio", en: "Score" }, note: { it: "Una formula con pesi fissi trasforma i quattro punteggi in un'opportunità da 0 a 100 e in una priorità.", en: "A formula with fixed weights turns the four scores into an opportunity from 0 to 100 and a priority." } },
      { title: { it: "Foglio", en: "Sheet" }, note: { it: "Ogni attività diventa una riga di un Google Sheet, con stato OK, parziale o errore.", en: "Each business becomes a row in a Google Sheet, with status OK, partial or error." } },
    ],
    numbers: [
      { value: "1.246", label: { it: "righe di TypeScript in 11 file", en: "lines of TypeScript in 11 files" } },
      { value: "4", label: { it: "punteggi da 0 a 100 per ogni attività", en: "scores from 0 to 100 for each business" } },
      { value: "75 / 55", label: { it: "soglie per priorità alta e media", en: "thresholds for high and medium priority" } },
      { value: "1", label: { it: "nuovo tentativo se il JSON del modello non è valido", en: "retry if the model's JSON is invalid" } },
    ],
    limits: {
      it: [
        "Qui non ci sono dati di aziende vere: sono nomi di persone e attività reali, non si pubblicano. Il calcolatore sotto usa la formula vera con valori che scegli tu.",
        "I quattro punteggi sono una stima del modello. La formula li pesa, non li verifica.",
        "L'agente non contatta nessuno: la bozza di email resta in un foglio e la decide una persona.",
      ],
      en: [
        "There is no data from real businesses here: they are real people's and companies' names, so they aren't published. The calculator below uses the real formula with values you choose.",
        "The four scores are the model's estimate. The formula weighs them, it doesn't verify them.",
        "The agent contacts no one: the draft email stays in a sheet and a person decides.",
      ],
    },
  },

  /* ------------------------------ Task manager ------------------------------ */
  {
    id: "task",
    n: "04",
    name: "Task manager su Telegram",
    kind: { it: "Bot che scrive su Notion", en: "Bot that writes to Notion" },
    status: { it: "Script funzionante", en: "Working script" },
    when: { it: "Marzo 2026", en: "March 2026" },
    color: "#8b5cff",
    problem: {
      it: "Il CRM di Salus è fatto di sei database Notion collegati tra loro. Aggiungere un task a un contatto di un'azienda vuol dire aprirne tre. Il bot permette di scrivere una frase a Telegram e lascia al modello il compito di capire cosa creare, e al codice quello di trovare o creare le righe giuste.",
      en: "Salus' CRM is six linked Notion databases. Adding a task for a contact at a company means opening three of them. The bot lets you write one sentence on Telegram and leaves it to the model to work out what to create, and to the code to find or create the right rows.",
    },
    flow: [
      { title: { it: "Messaggio", en: "Message" }, note: { it: "Una frase libera inviata al bot su Telegram.", en: "A free sentence sent to the bot on Telegram." } },
      { title: { it: "Intento", en: "Intent" }, note: { it: "Una sola chiamata a Gemini 2.5 Flash, con risposta in JSON forzato: una di cinque azioni più i campi estratti.", en: "A single call to Gemini 2.5 Flash, with forced JSON: one of five actions plus the extracted fields." } },
      { title: { it: "Ricerca", en: "Lookup" }, note: { it: "Il codice cerca l'azienda, il contatto e il membro del team su Notion. Se l'azienda o il contatto non esistono, li crea.", en: "The code looks up the company, contact and team member in Notion. If the company or contact doesn't exist, it creates them." } },
      { title: { it: "Scrittura", en: "Write" }, note: { it: "Crea la riga nel database giusto con i collegamenti. Per le chiamate aggiunge una pagina modello con obiettivi, appunti e prossimi passi.", en: "Creates the row in the right database with the relations. For calls it adds a template page with goals, notes and next steps." } },
      { title: { it: "Risposta", en: "Reply" }, note: { it: "Il bot risponde con l'esito, o con il codice d'errore di Notion.", en: "The bot replies with the outcome, or with Notion's error code." } },
    ],
    numbers: [
      { value: "227", label: { it: "righe di Python in un solo file", en: "lines of Python in one file" } },
      { value: "5", label: { it: "azioni riconosciute: task, contatto, azienda, opportunità, documento", en: "recognised actions: task, contact, company, opportunity, document" } },
      { value: "6", label: { it: "database Notion collegati", en: "linked Notion databases" } },
      { value: "1", label: { it: "chiamata al modello per ogni messaggio", en: "model call per message" } },
    ],
    limits: {
      it: [
        "Se Gemini restituisce un JSON non valido il bot risponde con un errore e non riprova.",
        "I nomi si cercano con «contiene» e si prende il primo risultato: due aziende dal nome simile si possono confondere.",
        "Il bot scrive subito, senza chiedere conferma.",
        "Gli esempi qui sotto sono costruiti da me con nomi inventati. La forma dell'output è quella che il prompt vero richiede.",
      ],
      en: [
        "If Gemini returns invalid JSON the bot replies with an error and doesn't retry.",
        "Names are searched with “contains” and the first result is taken: two companies with similar names can get mixed up.",
        "The bot writes straight away, without asking for confirmation.",
        "The examples below are built by me with made-up names. The shape of the output is what the real prompt asks for.",
      ],
    },
  },
];

/* ------------------------------- PVLM ------------------------------- */

export const pvlmSlides: { src: string; caption: LStr }[] = [
  {
    src: "/salus/docs/pvlm-deck/p-05.webp",
    caption: {
      it: "Dashboard e coda di revisione: volumi, code e qualità in una schermata. Le proposte a bassa confidenza stanno in cima.",
      en: "Dashboard and review queue: volumes, queues and quality in one screen. Low-confidence proposals sit at the top.",
    },
  },
  {
    src: "/salus/docs/pvlm-deck/p-06.webp",
    caption: {
      it: "Revisione: l'articolo a sinistra, la proposta dell'AI a destra con esito, confidenza e motivazione. Ogni correzione richiede un motivo.",
      en: "Review: the article on the left, the AI proposal on the right with outcome, confidence and rationale. Every correction needs a reason.",
    },
  },
  {
    src: "/salus/docs/pvlm-deck/p-08.webp",
    caption: {
      it: "Qualità misurata e tracciabilità: proposta contro decisione finale, export con versione e hash, registro delle attività non modificabile.",
      en: "Measured quality and traceability: proposal against final decision, export with version and hash, an unmodifiable activity log.",
    },
  },
];

export const pvlmVersions: {
  version: string;
  state: LStr;
  accuracy: number;
  recall: number;
  passed: boolean;
  note: LStr;
}[] = [
  {
    version: "v1",
    state: { it: "In produzione", en: "In production" },
    accuracy: 92.6,
    recall: 89.7,
    passed: false,
    note: { it: "Base di partenza. L'accuratezza più alta, ma il recall sul PSUR è sotto la soglia.", en: "The starting point. The highest accuracy, but PSUR recall is below the threshold." },
  },
  {
    version: "v2",
    state: { it: "Approvata", en: "Approved" },
    accuracy: 91.1,
    recall: 97.4,
    passed: true,
    note: { it: "Scope del cliente riformulato come passo di chiusura. Supera entrambe le soglie.", en: "Client scope reworded as a closing step. Passes both thresholds." },
  },
  {
    version: "v3",
    state: { it: "Bozza", en: "Draft" },
    accuracy: 88.2,
    recall: 92.1,
    passed: false,
    note: { it: "Stesso trattamento esteso alla regola del nome commerciale. Peggiora e non passa.", en: "The same treatment extended to the brand-name rule. It gets worse and fails." },
  },
];

export const PVLM_THRESHOLDS = { accuracy: 90, recall: 95 };

/* ------------------------------ LinkedIn ------------------------------ */

export const linkedinCandidates: {
  id: string;
  title: LStr;
  date: string;
  inWindow: boolean;
  outcome: "chosen" | "dropped" | "out";
  note: LStr;
}[] = [
  {
    id: "C1",
    title: { it: "WHO/Europe: il progresso dell'AI in sanità si misura dalla governance", en: "WHO/Europe: progress on health AI is measured by governance" },
    date: "1 set",
    inWindow: true,
    outcome: "dropped",
    note: { it: "Punteggio massimo. Scelta al primo giro, poi scartata a mano: il post non doveva toccare il tema della responsabilità.", en: "Top score. Picked first, then dropped by hand: the post wasn't to touch accountability." },
  },
  {
    id: "C2",
    title: { it: "Thyme Care raccoglie oltre 125 M$, valutazione oltre 2 miliardi", en: "Thyme Care raises over $125M, valuation above $2bn" },
    date: "2 set",
    inWindow: true,
    outcome: "chosen",
    note: { it: "Tre fonti (CNBC, Fierce, MedCity). Angolo: programmi di supporto al paziente.", en: "Three sources (CNBC, Fierce, MedCity). Angle: patient support programmes." },
  },
  {
    id: "C3",
    title: { it: "Strolll raccoglie 5 M€ per terapie digitali in realtà aumentata", en: "Strolll raises €5M for AR digital therapeutics" },
    date: "5 set",
    inWindow: true,
    outcome: "dropped",
    note: { it: "In shortlist. Round piccolo, prodotto di nicchia.", en: "Shortlisted. Small round, niche product." },
  },
  {
    id: "C5",
    title: { it: "Onalabs raccoglie 9,3 M€ per il monitoraggio non invasivo dal sudore", en: "Onalabs raises €9.3M for non-invasive sweat monitoring" },
    date: "7 ago",
    inWindow: false,
    outcome: "out",
    note: { it: "Ottima pertinenza, ma l'evento è di inizio agosto: un riepilogo l'aveva datato per errore a settembre. Scartata per data.", en: "Excellent fit, but the event is from early August: a roundup misdated it to September. Dropped on date." },
  },
  {
    id: "C7",
    title: { it: "Frazier Healthcare Partners acquisisce MatrixCare", en: "Frazier Healthcare Partners acquires MatrixCare" },
    date: "2 set",
    inWindow: true,
    outcome: "dropped",
    note: { it: "Operazione di private equity su software gestionale: poco legata ai pazienti.", en: "A private-equity deal on management software: little to do with patients." },
  },
  {
    id: "C12",
    title: { it: "Oura deposita per la quotazione in borsa", en: "Oura files for an IPO" },
    date: "4 set",
    inWindow: true,
    outcome: "dropped",
    note: { it: "Wearable per consumatori: non pertinente.", en: "Consumer wearable: not relevant." },
  },
];

export const linkedinPosts: {
  date: LStr;
  image: string;
  url: string;
  text: LStr;
}[] = [
  {
    date: { it: "8 settembre 2026", en: "8 September 2026" },
    image: "/ailab/linkedin-2026-09-08.webp",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7503045555124600832/",
    text: {
      it: "Thyme Care ha appena raccolto oltre 125 milioni di dollari. Fa una cosa sola: sta dietro ai pazienti oncologici tra una visita e l'altra — li chiama, ricorda le terapie, avvisa il medico quando qualcosa non va.\n\nNon è un farmaco e non è un dispositivo. È software. E il mercato lo valuta 2 miliardi.\n\nSalusAI costruisce lo stesso tipo di software. Quando un'azienda farmaceutica avvia un programma di assistenza per chi prende un suo farmaco, SalusAI sviluppa l'app e il sistema dietro: il paziente firma i consensi dal telefono, riceve i promemoria della dose, e quando salta una dose un dispositivo connesso lo rileva e avvisa chi lo assiste.",
      en: "Thyme Care has just raised over $125 million. It does one thing: it stays behind oncology patients between visits — it calls them, reminds them of therapies, alerts the doctor when something is off.\n\nIt's not a drug and not a device. It's software. And the market values it at $2 billion.\n\nSalusAI builds the same kind of software. When a pharma company starts a support programme for people taking its drug, SalusAI builds the app and the system behind it: the patient signs consents from the phone, gets dose reminders, and when a dose is skipped a connected device detects it and alerts whoever cares for them.",
    },
  },
  {
    date: { it: "9 ottobre 2026", en: "9 October 2026" },
    image: "/ailab/linkedin-2026-10-09.webp",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7514297977071525888/",
    text: {
      it: "Negli Stati Uniti 32 deputati hanno chiesto a Medicare, la sanità pubblica per gli anziani, di ripensare una regola sul monitoraggio a distanza dei pazienti.\n\nLa proposta per il 2027 pagherebbe il servizio solo se lo svolge personale dipendente dello studio medico, non quello di un fornitore esterno.\n\nChi debba gestirlo è una discussione americana. Sotto c'è una domanda che vale ovunque: cosa succede al dato tra l'apparecchio che lo misura e la persona che deve agire?",
      en: "In the United States, 32 lawmakers have asked Medicare, the public health programme for older people, to rethink a rule on remote patient monitoring.\n\nThe 2027 proposal would only pay for the service if it is run by the medical practice's own staff, not by an outside vendor.\n\nWho should run it is an American debate. Underneath is a question that holds everywhere: what happens to the data between the device that measures it and the person who has to act?",
    },
  },
];

/** Dal runbook (PIPELINE.md), «Regole non negoziabili». Estratto. */
export const linkedinRules: string[] = [
  "## Regole non negoziabili",
  "",
  "1. Recency: l'EVENTO della notizia deve cadere entro 8 giorni da oggi.",
  "   Filtro rigido: se è più vecchio, si scarta (non si \"penalizza\").",
  "2. Bilanciamento copy: ≤30% notizia, ≥60% Salus. Almeno un servizio",
  "   nominato per nome + 2-3 dettagli concreti presi da salus-context.md.",
  "3. Niente pubblicazione forzata: se non c'è una notizia pertinente entro",
  "   8 giorni, oppure non c'è una foto adatta → ramo NEEDS_MANUAL:",
  "   non pubblicare, avvisa, fermati.",
  "5. Ogni affermazione su Salus deve essere riconducibile a salus-context.md.",
  "   Niente dati inventati (clienti, numeri, percentuali).",
];

/* ------------------------------ Lead agent ------------------------------ */

export const leadWeights: { key: "businessValue" | "websitePain" | "activity" | "contactability"; label: LStr; weight: number; initial: number }[] = [
  { key: "businessValue", label: { it: "Valore commerciale del settore", en: "Commercial value of the sector" }, weight: 0.3, initial: 70 },
  { key: "websitePain", label: { it: "Quanto il sito è un problema", en: "How much the site is a problem" }, weight: 0.35, initial: 80 },
  { key: "activity", label: { it: "Segnali di attività recente", en: "Signs of recent activity" }, weight: 0.2, initial: 60 },
  { key: "contactability", label: { it: "Facilità di contatto", en: "Ease of contact" }, weight: 0.15, initial: 50 },
];

export type Snippet = { file: string; caption: LStr; lines: string[]; /** testo lungo: va a capo invece di scorrere di lato */ wrap?: boolean };

export const leadSnippets: Snippet[] = [
  {
    file: "src/scoring.ts",
    caption: { it: "La formula e le soglie. Estratto, tipi omessi.", en: "The formula and thresholds. Excerpt, types omitted." },
    lines: [
      "export function computeOpportunityScore(scores) {",
      "  const raw =",
      "    scores.businessValueScore * 0.3 +",
      "    scores.websitePainScore * 0.35 +",
      "    scores.activityScore * 0.2 +",
      "    scores.contactabilityScore * 0.15;",
      "  return clamp(raw, 0, 100);",
      "}",
      "",
      "export function computePriority(score) {",
      '  if (score >= 75) return "HIGH";',
      '  if (score >= 55) return "MEDIUM";',
      '  return "LOW";',
      "}",
      "",
      "// Email comes from deterministic extraction, not LLM",
      'const contactEmail = firecrawl?.contactEmail ?? "";',
    ],
  },
  {
    file: "src/llmAnalyze.ts",
    caption: { it: "Le regole del prompt. Estratto.", en: "The prompt's rules. Excerpt." },
    wrap: true,
    lines: [
      "REGOLE FONDAMENTALI:",
      "- Restituisci SOLO JSON valido. Niente markdown, niente backtick.",
      "- Non inventare dati, problemi o metriche non supportati dai dati forniti.",
      '- Non usare frasi vaghe come "migliorare la presenza online"',
      '  o "sito poco professionale".',
      "- Ogni problema deve essere specifico e derivare dai dati reali del sito.",
      "- Se un dato manca (PageSpeed fallito, sito non scrapato), ragiona con",
      "  i dati disponibili e abbassa gli score di conseguenza.",
    ],
  },
  {
    file: "src/llmAnalyze.ts",
    caption: { it: "Cosa succede se il modello sbaglia il formato. Estratto.", en: "What happens if the model gets the format wrong. Excerpt." },
    lines: [
      "let parsed = safeJsonParse<LlmOutput>(raw);",
      "if (!parsed) {",
      "  // Single retry: ask LLM to fix its JSON",
      "  const retried = await callLlm(fixMessage);",
      "  parsed = safeJsonParse<LlmOutput>(retried);",
      "  if (!parsed) {",
      '    throw new Error("LLM returned invalid JSON after retry");',
      "  }",
      "}",
    ],
  },
];

/* ------------------------------ Task manager ------------------------------ */

export const taskExamples: {
  message: LStr;
  json: string[];
  writes: LStr[];
}[] = [
  {
    message: {
      it: "Ricordami di chiamare Marco Bianchi di Acme Pharma giovedì alle 15, priorità alta, assegna a Francesco",
      en: "Remind me to call Marco Bianchi at Acme Pharma on Thursday at 3pm, high priority, assign to Francesco",
    },
    json: [
      "{",
      '  "azione": "NEW_TASK",',
      '  "titolo": "Chiamare Marco Bianchi",',
      '  "azienda": "Acme Pharma",',
      '  "contatto": "Marco Bianchi",',
      '  "membro_team": "Francesco",',
      '  "scadenza": "2026-03-26T15:00:00+01:00",',
      '  "priorita": "Alta",',
      '  "tipo_task": "Call"',
      "}",
    ],
    writes: [
      { it: "Aziende: cerca «Acme Pharma», la crea se non c'è", en: "Companies: looks up “Acme Pharma”, creates it if missing" },
      { it: "Contatti: cerca «Marco Bianchi», lo crea e lo collega all'azienda", en: "Contacts: looks up “Marco Bianchi”, creates and links him to the company" },
      { it: "Team: cerca «Francesco»", en: "Team: looks up “Francesco”" },
      { it: "Task: crea la riga con scadenza, priorità, contatto e team", en: "Tasks: creates the row with due date, priority, contact and team" },
      { it: "Pagina del task: aggiunge obiettivi, appunti e prossimi passi (è una chiamata)", en: "Task page: adds goals, notes and next steps (it is a call)" },
    ],
  },
  {
    message: {
      it: "Nuovo contatto: Laura Verdi, responsabile marketing di Farmacia Centrale, laura.verdi@example.com",
      en: "New contact: Laura Verdi, marketing manager at Farmacia Centrale, laura.verdi@example.com",
    },
    json: [
      "{",
      '  "azione": "NEW_CONTACT",',
      '  "nome_completo": "Laura Verdi",',
      '  "azienda": "Farmacia Centrale",',
      '  "email": "laura.verdi@example.com",',
      '  "telefono": null,',
      '  "ruolo": "Responsabile marketing"',
      "}",
    ],
    writes: [
      { it: "Aziende: cerca «Farmacia Centrale», la crea se non c'è", en: "Companies: looks up “Farmacia Centrale”, creates it if missing" },
      { it: "Contatti: crea «Laura Verdi» con email e ruolo, collegata all'azienda", en: "Contacts: creates “Laura Verdi” with email and role, linked to the company" },
    ],
  },
  {
    message: {
      it: "Opportunità sito web per Studio Rossi, 4500 euro",
      en: "Website opportunity for Studio Rossi, 4500 euros",
    },
    json: [
      "{",
      '  "azione": "NEW_OPPORTUNITY",',
      '  "titolo": "Sito web",',
      '  "azienda": "Studio Rossi",',
      '  "valore_euro": 4500',
      "}",
    ],
    writes: [
      { it: "Aziende: cerca «Studio Rossi», la crea se non c'è", en: "Companies: looks up “Studio Rossi”, creates it if missing" },
      { it: "Opportunità: crea «Sito web» con valore 4.500 € collegata all'azienda", en: "Opportunities: creates “Website” worth €4,500 linked to the company" },
    ],
  },
];

export const taskSnippets: Snippet[] = [
  {
    file: "Salus.py · analyze_intent",
    caption: { it: "L'unica chiamata al modello: cinque azioni possibili, JSON forzato. Estratto.", en: "The only model call: five possible actions, forced JSON. Excerpt." },
    wrap: true,
    lines: [
      'La chiave "azione" deve essere una tra: NEW_TASK, NEW_CONTACT,',
      "NEW_COMPANY, NEW_OPPORTUNITY, NEW_DOCUMENT.",
      "",
      'Metti null per i campi non menzionati. Se il task è una telefonata,',
      'videocall o riunione, imposta "tipo_task" a "Call".',
      "",
      "payload = {",
      '    "contents": [{"parts": [{"text": prompt}]}],',
      '    "generationConfig": {"response_mime_type": "application/json"}',
      "}",
    ],
  },
  {
    file: "Salus.py · push_to_notion",
    caption: { it: "Trova o crea l'azienda e il contatto, poi li collega. Estratto, accorciato.", en: "Finds or creates the company and the contact, then links them. Excerpt, shortened." },
    lines: [
      'azienda_id = find_id(DB["AZIENDE"], nome_azienda)',
      "if not azienda_id:",
      "    # crea l'azienda se non esiste",
      '    res_az = requests.post(url, json=payload_az, headers=headers).json()',
      '    if "id" in res_az: azienda_id = res_az["id"]',
      "",
      'contatto_id = find_id(DB["CONTATTI"], nome_contatto)',
      "if contatto_id and azienda_id:",
      "    # collega il contatto all'azienda",
      "    requests.patch(patch_url, json=patch_payload, headers=headers)",
    ],
  },
];

/* ------------------------------- chiusura ------------------------------- */

export const lessons: { title: LStr; body: LStr }[] = [
  {
    title: { it: "Il modello propone, il codice e una persona decidono", en: "The model proposes, code and a person decide" },
    body: {
      it: "In PVLM la proposta passa da controlli a regole e dalla revisione di un operatore. Nel lead agent la formula pesa i punteggi e l'email la estrae il codice.",
      en: "In PVLM the proposal goes through rule checks and an operator's review. In the lead agent a formula weighs the scores and the email is extracted by code.",
    },
  },
  {
    title: { it: "Una soglia vale più di una media", en: "A threshold beats an average" },
    body: {
      it: "La v1 aveva l'accuratezza più alta e non è stata promossa, perché il recall era sotto il 95%. La promozione dipende da soglie fissate, non da una media.",
      en: "v1 had the highest accuracy and wasn't promoted, because recall was under 95%. Promotion depends on fixed thresholds, not on an average.",
    },
  },
  {
    title: { it: "Saper non fare niente", en: "Knowing when to do nothing" },
    body: {
      it: "L'agente di LinkedIn ha un ramo apposta per quando non trova una notizia recente e verificata: non pubblica e lo dice.",
      en: "The LinkedIn agent has a branch for when it can't find a recent, verified story: it doesn't publish, and says so.",
    },
  },
  {
    title: { it: "Il formato sbagliato si ritenta una volta", en: "A wrong format gets one retry" },
    body: {
      it: "Il lead agent chiede al modello di correggere il proprio JSON e poi si ferma. Il bot di Telegram invece non riprova: è un limite che conosco.",
      en: "The lead agent asks the model to fix its own JSON and then stops. The Telegram bot doesn't retry: a limit I know about.",
    },
  },
];
