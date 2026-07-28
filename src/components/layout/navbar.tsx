"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { Logo } from "@/components/ui/logo";
import { ButtonLink } from "@/components/ui/primitives";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/#pillars", label: t("Product", "Proizvod") },
    { href: "/#demo", label: t("Live demo", "Demo uživo") },
    { href: "/#contact", label: t("Contact", "Kontakt") },
    { href: "/docs", label: t("Docs", "Dokumentacija") },
  ];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "glass border-b border-white/[0.06]" : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6">
        <Logo />

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-secondary transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <LanguageSwitcher />
          <ButtonLink href="/app" size="sm">
            {t("Open demo", "Otvori demo")}
          </ButtonLink>
        </div>

        <button
          type="button"
          className="text-secondary md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={t("Toggle menu", "Otvori izbornik")}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/[0.06] bg-background/95 backdrop-blur md:hidden"
          >
            <nav className="flex flex-col gap-1 px-6 py-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-2 py-2.5 text-sm text-secondary transition-colors hover:bg-white/[0.04] hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 flex items-center justify-between gap-3">
                <LanguageSwitcher />
                <ButtonLink href="/app" size="sm" onClick={() => setOpen(false)}>
                  {t("Open demo", "Otvori demo")}
                </ButtonLink>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
