"use client";

import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import Link from "next/link";
import { Area, AreaChart, ResponsiveContainer, YAxis } from "recharts";
import type { MetricPoint } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Headline metric with an inline trend.
 *
 * `lowerIsBetter` exists because average map position is the one number on this dashboard that
 * improves by going down — treating a −2.1 as a decline would invert the whole story.
 */
export function StatCard({
  label,
  value,
  suffix,
  delta,
  deltaSuffix = "",
  series,
  lowerIsBetter = false,
  href,
  hint,
}: {
  label: string;
  value: string | number;
  suffix?: string;
  delta?: number;
  deltaSuffix?: string;
  series?: MetricPoint[];
  lowerIsBetter?: boolean;
  href?: string;
  hint?: string;
}) {
  const improved = delta === undefined ? null : lowerIsBetter ? delta < 0 : delta > 0;
  const flat = delta === 0;

  const Trend = flat ? Minus : improved ? ArrowUpRight : ArrowDownRight;
  const trendClass = flat
    ? "text-muted"
    : improved
      ? "text-positive"
      : "text-negative";

  const body = (
    <div
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface p-4",
        href && "transition-colors hover:border-line-strong",
      )}
    >
      <p className="text-[11px] font-medium uppercase tracking-wider text-faint">{label}</p>

      <div className="mt-2 flex items-baseline gap-2">
        <span className="font-mono text-2xl font-semibold tracking-tight text-foreground">
          {value}
          {suffix ? <span className="text-lg text-secondary">{suffix}</span> : null}
        </span>
        {delta !== undefined ? (
          <span className={cn("inline-flex items-center gap-0.5 text-xs font-medium", trendClass)}>
            <Trend className="h-3 w-3" />
            {Math.abs(delta)}
            {deltaSuffix}
          </span>
        ) : null}
      </div>

      {hint ? <p className="mt-1.5 text-[11px] leading-snug text-muted">{hint}</p> : null}

      {series ? (
        <div className="-mx-4 -mb-4 mt-auto h-12 pt-3 opacity-70 transition-opacity group-hover:opacity-100">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={series} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id={`spark-${label}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              {/* Reversed domain so "better" is always visually upward. */}
              <YAxis hide domain={["dataMin", "dataMax"]} reversed={lowerIsBetter} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#10b981"
                strokeWidth={1.5}
                fill={`url(#spark-${label})`}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      ) : null}
    </div>
  );

  return href ? (
    <Link href={href} className="block h-full">
      {body}
    </Link>
  ) : (
    body
  );
}
