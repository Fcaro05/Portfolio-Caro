/**
 * Contenuti della pagina Growth: il lavoro per il Centro Medico Ambrosiano (CMA), Milano.
 *
 * Fonti: la cartella di lavoro CMA (annunci, landing, caroselli), il documento di passaggio sul
 * tracciamento (8–12 ottobre 2026), lo script Google Apps Script e il brief di strategia della landing.
 * Pubblicazione: solo la diagnosi del tracciamento (visite di pagina e lead), niente costi né risultati
 * di spesa; nessun identificativo di Meta, Google o hosting; nessun dato di pazienti.
 */

export type LStr = { it: string; en: string };
export type LArr = { it: string[]; en: string[] };

export const growthNumbers: { value: string; label: LStr }[] = [
  { value: "3", label: { it: "campagne Meta, ognuna con la sua strategia", en: "Meta campaigns, each with its own strategy" } },
  { value: "17", label: { it: "versioni di annuncio in immagine, tra feed, story, reel e quadrato", en: "image ad versions across feed, story, reel and square" } },
  { value: "2", label: { it: "video con la specialista, uno per sintomo", en: "videos with the specialist, one per symptom" } },
  { value: "2", label: { it: "landing con il contatto inviato a Meta dal server", en: "landings with the lead sent to Meta from the server" } },
];


/** I sei blocchi del brief della landing Fotona. */
export const landingBlocks: { title: LStr; body: LStr }[] = [
  { title: { it: "Hero: l'autorità visibile", en: "Hero: visible authority" }, body: { it: "Titolo sul problema, la tecnologia come alternativa non chirurgica e il video della specialista che si presenta, visibile senza scorrere.", en: "Headline on the problem, the technology as a non-surgical alternative and a video of the specialist introducing herself, visible without scrolling." } },
  { title: { it: "Empatia: la voce della donna", en: "Empathy: her voice" }, body: { it: "Una sezione che parla a chi legge con le parole di chi vive il disagio. Niente testimonianze dirette.", en: "A section that speaks to the reader in the words of those who live with the discomfort. No direct testimonials." } },
  { title: { it: "La scienza dei risultati", en: "The evidence" }, body: { it: "Al posto delle recensioni, l'evidenza clinica e come funziona la tecnologia, un dato per volta.", en: "Instead of reviews, clinical evidence and how the technology works, one figure at a time." } },
  { title: { it: "Il protocollo operativo", en: "The operating protocol" }, body: { it: "Visita, seduta, risultato: il percorso spiegato in tre passi per abbassare l'attrito.", en: "Visit, session, result: the path explained in three steps to lower friction." } },
  { title: { it: "FAQ strategiche", en: "Strategic FAQ" }, body: { it: "Le domande vere: dolore, quante sedute, quanto dura il risultato, se vale anche dopo la menopausa.", en: "The real questions: pain, how many sessions, how long results last, whether it applies after menopause." } },
  { title: { it: "Chiusura e modulo", en: "Close and form" }, body: { it: "Pochi campi, una frase sulla privacy e un invito chiaro a prenotare.", en: "Few fields, a line on privacy and a clear invitation to book." } },
];

/** Ricerca che precede la pagina: il brief di strategia (Guida Landing). */
export const research: { title: LStr; items: LStr[] }[] = [
  {
    title: { it: "Le tre frustrazioni", en: "The three frustrations" },
    items: [
      { it: "Perdere autonomia: ogni uscita diventa un'operazione da pianificare.", en: "Losing autonomy: every outing becomes an operation to plan." },
      { it: "Perdere intimità: il dolore trasforma il rapporto in ansia.", en: "Losing intimacy: pain turns closeness into anxiety." },
      { it: "Sentirsi invisibili: il problema viene liquidato come «normale per l'età».", en: "Feeling invisible: the problem is dismissed as “normal for your age”." },
    ],
  },
  {
    title: { it: "I tre dubbi da sciogliere", en: "The three doubts to dissolve" },
    items: [
      { it: "«Farà male?»: la paura del laser come chirurgia.", en: "“Will it hurt?”: the fear of laser as surgery." },
      { it: "«Funzionerà per me?»: il timore dell'ennesimo tentativo andato male.", en: "“Will it work for me?”: the fear of one more failed attempt." },
      { it: "«Mi sentirò a disagio?»: l'imbarazzo e la riservatezza.", en: "“Will I feel uncomfortable?”: embarrassment and privacy." },
    ],
  },
  {
    title: { it: "Dove i concorrenti lasciano spazio", en: "Where competitors leave room" },
    items: [
      { it: "Pagine fredde e tecniche, scritte come elenchi di specifiche.", en: "Cold, technical pages written as spec lists." },
      { it: "Moduli che chiedono troppo prima ancora di parlare.", en: "Forms that ask too much before any conversation." },
      { it: "Nessun volto: la pagina è firmata dalla clinica, non da un medico.", en: "No face: the page is signed by the clinic, not by a doctor." },
    ],
  },
];

