"use client";

import Link from "next/link";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { Logo } from "@/components/ui/logo";
import { useI18n } from "@/lib/i18n";
import { product } from "../../../product.config";

export function Footer() {
  const { t } = useI18n();

  const columns = [
    {
      title: t("Product", "Proizvod"),
      links: [
        { href: "/#pillars", label: t("Overview", "Pregled") },
        { href: "/app/reviews", label: t("Reviews", "Recenzije") },
        { href: "/app/rankings", label: t("Rankings", "Rangiranje") },
        { href: "/app/ai-visibility", label: t("AI Visibility", "AI vidljivost") },
        { href: "/#pricing", label: t("Pricing", "Cijene") },
      ],
    },
    {
      title: t("Developers", "Programeri"),
      links: [
        { href: "/docs", label: t("Documentation", "Dokumentacija") },
        { href: "/docs/api", label: t("API reference", "API referenca") },
        { href: "/docs/guide", label: t("Integration guide", "Vodič za integraciju") },
        { href: "/status", label: t("Status", "Status") },
        { href: "/changelog", label: t("Changelog", "Popis promjena") },
      ],
    },
    {
      title: t("Legal", "Pravno"),
      links: [
        { href: "/privacy", label: t("Privacy policy", "Pravila privatnosti") },
        { href: "/terms", label: t("Terms of service", "Uvjeti korištenja") },
        { href: "/cookies", label: t("Cookie policy", "Pravila o kolačićima") },
        { href: "/gdpr", label: t("GDPR", "GDPR") },
        { href: "/dpa", label: t("Data processing", "Obrada podataka") },
      ],
    },
  ];

  return (
    <footer className="border-t border-line bg-background">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">
              {t(product.description.en, product.description.hr)}
            </p>
            <div className="mt-5">
              <LanguageSwitcher />
            </div>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-faint">
                {column.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-secondary transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-faint">
            © {new Date().getFullYear()} {product.fullName}.{" "}
            {t("A product of", "Proizvod tvrtke")}{" "}
            <a
              href={product.parent.url}
              className="text-muted transition-colors hover:text-foreground"
              target="_blank"
              rel="noreferrer"
            >
              {product.parent.name}
            </a>
            .
          </p>
          <a
            href={`mailto:${product.contactEmail}`}
            className="text-xs text-muted transition-colors hover:text-foreground"
          >
            {product.contactEmail}
          </a>
        </div>
      </div>
    </footer>
  );
}
