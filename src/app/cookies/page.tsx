import { LegalPage } from "@/components/legal/legal-page";
import { cookies } from "@/content/legal";

export default function Page() {
  return <LegalPage document={cookies} />;
}
