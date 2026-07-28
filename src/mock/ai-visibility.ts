import type { AiEngine, AiVisibilityProbe } from "@/lib/types";

/**
 * The differentiating pillar: whether AI assistants name this business when someone asks them
 * for a recommendation. Engine reach weights the blended visibility score — a mention in an
 * assistant more people use is worth more.
 */
export const engines: {
  id: AiEngine;
  label: string;
  /** Simple Icons slug; falls back to a lettered tile when the CDN has no matching icon. */
  slug: string;
  weight: number;
}[] = [
  { id: "chatgpt", label: "ChatGPT", slug: "openai", weight: 0.4 },
  { id: "gemini", label: "Gemini", slug: "googlegemini", weight: 0.25 },
  { id: "perplexity", label: "Perplexity", slug: "perplexity", weight: 0.15 },
  { id: "ai_overviews", label: "AI Overviews", slug: "google", weight: 0.2 },
];

export const probes: AiVisibilityProbe[] = [
  {
    id: "probe_01",
    locationId: "loc_8f21c",
    prompt: {
      en: "best hair salon in central Zagreb",
      hr: "najbolji frizerski salon u centru Zagreba",
    },
    visibilityScore: 62,
    delta: 14,
    results: [
      {
        engine: "chatgpt",
        mentioned: true,
        position: 2,
        competitorsNamed: ["Salon Adriana", "Hair Lab Zagreb"],
        citedSources: ["google.com/maps", "studiolucia.hr", "tripadvisor.com"],
        excerpt: {
          en: "…for central Zagreb, Salon Adriana and Studio Lucia both come up consistently. Studio Lucia on Ilica is frequently mentioned for colour work, particularly balayage…",
          hr: "…za centar Zagreba dosljedno se spominju Salon Adriana i Studio Lucia. Studio Lucia u Ilici često se navodi za rad s bojom, osobito balayage…",
        },
        checkedAt: "2026-07-28T05:00:00Z",
      },
      {
        engine: "gemini",
        mentioned: true,
        position: 4,
        competitorsNamed: ["Salon Adriana", "Frizerski Studio Nova", "Hair Lab Zagreb"],
        citedSources: ["google.com/maps", "njuskalo.hr"],
        excerpt: {
          en: "…other options in the area include Studio Lucia, which has a 4.6 rating across more than 200 reviews…",
          hr: "…ostale opcije u tom području uključuju Studio Lucia, s ocjenom 4,6 na više od 200 recenzija…",
        },
        checkedAt: "2026-07-28T05:00:00Z",
      },
      {
        engine: "perplexity",
        mentioned: false,
        position: null,
        competitorsNamed: ["Salon Adriana", "Hair Lab Zagreb", "Frizerski Studio Nova"],
        citedSources: ["tripadvisor.com", "reddit.com/r/zagreb"],
        excerpt: {
          en: "…the most frequently recommended are Salon Adriana and Hair Lab Zagreb, both cited across multiple local forums…",
          hr: "…najčešće se preporučuju Salon Adriana i Hair Lab Zagreb, oba navedena na više lokalnih foruma…",
        },
        checkedAt: "2026-07-28T05:00:00Z",
      },
      {
        engine: "ai_overviews",
        mentioned: true,
        position: 3,
        competitorsNamed: ["Salon Adriana", "Hair Lab Zagreb"],
        citedSources: ["google.com/maps", "studiolucia.hr"],
        excerpt: {
          en: "…highly rated salons in the Ilica area include Studio Lucia (4.6★, 218 reviews)…",
          hr: "…visoko ocijenjeni saloni u području Ilice uključuju Studio Lucia (4,6★, 218 recenzija)…",
        },
        checkedAt: "2026-07-28T05:00:00Z",
      },
    ],
  },
  {
    id: "probe_02",
    locationId: "loc_8f21c",
    prompt: {
      en: "where can I get balayage done in Zagreb",
      hr: "gdje mogu napraviti balayage u Zagrebu",
    },
    visibilityScore: 81,
    delta: 9,
    results: [
      {
        engine: "chatgpt",
        mentioned: true,
        position: 1,
        competitorsNamed: ["Salon Adriana"],
        citedSources: ["studiolucia.hr", "google.com/maps", "instagram.com"],
        excerpt: {
          en: "…Studio Lucia on Ilica is the name that comes up most often for balayage specifically, with reviewers repeatedly noting colour matching to reference photos…",
          hr: "…Studio Lucia u Ilici najčešće se spominje baš za balayage, uz recenzente koji opetovano ističu podudaranje boje s referentnim fotografijama…",
        },
        checkedAt: "2026-07-28T05:00:00Z",
      },
      {
        engine: "gemini",
        mentioned: true,
        position: 2,
        competitorsNamed: ["Salon Adriana", "Hair Lab Zagreb"],
        citedSources: ["google.com/maps", "studiolucia.hr"],
        excerpt: {
          en: "…Studio Lucia is well regarded for balayage and other freehand colour techniques…",
          hr: "…Studio Lucia je cijenjen za balayage i druge tehnike slobodnog nanošenja boje…",
        },
        checkedAt: "2026-07-28T05:00:00Z",
      },
      {
        engine: "perplexity",
        mentioned: true,
        position: 2,
        competitorsNamed: ["Salon Adriana"],
        citedSources: ["studiolucia.hr", "reddit.com/r/zagreb"],
        excerpt: {
          en: "…Studio Lucia (Ilica 142) is cited in several threads as the go-to for balayage in the city centre…",
          hr: "…Studio Lucia (Ilica 142) navodi se u nekoliko rasprava kao prvi izbor za balayage u centru grada…",
        },
        checkedAt: "2026-07-28T05:00:00Z",
      },
      {
        engine: "ai_overviews",
        mentioned: true,
        position: 2,
        competitorsNamed: ["Salon Adriana"],
        citedSources: ["google.com/maps"],
        excerpt: {
          en: "…salons offering balayage in Zagreb include Studio Lucia and Salon Adriana…",
          hr: "…saloni koji nude balayage u Zagrebu uključuju Studio Lucia i Salon Adriana…",
        },
        checkedAt: "2026-07-28T05:00:00Z",
      },
    ],
  },
  {
    id: "probe_03",
    locationId: "loc_8f21c",
    prompt: {
      en: "hair salon open early morning Zagreb",
      hr: "frizerski salon otvoren rano ujutro Zagreb",
    },
    visibilityScore: 0,
    delta: 0,
    results: [
      {
        engine: "chatgpt",
        mentioned: false,
        position: null,
        competitorsNamed: ["Frizerski Studio Nova", "Beauty Bar Ilica"],
        citedSources: ["google.com/maps"],
        excerpt: {
          en: "…Frizerski Studio Nova opens at 07:30 on weekdays, which is unusually early for the area…",
          hr: "…Frizerski Studio Nova otvara u 7:30 radnim danima, što je neuobičajeno rano za to područje…",
        },
        checkedAt: "2026-07-28T05:00:00Z",
      },
      {
        engine: "gemini",
        mentioned: false,
        position: null,
        competitorsNamed: ["Frizerski Studio Nova"],
        citedSources: ["google.com/maps"],
        excerpt: {
          en: "…most salons in central Zagreb open at 09:00; Frizerski Studio Nova is an exception…",
          hr: "…većina salona u centru Zagreba otvara u 9:00; Frizerski Studio Nova je iznimka…",
        },
        checkedAt: "2026-07-28T05:00:00Z",
      },
      {
        engine: "perplexity",
        mentioned: false,
        position: null,
        competitorsNamed: ["Frizerski Studio Nova", "Beauty Bar Ilica"],
        citedSources: ["google.com/maps", "njuskalo.hr"],
        excerpt: {
          en: "…early-opening options are limited; two salons list starts before 08:00…",
          hr: "…opcije s ranim otvaranjem su ograničene; dva salona navode početak prije 8:00…",
        },
        checkedAt: "2026-07-28T05:00:00Z",
      },
      {
        engine: "ai_overviews",
        mentioned: false,
        position: null,
        competitorsNamed: ["Frizerski Studio Nova"],
        citedSources: ["google.com/maps"],
        excerpt: {
          en: "…opening hours vary; check individual profiles for early availability…",
          hr: "…radno vrijeme se razlikuje; provjerite pojedinačne profile za ranu dostupnost…",
        },
        checkedAt: "2026-07-28T05:00:00Z",
      },
    ],
  },
  {
    id: "probe_04",
    locationId: "loc_8f21c",
    prompt: {
      en: "salon for curly hair Zagreb",
      hr: "salon za kovrčavu kosu Zagreb",
    },
    visibilityScore: 45,
    delta: 45,
    results: [
      {
        engine: "chatgpt",
        mentioned: true,
        position: 3,
        competitorsNamed: ["Hair Lab Zagreb", "Salon Adriana"],
        citedSources: ["google.com/maps", "studiolucia.hr"],
        excerpt: {
          en: "…Studio Lucia has reviews specifically praising curly hair cutting, which is comparatively rare in the area…",
          hr: "…Studio Lucia ima recenzije koje posebno hvale šišanje kovrčave kose, što je u tom području razmjerno rijetko…",
        },
        checkedAt: "2026-07-28T05:00:00Z",
      },
      {
        engine: "gemini",
        mentioned: false,
        position: null,
        competitorsNamed: ["Hair Lab Zagreb"],
        citedSources: ["google.com/maps"],
        excerpt: {
          en: "…Hair Lab Zagreb advertises curly-specific services on its website…",
          hr: "…Hair Lab Zagreb na svojoj web stranici oglašava usluge posebno za kovrčavu kosu…",
        },
        checkedAt: "2026-07-28T05:00:00Z",
      },
      {
        engine: "perplexity",
        mentioned: true,
        position: 4,
        competitorsNamed: ["Hair Lab Zagreb", "Salon Adriana", "Studio Mirta"],
        citedSources: ["reddit.com/r/zagreb", "google.com/maps"],
        excerpt: {
          en: "…one reviewer names a stylist at Studio Lucia as particularly good with curls…",
          hr: "…jedna recenzentica navodi frizerku u Studiju Lucia kao osobito dobru s kovrčama…",
        },
        checkedAt: "2026-07-28T05:00:00Z",
      },
      {
        engine: "ai_overviews",
        mentioned: false,
        position: null,
        competitorsNamed: ["Hair Lab Zagreb"],
        citedSources: ["google.com/maps"],
        excerpt: {
          en: "…few salons in Zagreb list curly hair as a dedicated service…",
          hr: "…malo salona u Zagrebu navodi kovrčavu kosu kao zasebnu uslugu…",
        },
        checkedAt: "2026-07-28T05:00:00Z",
      },
    ],
  },
];