/* ----------------------------- tracciamento ----------------------------- */

export const trackingSteps: { when: LStr; title: LStr; body: LStr }[] = [
  {
    when: { it: "Il sintomo", en: "The symptom" },
    title: { it: "Visite sì, contatti no", en: "Visits yes, leads no" },
    body: { it: "In 30 giorni il pixel di Meta registra circa 33.000 visite alla pagina e solo 2 contatti. La campagna spende, ma non ha dati per ottimizzare.", en: "In 30 days Meta's pixel records about 33,000 page views and only 2 leads. The campaign spends, but has no data to optimise on." },
  },
  {
    when: { it: "La verifica", en: "The check" },
    title: { it: "Il codice si carica, ma non arriva niente", en: "The code loads, but nothing arrives" },
    body: { it: "Tag Manager e pixel si caricano e il Lead è configurato sulla pagina di ringraziamento. Eppure dal browser non parte nessuna richiesta verso Meta, nemmeno forzando un evento a mano.", en: "Tag Manager and pixel load and the Lead is set on the thank-you page. Yet the browser sends no request to Meta, even when forcing an event by hand." },
  },
  {
    when: { it: "La causa", en: "The cause" },
    title: { it: "Meta blocca il dominio", en: "Meta blocks the domain" },
    body: { it: "In Events Manager c'è un avviso: alcuni dati del sito sono bloccati perché i domini sembrano legati a condizioni mediche. Il blocco è sul dominio, non sul codice.", en: "Events Manager shows a notice: some site data is blocked because the domains look tied to medical conditions. The block is on the domain, not the code." },
  },
  {
    when: { it: "La decisione", en: "The decision" },
    title: { it: "Non si aggira", en: "No workaround" },
    body: { it: "Niente URL falso nell'evento, niente cambio di dominio fatto per eludere il blocco. Si toglie il pixel dalla landing e il contatto lo comunica il server, con l'origine vera.", en: "No fake URL in the event, no domain swap made to dodge the block. The pixel comes off the landing and the server reports the lead, with its true origin." },
  },
  {
    when: { it: "La costruzione", en: "The build" },
    title: { it: "Dal modulo al server", en: "From form to server" },
    body: { it: "Il modulo invia i dati a Google Apps Script. Lo script scrive il lead su un foglio, manda un'email e comunica a Meta l'evento Lead con la Conversions API.", en: "The form sends the data to Google Apps Script. The script writes the lead to a sheet, sends an email and reports the Lead event to Meta through the Conversions API." },
  },
  {
    when: { it: "La prova", en: "The proof" },
    title: { it: "Meta vede gli eventi", en: "Meta sees the events" },
    body: { it: "Prima con dati di prova: Meta risponde 200 e conferma l'evento ricevuto. Poi un controllo a mano in Events Manager: gli eventi del server compaiono come contatti.", en: "First with test data: Meta replies 200 and confirms the event was received. Then a manual check in Events Manager: the server's events show up as leads." },
  },
];

