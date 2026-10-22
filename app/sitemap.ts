import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/** Le pagine del portfolio, in ordine di importanza. */
const pages: { path: string; priority: number }[] = [
  { path: "", priority: 1 },
  { path: "/work/salus-ai", priority: 0.9 },
  { path: "/work/dev", priority: 0.8 },
  { path: "/work/ai-lab", priority: 0.8 },
  { path: "/work/marketing", priority: 0.8 },
  { path: "/work/sito-salus", priority: 0.6 },
  { path: "/work/gestionale-salus", priority: 0.6 },
  { path: "/work/app-salus", priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.map((p) => ({
    url: `${SITE_URL}${p.path}`,
    changeFrequency: "monthly",
    priority: p.priority,
  }));
}
