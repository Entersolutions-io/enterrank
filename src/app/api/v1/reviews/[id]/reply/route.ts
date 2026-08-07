import { notFound, ok, readOnly } from "@/lib/api-response";
import { findReviewOwner, replyStages } from "@/mock";

/**
 * Generates a reply draft for a review.
 *
 * In production this is where the model call happens: the review body, the brand voice profile
 * and the location's target keywords go in, a scored draft comes out. The demo build resolves
 * the same contract from pre-written drafts so the response shape — and therefore every caller —
 * is identical. The workspace is taken from the review rather than from a parameter, since the
 * brand voice a draft is written in belongs to whoever owns the review.
 */
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const owner = findReviewOwner(id);
  if (!owner) return notFound("review");

  const { business, review } = owner;
  const draft = business.replyDrafts[id] ?? review.reply;
  if (!draft) {
    return Response.json(
      {
        error: {
          code: "no_draft_available",
          message: `This review has no pre-written draft in the demo dataset. For ${business.location.name}, try ${Object.keys(business.replyDrafts).join(", ")}.`,
        },
      },
      { status: 422 },
    );
  }

  return ok({
    data: {
      review_id: id,
      business: business.id,
      text: draft.text,
      keywords: draft.keywords,
      seo_score: draft.seoScore,
      // Surfaced so clients can render the same staged progress the dashboard shows.
      stages: replyStages.map((s) => ({ id: s.id, label: s.label, duration_ms: s.durationMs })),
      generated_at: "2026-07-28T07:00:00Z",
    },
  });
}

/** Publishing a reply to Google. Acknowledged, never persisted. */
export async function PUT(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!findReviewOwner(id)) return notFound("review");
  return readOnly(`Publishing a reply to review ${id}`);
}
