import { LegalPage } from "@/components/legal/legal-page";
import { terms } from "@/content/legal";

export default function Page() {
  return <LegalPage document={terms} />;
}
