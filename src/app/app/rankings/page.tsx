"use client";

import { Play, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Topbar } from "@/components/app-shell/topbar";
import { CountUp, GeoGrid, GeoGridLegend } from "@/components/rankings/geo-grid";
import { Badge, Button, Panel, PanelHeader } from "@/components/ui/primitives";
import { useI18n } from "@/lib/i18n";
import { buildScan, keywords, keywordStats, scanHistory } from "@/mock";
import { cn } from "@/lib/utils";

const SCAN_MS = 2400;

export default function RankingsPage() {
  const { t, pick } = useI18n();

  const [keywordId, setKeywordId] = useState(keywords[0].id);
  const [size, setSize] = useState(7);
  const [runToken, setRunToken] = useState(1);
  const [scanning, setScanning] = useState(true);
  const [selected, setSelected] = useState<number | null>(null);

  const scan = useMemo(() => buildScan(keywordId, size), [keywordId, size]);

  const run = () => {
    setSelected(null);
    setScanning(true);
    setRunToken((token) => token + 1);
  };

  useEffect(() => {
    if (!scanning) return;
    const timer = setTimeout(() => setScanning(false), SCAN_MS);
    return () => clearTimeout(timer);
  }, [scanning, runToken]);

  const point = selected === null ? null : scan.points[selected];

  return (
    <>
      <Topbar
        title={t("Rankings", "Rangiranje")}
        description={t(
          "Where you appear on Google Maps, block by block",
          "Gdje se pojavljujete na Google kartama, ulicu po ulicu",
        )}
        actions={
          <Button size="sm" onClick={run} disabled={scanning}>
            {scanning ? (
              <>
                <RotateCcw className="h-3.5 w-3.5 animate-spin" />
                {t("Scanning…", "Skeniranje…")}
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5" />
                {t("Run scan", "Pokreni skeniranje")}
              </>
            )}
          </Button>
        }
      />

      <div className="flex-1 space-y-5 p-5">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* Grid */}
          <Panel className="p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {keywords.map((keyword) => (
                  <button
                    key={keyword.id}
                    type="button"
                    onClick={() => {
                      setKeywordId(keyword.id);
                      run();
                    }}
                    disabled={scanning}
                    className={cn(
                      "rounded-lg border px-2.5 py-1 text-xs transition-colors disabled:opacity-50",
                      keyword.id === keywordId
                        ? "border-accent/40 bg-accent/10 text-accent-light"
                        : "border-line text-muted hover:border-line-strong hover:text-secondary",
                    )}
                  >
                    {pick(keyword.term)}
                  </button>
                ))}
              </div>

              <label className="flex items-center gap-2 text-xs text-muted">
                {t("Grid", "Mreža")}
                <select
                  value={size}
                  onChange={(e) => {
                    setSize(Number(e.target.value));
                    run();
                  }}
                  disabled={scanning}
                  className="rounded-lg border border-line bg-surface px-2 py-1 text-xs text-secondary focus:border-accent/40 focus:outline-none"
                >
                  {[5, 7, 9, 11].map((n) => (
                    <option key={n} value={n} className="bg-surface">
                      {n}×{n}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mx-auto max-w-3xl">
              <GeoGrid
                scan={scan}
                runToken={runToken}
                durationMs={SCAN_MS}
                selectedIndex={selected}
                onPointSelect={setSelected}
              />
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <GeoGridLegend
                labels={{
                  top3: t("Top 3", "Top 3"),
                  top10: t("4–10", "4–10"),
                  top20: t("11–20", "11–20"),
                  unranked: t("Not found", "Nije pronađen"),
                }}
              />
              <span className="font-mono text-[11px] text-faint">
                {scan.size}×{scan.size} · {scan.spacingMeters}m {t("spacing", "razmak")}
              </span>
            </div>
          </Panel>

          {/* Side panel */}
          <div className="space-y-5">
            <div className="grid grid-cols-3 gap-3">
              <MiniStat
                label={t("Avg.", "Prosj.")}
                value={<CountUp value={scan.avgRank} runToken={runToken} durationMs={SCAN_MS} decimals={1} />}
              />
              <MiniStat
                label={t("Coverage", "Pokrivenost")}
                value={<CountUp value={scan.atrs} runToken={runToken} durationMs={SCAN_MS} suffix="%" />}
              />
              <MiniStat
                label={t("Top 3", "Top 3")}
                value={<CountUp value={scan.solv} runToken={runToken} durationMs={SCAN_MS} suffix="%" />}
              />
            </div>

            <Panel>
              <PanelHeader title={t("Selected point", "Odabrana točka")} />
              <div className="p-5">
                {point ? (
                  <dl className="space-y-3 text-sm">
                    <DetailRow
                      label={t("Offset", "Odmak")}
                      value={`${Math.abs(point.offsetX)}m ${point.offsetX >= 0 ? "E" : "W"} · ${Math.abs(point.offsetY)}m ${point.offsetY >= 0 ? "S" : "N"}`}
                    />
                    <DetailRow
                      label={t("Your position", "Vaša pozicija")}
                      value={
                        point.rank === null ? (
                          <Badge tone="neutral">{t("Not found", "Nije pronađen")}</Badge>
                        ) : (
                          <Badge
                            tone={point.rank <= 3 ? "positive" : point.rank <= 10 ? "caution" : "negative"}
                            mono
                          >
                            #{point.rank}
                          </Badge>
                        )
                      }
                    />
                    <DetailRow label={t("Position 1", "Prvo mjesto")} value={point.topCompetitor} />
                  </dl>
                ) : (
                  <p className="text-sm text-muted">
                    {t("Select a point on the grid.", "Odaberite točku na mreži.")}
                  </p>
                )}
              </div>
            </Panel>

            <Panel>
              <PanelHeader
                title={t("Coverage over time", "Pokrivenost kroz vrijeme")}
                description={t("Fortnightly scans", "Skeniranja svaka dva tjedna")}
              />
              <div className="h-40 p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={scanHistory}>
                    <XAxis
                      dataKey="date"
                      tickFormatter={(d: string) => d.slice(5).replace("-", "/")}
                      stroke="#52525b"
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis stroke="#52525b" fontSize={10} tickLine={false} axisLine={false} width={28} />
                    <Tooltip
                      contentStyle={{
                        background: "#111113",
                        border: "1px solid #1f1f23",
                        borderRadius: 8,
                        fontSize: 12,
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="atrs"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={false}
                      isAnimationActive={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Panel>
          </div>
        </div>

        {/* Keyword table */}
        <Panel>
          <PanelHeader
            title={t("Tracked search terms", "Praćeni pojmovi pretraživanja")}
            description={t("Change is against the previous scan", "Promjena u odnosu na prethodno skeniranje")}
          />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-line text-left text-[11px] uppercase tracking-wider text-faint">
                  <th className="px-5 py-2.5 font-medium">{t("Term", "Pojam")}</th>
                  <th className="px-5 py-2.5 text-right font-medium">{t("Volume", "Volumen")}</th>
                  <th className="px-5 py-2.5 text-right font-medium">{t("Avg. rank", "Prosj. rang")}</th>
                  <th className="px-5 py-2.5 text-right font-medium">{t("Change", "Promjena")}</th>
                  <th className="px-5 py-2.5 text-right font-medium">{t("Top-3 share", "Udio Top 3")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {keywords.map((keyword) => {
                  const stats = keywordStats(keyword.id);
                  return (
                  <tr
                    key={keyword.id}
                    onClick={() => {
                      setKeywordId(keyword.id);
                      run();
                    }}
                    className={cn(
                      "cursor-pointer transition-colors hover:bg-white/[0.02]",
                      keyword.id === keywordId && "bg-white/[0.03]",
                    )}
                  >
                    <td className="px-5 py-3 text-foreground">{pick(keyword.term)}</td>
                    <td className="px-5 py-3 text-right font-mono text-secondary">
                      {keyword.volume.toLocaleString("en-US")}
                    </td>
                    <td className="px-5 py-3 text-right font-mono text-secondary">
                      {stats.avgRank?.toFixed(1) ?? "–"}
                    </td>
                    <td className="px-5 py-3 text-right font-mono">
                      {keyword.delta === 0 ? (
                        <span className="text-muted">—</span>
                      ) : (
                        <span className={keyword.delta < 0 ? "text-positive" : "text-negative"}>
                          {keyword.delta < 0 ? "▲" : "▼"} {Math.abs(keyword.delta).toFixed(1)}
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3 text-right font-mono text-secondary">
                      {stats.top3Share}%
                    </td>
                  </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>
    </>
  );
}

function MiniStat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-3.5">
      <p className="text-[10px] uppercase tracking-wider text-faint">{label}</p>
      <p className="mt-1 font-mono text-xl font-semibold text-foreground">{value}</p>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-xs text-muted">{label}</dt>
      <dd className="text-right text-foreground">{value}</dd>
    </div>
  );
}
