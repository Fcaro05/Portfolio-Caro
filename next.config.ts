import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Indirizzi spostati o rimossi: i progetti Centro Medico, SuperMario24 e AziendaMultiservice
  // ora vivono tutti nella pagina Growth. Permanenti, così i motori di ricerca aggiornano l'indirizzo.
  async redirects() {
    return ["centro-medico", "supermario24", "azienda-multiservice"].map((slug) => ({
      source: `/work/${slug}`,
      destination: "/work/growth",
      permanent: true,
    }));
  },
};

export default nextConfig;
