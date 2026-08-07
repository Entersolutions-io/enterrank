"use client";

import { X } from "lucide-react";
import { useState } from "react";
import { Topbar } from "@/components/app-shell/topbar";
import { Badge, Button, Panel, PanelHeader } from "@/components/ui/primitives";
import { useDemoBusiness } from "@/lib/demo-business";
import { useI18n } from "@/lib/i18n";
import type { DemoBusiness } from "@/lib/types";

export default function BrandVoicePage() {
  const { business } = useDemoBusiness();
  // Remounted per tenant so the sliders reset to that workspace's saved tone rather than
  // carrying the previous business's unsaved position across.
  return <BrandVoiceEditor key={business.id} business={business} />;
}

function BrandVoiceEditor({ business }: { business: DemoBusiness }) {
  const { t, pick } = useI18n();
  const { brandVoice, voicePreview } = business;

  const [formality, setFormality] = useState(brandVoice.formality);
  const [warmth, setWarmth] = useState(brandVoice.warmth);

  /** Live preview so the sliders have an obvious consequence rather than being decorative. */
  const preview = pick(
    formality < 35
      ? warmth > 60
        ? voicePreview.casualWarm
        : voicePreview.casualConcise
      : warmth > 60
        ? voicePreview.formalWarm
        : voicePreview.formalConcise,
  );

  return (
    <>
      <Topbar
        title={t("Brand voice", "Glas marke")}
        description={t(
          "How replies should sound before anyone reads them",
          "Kako odgovori trebaju zvučati prije nego ih itko pročita",
        )}
        actions={<Button size="sm">{t("Save", "Spremi")}</Button>}
      />

      <div className="flex-1 p-5">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="space-y-5">
            <Panel>
              <PanelHeader title={t("Tone", "Ton")} />
              <div className="space-y-6 p-5">
                <Slider
                  label={t("Formality", "Formalnost")}
                  left={t("Casual", "Opušteno")}
                  right={t("Formal", "Formalno")}
                  value={formality}
                  onChange={setFormality}
                />
                <Slider
                  label={t("Warmth", "Toplina")}
                  left={t("Concise", "Sažeto")}
                  right={t("Warm", "Toplo")}
                  value={warmth}
                  onChange={setWarmth}
                />
              </div>
            </Panel>

            <Panel>
              <PanelHeader
                title={t("Never say", "Nikad ne reci")}
                description={t(
                  "Blocked outright, even if the model suggests it",
                  "Potpuno blokirano, čak i ako model to predloži",
                )}
              />
              <div className="flex flex-wrap gap-2 p-5">
                {brandVoice.bannedWords.map((word) => (
                  <span
                    key={word}
                    className="inline-flex items-center gap-1.5 rounded-full border border-negative/25 bg-negative/10 px-2.5 py-1 text-xs text-negative"
                  >
                    {word}
                    <X className="h-3 w-3 opacity-60" />
                  </span>
                ))}
              </div>
            </Panel>

            <Panel>
              <PanelHeader
                title={t("Target keywords", "Ciljne ključne riječi")}
                description={t(
                  "Worked into replies where they fit naturally — never forced",
                  "Uključene u odgovore gdje prirodno pristaju — nikad nasilno",
                )}
              />
              <div className="flex flex-wrap gap-2 p-5">
                {brandVoice.targetKeywords.map((keyword) => (
                  <Badge key={keyword} tone="accent" mono>
                    {keyword}
                  </Badge>
                ))}
              </div>
            </Panel>
          </div>

          <div className="space-y-5">
            <Panel>
              <PanelHeader
                title={t("Preview", "Pregled")}
                description={t(
                  "A 5-star review, answered at these settings",
                  "Recenzija s 5 zvjezdica, odgovorena s ovim postavkama",
                )}
              />
              <div className="p-5">
                <p className="rounded-lg border border-line bg-background p-4 text-sm leading-relaxed text-secondary">
                  {preview}
                </p>
                <p className="mt-3 text-xs text-faint">{brandVoice.signature}</p>
              </div>
            </Panel>

            <Panel>
              <PanelHeader
                title={t("Automation", "Automatizacija")}
                description={t(
                  "What gets published without you",
                  "Što se objavljuje bez vas",
                )}
              />
              <div className="space-y-4 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-foreground">
                      {t("Auto-publish threshold", "Prag automatske objave")}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-muted">
                      {t(
                        "Reviews at or above this rating are answered and published automatically. Anything below waits for you.",
                        "Na recenzije s ovom ocjenom ili višom odgovara se i objavljuje automatski. Sve ispod čeka vas.",
                      )}
                    </p>
                  </div>
                  <Badge tone="accent" mono>
                    {brandVoice.autoPublishAtOrAbove}★+
                  </Badge>
                </div>

                <div className="rounded-lg border border-caution/25 bg-caution/[0.06] p-3.5">
                  <p className="text-xs leading-relaxed text-caution">
                    {t(
                      "Reviews where sentiment confidence falls below 75% are never auto-published, whatever the rating. A misread complaint answered cheerfully is worse than a late reply.",
                      "Recenzije s pouzdanošću sentimenta ispod 75% nikada se ne objavljuju automatski, bez obzira na ocjenu. Krivo shvaćen prigovor na koji se veselo odgovori gori je od kasnog odgovora.",
                    )}
                  </p>
                </div>
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </>
  );
}

function Slider({
  label,
  left,
  right,
  value,
  onChange,
}: {
  label: string;
  left: string;
  right: string;
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm text-foreground">{label}</span>
        <span className="font-mono text-xs text-muted">{value}</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-[#10b981]"
      />
      <div className="mt-1.5 flex justify-between text-[11px] text-faint">
        <span>{left}</span>
        <span>{right}</span>
      </div>
    </div>
  );
}
