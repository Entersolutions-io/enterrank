import type { MetricPoint } from "@/lib/types";

/**
 * The twelve weeks every tenant's trend charts are plotted against, ending on the fixed demo
 * date. Sharing one calendar across datasets means switching business changes the shape of the
 * lines but never the x-axis, so the comparison stays honest.
 */
export const WEEKS = [
  "2026-05-11",
  "2026-05-18",
  "2026-05-25",
  "2026-06-01",
  "2026-06-08",
  "2026-06-15",
  "2026-06-22",
  "2026-06-29",
  "2026-07-06",
  "2026-07-13",
  "2026-07-20",
  "2026-07-27",
] as const;

export function series(values: number[]): MetricPoint[] {
  return WEEKS.map((date, i) => ({ date, value: values[i] }));
}
