import type { AiEngine, ReplyGenerationStage } from "@/lib/types";

/**
 * Fixtures that belong to the product rather than to a tenant. These are identical whichever
 * demo business is selected — the assistants EnterRank probes and the pipeline a reply draft
 * goes through do not change per customer.
 */

/** The visible steps of the reply pipeline. Durations drive the composer's staged animation. */
export const replyStages: ReplyGenerationStage[] = [
  {
    id: "analyze",
    label: { en: "Analysing sentiment and intent", hr: "Analiza sentimenta i namjere" },
    durationMs: 900,
  },
  {
    id: "voice",
    label: { en: "Loading brand voice profile", hr: "Učitavanje profila glasa marke" },
    durationMs: 700,
  },
  {
    id: "keywords",
    label: { en: "Selecting local keywords", hr: "Odabir lokalnih ključnih riječi" },
    durationMs: 800,
  },
  {
    id: "compose",
    label: { en: "Composing reply", hr: "Sastavljanje odgovora" },
    durationMs: 600,
  },
];

/**
 * Engine reach weights the blended visibility score — a mention in an assistant more people use
 * is worth more.
 */
export const engines: {
  id: AiEngine;
  label: string;
  /** Simple Icons slug; falls back to a lettered tile when the CDN has no matching icon. */
  slug: string;
  weight: number;
}[] = [
  { id: "chatgpt", label: "ChatGPT", slug: "openai", weight: 0.4 },
  { id: "gemini", label: "Gemini", slug: "googlegemini", weight: 0.25 },
  { id: "perplexity", label: "Perplexity", slug: "perplexity", weight: 0.15 },
  { id: "ai_overviews", label: "AI Overviews", slug: "google", weight: 0.2 },
];