export const trackingFlow: { title: string; sub: LStr }[] = [
  { title: "Annuncio", sub: { it: "Meta · Facebook e Instagram", en: "Meta · Facebook and Instagram" } },
  { title: "Landing", sub: { it: "HTML statico, senza pixel", en: "Static HTML, no pixel" } },
  { title: "Apps Script", sub: { it: "Google, un solo script", en: "Google, a single script" } },
  { title: "Tre uscite", sub: { it: "Foglio · email · Meta (CAPI)", en: "Sheet · email · Meta (CAPI)" } },
];

export const trackingSnippet: { file: string; caption: LStr; lines: string[]; wrap?: boolean } = {
  file: "meta-capi.gs",
  wrap: true,
  caption: { it: "Estratto dal file vero: l'invio a Meta.", en: "Excerpt from the real file: the send to Meta." },
  lines: [
    "function doPost(e) {",
    "  var res = doPostSave_(e);",
    "  try { sendLeadToMeta_(e); } catch (err) { console.error('META: ' + err); }",
    "  return res;",
    "}",
    "",
    "function sha256_(s) {",
    "  if (!s) return undefined;",
    "  var d = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256,",
    "    String(s).trim().toLowerCase(), Utilities.Charset.UTF_8);",
    "  return d.map(function (b) { return ('0' + (b & 0xff).toString(16)).slice(-2); }).join('');",
    "}",
    "",
    "// dentro sendLeadToMeta_: a Meta vanno solo email e telefono cifrati,",
    "// più i codici di attribuzione. Il token sta nelle proprietà dello script.",
    "var ud = { em: arr_(sha256_(d.email)), ph: arr_(sha256_(phoneForMeta_(d.telefono))),",
    "  country: arr_(sha256_('it')), fbc: d.fbc || undefined, fbp: d.fbp || undefined,",
    "  client_user_agent: d.user_agent || undefined };",
    "var ev = { event_name: 'Lead', event_time: Math.floor(Date.now() / 1000),",
    "  event_id: d.event_id || Utilities.getUuid(), action_source: 'website',",
    "  event_source_url: d.event_source_url || undefined, user_data: ud };",
  ],
};

export const notDone: LArr = {
  it: [
    "Non ho dichiarato un indirizzo falso nell'evento né cambiato dominio per eludere il blocco: l'evento dice da dove arriva davvero.",
    "A Meta non mando nome, orari né il nome del trattamento. Il trattamento è un dato di salute: servono solo email e telefono cifrati.",
    "Non ho attivato i moduli istantanei di Meta: restano il piano B se il blocco persiste.",
    "Non ho modificato campagne in spesa senza il via libera del cliente: si duplica, non si cambia.",
  ],
  en: [
    "I didn't declare a false address in the event or swap domains to dodge the block: the event says where it really comes from.",
    "To Meta I send no name, times or treatment name. The treatment is health data: only hashed email and phone are needed.",
    "I didn't switch on Meta's instant forms: they remain plan B if the block persists.",
    "I didn't edit running campaigns without the client's go-ahead: you duplicate, you don't change.",
  ],
};

export const stillOpen: LArr = {
  it: [
    "La richiesta di revisione a Meta: la probabilità non è alta, perché il contenuto è davvero medico.",
    "Gli annunci puntano ancora alla landing vecchia. Il passaggio alla nuova li manda in revisione ed è rimandato su richiesta del cliente.",
    "Quale evento usare per ottimizzare il gruppo di inserzioni: il Lead standard o uno nuovo.",
    "Il nuovo indirizzo della landing può essere bloccato a sua volta.",
    "Il consenso ai cookie è rimandato alla fase di test: la landing nuova non ha né banner né pixel.",
  ],
  en: [
    "The review request to Meta: the odds aren't high, because the content really is medical.",
    "The ads still point to the old landing. Switching to the new one sends them into review and is postponed at the client's request.",
    "Which event to optimise the ad set on: the standard Lead or a new one.",
    "The landing's new address can be blocked in turn.",
    "Cookie consent is postponed to the testing phase: the new landing has neither a banner nor a pixel.",
  ],
};

/* -------------------------------- social -------------------------------- */

