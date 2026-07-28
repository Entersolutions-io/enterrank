import { paginated } from "@/lib/api-response";
import { location } from "@/mock";

export async function GET(request: Request) {
  return paginated([location], new URL(request.url));
}
