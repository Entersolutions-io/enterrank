import { ok } from "@/lib/api-response";
import { buildScan, keywords, scanHistory } from "@/mock";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const keywordId = url.searchParams.get("keyword_id") ?? keywords[0].id;
  const size = Math.min(13, Math.max(5, Number(url.searchParams.get("size") ?? 7) || 7));
  const spacing = Math.min(5000, Math.max(100, Number(url.searchParams.get("spacing_meters") ?? 500) || 500));

  if (!keywords.some((k) => k.id === keywordId)) {
    return Response.json(
      {
        error: {
          code: "unknown_keyword",
          message: `No tracked keyword with id ${keywordId}.`,
          fields: { keyword_id: ["Must be one of: " + keywords.map((k) => k.id).join(", ")] },
        },
      },
      { status: 422 },
    );
  }

  return ok({ data: buildScan(keywordId, size, spacing), history: scanHistory });
}
