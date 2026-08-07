import { businessScope, ok } from "@/lib/api-response";

export async function GET(request: Request) {
  const scope = businessScope(new URL(request.url));
  if (!scope.ok) return scope.response;

  const { location, profileChecks } = scope.business;
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
