"use client";

import { createContext, useCallback, useContext, useSyncExternalStore, type ReactNode } from "react";
import type { BusinessId, DemoBusiness } from "@/lib/types";
import { DEFAULT_BUSINESS_ID, getBusiness, isBusinessId } from "@/mock";

/**
 * Which demo workspace the visitor is looking at.
 *
 * Deliberately the same shape as the locale store in `i18n.tsx`: an external store read through
 * `useSyncExternalStore`, with a server snapshot of the default tenant during hydration. That
 * gives it the two properties the demo needs — the choice survives navigation, so picking a
 * business on the landing page carries into `/app`, and it survives a reload, so a link sent to
 * a colleague opens on the same data the sender was looking at.
 *
 * In production this is where the workspace the user is authenticated against would come from.
 * Nothing downstream would change.
 */

const STORAGE_KEY = "enterrank_demo_business";

const listeners = new Set<() => void>();

function read(): BusinessId {
  if (typeof window === "undefined") return DEFAULT_BUSINESS_ID;
  const stored = window.localStorage.getItem(STORAGE_KEY);
  return isBusinessId(stored) ? stored : DEFAULT_BUSINESS_ID;
}

// Cached so getSnapshot returns a stable value between writes, as the API requires.
let snapshot: BusinessId = read();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): BusinessId {
  return snapshot;
}

function getServerSnapshot(): BusinessId {
  return DEFAULT_BUSINESS_ID;
}

function write(next: BusinessId) {
  if (next === snapshot) return;
  snapshot = next;
  window.localStorage.setItem(STORAGE_KEY, next);
  listeners.forEach((listener) => listener());
}

interface DemoBusinessValue {
  businessId: BusinessId;
  setBusinessId: (id: BusinessId) => void;
  /** The active tenant's complete dataset. Every screen reads its data from here. */
  business: DemoBusiness;
}

const DemoBusinessContext = createContext<DemoBusinessValue>({
  businessId: DEFAULT_BUSINESS_ID,
  setBusinessId: () => {},
  business: getBusiness(DEFAULT_BUSINESS_ID),
});

export function DemoBusinessProvider({ children }: { children: ReactNode }) {
  const businessId = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setBusinessId = useCallback((next: BusinessId) => write(next), []);

  return (
    <DemoBusinessContext.Provider
      value={{ businessId, setBusinessId, business: getBusiness(businessId) }}
    >
      {children}
    </DemoBusinessContext.Provider>
  );
}

export function useDemoBusiness() {
  return useContext(DemoBusinessContext);
}
