import { paginated } from "@/lib/api-response";
import { posts } from "@/mock";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const status = url.searchParams.get("status");
  const items = status ? posts.filter((p) => p.status === status) : posts;
  return paginated(items, url);
}
