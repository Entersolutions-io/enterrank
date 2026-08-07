import { businessScope, paginated } from "@/lib/api-response";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const scope = businessScope(url);
  if (!scope.ok) return scope.response;

  const status = url.searchParams.get("status");
  const { posts } = scope.business;
  const items = status ? posts.filter((p) => p.status === status) : posts;

  return paginated(items, url);
}
