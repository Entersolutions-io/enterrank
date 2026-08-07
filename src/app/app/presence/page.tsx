"use client";

import { Check, MessageCircleQuestion, X } from "lucide-react";
import { useState } from "react";
import { Topbar } from "@/components/app-shell/topbar";
import { Badge, Button, Panel, PanelHeader } from "@/components/ui/primitives";
import { useDemoBusiness } from "@/lib/demo-business";
import { useI18n } from "@/lib/i18n";
import type { PostStatus } from "@/lib/types";
import { cn, daysAgo, formatDate } from "@/lib/utils";

export default function PresencePage() {
  const { t, pick } = useI18n();
  const { business } = useDemoBusiness();
  const { posts, profileChecks, questions } = business;
  const [tab, setTab] = useState<"health" | "posts" | "questions">("health");

  const earned = profileChecks.filter((c) => c.passed).reduce((s, c) => s + c.weight, 0);
  const total = profileChecks.reduce((s, c) => s + c.weight, 0);
  const score = Math.round((earned / total) * 100);
  const unanswered = questions.filter((q) => !q.answer);

  const tabs = [
    { id: "health" as const, label: t("Profile health", "Zdravlje profila") },
    { id: "posts" as const, label: t("Posts", "Objave"), count: posts.length },
    {
      id: "questions" as const,
      label: t("Questions", "Pitanja"),
      count: unanswered.length,
    },
  ];

  return (
    <>
      <Topbar
        title={t("Presence", "Prisutnost")}
        description={t(
          "The profile signals Google reads every day",
          "Signali profila koje Google čita svaki dan",
        )}
      />

      <div className="flex-1 space-y-5 p-5">
        <div className="flex flex-wrap gap-2">
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setTab(item.id)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs transition-colors",
                tab === item.id
                  ? "border-accent/40 bg-accent/10 text-accent-light"
                  : "border-line text-muted hover:border-line-strong hover:text-secondary",
              )}
            >
              {item.label}
              {item.count !== undefined ? (
                <span className="font-mono text-[10px] opacity-60">{item.count}</span>
              ) : null}
            </button>
          ))}
        </div>

        {tab === "health" ? (
          <div className="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
            <Panel className="p-6 text-center">
              <p className="text-[11px] uppercase tracking-wider text-faint">
                {t("Profile score", "Ocjena profila")}
              </p>
              <p className="mt-3 font-mono text-5xl font-semibold text-foreground">{score}</p>
              <p className="mt-3 text-xs leading-relaxed text-muted">
                {t(
                  `${profileChecks.filter((c) => !c.passed).length} of ${profileChecks.length} checks are failing. Fixing the heaviest ones first moves the number fastest.`,
                  `${profileChecks.filter((c) => !c.passed).length} od ${profileChecks.length} provjera nije prošlo. Rješavanje onih s najvećom težinom najbrže pomiče broj.`,
                )}
              </p>
            </Panel>

            <Panel>
              <PanelHeader
                title={t("Checks", "Provjere")}
                description={t("Sorted by weight", "Poredano po težini")}
              />
              <ul className="divide-y divide-line">
                {[...profileChecks]
                  .sort((a, b) => Number(a.passed) - Number(b.passed) || b.weight - a.weight)
                  .map((check) => (
                    <li key={check.id} className="flex items-start gap-3 px-5 py-3.5">
                      <span
                        className={cn(
                          "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full",
                          check.passed ? "bg-positive/15" : "bg-negative/15",
                        )}
                      >
                        {check.passed ? (
                          <Check className="h-2.5 w-2.5 text-positive" />
                        ) : (
                          <X className="h-2.5 w-2.5 text-negative" />
                        )}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p
                          className={cn(
                            "text-sm",
                            check.passed ? "text-secondary" : "text-foreground",
                          )}
                        >
                          {pick(check.label)}
                        </p>
                        <p className="mt-0.5 text-xs leading-relaxed text-muted">
                          {pick(check.hint)}
                        </p>
                      </div>
                      <span className="shrink-0 font-mono text-[11px] text-faint">
                        {check.weight}
                        {t("pt", "b")}
                      </span>
                    </li>
                  ))}
              </ul>
            </Panel>
          </div>
        ) : null}

        {tab === "posts" ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <Panel key={post.id} className="flex flex-col overflow-hidden">
                {/* Generated tint stands in for the post image until one is uploaded. */}
                <div
                  className="h-24 w-full"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(16,185,129,0.16), rgba(20,184,166,0.05) 60%, transparent)",
                  }}
                  aria-hidden
                />
                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-center justify-between gap-2">
                    <PostStatusBadge status={post.status} />
                    <span className="text-[10px] text-faint">
                      {formatDate(post.publishedAt ?? post.scheduledFor)}
                    </span>
                  </div>
                  <h3 className="mt-3 text-sm font-medium text-foreground">{pick(post.title)}</h3>
                  <p className="mt-1.5 line-clamp-3 flex-1 text-xs leading-relaxed text-muted">
                    {pick(post.body)}
                  </p>

                  {post.metrics ? (
                    <div className="mt-4 flex gap-4 border-t border-line pt-3 text-[11px] text-muted">
                      <span>
                        <span className="font-mono text-secondary">
                          {post.metrics.views.toLocaleString("en-US")}
                        </span>{" "}
                        {t("views", "pregleda")}
                      </span>
                      <span>
                        <span className="font-mono text-secondary">{post.metrics.clicks}</span>{" "}
                        {t("clicks", "klikova")}
                      </span>
                    </div>
                  ) : (
                    <div className="mt-4 border-t border-line pt-3">
                      <Button variant="secondary" size="sm" className="w-full">
                        {post.status === "draft"
                          ? t("Schedule", "Zakaži")
                          : t("Edit", "Uredi")}
                      </Button>
                    </div>
                  )}
                </div>
              </Panel>
            ))}
          </div>
        ) : null}

        {tab === "questions" ? (
          <Panel>
            <PanelHeader
              title={t("Profile questions", "Pitanja na profilu")}
              description={t(
                "Answers are quoted directly by AI assistants — unanswered questions are visible gaps",
                "Odgovore izravno citiraju AI asistenti — neodgovorena pitanja vidljive su praznine",
              )}
            />
            <ul className="divide-y divide-line">
              {[...questions]
                .sort((a, b) => Number(Boolean(a.answer)) - Number(Boolean(b.answer)) || b.views - a.views)
                .map((question) => (
                  <li key={question.id} className="px-5 py-4">
                    <div className="flex items-start gap-3">
                      <MessageCircleQuestion className="mt-0.5 h-4 w-4 shrink-0 text-muted" />
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-sm text-foreground">{pick(question.question)}</span>
                          {!question.answer ? (
                            <Badge tone="caution">{t("Unanswered", "Bez odgovora")}</Badge>
                          ) : null}
                        </div>
                        <p className="mt-1 text-[11px] text-faint">
                          {question.author} · {daysAgo(question.askedAt)}
                          {t("d ago", "d prije")} · {question.views.toLocaleString("en-US")}{" "}
                          {t("views", "pregleda")}
                        </p>

                        {question.answer ? (
                          <p className="mt-2.5 border-l-2 border-accent/30 pl-3 text-xs leading-relaxed text-secondary">
                            {pick(question.answer)}
                          </p>
                        ) : (
                          <Button size="sm" variant="secondary" className="mt-3">
                            {t("Draft an answer", "Sastavi odgovor")}
                          </Button>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </Panel>
        ) : null}
      </div>
    </>
  );
}

function PostStatusBadge({ status }: { status: PostStatus }) {
  const { t } = useI18n();
  const map: Record<PostStatus, { tone: "neutral" | "info" | "positive"; label: string }> = {
    draft: { tone: "neutral", label: t("Draft", "Nacrt") },
    scheduled: { tone: "info", label: t("Scheduled", "Zakazano") },
    published: { tone: "positive", label: t("Published", "Objavljeno") },
  };
  return <Badge tone={map[status].tone}>{map[status].label}</Badge>;
}
