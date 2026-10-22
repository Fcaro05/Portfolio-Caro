import type { LStr } from "./data";

/**
 * Le tre campagne Meta di CMA come flussi separati. Ognuna ha una persona diversa da convincere,
 * quindi un angolo, un tono e un percorso diversi. Fonti: gli annunci, la guida alla landing Fotona,
 * il documento di passaggio sul tracciamento e i testi delle landing.
 */

export type FlowId = "fotona" | "crio" | "nightlase";
export type AdFormat = "feed" | "square" | "story" | "reel" | "wide";

export const formatInfo: Record<AdFormat, { label: LStr; ratio: string; r: number; note: LStr }> = {
  feed: { label: { it: "Feed", en: "Feed" }, ratio: "4:5", r: 4 / 5, note: { it: "Nel feed di Facebook e Instagram: il formato che occupa più schermo senza tagli.", en: "In the Facebook and Instagram feed: the format that fills the most screen without cropping." } },
  square: { label: { it: "Quadrato", en: "Square" }, ratio: "1:1", r: 1, note: { it: "Il formato base del feed: titolo, prove e invito devono stare tutti in un quadrato.", en: "The feed's base format: headline, proofs and call all have to fit in a square." } },
  story: { label: { it: "Story", en: "Story" }, ratio: "9:16", r: 9 / 16, note: { it: "A schermo intero. Titolo e invito stanno lontano dai bordi, dove l'interfaccia li coprirebbe.", en: "Full screen. Headline and call sit away from the edges, where the interface would cover them." } },
  reel: { label: { it: "Reel", en: "Reel" }, ratio: "9:16", r: 9 / 16, note: { it: "Stessa verticale, con la composizione adattata a come si legge un reel.", en: "The same vertical, with the composition adapted to how a reel is read." } },
  wide: { label: { it: "Orizzontale", en: "Landscape" }, ratio: "1,91:1", r: 1.91, note: { it: "Per i posizionamenti orizzontali: il messaggio deve reggere anche in una striscia bassa.", en: "For landscape placements: the message has to hold in a short strip." } },
};

export type Ad = {
  id: string;
  name: LStr;
  headline: LStr;
  note: LStr;
  images: Partial<Record<AdFormat, string>>;
};

export type StrategyRow = { label: LStr; text: LStr };

export type Flow = {
  id: FlowId;
  n: string;
  name: LStr;
  treatment: LStr;
  when: LStr;
  color: string;
  /** una frase che riassume l'angolo: serve nel selettore */
  angle: LStr;
  /** come suona la campagna, in due parole */
  tone: LStr;
  status: LStr;
  strategy: StrategyRow[];
  ads: Ad[];
  path: { title: string; sub: LStr }[];
  pathNotes: LStr[];
  landing?: {
    image: string;
    caption: LStr;
    chosen: StrategyRow[];
  };
  noLanding?: LStr;
};

