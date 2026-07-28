"use client";

import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { GridScan } from "@/lib/types";
import { cn, rankBand } from "@/lib/utils";

/**
 * Geo-grid ranking heatmap.
 *
 * Each point is one sampled location around the business; the number is where the business
 * appears in Google Maps results *from that spot*. Points resolve in a wave travelling outward
 * from the centre, which is both how a real scan progresses and the clearest way to show that
 * ranking is a property of place rather than a single number.
 *
 * Used on the marketing page and inside the app — same component, different chrome.
 */

export interface GeoGridProps {
  scan: GridScan;
  /** Bumping this from the parent replays the scan animation. */
  runToken: number;
  /** Total time the reveal wave takes, in ms. */
  durationMs?: number;
  onPointSelect?: (index: number | null) => void;
  selectedIndex?: number | null;
  className?: string;
}

export function GeoGrid({
  scan,
  runToken,
  durationMs = 2200,
  onPointSelect,
  selectedIndex = null,
  className,
}: GeoGridProps) {
  const centre = (scan.size - 1) / 2;

  /** Per-point reveal delay, proportional to distance from the centre of the grid. */
  const delays = useMemo(() => {
    const maxDistance = Math.sqrt(2 * centre * centre) || 1;
    return scan.points.map((p) => {
      const dx = p.col - centre;
      const dy = p.row - centre;
      return (Math.sqrt(dx * dx + dy * dy) / maxDistance) * (durationMs / 1000) * 0.82;
    });
  }, [scan.points, centre, durationMs]);

  return (
    <div
      className={cn(
        "relative aspect-square w-full overflow-hidden rounded-xl border border-line bg-surface",
        className,
      )}
    >
      {/* Map backdrop. The image is optional — the gradient and grid below stand in until it exists. */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.55]"
        style={{ backgroundImage: "url(/images/map-dark.webp)" }}
        aria-hidden
      />
      <div className="line-grid absolute inset-0 opacity-60" aria-hidden />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(16,185,129,0.10), transparent 62%)",
        }}
        aria-hidden
      />

      {/* Scan pulse emanating from the business location. */}
      <motion.div
        key={`pulse-${runToken}`}
        className="pointer-events-none absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/40"
        initial={{ scale: 0.3, opacity: 0.7 }}
        animate={{ scale: 9, opacity: 0 }}
        transition={{ duration: durationMs / 1000, ease: "easeOut" }}
        aria-hidden
      />

      {/*
        Business marker. Rendered before the points so it sits behind them — a filled dot on top
        would cover the centre cell's rank, which is the one number people look for first.
      */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        aria-hidden
      >
        <span
          className="block rounded-full border-2 border-accent/70"
          style={{ width: `${(100 / scan.size) * 1.45}%`, aspectRatio: "1", minWidth: 44 }}
        />
      </div>

      <div
        className="absolute inset-0 grid p-[6%]"
        style={{
          gridTemplateColumns: `repeat(${scan.size}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${scan.size}, minmax(0, 1fr))`,
        }}
      >
        {scan.points.map((point, index) => {
          const band = rankBand(point.rank);
          const isSelected = selectedIndex === index;

          return (
            <motion.button
              // Remounting on runToken replays the reveal without any imperative timers.
              key={`${runToken}-${point.row}-${point.col}`}
              type="button"
              onClick={() => onPointSelect?.(isSelected ? null : index)}
              initial={{ opacity: 0, scale: 0.3 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: delays[index],
                duration: 0.34,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative flex items-center justify-center focus-visible:outline-none"
              aria-label={
                point.rank === null
                  ? "Not ranked at this point"
                  : `Rank ${point.rank} at this point`
              }
            >
              <span
                className={cn(
                  "flex items-center justify-center rounded-full font-mono font-semibold transition-all duration-200",
                  "text-[clamp(0.5rem,1.5vw,0.8rem)]",
                  isSelected ? "scale-125" : "group-hover:scale-115",
                )}
                style={{
                  width: "78%",
                  height: "78%",
                  maxWidth: 46,
                  maxHeight: 46,
                  background:
                    point.rank === null ? "rgba(24,24,27,0.82)" : `${band.hex}22`,
                  border: `1.5px solid ${point.rank === null ? "#3f3f46" : band.hex}`,
                  color: point.rank === null ? "#52525b" : band.hex,
                  boxShadow: isSelected ? `0 0 0 4px ${band.ring}` : undefined,
                }}
              >
                {point.rank === null ? "–" : point.rank}
              </span>
            </motion.button>
          );
        })}
      </div>

    </div>
  );
}

/* ── Legend ───────────────────────────────────────────────────────────── */

export function GeoGridLegend({
  labels,
  className,
}: {
  labels: { top3: string; top10: string; top20: string; unranked: string };
  className?: string;
}) {
  const entries = [
    { hex: "#10b981", label: labels.top3 },
    { hex: "#f59e0b", label: labels.top10 },
    { hex: "#f43f5e", label: labels.top20 },
    { hex: "#52525b", label: labels.unranked },
  ];

  return (
    <div className={cn("flex flex-wrap items-center gap-x-5 gap-y-2", className)}>
      {entries.map((entry) => (
        <span key={entry.label} className="inline-flex items-center gap-2 text-xs text-muted">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: `${entry.hex}33`, border: `1.5px solid ${entry.hex}` }}
          />
          {entry.label}
        </span>
      ))}
    </div>
  );
}

/* ── Animated stat ────────────────────────────────────────────────────── */

/**
 * Counts up to `value` over `durationMs`, restarting whenever `runToken` changes so the headline
 * numbers land in step with the grid finishing its reveal.
 */
export function CountUp({
  value,
  runToken,
  durationMs = 2200,
  decimals = 0,
  suffix = "",
  placeholder = "–",
}: {
  value: number | null;
  runToken: number;
  durationMs?: number;
  decimals?: number;
  suffix?: string;
  placeholder?: string;
}) {
  const [display, setDisplay] = useState(value ?? 0);
  const frame = useRef<number | undefined>(undefined);

  const animate = useCallback(() => {
    if (value === null) return;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      // Ease-out so the number decelerates into its final value.
      setDisplay(value * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) frame.current = requestAnimationFrame(step);
    };
    frame.current = requestAnimationFrame(step);
  }, [value, durationMs]);

  useEffect(() => {
    animate();
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [animate, runToken]);

  if (value === null) return <>{placeholder}</>;
  return (
    <>
      {display.toFixed(decimals)}
      {suffix}
    </>
  );
}
