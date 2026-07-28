"use client";

import { Check, Copy, Plus } from "lucide-react";
import { useState } from "react";
import { Topbar } from "@/components/app-shell/topbar";
import { Badge, Button, Panel, PanelHeader } from "@/components/ui/primitives";
import { useI18n } from "@/lib/i18n";
import { formatDate } from "@/lib/utils";
import { location } from "@/mock";
import { product } from "../../../../product.config";

const apiKeys = [
  { id: "key_1", label: "Production", prefix: "erk_live_7f2a", created: "2026-03-04", lastUsed: "2026-07-28" },
  { id: "key_2", label: "Staging", prefix: "erk_test_1c98", created: "2026-05-19", lastUsed: "2026-07-21" },
];

export default function SettingsPage() {
  const { t } = useI18n();
  const [copied, setCopied] = useState<string | null>(null);

  const copy = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
      setTimeout(() => setCopied(null), 1600);
    } catch {
      // Clipboard access can be denied; failing quietly is better than an alert here.
    }
  };

  return (
    <>
      <Topbar
        title={t("Settings", "Postavke")}
        description={t("Connection, keys and notifications", "Povezivanje, ključevi i obavijesti")}
      />

      <div className="flex-1 space-y-5 p-5">
        <Panel>
          <PanelHeader
            title={t("Connected profile", "Povezani profil")}
            action={<Badge tone="positive">{t("Connected", "Povezano")}</Badge>}
          />
          <dl className="divide-y divide-line">
            <Row label={t("Business", "Tvrtka")} value={location.name} />
            <Row label={t("Address", "Adresa")} value={`${location.address}, ${location.city}`} />
            <Row label={t("Google location ID", "Google ID lokacije")} value={location.gbpLocationId} mono />
            <Row label={t("Connected on", "Povezano dana")} value={formatDate(location.connectedAt)} />
          </dl>
        </Panel>

        <Panel>
          <PanelHeader
            title={t("API keys", "API ključevi")}
            description={t(
              `Keys are prefixed ${product.apiKeyPrefix} and shown once at creation`,
              `Ključevi imaju prefiks ${product.apiKeyPrefix} i prikazuju se jednom pri stvaranju`,
            )}
            action={
              <Button size="sm" variant="secondary">
                <Plus className="h-3.5 w-3.5" />
                {t("New key", "Novi ključ")}
              </Button>
            }
          />
          <ul className="divide-y divide-line">
            {apiKeys.map((key) => (
              <li key={key.id} className="flex flex-wrap items-center gap-4 px-5 py-4">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground">{key.label}</p>
                  <p className="mt-1 font-mono text-xs text-muted">{key.prefix}••••••••••••••••</p>
                </div>
                <div className="text-right text-[11px] text-faint">
                  <p>
                    {t("Created", "Stvoreno")} {formatDate(key.created)}
                  </p>
                  <p>
                    {t("Last used", "Zadnje korišteno")} {formatDate(key.lastUsed)}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copy(`${key.prefix}••••`, key.id)}
                  aria-label={t("Copy key prefix", "Kopiraj prefiks ključa")}
                >
                  {copied === key.id ? (
                    <Check className="h-3.5 w-3.5 text-accent" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </Button>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel>
          <PanelHeader title={t("Notifications", "Obavijesti")} />
          <ul className="divide-y divide-line">
            {[
              {
                label: t("New review below 4 stars", "Nova recenzija ispod 4 zvjezdice"),
                detail: t("Immediately, by email", "Odmah, e-poštom"),
                on: true,
              },
              {
                label: t("Weekly ranking scan complete", "Tjedno skeniranje rangiranja završeno"),
                detail: t("Monday mornings", "Ponedjeljkom ujutro"),
                on: true,
              },
              {
                label: t("AI visibility drops on a tracked prompt", "Pad AI vidljivosti za praćeni upit"),
                detail: t("Immediately, by email", "Odmah, e-poštom"),
                on: true,
              },
              {
                label: t("Profile question left unanswered 48h", "Pitanje na profilu bez odgovora 48 h"),
                detail: t("Daily digest", "Dnevni sažetak"),
                on: false,
              },
            ].map((item) => (
              <li key={item.label} className="flex items-center justify-between gap-4 px-5 py-3.5">
                <div>
                  <p className="text-sm text-foreground">{item.label}</p>
                  <p className="mt-0.5 text-xs text-muted">{item.detail}</p>
                </div>
                <span
                  className={`flex h-5 w-9 shrink-0 items-center rounded-full p-0.5 transition-colors ${
                    item.on ? "bg-accent/80" : "bg-line-strong"
                  }`}
                  role="switch"
                  aria-checked={item.on}
                >
                  <span
                    className={`h-4 w-4 rounded-full bg-white transition-transform ${
                      item.on ? "translate-x-4" : ""
                    }`}
                  />
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5">
      <dt className="text-xs text-muted">{label}</dt>
      <dd className={`text-sm text-foreground ${mono ? "font-mono text-xs" : ""}`}>{value}</dd>
    </div>
  );
}
