"use client";

import { CodeBlock, DocsNote, Endpoint, SectionHeader } from "@/components/docs/api-parts";
import { StaticPageLayout } from "@/components/layout/static-page-layout";
import { Badge } from "@/components/ui/primitives";
import { useI18n } from "@/lib/i18n";
import { product } from "../../../../product.config";

export default function ApiReferencePage() {
  const { t } = useI18n();

  return (
    <StaticPageLayout>
      <div className="mx-auto max-w-4xl">
        <div className="mb-10">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs text-muted">
            <span className="font-mono">{"{ }"}</span>
            {t("API reference", "API referenca")}
          </span>
          <h1
            className="mt-5 text-4xl font-semibold tracking-tight text-foreground"
            style={{ letterSpacing: "-0.03em" }}
          >
            {t("API reference", "API referenca")}
          </h1>
          <p className="mt-3 max-w-2xl leading-relaxed text-secondary">
            {t(
              "A REST API over the same data the dashboard uses: reviews, grid scans, AI visibility probes and profile signals. JSON in, JSON out.",
              "REST API nad istim podacima koje koristi nadzorna ploča: recenzije, skeniranja mreže, AI provjere vidljivosti i signali profila. JSON unutra, JSON van.",
            )}
          </p>
        </div>

        <DocsNote tone="caution">
          <strong>{t("This deployment runs in demo mode.", "Ova instalacija radi u demo načinu.")}</strong>{" "}
          {t(
            "Every endpoint below is live and returns real JSON against a fixed sample dataset — copy any command and run it. Write methods validate your request and return 202 Accepted without persisting anything. Responses carry a \"demo\": true flag and an X-EnterRank-Mode: demo header.",
            "Svaki endpoint u nastavku je aktivan i vraća stvarni JSON nad fiksnim uzorkom podataka — kopirajte bilo koju naredbu i pokrenite je. Metode pisanja provjeravaju zahtjev i vraćaju 202 Accepted bez ikakvog spremanja. Odgovori nose zastavicu \"demo\": true i zaglavlje X-EnterRank-Mode: demo.",
          )}
        </DocsNote>

        {/* Overview */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-line bg-surface p-4">
            <p className="mb-2 text-xs uppercase tracking-wide text-faint">
              {t("Base URL", "Osnovni URL")}
            </p>
            <code className="font-mono text-sm text-accent-light">{product.apiBaseUrl}</code>
          </div>
          <div className="rounded-xl border border-line bg-surface p-4">
            <p className="mb-2 text-xs uppercase tracking-wide text-faint">
              {t("Rate limit", "Ograničenje")}
            </p>
            <p className="font-mono text-sm text-foreground">600 {t("req / min", "zaht / min")}</p>
          </div>
          <div className="rounded-xl border border-line bg-surface p-4">
            <p className="mb-2 text-xs uppercase tracking-wide text-faint">
              {t("Format", "Format")}
            </p>
            <p className="font-mono text-sm text-foreground">JSON · UTF-8</p>
          </div>
        </div>

        {/* Authentication */}
        <SectionHeader id="authentication" title={t("Authentication", "Autentifikacija")} />
        <div className="rounded-xl border border-line bg-surface p-5">
          <p className="mb-4 text-sm leading-relaxed text-secondary">
            {t(
              "Server-to-server calls use an API key. Keys are created in Settings, shown once, and scoped to a single workspace.",
              "Pozivi server-prema-serveru koriste API ključ. Ključevi se stvaraju u Postavkama, prikazuju se jednom i vežu se uz jedan radni prostor.",
            )}
          </p>
          <CodeBlock>{`X-API-Key: ${product.apiKeyPrefix}live_your_key_here`}</CodeBlock>
          <p className="mb-1.5 mt-4 text-xs font-medium uppercase tracking-wide text-faint">
            {t("Browser sessions", "Sesije u pregledniku")}
          </p>
          <CodeBlock>{`Authorization: Bearer <session_token>`}</CodeBlock>
        </div>

        {/* Pagination */}
        <SectionHeader id="pagination" title={t("Pagination", "Straničenje")} />
        <div className="rounded-xl border border-line bg-surface p-5">
          <p className="mb-4 text-sm leading-relaxed text-secondary">
            {t(
              "List endpoints return a paginated envelope. Pass page and per_page; per_page is capped at 100.",
              "Endpointi za liste vraćaju straničenu ovojnicu. Proslijedite page i per_page; per_page je ograničen na 100.",
            )}
          </p>
          <CodeBlock>{`GET ${product.apiBaseUrl}/reviews?page=2&per_page=25

{
  "data": [ ... ],
  "meta": {
    "current_page": 2,
    "per_page": 25,
    "total": 218,
    "last_page": 9
  }
}`}</CodeBlock>
        </div>

        {/* Errors */}
        <SectionHeader id="errors" title={t("Errors", "Greške")} />
        <div className="mb-4 overflow-x-auto rounded-xl border border-line">
          <table className="w-full min-w-[520px] text-sm">
            <tbody className="divide-y divide-line">
              {[
                { code: "400", name: "bad_request", desc: t("Malformed query string.", "Neispravan niz upita.") },
                { code: "401", name: "unauthenticated", desc: t("Missing or invalid API key.", "Nedostaje ili je neispravan API ključ.") },
                { code: "403", name: "forbidden", desc: t("Key is not scoped to this location.", "Ključ nije vezan uz ovu lokaciju.") },
                { code: "404", name: "not_found", desc: t("No resource matches that identifier.", "Nijedan resurs ne odgovara tom identifikatoru.") },
                { code: "422", name: "unprocessable", desc: t("Validation failed; see error.fields.", "Provjera nije uspjela; vidi error.fields.") },
                { code: "429", name: "rate_limited", desc: t("Retry after the seconds given in Retry-After.", "Pokušajte ponovno nakon sekundi navedenih u Retry-After.") },
              ].map((row) => (
                <tr key={row.code}>
                  <td className="w-16 px-4 py-2.5 font-mono text-xs text-foreground">{row.code}</td>
                  <td className="w-44 px-4 py-2.5 font-mono text-xs text-accent-light">{row.name}</td>
                  <td className="px-4 py-2.5 text-xs text-muted">{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <CodeBlock>{`{
  "error": {
    "code": "unprocessable",
    "message": "No tracked keyword with id kw_99.",
    "fields": {
      "keyword_id": ["Must be one of: kw_01, kw_02, kw_03, kw_04, kw_05, kw_06"]
    }
  }
}`}</CodeBlock>

        {/* Reviews */}
        <SectionHeader id="reviews" title={t("Reviews", "Recenzije")} />
        <Endpoint
          method="GET"
          path="/reviews"
          description={t(
            "Lists reviews, newest first.",
            "Prikazuje recenzije, najnovije prve.",
          )}
          params={[
            { name: "status", type: "string", description: "needs_reply · drafted · answered · ignored" },
            { name: "sentiment", type: "string", description: "positive · neutral · negative" },
            { name: "rating", type: "integer", description: "1–5" },
            { name: "page", type: "integer", description: t("Default 1", "Zadano 1") },
            { name: "per_page", type: "integer", description: t("Default 25, max 100", "Zadano 25, najviše 100") },
          ]}
          request={`curl "${product.apiBaseUrl}/reviews?status=needs_reply&per_page=2" \\
  -H "X-API-Key: ${product.apiKeyPrefix}live_your_key_here"`}
          response={`{
  "data": [
    {
      "id": "rev_2f9a1",
      "author": "Marina Kovač",
      "rating": 2,
      "createdAt": "2026-07-27T16:52:00Z",
      "status": "needs_reply",
      "sentiment": "negative",
      "sentimentConfidence": 0.94,
      "intent": "wait_time",
      "topics": ["waiting time", "colour service", "pricing"]
    }
  ],
  "meta": { "current_page": 1, "per_page": 2, "total": 4, "last_page": 2 }
}`}
        />
        <Endpoint
          method="GET"
          path="/reviews/{id}"
          description={t("Returns a single review with its reply, if one exists.", "Vraća jednu recenziju s odgovorom, ako postoji.")}
          request={`curl "${product.apiBaseUrl}/reviews/rev_2f9a1" \\
  -H "X-API-Key: ${product.apiKeyPrefix}live_your_key_here"`}
          response={`{ "data": { "id": "rev_2f9a1", "author": "Marina Kovač", ... } }`}
        />
        <Endpoint
          method="POST"
          path="/reviews/{id}/reply"
          description={t(
            "Generates a reply draft in the workspace brand voice, optimised for the location's target keywords. Nothing is published.",
            "Generira nacrt odgovora u glasu marke radnog prostora, optimiziran za ciljne ključne riječi lokacije. Ništa se ne objavljuje.",
          )}
          request={`curl -X POST "${product.apiBaseUrl}/reviews/rev_2f9a1/reply" \\
  -H "X-API-Key: ${product.apiKeyPrefix}live_your_key_here"`}
          response={`{
  "data": {
    "review_id": "rev_2f9a1",
    "text": { "en": "Marina, you are right and we are sorry...", "hr": "..." },
    "keywords": ["Ilica hair salon", "colour appointment"],
    "seo_score": 87,
    "stages": [
      { "id": "analyze",  "duration_ms": 900 },
      { "id": "voice",    "duration_ms": 700 },
      { "id": "keywords", "duration_ms": 800 },
      { "id": "compose",  "duration_ms": 600 }
    ],
    "generated_at": "2026-07-28T07:00:00Z"
  }
}`}
        />
        <Endpoint
          method="PUT"
          path="/reviews/{id}/reply"
          description={t("Publishes an approved reply to Google.", "Objavljuje odobreni odgovor na Google.")}
          request={`curl -X PUT "${product.apiBaseUrl}/reviews/rev_2f9a1/reply" \\
  -H "X-API-Key: ${product.apiKeyPrefix}live_your_key_here" \\
  -H "Content-Type: application/json" \\
  -d '{"text": "Marina, you are right and we are sorry..."}'`}
          response={`{
  "accepted": true,
  "applied": false,
  "message": "Publishing a reply to review rev_2f9a1 was accepted but not persisted — this deployment runs in demo mode."
}`}
        />

        {/* Rankings */}
        <SectionHeader id="rankings" title={t("Rankings", "Rangiranje")} />
        <Endpoint
          method="GET"
          path="/keywords"
          description={t("Lists tracked search terms.", "Prikazuje praćene pojmove pretraživanja.")}
          request={`curl "${product.apiBaseUrl}/keywords" \\
  -H "X-API-Key: ${product.apiKeyPrefix}live_your_key_here"`}
          response={`{
  "data": [
    { "id": "kw_02", "term": { "en": "balayage zagreb" }, "volume": 1300, "avgRank": 2.4, "delta": -0.8 }
  ],
  "meta": { "current_page": 1, "per_page": 25, "total": 6, "last_page": 1 }
}`}
        />
        <Endpoint
          method="GET"
          path="/scans"
          description={t(
            "Runs a geo-grid scan for one keyword and returns every sampled point. rank is null where the business does not appear.",
            "Pokreće geo-grid skeniranje za jednu ključnu riječ i vraća svaku uzorkovanu točku. rank je null gdje se tvrtka ne pojavljuje.",
          )}
          params={[
            { name: "keyword_id", type: "string", description: t("Required in practice; defaults to the first tracked term", "U praksi obavezno; zadano je prvi praćeni pojam") },
            { name: "size", type: "integer", description: t("Odd number 5–13. Grid is size × size", "Neparan broj 5–13. Mreža je size × size") },
            { name: "spacing_meters", type: "integer", description: "100–5000" },
          ]}
          request={`curl "${product.apiBaseUrl}/scans?keyword_id=kw_02&size=7&spacing_meters=500" \\
  -H "X-API-Key: ${product.apiKeyPrefix}live_your_key_here"`}
          response={`{
  "data": {
    "id": "scan_kw_02",
    "keywordId": "kw_02",
    "size": 7,
    "spacingMeters": 500,
    "ranAt": "2026-07-28T06:00:00Z",
    "points": [
      { "row": 0, "col": 0, "offsetX": -1500, "offsetY": -1500, "rank": 4, "topCompetitor": "Salon Adriana" }
    ],
    "avgRank": 2.4,
    "atrs": 97.6,
    "solv": 95.9
  },
  "history": [ { "date": "2026-07-28", "atrs": 41.7 } ]
}`}
        />

        {/* AI visibility */}
        <SectionHeader id="ai-visibility" title={t("AI visibility", "AI vidljivost")} />
        <Endpoint
          method="GET"
          path="/ai-visibility"
          description={t(
            "Returns tracked prompts with each assistant's verdict, the competitors named instead, and the sources cited.",
            "Vraća praćene upite s presudom svakog asistenta, konkurentima spomenutima umjesto vas i citiranim izvorima.",
          )}
          params={[
            { name: "engine", type: "string", description: "chatgpt · gemini · perplexity · ai_overviews" },
          ]}
          request={`curl "${product.apiBaseUrl}/ai-visibility?engine=chatgpt" \\
  -H "X-API-Key: ${product.apiKeyPrefix}live_your_key_here"`}
          response={`{
  "data": [
    {
      "id": "probe_01",
      "prompt": { "en": "best hair salon in central Zagreb" },
      "visibilityScore": 62,
      "delta": 14,
      "results": [
        {
          "engine": "chatgpt",
          "mentioned": true,
          "position": 2,
          "competitorsNamed": ["Salon Adriana", "Hair Lab Zagreb"],
          "citedSources": ["google.com/maps", "studiolucia.hr", "tripadvisor.com"],
          "checkedAt": "2026-07-28T05:00:00Z"
        }
      ]
    }
  ],
  "meta": { "current_page": 1, "per_page": 25, "total": 4, "last_page": 1 }
}`}
        />

        {/* Presence */}
        <SectionHeader id="presence" title={t("Presence", "Prisutnost")} />
        <Endpoint
          method="GET"
          path="/presence/profile-score"
          description={t(
            "Returns the weighted profile completeness score and the individual checks behind it.",
            "Vraća ponderiranu ocjenu potpunosti profila i pojedinačne provjere iza nje.",
          )}
          request={`curl "${product.apiBaseUrl}/presence/profile-score" \\
  -H "X-API-Key: ${product.apiKeyPrefix}live_your_key_here"`}
          response={`{
  "data": {
    "location_id": "loc_8f21c",
    "score": 78,
    "checks": [
      { "id": "chk_03", "weight": 14, "passed": false,
        "label": { "en": "All services listed with prices" } }
    ]
  }
}`}
        />
        <Endpoint
          method="GET"
          path="/presence/posts"
          description={t("Lists profile posts.", "Prikazuje objave na profilu.")}
          params={[{ name: "status", type: "string", description: "draft · scheduled · published" }]}
          request={`curl "${product.apiBaseUrl}/presence/posts?status=published" \\
  -H "X-API-Key: ${product.apiKeyPrefix}live_your_key_here"`}
          response={`{
  "data": [
    { "id": "post_03", "status": "published", "cta": "learn_more",
      "publishedAt": "2026-07-22T08:00:00Z", "metrics": { "views": 1284, "clicks": 96 } }
  ],
  "meta": { "current_page": 1, "per_page": 25, "total": 3, "last_page": 1 }
}`}
        />
        <Endpoint
          method="GET"
          path="/presence/questions"
          description={t("Lists profile questions.", "Prikazuje pitanja na profilu.")}
          params={[{ name: "unanswered", type: "boolean", description: t("true returns only unanswered questions", "true vraća samo neodgovorena pitanja") }]}
          request={`curl "${product.apiBaseUrl}/presence/questions?unanswered=true" \\
  -H "X-API-Key: ${product.apiKeyPrefix}live_your_key_here"`}
          response={`{
  "data": [
    { "id": "qst_01", "author": "Marta B.", "views": 340,
      "question": { "en": "Do you do keratin treatments and how much do they cost?" } }
  ],
  "meta": { "current_page": 1, "per_page": 25, "total": 4, "last_page": 1 }
}`}
        />

        {/* Other */}
        <SectionHeader id="workspace" title={t("Workspace", "Radni prostor")} />
        <Endpoint
          method="GET"
          path="/overview"
          description={t("Returns the dashboard metrics, including weekly series.", "Vraća metrike nadzorne ploče, uključujući tjedne serije.")}
          request={`curl "${product.apiBaseUrl}/overview" \\
  -H "X-API-Key: ${product.apiKeyPrefix}live_your_key_here"`}
          response={`{
  "data": {
    "reviewsAwaitingReply": 4,
    "medianResponseHours": 9,
    "rating": 4.6,
    "avgRank": 4.2,
    "aiVisibilityScore": 47,
    "profileScore": 78
  }
}`}
        />
        <Endpoint
          method="GET"
          path="/locations"
          description={t("Lists locations connected to the workspace.", "Prikazuje lokacije povezane s radnim prostorom.")}
          request={`curl "${product.apiBaseUrl}/locations" \\
  -H "X-API-Key: ${product.apiKeyPrefix}live_your_key_here"`}
          response={`{
  "data": [
    { "id": "loc_8f21c", "name": "Studio Lucia", "city": "Zagreb",
      "gbpLocationId": "locations/4192837465102938471", "rating": 4.6, "reviewCount": 218 }
  ],
  "meta": { "current_page": 1, "per_page": 25, "total": 1, "last_page": 1 }
}`}
        />
        <Endpoint
          method="GET"
          path="/competitors"
          description={t("Lists the tracked local competitor set.", "Prikazuje praćeni skup lokalne konkurencije.")}
          request={`curl "${product.apiBaseUrl}/competitors" \\
  -H "X-API-Key: ${product.apiKeyPrefix}live_your_key_here"`}
          response={`{
  "data": [
    { "id": "cmp_01", "name": "Salon Adriana", "rating": 4.8, "reviewCount": 412,
      "avgRank": 1.9, "aiVisibility": 71, "distanceMeters": 380 }
  ],
  "meta": { "current_page": 1, "per_page": 25, "total": 5, "last_page": 1 }
}`}
        />

        <Endpoint
          method="POST"
          path="/contact"
          description={t(
            "Submits a quote enquiry. Pricing is scoped per workspace rather than published, so this is how a quote is requested.",
            "Šalje upit za ponudu. Cijena se određuje po radnom prostoru umjesto da se objavljuje, pa se ponuda traži ovim putem.",
          )}
          request={`curl -X POST "${product.apiBaseUrl}/contact" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Lucia Marić",
    "email": "lucia@studiolucia.hr",
    "business": "Studio Lucia",
    "city": "Zagreb",
    "locations": "1"
  }'`}
          response={`{
  "accepted": true,
  "applied": false,
  "message": "Your enquiry was accepted but not persisted — this deployment runs in demo mode."
}`}
        />

        {/* Webhooks */}
        <SectionHeader id="webhooks" title={t("Webhooks", "Webhookovi")} />
        <div className="rounded-xl border border-line bg-surface p-5">
          <div className="mb-4 flex flex-wrap gap-2">
            {["review.created", "review.replied", "scan.completed", "ai_visibility.changed", "profile.check_failed"].map(
              (event) => (
                <Badge key={event} tone="neutral" mono>
                  {event}
                </Badge>
              ),
            )}
          </div>
          <p className="mb-4 text-sm leading-relaxed text-secondary">
            {t(
              "Events are delivered as POST requests signed with HMAC-SHA256 in the X-EnterRank-Signature header. Respond 2xx within 5 seconds; failures retry with exponential backoff for 24 hours.",
              "Događaji se isporučuju kao POST zahtjevi potpisani HMAC-SHA256 u zaglavlju X-EnterRank-Signature. Odgovorite 2xx unutar 5 sekundi; neuspjesi se ponavljaju s eksponencijalnim odmakom 24 sata.",
            )}
          </p>
          <CodeBlock>{`POST https://your-server.example/hooks/enterrank
X-EnterRank-Signature: sha256=...
Content-Type: application/json

{
  "event": "review.created",
  "created_at": "2026-07-27T16:52:04Z",
  "data": {
    "review_id": "rev_2f9a1",
    "location_id": "loc_8f21c",
    "rating": 2,
    "sentiment": "negative",
    "intent": "wait_time"
  }
}`}</CodeBlock>
        </div>
      </div>
    </StaticPageLayout>
  );
}
