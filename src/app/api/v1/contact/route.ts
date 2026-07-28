import { readOnly } from "@/lib/api-response";

interface ContactPayload {
  name?: string;
  email?: string;
  business?: string;
  city?: string;
  locations?: string;
  message?: string;
}

/**
 * Enquiry endpoint behind the contact form.
 *
 * Validation is real — the same rules a production build would apply — but nothing is delivered:
 * this deployment answers 202 like every other write method. Keeping the validation live means
 * the form's error states are exercised rather than decorative.
 */
export async function POST(request: Request) {
  let payload: ContactPayload;
  try {
    payload = await request.json();
  } catch {
    return Response.json(
      { error: { code: "bad_request", message: "Body must be valid JSON." } },
      { status: 400 },
    );
  }

  const fields: Record<string, string[]> = {};

  if (!payload.name?.trim()) fields.name = ["Required."];
  if (!payload.email?.trim()) {
    fields.email = ["Required."];
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(payload.email.trim())) {
    fields.email = ["Must be a valid email address."];
  }
  if (!payload.business?.trim()) fields.business = ["Required."];

  if (Object.keys(fields).length) {
    return Response.json(
      {
        error: {
          code: "unprocessable",
          message: "Some required details are missing.",
          fields,
        },
      },
      { status: 422 },
    );
  }

  return readOnly("Your enquiry");
}
