"use client";

import { AlertCircle, Menu } from "lucide-react";
import { useAppNav } from "@/components/app-shell/nav-state";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { Avatar } from "@/components/ui/primitives";
import { useDemoBusiness } from "@/lib/demo-business";
import { useI18n } from "@/lib/i18n";
import { DEMO_TODAY, formatDate } from "@/lib/utils";

export function Topbar({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  const { t, pick } = useI18n();
  const { business } = useDemoBusiness();
  const { toggle } = useAppNav();

  return (
    <>
      {/*
        Demo notice. The product is a working skeleton over fixture data, and saying so plainly
        costs nothing — a visitor who discovers it themselves trusts the rest of the screen less.
      */}
      <div className="flex items-start gap-2 border-b border-caution/20 bg-caution/[0.07] px-4 py-2 text-xs leading-relaxed text-caution sm:items-center sm:px-5">
        <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 sm:mt-0" />
        <span>
          {t(
            `Demo workspace — sample data for a fictional ${pick(business.label).toLowerCase()} in ${business.location.city}. Switch business in the workspace menu. Changes are not saved.`,
            `Demo radni prostor — primjeri podataka za izmišljeni objekt „${pick(business.label)}“ u gradu ${business.location.city}. Promijenite tvrtku u izborniku radnog prostora. Promjene se ne spremaju.`,
          )}
        </span>
      </div>

      <header className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-b border-line bg-background px-4 py-3.5 sm:px-5 sm:py-4">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={toggle}
            className="-ml-1 shrink-0 rounded-lg p-1 text-muted transition-colors hover:text-foreground lg:hidden"
            aria-label={t("Open navigation", "Otvori navigaciju")}
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold tracking-tight text-foreground sm:text-lg">
              {title}
            </h1>
            {description ? (
              <p className="mt-0.5 truncate text-xs text-muted">{description}</p>
            ) : null}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {actions}
          <span className="hidden text-xs text-faint lg:inline">
            {t("Synced", "Sinkronizirano")} {formatDate(DEMO_TODAY)}
          </span>
          <LanguageSwitcher />
          <Avatar name={business.ownerName} size={30} />
        </div>
      </header>
    </>
  );
}
