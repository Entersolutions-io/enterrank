import { notFound, ok, readOnly } from "@/lib/api-response";
import { replyDrafts, replyStages, reviews } from "@/mock";

/**
 * Generates a reply draft for a review.
 *
 * In production this is where the model call happens: the review body, the brand voice profile
 * and the location's target keywords go in, a scored draft comes out. The demo build resolves
 * the same contract from pre-written drafts so the response shape — and therefore every caller —
 * is identical.
 */
export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const review = reviews.find((r) => r.id === id);
  if (!review) return notFound("review");

  const draft = replyDrafts[id] ?? review.reply;
  if (!draft) {
    return Response.json(
      {
        error: {
          code: "no_draft_available",
          message:
            "This review has no pre-written draft in the demo dataset. Try rev_2f9a1, rev_2f9a2, rev_2f9a3 or rev_2f9a8.",
        },
      },
      { status: 422 },
    );
  }

  return ok({
    data: {
      review_id: id,
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
  if (!reviews.some((r) => r.id === id)) return notFound("review");
  return readOnly(`Publishing a reply to review ${id}`);
}
