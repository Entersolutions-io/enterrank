import { businessScope, paginated } from "@/lib/api-response";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const scope = businessScope(url);
  if (!scope.ok) return scope.response;

  return paginated(scope.business.competitors, url);
}
