"use client";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

/** Chrome shared by every content page: docs, status, changelog and the legal set. */
export function StaticPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1 px-6 pb-24 pt-32">{children}</main>
      <Footer />
    </>
  );
}
