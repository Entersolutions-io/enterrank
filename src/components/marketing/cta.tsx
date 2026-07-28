"use client";

import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { ButtonLink } from "@/components/ui/primitives";
import { useI18n } from "@/lib/i18n";

export function Cta() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative overflow-hidden px-6 py-28">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[900px] -translate-x-1/2 -translate-y-1/2 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url(/images/hero-glow.webp)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-[110px]"
        style={{ background: "radial-gradient(circle, #10b981 0%, transparent 70%)" }}
        aria-hidden
      />

      <motion.div
        initial={{ opacity: 0, y: 26 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65 }}
        className="relative mx-auto max-w-2xl text-center"
      >
        <h2
          className="text-3xl font-bold tracking-tight text-foreground md:text-5xl"
          style={{ letterSpacing: "-0.025em" }}
        >
          {t("Find out where you stand.", "Saznajte gdje stojite.")}
        </h2>
        <p className="mx-auto mt-5 max-w-lg leading-relaxed text-secondary">
          {t(
            "The demo opens on a real workspace with a sample salon in Zagreb. Run a scan, generate a reply, ask the assistants — nothing to install and no account to create.",
            "Demo se otvara na stvarnom radnom prostoru s primjerom salona u Zagrebu. Pokrenite skeniranje, generirajte odgovor, pitajte asistente — ništa za instalirati i nema računa za otvoriti.",
          )}
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ButtonLink href="/app" size="lg">
            {t("Open the demo", "Otvorite demo")}
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
          <ButtonLink href="/docs/api" variant="secondary" size="lg">
            {t("Read the API docs", "Pročitajte API dokumentaciju")}
          </ButtonLink>
        </div>
      </motion.div>
    </section>
  );
}
