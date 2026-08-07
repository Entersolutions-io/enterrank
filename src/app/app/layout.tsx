import { AppNavProvider } from "@/components/app-shell/nav-state";
import { Sidebar } from "@/components/app-shell/sidebar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppNavProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">{children}</div>
      </div>
    </AppNavProvider>
  );
}
