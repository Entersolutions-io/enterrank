import type { BrandVoice, GbpPost, GbpQuestion, ProfileCheck } from "@/lib/types";

export const brandVoice: BrandVoice = {
  locationId: "loc_8f21c",
  formality: 38,
  warmth: 72,
  bannedWords: ["cheap", "discount", "guaranteed", "best in the world"],
  preferredPhrases: ["see you at the salon", "thank you for telling us", "colour consultation"],
  targetKeywords: [
    "hair salon Zagreb",
    "balayage Zagreb",
    "Ilica salon",
    "colour consultation",
    "men's haircut Zagreb",
  ],
  signature: "— Lucia & the Studio Lucia team",
  autoPublishAtOrAbove: 4,
};

/**
 * Weighted checklist behind the 0–100 profile score. Failed checks with high weight are what
 * the Presence screen surfaces first — the score is only useful if it says what to fix.
 */
export const profileChecks: ProfileCheck[] = [
  {
    id: "chk_01",
    label: { en: "Business hours set for every day", hr: "Radno vrijeme postavljeno za svaki dan" },
    weight: 10,
    passed: true,
    hint: {
      en: "Complete hours prevent “temporarily closed” assumptions.",
      hr: "Potpuno radno vrijeme sprječava pretpostavke o privremenom zatvaranju.",
    },
  },
  {
    id: "chk_02",
    label: { en: "Holiday hours for the next 90 days", hr: "Blagdansko radno vrijeme za idućih 90 dana" },
    weight: 6,
    passed: false,
    hint: {
      en: "August public holidays are unset — profiles with holiday hours are shown more often on those days.",
      hr: "Kolovoški praznici nisu postavljeni — profili s blagdanskim radnim vremenom prikazuju se češće tih dana.",
    },
  },
  {
    id: "chk_03",
    label: { en: "All services listed with prices", hr: "Sve usluge navedene s cijenama" },
    weight: 14,
    passed: false,
    hint: {
      en: "Keratin treatments and children's haircuts are missing. Both were asked about in reviews.",
      hr: "Nedostaju keratinski tretmani i dječja šišanja. Za oboje se pitalo u recenzijama.",
    },
  },
  {
    id: "chk_04",
    label: { en: "At least 20 photos uploaded", hr: "Najmanje 20 učitanih fotografija" },
    weight: 12,
    passed: true,
    hint: {
      en: "34 photos on file. Profiles above 20 get materially more direction requests.",
      hr: "34 fotografije u arhivi. Profili s više od 20 dobivaju znatno više zahtjeva za rutu.",
    },
  },
  {
    id: "chk_05",
    label: { en: "Photos added in the last 30 days", hr: "Fotografije dodane u zadnjih 30 dana" },
    weight: 8,
    passed: false,
    hint: {
      en: "Last upload was 47 days ago. Recency counts more than volume.",
      hr: "Zadnje učitavanje bilo je prije 47 dana. Svježina se računa više od količine.",
    },
  },
  {
    id: "chk_06",
    label: { en: "Description mentions primary service area", hr: "Opis spominje primarno područje usluge" },
    weight: 9,
    passed: true,
    hint: {
      en: "Ilica and Zagreb centre both appear in the description.",
      hr: "Ilica i centar Zagreba pojavljuju se u opisu.",
    },
  },
  {
    id: "chk_07",
    label: { en: "Every profile question answered", hr: "Odgovoreno na svako pitanje na profilu" },
    weight: 11,
    passed: false,
    hint: {
      en: "4 questions unanswered, one of them viewed 340 times.",
      hr: "4 pitanja bez odgovora, jedno od njih pregledano 340 puta.",
    },
  },
  {
    id: "chk_08",
    label: { en: "Posted in the last 7 days", hr: "Objavljeno u zadnjih 7 dana" },
    weight: 10,
    passed: true,
    hint: {
      en: "Profiles posting weekly hold visibility better between scans.",
      hr: "Profili koji objavljuju tjedno bolje zadržavaju vidljivost između skeniranja.",
    },
  },
  {
    id: "chk_09",
    label: { en: "Booking link connected", hr: "Poveznica za rezervaciju povezana" },
    weight: 12,
    passed: true,
    hint: {
      en: "Bookings route to studiolucia.hr/booking.",
      hr: "Rezervacije se preusmjeravaju na studiolucia.hr/booking.",
    },
  },
  {
    id: "chk_10",
    label: { en: "Reviews answered within 48 hours", hr: "Odgovoreno na recenzije unutar 48 sati" },
    weight: 8,
    passed: true,
    hint: {
      en: "Median response time is 9 hours.",
      hr: "Medijan vremena odgovora je 9 sati.",
    },
  },
];

