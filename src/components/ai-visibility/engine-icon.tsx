"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Brand icon from the Simple Icons CDN, with a lettered tile as fallback.
 *
 * Slugs get renamed or removed upstream without warning — `openai` is one that has moved before —
 * and a silently missing icon looks like a rendering bug. The fallback keeps the row aligned.
 */
export function EngineIcon({
  slug,
  label,
  size = 16,
  className,
}: {
  slug: string;
  label: string;
  size?: number;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-[3px] bg-white/[0.08] font-semibold text-secondary",
          className,
        )}
        style={{ width: size, height: size, fontSize: size * 0.62 }}
        aria-hidden
      >
        {label.charAt(0)}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://cdn.simpleicons.org/${slug}/a1a1aa`}
      alt=""
      width={size}
      height={size}
      loading="lazy"
      onError={() => setFailed(true)}
      className={cn("shrink-0", className)}
      style={{ width: size, height: size }}
    />
  );
}
