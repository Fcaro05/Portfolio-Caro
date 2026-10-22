import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 85 per annunci, landing e slide: il testo piccolo sulle immagini deve restare leggibile
    qualities: [75, 85],
  },
  // Indirizzi spostati o rimossi: i progetti Centro Medico, SuperMario24 e AziendaMultiservice
  // ora vivono tutti nella pagina Marketing (prima «Growth»). Permanenti, così i motori di ricerca aggiornano l'indirizzo.
  async redirects() {
    return ["growth", "centro-medico", "supermario24", "azienda-multiservice"].map((slug) => ({
      source: `/work/${slug}`,
      destination: "/work/marketing",
      permanent: true,
    }));
  },
};

export default nextConfig;
