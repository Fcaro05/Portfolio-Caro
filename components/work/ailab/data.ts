import type { Project } from "@/lib/content";

export type Accent = Project["accent"];

export type Bay = {
  id: string;
  index: string;
  accent: Accent;
  name: string;
  tagline: { it: string; en: string };
  stack: string[];
  /** short, language-neutral pipeline steps */
  flow: string[];
  specs: { k: string; v: string }[];
  /** representative code fragment, one string per line */
  code: string[];
};

export const bays: Bay[] = [
  {
    id: "bay-task",
    index: "01",
    accent: "violet",
    name: "Task Manager",
    tagline: {
      it: "Un messaggio in chat diventa un'operazione strutturata su sei database.",
      en: "A chat message becomes a structured operation across six databases.",
    },
    stack: ["Telegram Bot API", "Gemini 2.5 Flash", "Notion API", "Python"],
    flow: ["messaggio", "intent · JSON", "lookup entità", "write ×6 DB"],
    specs: [
      { k: "model", v: "gemini-2.5-flash" },
      { k: "tecnica", v: "intent routing" },
      { k: "output", v: "JSON · schema forzato" },
      { k: "fallback", v: "reparse su JSON invalido" },
    ],
    code: [
      "const res = await gemini.generateContent({",
      "  contents: [{ parts: [{ text: prompt }] }],",
      '  generationConfig: { response_mime_type: "application/json" },',
      "});",
      "",
      "const action = JSON.parse(strip(res.text));",
      '// { "azione": "NEW_TASK", "titolo": ..., "scadenza": ... }',
      "",
      "route(action); // find_id() + create page su 6 DB Notion",
    ],
  },
  {
    id: "bay-scraper",
    index: "02",
    accent: "cyan",
    name: "Lead Scraper",
    tagline: {
      it: "Trova attività locali, le qualifica con la vista e le contatta.",
      en: "Finds local businesses, qualifies them with sight, and reaches out.",
    },
    stack: ["Playwright", "GPT-4o-mini Vision", "Google Sheets", "Jinja2 · SMTP"],
    flow: ["scrape maps", "estrai contatti", "vision · score", "email agent"],
    specs: [
      { k: "model", v: "gpt-4o-mini · vision" },
      { k: "input", v: "screenshot + testo sito" },
      { k: "output", v: "verdetto + motivazione" },
      { k: "run", v: "batch · stato ripristinabile" },
    ],
    code: [
      "const verdict = await openai.chat.completions.create({",
      '  model: "gpt-4o-mini",',
      "  messages: [{ role: 'user', content: [",
      '    { type: "text",      text: "Il sito è migliorabile? JSON." },',
      '    { type: "image_url", image_url: { url: shot } },',
      "  ]}],",
      "});",
      "",
      "sheet.append(row(business, verdict)); // → email_agent.py",
    ],
  },
  {
    id: "bay-rag",
    index: "03",
    accent: "acid",
    name: "RAG Health Assistant",
    tagline: {
      it: "Risposte sui documenti del paziente, vincolate ai dati e senza allucinazioni.",
      en: "Answers over the patient's documents, bound to the data, no hallucinations.",
    },
    stack: [
      "text-embedding-3-large",
      "Firestore Vector Search",
      "Cloud Functions",
      "Flutter",
    ],
    flow: ["embed", "vector search", "context", "answer"],
    specs: [
      { k: "embeddings", v: "text-embedding-3-large" },
      { k: "retrieval", v: "findNearest · top 5" },
      { k: "guardrail", v: "solo dai documenti" },
      { k: "stato", v: "architettura progettata" },
    ],
    code: [
      "const qVec = await embed(question); // text-embedding-3-large",
      "",
      "const docs = await db",
      "  .collection(`users/${uid}/documents`)",
      '  .findNearest("embeddingVector", qVec, { limit: 5 });',
      "",
      "return llm(SYSTEM_PROMPT, context(docs), question);",
      '// "Se non è nei documenti: «Non è presente nei tuoi dati»"',
    ],
  },
];

export const capabilities = [
  "LLM Integration",
  "RAG",
  "Structured Output",
  "Tool Use",
  "Vector Search",
  "Prompt Engineering",
  "Computer Vision",
  "Agent Orchestration",
  "Cost & Latency",
  "Schema Guardrails",
];
