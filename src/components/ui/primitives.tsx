import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { avatarTint, cn, initials } from "@/lib/utils";

/* ── Button ───────────────────────────────────────────────────────────── */

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-colors duration-200 disabled:opacity-45 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50";

const buttonVariants = {
  primary: "bg-accent text-[#04150e] hover:bg-accent-light font-semibold",
  secondary: "border border-white/10 text-secondary hover:bg-white/[0.04] hover:text-foreground",
  ghost: "text-muted hover:text-foreground hover:bg-white/[0.04]",
  danger: "border border-negative/25 text-negative hover:bg-negative/10",
} as const;

const buttonSizes = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4",
  lg: "h-12 px-7 text-[0.95rem]",
} as const;

type ButtonProps = {
  variant?: keyof typeof buttonVariants;
  size?: keyof typeof buttonSizes;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ComponentProps<"button"> & ButtonProps) {
  return (
    <button
      className={cn(buttonBase, buttonVariants[variant], buttonSizes[size], className)}
      {...props}
    />
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ComponentProps<typeof Link> & ButtonProps) {
  return (
    <Link
      className={cn(buttonBase, buttonVariants[variant], buttonSizes[size], className)}
      {...props}
    />
  );
}

/* ── Badge ────────────────────────────────────────────────────────────── */

const badgeTones = {
  neutral: "border-white/10 bg-white/[0.04] text-secondary",
  accent: "border-accent/25 bg-accent/10 text-accent-light",
  positive: "border-positive/25 bg-positive/10 text-positive",
  caution: "border-caution/25 bg-caution/10 text-caution",
  negative: "border-negative/25 bg-negative/10 text-negative",
  info: "border-info/25 bg-info/10 text-info",
} as const;

export function Badge({
  tone = "neutral",
  className,
  children,
  mono = false,
}: {
  tone?: keyof typeof badgeTones;
  className?: string;
  children: ReactNode;
  mono?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium whitespace-nowrap",
        mono && "font-mono tracking-tight",
        badgeTones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/* ── Panel ────────────────────────────────────────────────────────────── */

export function Panel({
  className,
  children,
  ...props
}: ComponentProps<"div"> & { children: ReactNode }) {
  return (
    <div
      className={cn("rounded-xl border border-line bg-surface", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function PanelHeader({
  title,
  action,
  description,
}: {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-line px-5 py-4">
      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        {description ? <p className="mt-0.5 text-xs text-muted">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

/* ── Section label ────────────────────────────────────────────────────── */

/** Small monospaced eyebrow used above every section heading. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-xs uppercase tracking-[0.18em] text-accent">{children}</span>
  );
}

/* ── Avatar ───────────────────────────────────────────────────────────── */

/**
 * Initials avatar. The product never renders photographs of people — reviewer identities in
 * the demo are fictional, and inventing faces for them would be worse than not showing any.
 */
export function Avatar({ name, size = 36 }: { name: string; size?: number }) {
  const tint = avatarTint(name);
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full font-semibold"
      style={{
        width: size,
        height: size,
        background: tint.bg,
        color: tint.fg,
        fontSize: size * 0.36,
      }}
      aria-hidden
    >
      {initials(name)}
    </span>
  );
}

/* ── Star rating ──────────────────────────────────────────────────────── */

export function Stars({ rating, size = 13 }: { rating: number; size?: number }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <svg
          key={i}
          width={size}
          height={size}
          viewBox="0 0 20 20"
          fill={i <= Math.round(rating) ? "#fbbf24" : "none"}
          stroke={i <= Math.round(rating) ? "#fbbf24" : "#3f3f46"}
          strokeWidth="1.5"
          aria-hidden
        >
          <path d="M10 1.8l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4L2.2 7.5l5.4-.8z" />
        </svg>
      ))}
    </span>
  );
}

/* ── Skeleton ─────────────────────────────────────────────────────────── */

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("shimmer rounded bg-white/[0.05]", className)} />;
}
