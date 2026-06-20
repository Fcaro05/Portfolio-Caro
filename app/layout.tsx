import type { Metadata, Viewport } from "next";
import { Anton, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Cursor from "@/components/ui/Cursor";
import Nav from "@/components/ui/Nav";

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
  title: "Francesco Caro — Developer · Marketer · Builder",
  description:
    "Portfolio di Francesco Caro. Prodotto, growth marketing e sistemi web scalabili. Healthtech, AI e crescita digitale — dove tecnologia, marketing e business si incontrano.",
  keywords: [
    "Francesco Caro",
    "web developer",
    "digital marketing",
    "healthtech",
    "Salus AI",
    "portfolio",
    "Next.js",
    "growth",
  ],
  authors: [{ name: "Francesco Caro" }],
  openGraph: {
    title: "Francesco Caro — Developer · Marketer · Builder",
    description:
      "Prodotto, growth marketing e sistemi web scalabili. Dove tecnologia, marketing e business si incontrano.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#08080a",
  width: "device-width",
  initialScale: 1,
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
        <I18nProvider>
          <SmoothScroll>
            <Cursor />
            <div className="grain" aria-hidden />
            <Nav />
            {children}
          </SmoothScroll>
        </I18nProvider>
      </body>
    </html>
  );
}
