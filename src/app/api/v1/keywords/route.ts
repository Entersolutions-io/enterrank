import { paginated } from "@/lib/api-response";
import { keywords } from "@/mock";

export async function GET(request: Request) {
  return paginated(keywords, new URL(request.url));
}
