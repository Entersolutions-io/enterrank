"use client";

import { CodeBlock, DocsNote, SectionHeader } from "@/components/docs/api-parts";
import { StaticPageLayout } from "@/components/layout/static-page-layout";
import { useI18n } from "@/lib/i18n";
import { product } from "../../../../product.config";

export default function GuidePage() {
  const { t } = useI18n();

  const steps = [
    {
      title: t("Connect your Google Business Profile", "Povežite svoj Google poslovni profil"),
      body: t(
        "Authorise through Google's OAuth consent screen. We request read access to reviews, posts and insights, and write access to review replies. Nothing else — we cannot change your hours, name or address.",
        "Autorizirajte putem Googleovog zaslona privole. Tražimo pristup čitanju recenzija, objava i uvida te pisanju odgovora na recenzije. Ništa drugo — ne možemo mijenjati vaše radno vrijeme, naziv ni adresu.",
      ),
    },
    {
      title: t("Set your brand voice", "Postavite glas svoje marke"),
      body: t(
        "Two sliders and two word lists. This takes about five minutes and every generated reply is bound by it afterwards, so it is worth doing properly rather than accepting defaults.",
        "Dva klizača i dva popisa riječi. Traje otprilike pet minuta, a svaki generirani odgovor kasnije je time ograničen, pa se isplati napraviti kako treba, a ne prihvatiti zadano.",
      ),
    },
    {
      title: t("Add the search terms you care about", "Dodajte pojmove pretraživanja koji vam su važni"),
      body: t(
        "Start with what customers would actually type, not what you would like to rank for. Six to ten terms is plenty for a single location.",
        "Počnite s onim što bi kupci stvarno upisali, a ne s onim za što biste se htjeli rangirati. Šest do deset pojmova sasvim je dovoljno za jednu lokaciju.",
      ),
    },
    {
      title: t("Run your first grid scan", "Pokrenite prvo skeniranje mreže"),
      body: t(
        "A 7×7 grid at 500m spacing covers most city-centre service areas. Widen the spacing for rural or drive-to businesses.",
        "Mreža 7×7 s razmakom od 500 m pokriva većinu uslužnih područja u centru grada. Povećajte razmak za ruralne tvrtke ili one kojima se dolazi autom.",
      ),
    },
  ];

  return (
    <StaticPageLayout>
      <div className="mx-auto max-w-3xl">
        <h1
          className="text-4xl font-semibold tracking-tight text-foreground"
          style={{ letterSpacing: "-0.03em" }}
        >
          {t("Integration guide", "Vodič za integraciju")}
        </h1>
        <p className="mt-3 leading-relaxed text-secondary">
          {t(
            "From an empty workspace to a scan you can act on, then into your own systems.",
            "Od praznog radnog prostora do skeniranja na koje možete reagirati, a zatim do vlastitih sustava.",
          )}
        </p>

        <SectionHeader id="setup" title={t("Setting up", "Postavljanje")} />
        <ol className="space-y-4">
          {steps.map((step, i) => (
            <li key={step.title} className="flex gap-4 rounded-xl border border-line bg-surface p-5">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent/25 bg-accent/10 font-mono text-xs text-accent">
                {i + 1}
              </span>
              <div>
                <h3 className="text-sm font-semibold text-foreground">{step.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-secondary">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <SectionHeader id="first-call" title={t("Your first API call", "Vaš prvi API poziv")} />
        <p className="mb-4 text-sm leading-relaxed text-secondary">
          {t(
            "Create a key in Settings, then confirm it works. Every endpoint on this deployment answers against sample data, so this returns real JSON immediately.",
            "Stvorite ključ u Postavkama, zatim potvrdite da radi. Svaki endpoint na ovoj instalaciji odgovara nad uzorkom podataka pa ovo odmah vraća stvarni JSON.",
          )}
        </p>
        <CodeBlock>{`curl "${product.apiBaseUrl}/overview" \\
  -H "X-API-Key: ${product.apiKeyPrefix}live_your_key_here"`}</CodeBlock>

        <SectionHeader id="languages" title={t("Client examples", "Primjeri klijenata")} />
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-faint">JavaScript</p>
        <CodeBlock>{`const res = await fetch("${product.apiBaseUrl}/scans?keyword_id=kw_02", {
  headers: { "X-API-Key": process.env.ENTERRANK_KEY },
});
const { data } = await res.json();

// Points where you are not in the top 3 — the ones worth doing something about.
const weak = data.points.filter((p) => p.rank === null || p.rank > 3);
console.log(\`\${weak.length} of \${data.points.length} points need work\`);`}</CodeBlock>

        <p className="mb-3 mt-6 text-xs font-medium uppercase tracking-wide text-faint">PHP</p>
        <CodeBlock>{`$ch = curl_init("${product.apiBaseUrl}/reviews?status=needs_reply");
curl_setopt($ch, CURLOPT_HTTPHEADER, ["X-API-Key: " . getenv("ENTERRANK_KEY")]);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$payload = json_decode(curl_exec($ch), true);
foreach ($payload["data"] as $review) {
    echo $review["author"] . " — " . $review["rating"] . "\\n";
}`}</CodeBlock>

        <p className="mb-3 mt-6 text-xs font-medium uppercase tracking-wide text-faint">Python</p>
        <CodeBlock>{`import os, requests

r = requests.get(
    "${product.apiBaseUrl}/ai-visibility",
    headers={"X-API-Key": os.environ["ENTERRANK_KEY"]},
    timeout=10,
)
r.raise_for_status()

for probe in r.json()["data"]:
    missed = [x["engine"] for x in probe["results"] if not x["mentioned"]]
    if missed:
        print(probe["prompt"]["en"], "-> not named by", ", ".join(missed))`}</CodeBlock>

        <SectionHeader id="webhooks" title={t("Verifying webhooks", "Provjera webhookova")} />
        <p className="mb-4 text-sm leading-relaxed text-secondary">
          {t(
            "Compare the signature header against an HMAC of the raw request body. Compare in constant time — a naive string equality check leaks timing information.",
            "Usporedite zaglavlje potpisa s HMAC-om sirovog tijela zahtjeva. Uspoređujte u konstantnom vremenu — naivna usporedba nizova otkriva vremenske informacije.",
          )}
        </p>
        <CodeBlock>{`import crypto from "node:crypto";

export function verify(rawBody, signatureHeader, secret) {
  const expected =
    "sha256=" + crypto.createHmac("sha256", secret).update(rawBody).digest("hex");

  const a = Buffer.from(expected);
  const b = Buffer.from(signatureHeader ?? "");
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}`}</CodeBlock>

        <SectionHeader id="limits" title={t("Rate limits and retries", "Ograničenja i ponavljanja")} />
        <DocsNote>
          {t(
            "600 requests per minute per key. Grid scans are far more expensive than reads and are additionally limited to 60 per day. A 429 response carries Retry-After in seconds; respect it rather than backing off on a fixed timer.",
            "600 zahtjeva u minuti po ključu. Skeniranja mreže znatno su skuplja od čitanja i dodatno su ograničena na 60 dnevno. Odgovor 429 nosi Retry-After u sekundama; poštujte ga umjesto odustajanja na fiksni tajmer.",
          )}
        </DocsNote>
      </div>
    </StaticPageLayout>
  );
}
