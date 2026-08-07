"use client";

import { motion, useInView } from "framer-motion";
import { ArrowRight, Check, Loader2, Mail } from "lucide-react";
import { useRef, useState } from "react";
import { Button, ButtonLink, Eyebrow } from "@/components/ui/primitives";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { product } from "../../../product.config";

type Status = "idle" | "sending" | "sent";

/**
 * Closing section. There is no price list anywhere on the site by design — what a workspace costs
 * depends on how many locations, search terms and assistants are being tracked, so the honest
 * answer is a conversation rather than a table that would be wrong for most visitors.
 */
export function Contact() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setErrors({});

    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const response = await fetch("/api/v1/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.status === 422) {
        const body = await response.json();
        setErrors(body.error?.fields ?? {});
        setStatus("idle");
        return;
      }

      setStatus("sent");
    } catch {
      setStatus("idle");
    }
  };

  const scopeFactors = [
    t("How many locations you manage", "Koliko lokacija vodite"),
    t("How many search terms you want tracked", "Koliko pojmova pretraživanja želite pratiti"),
    t("How often the grid should be scanned", "Koliko često se mreža skenira"),
    t("Whether AI assistant tracking is included", "Uključuje li praćenje AI asistenata"),
    t("Whether you are an agency reselling this", "Jeste li agencija koja ovo preprodaje"),
  ];

  return (
    <section id="contact" ref={ref} className="relative overflow-hidden px-6 py-28">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[460px] w-[900px] -translate-x-1/2 -translate-y-1/2 bg-cover bg-center opacity-25"
        style={{ backgroundImage: "url(/images/hero-glow.webp)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, #10b981 0%, transparent 70%)" }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <Eyebrow>{t("Get in touch", "Javite nam se")}</Eyebrow>
          <h2
            className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl"
            style={{ letterSpacing: "-0.025em" }}
          >
            {t("Find out where you stand.", "Saznajte gdje stojite.")}
          </h2>
          <p className="mt-5 text-pretty leading-relaxed text-secondary">
            {t(
              "Tell us about your business and we will run a scan on your actual location, walk you through what it shows, and quote you for it. No obligation and no sales script.",
              "Recite nam nešto o svom poslovanju i pokrenut ćemo skeniranje na vašoj stvarnoj lokaciji, provesti vas kroz ono što pokazuje i dati ponudu. Bez obveze i bez prodajnog scenarija.",
            )}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-14 grid gap-6 lg:grid-cols-5"
        >
          {/* Info panel */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-line bg-surface p-7">
              <h3 className="text-sm font-semibold text-foreground">
                {t("What a quote depends on", "O čemu ovisi ponuda")}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {scopeFactors.map((factor) => (
                  <li key={factor} className="flex gap-2.5 text-sm leading-relaxed text-secondary">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                    {factor}
                  </li>
                ))}
              </ul>

              <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-muted">
                {t(
                  "A single shop and a fifteen-location group are not the same product, so we would rather ask than publish a number that is wrong for you.",
                  "Jedna trgovina i grupa s petnaest lokacija nisu isti proizvod, pa radije pitamo nego objavimo broj koji za vas nije točan.",
                )}
              </p>

              <div className="mt-6 flex flex-col gap-3">
                <ButtonLink href="/app" variant="secondary" className="w-full">
                  {t("Open the demo first", "Prvo otvorite demo")}
                  <ArrowRight className="h-4 w-4" />
                </ButtonLink>
                <a
                  href={`mailto:${product.contactEmail}`}
                  className="inline-flex items-center justify-center gap-2 text-xs text-muted transition-colors hover:text-foreground"
                >
                  <Mail className="h-3.5 w-3.5" />
                  {product.contactEmail}
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-line bg-surface p-7">
              {status === "sent" ? (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex min-h-[380px] flex-col items-center justify-center text-center"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/25 bg-accent/10">
                    <Check className="h-5 w-5 text-accent" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold text-foreground">
                    {t("Thanks — that is enough to go on.", "Hvala — to nam je dovoljno za početak.")}
                  </h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-secondary">
                    {t(
                      "We will run a scan on your location and come back to you within one business day with what it shows and what it would cost.",
                      "Pokrenut ćemo skeniranje vaše lokacije i javiti se unutar jednog radnog dana s rezultatima i cijenom.",
                    )}
                  </p>
                  <p className="mt-6 text-xs text-faint">
                    {t(
                      "Demo build — nothing was actually sent.",
                      "Demo verzija — ništa nije stvarno poslano.",
                    )}
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={submit} className="grid gap-4 sm:grid-cols-2" noValidate>
                  <Field
                    name="name"
                    label={t("Your name", "Vaše ime")}
                    error={errors.name}
                    required
                  />
                  <Field
                    name="email"
                    type="email"
                    label={t("Email", "E-pošta")}
                    error={errors.email}
                    required
                  />
                  <Field
                    name="business"
                    label={t("Business name", "Naziv tvrtke")}
                    error={errors.business}
                    className="sm:col-span-2"
                    required
                  />
                  <Field name="city" label={t("City", "Grad")} error={errors.city} />
                  <Field
                    name="locations"
                    label={t("Number of locations", "Broj lokacija")}
                    error={errors.locations}
                  />

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="message"
                      className="mb-1.5 block text-xs font-medium text-secondary"
                    >
                      {t("Anything else we should know", "Još nešto što bismo trebali znati")}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full resize-y rounded-lg border border-line bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-faint focus:border-accent/40 focus:outline-none"
                      placeholder={t(
                        "Which searches matter most to you?",
                        "Koje su vam pretrage najvažnije?",
                      )}
                    />
                  </div>

                  <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
                    <Button type="submit" size="lg" disabled={status === "sending"}>
                      {status === "sending" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          {t("Sending…", "Šaljem…")}
                        </>
                      ) : (
                        <>
                          {t("Request a quote", "Zatražite ponudu")}
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                    <p className="text-xs text-faint">
                      {t(
                        "We reply within one business day.",
                        "Odgovaramo unutar jednog radnog dana.",
                      )}
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type = "text",
  error,
  className,
  required,
}: {
  name: string;
  label: string;
  type?: string;
  error?: string[];
  className?: string;
  required?: boolean;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1.5 block text-xs font-medium text-secondary">
        {label}
        {required ? <span className="ml-0.5 text-accent">*</span> : null}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        aria-invalid={Boolean(error)}
        className={cn(
          "w-full rounded-lg border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-faint focus:outline-none",
          error ? "border-negative/50" : "border-line focus:border-accent/40",
        )}
      />
      {error ? <p className="mt-1 text-[11px] text-negative">{error[0]}</p> : null}
    </div>
  );
}
