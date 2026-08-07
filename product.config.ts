/**
 * Single source of truth for everything that makes this product *this* product.
 *
 * Sibling products (EnterSocial, EnterChat, EnterDocs) are forked from this codebase
 * and differ almost entirely by this file plus the accent tokens in `globals.css`.
 * Keep product-specific strings out of components and put them here.
 */

export const product = {
  /** Wordmark is rendered as two spans: `name` in white, `nameAccent` in the accent colour. */
  name: "Enter",
  nameAccent: "Rank",
  fullName: "EnterRank",

  domain: "enterrank.io",
  siteUrl: "https://enterrank.io",

  /** Documented public API base. The demo build serves the same shapes from `/api/v1`. */
  apiBaseUrl: "https://api.enterrank.io/v1",

  /** Prefix for API keys, mirroring EnterCRM's `eck_` convention. */
  apiKeyPrefix: "erk_",

  /**
   * Used in the page title and social cards only — there is no slogan anywhere on the page
   * itself. Keep it a plain description of what the product does rather than a tagline.
   */
  tagline: {
    en: "Local visibility for small businesses",
    hr: "Lokalna vidljivost za male tvrtke",
  },

  description: {
    en: "Know whether customers can find you, whether they choose you, and whether you answered them — across Google Maps and AI assistants.",
    hr: "Saznajte mogu li vas kupci pronaći, biraju li vas i jeste li im odgovorili — na Google kartama i u AI asistentima.",
  },

  contactEmail: "hello@enterrank.io",

  parent: {
    name: "EnterSolutions",
    url: "https://entersolutions.io",
  },

  demoAccount: {
    email: "demo@enterrank.io",
    password: "password",
    /**
     * The demo carries five fictional businesses the visitor switches between rather than one,
     * so the product is shown failing — and being fixed — in five different ways. The datasets
     * live in `src/mock/businesses/`; the registry there is the source of truth for the list.
     */
    workspaceCount: 5,
  },
} as const;

/**
 * The four pillars the whole product is organised around — navigation, landing
 * page sections and the app sidebar all derive from this list.
 */
export const pillars = [
  {
    id: "reviews",
    href: "/app/reviews",
    icon: "MessageSquareQuote",
    label: { en: "Reviews", hr: "Recenzije" },
    question: { en: "Did you answer them?", hr: "Jeste li im odgovorili?" },
    blurb: {
      en: "Every review analysed for sentiment and intent, then answered in your voice with the keywords that move you up.",
      hr: "Svaka recenzija analizirana po sentimentu i namjeri, zatim odgovorena vašim glasom s ključnim riječima koje vas podižu.",
    },
    image: "/images/how-listen.webp",
  },
  {
    id: "rankings",
    href: "/app/rankings",
    icon: "Grid3x3",
    label: { en: "Rankings", hr: "Rangiranje" },
    question: { en: "Can they find you?", hr: "Mogu li vas pronaći?" },
    blurb: {
      en: "Scan a grid across your service area and see exactly which streets you own and which ones you disappear from.",
      hr: "Skenirajte mrežu preko svog područja i vidite točno koje ulice držite, a s kojih nestajete.",
    },
    image: "/images/how-rank.webp",
  },
  {
    id: "ai-visibility",
    href: "/app/ai-visibility",
    icon: "Sparkles",
    label: { en: "AI Visibility", hr: "AI vidljivost" },
    question: { en: "Do assistants recommend you?", hr: "Preporučuju li vas asistenti?" },
    blurb: {
      en: "Customers now ask ChatGPT, Gemini and Perplexity for recommendations. Find out whether the answer is you or your competitor.",
      hr: "Kupci sada pitaju ChatGPT, Gemini i Perplexity za preporuke. Saznajte je li odgovor vi ili vaš konkurent.",
    },
    image: "/images/how-appear.webp",
  },
  {
    id: "presence",
    href: "/app/presence",
    icon: "Store",
    label: { en: "Presence", hr: "Prisutnost" },
    question: { en: "Is your profile working?", hr: "Radi li vaš profil?" },
    blurb: {
      en: "Posts, photos, hours and questions — the profile signals Google reads every day, kept complete without you thinking about it.",
      hr: "Objave, fotografije, radno vrijeme i pitanja — signali profila koje Google čita svaki dan, održavani potpunima bez vašeg razmišljanja.",
    },
    image: "/images/how-connect.webp",
  },
] as const;

export type PillarId = (typeof pillars)[number]["id"];
