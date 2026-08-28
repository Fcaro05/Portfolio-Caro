import Loader from "@/components/ui/Loader";
import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Capabilities from "@/components/sections/Capabilities";
import Work from "@/components/sections/Work";
import Timeline from "@/components/sections/Timeline";
import Stats from "@/components/sections/Stats";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import SectionCurtain from "@/components/ui/SectionCurtain";

export default function Home() {
  return (
    <>
      <Loader />
      <main className="relative">
        <Hero />
        <SectionCurtain num="01" color="magenta">
          <Manifesto />
        </SectionCurtain>
        <SectionCurtain num="02" color="cyan">
          <Capabilities />
        </SectionCurtain>
        <SectionCurtain num="03" color="acid">
          <Work />
        </SectionCurtain>
        <SectionCurtain num="04" color="violet">
          <Timeline />
        </SectionCurtain>
        <SectionCurtain num="05" color="acid">
          <Stats />
        </SectionCurtain>
        <SectionCurtain num="06" color="magenta">
          <Contact />
        </SectionCurtain>
      </main>
      <Footer />
    </>
  );
}
