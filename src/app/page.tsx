import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { AiSection } from "@/components/marketing/ai-section";
import { Cta } from "@/components/marketing/cta";
import { GridDemo } from "@/components/marketing/grid-demo";
import { Hero } from "@/components/marketing/hero";
import { Pillars } from "@/components/marketing/pillars";
import { Pricing } from "@/components/marketing/pricing";

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
        <Pricing />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
