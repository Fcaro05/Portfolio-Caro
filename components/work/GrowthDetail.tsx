"use client";

import DevDetailShell from "./dev/DevDetailShell";
import { FlowsSection, HeroVisual, NumbersRow, SocialSection, TrackingSection } from "./growth/Sections";

export default function GrowthDetail() {
  return (
    <DevDetailShell
      slug="centro-medico"
      badge="Growth"
      backToDev={false}
      showStory={false}
      compactMobile
      visual={<HeroVisual />}
      title={
        <>
          Centro Medico
          <br />
          Ambrosiano
        </>
      }
    >
      <NumbersRow />
      <FlowsSection />
      <TrackingSection />
      <SocialSection />
    </DevDetailShell>
  );
}
