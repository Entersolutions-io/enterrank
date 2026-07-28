"use client";

import { useI18n, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const options: { locale: Locale; label: string; flag: string; country: string }[] = [
  { locale: "en", label: "EN", flag: "gb", country: "English" },
  { locale: "hr", label: "HR", flag: "hr", country: "Hrvatski" },
];

export function LanguageSwitcher({ className }: { className?: string }) {
  const { locale, setLocale } = useI18n();

  return (
    <div
      className={cn(
        "inline-flex items-center gap-0.5 rounded-lg border border-line bg-surface p-0.5",
        className,
      )}
      role="group"
      aria-label="Language"
    >
      {options.map((option) => (
        <button
          key={option.locale}
          type="button"
          onClick={() => setLocale(option.locale)}
          aria-pressed={locale === option.locale}
          title={option.country}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium transition-colors",
            locale === option.locale
              ? "bg-white/[0.07] text-foreground"
              : "text-muted hover:text-secondary",
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://flagcdn.com/w20/${option.flag}.png`}
            srcSet={`https://flagcdn.com/w40/${option.flag}.png 2x`}
            alt=""
            width={16}
            height={12}
            className="rounded-[2px]"
            loading="lazy"
          />
          {option.label}
        </button>
      ))}
    </div>
  );
}
