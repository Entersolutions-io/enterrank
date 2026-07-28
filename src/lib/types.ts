/**
 * Domain model for EnterRank.
 *
 * These types are the contract the UI is built against. The demo build satisfies them from
 * fixtures in `src/mock/`; a production build would satisfy them from the Google Business
 * Profile API and an LLM provider without any component changing. Field names deliberately
 * mirror what the real upstream APIs return.
 */

export type Locale = "en" | "hr";
export type Bilingual = { en: string; hr: string };

/* ── Locations ────────────────────────────────────────────────────────── */

export interface Location {
  id: string;
  /** Google Business Profile location id, in Google's own `locations/{id}` shape. */
  gbpLocationId: string;
  name: string;
  category: Bilingual;
  address: string;
  city: string;
  country: string;
  /** Centre point used as the origin of ranking grid scans. */
  lat: number;
  lng: number;
  phone: string;
  website: string;
  rating: number;
  reviewCount: number;
  /** 0–100 completeness of the Google profile — the Presence pillar's headline number. */
  profileScore: number;
  connectedAt: string;
}

/* ── Reviews ──────────────────────────────────────────────────────────── */

export type Sentiment = "positive" | "neutral" | "negative";

/** What the reviewer actually wants — drives which reply template and escalation applies. */
export type ReviewIntent =
  | "praise"
  | "service_complaint"
  | "pricing_concern"
  | "wait_time"
  | "staff_mention"
  | "question"
  | "spam";

export type ReviewStatus = "needs_reply" | "drafted" | "answered" | "ignored";

export interface Review {
  id: string;
  locationId: string;
  author: string;
  /** Reviewer profile photos are never stored; the UI renders initials avatars. */
  rating: 1 | 2 | 3 | 4 | 5;
  text: Bilingual;
  createdAt: string;
  status: ReviewStatus;
  sentiment: Sentiment;
  /** Model confidence in the sentiment call, 0–1. Low values surface a "verify" hint. */
  sentimentConfidence: number;
  intent: ReviewIntent;
  /** Topics extracted from the review body, used for trend analysis. */
  topics: string[];
  /** Populated once a reply has been generated or published. */
  reply?: ReviewReply;
}

export interface ReviewReply {
  text: Bilingual;
  /** Keywords the draft was optimised around; highlighted in the composer. */
  keywords: string[];
  /** 0–100 heuristic blend of keyword coverage, length, personalisation and tone match. */
  seoScore: number;
  generatedAt: string;
  publishedAt?: string;
  /** True when an auto-reply rule published this without human review. */
  automated: boolean;
}

/** The staged work the composer animates through while a draft is produced. */
export interface ReplyGenerationStage {
  id: "analyze" | "voice" | "keywords" | "compose";
  label: Bilingual;
  durationMs: number;
}

/* ── Brand voice ──────────────────────────────────────────────────────── */

export interface BrandVoice {
  locationId: string;
  /** 0 = formal, 100 = casual. */
  formality: number;
  /** 0 = concise, 100 = warm and expansive. */
  warmth: number;
  /** Words the model must never produce (competitor names, discount promises…). */
  bannedWords: string[];
  /** Phrases the model should favour — brand-specific vocabulary. */
  preferredPhrases: string[];
  /** Keywords the reply optimiser tries to work in naturally. */
  targetKeywords: string[];
  signature: string;
  /** Ratings at or above this are published without human approval. */
  autoPublishAtOrAbove: 1 | 2 | 3 | 4 | 5 | null;
}

/* ── Rankings (geo grid) ──────────────────────────────────────────────── */

export interface Keyword {
  id: string;
  term: Bilingual;
  /** Estimated monthly local search volume. */
  volume: number;
  /** Average position across the most recent scan, null when unranked everywhere. */
  avgRank: number | null;
  /** Change against the previous scan; negative means improved. */
  delta: number;
  /** Share of grid points where the business appears in the top 3. */
  top3Share: number;
}

/** One sampled point in a grid scan. `rank` is null when the business does not appear at all. */
export interface GridPoint {
  row: number;
  col: number;
  /** Offset in metres from the grid centre — the UI positions from this, not from lat/lng. */
  offsetX: number;
  offsetY: number;
  rank: number | null;
  /** Who occupied position 1 at this point. */
  topCompetitor: string;
}