export const flows: Flow[] = [
  {
    id: "fotona",
    n: "01",
    name: { it: "Fotona SMOOTH", en: "Fotona SMOOTH" },
    treatment: { it: "Ginecologia rigenerativa", en: "Regenerative gynaecology" },
    when: { it: "Settembre 2026", en: "September 2026" },
    color: "#3fb8a8",
    angle: {
      it: "Dire ad alta voce quello che nessuna dice, e farlo dire a una specialista.",
      en: "Say out loud what no one says, and have a specialist say it.",
    },
    tone: { it: "Delicato, in forma di domanda", en: "Gentle, as a question" },
    status: { it: "In corso · landing nuova pronta, annunci ancora sulla precedente", en: "Running · new landing ready, ads still on the previous one" },
    strategy: [
      {
        label: { it: "A chi parla", en: "Who it speaks to" },
        text: { it: "A donne che convivono con perdite urinarie o con secchezza e dolore nei rapporti, spesso senza averne mai parlato.", en: "To women living with urinary leaks or with dryness and pain in intimacy, often without ever having talked about it." },
      },
      {
        label: { it: "Cosa provano", en: "What they feel" },
        text: { it: "Perdita di autonomia («mappare i bagni» ogni volta che si esce), perdita di intimità e la sensazione di essere invisibili, di sentirsi dire «a una certa età è normale».", en: "Loss of autonomy (“mapping the bathrooms” whenever they go out), loss of intimacy and the feeling of being invisible, of being told “at a certain age it's normal”." },
      },
      {
        label: { it: "L'angolo", en: "The angle" },
        text: { it: "Un tabù si scioglie nominandolo. Il titolo dice il sintomo con parole normali («ti bloccano?»), poi arriva la speranza: una soluzione non chirurgica.", en: "A taboo dissolves when you name it. The headline says the symptom in plain words (“do they hold you back?”), then comes hope: a non-surgical solution." },
      },
      {
        label: { it: "L'ostacolo da togliere", en: "The obstacle to remove" },
        text: { it: "«Farà male?»: la parola laser fa pensare a bruciature e chirurgia. Le prove sono tre parole (delicata, indolore, efficace) e un volto.", en: "“Will it hurt?”: the word laser suggests burns and surgery. The proofs are three words (gentle, painless, effective) and a face." },
      },
      {
        label: { it: "Cosa lo rende credibile", en: "What makes it credible" },
        text: { it: "Niente testimonianze né foto prima e dopo. Contano la specialista che parla in prima persona, la competenza dichiarata e il protocollo spiegato.", en: "No testimonials, no before-and-after photos. What counts is the specialist speaking in the first person, the stated expertise and the protocol explained." },
      },
      {
        label: { it: "L'invito", en: "The call" },
        text: { it: "Una visita specialistica gratuita: il primo passo costa zero e non impegna.", en: "A free specialist visit: the first step costs nothing and commits to nothing." },
      },
    ],
    ads: [
      {
        id: "a1",
        name: { it: "Variante 1 · movimento", en: "Variant 1 · movement" },
        headline: { it: "L'atrofia intima e l'incontinenza urinaria ti bloccano?", en: "Do intimate atrophy and urinary incontinence hold you back?" },
        note: { it: "Una donna in movimento tra i ciliegi in fiore: la libertà che torna, non il sintomo.", en: "A woman in motion among cherry blossoms: freedom returning, not the symptom." },
        images: {
          feed: "/growth/ads/a1-feed.webp",
          story: "/growth/ads/a1-story.webp",
          reel: "/growth/ads/a1-reel.webp",
          wide: "/growth/ads/a1-wide.webp",
        },
      },
      {
        id: "a2",
        name: { it: "Variante 2 · ritratto", en: "Variant 2 · portrait" },
        headline: { it: "L'atrofia intima e l'incontinenza urinaria ti bloccano?", en: "Do intimate atrophy and urinary incontinence hold you back?" },
        note: { it: "Stesso titolo, un ritratto in primo piano: qui cambia solo la leva visiva.", en: "Same headline, a close-up portrait: only the visual lever changes." },
        images: {
          feed: "/growth/ads/a2-feed.webp",
          story: "/growth/ads/a2-story.webp",
          reel: "/growth/ads/a2-reel.webp",
          wide: "/growth/ads/a2-wide.webp",
        },
      },
      {
        id: "a3",
        name: { it: "Variante 3 · altro sintomo", en: "Variant 3 · other symptom" },
        headline: { it: "Dolore e difficoltà nei rapporti intimi ti bloccano?", en: "Do pain and difficulty in intimate relations hold you back?" },
        note: { it: "Un altro punto di ingresso: l'intimità invece dell'incontinenza, con un'immagine simbolica e discreta.", en: "Another way in: intimacy instead of incontinence, with a symbolic, discreet image." },
        images: {
          feed: "/growth/ads/a3-feed.webp",
          story: "/growth/ads/a3-story.webp",
          reel: "/growth/ads/a3-reel.webp",
        },
      },
      {
        id: "nuovo",
        name: { it: "Creatività nuova · speranza", en: "New creative · hope" },
        headline: { it: "Incontinenza e secchezza possono avere una soluzione.", en: "Incontinence and dryness can have a solution." },
        note: { it: "Non più una domanda: un'affermazione. Il centro è la conversazione tra specialista e paziente.", en: "No longer a question: a statement. The centre is the conversation between specialist and patient." },
        images: {
          square: "/growth/ads/fotona-nuovo.webp",
          story: "/growth/ads/fotona-nuovo-v.webp",
        },
      },
    ],
    path: [
      { title: "Annuncio", sub: { it: "Immagine in 4 formati, più due video", en: "Image in 4 formats, plus two videos" } },
      { title: "Landing", sub: { it: "Video della specialista e modulo", en: "Specialist's video and form" } },
      { title: "Apps Script", sub: { it: "Un solo script, un modulo", en: "One script, one form" } },
      { title: "Uscite", sub: { it: "Tab FOTONA SMOOTH · email · Meta", en: "FOTONA SMOOTH tab · email · Meta" } },
    ],
    pathNotes: [
      { it: "È il flusso dove ho tolto il pixel e mandato il contatto a Meta dal server (caso più sotto).", en: "This is the flow where I removed the pixel and sent the lead to Meta from the server (case below)." },
      { it: "La landing nuova è online su un sottodominio dedicato; gli annunci puntano ancora a quella precedente e il cambio è rimandato su richiesta del cliente.", en: "The new landing is online on a dedicated subdomain; the ads still point to the previous one and the switch is postponed at the client's request." },
    ],
    landing: {
      image: "/growth/landing/fotona.webp",
      caption: { it: "Landing Fotona, pagina intera", en: "Fotona landing, full page" },
      chosen: [
        { label: { it: "Prima cosa che si vede", en: "First thing you see" }, text: { it: "Il titolo sul problema («Soffri di problemi di incontinenza o di secchezza vaginale?») e il video della specialista, senza scorrere.", en: "The headline on the problem (“Do you suffer from incontinence or vaginal dryness?”) and the specialist's video, without scrolling." } },
        { label: { it: "Cosa sostituisce le recensioni", en: "What replaces reviews" }, text: { it: "Un dato in evidenza, i motivi per affidarsi (specialiste, protocollo indolore, ripresa immediata), una sezione «Non sei sola» e le domande frequenti.", en: "A highlighted figure, the reasons to trust (specialists, painless protocol, immediate return), a “You're not alone” section and the FAQ." } },
        { label: { it: "Il modulo", en: "The form" }, text: { it: "Nome, email, telefono e fascia oraria preferita, più il consenso. Ci sono due moduli con gli stessi campi, uno per desktop e uno per mobile.", en: "Name, email, phone and preferred time slot, plus consent. There are two forms with the same fields, one for desktop and one for mobile." } },
      ],
    },
  },
  {
    id: "crio",
    n: "02",
    name: { it: "Criolipolisi", en: "Cryolipolysis" },
    treatment: { it: "Medicina estetica", en: "Aesthetic medicine" },
    when: { it: "Agosto 2026", en: "August 2026" },
    color: "#4c9bea",
    angle: {
      it: "Non si risolve un disagio: si offre un cambiamento senza il prezzo della chirurgia.",
      en: "It doesn't solve a discomfort: it offers a change without the price of surgery.",
    },
    tone: { it: "Concreto, orientato al desiderio", en: "Concrete, desire-led" },
    status: { it: "Landing online dal 13 ottobre · l'indirizzo degli annunci è da cambiare", en: "Landing online since 13 October · the ads' address is yet to be changed" },
    strategy: [
      {
        label: { it: "A chi parla", en: "Who it speaks to" },
        text: { it: "A chi ha un accumulo di grasso in una zona precisa (glutei, fianchi, addome, cosce, braccia) e vorrebbe intervenire, ma non vuole la chirurgia.", en: "To people with fat in a specific area (glutes, hips, abdomen, thighs, arms) who would like to act but don't want surgery." },
      },
      {
        label: { it: "Cosa provano", en: "What they feel" },
        text: { it: "Non un dolore ma un desiderio: cambiare una zona precisa del corpo. Il freno è l'idea di dover passare da un intervento.", en: "Not a pain but a wish: to change a specific area of the body. The brake is the idea of having to go through an operation." },
      },
      {
        label: { it: "L'angolo", en: "The angle" },
        text: { it: "«Senza chirurgia» è la promessa, e sta nel titolo, in colore diverso dal resto. Il titolo è una domanda di desiderio («Vuoi liberarti…?»), non di disagio.", en: "“Without surgery” is the promise, and sits in the headline, in a different colour from the rest. The headline is a question of desire (“Want to get rid of…?”), not of discomfort." } },
      {
        label: { it: "L'ostacolo da togliere", en: "The obstacle to remove" },
        text: { it: "«Funziona davvero e mi costa tempo?». Una frase spiega il meccanismo (raffreddamento controllato sulle cellule adipose) e tre prove rispondono: mirato, non invasivo, nessun tempo di recupero.", en: "“Does it really work and will it cost me time?”. One sentence explains the mechanism (controlled cooling on fat cells) and three proofs answer: targeted, non-invasive, no recovery time." },
      },
      {
        label: { it: "Cosa lo rende credibile", en: "What makes it credible" },
        text: { it: "Il macchinario in azione: l'immagine mostra come funziona. Sulla landing, il trattamento è spiegato come non invasivo, a basse temperature, eseguito da un massoterapista esperto.", en: "The device in action: the image shows how it works. On the landing, the treatment is explained as non-invasive, at low temperatures, performed by an experienced massage therapist." },
      },
      {
        label: { it: "L'invito", en: "The call" },
        text: { it: "Una prima valutazione gratuita: non si vende il trattamento, si vende il primo colloquio.", en: "A free first assessment: you don't sell the treatment, you sell the first conversation." },
      },
    ],
    ads: [
      {
        id: "crio",
        name: { it: "Criolipolisi · senza chirurgia", en: "Cryolipolysis · no surgery" },
        headline: { it: "Vuoi liberarti del grasso localizzato senza chirurgia?", en: "Want to get rid of localised fat without surgery?" },
        note: { it: "Il macchinario sul corpo e le tre prove in icona: tutto quello che serve a capire in due secondi.", en: "The device on the body and the three proofs as icons: all you need to understand in two seconds." },
        images: { square: "/growth/ads/crio.webp", story: "/growth/ads/crio-v.webp" },
      },
    ],
    path: [
      { title: "Annuncio", sub: { it: "Quadrato e verticale", en: "Square and vertical" } },
      { title: "Landing", sub: { it: "Blu, la prima valutazione al centro", en: "Blue, the first assessment at the centre" } },
      { title: "Apps Script", sub: { it: "Stesso script, chiave criolipolisi", en: "Same script, criolipolisi key" } },
      { title: "Uscite", sub: { it: "Tab CRIOLIPOLISI · email · Meta", en: "CRIOLIPOLISI tab · email · Meta" } },
    ],
    pathNotes: [
      { it: "Il modulo manda con il contatto una chiave di campagna: lo script la usa per scegliere il tab e il tab nasce al primo contatto. Provato dal sito pubblico con dati di prova.", en: "The form sends a campaign key with the lead: the script uses it to choose the tab, and the tab is created at the first lead. Tested from the public site with test data." },
      { it: "Per Meta l'evento è lo stesso Lead di Fotona: lo attribuisce alla campagna dell'annuncio cliccato, perciò non serve una conversione personalizzata per pagina.", en: "To Meta the event is the same Lead as Fotona's: it attributes it to the campaign of the ad clicked, so no custom conversion per page is needed." },
    ],
    landing: {
      image: "/growth/landing/criolipolisi.webp",
      caption: { it: "Landing criolipolisi, pagina intera", en: "Cryolipolysis landing, full page" },
      chosen: [
        { label: { it: "La promessa della pagina", en: "The page's promise" }, text: { it: "Il titolo non vende il trattamento ma la valutazione: «Prima valutazione di criolipolisi gratuita», con tre parole sotto: gratuita, senza impegno, su misura.", en: "The headline doesn't sell the treatment but the assessment: “Free first cryolipolysis assessment”, with three words underneath: free, no commitment, tailored." } },
        { label: { it: "Cosa succede dopo", en: "What happens next" }, text: { it: "Una sezione spiega la prima valutazione in cinque punti (ascolto, valutazione, spiegazione, ciclo di sedute, nessun obbligo) per togliere l'ansia del «poi cosa mi chiedono».", en: "A section explains the first assessment in five points (listening, assessment, explanation, cycle of sessions, no obligation) to remove the worry of “what will they ask of me”." } },
        { label: { it: "Una scelta di immagini", en: "An image choice" }, text: { it: "Palette blu, foto di spa e relax, apparecchiatura e ghiaccio azzurro. Ho evitato foto di corpi in biancheria o con il metro: la pagina non deve far leva sull'imbarazzo per il corpo.", en: "Blue palette, spa and relaxation photos, equipment and blue ice. I avoided photos of bodies in underwear or with a tape measure: the page must not lean on body shame." } },
      ],
    },
  },
  {
    id: "nightlase",
    n: "03",
    name: { it: "NightLase", en: "NightLase" },
    treatment: { it: "Russamento", en: "Snoring" },
    when: { it: "Settembre 2026", en: "September 2026" },
    color: "#7c83ff",
    angle: {
      it: "Il problema non è di uno solo: nella stessa riga si parla a chi russa e a chi dorme accanto.",
      en: "The problem isn't one person's: the same line speaks to the snorer and to the one sleeping beside.",
    },
    tone: { it: "Diretto, quasi ironico", en: "Direct, almost wry" },
    status: { it: "Campagna di settembre · qui mostro strategia, annunci e destinazione dei contatti", en: "September campaign · here I show strategy, ads and where leads go" },
    strategy: [
      {
        label: { it: "A chi parla", en: "Who it speaks to" },
        text: { it: "A due persone insieme: chi russa e chi dorme accanto.", en: "To two people at once: the snorer and the person beside." },
      },
      {
        label: { it: "Cosa provano", en: "What they feel" },
        text: { it: "Un disturbo che pesa su due persone, non su una: il rumore si sente da entrambe le parti del letto.", en: "A problem that weighs on two people, not one: the noise is heard on both sides of the bed." } },
      {
        label: { it: "L'angolo", en: "The angle" },
        text: { it: "Un doppio bersaglio dentro una frase: «per te e per chi dorme accanto a te». Chi legge può decidere per sé o per l'altro.", en: "A double target inside one sentence: “for you and for the one who sleeps next to you”. The reader can decide for themselves or for the other." },
      },
      {
        label: { it: "Il tono", en: "The tone" },
        text: { it: "A differenza di Fotona qui non c'è tabù da maneggiare con cura: russare si dice. Il titolo è un imperativo di due parole («Basta russare.») e l'immagine mostra l'esito, una coppia che dorme serena.", en: "Unlike Fotona there's no taboo to handle with care: snoring can be said out loud. The headline is a two-word imperative (“Stop snoring.”) and the image shows the outcome, a couple sleeping peacefully." } },
      {
        label: { it: "L'ostacolo da togliere", en: "The obstacle to remove" },
        text: { it: "La paura di un intervento. Le tre prove vanno su questo: efficace, senza chirurgia, senza effetti collaterali.", en: "The fear of an operation. The three proofs go to that: effective, no surgery, no side effects." } },
      {
        label: { it: "L'invito", en: "The call" },
        text: { it: "Una valutazione gratuita.", en: "A free assessment." } },
    ],
    ads: [
      {
        id: "night",
        name: { it: "NightLase · basta russare", en: "NightLase · stop snoring" },
        headline: { it: "Basta russare.", en: "Stop snoring." },
        note: { it: "Blu notte invece del verde acqua delle altre due: la campagna si riconosce da lontano, nel feed.", en: "Night blue instead of the other two's aqua green: you can tell the campaign from afar, in the feed." },
        images: { square: "/growth/ads/nightlase.webp", story: "/growth/ads/nightlase-v.webp" },
      },
    ],
    path: [
      { title: "Annuncio", sub: { it: "Quadrato e verticale", en: "Square and vertical" } },
      { title: "Invito", sub: { it: "Valutazione gratuita", en: "Free assessment" } },
      { title: "Contatti", sub: { it: "Tab NIGHTLASE, dello stesso foglio", en: "NIGHTLASE tab, in the same sheet" } },
    ],
    pathNotes: [
      { it: "Ogni campagna ha il suo tab nel foglio dei contatti, così i contatti non si mischiano. Quelli di NightLase sono dati di pazienti e non sono mostrati.", en: "Each campaign has its own tab in the lead sheet, so leads never mix. NightLase's are patient data and are not shown." },
    ],
    noLanding: {
      it: "In questa vetrina per NightLase mostro strategia, annunci e destinazione dei contatti. La pagina di destinazione non è inclusa.",
      en: "In this showcase, for NightLase I show strategy, ads and where leads go. The destination page isn't included.",
    },
  },
];

