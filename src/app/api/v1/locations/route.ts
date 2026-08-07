import { paginated } from "@/lib/api-response";
import { businesses } from "@/mock";

/**
 * Lists every location the key can see. In demo mode that is all five sample workspaces, each
 * carrying the `demo_business` value to pass as the `business` parameter on the other endpoints.
 */
export async function GET(request: Request) {
  const items = businesses.map((business) => ({
    ...business.location,
    demo_business: business.id,
  }));
  return paginated(items, new URL(request.url));
}
