"use client";

import {
  BarChart3,
  Grid3x3,
  MessageSquareQuote,
  Settings,
  Sparkles,
  Store,
  Users,
  Volume2,
  X,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useAppNav } from "@/components/app-shell/nav-state";
import { WorkspaceMenu } from "@/components/demo/business-switcher";
import { Logo } from "@/components/ui/logo";
import { useDemoBusiness } from "@/lib/demo-business";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  icon: LucideIcon;
  label: { en: string; hr: string };
  badge?: number;
}

/**
 * The app navigation.
 *
 * Rendered twice from one set of contents: a static column from `lg` up, and a drawer over the
 * page below it. Below `lg` the column would eat two thirds of the viewport, and the app's own
 * screens — grids, tables, the reply composer — are the point.
 */
export function Sidebar() {
  const { open, setOpen } = useAppNav();
  const pathname = usePathname();

  // Navigating closes the drawer. Handled here rather than on each link so it also covers the
  // workspace switcher and anything else that changes the route.
  useEffect(() => {
    setOpen(false);
  }, [pathname, setOpen]);

  // The drawer is a layer over the page, so the page behind it must not scroll under it.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      <aside className="hidden w-60 shrink-0 flex-col border-r border-line bg-sidebar lg:flex">
        <SidebarContents />
      </aside>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          open ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <div
          className={cn(
            "absolute inset-0 bg-black/60 transition-opacity duration-200",
            open ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setOpen(false)}
        />
        <div
          className={cn(
            "absolute inset-y-0 left-0 flex w-[17rem] max-w-[85vw] flex-col border-r border-line bg-sidebar transition-transform duration-250 ease-out",
            open ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <SidebarContents onClose={() => setOpen(false)} />
        </div>
      </div>
    </>
  );
}

function SidebarContents({ onClose }: { onClose?: () => void }) {
  const { pick, t } = useI18n();
  const { business } = useDemoBusiness();
  const pathname = usePathname();

  // Derived here rather than passed down from the layout: the count belongs to whichever
  // workspace is selected, and the layout is a server component that cannot know that.
  const awaitingReplies = business.reviews.filter((r) => r.status === "needs_reply").length;

  const groups: { title: { en: string; hr: string }; items: NavItem[] }[] = [
    {
      title: { en: "Overview", hr: "Pregled" },
      items: [{ href: "/app", icon: BarChart3, label: { en: "Dashboard", hr: "Nadzorna ploča" } }],
    },
    {
      title: { en: "Pillars", hr: "Stupovi" },
      items: [
        {
          href: "/app/reviews",
          icon: MessageSquareQuote,
          label: { en: "Reviews", hr: "Recenzije" },
          badge: awaitingReplies,
        },
        { href: "/app/rankings", icon: Grid3x3, label: { en: "Rankings", hr: "Rangiranje" } },
        {
          href: "/app/ai-visibility",
          icon: Sparkles,
          label: { en: "AI Visibility", hr: "AI vidljivost" },
        },
        { href: "/app/presence", icon: Store, label: { en: "Presence", hr: "Prisutnost" } },
      ],
    },
    {
      title: { en: "Configure", hr: "Postavke" },
      items: [
        {
          href: "/app/competitors",
          icon: Users,
          label: { en: "Competitors", hr: "Konkurencija" },
        },
        {
          href: "/app/brand-voice",
          icon: Volume2,
          label: { en: "Brand voice", hr: "Glas marke" },
        },
        { href: "/app/settings", icon: Settings, label: { en: "Settings", hr: "Postavke" } },
      ],
    },
  ];

  return (
    <>
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-line px-5">
        <Logo size="sm" />
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="text-muted transition-colors hover:text-foreground"
            aria-label={t("Close navigation", "Zatvori navigaciju")}
          >
            <X className="h-5 w-5" />
          </button>
        ) : null}
      </div>

      {/* Workspace switcher. In the demo it swaps between five sample businesses; in production
          it is the same control over the locations an account actually manages. */}
      <div className="shrink-0 border-b border-line px-3 py-3">
        <WorkspaceMenu />
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {groups.map((group) => (
          <div key={group.title.en} className="mb-6">
            <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-faint">
              {pick(group.title)}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active =
                  item.href === "/app" ? pathname === "/app" : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors",
                        active
                          ? "bg-white/[0.06] text-foreground"
                          : "text-muted hover:bg-white/[0.03] hover:text-secondary",
                      )}
                    >
                      <item.icon className={cn("h-4 w-4 shrink-0", active ? "text-accent" : "")} />
                      <span className="flex-1 truncate">{pick(item.label)}</span>
                      {item.badge ? (
                        <span className="rounded-full bg-accent/15 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-accent">
                          {item.badge}
                        </span>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="shrink-0 border-t border-line p-3">
        <Link
          href="/"
          onClick={onClose}
          className="block rounded-lg px-2.5 py-2 text-xs text-faint transition-colors hover:text-secondary"
        >
          ← {t("Back to site", "Natrag na stranicu")}
        </Link>
      </div>
    </>
  );
}