export const flowCompare: { label: LStr; values: Record<FlowId, LStr> }[] = [
  {
    label: { it: "Chi ascolta", en: "Who listens" },
    values: {
      fotona: { it: "Chi soffre, spesso in silenzio", en: "Those who suffer, often in silence" },
      crio: { it: "Chi vuole cambiare una zona", en: "Whoever wants to change an area" },
      nightlase: { it: "Chi russa e chi dorme accanto", en: "The snorer and the one beside" },
    },
  },
  {
    label: { it: "Che registro", en: "What register" },
    values: {
      fotona: { it: "Empatia, con cautela", en: "Empathy, with care" },
      crio: { it: "Desiderio e concretezza", en: "Desire and concreteness" },
      nightlase: { it: "Franchezza", en: "Frankness" },
    },
  },
  {
    label: { it: "Cosa rassicura", en: "What reassures" },
    values: {
      fotona: { it: "Il volto della specialista", en: "The specialist's face" },
      crio: { it: "Il meccanismo mostrato", en: "The mechanism shown" },
      nightlase: { it: "L'esito: notti tranquille", en: "The outcome: quiet nights" },
    },
  },
];

export const flowVideos: { id: string; src: string; poster: string; title: LStr; note: LStr }[] = [
  {
    id: "atrofia",
    src: "/growth/video/atrofia.mp4",
    poster: "/growth/video/atrofia.webp",
    title: { it: "Video · il dolore nei rapporti", en: "Video · pain in intimacy" },
    note: { it: "La specialista parla in prima persona: parte dal sintomo, dice che non è un destino, indica il primo passo.", en: "The specialist speaks in the first person: starts from the symptom, says it isn't a fate, points to the first step." },
  },
  {
    id: "incontinenza",
    src: "/growth/video/incontinenza.mp4",
    poster: "/growth/video/incontinenza.webp",
    title: { it: "Video · le perdite urinarie", en: "Video · urinary leaks" },
    note: { it: "Stessa struttura, sintomo diverso: si parte da ciò che si è smesso di fare e la specialista si presenta con la sua competenza.", en: "Same structure, different symptom: it starts from what you've stopped doing and the specialist introduces herself with her expertise." },
  },
];