export const carousels: {
  id: "schiena" | "viso";
  name: LStr;
  prefix: string;
  slides: LStr[];
}[] = [
  {
    id: "schiena",
    name: { it: "Mal di schiena", en: "Back pain" },
    prefix: "/growth/social/schiena-",
    slides: [
      { it: "Copertina: «Mal di schiena? Non aspettare che peggiori» e la valutazione gratuita.", en: "Cover: “Back pain? Don't wait for it to get worse” and the free assessment." },
      { it: "1/5 · Il dolore è un segnale.", en: "1/5 · Pain is a signal." },
      { it: "2/5 · Le cause possono essere diverse.", en: "2/5 · The causes can differ." },
      { it: "3/5 · Serve capire da dove parte: la valutazione individua l'origine.", en: "3/5 · You need to understand where it starts: the assessment finds the origin." },
      { it: "4/5 · I trattamenti possibili: fisioterapia, massoterapia, osteopatia.", en: "4/5 · The possible treatments: physiotherapy, massage therapy, osteopathy." },
      { it: "5/5 · Prima agisci, meglio è.", en: "5/5 · The sooner you act, the better." },
      { it: "Chiusura: «Hai mal di schiena?» e l'invito a prenotare online una valutazione gratuita.", en: "Close: “Back pain?” and the invitation to book a free assessment online." },
    ],
  },
  {
    id: "viso",
    name: { it: "Viso e labbra", en: "Face and lips" },
    prefix: "/growth/social/viso-",
    slides: [
      { it: "Copertina: «Più armonia, più te».", en: "Cover: “More harmony, more you”." },
      { it: "1/5 · Le labbra non sono solo volume.", en: "1/5 · Lips are not just volume." },
      { it: "2/5 · Anche il viso cerca equilibrio.", en: "2/5 · The face looks for balance too." },
      { it: "3/5 · Ogni volto ha il suo piano.", en: "3/5 · Every face has its own plan." },
      { it: "4/5 · La prima tappa fa la differenza.", en: "4/5 · The first step makes the difference." },
      { it: "5/5 · Naturalezza prima di tutto.", en: "5/5 · Naturalness above all." },
      { it: "Chiusura: «Vuoi valorizzare labbra e viso?» e l'invito a prenotare online una valutazione gratuita.", en: "Close: “Want to enhance lips and face?” and the invitation to book a free assessment online." },
    ],
  },
];

/* ------------------------------- principi ------------------------------- */

export const principles: { title: LStr; body: LStr }[] = [
  {
    title: { it: "Si parla alla persona", en: "You speak to the person" },
    body: { it: "Sulle pagine: seconda persona, frasi in minuscolo normale, niente maiuscolo urlato. L'unico testo in maiuscolo è il pulsante che invita a prenotare.", en: "On the pages: second person, sentence case, no shouting capitals. The only uppercase text is the button inviting to book." },
  },
  {
    title: { it: "Un solo colore guida", en: "One guiding colour" },
    body: { it: "Un teal profondo per ogni invito all'azione; il resto è bianco e fotografie. Nessun secondo colore a competere.", en: "A deep teal for every call to action; the rest is white and photography. No second colour competing." },
  },
  {
    title: { it: "Fotografie che rassicurano", en: "Photography that reassures" },
    body: { it: "Donne in ambienti normali, ritratti sorridenti, dettagli morbidi. Mai attrezzature da ospedale né ambienti freddi.", en: "Women in everyday settings, smiling portraits, soft details. Never hospital equipment or cold rooms." },
  },
  {
    title: { it: "Niente prova sociale tradizionale", en: "No traditional social proof" },
    body: { it: "Niente testimonianze né foto prima e dopo. La fiducia la danno la specialista, i dati e le risposte alle obiezioni.", en: "No testimonials, no before-and-after photos. Trust comes from the specialist, the data and the answers to objections." },
  },
  {
    title: { it: "Il form è la spina dorsale", en: "The form is the spine" },
    body: { it: "Pochi campi e ben visibili, con un menù per la fascia oraria. La pagina ha un solo percorso: prenotare.", en: "Few, visible fields, with a menu for the time slot. The page has one path: book." },
  },
];
