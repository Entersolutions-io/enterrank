import { ok } from "@/lib/api-response";
import { overview } from "@/mock";

export async function GET() {
  return ok({ data: overview });
}
