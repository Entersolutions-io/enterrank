import { businessScope, paginated } from "@/lib/api-response";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const scope = businessScope(url);
  if (!scope.ok) return scope.response;

  const unanswered = url.searchParams.get("unanswered");
  const { questions } = scope.business;
  const items = unanswered === "true" ? questions.filter((q) => !q.answer) : questions;

  return paginated(items, url);
}
