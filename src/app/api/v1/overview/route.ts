import { businessScope, ok } from "@/lib/api-response";

export async function GET(request: Request) {
  const scope = businessScope(new URL(request.url));
  if (!scope.ok) return scope.response;

  return ok({ data: scope.business.overview, business: scope.business.id });
}
