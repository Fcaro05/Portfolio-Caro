import Loader from "@/components/ui/Loader";
import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Capabilities from "@/components/sections/Capabilities";
import Work from "@/components/sections/Work";
import Timeline from "@/components/sections/Timeline";
import Stats from "@/components/sections/Stats";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Loader />
      <main className="relative">
        <Hero />
        <Manifesto />
        <Capabilities />
        <Work />
        <Timeline />
        <Stats />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
