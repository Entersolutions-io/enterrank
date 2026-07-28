import { paginated } from "@/lib/api-response";
import { competitors } from "@/mock";

export async function GET(request: Request) {
  return paginated(competitors, new URL(request.url));
}
