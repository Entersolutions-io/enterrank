"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, Search, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Badge, Button } from "@/components/ui/primitives";
import { useI18n } from "@/lib/i18n";
import type { AiVisibilityProbe } from "@/lib/types";
import { engines } from "@/mock";
import { cn } from "@/lib/utils";
import { location } from "@/mock";

/**
 * Runs one AEO probe across every assistant and reveals the verdicts as they land.
 *
 * The staggered resolution is not decoration: watching three engines answer and one of them
 * skip you is the moment the pillar explains itself. Results come from fixtures; the timing
 * approximates what a real fan-out to four providers costs.
 */
export function ProbeRunner({
  probe,
  onProbeChange,
  probes,
  compact = false,
}: {
  probe: AiVisibilityProbe;
  probes: AiVisibilityProbe[];
  onProbeChange: (id: string) => void;
  compact?: boolean;
}) {
  const { t, pick } = useI18n();

  // Starts mid-run: the parent remounts this component (via key) when the probe changes, so the
  // initial state is the running state and the effect below only has to schedule timers. That
  // keeps every synchronous state write inside an event handler where it belongs.
  const [resolved, setResolved] = useState(0);
  const [running, setRunning] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [runToken, setRunToken] = useState(0);

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const scheduled = engines.map((_, index) => {
      // Engines answer at different speeds; the spread is what makes it read as real work.
      const at = 700 + index * 620 + (index % 2) * 180;
      return setTimeout(() => {
        setResolved(index + 1);
        if (index === engines.length - 1) setRunning(false);
      }, at);
    });
    timers.current = scheduled;

    return () => scheduled.forEach(clearTimeout);
  }, [runToken]);

  const run = useCallback(() => {
    timers.current.forEach(clearTimeout);
    setResolved(0);
    setExpanded(null);
    setRunning(true);
    setRunToken((token) => token + 1);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      {/* Prompt bar */}
      <div className="rounded-xl border border-line bg-surface p-4">
        <div className="flex items-center gap-3 rounded-lg border border-line bg-background px-3 py-2.5">
          <Search className="h-4 w-4 shrink-0 text-faint" />
          <span className="min-w-0 flex-1 truncate text-sm text-foreground">
            {pick(probe.prompt)}
          </span>
          <Button size="sm" onClick={run} disabled={running}>
            {running ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                {t("Asking…", "Pitam…")}
              </>
            ) : (
              t("Ask again", "Pitaj ponovno")
            )}
          </Button>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          {probes.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onProbeChange(p.id)}
              disabled={running}
              className={cn(
                "rounded-lg border px-2.5 py-1 text-xs transition-colors disabled:opacity-50",
                p.id === probe.id
                  ? "border-accent/40 bg-accent/10 text-accent-light"
                  : "border-line text-muted hover:border-line-strong hover:text-secondary",
              )}
            >
              {pick(p.prompt)}
            </button>
          ))}
        </div>
      </div>

      {/* Engine verdicts */}
      <div className={cn("grid gap-3", compact ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-4")}>
        {engines.map((engine, index) => {
          const result = probe.results.find((r) => r.engine === engine.id);
          const isResolved = index < resolved;
          const isOpen = expanded === engine.id;

          return (
            <div
              key={engine.id}
              className={cn(
                "flex flex-col rounded-xl border bg-surface p-4 transition-colors duration-300",
                !isResolved
                  ? "border-line"
                  : result?.mentioned
                    ? "border-accent/30"
                    : "border-negative/25",
              )}
            >
              <div className="flex items-center gap-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`https://cdn.simpleicons.org/${engine.slug}/a1a1aa`}
                  alt=""
                  width={16}
                  height={16}
                  loading="lazy"
                  className="h-4 w-4 shrink-0"
                />
                <span className="text-sm font-medium text-foreground">{engine.label}</span>
              </div>

              <div className="mt-4 min-h-[52px]">
                <AnimatePresence mode="wait">
                  {!isResolved ? (
                    <motion.div
                      key="pending"
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="flex items-center gap-2 text-xs text-faint"
                    >
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      {t("Checking…", "Provjera…")}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="done"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {result?.mentioned ? (
                        <Badge tone="positive">
                          <Check className="h-3 w-3" />
                          {t("Named", "Spomenuti")} #{result.position}
                        </Badge>
                      ) : (
                        <Badge tone="negative">
                          <X className="h-3 w-3" />
                          {t("Not named", "Nije spomenut")}
                        </Badge>
                      )}

                      <p className="mt-3 text-[11px] leading-relaxed text-muted">
                        {result?.mentioned
                          ? t("Ahead of you:", "Ispred vas:")
                          : t("Named instead:", "Spomenuti umjesto vas:")}{" "}
                        <span className="text-secondary">
                          {result?.competitorsNamed.slice(0, 2).join(", ") || "—"}
                        </span>
                      </p>

                      <button
                        type="button"
                        onClick={() => setExpanded(isOpen ? null : engine.id)}
                        className="mt-3 text-[11px] text-faint underline-offset-2 transition-colors hover:text-secondary hover:underline"
                      >
                        {isOpen ? t("Hide answer", "Sakrij odgovor") : t("Show answer", "Prikaži odgovor")}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <AnimatePresence>
                {isOpen && result ? (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28 }}
                    className="overflow-hidden"
                  >
                    <blockquote className="mt-3 border-l-2 border-line pl-3 text-[11px] italic leading-relaxed text-muted">
                      {pick(result.excerpt)}
                    </blockquote>
                    <p className="mt-2.5 text-[10px] uppercase tracking-wider text-faint">
                      {t("Cited", "Citirano")}
                    </p>
                    <ul className="mt-1 space-y-0.5">
                      {result.citedSources.map((source) => (
                        <li key={source} className="font-mono text-[10px] text-secondary">
                          {source}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-faint">
        {t(
          `Asked as if from ${location.city}. Assistants personalise by location, so results differ per city.`,
          `Pitano kao iz grada ${location.city}. Asistenti personaliziraju prema lokaciji pa se rezultati razlikuju po gradu.`,
        )}
      </p>
    </div>
  );
}
