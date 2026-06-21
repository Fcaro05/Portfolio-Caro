import type { Metadata } from "next";
import type { ComponentType } from "react";
import { notFound } from "next/navigation";
import { getProject, projectSlugs, L } from "@/lib/content";
import Footer from "@/components/sections/Footer";
import SalusAIDetail from "@/components/work/SalusAIDetail";
import CentroMedicoDetail from "@/components/work/CentroMedicoDetail";
import SuperMario24Detail from "@/components/work/SuperMario24Detail";
import AziendaMultiserviceDetail from "@/components/work/AziendaMultiserviceDetail";
import TesiCreativaDetail from "@/components/work/TesiCreativaDetail";

const registry: Record<string, ComponentType> = {
  "salus-ai": SalusAIDetail,
  "centro-medico": CentroMedicoDetail,
  supermario24: SuperMario24Detail,
  "azienda-multiservice": AziendaMultiserviceDetail,
  "tesi-creativa": TesiCreativaDetail,
};

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return { title: "Progetto — Francesco Caro" };
  return {
    title: `${p.name} — Francesco Caro`,
    description: L(p.summary, "en"),
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const Detail = registry[slug];
  if (!Detail || !getProject(slug)) notFound();
  return (
    <>
      <Detail />
      <Footer />
    </>
  );
}
