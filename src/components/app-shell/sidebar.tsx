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
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/logo";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { location } from "@/mock";

interface NavItem {
  href: string;
  icon: LucideIcon;
  label: { en: string; hr: string };
  badge?: number;
}

export function Sidebar({ awaitingReplies }: { awaitingReplies: number }) {
  const { pick, t } = useI18n();
  const pathname = usePathname();

  const groups: { title: { en: string; hr: string }; items: NavItem[] }[] = [
    {
      title: { en: "Overview", hr: "Pregled" },
      items: [
        { href: "/app", icon: BarChart3, label: { en: "Dashboard", hr: "Nadzorna ploča" } },
      ],
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
    <aside className="hidden w-60 shrink-0 flex-col border-r border-line bg-sidebar lg:flex">
      <div className="flex h-14 items-center border-b border-line px-5">
        <Logo size="sm" />
      </div>

      {/* Location switcher — single location in the demo, but the shape is what a multi-location
          account would use. */}
      <div className="border-b border-line px-3 py-3">
        <button
          type="button"
          className="flex w-full items-center gap-2.5 rounded-lg border border-line bg-surface px-3 py-2 text-left transition-colors hover:border-line-strong"
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-accent/12 text-[10px] font-bold text-accent">
            SL
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-xs font-medium text-foreground">
              {location.name}
            </span>
            <span className="block truncate text-[10px] text-faint">
              {location.address}, {location.city}
            </span>
          </span>
        </button>
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
                      className={cn(
                        "flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition-colors",
                        active
                          ? "bg-white/[0.06] text-foreground"
                          : "text-muted hover:bg-white/[0.03] hover:text-secondary",
                      )}
                    >
                      <item.icon
                        className={cn("h-4 w-4 shrink-0", active ? "text-accent" : "")}
                      />
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

      <div className="border-t border-line p-3">
        <Link
          href="/"
          className="block rounded-lg px-2.5 py-2 text-xs text-faint transition-colors hover:text-secondary"
        >
          ← {t("Back to site", "Natrag na stranicu")}
        </Link>
      </div>
    </aside>
  );
}
