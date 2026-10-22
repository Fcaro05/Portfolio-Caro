import type { Metadata } from "next";
import type { ComponentType } from "react";
import { notFound } from "next/navigation";
import { getProject, workHubs, L } from "@/lib/content";
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
  const p = getProject(slug);
  if (p) {
    return {
      title: `${p.name} — Francesco Caro`,
      description: L(p.summary, "en"),
    };
  }
  const hub = workHubs[slug];
  if (hub) {
    return {
      title: `${L(hub.label, "en")} — Francesco Caro`,
      description: L(hub.intro, "en"),
    };
  }
  return { title: "Progetto — Francesco Caro" };
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
      <Detail />
      <Footer />
    </>
  );
}
