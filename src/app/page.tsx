import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { AiSection } from "@/components/marketing/ai-section";
import { Contact } from "@/components/marketing/contact";
import { GridDemo } from "@/components/marketing/grid-demo";
import { Hero } from "@/components/marketing/hero";
import { Pillars } from "@/components/marketing/pillars";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        {/* Grid demo first: it earns the right to make the AI claim that follows. */}
        <GridDemo />
        <Pillars />
        <AiSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
