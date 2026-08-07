"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

/**
 * Whether the app navigation drawer is open on small screens.
 *
 * The state has to live above both the sidebar and the topbar, because the button that opens
 * the drawer is in one and the drawer is in the other. On desktop nothing reads it — the
 * sidebar is always visible there.
 */

interface AppNavValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
}

const AppNavContext = createContext<AppNavValue>({
  open: false,
  setOpen: () => {},
  toggle: () => {},
});

export function AppNavProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((value) => !value), []);

  return (
    <AppNavContext.Provider value={{ open, setOpen, toggle }}>{children}</AppNavContext.Provider>
  );
}

export function useAppNav() {
  return useContext(AppNavContext);
}
