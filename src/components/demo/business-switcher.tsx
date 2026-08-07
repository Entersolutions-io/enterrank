"use client";

import {
  Check,
  ChevronsUpDown,
  Dumbbell,
  Scissors,
  ShoppingBasket,
  UtensilsCrossed,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { Stars } from "@/components/ui/primitives";
import { useDemoBusiness } from "@/lib/demo-business";
import { useI18n } from "@/lib/i18n";
import type { BusinessId } from "@/lib/types";
import { cn } from "@/lib/utils";
import { businesses } from "@/mock";

/**
 * Picks which demo workspace the whole site is showing.
 *
 * One product demonstrated against one business only ever proves it works for that business.
 * Five datasets that each fail differently make the argument the product is actually making:
 * that local visibility breaks in different places depending on what you sell, and that the
 * same four pillars find the break either way.
 */

const icons: Record<string, LucideIcon> = {
  Scissors,
  ShoppingBasket,
  Wrench,
  UtensilsCrossed,
  Dumbbell,
};

export function BusinessIcon({ name, className }: { name: string; className?: string }) {
  const Icon = icons[name] ?? Scissors;
  return <Icon className={className} />;
}

/* ── Cards: the landing page selector ─────────────────────────────────── */

export function BusinessCards({
  className,
  onSelect,
}: {
  className?: string;
  /** Fired after the selection is applied, so a caller can restart whatever it is showing. */
  onSelect?: (id: BusinessId) => void;
}) {
  const { businessId, setBusinessId } = useDemoBusiness();
  const { pick } = useI18n();

  return (
    <div className={cn("grid gap-3 sm:grid-cols-2 lg:grid-cols-5", className)}>
      {businesses.map((business) => {
        const active = business.id === businessId;
        return (
          <button
            key={business.id}
            type="button"
            onClick={() => {
              setBusinessId(business.id);
              onSelect?.(business.id);
            }}
            aria-pressed={active}
            className={cn(
              "group flex flex-col rounded-xl border p-4 text-left transition-colors",
              active
                ? "border-accent/45 bg-accent/[0.07]"
                : "border-line bg-surface hover:border-line-strong",
            )}
          >
            <span className="flex items-center gap-2">
              <BusinessIcon
                name={business.icon}
                className={cn("h-4 w-4 shrink-0", active ? "text-accent" : "text-muted")}
              />
              <span
                className={cn(
                  "text-[11px] font-medium uppercase tracking-wider",
                  active ? "text-accent-light" : "text-faint",
                )}
              >
                {pick(business.label)}
              </span>
            </span>

            <span className="mt-2.5 text-sm font-medium text-foreground">
              {business.location.name}
            </span>
            <span className="mt-0.5 text-[11px] text-faint">
              {business.location.address}, {business.location.city}
            </span>

            <span className="mt-3 text-xs leading-relaxed text-muted">{pick(business.story)}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ── Chips: compact inline selector ───────────────────────────────────── */

export function BusinessChips({ className }: { className?: string }) {
  const { businessId, setBusinessId } = useDemoBusiness();

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {businesses.map((business) => {
        const active = business.id === businessId;
        return (
          <button
            key={business.id}
            type="button"
            onClick={() => setBusinessId(business.id)}
            aria-pressed={active}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs transition-colors",
              active
                ? "border-accent/40 bg-accent/10 text-accent-light"
                : "border-line text-muted hover:border-line-strong hover:text-secondary",
            )}
          >
            <BusinessIcon name={business.icon} className="h-3.5 w-3.5" />
            {business.location.name}
          </button>
        );
      })}
    </div>
  );
}

/* ── Workspace menu: the app sidebar switcher ─────────────────────────── */

/**
 * Shaped like the account switcher a multi-workspace product would ship, because that is what
 * it would be — in the demo the tenants are fictional businesses, in production they would be
 * the locations the signed-in user manages.
 */
export function WorkspaceMenu() {
  const { business, setBusinessId } = useDemoBusiness();
  const { t, pick } = useI18n();
  const [open, setOpen] = useState(false);

  const choose = (id: BusinessId) => {
    setBusinessId(id);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex w-full items-center gap-2.5 rounded-lg border border-line bg-surface px-3 py-2 text-left transition-colors hover:border-line-strong"
      >
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-accent/12 text-[10px] font-bold text-accent">
          {business.initials}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-xs font-medium text-foreground">
            {business.location.name}
          </span>
          <span className="block truncate text-[10px] text-faint">
            {business.location.address}, {business.location.city}
          </span>
        </span>
        <ChevronsUpDown className="h-3.5 w-3.5 shrink-0 text-faint" />
      </button>

      {open ? (
        <>
          {/* Backdrop closes the menu without a document-level listener. */}
          <button
            type="button"
            className="fixed inset-0 z-40 cursor-default"
            aria-label={t("Close workspace menu", "Zatvori izbornik radnih prostora")}
            onClick={() => setOpen(false)}
          />
          <div
            role="listbox"
            className="absolute left-0 right-0 top-full z-50 mt-1.5 overflow-hidden rounded-lg border border-line-strong bg-surface shadow-2xl shadow-black/40"
          >
            <p className="border-b border-line px-3 py-2 text-[10px] font-semibold uppercase tracking-wider text-faint">
              {t("Demo workspaces", "Demo radni prostori")}
            </p>
            <ul className="max-h-[22rem] overflow-y-auto">
              {businesses.map((option) => {
                const active = option.id === business.id;
                return (
                  <li key={option.id}>
                    <button
                      type="button"
                      role="option"
                      aria-selected={active}
                      onClick={() => choose(option.id)}
                      className={cn(
                        "flex w-full items-start gap-2.5 px-3 py-2.5 text-left transition-colors",
                        active ? "bg-white/[0.05]" : "hover:bg-white/[0.03]",
                      )}
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-accent/12 text-[10px] font-bold text-accent">
                        {option.initials}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-xs font-medium text-foreground">
                          {option.location.name}
                        </span>
                        <span className="block truncate text-[10px] text-faint">
                          {pick(option.label)} · {option.location.city}
                        </span>
                        <span className="mt-1 flex items-center gap-1.5">
                          <Stars rating={option.location.rating} size={9} />
                          <span className="font-mono text-[10px] text-muted">
                            {option.location.rating.toFixed(1)}
                          </span>
                        </span>
                      </span>
                      {active ? <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" /> : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      ) : null}
    </div>
  );
}
