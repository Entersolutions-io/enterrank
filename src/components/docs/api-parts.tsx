"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const methodStyles: Record<Method, string> = {
  GET: "bg-positive/10 text-positive border-positive/25",
  POST: "bg-info/10 text-info border-info/25",
  PUT: "bg-caution/10 text-caution border-caution/25",
  PATCH: "bg-caution/10 text-caution border-caution/25",
  DELETE: "bg-negative/10 text-negative border-negative/25",
};

export function MethodBadge({ method }: { method: Method }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded border px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide",
        methodStyles[method],
      )}
    >
      {method}
    </span>
  );
}

export function CodeBlock({ children }: { children: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(children);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard permission can be denied; the snippet is still selectable.
    }
  };

  return (
    <div className="group relative">
      <pre className="overflow-x-auto rounded-lg border border-line bg-background p-4 font-mono text-xs leading-relaxed whitespace-pre text-secondary">
        {children}
      </pre>
      <button
        type="button"
        onClick={copy}
        className="absolute right-2 top-2 rounded border border-line bg-surface p-1.5 text-muted opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100 focus-visible:opacity-100"
        aria-label="Copy"
      >
        {copied ? <Check className="h-3 w-3 text-accent" /> : <Copy className="h-3 w-3" />}
      </button>
    </div>
  );
}

export function SectionHeader({ id, title }: { id: string; title: string }) {
  return (
    <div id={id} className="mb-5 mt-14 flex items-center gap-3 scroll-mt-24">
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}

export function Endpoint({
  method,
  path,
  description,
  request,
  response,
  params,
}: {
  method: Method;
  path: string;
  description: string;
  request: string;
  response: string;
  params?: { name: string; type: string; description: string }[];
}) {
  const { t } = useI18n();

  return (
    <div className="mb-4 rounded-xl border border-line bg-surface p-5">
      <div className="mb-2 flex flex-wrap items-center gap-3">
        <MethodBadge method={method} />
        <code className="font-mono text-sm text-foreground">{path}</code>
      </div>
      <p className="mb-4 text-sm text-muted">{description}</p>

      {params?.length ? (
        <div className="mb-4">
          <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-faint">
            {t("Query parameters", "Parametri upita")}
          </p>
          <div className="overflow-x-auto rounded-lg border border-line">
            <table className="w-full min-w-[420px] text-xs">
              <tbody className="divide-y divide-line">
                {params.map((param) => (
                  <tr key={param.name}>
                    <td className="w-1/4 px-3 py-2 font-mono text-accent-light">{param.name}</td>
                    <td className="w-1/5 px-3 py-2 font-mono text-faint">{param.type}</td>
                    <td className="px-3 py-2 text-muted">{param.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}

      <div className="space-y-3">
        <div>
          <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-faint">
            {t("Example request", "Primjer zahtjeva")}
          </p>
          <CodeBlock>{request}</CodeBlock>
        </div>
        <div>
          <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-faint">
            {t("Example response", "Primjer odgovora")}
          </p>
          <CodeBlock>{response}</CodeBlock>
        </div>
      </div>
    </div>
  );
}

export function DocsNote({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "caution" }) {
  return (
    <div
      className={cn(
        "rounded-xl border p-4 text-sm leading-relaxed",
        tone === "caution"
          ? "border-caution/25 bg-caution/[0.06] text-caution"
          : "border-line bg-surface text-secondary",
      )}
    >
      {children}
    </div>
  );
}