/**
 * What actually moves the needle for each engine, derived from the citation sources above.
 * This is the "so what do I do about it" panel — without it the pillar is just a scoreboard.
 */
export const aeoActions: {
  id: string;
  title: { en: string; hr: string };
  detail: { en: string; hr: string };
  impact: "high" | "medium" | "low";
  effort: "low" | "medium" | "high";
}[] = [
  {
    id: "aeo_01",
    title: {
      en: "Add opening hours for early slots to your profile",
      hr: "Dodajte rano radno vrijeme na svoj profil",
    },
    detail: {
      en: "Three assistants answered “open early” questions without naming you because your profile shows a 09:00 start. Two reviews already ask for earlier hours.",
      hr: "Tri asistenta odgovorila su na pitanja o ranom otvaranju bez spominjanja vas jer vaš profil pokazuje početak u 9:00. Dvije recenzije već traže ranije termine.",
    },
    impact: "high",
    effort: "low",
  },
  {
    id: "aeo_02",
    title: {
      en: "Publish a curly hair service page",
      hr: "Objavite stranicu usluge za kovrčavu kosu",
    },
    detail: {
      en: "Assistants that named you for curls cited reviews, not your site. A dedicated page gives them something authoritative to cite.",
      hr: "Asistenti koji su vas naveli za kovrče citirali su recenzije, a ne vašu stranicu. Zasebna stranica daje im mjerodavan izvor za citiranje.",
    },
    impact: "high",
    effort: "medium",
  },
  {
    id: "aeo_03",
    title: {
      en: "Answer the four unanswered profile questions",
      hr: "Odgovorite na četiri neodgovorena pitanja na profilu",
    },
    detail: {
      en: "Profile Q&A is indexed and quoted directly by AI Overviews. Unanswered questions are visible gaps.",
      hr: "Pitanja i odgovori na profilu indeksiraju se i izravno citiraju u AI pregledima. Neodgovorena pitanja vidljive su praznine.",
    },
    impact: "medium",
    effort: "low",
  },
  {
    id: "aeo_04",
    title: {
      en: "Add structured data for services and pricing",
      hr: "Dodajte strukturirane podatke o uslugama i cijenama",
    },
    detail: {
      en: "Assistants extract better from marked-up pages. Your site currently has none, which is why they fall back to third-party sources.",
      hr: "Asistenti bolje izvlače podatke sa stranica s oznakama. Vaša stranica ih trenutno nema, zbog čega se oslanjaju na izvore trećih strana.",
    },
    impact: "medium",
    effort: "medium",
  },
];
