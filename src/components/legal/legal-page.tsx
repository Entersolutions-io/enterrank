"use client";

import { StaticPageLayout } from "@/components/layout/static-page-layout";
import { useI18n } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";
import type { Bilingual } from "@/lib/types";

export interface LegalSection {
  heading: Bilingual;
  paragraphs: Bilingual[];
  bullets?: Bilingual[];
}

export interface LegalDocument {
  title: Bilingual;
  intro: Bilingual;
  updated: string;
  sections: LegalSection[];
}

export function LegalPage({ document }: { document: LegalDocument }) {
  const { t, pick } = useI18n();

  return (
    <StaticPageLayout>
      <article className="mx-auto max-w-3xl">
        <h1
          className="text-4xl font-semibold tracking-tight text-foreground"
          style={{ letterSpacing: "-0.03em" }}
        >
          {pick(document.title)}
        </h1>
        <p className="mt-2 text-xs text-faint">
          {t("Last updated", "Zadnje ažurirano")} {formatDate(document.updated)}
        </p>
        <p className="mt-5 leading-relaxed text-secondary">{pick(document.intro)}</p>

        <div className="mt-12 space-y-10">
          {document.sections.map((section, i) => (
            <section key={section.heading.en}>
              <h2 className="text-base font-semibold text-foreground">
                <span className="mr-2 font-mono text-xs text-faint">{i + 1}.</span>
                {pick(section.heading)}
              </h2>
              {section.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.en}
                  className="mt-3 text-sm leading-relaxed text-secondary"
                >
                  {pick(paragraph)}
                </p>
              ))}
              {section.bullets?.length ? (
                <ul className="mt-3 space-y-2">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet.en}
                      className="flex gap-2.5 text-sm leading-relaxed text-secondary"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {pick(bullet)}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        <p className="mt-14 border-t border-line pt-6 text-xs leading-relaxed text-faint">
          {t(
            "This document is provided for information and does not constitute legal advice. Review it with your own counsel before relying on it.",
            "Ovaj dokument služi za informiranje i ne predstavlja pravni savjet. Prije oslanjanja na njega, pregledajte ga sa svojim pravnim savjetnikom.",
          )}
        </p>
      </article>
    </StaticPageLayout>
  );
}
