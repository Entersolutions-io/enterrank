import type { BusinessId, DemoBusiness, Review } from "@/lib/types";
import { autoparts } from "./autoparts";
import { gym } from "./gym";
import { market } from "./market";
import { restaurant } from "./restaurant";
import { salon } from "./salon";

/**
 * The demo tenant registry.
 *
 * Five complete workspaces the visitor can switch between, chosen so each one fails at local
 * visibility for a different reason: a salon whose profile omits half its services, a grocery
 * that has never published anything, a parts counter losing to a catalogue, a restaurant
 * drowning in its own review volume, and a gym competing with chain budgets.
 *
 * Array order is the order the switcher renders in.
 */
export const businesses: readonly DemoBusiness[] = [salon, market, autoparts, restaurant, gym];

export const DEFAULT_BUSINESS_ID: BusinessId = "salon";

const byId = new Map<BusinessId, DemoBusiness>(businesses.map((b) => [b.id, b]));

export function isBusinessId(value: unknown): value is BusinessId {
  return typeof value === "string" && byId.has(value as BusinessId);
}

/** Falls back to the default tenant rather than throwing — callers are query strings and storage. */
export function getBusiness(id: unknown): DemoBusiness {
  return (isBusinessId(id) ? byId.get(id) : undefined) ?? byId.get(DEFAULT_BUSINESS_ID)!;
}

/**
 * Resolves which tenant a review belongs to. Review ids are unique across the registry, so a
 * deep link into `/app/reviews/{id}` still works after the visitor has switched business — the
 * detail screen re-selects the owning workspace instead of 404ing.
 */
export function findReviewOwner(
  reviewId: string,
): { business: DemoBusiness; review: Review } | undefined {
  for (const business of businesses) {
    const review = business.reviews.find((r) => r.id === reviewId);
    if (review) return { business, review };
  }
  return undefined;
}

export { autoparts, gym, market, restaurant, salon };
