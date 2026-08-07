"use client";

import { Topbar } from "@/components/app-shell/topbar";
import { Badge, Panel, PanelHeader, Stars } from "@/components/ui/primitives";
import { useDemoBusiness } from "@/lib/demo-business";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export default function CompetitorsPage() {
  const { t, pick } = useI18n();
  const { business } = useDemoBusiness();
  const { competitors, competitorNote, location, overview } = business;

  // The business is shown inside its own competitor set — a ranked list you are not in is
  // just a list, and seeing your own row in position 3 is the point of the screen.
  const rows = [
    {
      id: location.id,
      name: location.name,
      rating: location.rating,
      reviewCount: location.reviewCount,
      avgRank: overview.avgRank,
      aiVisibility: overview.aiVisibilityScore,
      distanceMeters: 0,
      isYou: true,
    },
    ...competitors.map((c) => ({ ...c, isYou: false })),
  ].sort((a, b) => (a.avgRank ?? 99) - (b.avgRank ?? 99));

  return (
    <>
      <Topbar
        title={t("Competitors", "Konkurencija")}
        description={t(
          "The businesses taking the searches you want",
          "Tvrtke koje preuzimaju pretrage koje želite",
        )}
      />

      <div className="flex-1 p-5">
        <Panel>
          <PanelHeader
            title={t("Local set", "Lokalni skup")}
            description={t(
              "Ranked by average map position across your tracked terms",
              "Poredano po prosječnoj poziciji na karti za praćene pojmove",
            )}
          />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-b border-line text-left text-[11px] uppercase tracking-wider text-faint">
                  <th className="px-5 py-2.5 font-medium">#</th>
                  <th className="px-5 py-2.5 font-medium">{t("Business", "Tvrtka")}</th>
                  <th className="px-5 py-2.5 font-medium">{t("Rating", "Ocjena")}</th>
                  <th className="px-5 py-2.5 text-right font-medium">
                    {t("Reviews", "Recenzije")}
                  </th>
                  <th className="px-5 py-2.5 text-right font-medium">
                    {t("Avg. rank", "Prosj. rang")}
                  </th>
                  <th className="px-5 py-2.5 text-right font-medium">
                    {t("AI visibility", "AI vidljivost")}
                  </th>
                  <th className="px-5 py-2.5 text-right font-medium">
                    {t("Distance", "Udaljenost")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {rows.map((row, i) => (
                  <tr
                    key={row.id}
                    className={cn(row.isYou && "bg-accent/[0.05]")}
                  >
                    <td className="px-5 py-3.5 font-mono text-muted">{i + 1}</td>
                    <td className="px-5 py-3.5">
                      <span className="flex items-center gap-2">
                        <span
                          className={cn(
                            "font-medium",
                            row.isYou ? "text-accent-light" : "text-foreground",
                          )}
                        >
                          {row.name}
                        </span>
                        {row.isYou ? (
                          <Badge tone="accent">{t("You", "Vi")}</Badge>
                        ) : null}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="flex items-center gap-2">
                        <Stars rating={row.rating} size={11} />
                        <span className="font-mono text-xs text-secondary">
                          {row.rating.toFixed(1)}
                        </span>
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right font-mono text-secondary">
                      {row.reviewCount}
                    </td>
                    <td className="px-5 py-3.5 text-right font-mono text-secondary">
                      {row.avgRank?.toFixed(1) ?? "–"}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <span className="inline-flex items-center gap-2">
                        <span className="h-1 w-16 overflow-hidden rounded-full bg-line">
                          <span
                            className="block h-full rounded-full"
                            style={{
                              width: `${row.aiVisibility}%`,
                              background: row.isYou ? "var(--color-accent)" : "#52525b",
                            }}
                          />
                        </span>
                        <span className="w-8 text-right font-mono text-xs text-secondary">
                          {row.aiVisibility}
                        </span>
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right font-mono text-secondary">
                      {row.distanceMeters === 0 ? "—" : `${row.distanceMeters}m`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <div className="mt-5 rounded-xl border border-line bg-surface p-5">
          <h3 className="text-sm font-semibold text-foreground">
            {t("Reading this table", "Čitanje ove tablice")}
          </h3>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-secondary">
            {pick(competitorNote)}
          </p>
        </div>
      </div>
    </>
  );
}
