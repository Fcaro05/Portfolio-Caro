/** Indirizzo pubblico del sito: serve a sitemap, canonical e Open Graph. Si cambia con NEXT_PUBLIC_SITE_URL. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-caro-eight.vercel.app").replace(/\/$/, "");
