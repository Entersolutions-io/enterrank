"use client";

import { StaticPageLayout } from "@/components/layout/static-page-layout";
import { Badge } from "@/components/ui/primitives";
import { useI18n } from "@/lib/i18n";
import { formatDate, seeded } from "@/lib/utils";

/**
 * Uptime bars are generated deterministically per service so the page is stable across reloads
 * and identical between server and client render.
 */
const services = [
  { id: "api", name: { en: "REST API", hr: "REST API" }, uptime: 99.99, incidents: [] as number[] },
  { id: "dashboard", name: { en: "Dashboard", hr: "Nadzorna ploča" }, uptime: 99.98, incidents: [] },
  { id: "gbp", name: { en: "Google Business Profile sync", hr: "Sinkronizacija Google profila" }, uptime: 99.82, incidents: [51, 52] },
  { id: "reviews", name: { en: "Review ingestion", hr: "Preuzimanje recenzija" }, uptime: 99.95, incidents: [] },
  { id: "replies", name: { en: "Reply generation", hr: "Generiranje odgovora" }, uptime: 99.91, incidents: [73] },
  { id: "scans", name: { en: "Grid scan workers", hr: "Radnici za skeniranje mreže" }, uptime: 99.76, incidents: [34, 35, 36] },
  { id: "aeo", name: { en: "AI visibility probes", hr: "AI provjere vidljivosti" }, uptime: 99.64, incidents: [12, 13, 88] },
  { id: "webhooks", name: { en: "Webhook delivery", hr: "Isporuka webhookova" }, uptime: 99.93, incidents: [61] },
  { id: "notifications", name: { en: "Email notifications", hr: "Obavijesti e-poštom" }, uptime: 99.97, incidents: [] },
];

const DAYS = 90;

const incidents = [
  {
    date: "2026-07-11",
    title: {
      en: "Grid scan queue backlog",
      hr: "Zaostatak u redu za skeniranje mreže",
    },
    body: {
      en: "Scheduled scans queued for up to 40 minutes after a provider rate limit tightened without notice. Concurrency was reduced and the backlog cleared within two hours. No scans were lost.",
      hr: "Zakazana skeniranja čekala su u redu do 40 minuta nakon što je pružatelj bez najave pooštrio ograničenje. Smanjena je istovremenost i zaostatak je uklonjen unutar dva sata. Nijedno skeniranje nije izgubljeno.",
    },
    resolved: true,
  },
  {
    date: "2026-06-24",
    title: {
      en: "AI visibility probes returning stale results",
      hr: "AI provjere vidljivosti vraćaju zastarjele rezultate",
    },
    body: {
      en: "A caching layer served results up to 18 hours old for one assistant. Cache keys now include the probe timestamp. Affected probes were re-run at no charge.",
      hr: "Sloj predmemorije posluživao je rezultate stare do 18 sati za jednog asistenta. Ključevi predmemorije sada uključuju vremensku oznaku provjere. Zahvaćene provjere ponovno su pokrenute bez naplate.",
    },
    resolved: true,
  },
  {
    date: "2026-05-30",
    title: {
      en: "Delayed review sync for a subset of profiles",
      hr: "Odgođena sinkronizacija recenzija za dio profila",
    },
    body: {
      en: "New reviews appeared up to three hours late for profiles connected before March. A token refresh bug was fixed and affected profiles were backfilled.",
      hr: "Nove recenzije pojavljivale su se do tri sata kasnije za profile povezane prije ožujka. Ispravljena je greška u osvježavanju tokena, a zahvaćeni profili su nadopunjeni.",
    },
    resolved: true,
  },
];

export default function StatusPage() {
  const { t, pick } = useI18n();

  const allOperational = true;

  return (
    <StaticPageLayout>
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1
            className="text-4xl font-semibold tracking-tight text-foreground"
            style={{ letterSpacing: "-0.03em" }}
          >
            {t("System status", "Status sustava")}
          </h1>
          <Badge tone={allOperational ? "positive" : "caution"}>
            <span className="h-1.5 w-1.5 rounded-full bg-current" />
            {t("All systems operational", "Svi sustavi rade")}
          </Badge>
        </div>
        <p className="mt-3 text-sm text-secondary">
          {t("Rolling 90-day availability.", "Dostupnost u posljednjih 90 dana.")}
        </p>

        <div className="mt-10 divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
          {services.map((service) => (
            <div key={service.id} className="px-5 py-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-sm text-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-positive" />
                  {pick(service.name)}
                </span>
                <span className="font-mono text-xs text-secondary">{service.uptime}%</span>
              </div>

              <div className="mt-2.5 flex gap-[2px]" aria-hidden>
                {Array.from({ length: DAYS }, (_, day) => {
                  const degraded = service.incidents.includes(day);
                  const partial = !degraded && seeded(`${service.id}:${day}`) > 0.985;
                  return (
                    <span
                      key={day}
                      className="h-6 flex-1 rounded-[1px]"
                      style={{
                        background: degraded ? "#f43f5e" : partial ? "#f59e0b" : "#10b98155",
                      }}
                    />
                  );
                })}
              </div>
              <div className="mt-1.5 flex justify-between text-[10px] text-faint">
                <span>{t("90 days ago", "Prije 90 dana")}</span>
                <span>{t("Today", "Danas")}</span>
              </div>
            </div>
          ))}
        </div>

        <h2 className="mt-14 text-lg font-semibold text-foreground">
          {t("Past incidents", "Prošli incidenti")}
        </h2>
        <div className="mt-5 space-y-4">
          {incidents.map((incident) => (
            <div key={incident.date} className="rounded-xl border border-line bg-surface p-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs text-faint">{formatDate(incident.date)}</span>
                <h3 className="text-sm font-semibold text-foreground">{pick(incident.title)}</h3>
                <Badge tone="positive">{t("Resolved", "Riješeno")}</Badge>
              </div>
              <p className="mt-2.5 text-sm leading-relaxed text-secondary">{pick(incident.body)}</p>
            </div>
          ))}
        </div>
      </div>
    </StaticPageLayout>
  );
}
