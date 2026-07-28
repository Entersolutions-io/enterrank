"use client";

import { motion, useInView } from "framer-motion";
import { Grid3x3, MessageSquareQuote, Sparkles, Store, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { Eyebrow } from "@/components/ui/primitives";
import { useI18n } from "@/lib/i18n";
import { pillars } from "../../../product.config";

const icons: Record<string, LucideIcon> = {
  MessageSquareQuote,
  Grid3x3,
  Sparkles,
  Store,
};

export function Pillars() {
  const { t, pick } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pillars" ref={ref} className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <Eyebrow>{t("Four questions", "Četiri pitanja")}</Eyebrow>
          <h2
            className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl"
            style={{ letterSpacing: "-0.025em" }}
          >
            {t(
              "Local visibility comes down to four questions.",
              "Lokalna vidljivost svodi se na četiri pitanja.",
            )}
          </h2>
          <p className="mt-5 leading-relaxed text-secondary">
            {t(
              "Most tools answer one of them and leave you to guess the rest. EnterRank keeps all four on one screen, because they are the same problem seen from four angles.",
              "Većina alata odgovara na jedno od njih i prepušta vam da ostalo pogađate. EnterRank drži sva četiri na jednom zaslonu, jer je riječ o istom problemu iz četiri kuta.",
            )}
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {pillars.map((pillar, i) => {
            const Icon = icons[pillar.icon];
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 26 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.1 + i * 0.1 }}
              >
                <Link
                  href={pillar.href}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-7 transition-colors duration-300 hover:border-line-strong"
                >
                  <div
                    className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 bg-cover bg-center opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-30"
                    style={{ backgroundImage: `url(${pillar.image})` }}
                    aria-hidden
                  />

                  <div className="relative flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-accent/20 bg-accent/10">
                      <Icon className="h-4 w-4 text-accent" />
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {pick(pillar.label)}
                    </span>
                  </div>

                  <p
                    className="relative mt-6 text-xl font-semibold tracking-tight text-foreground"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {pick(pillar.question)}
                  </p>
                  <p className="relative mt-3 text-sm leading-relaxed text-secondary">
                    {pick(pillar.blurb)}
                  </p>

                  <span className="relative mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-muted transition-colors group-hover:text-accent">
                    {t("Open in demo", "Otvori u demou")}
                    <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
