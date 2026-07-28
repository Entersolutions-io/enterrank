import { ok } from "@/lib/api-response";
import { location, profileChecks } from "@/mock";

export async function GET() {
  const earned = profileChecks.filter((c) => c.passed).reduce((sum, c) => sum + c.weight, 0);
  const total = profileChecks.reduce((sum, c) => sum + c.weight, 0);

  return ok({
    data: {
      location_id: location.id,
      score: Math.round((earned / total) * 100),
      checks: profileChecks,
    },
  });
}
