import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import IndexStrip from "@/components/IndexStrip";
import Work from "@/components/Work";
import Studio from "@/components/Studio";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <IndexStrip />
      <Work />
      <Studio />
      <Team />
      <Contact />
      <Footer />
    </>
  );
}
