import { paginated } from "@/lib/api-response";
import { questions } from "@/mock";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const unanswered = url.searchParams.get("unanswered");
  const items = unanswered === "true" ? questions.filter((q) => !q.answer) : questions;
  return paginated(items, url);
}
