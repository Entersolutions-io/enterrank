import type { DemoBusiness, Paginated } from "@/lib/types";
import { DEFAULT_BUSINESS_ID, businesses, getBusiness, isBusinessId } from "@/mock";

/**
 * Shared helpers for the public demo API.
 *
 * These routes serve the same shapes documented on /docs/api, so a `curl` copied from the
 * reference page returns real JSON. They read from fixtures and never mutate: write methods
 * acknowledge the request and echo what *would* have been stored. That behaviour is documented
 * rather than hidden — see the `demo` flag on every response.
 */

const DEMO_HEADERS = {
  "X-EnterRank-Mode": "demo",
  "Cache-Control": "no-store",
  "Access-Control-Allow-Origin": "*",
} as const;

export type BusinessScope =
  | { ok: true; business: DemoBusiness }
  | { ok: false; response: Response };

/**
 * Resolves the `business` query parameter to a demo workspace.
 *
 * The parameter exists because the browser picks its tenant from local storage and a `curl`
 * cannot. In production the workspace comes from the API key instead, and this helper is the
 * one thing that would be deleted. An unrecognised value is rejected rather than quietly
 * defaulted — silently returning someone else's data is the wrong failure for an API.
 */
export function businessScope(url: URL): BusinessScope {
  const raw = url.searchParams.get("business");
  if (raw === null) return { ok: true, business: getBusiness(DEFAULT_BUSINESS_ID) };

  if (!isBusinessId(raw)) {
    return {
      ok: false,
      response: Response.json(
        {
          error: {
            code: "unknown_business",
            message: `No demo workspace with id ${raw}.`,
            fields: { business: ["Must be one of: " + businesses.map((b) => b.id).join(", ")] },
          },
        },
        { status: 422, headers: DEMO_HEADERS },
      ),
    };
  }

  return { ok: true, business: getBusiness(raw) };
}

export function ok<T>(body: T, status = 200) {
  return Response.json({ ...body, demo: true }, { status, headers: DEMO_HEADERS });
}

export function paginate<T>(items: T[], url: URL): Paginated<T> & { demo: boolean } {
  const page = Math.max(1, Number(url.searchParams.get("page") ?? 1) || 1);
  const perPage = Math.min(100, Math.max(1, Number(url.searchParams.get("per_page") ?? 25) || 25));
  const start = (page - 1) * perPage;

  return {
    data: items.slice(start, start + perPage),
    meta: {
      current_page: page,
      per_page: perPage,
      total: items.length,
      last_page: Math.max(1, Math.ceil(items.length / perPage)),
    },
    demo: true,
  };
}

export function paginated<T>(items: T[], url: URL) {
  return Response.json(paginate(items, url), { headers: DEMO_HEADERS });
}

export function notFound(resource: string) {
  return Response.json(
    { error: { code: "not_found", message: `No ${resource} matches that identifier.` } },
    { status: 404, headers: DEMO_HEADERS },
  );
}

export function readOnly(action: string) {
  return Response.json(
    {
      accepted: true,
      applied: false,
      message: `${action} was accepted but not persisted — this deployment runs in demo mode.`,
      demo: true,
    },
    { status: 202, headers: DEMO_HEADERS },
  );
}
