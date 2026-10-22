import { workSeo, workSlugs } from "@/lib/seo";
import { ogSize, renderOg } from "@/lib/og";

export const alt = "Francesco Caro — progetto";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return workSlugs.map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const seo = workSeo[slug];
  return renderOg(
    seo ?? { title: "Francesco Caro", description: "", eyebrow: "Progetto", card: "Francesco Caro", accent: "#d4ff36" },
  );
}
