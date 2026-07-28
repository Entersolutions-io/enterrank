import type { OverviewMetrics } from "@/lib/types";

/** Weekly series covering the last twelve weeks, ending on the fixed demo date. */
const weeks = [
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
];

const series = (values: number[]) => weeks.map((date, i) => ({ date, value: values[i] }));

export const overview: OverviewMetrics = {
  reviewsAwaitingReply: 4,
  medianResponseHours: 9,

  rating: 4.6,
  ratingSeries: series([4.4, 4.4, 4.45, 4.4, 4.5, 4.5, 4.5, 4.55, 4.55, 4.6, 4.55, 4.6]),

  // Lower is better — the chart inverts its axis for this one.
  avgRank: 4.2,
  rankSeries: series([8.1, 7.9, 7.4, 7.6, 6.8, 6.2, 5.9, 5.5, 5.1, 4.8, 4.4, 4.2]),

  aiVisibilityScore: 47,
  aiVisibilitySeries: series([8, 8, 12, 15, 15, 21, 24, 29, 33, 38, 42, 47]),

  profileScore: 78,

  reviewVolume: [
    { date: "2026-05-11", positive: 5, neutral: 1, negative: 1 },
    { date: "2026-05-18", positive: 4, neutral: 2, negative: 0 },
    { date: "2026-05-25", positive: 7, neutral: 1, negative: 1 },
    { date: "2026-06-01", positive: 6, neutral: 0, negative: 2 },
    { date: "2026-06-08", positive: 8, neutral: 2, negative: 0 },
    { date: "2026-06-15", positive: 9, neutral: 1, negative: 1 },
    { date: "2026-06-22", positive: 7, neutral: 2, negative: 1 },
    { date: "2026-06-29", positive: 11, neutral: 1, negative: 0 },
    { date: "2026-07-06", positive: 9, neutral: 3, negative: 1 },
    { date: "2026-07-13", positive: 12, neutral: 1, negative: 2 },
    { date: "2026-07-20", positive: 10, neutral: 2, negative: 1 },
    { date: "2026-07-27", positive: 8, neutral: 1, negative: 2 },
  ],
};