export const posts: GbpPost[] = [
  {
    id: "post_01",
    locationId: "loc_8f21c",
    title: { en: "August colour consultations", hr: "Kolovoške konzultacije o boji" },
    body: {
      en: "Free 15-minute colour consultation before any balayage or full colour booking through August. Bring a reference photo — we will tell you honestly whether it works on your hair.",
      hr: "Besplatna konzultacija o boji u trajanju od 15 minuta prije svake rezervacije balayagea ili punog bojanja tijekom kolovoza. Ponesite referentnu fotografiju — iskreno ćemo vam reći hoće li to funkcionirati na vašoj kosi.",
    },
    cta: "book",
    status: "scheduled",
    scheduledFor: "2026-08-01T08:00:00Z",
    image: null,
  },
  {
    id: "post_02",
    locationId: "loc_8f21c",
    title: { en: "Now taking children's appointments", hr: "Sada primamo dječje termine" },
    body: {
      en: "Weekday mornings are our quietest hours and the easiest time for a first haircut. Book a 30-minute slot and we will take it at your child's pace.",
      hr: "Jutra radnim danom naši su najmirniji sati i najlakše vrijeme za prvo šišanje. Rezervirajte termin od 30 minuta i prilagodit ćemo se tempu vašeg djeteta.",
    },
    cta: "book",
    status: "draft",
    scheduledFor: "2026-08-05T08:00:00Z",
    image: null,
  },
  {
    id: "post_03",
    locationId: "loc_8f21c",
    title: { en: "Keratin treatments are back", hr: "Keratinski tretmani su ponovno tu" },
    body: {
      en: "Our keratin service is available again from Tuesday. Around two hours, and it holds for eight to twelve weeks depending on your wash routine.",
      hr: "Naša keratinska usluga ponovno je dostupna od utorka. Traje oko dva sata i drži osam do dvanaest tjedana, ovisno o vašoj rutini pranja.",
    },
    cta: "learn_more",
    status: "published",
    scheduledFor: "2026-07-22T08:00:00Z",
    publishedAt: "2026-07-22T08:00:00Z",
    metrics: { views: 1284, clicks: 96 },
    image: null,
  },
  {
    id: "post_04",
    locationId: "loc_8f21c",
    title: { en: "Summer hair repair", hr: "Ljetna obnova kose" },
    body: {
      en: "Sun, salt and chlorine all break down colour. Our repair treatment rebuilds the bond and takes 45 minutes — worth it before your holiday photos, not after.",
      hr: "Sunce, sol i klor razgrađuju boju. Naš tretman obnove obnavlja veze i traje 45 minuta — vrijedi prije, a ne poslije vaših fotografija s odmora.",
    },
    cta: "book",
    status: "published",
    scheduledFor: "2026-07-08T08:00:00Z",
    publishedAt: "2026-07-08T08:00:00Z",
    metrics: { views: 2071, clicks: 173 },
    image: null,
  },
  {
    id: "post_05",
    locationId: "loc_8f21c",
    title: { en: "Meet Ines", hr: "Upoznajte Ines" },
    body: {
      en: "Ines joined us in spring and trained in curly cutting in Milan. If you have curls and have been let down before, she is the one to book.",
      hr: "Ines nam se pridružila u proljeće i educirala se za šišanje kovrčave kose u Milanu. Ako imate kovrče i prije ste bili razočarani, nju trebate rezervirati.",
    },
    cta: "book",
    status: "published",
    scheduledFor: "2026-06-24T08:00:00Z",
    publishedAt: "2026-06-24T08:00:00Z",
    metrics: { views: 3412, clicks: 288 },
    image: null,
  },
];

export const questions: GbpQuestion[] = [
  {
    id: "qst_01",
    locationId: "loc_8f21c",
    author: "Marta B.",
    question: {
      en: "Do you do keratin treatments and how much do they cost?",
      hr: "Radite li keratinske tretmane i koliko koštaju?",
    },
    askedAt: "2026-07-19T10:12:00Z",
    views: 340,
  },
  {
    id: "qst_02",
    locationId: "loc_8f21c",
    author: "Goran P.",
    question: {
      en: "Is there parking nearby?",
      hr: "Ima li parkinga u blizini?",
    },
    askedAt: "2026-07-11T16:40:00Z",
    views: 211,
  },
  {
    id: "qst_03",
    locationId: "loc_8f21c",
    author: "Iva M.",
    question: {
      en: "Can I come without an appointment for a men's cut?",
      hr: "Mogu li doći bez najave na muško šišanje?",
    },
    askedAt: "2026-07-04T09:05:00Z",
    views: 178,
  },
  {
    id: "qst_04",
    locationId: "loc_8f21c",
    author: "Karlo D.",
    question: {
      en: "Do the stylists speak English?",
      hr: "Govore li frizeri engleski?",
    },
    askedAt: "2026-06-28T14:22:00Z",
    views: 96,
  },
  {
    id: "qst_05",
    locationId: "loc_8f21c",
    author: "Dora S.",
    question: {
      en: "Do you accept card payments?",
      hr: "Primate li plaćanje karticom?",
    },
    askedAt: "2026-06-15T11:30:00Z",
    answer: {
      en: "Yes — all cards and mobile payments are accepted, and we can issue an R1 invoice on request.",
      hr: "Da — primamo sve kartice i mobilna plaćanja, a na zahtjev izdajemo R1 račun.",
    },
    answeredAt: "2026-06-15T13:10:00Z",
    views: 402,
  },
];
