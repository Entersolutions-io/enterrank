import type { DemoBusiness } from "@/lib/types";
import { series } from "./weeks";

/**
 * Demo tenant 1 — a single-location hair salon in Zagreb.
 *
 * The original demo dataset, and the one every other tenant is modelled against: small enough
 * that every number on screen stays plausible, in a market where the Croatian half of the UI
 * reads naturally. Its weakness is the opposite of a chain's — good reviews, decent rankings,
 * but a profile that never mentions half of what the salon actually sells.
 *
 * Names are invented. Any resemblance to a real salon is unintended, and none of this is
 * presented as real Google data.
 */
export const salon: DemoBusiness = {
  id: "salon",
  label: { en: "Hair salon", hr: "Frizerski salon" },
  story: {
    en: "Owns its colour searches, disappears from everything else it actually sells.",
    hr: "Drži pretrage za bojanje, nestaje sa svega ostalog što stvarno nudi.",
  },
  icon: "Scissors",
  initials: "SL",
  ownerName: "Lucia Marić",

  location: {
    id: "loc_8f21c",
    gbpLocationId: "locations/4192837465102938471",
    name: "Studio Lucia",
    category: { en: "Hair Salon", hr: "Frizerski salon" },
    address: "Ilica 142",
    city: "Zagreb",
    country: "HR",
    lat: 45.8131,
    lng: 15.9583,
    phone: "+385 1 4820 117",
    website: "https://studiolucia.hr",
    rating: 4.6,
    reviewCount: 218,
    // Derived from `profileChecks` below — the weighted checks are the definition of this
    // number, and the dashboard headline has to agree with what the Presence screen computes.
    profileScore: 61,
    connectedAt: "2026-02-11T09:24:00Z",
  },

  competitors: [
    {
      id: "cmp_01",
      name: "Salon Adriana",
      rating: 4.8,
      reviewCount: 412,
      avgRank: 1.9,
      aiVisibility: 71,
      distanceMeters: 380,
    },
    {
      id: "cmp_02",
      name: "Frizerski Studio Nova",
      rating: 4.5,
      reviewCount: 287,
      avgRank: 3.4,
      aiVisibility: 44,
      distanceMeters: 610,
    },
    {
      id: "cmp_03",
      name: "Hair Lab Zagreb",
      rating: 4.7,
      reviewCount: 196,
      avgRank: 4.1,
      aiVisibility: 58,
      distanceMeters: 940,
    },
    {
      id: "cmp_04",
      name: "Beauty Bar Ilica",
      rating: 4.3,
      reviewCount: 133,
      avgRank: 6.8,
      aiVisibility: 22,
      distanceMeters: 1250,
    },
    {
      id: "cmp_05",
      name: "Studio Mirta",
      rating: 4.4,
      reviewCount: 89,
      avgRank: 8.2,
      aiVisibility: 11,
      distanceMeters: 1580,
    },
  ],

  competitorNote: {
    en: "Salon Adriana beats you on every column, and the gap is widest on review count — 412 against your 218. Review volume is the single strongest lever here, and it is the one you control directly. Hair Lab Zagreb is the more interesting threat: fewer reviews than you, but higher AI visibility, because their site publishes service pages that assistants can cite.",
    hr: "Salon Adriana vas nadmašuje u svakom stupcu, a razlika je najveća u broju recenzija — 412 naspram vaših 218. Količina recenzija ovdje je najjača poluga i jedina koju izravno kontrolirate. Hair Lab Zagreb je zanimljivija prijetnja: manje recenzija od vas, ali veća AI vidljivost, jer njihova stranica objavljuje stranice usluga koje asistenti mogu citirati.",
  },

  /**
   * The mix is deliberate: mostly positive with a few sharp negatives, a spam entry and one
   * ambiguous case with low sentiment confidence — so every state the inbox can render has
   * something to render.
   */
  reviews: [
    {
      id: "rev_2f9a1",
      locationId: "loc_8f21c",
      author: "Marina Kovač",
      rating: 2,
      text: {
        en: "Booked a colour appointment for 4pm and waited almost 50 minutes past my slot. The result was good in the end but nobody explained the delay or apologised. For these prices I expect the schedule to be respected.",
        hr: "Naručila sam se za bojanje u 16 h i čekala gotovo 50 minuta nakon termina. Rezultat je na kraju bio dobar, ali nitko nije objasnio kašnjenje niti se ispričao. Za ove cijene očekujem da se termin poštuje.",
      },
      createdAt: "2026-07-27T16:52:00Z",
      status: "needs_reply",
      sentiment: "negative",
      sentimentConfidence: 0.94,
      intent: "wait_time",
      topics: ["waiting time", "colour service", "pricing"],
    },
    {
      id: "rev_2f9a2",
      locationId: "loc_8f21c",
      author: "Ivan Perić",
      rating: 5,
      text: {
        en: "Lucia did my wife's balayage and it came out exactly like the reference photo. Clean salon, no rush, they explained the aftercare properly. Easily the best hair salon in Zagreb centre.",
        hr: "Lucia je radila supruzi balayage i ispalo je točno kao na referentnoj fotografiji. Čist salon, bez žurbe, lijepo su objasnili njegu nakon toga. Bez sumnje najbolji frizerski salon u centru Zagreba.",
      },
      createdAt: "2026-07-27T11:20:00Z",
      status: "needs_reply",
      sentiment: "positive",
      sentimentConfidence: 0.98,
      intent: "praise",
      topics: ["balayage", "staff: Lucia", "aftercare"],
    },
    {
      id: "rev_2f9a3",
      locationId: "loc_8f21c",
      author: "Petra N.",
      rating: 4,
      text: {
        en: "Really happy with the cut. Only thing is I could not find anywhere online whether you do keratin treatments — had to call. Maybe add it to your profile?",
        hr: "Jako sam zadovoljna šišanjem. Jedino nigdje online nisam mogla naći radite li keratinske tretmane — morala sam nazvati. Možda to dodate na profil?",
      },
      createdAt: "2026-07-26T09:05:00Z",
      status: "needs_reply",
      sentiment: "positive",
      sentimentConfidence: 0.71,
      intent: "question",
      topics: ["haircut", "keratin treatment", "service list"],
    },
    {
      id: "rev_2f9a4",
      locationId: "loc_8f21c",
      author: "Tomislav Barić",
      rating: 1,
      text: {
        en: "Charged 30% more than the price I was quoted on the phone. When I asked, I was told the quote was 'approximate'. Not coming back.",
        hr: "Naplaćeno mi je 30% više od cijene koju su mi rekli telefonom. Kad sam pitao, rečeno mi je da je procjena bila 'okvirna'. Ne vraćam se.",
      },
      createdAt: "2026-07-25T18:40:00Z",
      status: "drafted",
      sentiment: "negative",
      sentimentConfidence: 0.96,
      intent: "pricing_concern",
      topics: ["pricing", "quote accuracy"],
      reply: {
        text: {
          en: "Tomislav, thank you for telling us — a quote that moves after the fact is not how we want to work. Our phone estimates should hold unless the service changes on the day, and we should have explained any difference before starting. Please contact us at +385 1 4820 117 and ask for Lucia; we will review your invoice personally. We are updating how our team communicates pricing at our Ilica salon so this does not repeat.",
          hr: "Tomislave, hvala što ste nam rekli — procjena koja se naknadno mijenja nije način na koji želimo raditi. Naše telefonske procjene trebale bi vrijediti osim ako se usluga tog dana ne promijeni, a svaku razliku trebali smo objasniti prije početka. Molimo nazovite nas na +385 1 4820 117 i tražite Luciu; osobno ćemo pregledati vaš račun. Mijenjamo način na koji naš tim komunicira cijene u našem salonu u Ilici kako se ovo ne bi ponovilo.",
        },
        keywords: ["Ilica salon", "pricing"],
        seoScore: 74,
        generatedAt: "2026-07-26T08:12:00Z",
        automated: false,
      },
    },
    {
      id: "rev_2f9a5",
      locationId: "loc_8f21c",
      author: "Ana Jurić",
      rating: 5,
      text: {
        en: "Third time here and never disappointed. Ines is brilliant with curly hair, which is rare to find.",
        hr: "Treći put ovdje i nikad razočarana. Ines je sjajna s kovrčavom kosom, što je rijetkost.",
      },
      createdAt: "2026-07-24T14:15:00Z",
      status: "answered",
      sentiment: "positive",
      sentimentConfidence: 0.97,
      intent: "staff_mention",
      topics: ["curly hair", "staff: Ines", "repeat customer"],
      reply: {
        text: {
          en: "Ana, thank you — three visits and counting means a lot to us. Ines has trained specifically in curly hair cutting, so we will happily pass this on to her. See you next time at our Ilica hair salon in Zagreb.",
          hr: "Ana, hvala — tri posjeta i brojimo dalje, to nam puno znači. Ines se posebno educirala za šišanje kovrčave kose pa ćemo joj rado prenijeti vaše riječi. Vidimo se sljedeći put u našem frizerskom salonu u Ilici u Zagrebu.",
        },
        keywords: ["hair salon in Zagreb", "curly hair cutting", "Ilica"],
        seoScore: 91,
        generatedAt: "2026-07-24T15:02:00Z",
        publishedAt: "2026-07-24T15:04:00Z",
        automated: true,
      },
    },
    {
      id: "rev_2f9a6",
      locationId: "loc_8f21c",
      author: "Damir Šimić",
      rating: 3,
      text: {
        en: "Cut was fine, atmosphere is nice. Parking around Ilica is a nightmare though, took me 20 minutes to find a spot.",
        hr: "Šišanje je bilo u redu, atmosfera je ugodna. Parkiranje oko Ilice je ipak katastrofa, trebalo mi je 20 minuta da nađem mjesto.",
      },
      createdAt: "2026-07-23T10:30:00Z",
      status: "answered",
      sentiment: "neutral",
      sentimentConfidence: 0.83,
      intent: "service_complaint",
      topics: ["parking", "atmosphere"],
      reply: {
        text: {
          en: "Damir, thank you for the honest note. Parking on Ilica is genuinely tight — the Kaptol garage is a five-minute walk and we can validate two hours for guests booked in advance. Mention it when you book next time and we will sort it out for you.",
          hr: "Damire, hvala na iskrenoj napomeni. Parkiranje u Ilici je stvarno tijesno — garaža Kaptol je pet minuta hoda, a gostima koji se naruče unaprijed možemo ovjeriti dva sata. Spomenite to prilikom sljedeće rezervacije i riješit ćemo to za vas.",
        },
        keywords: ["Ilica", "parking"],
        seoScore: 68,
        generatedAt: "2026-07-23T12:00:00Z",
        publishedAt: "2026-07-23T12:06:00Z",
        automated: false,
      },
    },
    {
      id: "rev_2f9a7",
      locationId: "loc_8f21c",
      author: "Nikolina R.",
      rating: 5,
      text: {
        en: "Came in for a wedding updo with no appointment and they still fit me in. Held perfectly for 14 hours.",
        hr: "Došla sam po svečanu frizuru za vjenčanje bez najave i ipak su me primili. Držala je savršeno 14 sati.",
      },
      createdAt: "2026-07-21T19:45:00Z",
      status: "answered",
      sentiment: "positive",
      sentimentConfidence: 0.99,
      intent: "praise",
      topics: ["wedding updo", "walk-in"],
      reply: {
        text: {
          en: "Nikolina, congratulations — and thank you for trusting us on the day itself. Wedding and event styling is something we keep slots open for at our Zagreb salon, so anyone reading this: call ahead if you can, but we will always try.",
          hr: "Nikolina, čestitamo — i hvala što ste nam vjerovali baš na taj dan. Za vjenčanja i svečana uređivanja držimo otvorene termine u našem zagrebačkom salonu, pa svima koji ovo čitaju: nazovite unaprijed ako možete, ali uvijek ćemo pokušati.",
        },
        keywords: ["wedding hair Zagreb", "event styling"],
        seoScore: 88,
        generatedAt: "2026-07-21T20:30:00Z",
        publishedAt: "2026-07-21T20:31:00Z",
        automated: true,
      },
    },
    {
      id: "rev_2f9a8",
      locationId: "loc_8f21c",
      author: "M. K.",
      rating: 1,
      text: {
        en: "CHEAP FLIGHTS AND HOTELS visit our website for best deals!!!",
        hr: "JEFTINI LETOVI I HOTELI posjetite našu web stranicu za najbolje ponude!!!",
      },
      createdAt: "2026-07-20T03:12:00Z",
      status: "needs_reply",
      sentiment: "negative",
      sentimentConfidence: 0.62,
      intent: "spam",
      topics: [],
    },
    {
      id: "rev_2f9a9",
      locationId: "loc_8f21c",
      author: "Josipa Vuković",
      rating: 4,
      text: {
        en: "Lovely colour work. Slightly pricier than my old salon but the result lasts longer so it evens out.",
        hr: "Predivan rad s bojom. Malo skuplje nego u mom starom salonu, ali rezultat traje dulje pa se izjednači.",
      },
      createdAt: "2026-07-19T13:00:00Z",
      status: "answered",
      sentiment: "positive",
      sentimentConfidence: 0.88,
      intent: "pricing_concern",
      topics: ["colour service", "pricing", "longevity"],
      reply: {
        text: {
          en: "Josipa, that is exactly the trade-off we aim for — we use a higher-grade colour line so the tone holds through more washes. Thank you for noticing, and see you at our hair salon on Ilica.",
          hr: "Josipa, upravo je to kompromis kojem težimo — koristimo bolju liniju boje pa ton izdrži više pranja. Hvala što ste primijetili i vidimo se u našem frizerskom salonu u Ilici.",
        },
        keywords: ["hair colour Zagreb", "Ilica"],
        seoScore: 82,
        generatedAt: "2026-07-19T14:20:00Z",
        publishedAt: "2026-07-19T14:22:00Z",
        automated: true,
      },
    },
    {
      id: "rev_2f9b1",
      locationId: "loc_8f21c",
      author: "Robert Matić",
      rating: 5,
      text: {
        en: "Straightforward men's cut, in and out in 25 minutes, no upselling. Exactly what I wanted.",
        hr: "Jednostavno muško šišanje, gotovo za 25 minuta, bez nametanja dodatnih usluga. Točno ono što sam želio.",
      },
      createdAt: "2026-07-18T08:20:00Z",
      status: "answered",
      sentiment: "positive",
      sentimentConfidence: 0.95,
      intent: "praise",
      topics: ["men's cut", "speed"],
      reply: {
        text: {
          en: "Robert, thank you — quick men's haircuts without a sales pitch are a service in themselves. Walk-ins for men's cuts are usually fine before 11am at our Zagreb salon.",
          hr: "Roberte, hvala — brzo muško šišanje bez nagovaranja i samo je po sebi usluga. Muška šišanja bez najave obično su moguća prije 11 h u našem zagrebačkom salonu.",
        },
        keywords: ["men's haircut Zagreb"],
        seoScore: 79,
        generatedAt: "2026-07-18T09:00:00Z",
        publishedAt: "2026-07-18T09:01:00Z",
        automated: true,
      },
    },
    {
      id: "rev_2f9b2",
      locationId: "loc_8f21c",
      author: "Sara Blažević",
      rating: 2,
      text: {
        en: "Asked for a trim and lost about 8cm. The stylist was friendly but clearly was not listening.",
        hr: "Tražila sam skraćivanje i izgubila oko 8 cm. Frizerka je bila ljubazna, ali očito nije slušala.",
      },
      createdAt: "2026-07-17T15:35:00Z",
      status: "answered",
      sentiment: "negative",
      sentimentConfidence: 0.93,
      intent: "service_complaint",
      topics: ["haircut length", "consultation"],
      reply: {
        text: {
          en: "Sara, we are sorry — losing more length than you asked for is a consultation failure on our side, not a preference difference. We have since added a photo-confirmation step before every cut. Please call us and ask for Lucia; we would like to make this right.",
          hr: "Sara, žao nam je — gubitak veće duljine nego što ste tražili greška je u našoj konzultaciji, a ne razlika u ukusu. U međuvremenu smo uveli korak potvrde fotografijom prije svakog šišanja. Molimo nazovite nas i tražite Luciu; željeli bismo to ispraviti.",
        },
        keywords: [],
        seoScore: 61,
        generatedAt: "2026-07-17T17:10:00Z",
        publishedAt: "2026-07-17T17:15:00Z",
        automated: false,
      },
    },
    {
      id: "rev_2f9b3",
      locationId: "loc_8f21c",
      author: "Luka Horvat",
      rating: 5,
      text: {
        en: "Best barber-style fade I have had in Zagreb, and they actually book you on time.",
        hr: "Najbolji fade koji sam imao u Zagrebu, i stvarno vas prime na vrijeme.",
      },
      createdAt: "2026-07-15T12:10:00Z",
      status: "answered",
      sentiment: "positive",
      sentimentConfidence: 0.97,
      intent: "praise",
      topics: ["fade", "punctuality"],
      reply: {
        text: {
          en: "Luka, thank you. Running on time is the part nobody photographs but everybody notices — glad it showed. See you at the Ilica salon.",
          hr: "Luka, hvala. Poštivanje termina je dio koji nitko ne fotografira, ali svi primijete — drago nam je da se vidjelo. Vidimo se u salonu u Ilici.",
        },
        keywords: ["Ilica salon"],
        seoScore: 66,
        generatedAt: "2026-07-15T13:00:00Z",
        publishedAt: "2026-07-15T13:02:00Z",
        automated: true,
      },
    },
    {
      id: "rev_2f9b4",
      locationId: "loc_8f21c",
      author: "Elena Kraljević",
      rating: 4,
      text: {
        en: "Great treatment for damaged hair. Would be five stars if you opened earlier than 9am — hard to fit in before work.",
        hr: "Odličan tretman za oštećenu kosu. Bilo bi pet zvjezdica da otvarate prije 9 h — teško je stići prije posla.",
      },
      createdAt: "2026-07-14T17:25:00Z",
      status: "answered",
      sentiment: "positive",
      sentimentConfidence: 0.86,
      intent: "service_complaint",
      topics: ["damaged hair treatment", "opening hours"],
      reply: {
        text: {
          en: "Elena, noted and genuinely useful — we are trialling 8am starts on Tuesdays and Thursdays from September. Thank you for the treatment feedback too; damaged hair repair is one of the things we are proudest of.",
          hr: "Elena, zabilježeno i stvarno korisno — od rujna probno otvaramo u 8 h utorkom i četvrtkom. Hvala i na povratnoj informaciji o tretmanu; obnova oštećene kose jedna je od stvari na koje smo najponosniji.",
        },
        keywords: ["damaged hair treatment"],
        seoScore: 71,
        generatedAt: "2026-07-14T18:40:00Z",
        publishedAt: "2026-07-14T18:44:00Z",
        automated: false,
      },
    },
    {
      id: "rev_2f9b5",
      locationId: "loc_8f21c",
      author: "Vedran Klarić",
      rating: 5,
      text: {
        en: "Took my daughter for her first proper haircut, they were incredibly patient with her.",
        hr: "Doveo sam kćer na prvo pravo šišanje, bili su nevjerojatno strpljivi s njom.",
      },
      createdAt: "2026-07-12T11:00:00Z",
      status: "answered",
      sentiment: "positive",
      sentimentConfidence: 0.98,
      intent: "praise",
      topics: ["children's haircut", "patience"],
      reply: {
        text: {
          en: "Vedran, a first haircut is a big deal and we treat it that way. Children's haircuts are available any weekday at our Zagreb hair salon — thank you for trusting us with hers.",
          hr: "Vedrane, prvo šišanje je velika stvar i tako mu i pristupamo. Dječja šišanja moguća su svakog radnog dana u našem zagrebačkom frizerskom salonu — hvala što ste nam povjerili njezino.",
        },
        keywords: ["children's haircut Zagreb"],
        seoScore: 84,
        generatedAt: "2026-07-12T12:15:00Z",
        publishedAt: "2026-07-12T12:16:00Z",
        automated: true,
      },
    },
  ],

  replyDrafts: {
    rev_2f9a1: {
      text: {
        en: "Marina, you are right and we are sorry. A 50-minute overrun on a booked colour appointment is not acceptable, and saying nothing about it made it worse. The delay came from a colour correction that ran long ahead of you — we should have called you before you left home. We have changed how we buffer colour appointments at our Ilica hair salon so this stops happening. Please ask for Lucia on your next visit; your next colour service is on us.",
        hr: "Marina, u pravu ste i žao nam je. Kašnjenje od 50 minuta na dogovoreni termin bojanja nije prihvatljivo, a to što ništa nismo rekli dodatno je pogoršalo situaciju. Kašnjenje je nastalo zbog korekcije boje prije vas koja se odužila — trebali smo vas nazvati prije nego što ste krenuli od kuće. Promijenili smo način na koji planiramo razmake između termina bojanja u našem frizerskom salonu u Ilici kako se ovo više ne bi događalo. Molimo tražite Luciu prilikom sljedećeg posjeta; sljedeće bojanje je na naš račun.",
      },
      keywords: ["Ilica hair salon", "colour appointment"],
      seoScore: 87,
    },
    rev_2f9a2: {
      text: {
        en: "Ivan, thank you — balayage that matches the reference photo takes a long consultation and we are glad it showed. Lucia will be pleased to read this. Aftercare really does decide how long the tone holds, so thank you for following it. We look forward to welcoming you both back to our hair salon in Zagreb centre.",
        hr: "Ivane, hvala — balayage koji odgovara referentnoj fotografiji zahtijeva dugu konzultaciju i drago nam je da se to vidjelo. Luciji će biti drago ovo pročitati. Njega nakon tretmana stvarno odlučuje koliko dugo ton ostaje, pa hvala što ste je se držali. Veselimo se ponovnom dolasku vas oboje u naš frizerski salon u centru Zagreba.",
      },
      keywords: ["balayage", "hair salon in Zagreb centre"],
      seoScore: 93,
    },
    rev_2f9a3: {
      text: {
        en: "Petra, thank you — and that is a fair catch. Yes, we do keratin treatments, and the fact that you had to phone to find out means our profile was doing its job badly. We have now added keratin treatments to our service list so the next person finds it in a second. Glad you are happy with the cut.",
        hr: "Petra, hvala — i to je opravdana primjedba. Da, radimo keratinske tretmane, a činjenica da ste morali nazvati da biste to saznali znači da je naš profil loše radio svoj posao. Sada smo dodali keratinske tretmane na popis usluga pa će ih sljedeća osoba pronaći u sekundi. Drago nam je da ste zadovoljni šišanjem.",
      },
      keywords: ["keratin treatment"],
      seoScore: 76,
    },
    rev_2f9a8: {
      text: {
        en: "This review does not relate to a visit to our salon. We have reported it to Google for removal.",
        hr: "Ova recenzija ne odnosi se na posjet našem salonu. Prijavili smo je Googleu radi uklanjanja.",
      },
      keywords: [],
      seoScore: 12,
    },
  },

  /**
   * The spread across terms is deliberate — one term the business owns, one it is mediocre at,
   * one it loses at the edges, and one it does not appear for at all.
   */
  keywords: [
    {
      id: "kw_01",
      term: { en: "hair salon zagreb", hr: "frizerski salon zagreb" },
      volume: 4400,
      avgRank: 5.4,
      delta: -1.3,
      top3Share: 0,
    },
    {
      id: "kw_02",
      term: { en: "balayage zagreb", hr: "balayage zagreb" },
      volume: 1300,
      avgRank: 2.4,
      delta: -0.8,
      top3Share: 0,
    },
    {
      id: "kw_03",
      term: { en: "hair salon near me", hr: "frizer blizu mene" },
      volume: 9900,
      avgRank: 11.2,
      delta: 0.4,
      top3Share: 0,
    },
    {
      id: "kw_04",
      term: { en: "men's haircut zagreb", hr: "muško šišanje zagreb" },
      volume: 2900,
      avgRank: 7.6,
      delta: -2.1,
      top3Share: 0,
    },
    {
      id: "kw_05",
      term: { en: "wedding hair zagreb", hr: "svadbena frizura zagreb" },
      volume: 720,
      avgRank: 3.1,
      delta: -0.2,
      top3Share: 0,
    },
    {
      id: "kw_06",
      term: { en: "keratin treatment zagreb", hr: "keratinski tretman zagreb" },
      volume: 590,
      avgRank: null,
      delta: 0,
      top3Share: 0,
    },
  ],

  scanHistory: [
    { date: "2026-05-05", atrs: 21.4 },
    { date: "2026-05-19", atrs: 24.9 },
    { date: "2026-06-02", atrs: 23.1 },
    { date: "2026-06-16", atrs: 29.8 },
    { date: "2026-06-30", atrs: 33.5 },
    { date: "2026-07-14", atrs: 36.2 },
    { date: "2026-07-28", atrs: 41.7 },
  ],

  probes: [
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
  ],

  aeoActions: [
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
  ],

  brandVoice: {
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
  },

  voicePreview: {
    casualWarm: {
      en: "Ana, thank you so much — three visits and counting means the world to us! Ines will be thrilled.",
      hr: "Ana, puno vam hvala — tri posjeta i brojimo dalje, to nam znači svijet! Ines će biti oduševljena.",
    },
    casualConcise: {
      en: "Ana, thanks — good to hear it. We will pass this on to Ines.",
      hr: "Ana, hvala — drago nam je to čuti. Prenijet ćemo Ines.",
    },
    formalWarm: {
      en: "Ana, thank you — three visits and counting means a lot to us. We will happily pass this on to Ines.",
      hr: "Ana, hvala — tri posjeta i brojimo dalje, to nam puno znači. Rado ćemo to prenijeti Ines.",
    },
    formalConcise: {
      en: "Thank you for your review. We will pass your comments on to Ines.",
      hr: "Hvala na vašoj recenziji. Prenijet ćemo vaše komentare Ines.",
    },
  },

  profileChecks: [
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
      label: {
        en: "Holiday hours for the next 90 days",
        hr: "Blagdansko radno vrijeme za idućih 90 dana",
      },
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
      label: {
        en: "Description mentions primary service area",
        hr: "Opis spominje primarno područje usluge",
      },
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
  ],

  posts: [
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
  ],

  questions: [
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
  ],

  overview: {
    reviewsAwaitingReply: 4,
    medianResponseHours: 9,

    rating: 4.6,
    ratingSeries: series([4.4, 4.4, 4.45, 4.4, 4.5, 4.5, 4.5, 4.55, 4.55, 4.6, 4.55, 4.6]),

    // Lower is better — the chart inverts its axis for this one.
    avgRank: 4.2,
    rankSeries: series([8.1, 7.9, 7.4, 7.6, 6.8, 6.2, 5.9, 5.5, 5.1, 4.8, 4.4, 4.2]),

    aiVisibilityScore: 47,
    aiVisibilitySeries: series([8, 8, 12, 15, 15, 21, 24, 29, 33, 38, 42, 47]),

    profileScore: 61,

    reviewVolume: [
      { date: "2026-05-11", positive: 5, neutral: 1, negative: 1 },
      { date: "2026-05-18", positive: 4, neutral: 2, negative: 0 },
      { date: "2026-05-25", positive: 7, neutral: 1, negative: 1 },
      { date: "2026-06-01", positive: 6, neutral: 0, negative: 2 },
      { date: "2026-06-08", positive: 8, neutral: 2, negative: 0 },
      { date: "2026-06-15", positive: 9, neutral: 1, negative: 1 },
      { date: "2026-06-22", positive: 7, neutral: 2, negative: 1 },
      { date: "2026-06-29", positive: 11, neutral: 1, negative: 0 },
      { date: "2026-07-06", positive: 9, neutral: 3, negative: 1 },
      { date: "2026-07-13", positive: 12, neutral: 1, negative: 2 },
      { date: "2026-07-20", positive: 10, neutral: 2, negative: 1 },
      { date: "2026-07-27", positive: 8, neutral: 1, negative: 2 },
    ],
  },
};
