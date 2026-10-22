import type { Metadata } from "next";
import type { ComponentType } from "react";
import { notFound } from "next/navigation";
import { workSeo } from "@/lib/seo";
import Footer from "@/components/sections/Footer";
import SalusAIDetail from "@/components/work/SalusAIDetail";
import AiLabDetail from "@/components/work/AiLabDetail";
import SitoSalusDetail from "@/components/work/SitoSalusDetail";
import GestionaleSalusDetail from "@/components/work/GestionaleSalusDetail";
import AppSalusDetail from "@/components/work/AppSalusDetail";
import DevHub from "@/components/work/dev/DevHubView";
import GrowthDetail from "@/components/work/GrowthDetail";

const registry: Record<string, ComponentType> = {
  "salus-ai": SalusAIDetail,
  "ai-lab": AiLabDetail,
  "sito-salus": SitoSalusDetail,
  "gestionale-salus": GestionaleSalusDetail,
  "app-salus": AppSalusDetail,
  dev: DevHub,
  growth: GrowthDetail,
};

export function generateStaticParams() {
  return Object.keys(registry).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const seo = workSeo[slug];
  if (!seo) return { title: "Progetto — Francesco Caro" };
  const title = `${seo.title} · Francesco Caro`;
  return {
    title,
    description: seo.description,
    // l'immagine di anteprima è generata da opengraph-image.tsx di questa stessa cartella
    openGraph: {
      title,
      description: seo.description,
      type: "article",
      siteName: "Francesco Caro",
      locale: "it_IT",
      url: `/work/${slug}`,
    },
    twitter: { card: "summary_large_image", title, description: seo.description },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const Detail = registry[slug];
  if (!Detail) notFound();
  return (
    <>
      <main id="contenuto">
        <Detail />
      </main>
      <Footer />
    </>
  );
}
