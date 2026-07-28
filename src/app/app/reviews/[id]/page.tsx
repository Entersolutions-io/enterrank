"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { Topbar } from "@/components/app-shell/topbar";
import { ReplyComposer } from "@/components/reviews/reply-composer";
import { Avatar, Badge, Panel, PanelHeader, Stars } from "@/components/ui/primitives";
import { useI18n } from "@/lib/i18n";
import type { ReviewIntent } from "@/lib/types";
import { formatDate } from "@/lib/utils";
import { reviews } from "@/mock";

export default function ReviewDetailPage() {
  const { t, pick } = useI18n();
  const params = useParams<{ id: string }>();

  const review = reviews.find((r) => r.id === params.id);
  if (!review) notFound();

  const intentLabels: Record<ReviewIntent, string> = {
    praise: t("Praise", "Pohvala"),
    service_complaint: t("Service complaint", "Prigovor na uslugu"),
    pricing_concern: t("Pricing concern", "Zabrinutost oko cijene"),
    wait_time: t("Wait time", "Vrijeme čekanja"),
    staff_mention: t("Staff mention", "Spomen osoblja"),
    question: t("Question", "Pitanje"),
    spam: t("Spam", "Neželjeno"),
  };

  const sentimentTone =
    review.sentiment === "positive"
      ? "positive"
      : review.sentiment === "negative"
        ? "negative"
        : "neutral";

  return (
    <>
      <Topbar
        title={t("Review", "Recenzija")}
        description={`${review.author} · ${formatDate(review.createdAt)}`}
        actions={
          <Link
            href="/app/reviews"
            className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {t("Back to inbox", "Natrag u pristiglu poštu")}
          </Link>
        }
      />

      <div className="flex-1 p-5">
        <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-5">
            {/* The review itself */}
            <Panel className="p-5">
              <div className="flex items-start gap-4">
                <Avatar name={review.author} size={44} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-medium text-foreground">{review.author}</span>
                    <Stars rating={review.rating} />
                    <span className="text-xs text-faint">{formatDate(review.createdAt)}</span>
                  </div>
                  <p className="mt-3 leading-relaxed text-secondary">{pick(review.text)}</p>
                </div>
              </div>
            </Panel>

            <ReplyComposer review={review} />
          </div>

          {/* Analysis sidebar */}
          <div className="space-y-5">
            <Panel>
              <PanelHeader title={t("Analysis", "Analiza")} />
              <dl className="divide-y divide-line">
                <Row label={t("Sentiment", "Sentiment")}>
                  <Badge tone={sentimentTone}>
                    {review.sentiment === "positive"
                      ? t("Positive", "Pozitivno")
                      : review.sentiment === "negative"
                        ? t("Negative", "Negativno")
                        : t("Neutral", "Neutralno")}
                  </Badge>
                </Row>
                <Row label={t("Confidence", "Pouzdanost")}>
                  <span className="font-mono text-sm text-foreground">
                    {Math.round(review.sentimentConfidence * 100)}%
                  </span>
                </Row>
                <Row label={t("Intent", "Namjera")}>
                  <span className="text-sm text-foreground">{intentLabels[review.intent]}</span>
                </Row>
                <Row label={t("Review ID", "ID recenzije")}>
                  <span className="font-mono text-xs text-muted">{review.id}</span>
                </Row>
              </dl>
            </Panel>

            {review.topics.length ? (
              <Panel>
                <PanelHeader
                  title={t("Topics", "Teme")}
                  description={t(
                    "Extracted for trend reporting",
                    "Izdvojeno za izvještavanje o trendovima",
                  )}
                />
                <div className="flex flex-wrap gap-2 p-5">
                  {review.topics.map((topic) => (
                    <Badge key={topic} tone="neutral">
                      {topic}
                    </Badge>
                  ))}
                </div>
              </Panel>
            ) : null}

            {review.sentimentConfidence < 0.75 ? (
              <div className="rounded-xl border border-caution/25 bg-caution/[0.06] p-4">
                <p className="text-xs leading-relaxed text-caution">
                  {t(
                    "Sentiment confidence is below the auto-publish threshold, so this review will never be answered automatically — it waits for you.",
                    "Pouzdanost sentimenta je ispod praga za automatsku objavu pa se na ovu recenziju nikada neće odgovoriti automatski — čeka vas.",
                  )}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 px-5 py-3">
      <dt className="text-xs text-muted">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
