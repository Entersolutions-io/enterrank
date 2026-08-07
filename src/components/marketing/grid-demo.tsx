"use client";

import { motion, useInView } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { BusinessCards } from "@/components/demo/business-switcher";
import { CountUp, GeoGrid, GeoGridLegend } from "@/components/rankings/geo-grid";
import { Badge, Button, Eyebrow } from "@/components/ui/primitives";
import { useDemoBusiness } from "@/lib/demo-business";
import { useI18n } from "@/lib/i18n";
import type { BusinessId } from "@/lib/types";
import { buildScan, getBusiness } from "@/mock";
import { cn } from "@/lib/utils";

const SCAN_MS = 2400;

/**
 * The landing page's centrepiece: a real grid scan the visitor runs themselves.
 *
 * Two axes of contrast, and both are the argument. Switching keyword shows that a single
 * business owns some searches and vanishes from others — "balayage" is nearly all green,
 * "keratin treatment" is empty. Switching business shows that this is not a hairdressing
 * problem: the grocery is patchy everywhere, the restaurant is solid, the gym is buried by
 * chains. Same product, five different diagnoses.
 */
export function GridDemo() {
  const { t, pick } = useI18n();
  const { business, setBusinessId } = useDemoBusiness();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  const [keywordId, setKeywordId] = useState(business.keywords[0].id);
  const [runToken, setRunToken] = useState(0);
  const [scanning, setScanning] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [hasRun, setHasRun] = useState(false);

  // Guards the window between a business switch and the state write that follows it.
  const activeKeywordId = business.keywords.some((k) => k.id === keywordId)
    ? keywordId
    : business.keywords[0].id;

  const scan = useMemo(() => buildScan(business, activeKeywordId), [business, activeKeywordId]);
  const keyword = business.keywords.find((k) => k.id === activeKeywordId)!;

  const run = (nextKeywordId = activeKeywordId) => {
    setKeywordId(nextKeywordId);
    setSelected(null);
    setScanning(true);
    setHasRun(true);
    setRunToken((token) => token + 1);
  };

  // Picking a business restarts the scan on that tenant's first tracked term. The dataset is
  // read directly rather than from context, which has not re-rendered yet inside this handler.
  const switchBusiness = (id: BusinessId) => {
    setBusinessId(id);
    run(getBusiness(id).keywords[0].id);
  };

  useEffect(() => {
    if (!scanning) return;
    const timer = setTimeout(() => setScanning(false), SCAN_MS);
    return () => clearTimeout(timer);
  }, [scanning, runToken]);

  const point = selected === null ? null : scan.points[selected];

  return (
    <motion.section
      id="demo"
      ref={ref}
      className="relative overflow-hidden px-6 py-28"
      // Auto-run the first scan when the section scrolls into view. Done as a viewport event
      // rather than an effect so the state write happens in a handler, not during render sync.
      onViewportEnter={() => {
        if (!hasRun) run();
      }}
      viewport={{ once: true, margin: "-120px" }}
    >
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[880px] -translate-x-1/2 -translate-y-1/2 bg-cover bg-center opacity-20 blur-lg"
        style={{ backgroundImage: "url(/images/features-gradient.webp)" }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <Eyebrow>{t("Live demo", "Demo uživo")}</Eyebrow>
          <h2
            className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl"
            style={{ letterSpacing: "-0.025em" }}
          >
            {t("Your ranking is not a number.", "Vaše rangiranje nije broj.")}
            <br />
            <span className="text-secondary">{t("It is a map.", "Ono je karta.")}</span>
          </h2>
          <p className="mt-5 text-pretty leading-relaxed text-secondary">
            {t(
              "We sample Google Maps from 49 points across the neighbourhood and record where you appear from each one. Pick a business, pick a search term, and run the scan.",
              "Uzorkujemo Google karte s 49 točaka po kvartu i bilježimo gdje se pojavljujete iz svake od njih. Odaberite tvrtku, odaberite pojam pretraživanja i pokrenite skeniranje.",
            )}
          </p>
        </motion.div>

        {/* Business selector. Chosen here, it stays chosen inside the app demo. */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mt-10"
        >
          <p className="mb-3 text-center text-xs font-medium uppercase tracking-wider text-faint">
            {t("Choose a sample business", "Odaberite primjer tvrtke")}
          </p>
          <BusinessCards onSelect={switchBusiness} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_1fr]"
        >
          {/* Grid panel */}
          <div className="rounded-2xl border border-line bg-surface p-4 sm:p-5">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs text-muted">
                <span className="font-mono text-secondary">{business.location.name}</span>
                <span className="text-faint">·</span>
                <span>
                  {business.location.address}, {business.location.city}
                </span>
              </div>
              <div className="flex gap-2">
                {hasRun ? (
                  <Button variant="ghost" size="sm" onClick={() => run()} disabled={scanning}>
                    <RotateCcw className="h-3.5 w-3.5" />
                    {t("Re-scan", "Ponovi")}
                  </Button>
                ) : null}
                <Button size="sm" onClick={() => run()} disabled={scanning}>
                  <Play className="h-3.5 w-3.5" />
                  {scanning ? t("Scanning…", "Skeniranje…") : t("Run scan", "Pokreni skeniranje")}
                </Button>
              </div>
            </div>

            <GeoGrid
              scan={scan}
              runToken={runToken}
              durationMs={SCAN_MS}
              selectedIndex={selected}
              onPointSelect={setSelected}
            />

            <GeoGridLegend
              className="mt-4"
              labels={{
                top3: t("Top 3", "Top 3"),
                top10: t("4–10", "4–10"),
                top20: t("11–20", "11–20"),
                unranked: t("Not found", "Nije pronađen"),
              }}
            />
          </div>

          {/* Readout panel */}
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl border border-line bg-surface p-5">
              <p className="text-xs font-medium uppercase tracking-wider text-faint">
                {t("Search term", "Pojam pretraživanja")}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {business.keywords.map((k) => (
                  <button
                    key={k.id}
                    type="button"
                    onClick={() => run(k.id)}
                    disabled={scanning}
                    className={cn(
                      "rounded-lg border px-3 py-1.5 text-xs transition-colors disabled:opacity-50",
                      k.id === activeKeywordId
                        ? "border-accent/40 bg-accent/10 text-accent-light"
                        : "border-line text-muted hover:border-line-strong hover:text-secondary",
                    )}
                  >
                    {pick(k.term)}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <Stat
                label={t("Avg. position", "Prosj. pozicija")}
                value={
                  <CountUp
                    value={scan.avgRank}
                    runToken={runToken}
                    durationMs={SCAN_MS}
                    decimals={1}
                  />
                }
              />
              <Stat
                label={t("Coverage", "Pokrivenost")}
                value={
                  <CountUp
                    value={scan.atrs}
                    runToken={runToken}
                    durationMs={SCAN_MS}
                    suffix="%"
                  />
                }
              />
              <Stat
                label={t("Top-3 share", "Udio u Top 3")}
                value={
                  <CountUp
                    value={scan.solv}
                    runToken={runToken}
                    durationMs={SCAN_MS}
                    suffix="%"
                  />
                }
              />
            </div>

            <div className="flex-1 rounded-2xl border border-line bg-surface p-5">
              {point ? (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-faint">
                    {t("Selected point", "Odabrana točka")}
                  </p>
                  <p className="mt-2 font-mono text-sm text-secondary">
                    {Math.abs(point.offsetX)}m {point.offsetX >= 0 ? "E" : "W"} ·{" "}
                    {Math.abs(point.offsetY)}m {point.offsetY >= 0 ? "S" : "N"}
                  </p>
                  <div className="mt-4 space-y-2 text-sm">
                    <Row
                      label={t("Your position", "Vaša pozicija")}
                      value={
                        point.rank === null ? (
                          <Badge tone="neutral">{t("Not found", "Nije pronađen")}</Badge>
                        ) : (
                          <Badge tone={point.rank <= 3 ? "positive" : point.rank <= 10 ? "caution" : "negative"} mono>
                            #{point.rank}
                          </Badge>
                        )
                      }
                    />
                    <Row label={t("Position 1 here", "Prvo mjesto ovdje")} value={point.topCompetitor} />
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-faint">
                    {t("What this means", "Što ovo znači")}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-secondary">
                    {keyword.avgRank === null
                      ? t(
                          "You do not appear anywhere on this grid. Someone standing outside your door searching this term will not find you — and this term has real monthly volume.",
                          "Ne pojavljujete se nigdje na ovoj mreži. Netko tko stoji pred vašim vratima i traži ovaj pojam neće vas pronaći — a taj pojam ima stvaran mjesečni volumen.",
                        )
                      : t(
                          "Green points are where you win. The red and grey edges are streets where a customer searching this term is handed a competitor instead.",
                          "Zelene točke su mjesta gdje pobjeđujete. Crveni i sivi rubovi su ulice gdje kupac koji traži ovaj pojam umjesto vas dobiva konkurenta.",
                        )}
                  </p>
                  <p className="mt-4 text-xs text-faint">
                    {t(
                      "Tap any point on the grid for detail.",
                      "Dodirnite bilo koju točku na mreži za detalje.",
                    )}
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-line bg-surface p-4">
      <p className="text-[11px] uppercase tracking-wider text-faint">{label}</p>
      <p className="mt-1.5 font-mono text-2xl font-semibold text-foreground">{value}</p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-muted">{label}</span>
      <span className="text-foreground">{value}</span>
    </div>
  );
}
