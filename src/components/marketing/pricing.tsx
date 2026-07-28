"use client";

import { motion, useInView } from "framer-motion";
import { Check } from "lucide-react";
import { useRef, useState } from "react";
import { ButtonLink, Eyebrow } from "@/components/ui/primitives";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * Three tiers, priced against what the category actually charges: reply-only tools sit around
 * €10, grid-scan tools around €25, and all-in-one local SEO suites €40–60. The middle tier is
 * the one the product is designed around and is marked as such rather than hidden among equals.
 */
export function Pricing() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [annual, setAnnual] = useState(true);

  const plans = [
    {
      id: "essential",
      name: t("Essential", "Osnovni"),
      monthly: 29,
      annualMonthly: 24,
      blurb: t(
        "One location, reviews handled properly.",
        "Jedna lokacija, recenzije riješene kako treba.",
      ),
      features: [
        t("1 location", "1 lokacija"),
        t("Unlimited AI reply drafts", "Neograničeni AI nacrti odgovora"),
        t("Brand voice and auto-publish rules", "Glas marke i pravila automatske objave"),
        t("Profile health monitoring", "Praćenje zdravlja profila"),
        t("Weekly 5×5 grid scan, 3 search terms", "Tjedno skeniranje 5×5, 3 pojma"),
      ],
    },
    {
      id: "growth",
      name: t("Growth", "Rast"),
      monthly: 59,
      annualMonthly: 49,
      featured: true,
      blurb: t(
        "The full picture, including the assistants.",
        "Cjelovita slika, uključujući asistente.",
      ),
      features: [
        t("Up to 3 locations", "Do 3 lokacije"),
        t("Everything in Essential", "Sve iz Osnovnog"),
        t("AI visibility across 4 assistants", "AI vidljivost na 4 asistenta"),
        t("Daily grid scans up to 13×13, 15 terms", "Dnevna skeniranja do 13×13, 15 pojmova"),
        t("Competitor tracking", "Praćenje konkurencije"),
        t("Post scheduling and Q&A drafting", "Zakazivanje objava i sastavljanje odgovora na pitanja"),
        t("API access and webhooks", "Pristup API-ju i webhookovi"),
      ],
    },
    {
      id: "agency",
      name: t("Agency", "Agencija"),
      monthly: 119,
      annualMonthly: 99,
      blurb: t(
        "For anyone managing this on behalf of clients.",
        "Za sve koji ovo vode u ime klijenata.",
      ),
      features: [
        t("Up to 15 locations", "Do 15 lokacija"),
        t("Everything in Growth", "Sve iz Rasta"),
        t("White-label PDF reports", "PDF izvještaji s vašim brendom"),
        t("Client-facing read-only access", "Pristup samo za čitanje za klijente"),
        t("Priority support", "Prioritetna podrška"),
      ],
    },
  ];

  return (
    <section id="pricing" ref={ref} className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <Eyebrow>{t("Pricing", "Cijene")}</Eyebrow>
          <h2
            className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl"
            style={{ letterSpacing: "-0.025em" }}
          >
            {t("Less than one lost customer.", "Manje od jednog izgubljenog kupca.")}
          </h2>
          <p className="mt-5 leading-relaxed text-secondary">
            {t(
              "All prices exclude VAT. Cancel whenever — your workspace stays open until the period you paid for ends.",
              "Sve cijene su bez PDV-a. Otkažite kad god želite — radni prostor ostaje otvoren do kraja plaćenog razdoblja.",
            )}
          </p>

          <div className="mt-8 inline-flex items-center gap-0.5 rounded-lg border border-line bg-surface p-0.5">
            {[
              { value: false, label: t("Monthly", "Mjesečno") },
              { value: true, label: t("Annual · save 17%", "Godišnje · ušteda 17%") },
            ].map((option) => (
              <button
                key={String(option.value)}
                type="button"
                onClick={() => setAnnual(option.value)}
                className={cn(
                  "rounded-md px-3.5 py-1.5 text-xs font-medium transition-colors",
                  annual === option.value
                    ? "bg-white/[0.07] text-foreground"
                    : "text-muted hover:text-secondary",
                )}
              >
                {option.label}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 26 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.1 }}
              className={cn(
                "flex flex-col rounded-2xl border p-7",
                plan.featured
                  ? "border-accent/30 bg-accent/[0.035]"
                  : "border-line bg-surface",
              )}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-foreground">{plan.name}</h3>
                {plan.featured ? (
                  <span className="rounded-full border border-accent/25 bg-accent/10 px-2.5 py-0.5 text-[11px] font-medium text-accent-light">
                    {t("Most chosen", "Najčešći odabir")}
                  </span>
                ) : null}
              </div>

              <p className="mt-2 text-sm text-muted">{plan.blurb}</p>

              <div className="mt-6 flex items-baseline gap-1.5">
                <span className="font-mono text-4xl font-semibold text-foreground">
                  €{annual ? plan.annualMonthly : plan.monthly}
                </span>
                <span className="text-sm text-muted">{t("/ month", "/ mjesečno")}</span>
              </div>
              {annual ? (
                <p className="mt-1 text-[11px] text-faint">
                  {t(
                    `Billed €${plan.annualMonthly * 12} yearly`,
                    `Naplaćuje se €${plan.annualMonthly * 12} godišnje`,
                  )}
                </p>
              ) : (
                <p className="mt-1 text-[11px] text-faint">
                  {t("Billed monthly", "Naplaćuje se mjesečno")}
                </p>
              )}

              <ul className="mt-7 flex-1 space-y-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex gap-2.5 text-sm text-secondary">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                    {feature}
                  </li>
                ))}
              </ul>

              <ButtonLink
                href="/app"
                variant={plan.featured ? "primary" : "secondary"}
                className="mt-8 w-full"
              >
                {t("Try the demo", "Isprobajte demo")}
              </ButtonLink>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-faint">
          {t(
            "Managing more than 15 locations? Talk to us.",
            "Upravljate s više od 15 lokacija? Javite nam se.",
          )}
        </p>
      </div>
    </section>
  );
}
