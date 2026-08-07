/**
 * The demo data layer.
 *
 * Screens never import a tenant directly — they read the active one from `useDemoBusiness()`,
 * or, on the server, resolve it from the `business` query parameter with `getBusiness()`.
 * Swapping tenant swaps every screen at once, and nothing in `src/components` knows which
 * business it is rendering.
 */
export {
  DEFAULT_BUSINESS_ID,
  businesses,
  findReviewOwner,
  getBusiness,
  isBusinessId,
} from "./businesses";
export { buildScan, keywordStats } from "./scan";
export { engines, replyStages } from "./shared";