export interface GridScan {
  id: string;
  locationId: string;
  keywordId: string;
  /** Odd number, 5–13. Grid is size × size points. */
  size: number;
  /** Distance between adjacent points, in metres. */
  spacingMeters: number;
  ranAt: string;
  points: GridPoint[];
  avgRank: number | null;
  /** Average Total Rank Score — the industry's headline grid metric, 0–100. */
  atrs: number;
  /** Share of Local Voice, 0–100. */
  solv: number;
}

/* ── AI visibility (AEO) ──────────────────────────────────────────────── */

export type AiEngine = "chatgpt" | "gemini" | "perplexity" | "ai_overviews";

export interface AiEngineResult {
  engine: AiEngine;
  /** Whether the business was named in the assistant's answer at all. */
  mentioned: boolean;
  /** Position within the recommendation list, null when not mentioned. */
  position: number | null;
  /** Businesses the assistant recommended instead of, or ahead of, this one. */
  competitorsNamed: string[];
  /** Sources the assistant cited — the levers an AEO strategy can actually pull. */
  citedSources: string[];
  /** Verbatim fragment of the assistant's answer, for evidence. */
  excerpt: Bilingual;
  checkedAt: string;
}

export interface AiVisibilityProbe {
  id: string;
  /** The natural-language question a customer would actually type. */
  prompt: Bilingual;
  locationId: string;
  results: AiEngineResult[];
  /** 0–100 across all engines, weighted by engine reach. */
  visibilityScore: number;
  delta: number;
}

/* ── Presence ─────────────────────────────────────────────────────────── */

export type PostStatus = "draft" | "scheduled" | "published";

export interface GbpPost {
  id: string;
  locationId: string;
  title: Bilingual;
  body: Bilingual;
  /** Call-to-action rendered as a button on the Google profile. */
  cta: "book" | "call" | "learn_more" | "order" | "none";
  status: PostStatus;
  scheduledFor: string;
  publishedAt?: string;
  /** Populated for published posts only. */
  metrics?: { views: number; clicks: number };
  /** Image slot; null renders a generated gradient placeholder. */
  image: string | null;
}

export interface ProfileCheck {
  id: string;
  label: Bilingual;
  /** Weight toward the 0–100 profile score. */
  weight: number;
  passed: boolean;
  hint: Bilingual;
}

export interface GbpQuestion {
  id: string;
  locationId: string;
  author: string;
  question: Bilingual;
  askedAt: string;
  answer?: Bilingual;
  answeredAt?: string;
  /** Questions with no answer and high view counts are the ones worth answering first. */
  views: number;
}

/* ── Competitors & insights ───────────────────────────────────────────── */

export interface Competitor {
  id: string;
  name: string;
  rating: number;
  reviewCount: number;
  /** Average grid position across tracked keywords. */
  avgRank: number | null;
  /** How often AI assistants name them, 0–100. */
  aiVisibility: number;
  distanceMeters: number;
}

export interface MetricPoint {
  /** ISO date, one entry per week. */
  date: string;
  value: number;
}

export interface OverviewMetrics {
  reviewsAwaitingReply: number;
  /** Median hours between a review arriving and being answered. */
  medianResponseHours: number;
  rating: number;
  ratingSeries: MetricPoint[];
  avgRank: number | null;
  rankSeries: MetricPoint[];
  aiVisibilityScore: number;
  aiVisibilitySeries: MetricPoint[];
  profileScore: number;
  /** Weekly review volume split by sentiment, for the stacked chart. */
  reviewVolume: { date: string; positive: number; neutral: number; negative: number }[];
}

/* ── API envelope ─────────────────────────────────────────────────────── */

/** Every list endpoint returns this shape — documented on the API reference page. */
export interface Paginated<T> {
  data: T[];
  meta: {
    current_page: number;
    per_page: number;
    total: number;
    last_page: number;
  };
}

export interface ApiError {
  error: {
    code: string;
    message: string;
    /** Present on 422 responses. */
    fields?: Record<string, string[]>;
  };
}
