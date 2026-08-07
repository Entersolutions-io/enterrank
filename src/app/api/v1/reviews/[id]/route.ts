import { notFound, ok } from "@/lib/api-response";
import { findReviewOwner } from "@/mock";

/** Review ids are unique across workspaces, so this needs no `business` parameter. */
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const owner = findReviewOwner(id);
  if (!owner) return notFound("review");
  return ok({ data: owner.review });
}
