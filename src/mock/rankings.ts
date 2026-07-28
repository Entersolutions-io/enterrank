import type { GridPoint, GridScan, Keyword } from "@/lib/types";
import { seeded } from "@/lib/utils";
import { competitors } from "./location";

/**
 * Tracked search terms.
 *
 * `avgRank` is the target the grid generator calibrates to, so the table and the heatmap can
 * never disagree. The spread across terms is deliberate — one term the business owns, one it
 * is mediocre at, one it loses at the edges, and one it does not appear for at all.
 */
export const keywords: Keyword[] = [
  {
    id: "kw_01",
    term: { en: "hair salon zagreb", hr: "frizerski salon zagreb" },
    volume: 4400,
    avgRank: 5.4,
    delta: -1.3,
    top3Share: 0, // derived from the scan; see keywordStats()
  },
  {
    id: "kw_02",
    term: { en: "balayage zagreb", hr: "balayage zagreb" },
    volume: 1300,
    avgRank: 2.4,
    delta: -0.8,
    top3Share: 0,
  },
  {
    id: "kw_03",
    term: { en: "hair salon near me", hr: "frizer blizu mene" },
    volume: 9900,
    avgRank: 11.2,
    delta: 0.4,
    top3Share: 0,
  },
  {
    id: "kw_04",
    term: { en: "men's haircut zagreb", hr: "muško šišanje zagreb" },
    volume: 2900,
    avgRank: 7.6,
    delta: -2.1,
    top3Share: 0,
  },
  {
    id: "kw_05",
    term: { en: "wedding hair zagreb", hr: "svadbena frizura zagreb" },
    volume: 720,
    avgRank: 3.1,
    delta: -0.2,
    top3Share: 0,
  },
  {
    id: "kw_06",
    term: { en: "keratin treatment zagreb", hr: "keratinski tretman zagreb" },
    volume: 590,
    avgRank: null,
    delta: 0,
    top3Share: 0,
  },
];

/**
 * Builds a grid scan deterministically from the keyword id, so the same term always renders the
 * same heatmap across reloads and between server and client.
 *
 * The model mirrors how local rankings actually behave — best at the business's own door,
 * decaying outward faster than linearly — and is calibrated so the mean position across the
 * grid lands on the keyword's `avgRank`. Without that calibration the table and the map tell
 * two different stories, which is exactly the kind of detail that makes a demo feel fake.
 */
export function buildScan(keywordId: string, size = 7, spacingMeters = 500): GridScan {
  const keyword = keywords.find((k) => k.id === keywordId) ?? keywords[0];
  const centre = (size - 1) / 2;
  const maxDistance = Math.sqrt(2) * centre || 1;

  // Distance from the centre, normalised to 0–1 and curved so the drop-off accelerates outward.
  const shaped = scanGeometry(size, centre, maxDistance);
  const meanShaped = shaped.reduce((sum, s) => sum + s.curve, 0) / shaped.length;

  const target = keyword.avgRank;
  // Rank at the doorstep, and the slope needed for the grid mean to land on `target`.
  const base = target === null ? 0 : 1 + (target - 1) * 0.14;
  const slope = target === null ? 0 : (target - base) / (meanShaped || 1);

  const points: GridPoint[] = [];
  let rankedSum = 0;
  let rankedCount = 0;
  let top3 = 0;

  shaped.forEach(({ row, col, distance, curve }) => {
    // Noise grows with the target so weak terms look genuinely patchy, strong ones stay solid.
    const jitter = (seeded(`${keyword.id}:${row}:${col}`) - 0.5) * (target === null ? 0 : target * 0.5);

    let rank: number | null;
    if (target === null) {
      // No coverage at all, beyond a couple of stray appearances at the door.
      rank = distance < 0.2 && seeded(`${keyword.id}:s:${row}:${col}`) > 0.72 ? 19 : null;
    } else {
      const raw = base + slope * curve + jitter;
      rank = raw > 20.5 ? null : Math.max(1, Math.round(raw));
    }

    if (rank !== null) {
      rankedSum += rank;
      rankedCount++;
      if (rank <= 3) top3++;
    }

    points.push({
      row,
      col,
      offsetX: (col - centre) * spacingMeters,
      offsetY: (row - centre) * spacingMeters,
      rank,
      topCompetitor:
        competitors[Math.floor(seeded(`${keyword.id}:c:${row}:${col}`) * competitors.length)].name,
    });
  });

  const total = size * size;

  return {
    id: `scan_${keyword.id}`,
    locationId: "loc_8f21c",
    keywordId: keyword.id,
    size,
    spacingMeters,
    ranAt: "2026-07-28T06:00:00Z",
    points,
    avgRank: rankedCount ? Number((rankedSum / rankedCount).toFixed(1)) : null,
    // ATRS rewards both breadth of coverage and quality of position.
    atrs: Number((((rankedCount / total) * 0.4 + (top3 / total) * 0.6) * 100).toFixed(1)),
    solv: Number(((top3 / total) * 100).toFixed(1)),
  };
}

function scanGeometry(size: number, centre: number, maxDistance: number) {
  const cells: { row: number; col: number; distance: number; curve: number }[] = [];
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const dx = col - centre;
      const dy = row - centre;
      const distance = Math.sqrt(dx * dx + dy * dy) / maxDistance;
      cells.push({ row, col, distance, curve: Math.pow(distance, 1.45) });
    }
  }
  return cells;
}

/**
 * Scan-derived figures for the keyword table. Deriving rather than hard-coding these keeps the
 * table honest against whatever the grid actually produced.
 */
export function keywordStats(keywordId: string) {
  const scan = buildScan(keywordId);
  return { avgRank: scan.avgRank, top3Share: Math.round(scan.solv), coverage: scan.atrs };
}

/** Scan history for the trend chart under the grid. */
export const scanHistory: { date: string; atrs: number }[] = [
  { date: "2026-05-05", atrs: 21.4 },
  { date: "2026-05-19", atrs: 24.9 },
  { date: "2026-06-02", atrs: 23.1 },
  { date: "2026-06-16", atrs: 29.8 },
  { date: "2026-06-30", atrs: 33.5 },
  { date: "2026-07-14", atrs: 36.2 },
  { date: "2026-07-28", atrs: 41.7 },
];
