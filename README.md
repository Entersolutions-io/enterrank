<p align="center">
  <strong style="font-size: 32px;">Enter<span style="color: #10B981">Rank</span></strong>
</p>

<p align="center">
  Local Visibility Command Center — know whether customers can find you, whether they choose you, and whether you answered them.
</p>

<p align="center">
  <a href="#what-it-does">What it does</a> &nbsp;&middot;&nbsp;
  <a href="#the-four-pillars">Pillars</a> &nbsp;&middot;&nbsp;
  <a href="#architecture">Architecture</a> &nbsp;&middot;&nbsp;
  <a href="#running-locally">Running locally</a> &nbsp;&middot;&nbsp;
  <a href="#api">API</a> &nbsp;&middot;&nbsp;
  <a href="#deployment">Deployment</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=next.js&logoColor=white" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 19" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript 5" />
  <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
  <img src="https://img.shields.io/badge/Cloud%20Run-europe--west1-4285F4?style=flat-square&logo=googlecloud&logoColor=white" alt="Cloud Run" />
</p>

---

## About

**EnterRank** is a local visibility platform built by [EnterSolutions](https://entersolutions.io) for small
businesses — salons, clinics, restaurants, workshops — whose customers find them through Google Maps and,
increasingly, by asking an AI assistant.

Most tools in this category answer one question: *what is my rank?* EnterRank is organised around four,
because a business that ranks well and never replies to a one-star review still loses the customer.

> **This repository is a working product skeleton.** The interface, the data model, the API surface and
> the interaction design are all real. The data behind them is a fixed sample dataset rather than a live
> Google Business Profile connection, and reply drafts come from fixtures rather than a model call.
> See [Demo mode](#demo-mode).

---

## What it does

- Reads every review on a Google Business Profile and classifies it by sentiment, intent and topic
- Drafts a reply in the business's own voice, optimised for the local terms it wants to rank for — and refuses to auto-publish anything it is not confident about
- Scans Google Maps rankings from a grid of points across the service area, so "where do I rank" becomes a map rather than a number
- Checks whether ChatGPT, Gemini, Perplexity and Google AI Overviews name the business when asked for a recommendation, and records what they cited instead
- Scores profile completeness against weighted checks and says which gap to close first

## The four pillars

| Pillar | Question it answers | Headline metric |
|---|---|---|
| **Reviews** | Did you answer them? | Median response time, rating trend |
| **Rankings** | Can they find you? | ATRS (coverage × position), SoLV |
| **AI Visibility** | Do assistants recommend you? | Blended visibility score across 4 engines |
| **Presence** | Is your profile working? | Weighted profile health score |

## Architecture

```
src/
├─ app/
│  ├─ page.tsx              Marketing site — hero, live grid demo, pillars, AEO section, pricing
│  ├─ app/                  The product: dashboard, reviews, rankings, ai-visibility, presence,
│  │                        competitors, brand-voice, settings
│  ├─ api/v1/               Public REST API — real route handlers over the sample dataset
│  ├─ docs/                 Concepts, integration guide, full API reference
│  ├─ status/ changelog/    Service status and release history
│  └─ privacy/ terms/ …     Legal set (privacy, terms, cookies, gdpr, dpa)
├─ components/
│  ├─ marketing/            Landing sections
│  ├─ app-shell/            Sidebar, topbar, stat cards
│  ├─ rankings/geo-grid     The grid heatmap — shared by the landing page and the app
│  ├─ ai-visibility/        Probe runner — shared the same way
│  ├─ reviews/              Reply composer
│  └─ docs/ legal/ ui/      Documentation parts, legal renderer, primitives
├─ lib/                     types · i18n · api-response · utils
├─ mock/                    The sample dataset
└─ content/                 Legal copy
product.config.ts           Name, domain, accent, pillars — the file that identifies this product
```

### Design decisions worth knowing

**Grid scans are calibrated, not random.** `buildScan()` generates a deterministic heatmap from a
keyword id, shaped so rankings decay outward from the business and calibrated so the mean position
across the grid lands on the keyword's declared average. The table and the map can never disagree.

**The reply composer never publishes on its own.** Replies below the configured star threshold, and
any review where sentiment confidence is under 75%, always wait for a human. A misread complaint
answered cheerfully is worse than a late reply.

**No photographs of people.** Reviewer identities in the sample data are fictional, so the UI renders
initials avatars rather than invented faces.

**i18n is runtime, not routed.** `t("English", "Hrvatski")` over React Context, with the locale in
`localStorage`. Copy lives next to the markup it belongs to.

## Running locally

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build        # production build
npm run lint         # eslint
npx tsc --noEmit     # typecheck
```

## API

Every endpoint documented at `/docs/api` is live and returns real JSON. Copy any example and run it:

```bash
curl "http://localhost:3000/api/v1/scans?keyword_id=kw_02&size=7"
curl "http://localhost:3000/api/v1/reviews?status=needs_reply"
curl -X POST "http://localhost:3000/api/v1/reviews/rev_2f9a1/reply"
```

List endpoints return a `{ data, meta }` envelope. Validation failures return `422` with
`error.fields`. Write methods return `202 Accepted` without persisting.

## Demo mode

| | Real | Sample |
|---|---|---|
| UI, routing, state, animation | ✅ | |
| Data model and API contract | ✅ | |
| Grid scan generation and scoring | ✅ deterministic model | |
| REST endpoints and validation | ✅ | |
| Google Business Profile connection | | ✅ fixtures |
| Model-generated reply text | | ✅ pre-written drafts |
| AI assistant probing | | ✅ fixtures |

Swapping to a live backend means changing the base URL in the API client and replacing
`src/app/api/v1/**`. No component changes.

## Deployment

Google Cloud Run, `europe-west1`, same pipeline as EnterCRM and EnterLocal.

```bash
gcloud run deploy enterrank \
  --source . \
  --region europe-west1 \
  --allow-unauthenticated \
  --port 8080 --memory 512Mi \
  --min-instances 0 --max-instances 3
```

`cloudbuild.yaml` is ready to attach to a GitHub trigger on `main`.

## Images

Decorative backgrounds live in `public/images/` and are referenced before they exist — the site
renders correctly without them, falling back to CSS gradients.

---

<p align="center">
  <sub>A product of <a href="https://entersolutions.io">EnterSolutions</a></sub>
</p>
