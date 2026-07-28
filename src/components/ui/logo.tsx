import Link from "next/link";
import { cn } from "@/lib/utils";
import { product } from "../../../product.config";

/**
 * Text-only wordmark, following the EnterCRM convention: the family prefix in white and the
 * product suffix in the product's accent colour. No graphic mark — it survives every size and
 * never needs a raster asset.
 */
export function Logo({
  className,
  href = "/",
  size = "md",
}: {
  className?: string;
  href?: string | null;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "text-base",
    md: "text-lg",
    lg: "text-2xl",
  };

  const mark = (
    <span
      className={cn("font-bold tracking-[-0.03em] text-foreground", sizes[size], className)}
      style={{ letterSpacing: "-0.03em" }}
    >
      {product.name}
      <span className="text-accent">{product.nameAccent}</span>
    </span>
  );

  if (!href) return mark;

  return (
    <Link href={href} className="inline-flex items-center transition-opacity hover:opacity-80">
      {mark}
    </Link>
  );
}
