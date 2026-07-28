"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, Send, Sparkles, RotateCcw } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Badge, Button } from "@/components/ui/primitives";
import { useI18n } from "@/lib/i18n";
import type { Review } from "@/lib/types";
import { brandVoice, replyDrafts, replyStages } from "@/mock";
import { cn } from "@/lib/utils";

type Phase = "idle" | "thinking" | "writing" | "published";

/** Total time the draft takes to reveal, regardless of how long it is. */
const REVEAL_MS = 1600;

/**
 * The reply composer.
 *
 * Three things happen in sequence and each one is doing explanatory work: the staged checklist
 * shows *what* goes into a reply (the review, the brand voice, the keyword targets), the
 * word-by-word reveal makes the wait feel like authorship rather than a spinner, and the score
 * dial gives the operator a reason to accept or reject the draft rather than rubber-stamping it.
 */
export function ReplyComposer({ review }: { review: Review }) {
  const { t, pick } = useI18n();

  const draft = replyDrafts[review.id] ?? review.reply;
  const alreadyPublished = review.status === "answered";

  const [phase, setPhase] = useState<Phase>(alreadyPublished ? "published" : "idle");
  const [stageIndex, setStageIndex] = useState(-1);
  const [typedWords, setTypedWords] = useState(0);
  const [edited, setEdited] = useState<string | null>(null);
  // Bumped on each generate so the reveal restarts even when the phase is already "writing".
  const [revealToken, setRevealToken] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const fullText = edited ?? (draft ? pick(draft.text) : "");
  const words = fullText.split(" ");

  // "Ready" is derived rather than stored: the draft is ready exactly when the reveal has caught
  // up with the text. Keeping it out of state means switching language mid-reveal simply
  // continues in the new language instead of stranding a half-typed sentence.
  const isWriting = phase === "writing" && typedWords < words.length;
  const isReady = phase === "writing" && typedWords >= words.length;

  const visibleText =
    phase === "idle"
      ? ""
      : isWriting
        ? words.slice(0, typedWords).join(" ")
        : fullText;

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const generate = () => {
    if (!draft) return;
    clearTimers();
    setEdited(null);
    setTypedWords(0);
    setStageIndex(0);
    setPhase("thinking");
    setRevealToken((token) => token + 1);

    let elapsed = 0;
    replyStages.forEach((stage, i) => {
      elapsed += stage.durationMs;
      timers.current.push(
        setTimeout(() => {
          if (i === replyStages.length - 1) {
            setStageIndex(replyStages.length);
            setPhase("writing");
          } else {
            setStageIndex(i + 1);
          }
        }, elapsed),
      );
    });
  };

  // Word-by-word reveal, driven by elapsed time rather than one timer per word. A per-word
  // setTimeout compounds React's render cost into the interval, so a long reply crawls while a
  // short one races; pacing off the clock keeps every draft to the same ~1.6s regardless of length.
  useEffect(() => {
    if (phase !== "writing") return;

    const total = words.length;
    const start = performance.now();
    let frame: number;

    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / REVEAL_MS);
      setTypedWords(Math.ceil(progress * total));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(frame);
    // Intentionally not keyed on words.length: the reveal should not restart if the operator
    // switches language halfway through.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, revealToken]);

  if (!draft) {
    return (
      <div className="rounded-xl border border-line bg-surface p-5">
        <p className="text-sm text-muted">
          {t(
            "No draft is available for this review in the demo dataset.",
            "Za ovu recenziju nema dostupnog nacrta u demo skupu podataka.",
          )}
        </p>
      </div>
    );
  }

  const score = draft.seoScore;

  return (
    <div className="rounded-xl border border-line bg-surface">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-accent" />
          <h3 className="text-sm font-semibold text-foreground">
            {t("Reply", "Odgovor")}
          </h3>
          {phase === "published" ? (
            <Badge tone="positive">
              <Check className="h-3 w-3" />
              {t("Published", "Objavljeno")}
            </Badge>
          ) : null}
        </div>

        <div className="flex gap-2">
          {isReady || phase === "published" ? (
            <Button variant="ghost" size="sm" onClick={generate}>
              <RotateCcw className="h-3.5 w-3.5" />
              {t("Regenerate", "Ponovno generiraj")}
            </Button>
          ) : null}
          {phase === "idle" ? (
            <Button size="sm" onClick={generate}>
              <Sparkles className="h-3.5 w-3.5" />
              {t("Generate reply", "Generiraj odgovor")}
            </Button>
          ) : null}
          {isReady ? (
            <Button size="sm" onClick={() => setPhase("published")}>
              <Send className="h-3.5 w-3.5" />
              {t("Publish to Google", "Objavi na Google")}
            </Button>
          ) : null}
        </div>
      </div>

      {/* Stage checklist */}
      <AnimatePresence>
        {phase === "thinking" ? (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-b border-line"
          >
            {replyStages.map((stage, i) => {
              const done = i < stageIndex;
              const active = i === stageIndex;
              return (
                <li
                  key={stage.id}
                  className={cn(
                    "flex items-center gap-2.5 px-5 py-2 text-xs transition-colors",
                    done ? "text-secondary" : active ? "text-foreground" : "text-faint",
                  )}
                >
                  {done ? (
                    <Check className="h-3.5 w-3.5 text-accent" />
                  ) : active ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-accent" />
                  ) : (
                    <span className="h-3.5 w-3.5 rounded-full border border-line-strong" />
                  )}
                  {pick(stage.label)}
                </li>
              );
            })}
          </motion.ul>
        ) : null}
      </AnimatePresence>

      {/* Draft body */}
      <div className="p-5">
        {phase === "idle" ? (
          <div className="rounded-lg border border-dashed border-line-strong px-4 py-10 text-center">
            <p className="text-sm text-muted">
              {t(
                "Generate a reply written in your brand voice, optimised for the terms you want to rank for.",
                "Generirajte odgovor napisan glasom vaše marke, optimiziran za pojmove za koje se želite rangirati.",
              )}
            </p>
            <p className="mt-2 text-xs text-faint">
              {t("Nothing is published until you approve it.", "Ništa se ne objavljuje dok ne odobrite.")}
            </p>
          </div>
        ) : (
          <>
            <textarea
              value={visibleText}
              onChange={(e) => setEdited(e.target.value)}
              readOnly={isWriting}
              rows={7}
              className={cn(
                "w-full resize-y rounded-lg border border-line bg-background p-4 text-sm leading-relaxed text-foreground",
                "focus:border-accent/40 focus:outline-none",
                isWriting && "caret",
              )}
            />

            <div className="mt-4 flex flex-wrap items-start justify-between gap-5">
              <div className="min-w-0">
                <p className="text-[11px] font-medium uppercase tracking-wider text-faint">
                  {t("Keywords worked in", "Uključene ključne riječi")}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {draft.keywords.length ? (
                    draft.keywords.map((keyword, i) => (
                      <motion.span
                        key={keyword}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={
                          isReady || phase === "published"
                            ? { opacity: 1, scale: 1 }
                            : { opacity: 0.25, scale: 1 }
                        }
                        transition={{ delay: i * 0.09 }}
                      >
                        <Badge tone="accent" mono>
                          {keyword}
                        </Badge>
                      </motion.span>
                    ))
                  ) : (
                    <span className="text-xs text-faint">
                      {t("None — this reply is damage control, not SEO.", "Nema — ovaj odgovor je kontrola štete, ne SEO.")}
                    </span>
                  )}
                </div>

                <p className="mt-4 text-[11px] text-faint">
                  {t("Voice", "Glas")}: {brandVoice.signature}
                </p>
              </div>

              <ScoreDial
                score={score}
                animate={isReady || phase === "published"}
                label={t("Reply score", "Ocjena odgovora")}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Score dial ───────────────────────────────────────────────────────── */

function ScoreDial({
  score,
  animate,
  label,
}: {
  score: number;
  animate: boolean;
  label: string;
}) {
  const [eased, setEased] = useState(0);
  const radius = 34;
  const circumference = 2 * Math.PI * radius;

  // Reads zero whenever the dial is idle, so resetting needs no state write.
  const display = animate ? eased : 0;

  useEffect(() => {
    if (!animate) return;

    const start = performance.now();
    let frame: number;
    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / 900);
      // Ease-out cubic so the number decelerates into its final value.
      setEased(score * (1 - Math.pow(1 - progress, 3)));
      if (progress < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(frame);
  }, [animate, score]);

  const tone = score >= 80 ? "#10b981" : score >= 60 ? "#f59e0b" : "#f43f5e";

  return (
    <div className="flex shrink-0 items-center gap-3">
      <div className="relative h-20 w-20">
        <svg viewBox="0 0 80 80" className="h-full w-full -rotate-90">
          <circle cx="40" cy="40" r={radius} fill="none" stroke="#1f1f23" strokeWidth="5" />
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke={tone}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - display / 100)}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-mono text-lg font-semibold text-foreground">
          {Math.round(display)}
        </span>
      </div>
      <span className="max-w-[5rem] text-[11px] leading-snug text-muted">{label}</span>
    </div>
  );
}
