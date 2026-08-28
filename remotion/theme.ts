/** Shared brand tokens for the Remotion showreel (mirrors app/globals.css). */
export const COLORS = {
  bg: "#08080a",
  bgSoft: "#0e0e13",
  fg: "#f3f3ec",
  muted: "#8a8a99",
  line: "rgba(255,255,255,0.12)",
  acid: "#d4ff36",
  magenta: "#ff2d8e",
  cyan: "#34e7e4",
  violet: "#8b5cff",
} as const;

export type Accent = "acid" | "magenta" | "cyan" | "violet";

export const accentHex: Record<Accent, string> = {
  acid: COLORS.acid,
  magenta: COLORS.magenta,
  cyan: COLORS.cyan,
  violet: COLORS.violet,
};

export type ReelProject = {
  index: string;
  name: string;
  kind: string;
  role: string;
  accent: Accent;
  tags: string[];
};

/** Kept local to the Remotion bundle so `remotion studio` / `render` need
 *  nothing from the Next app. Keep in sync with lib/content.ts. */
export const REEL_PROJECTS: ReelProject[] = [
  {
    index: "01",
    name: "Salus AI",
    kind: "Healthtech Startup",
    role: "Co-founder · Product",
    accent: "acid",
    tags: ["Flutter", "Firebase", "AI", "IoT"],
  },
  {
    index: "02",
    name: "Centro Medico Ambrosiano",
    kind: "Healthcare Marketing",
    role: "Digital Marketing & Content",
    accent: "magenta",
    tags: ["Meta Ads", "Google Ads", "SEO", "Funnel"],
  },
  {
    index: "03",
    name: "SuperMario24",
    kind: "Emergency Services Portal",
    role: "Web / CMS & Local SEO",
    accent: "cyan",
    tags: ["WordPress", "Local SEO", "Content Ops"],
  },
  {
    index: "04",
    name: "AziendaMultiservice",
    kind: "Multi-service Hub",
    role: "Web / CMS & Local SEO",
    accent: "violet",
    tags: ["WordPress", "Reviews", "Conversion"],
  },
  {
    index: "05",
    name: "Tesi Creativa",
    kind: "Interactive Thesis",
    role: "Concept · Direction · Dev",
    accent: "acid",
    tags: ["Creative Direction", "UX/UI", "WebGL"],
  },
];

export const REEL = {
  fps: 30,
  width: 1920,
  height: 1080,
  intro: 72,
  perProject: 56,
  outro: 66,
} as const;

export const reelDuration =
  REEL.intro + REEL.perProject * REEL_PROJECTS.length + REEL.outro;
