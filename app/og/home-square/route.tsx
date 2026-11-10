import { homeSeo } from "@/lib/seo";
import { ogSquare, renderOg } from "@/lib/og";

/** Immagine di anteprima quadrata della home (LinkedIn e social). Percorso proprio, non `opengraph-image`. */
export async function GET() {
  return renderOg(homeSeo, ogSquare);
}
