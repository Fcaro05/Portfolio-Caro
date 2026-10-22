import { homeSeo } from "@/lib/seo";
import { ogSize, renderOg } from "@/lib/og";

export const alt = "Francesco Caro — portfolio";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image() {
  return renderOg(homeSeo);
}
