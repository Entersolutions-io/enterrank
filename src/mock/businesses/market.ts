import type { DemoBusiness } from "@/lib/types";
import { series } from "./weeks";

/**
 * Demo tenant 2 — a neighbourhood grocery in Zagreb's Trešnjevka.
 *
 * The opposite failure mode to the salon: the shop is genuinely good and the customers say so,
 * but nobody has touched the Google profile since it was claimed. Half the checks fail, four
 * questions sit unanswered, and assistants asked for a corner shop name the chains instead —
 * because the chains publish opening hours and delivery pages and this one publishes nothing.
 *
 * Every name here is invented, including the competitors.
 */
export const market: DemoBusiness = {
  id: "market",
  // Short enough to stay on one line in the switcher chips; the formal category name is on
  // `location.category`.
  label: { en: "Grocery shop", hr: "Kvartovska trgovina" },
  story: {
    en: "Loved on the street, invisible online — the weakest profile of the five.",
    hr: "Voljeni u kvartu, nevidljivi online — najslabiji profil od pet.",
  },
  icon: "ShoppingBasket",
  initials: "MK",
  ownerName: "Ivana Klarić",

  location: {
    id: "loc_3d92a",
    gbpLocationId: "locations/7284910375628401937",
    name: "Market Klas",
    category: { en: "Grocery Store", hr: "Trgovina mješovitom robom" },
    address: "Ozaljska 87",
    city: "Zagreb",
    country: "HR",
    lat: 45.8022,
    lng: 15.9421,
    phone: "+385 1 3641 208",
    website: "https://marketklas.hr",
    rating: 4.2,
    reviewCount: 96,
    profileScore: 39,
    connectedAt: "2026-04-03T14:10:00Z",
  },

  competitors: [
    {
      id: "cmp_11",
      name: "Trgovina Vita",
      rating: 4.0,
      reviewCount: 1240,
      avgRank: 1.6,
      aiVisibility: 38,
      distanceMeters: 240,
    },
    {
      id: "cmp_12",
      name: "Supermarket Orbita",
      rating: 3.9,
      reviewCount: 2010,
      avgRank: 2.8,
      aiVisibility: 44,
      distanceMeters: 1450,
    },
    {
      id: "cmp_13",
      name: "Mini Market Lipa",
      rating: 4.3,
      reviewCount: 168,
      avgRank: 4.9,
      aiVisibility: 12,
      distanceMeters: 520,
    },
    {
      id: "cmp_14",
      name: "Voćarna Tea",
      rating: 4.6,
      reviewCount: 212,
      avgRank: 6.9,
      aiVisibility: 21,
      distanceMeters: 1100,
    },
    {
      id: "cmp_15",
      name: "Dućan Bregovita",
      rating: 4.1,
      reviewCount: 74,
      avgRank: 9.2,
      aiVisibility: 6,
      distanceMeters: 780,
    },
  ],

  competitorNote: {
    en: "You have the best rating on this street and the second-worst position on it. The two chains above you are not better shops — they are better published: complete hours, a product list, a delivery page and a post every week. Voćarna Tea is the one to watch. Fewer reviews than the chains, but four times your AI visibility, because their profile actually says where the produce comes from.",
    hr: "Imate najbolju ocjenu u ovoj ulici i drugu najlošiju poziciju na njoj. Dva lanca iznad vas nisu bolje trgovine — bolje su objavljeni: potpuno radno vrijeme, popis proizvoda, stranica o dostavi i objava svaki tjedan. Voćarna Tea je ta koju treba pratiti. Manje recenzija od lanaca, ali četiri puta veća AI vidljivost, jer njihov profil doista govori odakle dolaze namirnice.",
  },

  reviews: [
    {
      id: "rev_5c3d1",
      locationId: "loc_3d92a",
      author: "Ana Brkić",
      rating: 2,
      text: {
        en: "Bought yoghurt on Friday evening and it had expired two days earlier. I understand things get missed in a small shop, but this is the second time this year. Please check the dates on the chilled shelf.",
        hr: "Kupila sam jogurt u petak navečer, a rok je istekao dva dana ranije. Razumijem da se u maloj trgovini nešto može previdjeti, ali ovo je drugi put ove godine. Molim vas, provjeravajte datume na rashladnoj polici.",
      },
      createdAt: "2026-07-27T19:05:00Z",
      status: "needs_reply",
      sentiment: "negative",
      sentimentConfidence: 0.95,
      intent: "service_complaint",
      topics: ["expiry dates", "chilled products", "repeat issue"],
    },
    {
      id: "rev_5c3d2",
      locationId: "loc_3d92a",
      author: "Zoran Matoš",
      rating: 5,
      text: {
        en: "The fruit and vegetables here are better than in any supermarket within walking distance, and half of it comes from growers around Zagreb. I stopped driving to the big store entirely.",
        hr: "Voće i povrće ovdje je bolje nego u bilo kojem supermarketu u krugu pješačenja, a pola dolazi od uzgajivača oko Zagreba. Potpuno sam prestao voziti do velike trgovine.",
      },
      createdAt: "2026-07-26T17:40:00Z",
      status: "needs_reply",
      sentiment: "positive",
      sentimentConfidence: 0.97,
      intent: "praise",
      topics: ["fresh produce", "local growers", "quality"],
    },
    {
      id: "rev_5c3d3",
      locationId: "loc_3d92a",
      author: "Marija T.",
      rating: 4,
      text: {
        en: "Good little shop. Does anyone know if they deliver? My mother lives two streets away and cannot carry bags any more, and there is nothing about it anywhere online.",
        hr: "Dobra mala trgovina. Zna li netko dostavljaju li? Majka mi živi dvije ulice dalje i više ne može nositi vrećice, a o tome nigdje online nema ničega.",
      },
      createdAt: "2026-07-25T11:15:00Z",
      status: "needs_reply",
      sentiment: "positive",
      sentimentConfidence: 0.66,
      intent: "question",
      topics: ["delivery", "accessibility", "information gap"],
    },
    {
      id: "rev_5c3d4",
      locationId: "loc_3d92a",
      author: "Ivica Šarić",
      rating: 1,
      text: {
        en: "The price on the shelf and the price at the till were not the same on three items. When I pointed it out I was told the labels had not been changed yet. That is not my problem.",
        hr: "Cijena na polici i cijena na blagajni nisu bile iste za tri artikla. Kad sam upozorio, rečeno mi je da naljepnice još nisu promijenjene. To nije moj problem.",
      },
      createdAt: "2026-07-24T18:25:00Z",
      status: "drafted",
      sentiment: "negative",
      sentimentConfidence: 0.94,
      intent: "pricing_concern",
      topics: ["shelf pricing", "till discrepancy"],
      reply: {
        text: {
          en: "Ivica, you are right and we owe you the difference — a shelf price is a promise and we did not keep it on those three items. The labels were replaced the same evening and we have moved the price check to Monday mornings before opening. Bring the receipt to our shop on Ozaljska and we will refund the difference, no questions asked.",
          hr: "Ivica, u pravu ste i dugujemo vam razliku — cijena na polici je obećanje i za ta tri artikla ga nismo održali. Naljepnice su zamijenjene istu večer, a provjeru cijena prebacili smo na ponedjeljak ujutro prije otvaranja. Donesite račun u našu trgovinu u Ozaljskoj i vratit ćemo vam razliku, bez pitanja.",
        },
        keywords: ["Ozaljska shop"],
        seoScore: 63,
        generatedAt: "2026-07-25T09:30:00Z",
        automated: false,
      },
    },
    {
      id: "rev_5c3d5",
      locationId: "loc_3d92a",
      author: "Božena Krznarić",
      rating: 5,
      text: {
        en: "Ivana puts a loaf aside for me when I cannot get there before noon. You will not get that at the supermarket.",
        hr: "Ivana mi ostavi kruh sa strane kad ne stignem doći prije podneva. To u supermarketu nećete dobiti.",
      },
      createdAt: "2026-07-22T10:05:00Z",
      status: "answered",
      sentiment: "positive",
      sentimentConfidence: 0.98,
      intent: "staff_mention",
      topics: ["bread", "staff: Ivana", "regular customer"],
      reply: {
        text: {
          en: "Božena, thank you — that is the whole reason a neighbourhood grocery still exists. Bread comes in at 06:30 and again at 15:00, so just call ahead and we will hold one for you either way.",
          hr: "Božena, hvala — upravo zbog toga kvartovska trgovina još postoji. Kruh stiže u 6:30 i ponovno u 15:00, pa samo nazovite i ostavit ćemo vam ga u oba slučaja.",
        },
        keywords: ["neighbourhood grocery"],
        seoScore: 72,
        generatedAt: "2026-07-22T16:20:00Z",
        publishedAt: "2026-07-22T16:22:00Z",
        automated: true,
      },
    },
    {
      id: "rev_5c3d6",
      locationId: "loc_3d92a",
      author: "Kristijan Lovrić",
      rating: 3,
      text: {
        en: "Shop is fine but on Saturday morning there is one till open and eight people waiting. Ten minutes for a coffee and milk.",
        hr: "Trgovina je u redu, ali subotom ujutro radi jedna blagajna, a čeka osmero ljudi. Deset minuta za kavu i mlijeko.",
      },
      createdAt: "2026-07-20T09:50:00Z",
      status: "answered",
      sentiment: "neutral",
      sentimentConfidence: 0.87,
      intent: "wait_time",
      topics: ["queue", "Saturday morning", "staffing"],
      reply: {
        text: {
          en: "Kristijan, that is a fair hit. We have put a second person on the till from 08:00 to 11:00 on Saturdays starting this week. If you catch a queue again, tell us — that is the only way we know it is happening.",
          hr: "Kristijane, opravdana primjedba. Od ovog tjedna subotom od 8 do 11 sati na blagajni je i druga osoba. Ako opet naiđete na red, recite nam — samo tako znamo da se događa.",
        },
        keywords: [],
        seoScore: 58,
        generatedAt: "2026-07-21T08:15:00Z",
        publishedAt: "2026-07-21T08:18:00Z",
        automated: false,
      },
    },
    {
      id: "rev_5c3d7",
      locationId: "loc_3d92a",
      author: "R. D.",
      rating: 1,
      text: {
        en: "EARN 500 EUR PER DAY FROM HOME click the link in my profile!!!",
        hr: "ZARADITE 500 EUR DNEVNO OD KUĆE kliknite na poveznicu u mom profilu!!!",
      },
      createdAt: "2026-07-19T02:44:00Z",
      status: "needs_reply",
      sentiment: "negative",
      sentimentConfidence: 0.58,
      intent: "spam",
      topics: [],
    },
    {
      id: "rev_5c3d8",
      locationId: "loc_3d92a",
      author: "Petra Sabolić",
      rating: 5,
      text: {
        en: "Open on Sunday morning when everything else around here is shut. Saved our lunch more than once.",
        hr: "Otvoreno nedjeljom ujutro kad je sve ostalo u okolici zatvoreno. Više puta nam je spasilo ručak.",
      },
      createdAt: "2026-07-18T12:30:00Z",
      status: "answered",
      sentiment: "positive",
      sentimentConfidence: 0.96,
      intent: "praise",
      topics: ["Sunday opening", "convenience"],
      reply: {
        text: {
          en: "Petra, thank you. We are open Sundays 07:00–13:00 all year, and that is not going to change — it is the day the neighbourhood actually needs us.",
          hr: "Petra, hvala. Nedjeljom smo otvoreni od 7 do 13 sati tijekom cijele godine i to se neće mijenjati — to je dan kad smo kvartu stvarno potrebni.",
        },
        keywords: ["open on Sunday"],
        seoScore: 77,
        generatedAt: "2026-07-18T18:00:00Z",
        publishedAt: "2026-07-18T18:02:00Z",
        automated: true,
      },
    },
    {
      id: "rev_5c3d9",
      locationId: "loc_3d92a",
      author: "Domagoj Vlašić",
      rating: 4,
      text: {
        en: "Very good selection of Croatian producers — cheese, honey, ajvar. Would be five if you carried a couple of gluten-free things.",
        hr: "Vrlo dobar izbor hrvatskih proizvođača — sir, med, ajvar. Bilo bi pet da imate i par bezglutenskih artikala.",
      },
      createdAt: "2026-07-15T16:10:00Z",
      status: "answered",
      sentiment: "positive",
      sentimentConfidence: 0.9,
      intent: "question",
      topics: ["Croatian producers", "gluten-free", "assortment"],
      reply: {
        text: {
          en: "Domagoj, thank you — and noted. We now carry gluten-free bread and pasta on the shelf by the till; it started as one customer's request, same as yours. Croatian producers are about two thirds of what we stock and we are happy to keep it that way.",
          hr: "Domagoje, hvala — i zabilježeno. Sada na polici kraj blagajne imamo bezglutenski kruh i tjesteninu; počelo je kao zahtjev jedne mušterije, isto kao vaš. Hrvatski proizvođači čine oko dvije trećine asortimana i drago nam je što je tako.",
        },
        keywords: ["Croatian producers", "local produce Zagreb"],
        seoScore: 81,
        generatedAt: "2026-07-16T09:40:00Z",
        publishedAt: "2026-07-16T09:44:00Z",
        automated: true,
      },
    },
    {
      id: "rev_5c3e1",
      locationId: "loc_3d92a",
      author: "Sanja Držić",
      rating: 2,
      text: {
        en: "Card machine was down and there was no sign on the door. I had to leave a full basket and walk to the cash machine.",
        hr: "Kartični uređaj nije radio, a na vratima nije bilo nikakve obavijesti. Morala sam ostaviti punu košaru i otići do bankomata.",
      },
      createdAt: "2026-07-13T14:55:00Z",
      status: "answered",
      sentiment: "negative",
      sentimentConfidence: 0.92,
      intent: "service_complaint",
      topics: ["card payment", "communication"],
      reply: {
        text: {
          en: "Sanja, we are sorry — a sign on the door takes ten seconds and we did not do it. The terminal was replaced the next morning and we now keep a printed notice under the till for exactly this. Cards and mobile payments work normally again.",
          hr: "Sanja, žao nam je — obavijest na vratima traje deset sekundi, a nismo je stavili. Terminal je zamijenjen sljedeće jutro, a sada ispod blagajne držimo otisnutu obavijest baš za ovakve slučajeve. Kartice i mobilna plaćanja opet rade normalno.",
        },
        keywords: [],
        seoScore: 54,
        generatedAt: "2026-07-14T07:30:00Z",
        publishedAt: "2026-07-14T07:33:00Z",
        automated: false,
      },
    },
    {
      id: "rev_5c3e2",
      locationId: "loc_3d92a",
      author: "Mladen Rukavina",
      rating: 5,
      text: {
        en: "They started stocking my mother's coffee brand after I asked once. A small shop that listens is worth more than a big one that does not.",
        hr: "Počeli su držati marku kave koju pije moja mama nakon što sam jednom pitao. Mala trgovina koja sluša vrijedi više od velike koja ne sluša.",
      },
      createdAt: "2026-07-09T08:45:00Z",
      status: "answered",
      sentiment: "positive",
      sentimentConfidence: 0.99,
      intent: "praise",
      topics: ["special orders", "service", "assortment"],
      reply: {
        text: {
          en: "Mladen, thank you — if we can get it from our supplier, we will order it in, and there is no minimum. Just ask at the till like you did.",
          hr: "Mladene, hvala — ako to možemo dobiti od dobavljača, naručit ćemo, i nema minimalne količine. Samo pitajte na blagajni kao što ste i učinili.",
        },
        keywords: [],
        seoScore: 60,
        generatedAt: "2026-07-09T17:20:00Z",
        publishedAt: "2026-07-09T17:21:00Z",
        automated: true,
      },
    },
    {
      id: "rev_5c3e3",
      locationId: "loc_3d92a",
      author: "Lea Tomašević",
      rating: 3,
      text: {
        en: "Aisles are narrow and impossible with a pram, especially in the afternoon. Otherwise a good shop.",
        hr: "Prolazi su uski i nemogući s kolicima, pogotovo poslijepodne. Inače dobra trgovina.",
      },
      createdAt: "2026-07-06T15:20:00Z",
      status: "answered",
      sentiment: "neutral",
      sentimentConfidence: 0.85,
      intent: "service_complaint",
      topics: ["accessibility", "layout", "pram"],
      reply: {
        text: {
          en: "Lea, thank you for saying it. We have cleared the boxes that used to sit in the middle aisle after each delivery, which was most of the problem. The space by the window is now wide enough for a pram — it is not a full solution, but it is better than it was.",
          hr: "Lea, hvala što ste to rekli. Uklonili smo kutije koje su nakon svake isporuke stajale u srednjem prolazu, a to je bio veći dio problema. Prostor kraj izloga sada je dovoljno širok za kolica — nije potpuno rješenje, ali je bolje nego prije.",
        },
        keywords: [],
        seoScore: 52,
        generatedAt: "2026-07-07T10:00:00Z",
        publishedAt: "2026-07-07T10:04:00Z",
        automated: false,
      },
    },
  ],

  replyDrafts: {
    rev_5c3d1: {
      text: {
        en: "Ana, thank you for telling us, and we are sorry — an expired product on the chilled shelf is our mistake, not an oversight you should have to catch. We now check dates on the chilled shelf every morning before opening and again at 17:00, and the whole batch was pulled the evening you wrote this. Please bring the receipt to our shop on Ozaljska and we will refund it. If you see it again, tell us at the till straight away.",
        hr: "Ana, hvala što ste nam rekli i žao nam je — proizvod s isteklim rokom na rashladnoj polici naša je greška, a ne propust koji biste vi trebali uhvatiti. Sada datume na rashladnoj polici provjeravamo svako jutro prije otvaranja i ponovno u 17 sati, a cijela je serija povučena iste večeri kad ste ovo napisali. Molimo donesite račun u našu trgovinu u Ozaljskoj i vratit ćemo vam novac. Ako to opet primijetite, recite nam odmah na blagajni.",
      },
      keywords: ["Ozaljska shop"],
      seoScore: 69,
    },
    rev_5c3d2: {
      text: {
        en: "Zoran, thank you — that is exactly what we are trying to be. Roughly two thirds of the fruit and vegetables come from growers within an hour of Zagreb, and the crates are delivered in the morning rather than sitting in a warehouse for a week. If you ever want to know where something came from, ask at the till; we know every supplier by name. See you in the shop.",
        hr: "Zorane, hvala — upravo to pokušavamo biti. Otprilike dvije trećine voća i povrća dolazi od uzgajivača unutar sat vremena od Zagreba, a gajbe stižu ujutro umjesto da tjedan dana stoje u skladištu. Ako ikad želite znati odakle je nešto stiglo, pitajte na blagajni; svakog dobavljača znamo po imenu. Vidimo se u trgovini.",
      },
      keywords: ["local produce Zagreb", "fresh fruit and vegetables"],
      seoScore: 92,
    },
    rev_5c3d3: {
      text: {
        en: "Marija, thank you for asking — and the fact that you could not find the answer anywhere is on us. Yes, we deliver within Trešnjevka: order by phone before 11:00 and we bring it the same afternoon, free above €20. We have just added this to our profile so the next person does not have to ask. Your mother is welcome to call us directly on +385 1 3641 208.",
        hr: "Marija, hvala na pitanju — a to što odgovor niste mogli nigdje pronaći naša je krivnja. Da, dostavljamo unutar Trešnjevke: naručite telefonom do 11 sati i donosimo isto poslijepodne, besplatno iznad 20 €. Upravo smo to dodali na profil kako sljedeća osoba ne bi morala pitati. Vaša nas majka slobodno može nazvati izravno na +385 1 3641 208.",
      },
      keywords: ["grocery delivery Trešnjevka"],
      seoScore: 88,
    },
    rev_5c3d7: {
      text: {
        en: "This review does not relate to a visit to our shop. We have reported it to Google for removal.",
        hr: "Ova recenzija ne odnosi se na posjet našoj trgovini. Prijavili smo je Googleu radi uklanjanja.",
      },
      keywords: [],
      seoScore: 10,
    },
  },

  keywords: [
    {
      id: "kw_11",
      term: { en: "grocery store near me", hr: "trgovina blizu mene" },
      volume: 12100,
      avgRank: 8.4,
      delta: -0.6,
      top3Share: 0,
    },
    {
      id: "kw_12",
      term: { en: "mini market trešnjevka", hr: "mini market trešnjevka" },
      volume: 480,
      avgRank: 2.1,
      delta: -0.9,
      top3Share: 0,
    },
    {
      id: "kw_13",
      term: { en: "shop open on sunday zagreb", hr: "trgovina otvorena nedjeljom zagreb" },
      volume: 3300,
      avgRank: 6.2,
      delta: -1.8,
      top3Share: 0,
    },
    {
      id: "kw_14",
      term: { en: "local produce zagreb", hr: "domaći proizvodi zagreb" },
      volume: 1600,
      avgRank: 4.3,
      delta: -0.4,
      top3Share: 0,
    },
    {
      id: "kw_15",
      term: { en: "fruit and vegetables trešnjevka", hr: "voće i povrće trešnjevka" },
      volume: 890,
      avgRank: 9.7,
      delta: 0.7,
      top3Share: 0,
    },
    {
      id: "kw_16",
      term: { en: "grocery delivery trešnjevka", hr: "dostava namirnica trešnjevka" },
      volume: 2400,
      avgRank: null,
      delta: 0,
      top3Share: 0,
    },
  ],

  scanHistory: [
    { date: "2026-05-05", atrs: 12.9 },
    { date: "2026-05-19", atrs: 14.2 },
    { date: "2026-06-02", atrs: 13.8 },
    { date: "2026-06-16", atrs: 16.1 },
    { date: "2026-06-30", atrs: 15.4 },
    { date: "2026-07-14", atrs: 18.0 },
    { date: "2026-07-28", atrs: 19.6 },
  ],

  probes: [
    {
      id: "probe_11",
      locationId: "loc_3d92a",
      prompt: {
        en: "where can I buy groceries near Trešnjevka on a Sunday",
        hr: "gdje mogu kupiti namirnice blizu Trešnjevke u nedjelju",
      },
      visibilityScore: 34,
      delta: 34,
      results: [
        {
          engine: "chatgpt",
          mentioned: false,
          position: null,
          competitorsNamed: ["Trgovina Vita", "Supermarket Orbita"],
          citedSources: ["google.com/maps"],
          excerpt: {
            en: "…Sunday opening in Trešnjevka is limited. Trgovina Vita lists 07:00–14:00 and Supermarket Orbita opens at 08:00; most smaller shops do not publish Sunday hours at all…",
            hr: "…nedjeljno radno vrijeme u Trešnjevki je ograničeno. Trgovina Vita navodi 7:00–14:00, a Supermarket Orbita otvara u 8:00; većina manjih trgovina uopće ne objavljuje nedjeljno radno vrijeme…",
          },
          checkedAt: "2026-07-28T05:00:00Z",
        },
        {
          engine: "gemini",
          mentioned: true,
          position: 3,
          competitorsNamed: ["Trgovina Vita", "Mini Market Lipa"],
          citedSources: ["google.com/maps"],
          excerpt: {
            en: "…Market Klas on Ozaljska is also mentioned in reviews as being open on Sunday mornings, although its profile does not confirm the hours…",
            hr: "…Market Klas u Ozaljskoj također se u recenzijama spominje kao otvoren nedjeljom ujutro, iako njegov profil ne potvrđuje radno vrijeme…",
          },
          checkedAt: "2026-07-28T05:00:00Z",
        },
        {
          engine: "perplexity",
          mentioned: false,
          position: null,
          competitorsNamed: ["Supermarket Orbita", "Trgovina Vita", "Voćarna Tea"],
          citedSources: ["google.com/maps", "njuskalo.hr"],
          excerpt: {
            en: "…the three shops with confirmed Sunday hours in the area are listed below…",
            hr: "…tri trgovine s potvrđenim nedjeljnim radnim vremenom u tom su području navedene u nastavku…",
          },
          checkedAt: "2026-07-28T05:00:00Z",
        },
        {
          engine: "ai_overviews",
          mentioned: true,
          position: 4,
          competitorsNamed: ["Trgovina Vita", "Supermarket Orbita", "Mini Market Lipa"],
          citedSources: ["google.com/maps"],
          excerpt: {
            en: "…nearby options include Market Klas (4.2★, 96 reviews), though hours should be confirmed by phone…",
            hr: "…obližnje opcije uključuju Market Klas (4,2★, 96 recenzija), no radno vrijeme treba potvrditi telefonom…",
          },
          checkedAt: "2026-07-28T05:00:00Z",
        },
      ],
    },
    {
      id: "probe_12",
      locationId: "loc_3d92a",
      prompt: {
        en: "shop with local Croatian produce in Zagreb",
        hr: "trgovina s domaćim hrvatskim proizvodima u Zagrebu",
      },
      visibilityScore: 41,
      delta: 12,
      results: [
        {
          engine: "chatgpt",
          mentioned: true,
          position: 4,
          competitorsNamed: ["Voćarna Tea", "Trgovina Vita"],
          citedSources: ["google.com/maps", "reddit.com/r/zagreb"],
          excerpt: {
            en: "…reviewers of Market Klas repeatedly mention cheese, honey and produce from growers around Zagreb, though the shop does not list its suppliers…",
            hr: "…recenzenti Marketa Klas opetovano spominju sir, med i namirnice od uzgajivača oko Zagreba, iako trgovina ne navodi svoje dobavljače…",
          },
          checkedAt: "2026-07-28T05:00:00Z",
        },
        {
          engine: "gemini",
          mentioned: false,
          position: null,
          competitorsNamed: ["Voćarna Tea", "Dućan Bregovita"],
          citedSources: ["google.com/maps"],
          excerpt: {
            en: "…Voćarna Tea publishes a list of the farms it buys from, which makes it the clearest match for this question…",
            hr: "…Voćarna Tea objavljuje popis gospodarstava od kojih kupuje, što je čini najjasnijim odgovorom na ovo pitanje…",
          },
          checkedAt: "2026-07-28T05:00:00Z",
        },
        {
          engine: "perplexity",
          mentioned: true,
          position: 3,
          competitorsNamed: ["Voćarna Tea", "Trgovina Vita"],
          citedSources: ["reddit.com/r/zagreb", "google.com/maps"],
          excerpt: {
            en: "…a thread on local shops names Market Klas in Trešnjevka for domestic cheese and ajvar…",
            hr: "…rasprava o kvartovskim trgovinama navodi Market Klas u Trešnjevki za domaći sir i ajvar…",
          },
          checkedAt: "2026-07-28T05:00:00Z",
        },
        {
          engine: "ai_overviews",
          mentioned: false,
          position: null,
          competitorsNamed: ["Voćarna Tea"],
          citedSources: ["google.com/maps"],
          excerpt: {
            en: "…few grocery profiles in Zagreb describe the origin of their produce…",
            hr: "…malo profila trgovina u Zagrebu opisuje podrijetlo svojih namirnica…",
          },
          checkedAt: "2026-07-28T05:00:00Z",
        },
      ],
    },
    {
      id: "probe_13",
      locationId: "loc_3d92a",
      prompt: {
        en: "grocery delivery in Trešnjevka",
        hr: "dostava namirnica u Trešnjevki",
      },
      visibilityScore: 0,
      delta: 0,
      results: [
        {
          engine: "chatgpt",
          mentioned: false,
          position: null,
          competitorsNamed: ["Supermarket Orbita", "Trgovina Vita"],
          citedSources: ["google.com/maps"],
          excerpt: {
            en: "…the two chains deliver within the district; independent shops in the area do not advertise delivery…",
            hr: "…dva lanca dostavljaju unutar kvarta; samostalne trgovine u tom području ne oglašavaju dostavu…",
          },
          checkedAt: "2026-07-28T05:00:00Z",
        },
        {
          engine: "gemini",
          mentioned: false,
          position: null,
          competitorsNamed: ["Supermarket Orbita"],
          citedSources: ["google.com/maps"],
          excerpt: {
            en: "…Supermarket Orbita offers same-day delivery above a minimum order…",
            hr: "…Supermarket Orbita nudi dostavu isti dan iznad minimalne narudžbe…",
          },
          checkedAt: "2026-07-28T05:00:00Z",
        },
        {
          engine: "perplexity",
          mentioned: false,
          position: null,
          competitorsNamed: ["Supermarket Orbita", "Trgovina Vita"],
          citedSources: ["google.com/maps", "njuskalo.hr"],
          excerpt: {
            en: "…no smaller grocery in Trešnjevka lists a delivery service…",
            hr: "…nijedna manja trgovina u Trešnjevki ne navodi uslugu dostave…",
          },
          checkedAt: "2026-07-28T05:00:00Z",
        },
        {
          engine: "ai_overviews",
          mentioned: false,
          position: null,
          competitorsNamed: ["Supermarket Orbita"],
          citedSources: ["google.com/maps"],
          excerpt: {
            en: "…delivery options in this area are limited to larger retailers…",
            hr: "…mogućnosti dostave u ovom području ograničene su na veće trgovce…",
          },
          checkedAt: "2026-07-28T05:00:00Z",
        },
      ],
    },
    {
      id: "probe_14",
      locationId: "loc_3d92a",
      prompt: {
        en: "small grocery open late in Zagreb west",
        hr: "mala trgovina otvorena do kasno u zapadnom Zagrebu",
      },
      visibilityScore: 18,
      delta: 6,
      results: [
        {
          engine: "chatgpt",
          mentioned: false,
          position: null,
          competitorsNamed: ["Trgovina Vita", "Mini Market Lipa"],
          citedSources: ["google.com/maps"],
          excerpt: {
            en: "…Mini Market Lipa lists 22:00 closing on weekdays, the latest in the immediate area…",
            hr: "…Mini Market Lipa navodi zatvaranje u 22 sata radnim danima, najkasnije u neposrednoj okolici…",
          },
          checkedAt: "2026-07-28T05:00:00Z",
        },
        {
          engine: "gemini",
          mentioned: true,
          position: 5,
          competitorsNamed: ["Mini Market Lipa", "Trgovina Vita"],
          citedSources: ["google.com/maps"],
          excerpt: {
            en: "…Market Klas is also in the area, but its closing time is not stated on the profile…",
            hr: "…Market Klas je također u tom području, ali vrijeme zatvaranja nije navedeno na profilu…",
          },
          checkedAt: "2026-07-28T05:00:00Z",
        },
        {
          engine: "perplexity",
          mentioned: false,
          position: null,
          competitorsNamed: ["Mini Market Lipa"],
          citedSources: ["google.com/maps"],
          excerpt: {
            en: "…only one shop in the district publishes hours past 21:00…",
            hr: "…samo jedna trgovina u kvartu objavljuje radno vrijeme nakon 21 sat…",
          },
          checkedAt: "2026-07-28T05:00:00Z",
        },
        {
          engine: "ai_overviews",
          mentioned: false,
          position: null,
          competitorsNamed: ["Mini Market Lipa", "Supermarket Orbita"],
          citedSources: ["google.com/maps"],
          excerpt: {
            en: "…check individual profiles, as many small shops do not keep hours updated…",
            hr: "…provjerite pojedinačne profile jer mnoge male trgovine ne ažuriraju radno vrijeme…",
          },
          checkedAt: "2026-07-28T05:00:00Z",
        },
      ],
    },
  ],

  aeoActions: [
    {
      id: "aeo_11",
      title: {
        en: "Publish your full opening hours, including Sunday",
        hr: "Objavite potpuno radno vrijeme, uključujući nedjelju",
      },
      detail: {
        en: "Your best review says you are open on Sunday and every assistant says it cannot confirm it. Sunday is the highest-intent search of your week and you are losing it to a hole in the profile.",
        hr: "Vaša najbolja recenzija kaže da radite nedjeljom, a svaki asistent kaže da to ne može potvrditi. Nedjelja je pretraga s najvećom namjerom u tjednu i gubite je zbog rupe u profilu.",
      },
      impact: "high",
      effort: "low",
    },
    {
      id: "aeo_12",
      title: {
        en: "Say on the profile that you deliver in Trešnjevka",
        hr: "Napišite na profilu da dostavljate u Trešnjevki",
      },
      detail: {
        en: "Four assistants answered a delivery question by naming the two chains. A customer asked the same thing in a review because there was nowhere else to look.",
        hr: "Četiri asistenta odgovorila su na pitanje o dostavi navodeći dva lanca. Kupac je isto pitao u recenziji jer nije imao gdje drugdje pogledati.",
      },
      impact: "high",
      effort: "low",
    },
    {
      id: "aeo_13",
      title: {
        en: "List your local suppliers by name",
        hr: "Navedite svoje lokalne dobavljače poimence",
      },
      detail: {
        en: "Assistants that named a competitor for local produce cited that competitor's supplier list. Yours exists — it is just only in your head and in your reviews.",
        hr: "Asistenti koji su za domaće proizvode naveli konkurenta citirali su njegov popis dobavljača. Vaš postoji — samo je u vašoj glavi i u vašim recenzijama.",
      },
      impact: "medium",
      effort: "medium",
    },
    {
      id: "aeo_14",
      title: {
        en: "Answer the four questions on your profile",
        hr: "Odgovorite na četiri pitanja na svom profilu",
      },
      detail: {
        en: "One of them — “do you deliver?” — has been viewed 512 times and has sat unanswered since May. That single answer would settle two of the actions above.",
        hr: "Jedno od njih — „dostavljate li?“ — pregledano je 512 puta i stoji bez odgovora od svibnja. Taj jedan odgovor riješio bi dvije gornje stavke.",
      },
      impact: "high",
      effort: "low",
    },
  ],

  brandVoice: {
    locationId: "loc_3d92a",
    formality: 22,
    warmth: 64,
    bannedWords: ["cheapest", "unbeatable", "supermarket prices", "guaranteed fresh"],
    preferredPhrases: ["see you in the shop", "thank you for telling us", "fresh in this morning"],
    targetKeywords: [
      "grocery Trešnjevka",
      "local produce Zagreb",
      "open on Sunday",
      "Ozaljska shop",
      "fresh fruit and vegetables",
    ],
    signature: "— Ivana and the Market Klas team",
    autoPublishAtOrAbove: 4,
  },

  voicePreview: {
    casualWarm: {
      en: "Božena, thank you so much — putting a loaf aside is the least we can do for someone who has been coming for years!",
      hr: "Božena, puno vam hvala — ostaviti kruh sa strane najmanje je što možemo učiniti za nekoga tko dolazi godinama!",
    },
    casualConcise: {
      en: "Božena, thanks — bread comes in at 06:30 and 15:00, just call ahead.",
      hr: "Božena, hvala — kruh stiže u 6:30 i 15:00, samo nazovite unaprijed.",
    },
    formalWarm: {
      en: "Božena, thank you — that is the whole reason a neighbourhood grocery still exists. Do call ahead and we will hold one for you.",
      hr: "Božena, hvala — upravo zbog toga kvartovska trgovina još postoji. Slobodno nazovite i ostavit ćemo vam ga.",
    },
    formalConcise: {
      en: "Thank you for your review. Bread deliveries arrive at 06:30 and 15:00 and we can reserve one on request.",
      hr: "Hvala na vašoj recenziji. Kruh stiže u 6:30 i 15:00, a na zahtjev ga možemo rezervirati.",
    },
  },

  profileChecks: [
    {
      id: "chk_11",
      label: { en: "Business hours set for every day", hr: "Radno vrijeme postavljeno za svaki dan" },
      weight: 10,
      passed: true,
      hint: {
        en: "Monday to Saturday are set. Sunday is marked “hours may differ”, which assistants read as unknown.",
        hr: "Ponedjeljak do subota su postavljeni. Nedjelja je označena kao „radno vrijeme može odstupati“, što asistenti čitaju kao nepoznato.",
      },
    },
    {
      id: "chk_12",
      label: {
        en: "Holiday hours for the next 90 days",
        hr: "Blagdansko radno vrijeme za idućih 90 dana",
      },
      weight: 6,
      passed: false,
      hint: {
        en: "Nothing set for 5 or 15 August. A grocery closed unexpectedly on a holiday collects one-star reviews.",
        hr: "Ništa nije postavljeno za 5. ni 15. kolovoza. Trgovina neočekivano zatvorena na blagdan skuplja recenzije s jednom zvjezdicom.",
      },
    },
    {
      id: "chk_13",
      label: { en: "Product categories listed", hr: "Navedene kategorije proizvoda" },
      weight: 14,
      passed: false,
      hint: {
        en: "The profile says “grocery store” and nothing else. Bakery, fresh produce, local cheese and gluten-free are all missing.",
        hr: "Na profilu piše samo „trgovina mješovitom robom“. Pekarski proizvodi, svježe namirnice, domaći sir i bezglutenski asortiman nisu navedeni.",
      },
    },
    {
      id: "chk_14",
      label: { en: "At least 20 photos uploaded", hr: "Najmanje 20 učitanih fotografija" },
      weight: 12,
      passed: true,
      hint: {
        en: "23 photos, all uploaded by customers rather than by you.",
        hr: "23 fotografije, sve su učitali kupci, a ne vi.",
      },
    },
    {
      id: "chk_15",
      label: { en: "Photos added in the last 30 days", hr: "Fotografije dodane u zadnjih 30 dana" },
      weight: 8,
      passed: false,
      hint: {
        en: "You have never uploaded one. A produce shelf photographed weekly is the cheapest freshness signal there is.",
        hr: "Nikada niste učitali nijednu. Polica s namirnicama fotografirana svaki tjedan najjeftiniji je signal svježine koji postoji.",
      },
    },
    {
      id: "chk_16",
      label: {
        en: "Description mentions primary service area",
        hr: "Opis spominje primarno područje usluge",
      },
      weight: 9,
      passed: true,
      hint: {
        en: "Trešnjevka and Ozaljska both appear in the description.",
        hr: "Trešnjevka i Ozaljska pojavljuju se u opisu.",
      },
    },
    {
      id: "chk_17",
      label: { en: "Every profile question answered", hr: "Odgovoreno na svako pitanje na profilu" },
      weight: 11,
      passed: false,
      hint: {
        en: "4 questions unanswered, one of them viewed 512 times.",
        hr: "4 pitanja bez odgovora, jedno od njih pregledano 512 puta.",
      },
    },
    {
      id: "chk_18",
      label: { en: "Posted in the last 7 days", hr: "Objavljeno u zadnjih 7 dana" },
      weight: 10,
      passed: false,
      hint: {
        en: "Last post was 40 days ago. Two more are sitting in drafts.",
        hr: "Zadnja objava bila je prije 40 dana. Još dvije čekaju u nacrtima.",
      },
    },
    {
      id: "chk_19",
      label: { en: "Order or delivery link connected", hr: "Poveznica za narudžbu ili dostavu povezana" },
      weight: 12,
      passed: false,
      hint: {
        en: "You deliver in Trešnjevka and the profile does not say so anywhere.",
        hr: "Dostavljate u Trešnjevki, a profil to nigdje ne navodi.",
      },
    },
    {
      id: "chk_20",
      label: { en: "Reviews answered within 48 hours", hr: "Odgovoreno na recenzije unutar 48 sati" },
      weight: 8,
      passed: true,
      hint: {
        en: "Median response time is 46 hours — inside the threshold, but only just.",
        hr: "Medijan vremena odgovora je 46 sati — unutar praga, ali tek jedva.",
      },
    },
  ],

  posts: [
    {
      id: "post_11",
      locationId: "loc_3d92a",
      title: { en: "We are open every Sunday morning", hr: "Otvoreni smo svake nedjelje ujutro" },
      body: {
        en: "07:00 to 13:00, all year, including through August. Bread, milk, fruit and the papers — the things you actually run out of on a Sunday.",
        hr: "Od 7 do 13 sati, cijele godine, i tijekom kolovoza. Kruh, mlijeko, voće i novine — ono što vam u nedjelju stvarno nedostaje.",
      },
      cta: "learn_more",
      status: "draft",
      scheduledFor: "2026-08-02T06:00:00Z",
      image: null,
    },
    {
      id: "post_12",
      locationId: "loc_3d92a",
      title: { en: "Plums from Zaprešić, picked yesterday", hr: "Šljive iz Zaprešića, ubrane jučer" },
      body: {
        en: "Two crates arrived this morning from a grower we have bought from for nine years. When they are gone they are gone — that is the whole point of buying local.",
        hr: "Jutros su stigle dvije gajbe od uzgajivača od kojeg kupujemo devet godina. Kad ih nestane, nestalo ih je — u tome je i poanta kupovine od domaćih.",
      },
      cta: "none",
      status: "scheduled",
      scheduledFor: "2026-07-31T06:30:00Z",
      image: null,
    },
    {
      id: "post_13",
      locationId: "loc_3d92a",
      title: { en: "New bread supplier from June", hr: "Novi dobavljač kruha od lipnja" },
      body: {
        en: "We changed bakeries. Deliveries at 06:30 and 15:00, so there is fresh bread in the afternoon too — a lot of you asked for exactly that.",
        hr: "Promijenili smo pekaru. Isporuke u 6:30 i 15:00, pa svježeg kruha ima i poslijepodne — mnogi ste tražili baš to.",
      },
      cta: "none",
      status: "published",
      scheduledFor: "2026-06-18T07:00:00Z",
      publishedAt: "2026-06-18T07:00:00Z",
      metrics: { views: 412, clicks: 21 },
      image: null,
    },
    {
      id: "post_14",
      locationId: "loc_3d92a",
      title: { en: "Cards and mobile payments work again", hr: "Kartice i mobilna plaćanja ponovno rade" },
      body: {
        en: "The terminal was replaced and everything is back to normal. If it ever goes down again there will be a sign on the door — we learned that the hard way.",
        hr: "Terminal je zamijenjen i sve radi normalno. Ako se opet pokvari, na vratima će stajati obavijest — to smo naučili na teži način.",
      },
      cta: "none",
      status: "draft",
      scheduledFor: "2026-08-04T06:00:00Z",
      image: null,
    },
    {
      id: "post_15",
      locationId: "loc_3d92a",
      title: { en: "Strawberry season", hr: "Sezona jagoda" },
      body: {
        en: "Domestic strawberries every morning while the season lasts. Ask for the crate under the counter if the shelf looks picked over — we keep the second delivery back for the afternoon.",
        hr: "Domaće jagode svako jutro dok traje sezona. Pitajte za gajbu ispod pulta ako polica izgleda prorijeđeno — drugu isporuku čuvamo za poslijepodne.",
      },
      cta: "none",
      status: "published",
      scheduledFor: "2026-05-29T06:30:00Z",
      publishedAt: "2026-05-29T06:30:00Z",
      metrics: { views: 638, clicks: 34 },
      image: null,
    },
  ],

  questions: [
    {
      id: "qst_11",
      locationId: "loc_3d92a",
      author: "Snježana P.",
      question: {
        en: "Do you deliver in the neighbourhood?",
        hr: "Dostavljate li po kvartu?",
      },
      askedAt: "2026-05-22T09:40:00Z",
      views: 512,
    },
    {
      id: "qst_12",
      locationId: "loc_3d92a",
      author: "Tin B.",
      question: {
        en: "Are you open on Sundays and until what time?",
        hr: "Radite li nedjeljom i do kada?",
      },
      askedAt: "2026-06-14T08:15:00Z",
      views: 388,
    },
    {
      id: "qst_13",
      locationId: "loc_3d92a",
      author: "Vlatka M.",
      question: {
        en: "Can I pay by card for a small amount?",
        hr: "Mogu li platiti karticom i mali iznos?",
      },
      askedAt: "2026-07-02T17:05:00Z",
      views: 244,
    },
    {
      id: "qst_14",
      locationId: "loc_3d92a",
      author: "Josip N.",
      question: {
        en: "Do you sell fresh meat or only packaged?",
        hr: "Prodajete li svježe meso ili samo pakirano?",
      },
      askedAt: "2026-07-16T12:50:00Z",
      views: 156,
    },
    {
      id: "qst_15",
      locationId: "loc_3d92a",
      author: "Renata K.",
      question: {
        en: "Is there anywhere to park in front?",
        hr: "Ima li gdje parkirati ispred?",
      },
      askedAt: "2026-04-28T15:30:00Z",
      answer: {
        en: "There are four free spaces in front of the shop and the side street is unrestricted after 17:00.",
        hr: "Ispred trgovine su četiri besplatna mjesta, a sporedna ulica je bez ograničenja nakon 17 sati.",
      },
      answeredAt: "2026-04-29T07:20:00Z",
      views: 190,
    },
  ],

  overview: {
    reviewsAwaitingReply: 4,
    medianResponseHours: 46,

    rating: 4.2,
    ratingSeries: series([4.3, 4.3, 4.25, 4.2, 4.2, 4.15, 4.2, 4.2, 4.15, 4.2, 4.2, 4.2]),

    avgRank: 6.1,
    rankSeries: series([7.2, 7.0, 7.1, 6.9, 6.8, 6.6, 6.7, 6.5, 6.4, 6.3, 6.2, 6.1]),

    aiVisibilityScore: 23,
    aiVisibilitySeries: series([4, 4, 6, 6, 9, 9, 12, 14, 16, 18, 21, 23]),

    profileScore: 39,

    reviewVolume: [
      { date: "2026-05-11", positive: 3, neutral: 1, negative: 0 },
      { date: "2026-05-18", positive: 2, neutral: 0, negative: 1 },
      { date: "2026-05-25", positive: 4, neutral: 1, negative: 0 },
      { date: "2026-06-01", positive: 3, neutral: 1, negative: 1 },
      { date: "2026-06-08", positive: 5, neutral: 0, negative: 0 },
      { date: "2026-06-15", positive: 4, neutral: 2, negative: 1 },
      { date: "2026-06-22", positive: 3, neutral: 1, negative: 0 },
      { date: "2026-06-29", positive: 6, neutral: 1, negative: 1 },
      { date: "2026-07-06", positive: 4, neutral: 2, negative: 1 },
      { date: "2026-07-13", positive: 5, neutral: 0, negative: 2 },
      { date: "2026-07-20", positive: 6, neutral: 1, negative: 1 },
      { date: "2026-07-27", positive: 4, neutral: 1, negative: 1 },
    ],
  },
};
