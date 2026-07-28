"use client";

import { StaticPageLayout } from "@/components/layout/static-page-layout";
import { Badge } from "@/components/ui/primitives";
import { useI18n } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";

type Change = { kind: "added" | "improved" | "fixed"; en: string; hr: string };

const releases: { version: string; date: string; headline?: { en: string; hr: string }; changes: Change[] }[] = [
  {
    version: "1.4.0",
    date: "2026-07-22",
    headline: {
      en: "AI visibility leaves beta",
      hr: "AI vidljivost izlazi iz bete",
    },
    changes: [
      { kind: "added", en: "Google AI Overviews joins ChatGPT, Gemini and Perplexity as a tracked answer engine.", hr: "Google AI pregledi pridružuju se ChatGPT-u, Geminiju i Perplexityju kao praćeni motor odgovora." },
      { kind: "added", en: "Cited sources are now recorded per answer, so you can see what an assistant read before deciding.", hr: "Citirani izvori sada se bilježe po odgovoru pa možete vidjeti što je asistent pročitao prije odluke." },
      { kind: "improved", en: "Visibility score is weighted by assistant reach rather than counted flat.", hr: "Ocjena vidljivosti ponderira se dosegom asistenta umjesto da se broji ravnomjerno." },
    ],
  },
  {
    version: "1.3.2",
    date: "2026-07-04",
    changes: [
      { kind: "fixed", en: "Grid scans at 11×11 could time out on service areas wider than 4km.", hr: "Skeniranja mreže 11×11 mogla su isteći za uslužna područja šira od 4 km." },
      { kind: "fixed", en: "Croatian diacritics were stripped from generated replies in rare cases.", hr: "Hrvatski dijakritički znakovi u rijetkim su slučajevima uklanjani iz generiranih odgovora." },
      { kind: "improved", en: "Reply drafts now avoid repeating the reviewer's exact wording back at them.", hr: "Nacrti odgovora sada izbjegavaju doslovno ponavljanje riječi recenzenta." },
    ],
  },
  {
    version: "1.3.0",
    date: "2026-06-16",
    headline: {
      en: "Confidence gating for auto-replies",
      hr: "Kontrola pouzdanosti za automatske odgovore",
    },
    changes: [
      { kind: "added", en: "Reviews whose sentiment confidence falls below 75% are never auto-published, regardless of star rating.", hr: "Recenzije s pouzdanošću sentimenta ispod 75% nikada se ne objavljuju automatski, bez obzira na ocjenu." },
      { kind: "added", en: "Spam detection flags promotional reviews and drafts a report-to-Google response instead.", hr: "Otkrivanje neželjenog sadržaja označava promotivne recenzije i umjesto odgovora sastavlja prijavu Googleu." },
      { kind: "improved", en: "Brand voice preview updates live as you move the tone sliders.", hr: "Pregled glasa marke ažurira se uživo dok pomičete klizače tona." },
    ],
  },
  {
    version: "1.2.0",
    date: "2026-05-28",
    changes: [
      { kind: "added", en: "Profile health scoring with weighted checks and per-check hints.", hr: "Ocjenjivanje zdravlja profila s ponderiranim provjerama i savjetima po provjeri." },
      { kind: "added", en: "Webhook events for review.created and scan.completed.", hr: "Webhook događaji za review.created i scan.completed." },
      { kind: "improved", en: "Grid heatmap points are now keyboard-navigable and screen-reader labelled.", hr: "Točkama mreže sada se može upravljati tipkovnicom i označene su za čitače zaslona." },
    ],
  },
  {
    version: "1.1.0",
    date: "2026-04-30",
    changes: [
      { kind: "added", en: "Competitor set with side-by-side rating, review volume and average rank.", hr: "Skup konkurencije s usporednom ocjenom, brojem recenzija i prosječnim rangom." },
      { kind: "improved", en: "Scans are calibrated so the keyword table and the heatmap can no longer disagree.", hr: "Skeniranja su kalibrirana tako da se tablica ključnih riječi i toplinska karta više ne mogu razilaziti." },
      { kind: "fixed", en: "Language preference was lost on hard refresh.", hr: "Postavka jezika gubila se pri potpunom osvježavanju." },
    ],
  },
  {
    version: "1.0.0",
    date: "2026-03-18",
    headline: { en: "First public release", hr: "Prvo javno izdanje" },
    changes: [
      { kind: "added", en: "Review inbox with sentiment and intent analysis.", hr: "Pristigle recenzije s analizom sentimenta i namjere." },
      { kind: "added", en: "Brand-voice reply generation with keyword scoring.", hr: "Generiranje odgovora u glasu marke s ocjenjivanjem ključnih riječi." },
      { kind: "added", en: "Geo-grid ranking scans up to 13×13.", hr: "Geo-grid skeniranja rangiranja do 13×13." },
      { kind: "added", en: "English and Croatian throughout.", hr: "Engleski i hrvatski u cijelom sučelju." },
    ],
  },
];

const kindTone = { added: "positive", improved: "info", fixed: "caution" } as const;

export default function ChangelogPage() {
  const { t, pick } = useI18n();

  const kindLabel = {
    added: t("Added", "Dodano"),
    improved: t("Improved", "Poboljšano"),
    fixed: t("Fixed", "Ispravljeno"),
  };

  return (
    <StaticPageLayout>
      <div className="mx-auto max-w-3xl">
        <h1
          className="text-4xl font-semibold tracking-tight text-foreground"
          style={{ letterSpacing: "-0.03em" }}
        >
          {t("Changelog", "Popis promjena")}
        </h1>
        <p className="mt-3 text-sm text-secondary">
          {t("What shipped, and when.", "Što je isporučeno i kada.")}
        </p>

        <div className="mt-12 space-y-12">
          {releases.map((release) => (
            <section key={release.version} className="relative pl-6">
              <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-accent" />
              <span className="absolute left-[3.5px] top-6 h-[calc(100%-1rem)] w-px bg-line" />

              <div className="flex flex-wrap items-baseline gap-3">
                <h2 className="font-mono text-sm font-semibold text-foreground">
                  v{release.version}
                </h2>
                <span className="text-xs text-faint">{formatDate(release.date)}</span>
              </div>

              {release.headline ? (
                <p className="mt-1.5 text-base font-medium text-foreground">
                  {pick(release.headline)}
                </p>
              ) : null}

              <ul className="mt-4 space-y-2.5">
                {release.changes.map((change) => (
                  <li key={change.en} className="flex flex-wrap items-start gap-2.5">
                    <Badge tone={kindTone[change.kind]}>{kindLabel[change.kind]}</Badge>
                    <span className="flex-1 text-sm leading-relaxed text-secondary">
                      {pick(change)}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </StaticPageLayout>
  );
}
