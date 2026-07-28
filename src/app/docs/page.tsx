"use client";

import { ArrowRight, BookOpen, Braces, Compass } from "lucide-react";
import Link from "next/link";
import { StaticPageLayout } from "@/components/layout/static-page-layout";
import { useI18n } from "@/lib/i18n";
import { pillars, product } from "../../../product.config";

export default function DocsPage() {
  const { t, pick } = useI18n();

  const cards = [
    {
      href: "/docs/guide",
      icon: Compass,
      title: t("Integration guide", "Vodič za integraciju"),
      body: t(
        "Connect a Google Business Profile, pull your first grid scan and wire up webhooks.",
        "Povežite Google poslovni profil, povucite prvo skeniranje mreže i postavite webhookove.",
      ),
    },
    {
      href: "/docs/api",
      icon: Braces,
      title: t("API reference", "API referenca"),
      body: t(
        "Every endpoint with example requests and responses. Runnable against this deployment.",
        "Svaki endpoint s primjerima zahtjeva i odgovora. Izvršivo nad ovom instalacijom.",
      ),
    },
  ];

  return (
    <StaticPageLayout>
      <div className="mx-auto max-w-4xl">
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs text-muted">
          <BookOpen className="h-3 w-3" />
          {t("Documentation", "Dokumentacija")}
        </span>
        <h1
          className="mt-5 text-4xl font-semibold tracking-tight text-foreground"
          style={{ letterSpacing: "-0.03em" }}
        >
          {t("Documentation", "Dokumentacija")}
        </h1>
        <p className="mt-3 max-w-2xl leading-relaxed text-secondary">
          {t(
            `How ${product.fullName} works, what it measures, and how to drive it from your own systems.`,
            `Kako ${product.fullName} radi, što mjeri i kako ga voditi iz vlastitih sustava.`,
          )}
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {cards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group rounded-xl border border-line bg-surface p-6 transition-colors hover:border-line-strong"
            >
              <card.icon className="h-5 w-5 text-accent" />
              <h2 className="mt-4 text-base font-semibold text-foreground">{card.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{card.body}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted transition-colors group-hover:text-accent">
                {t("Read", "Pročitaj")}
                <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>

        <h2 className="mt-16 text-lg font-semibold text-foreground">
          {t("Concepts", "Pojmovi")}
        </h2>
        <div className="mt-5 space-y-4">
          {pillars.map((pillar) => (
            <div key={pillar.id} className="rounded-xl border border-line bg-surface p-5">
              <div className="flex flex-wrap items-baseline gap-3">
                <h3 className="text-sm font-semibold text-foreground">{pick(pillar.label)}</h3>
                <span className="text-xs text-faint">{pick(pillar.question)}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-secondary">{pick(pillar.blurb)}</p>
            </div>
          ))}
        </div>

        <h2 className="mt-16 text-lg font-semibold text-foreground">
          {t("Glossary", "Pojmovnik")}
        </h2>
        <dl className="mt-5 divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
          {[
            {
              term: "ATRS",
              def: t(
                "Average Total Rank Score. A 0–100 blend of how much of the grid you appear on and how well you place where you do.",
                "Prosječna ukupna ocjena ranga. Mjera 0–100 koja spaja koliki dio mreže pokrivate i koliko dobro stojite ondje gdje se pojavljujete.",
              ),
            },
            {
              term: "SoLV",
              def: t(
                "Share of Local Voice. The percentage of grid points where you hold a top-3 position.",
                "Udio lokalnog glasa. Postotak točaka mreže na kojima držite poziciju u prve tri.",
              ),
            },
            {
              term: t("Geo grid", "Geo mreža"),
              def: t(
                "A square lattice of sample points around your business. Each point is searched separately, because Google ranks differently from every location.",
                "Kvadratna rešetka uzorkovanih točaka oko vaše tvrtke. Svaka se točka pretražuje zasebno jer Google rangira drukčije s obzirom na lokaciju.",
              ),
            },
            {
              term: "AEO",
              def: t(
                "Answer Engine Optimisation. Being named in the answer an AI assistant gives, rather than ranking in a list of links.",
                "Optimizacija za motore odgovora. Biti spomenut u odgovoru koji daje AI asistent, umjesto rangiranja na popisu poveznica.",
              ),
            },
            {
              term: t("Brand voice", "Glas marke"),
              def: t(
                "The tone, banned words and target keywords every generated reply is constrained by.",
                "Ton, zabranjene riječi i ciljne ključne riječi kojima je ograničen svaki generirani odgovor.",
              ),
            },
          ].map((entry) => (
            <div key={entry.term} className="px-5 py-4">
              <dt className="font-mono text-xs text-accent-light">{entry.term}</dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-secondary">{entry.def}</dd>
            </div>
          ))}
        </dl>
      </div>
    </StaticPageLayout>
  );
}
