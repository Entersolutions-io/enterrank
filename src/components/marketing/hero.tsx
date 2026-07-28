"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/primitives";
import { useI18n } from "@/lib/i18n";
import { product } from "../../../product.config";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  const { t } = useI18n();

  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden px-6 pt-24">
      {/* Ambient light. Falls back to a CSS glow until the generated image is dropped in. */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className="h-[720px] w-[1100px] max-w-[130%] bg-cover bg-center opacity-45 blur-[2px]"
          style={{ backgroundImage: "url(/images/hero-glow.webp)" }}
          aria-hidden
        />
      </div>
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-[130px]"
        style={{ background: "radial-gradient(circle, #10b981 0%, transparent 68%)" }}
        aria-hidden
      />
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 25%, #0a0a0b 78%), linear-gradient(to bottom, #0a0a0b 0%, transparent 22%, transparent 78%, #0a0a0b 100%)",
        }}
        aria-hidden
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto w-full max-w-4xl text-center"
      >
        <motion.div variants={item}>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs text-secondary">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {t(product.tagline.en, product.tagline.hr)}
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="mt-7 text-balance text-4xl font-bold leading-[1.08] tracking-tight text-foreground md:text-6xl lg:text-[4.25rem]"
          style={{ letterSpacing: "-0.03em" }}
        >
          {t("Your customers already asked.", "Vaši kupci su već pitali.")}
          <br />
          <span className="text-secondary">
            {t("Were you the answer?", "Jeste li vi bili odgovor?")}
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-relaxed text-secondary md:text-lg"
        >
          {t(
            "Every day people search Google Maps — and now ask ChatGPT, Gemini and Perplexity — for a business like yours. EnterRank shows you which of those answers name you, which name your competitor, and exactly what to change.",
            "Ljudi svaki dan pretražuju Google karte — a sada pitaju i ChatGPT, Gemini i Perplexity — za posao poput vašeg. EnterRank pokazuje koji od tih odgovora spominju vas, koji vašu konkurenciju i što točno promijeniti.",
          )}
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <ButtonLink href="/app" size="lg">
            {t("Open the live demo", "Otvorite demo uživo")}
            <ArrowRight className="h-4 w-4" />
          </ButtonLink>
          <ButtonLink href="#demo" variant="secondary" size="lg">
            {t("See a grid scan", "Pogledajte skeniranje mreže")}
          </ButtonLink>
        </motion.div>

        <motion.p variants={item} className="mt-6 text-xs text-faint">
          {t(
            "No account needed — the demo opens with a sample business.",
            "Nije potreban račun — demo se otvara s primjerom poslovanja.",
          )}
        </motion.p>
      </motion.div>
    </section>
  );
}
