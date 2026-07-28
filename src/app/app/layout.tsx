import { Sidebar } from "@/components/app-shell/sidebar";
import { reviews } from "@/mock";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const awaitingReplies = reviews.filter((r) => r.status === "needs_reply").length;

  return (
    <div className="flex min-h-screen">
      <Sidebar awaitingReplies={awaitingReplies} />
      <div className="flex min-w-0 flex-1 flex-col">{children}</div>
    </div>
  );
}
