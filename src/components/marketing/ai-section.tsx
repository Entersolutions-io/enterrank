"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ProbeRunner } from "@/components/ai-visibility/probe-runner";
import { BusinessChips } from "@/components/demo/business-switcher";
import { Eyebrow } from "@/components/ui/primitives";
import { useDemoBusiness } from "@/lib/demo-business";
import { useI18n } from "@/lib/i18n";

/**
 * The section that separates this product from every other local SEO tool. Deliberately placed
 * after the grid demo: the visitor has just accepted that Maps ranking is measurable, which
 * makes the "and there is a second search engine you have never measured" turn land harder.
 */
export function AiSection() {
  const { t } = useI18n();
  const { business } = useDemoBusiness();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const [probeId, setProbeId] = useState(business.probes[0].id);

  // Falls back to the tenant's first prompt when the selection belongs to another business.
  const probe = business.probes.find((p) => p.id === probeId) ?? business.probes[0];

  return (
    <section ref={ref} className="relative overflow-hidden px-6 py-28">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[600px] bg-cover bg-center opacity-25"
        style={{ backgroundImage: "url(/images/ai-visibility-glow.webp)" }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" aria-hidden />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <Eyebrow>{t("The new search box", "Nova tražilica")}</Eyebrow>
          <h2
            className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl"
            style={{ letterSpacing: "-0.025em" }}
          >
            {t(
              "Half your customers stopped searching.",
              "Polovica vaših kupaca prestala je pretraživati.",
            )}
            <br />
            <span className="text-secondary">
              {t("They started asking.", "Počeli su pitati.")}
            </span>
          </h2>
          <p className="mt-5 text-pretty leading-relaxed text-secondary">
            {t(
              "When someone asks an assistant for a recommendation, it returns three or four names — not ten blue links. You are either in that list or you are invisible, and until now nobody was measuring which.",
              "Kada netko pita asistenta za preporuku, dobiva tri ili četiri imena — a ne deset plavih poveznica. Ili ste na tom popisu ili ste nevidljivi, a dosad nitko nije mjerio što od toga.",
            )}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mx-auto mt-12 max-w-4xl"
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-medium uppercase tracking-wider text-faint">
              {t("Asking about", "Pitamo o")}
            </p>
            <BusinessChips />
          </div>

          {/* key remounts the runner on probe or business change so it restarts from its
              initial running state */}
          <ProbeRunner
            key={`${business.id}:${probe.id}`}
            probe={probe}
            probes={business.probes}
            city={business.location.city}
            onProbeChange={setProbeId}
          />
        </motion.div>
      </div>
    </section>
  );
}
