import { paginated } from "@/lib/api-response";
import { probes } from "@/mock";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const engine = url.searchParams.get("engine");

  // Filtering by engine narrows each probe's results rather than dropping whole probes.
  const items = engine
    ? probes.map((p) => ({ ...p, results: p.results.filter((r) => r.engine === engine) }))
    : probes;

  return paginated(items, url);
}
