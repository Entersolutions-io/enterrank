"use client";

import { createContext, useCallback, useContext, useSyncExternalStore, type ReactNode } from "react";

export type Locale = "en" | "hr";

/**
 * Runtime i18n over React Context rather than routed locales — the same approach used in
 * EnterCRM. Copy lives inline at the call site as `t("English", "Hrvatski")`, which keeps
 * translations next to the markup they belong to and avoids a key catalogue nobody maintains.
 *
 * The locale lives in localStorage, which makes it an external store: `useSyncExternalStore`
 * reads it with a server snapshot of "en" during hydration and swaps to the stored value
 * immediately after, without a mismatch and without a setState-in-effect.
 */

const STORAGE_KEY = "enterrank_locale";

const listeners = new Set<() => void>();

function read(): Locale {
  if (typeof window === "undefined") return "en";
  return window.localStorage.getItem(STORAGE_KEY) === "hr" ? "hr" : "en";
}

// Cached so getSnapshot returns a stable value between writes, as the API requires.
let snapshot: Locale = read();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): Locale {
  return snapshot;
}

function getServerSnapshot(): Locale {
  return "en";
}

function write(next: Locale) {
  snapshot = next;
  window.localStorage.setItem(STORAGE_KEY, next);
  document.documentElement.lang = next;
  listeners.forEach((listener) => listener());
}

interface I18nValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (en: string, hr: string) => string;
  /** For objects already shaped `{ en, hr }` — config entries, fixtures, pillar copy. */
  pick: <T>(pair: { en: T; hr: T }) => T;
}

const I18nContext = createContext<I18nValue>({
  locale: "en",
  setLocale: () => {},
  t: (en) => en,
  pick: (pair) => pair.en,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setLocale = useCallback((next: Locale) => write(next), []);

  const t = useCallback((en: string, hr: string) => (locale === "hr" ? hr : en), [locale]);

  const pick = useCallback(
    <T,>(pair: { en: T; hr: T }) => (locale === "hr" ? pair.hr : pair.en),
    [locale],
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t, pick }}>{children}</I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
