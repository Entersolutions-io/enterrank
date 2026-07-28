import { LegalPage } from "@/components/legal/legal-page";
import { gdpr } from "@/content/legal";

export default function Page() {
  return <LegalPage document={gdpr} />;
}
