import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Deterministic pseudo-random in [0,1) from a string seed — keeps demo data stable between renders. */
export function seeded(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 100000) / 100000;
}

/** Colour band for a Google Maps ranking position. Shared by the grid, tables and legends. */
export function rankBand(rank: number | null): {
  key: "top3" | "top10" | "top20" | "unranked";
  hex: string;
  ring: string;
} {
  if (rank === null || rank > 20) {
    return { key: "unranked", hex: "#52525b", ring: "rgba(82,82,91,0.35)" };
  }
  if (rank <= 3) return { key: "top3", hex: "#10b981", ring: "rgba(16,185,129,0.35)" };
  if (rank <= 10) return { key: "top10", hex: "#f59e0b", ring: "rgba(245,158,11,0.35)" };
  return { key: "top20", hex: "#f43f5e", ring: "rgba(244,63,94,0.35)" };
}

/** Initials avatar colour, derived from the name so it never changes between sessions. */
export function avatarTint(name: string): { bg: string; fg: string } {
  const tints = [
    { bg: "rgba(16,185,129,0.12)", fg: "#34d399" },
    { bg: "rgba(56,189,248,0.12)", fg: "#38bdf8" },
    { bg: "rgba(245,158,11,0.12)", fg: "#fbbf24" },
    { bg: "rgba(168,85,247,0.12)", fg: "#c084fc" },
    { bg: "rgba(244,63,94,0.12)", fg: "#fb7185" },
  ];
  return tints[Math.floor(seeded(name) * tints.length)];
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

/** `2026-07-14` → `14 Jul 2026`, locale-independent so SSR and client always agree. */
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatDate(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split("-");
  return `${Number(d)} ${MONTHS[Number(m) - 1]} ${y}`;
}

/** Relative age in whole days against the fixed demo "today", so copy never drifts. */
export const DEMO_TODAY = "2026-07-28";

export function daysAgo(iso: string): number {
  const a = Date.parse(`${DEMO_TODAY}T00:00:00Z`);
  const b = Date.parse(`${iso.slice(0, 10)}T00:00:00Z`);
  return Math.max(0, Math.round((a - b) / 86_400_000));
}

/** Promise that resolves after `ms` — the backbone of every simulated pipeline in the demo. */
export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
