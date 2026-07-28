import { LegalPage } from "@/components/legal/legal-page";
import { dpa } from "@/content/legal";

export default function Page() {
  return <LegalPage document={dpa} />;
}
