import type { Metadata, Viewport } from "next";
import { Anton, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Cursor from "@/components/ui/Cursor";
import Nav from "@/components/ui/Nav";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Hud from "@/components/ui/Hud";
import { SITE_URL } from "@/lib/site";
import { homeSeo } from "@/lib/seo";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});
const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});
const jbmono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jbmono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // «./» = l'indirizzo della pagina stessa, risolto sul dominio sopra
  alternates: { canonical: "./" },
  title: homeSeo.title,
  description: homeSeo.description,
  keywords: [
    "Francesco Caro",
    "AI specialist",
    "sviluppatore",
    "marketing digitale",
    "healthtech",
    "Salus AI",
    "portfolio",
    "Next.js",
    "Flutter",
  ],
  authors: [{ name: "Francesco Caro" }],
  openGraph: {
    title: homeSeo.title,
    description: homeSeo.description,
    type: "website",
    siteName: "Francesco Caro",
    locale: "it_IT",
    url: "/",
  },
  twitter: { card: "summary_large_image", title: homeSeo.title, description: homeSeo.description },
};

export const viewport: Viewport = {
  themeColor: "#08080a",
  width: "device-width",
  initialScale: 1,
};

/** Dati strutturati: chi sono, per chi lavoro e dove trovarmi. Servono ai motori di ricerca per collegare persona, azienda e profili. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#persona`,
      name: "Francesco Caro",
      url: SITE_URL,
      jobTitle: "AI specialist, sviluppatore e marketer",
      description: homeSeo.description,
      address: { "@type": "PostalAddress", addressLocality: "Milano", addressCountry: "IT" },
      worksFor: { "@id": `${SITE_URL}/#salus-ai` },
      knowsAbout: ["Intelligenza artificiale", "Sviluppo software", "Performance marketing", "Healthtech"],
      sameAs: ["https://github.com/Fcaro05", "https://www.linkedin.com/in/francescocaro"],
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#salus-ai`,
      name: "Salus AI",
      url: "https://salus-ai.com",
      founder: { "@id": `${SITE_URL}/#persona` },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#sito`,
      url: SITE_URL,
      name: "Francesco Caro",
      inLanguage: ["it", "en"],
      author: { "@id": `${SITE_URL}/#persona` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="it"
      className={`${anton.variable} ${space.variable} ${jbmono.variable}`}
    >
      <body className="bg-bg text-fg">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a
          href="#contenuto"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-full focus:bg-acid focus:px-5 focus:py-2.5 focus:font-mono focus:text-xs focus:uppercase focus:tracking-[0.12em] focus:text-black"
        >
          Vai al contenuto
        </a>
        <I18nProvider>
          <SmoothScroll>
            <Cursor />
            <ScrollProgress />
            <Hud />
            <div className="grain" aria-hidden />
            <Nav />
            {children}
          </SmoothScroll>
        </I18nProvider>
      </body>
    </html>
  );
}
