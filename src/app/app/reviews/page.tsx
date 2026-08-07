"use client";

import Link from "next/link";
import { useState } from "react";
import { Topbar } from "@/components/app-shell/topbar";
import { Avatar, Badge, Stars } from "@/components/ui/primitives";
import { useDemoBusiness } from "@/lib/demo-business";
import { useI18n } from "@/lib/i18n";
import type { ReviewStatus, Sentiment } from "@/lib/types";
import { cn, daysAgo } from "@/lib/utils";

type StatusFilter = ReviewStatus | "all";
type SentimentFilter = Sentiment | "all";

export default function ReviewsPage() {
  const { t, pick } = useI18n();
  const { business } = useDemoBusiness();
  const { reviews } = business;
  const [status, setStatus] = useState<StatusFilter>("all");
  const [sentiment, setSentiment] = useState<SentimentFilter>("all");

  const filtered = reviews
    .filter((r) => status === "all" || r.status === status)
    .filter((r) => sentiment === "all" || r.sentiment === sentiment)
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  const statusOptions: { value: StatusFilter; label: string; count: number }[] = [
    { value: "all", label: t("All", "Sve"), count: reviews.length },
    {
      value: "needs_reply",
      label: t("Needs reply", "Treba odgovor"),
      count: reviews.filter((r) => r.status === "needs_reply").length,
    },
    {
      value: "drafted",
      label: t("Drafted", "Nacrt"),
      count: reviews.filter((r) => r.status === "drafted").length,
    },
    {
      value: "answered",
      label: t("Answered", "Odgovoreno"),
      count: reviews.filter((r) => r.status === "answered").length,
    },
  ];

  const sentimentOptions: { value: SentimentFilter; label: string }[] = [
    { value: "all", label: t("Any sentiment", "Bilo koji sentiment") },
    { value: "positive", label: t("Positive", "Pozitivno") },
    { value: "neutral", label: t("Neutral", "Neutralno") },
    { value: "negative", label: t("Negative", "Negativno") },
  ];

  return (
    <>
      <Topbar
        title={t("Reviews", "Recenzije")}
        description={t(
          "Every review, analysed and ready to answer",
          "Svaka recenzija, analizirana i spremna za odgovor",
        )}
      />

      <div className="flex-1 p-5">
        {/* Filters */}
        <div className="mb-5 flex flex-wrap items-center gap-2">
          {statusOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setStatus(option.value)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs transition-colors",
                status === option.value
                  ? "border-accent/40 bg-accent/10 text-accent-light"
                  : "border-line text-muted hover:border-line-strong hover:text-secondary",
              )}
            >
              {option.label}
              <span className="font-mono text-[10px] opacity-60">{option.count}</span>
            </button>
          ))}

          <span className="mx-1 h-4 w-px bg-line" />

          <select
            value={sentiment}
            onChange={(e) => setSentiment(e.target.value as SentimentFilter)}
            className="rounded-lg border border-line bg-surface px-2.5 py-1.5 text-xs text-secondary focus:border-accent/40 focus:outline-none"
          >
            {sentimentOptions.map((option) => (
              <option key={option.value} value={option.value} className="bg-surface">
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* List */}
        <div className="overflow-hidden rounded-xl border border-line bg-surface">
          {filtered.length === 0 ? (
            <p className="px-5 py-14 text-center text-sm text-muted">
              {t("No reviews match these filters.", "Nijedna recenzija ne odgovara filtrima.")}
            </p>
          ) : (
            <ul className="divide-y divide-line">
              {filtered.map((review) => (
                <li key={review.id}>
                  <Link
                    href={`/app/reviews/${review.id}`}
                    className="flex gap-4 px-5 py-4 transition-colors hover:bg-white/[0.02]"
                  >
                    <Avatar name={review.author} />

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                        <span className="text-sm font-medium text-foreground">{review.author}</span>
                        <Stars rating={review.rating} size={12} />
                        <span className="text-[11px] text-faint">
                          {daysAgo(review.createdAt)}
                          {t("d ago", "d prije")}
                        </span>
                        {review.intent === "spam" ? (
                          <Badge tone="neutral">{t("Spam", "Neželjeno")}</Badge>
                        ) : null}
                        {review.sentimentConfidence < 0.75 ? (
                          <Badge tone="caution">
                            {t("Low confidence", "Niska pouzdanost")}{" "}
                            {Math.round(review.sentimentConfidence * 100)}%
                          </Badge>
                        ) : null}
                      </div>

                      <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-secondary">
                        {pick(review.text)}
                      </p>

                      {review.topics.length ? (
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {review.topics.map((topic) => (
                            <span
                              key={topic}
                              className="rounded border border-line px-1.5 py-0.5 text-[10px] text-muted"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      ) : null}
                    </div>

                    <div className="shrink-0">
                      <StatusBadge status={review.status} />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

function StatusBadge({ status }: { status: ReviewStatus }) {
  const { t } = useI18n();

  const map: Record<ReviewStatus, { tone: "caution" | "info" | "positive" | "neutral"; label: string }> = {
    needs_reply: { tone: "caution", label: t("Needs reply", "Treba odgovor") },
    drafted: { tone: "info", label: t("Drafted", "Nacrt") },
    answered: { tone: "positive", label: t("Answered", "Odgovoreno") },
    ignored: { tone: "neutral", label: t("Ignored", "Zanemareno") },
  };

  return <Badge tone={map[status].tone}>{map[status].label}</Badge>;
}
