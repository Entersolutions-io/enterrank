"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { StatCard } from "@/components/app-shell/stat-card";
import { Topbar } from "@/components/app-shell/topbar";
import { Avatar, Badge, Panel, PanelHeader, Stars } from "@/components/ui/primitives";
import { useI18n } from "@/lib/i18n";
import { daysAgo } from "@/lib/utils";
import { aeoActions, location, overview, profileChecks, reviews } from "@/mock";

export default function DashboardPage() {
  const { t, pick } = useI18n();

  const awaiting = reviews.filter((r) => r.status === "needs_reply");
  const failedChecks = profileChecks.filter((c) => !c.passed);

  const ratingDelta = Number(
    (overview.rating - overview.ratingSeries[0].value).toFixed(2),
  );
  const rankDelta = Number(
    ((overview.avgRank ?? 0) - overview.rankSeries[0].value).toFixed(1),
  );
  const aiDelta =
    overview.aiVisibilityScore - overview.aiVisibilitySeries[0].value;

  return (
    <>
      <Topbar
        title={t("Dashboard", "Nadzorna ploča")}
        description={`${location.name} · ${location.address}, ${location.city}`}
      />

      <div className="flex-1 space-y-6 p-5">
        {/* The four pillars as four numbers. */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            label={t("Rating", "Ocjena")}
            value={overview.rating.toFixed(1)}
            delta={ratingDelta}
            series={overview.ratingSeries}
            href="/app/reviews"
            hint={t(
              `${overview.reviewsAwaitingReply} reviews awaiting a reply`,
              `${overview.reviewsAwaitingReply} recenzija čeka odgovor`,
            )}
          />
          <StatCard
            label={t("Avg. map position", "Prosj. pozicija na karti")}
            value={overview.avgRank?.toFixed(1) ?? "–"}
            delta={rankDelta}
            series={overview.rankSeries}
            lowerIsBetter
            href="/app/rankings"
            hint={t("Across 6 tracked search terms", "Kroz 6 praćenih pojmova")}
          />
          <StatCard
            label={t("AI visibility", "AI vidljivost")}
            value={overview.aiVisibilityScore}
            suffix="%"
            delta={aiDelta}
            deltaSuffix="pt"
            series={overview.aiVisibilitySeries}
            href="/app/ai-visibility"
            hint={t("Named by 2 of 4 assistants", "Spomenuti od 2 od 4 asistenta")}
          />
          <StatCard
            label={t("Profile health", "Zdravlje profila")}
            value={overview.profileScore}
            suffix="%"
            href="/app/presence"
            hint={t(
              `${failedChecks.length} checks failing`,
              `${failedChecks.length} provjera nije prošlo`,
            )}
          />
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          {/* Review volume */}
          <Panel>
            <PanelHeader
              title={t("Review volume", "Broj recenzija")}
              description={t("Last 12 weeks, split by sentiment", "Zadnjih 12 tjedana, po sentimentu")}
            />
            <div className="h-64 p-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={overview.reviewVolume} barCategoryGap="28%">
                  <CartesianGrid stroke="#1f1f23" vertical={false} />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(d: string) => d.slice(8, 10) + "/" + d.slice(5, 7)}
                    stroke="#52525b"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} width={24} />
                  <Tooltip
                    cursor={{ fill: "rgba(255,255,255,0.03)" }}
                    contentStyle={{
                      background: "#111113",
                      border: "1px solid #1f1f23",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                    labelStyle={{ color: "#a1a1aa" }}
                  />
                  <Bar dataKey="positive" stackId="a" fill="#10b981" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="neutral" stackId="a" fill="#52525b" />
                  <Bar dataKey="negative" stackId="a" fill="#f43f5e" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          {/* Needs attention */}
          <Panel className="flex flex-col">
            <PanelHeader
              title={t("Needs a reply", "Čeka odgovor")}
              action={
                <Link
                  href="/app/reviews"
                  className="inline-flex items-center gap-1 text-xs text-muted transition-colors hover:text-accent"
                >
                  {t("All", "Sve")}
                  <ArrowRight className="h-3 w-3" />
                </Link>
              }
            />
            <ul className="divide-y divide-line">
              {awaiting.slice(0, 4).map((review) => (
                <li key={review.id}>
                  <Link
                    href={`/app/reviews/${review.id}`}
                    className="flex gap-3 px-5 py-3.5 transition-colors hover:bg-white/[0.02]"
                  >
                    <Avatar name={review.author} size={32} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-sm font-medium text-foreground">
                          {review.author}
                        </span>
                        <Stars rating={review.rating} size={11} />
                      </div>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">
                        {pick(review.text)}
                      </p>
                      <p className="mt-1.5 text-[10px] text-faint">
                        {daysAgo(review.createdAt)} {t("days ago", "dana prije")}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </Panel>
        </div>

        {/* Recommended actions — the dashboard's job is to end in something to do. */}
        <Panel>
          <PanelHeader
            title={t("What to fix next", "Što sljedeće popraviti")}
            description={t(
              "Ordered by expected impact against effort",
              "Poredano po očekivanom učinku u odnosu na trud",
            )}
          />
          <ul className="divide-y divide-line">
            {aeoActions.map((action) => (
              <li key={action.id} className="flex flex-wrap items-start gap-4 px-5 py-4">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">{pick(action.title)}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">{pick(action.detail)}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <Badge tone={action.impact === "high" ? "positive" : "neutral"}>
                    {t("Impact", "Učinak")}: {action.impact}
                  </Badge>
                  <Badge tone="neutral">
                    {t("Effort", "Trud")}: {action.effort}
                  </Badge>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}
