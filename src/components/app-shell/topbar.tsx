"use client";

import { AlertCircle, Menu } from "lucide-react";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { Avatar } from "@/components/ui/primitives";
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
  const { t } = useI18n();

  return (
    <>
      {/*
        Demo notice. The product is a working skeleton over fixture data, and saying so plainly
        costs nothing — a visitor who discovers it themselves trusts the rest of the screen less.
      */}
      <div className="flex items-center gap-2 border-b border-caution/20 bg-caution/[0.07] px-5 py-2 text-xs text-caution">
        <AlertCircle className="h-3.5 w-3.5 shrink-0" />
        <span>
          {t(
            "Demo workspace — sample data for a fictional salon. Changes are not saved.",
            "Demo radni prostor — primjeri podataka za izmišljeni salon. Promjene se ne spremaju.",
          )}
        </span>
      </div>

      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-line bg-background px-5 py-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            className="text-muted lg:hidden"
            aria-label={t("Open navigation", "Otvori navigaciju")}
          >
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-lg font-semibold tracking-tight text-foreground">{title}</h1>
            {description ? <p className="mt-0.5 text-xs text-muted">{description}</p> : null}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {actions}
          <span className="hidden text-xs text-faint sm:inline">
            {t("Synced", "Sinkronizirano")} {formatDate(DEMO_TODAY)}
          </span>
          <LanguageSwitcher />
          <Avatar name="Lucia Marić" size={30} />
        </div>
      </header>
    </>
  );
}
