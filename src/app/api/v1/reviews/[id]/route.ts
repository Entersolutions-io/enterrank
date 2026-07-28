import { notFound, ok } from "@/lib/api-response";
import { reviews } from "@/mock";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const review = reviews.find((r) => r.id === id);
  if (!review) return notFound("review");
  return ok({ data: review });
}
