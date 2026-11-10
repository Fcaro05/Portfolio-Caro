import { homeSeo } from "@/lib/seo";
import { ogSquare, renderOg } from "@/lib/og";

export const alt = "Francesco Caro — portfolio";
// Quadrata (1200x1200) solo per la home; le altre pagine restano 1200x630
export const size = ogSquare;
export const contentType = "image/png";

export default async function Image() {
  return renderOg(homeSeo, ogSquare);
}
