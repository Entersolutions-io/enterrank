import { businessScope, paginated } from "@/lib/api-response";

export async function GET(request: Request) {
  const url = new URL(request.url);

  const scope = businessScope(url);
  if (!scope.ok) return scope.response;

  const status = url.searchParams.get("status");
  const sentiment = url.searchParams.get("sentiment");
  const rating = url.searchParams.get("rating");

  let items = scope.business.reviews;
  if (status) items = items.filter((r) => r.status === status);
  if (sentiment) items = items.filter((r) => r.sentiment === sentiment);
  if (rating) items = items.filter((r) => r.rating === Number(rating));

  // Newest first, matching what the inbox shows.
  items = [...items].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return paginated(items, url);
}
