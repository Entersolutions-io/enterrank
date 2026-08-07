import { businessScope, paginated } from "@/lib/api-response";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const scope = businessScope(url);
  if (!scope.ok) return scope.response;

  const engine = url.searchParams.get("engine");
  const { probes } = scope.business;

  // Filtering by engine narrows each probe's results rather than dropping whole probes.
  const items = engine
    ? probes.map((p) => ({ ...p, results: p.results.filter((r) => r.engine === engine) }))
    : probes;

  return paginated(items, url);
}
