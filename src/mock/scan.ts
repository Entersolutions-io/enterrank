import type { DemoBusiness, GridPoint, GridScan } from "@/lib/types";
import { seeded } from "@/lib/utils";

/**
 * Builds a grid scan deterministically from the tenant and keyword id, so the same term always
 * renders the same heatmap across reloads, between server and client, and after the visitor
 * switches business and switches back.
 *
 * The model mirrors how local rankings actually behave — best at the business's own door,
 * decaying outward faster than linearly — and is calibrated so the mean position across the
 * grid lands on the keyword's `avgRank`. Without that calibration the table and the map tell
 * two different stories, which is exactly the kind of detail that makes a demo feel fake.
 *
 * Keyword ids are unique across tenants, which is what keeps two businesses from producing an
 * identical heatmap for terms that happen to have the same average position.
 */
export function buildScan(
  business: DemoBusiness,
  keywordId: string,
  size = 7,
  spacingMeters = 500,
): GridScan {
  const { keywords, competitors, location } = business;
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
    const jitter =
      (seeded(`${keyword.id}:${row}:${col}`) - 0.5) * (target === null ? 0 : target * 0.5);

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
    locationId: location.id,
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
export function keywordStats(business: DemoBusiness, keywordId: string) {
  const scan = buildScan(business, keywordId);
  return { avgRank: scan.avgRank, top3Share: Math.round(scan.solv), coverage: scan.atrs };
}
