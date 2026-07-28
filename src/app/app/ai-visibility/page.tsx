"use client";

import { useState } from "react";
import { ProbeRunner } from "@/components/ai-visibility/probe-runner";
import { Topbar } from "@/components/app-shell/topbar";
import { Badge, Panel, PanelHeader } from "@/components/ui/primitives";
import { useI18n } from "@/lib/i18n";
import { aeoActions, engines, probes } from "@/mock";
import { cn } from "@/lib/utils";

export default function AiVisibilityPage() {
  const { t, pick } = useI18n();
  const [probeId, setProbeId] = useState(probes[0].id);
  const probe = probes.find((p) => p.id === probeId)!;

  // Blended score across every tracked prompt, weighted the same way a single probe is.
  const overallScore = Math.round(
    probes.reduce((sum, p) => sum + p.visibilityScore, 0) / probes.length,
  );

  return (
    <>
      <Topbar
        title={t("AI Visibility", "AI vidljivost")}
        description={t(
          "Whether assistants name you when customers ask",
          "Spominju li vas asistenti kada kupci pitaju",
        )}
      />

      <div className="flex-1 space-y-5 p-5">
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-5">
            {/* key remounts the runner on probe change so it restarts from its initial running state */}
            <ProbeRunner
              key={probe.id}
              probe={probe}
              probes={probes}
              onProbeChange={setProbeId}
              compact
            />

            <Panel>
              <PanelHeader
                title={t("Tracked prompts", "Praćeni upiti")}
                description={t(
                  "Phrased the way a customer would actually ask",
                  "Formulirano onako kako bi kupac stvarno pitao",
                )}
              />
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] text-sm">
                  <thead>
                    <tr className="border-b border-line text-left text-[11px] uppercase tracking-wider text-faint">
                      <th className="px-5 py-2.5 font-medium">{t("Prompt", "Upit")}</th>
                      <th className="px-5 py-2.5 text-right font-medium">
                        {t("Named by", "Spominju")}
                      </th>
                      <th className="px-5 py-2.5 text-right font-medium">{t("Score", "Ocjena")}</th>
                      <th className="px-5 py-2.5 text-right font-medium">
                        {t("Change", "Promjena")}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-line">
                    {probes.map((p) => {
                      const named = p.results.filter((r) => r.mentioned).length;
                      return (
                        <tr
                          key={p.id}
                          onClick={() => setProbeId(p.id)}
                          className={cn(
                            "cursor-pointer transition-colors hover:bg-white/[0.02]",
                            p.id === probeId && "bg-white/[0.03]",
                          )}
                        >
                          <td className="px-5 py-3 text-foreground">{pick(p.prompt)}</td>
                          <td className="px-5 py-3 text-right font-mono text-secondary">
                            {named}/{p.results.length}
                          </td>
                          <td className="px-5 py-3 text-right">
                            <Badge
                              tone={
                                p.visibilityScore >= 60
                                  ? "positive"
                                  : p.visibilityScore > 0
                                    ? "caution"
                                    : "negative"
                              }
                              mono
                            >
                              {p.visibilityScore}
                            </Badge>
                          </td>
                          <td className="px-5 py-3 text-right font-mono">
                            {p.delta === 0 ? (
                              <span className="text-muted">—</span>
                            ) : (
                              <span className={p.delta > 0 ? "text-positive" : "text-negative"}>
                                {p.delta > 0 ? "▲" : "▼"} {Math.abs(p.delta)}
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Panel>
          </div>

          <div className="space-y-5">
            <Panel className="p-5 text-center">
              <p className="text-[11px] uppercase tracking-wider text-faint">
                {t("Blended visibility", "Ukupna vidljivost")}
              </p>
              <p className="mt-2 font-mono text-4xl font-semibold text-foreground">
                {overallScore}
                <span className="text-xl text-secondary">%</span>
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted">
                {t(
                  "Weighted by how many people use each assistant.",
                  "Ponderirano prema tome koliko ljudi koristi svakog asistenta.",
                )}
              </p>
            </Panel>

            <Panel>
              <PanelHeader title={t("By assistant", "Po asistentu")} />
              <ul className="divide-y divide-line">
                {engines.map((engine) => {
                  const named = probes.filter(
                    (p) => p.results.find((r) => r.engine === engine.id)?.mentioned,
                  ).length;
                  const pct = Math.round((named / probes.length) * 100);
                  return (
                    <li key={engine.id} className="px-5 py-3">
                      <div className="flex items-center justify-between gap-3">
                        <span className="flex items-center gap-2 text-sm text-foreground">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={`https://cdn.simpleicons.org/${engine.slug}/a1a1aa`}
                            alt=""
                            width={14}
                            height={14}
                            loading="lazy"
                          />
                          {engine.label}
                        </span>
                        <span className="font-mono text-xs text-secondary">
                          {named}/{probes.length}
                        </span>
                      </div>
                      <div className="mt-2 h-1 overflow-hidden rounded-full bg-line">
                        <div
                          className="h-full rounded-full bg-accent transition-[width] duration-700"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Panel>

            <Panel>
              <PanelHeader
                title={t("How to get named", "Kako biti spomenut")}
                description={t("Derived from what they cited", "Izvedeno iz onoga što su citirali")}
              />
              <ul className="divide-y divide-line">
                {aeoActions.map((action) => (
                  <li key={action.id} className="px-5 py-3.5">
                    <p className="text-sm font-medium text-foreground">{pick(action.title)}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted">{pick(action.detail)}</p>
                    <div className="mt-2 flex gap-1.5">
                      <Badge tone={action.impact === "high" ? "positive" : "neutral"}>
                        {action.impact} {t("impact", "učinak")}
                      </Badge>
                      <Badge tone="neutral">
                        {action.effort} {t("effort", "trud")}
                      </Badge>
                    </div>
                  </li>
                ))}
              </ul>
            </Panel>
          </div>
        </div>
      </div>
    </>
  );
}
