import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import About from "@/components/About";
import Team from "@/components/Team";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollLantern from "@/components/ScrollLantern";
import ScrollVideoBackground from "@/components/ScrollVideoBackground";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <main className="relative">
        <ScrollLantern />
        <Navigation />

        {/* Hero section — video background */}
        <div className="relative overflow-hidden">
          <ScrollVideoBackground />
          <Hero />
        </div>

        {/* All sections share one continuous dark gradient flow */}
        <div
          style={{
            background:
              "linear-gradient(180deg, #131829 0%, #1A1F2E 8%, #1C2134 20%, #1A1F2E 35%, #181D2C 50%, #1A1F2E 65%, #1B2030 78%, #181D2C 90%, #0F1320 100%)",
          }}
        >
          <Products />
          <About />
          <Team />
          <Contact />
          <Footer />
        </div>
      </main>
    </>
  );
}
