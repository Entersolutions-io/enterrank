import type { DemoBusiness } from "@/lib/types";
import { series } from "./weeks";

/**
 * Demo tenant 4 — a tavern in Split's Varoš, two streets from the Riva.
 *
 * The high-volume case. Five hundred reviews in four languages, the best profile of the five
 * datasets, and assistants already name it — which makes its two remaining leaks unusually
 * expensive: replies take two and a half days in season, and the menu is a PDF nobody can read,
 * so every dietary question is answered by a competitor.
 *
 * Names are invented, including every competitor and guest.
 */
export const restaurant: DemoBusiness = {
  id: "restaurant",
  label: { en: "Restaurant", hr: "Restoran" },
  story: {
    en: "Five hundred reviews, four languages, and replies that take two days in season.",
    hr: "Petsto recenzija, četiri jezika i odgovori koji u sezoni traju dva dana.",
  },
  icon: "UtensilsCrossed",
  initials: "KF",
  ownerName: "Marko Bulat",

  location: {
    id: "loc_9c78d",
    gbpLocationId: "locations/8271039485762013948",
    name: "Konoba Fjaka",
    category: { en: "Restaurant", hr: "Restoran" },
    address: "Šperun 12",
    city: "Split",
    country: "HR",
    lat: 43.5065,
    lng: 16.4363,
    phone: "+385 21 486 233",
    website: "https://konobafjaka.hr",
    rating: 4.7,
    reviewCount: 512,
    profileScore: 80,
    connectedAt: "2025-11-08T10:15:00Z",
  },

  competitors: [
    {
      id: "cmp_31",
      name: "Taverna Sv. Duje",
      rating: 4.5,
      reviewCount: 1310,
      avgRank: 1.8,
      aiVisibility: 79,
      distanceMeters: 700,
    },
    {
      id: "cmp_32",
      name: "Konoba Marjan",
      rating: 4.6,
      reviewCount: 890,
      avgRank: 2.1,
      aiVisibility: 66,
      distanceMeters: 450,
    },
    {
      id: "cmp_33",
      name: "Bistro Riva 7",
      rating: 4.4,
      reviewCount: 640,
      avgRank: 4.2,
      aiVisibility: 51,
      distanceMeters: 320,
    },
    {
      id: "cmp_34",
      name: "Restoran Sidro",
      rating: 4.8,
      reviewCount: 402,
      avgRank: 5.6,
      aiVisibility: 44,
      distanceMeters: 1200,
    },
    {
      id: "cmp_35",
      name: "Konoba Kamik",
      rating: 4.3,
      reviewCount: 228,
      avgRank: 8.3,
      aiVisibility: 19,
      distanceMeters: 1900,
    },
  ],

  competitorNote: {
    en: "You have the second-best rating on this list and everybody here is visible to assistants — in a tourist centre the travel sites cite all of you, so AI visibility is table stakes rather than an advantage. The separation is elsewhere. Taverna Sv. Duje publishes its menu as text with allergen labels and gets named for every dietary question asked about Split; you publish a photograph of a chalkboard and get named for none. That one file is most of the distance between their 79 and your 55.",
    hr: "Imate drugu najbolju ocjenu na ovom popisu i svi su ovdje vidljivi asistentima — u turističkom središtu putničke stranice citiraju sve vas, pa je AI vidljivost osnovni uvjet, a ne prednost. Razlika je drugdje. Taverna Sv. Duje objavljuje jelovnik kao tekst s oznakama alergena i spominje se u svakom pitanju o prehrani vezanom uz Split; vi objavljujete fotografiju ploče i ne spominjete se ni u jednom. Ta jedna datoteka čini najveći dio razlike između njihovih 79 i vaših 55.",
  },

  reviews: [
    {
      id: "rev_9e4f1",
      locationId: "loc_9c78d",
      author: "Katharina Brandt",
      rating: 2,
      text: {
        en: "We had a reservation for 20:00 and were seated at 20:40 with no explanation and no apology until we asked. The food was very good, which makes it worse — an hour of standing in an alley soured an evening that did not need to be soured.",
        hr: "Imali smo rezervaciju za 20 sati, a sjeli smo u 20:40 bez objašnjenja i bez isprike dok nismo pitali. Hrana je bila vrlo dobra, što stvar čini gorom — sat vremena stajanja u uličici pokvarilo je večer koja se nije trebala pokvariti.",
      },
      createdAt: "2026-07-27T22:10:00Z",
      status: "needs_reply",
      sentiment: "negative",
      sentimentConfidence: 0.95,
      intent: "wait_time",
      topics: ["reservation", "waiting time", "communication"],
    },
    {
      id: "rev_9e4f2",
      locationId: "loc_9c78d",
      author: "James Whitfield",
      rating: 5,
      text: {
        en: "Ante brought the whole tray of fish to the table, told us what came in that morning and what did not, and priced it before we ordered. Nowhere else in Split did that. The dentex was the best fish I have eaten in Croatia.",
        hr: "Ante je donio cijelu pladanj ribe za stol, rekao nam što je stiglo tog jutra, a što nije, i rekao cijenu prije nego što smo naručili. Nigdje drugdje u Splitu to nisu učinili. Zubatac je bio najbolja riba koju sam jeo u Hrvatskoj.",
      },
      createdAt: "2026-07-27T21:05:00Z",
      status: "needs_reply",
      sentiment: "positive",
      sentimentConfidence: 0.99,
      intent: "praise",
      topics: ["fresh fish", "staff: Ante", "pricing transparency"],
    },
    {
      id: "rev_9e4f3",
      locationId: "loc_9c78d",
      author: "Chiara Ferraro",
      rating: 4,
      text: {
        en: "Lovely place and the grilled vegetables were excellent. As a vegetarian I had to ask three times what I could actually eat, because the menu online is a photo of a chalkboard. Please put it in writing somewhere.",
        hr: "Krasno mjesto i povrće s roštilja bilo je izvrsno. Kao vegetarijanka morala sam tri puta pitati što uopće mogu jesti jer je jelovnik online fotografija ploče. Molim vas, napišite ga negdje.",
      },
      createdAt: "2026-07-26T20:30:00Z",
      status: "needs_reply",
      sentiment: "positive",
      sentimentConfidence: 0.72,
      intent: "question",
      topics: ["vegetarian", "menu", "information gap"],
    },
    {
      id: "rev_9e4f4",
      locationId: "loc_9c78d",
      author: "Dario Lučić",
      rating: 1,
      text: {
        en: "A cover charge appeared on the bill that is on no menu and nobody mentioned. Small money, but I do not like finding out what things cost after I have eaten them.",
        hr: "Na računu se pojavio couvert koji nije ni na jednom jelovniku i nitko ga nije spomenuo. Mali novac, ali ne volim doznati koliko nešto košta nakon što sam to pojeo.",
      },
      createdAt: "2026-07-25T21:50:00Z",
      status: "drafted",
      sentiment: "negative",
      sentimentConfidence: 0.96,
      intent: "pricing_concern",
      topics: ["cover charge", "bill transparency"],
      reply: {
        text: {
          en: "Dario, you are right — a charge that is not on the menu should not be on the bill. The couvert covers bread and olive oil and it is now printed at the top of the menu and mentioned when we take the order. It has been removed from your bill; contact us on +385 21 486 233 and we will return it whichever way suits you.",
          hr: "Dario, u pravu ste — stavka koje nema na jelovniku ne smije biti na računu. Couvert pokriva kruh i maslinovo ulje i sada je otisnut na vrhu jelovnika te se spominje pri uzimanju narudžbe. S vašeg je računa skinut; javite nam se na +385 21 486 233 i vratit ćemo ga kako vam odgovara.",
        },
        keywords: [],
        seoScore: 59,
        generatedAt: "2026-07-26T11:20:00Z",
        automated: false,
      },
    },
    {
      id: "rev_9e4f5",
      locationId: "loc_9c78d",
      author: "Vesna Mardešić",
      rating: 5,
      text: {
        en: "We come every winter when the tourists are gone and it is the same kitchen, same prices, same people. That is the whole test and Fjaka passes it.",
        hr: "Dolazimo svake zime kad turista nema i to je ista kuhinja, iste cijene, isti ljudi. To je cijeli test i Fjaka ga prolazi.",
      },
      createdAt: "2026-07-24T20:15:00Z",
      status: "answered",
      sentiment: "positive",
      sentimentConfidence: 0.98,
      intent: "praise",
      topics: ["off season", "consistency", "regulars"],
      reply: {
        text: {
          en: "Vesna, thank you — winter is the season we actually cook for. Same menu, same prices, and the terrace stays open with the heaters on. See you in November.",
          hr: "Vesna, hvala — zima je sezona za koju zapravo kuhamo. Isti jelovnik, iste cijene, a terasa ostaje otvorena uz grijalice. Vidimo se u studenom.",
        },
        keywords: ["konoba Split"],
        seoScore: 73,
        generatedAt: "2026-07-25T18:00:00Z",
        publishedAt: "2026-07-25T18:04:00Z",
        automated: true,
      },
    },
    {
      id: "rev_9e4f6",
      locationId: "loc_9c78d",
      author: "Nils Andersen",
      rating: 3,
      text: {
        en: "Food deserves five stars. The music on the terrace after 22:00 is loud enough that we gave up on conversation and asked for the bill early.",
        hr: "Hrana zaslužuje pet zvjezdica. Glazba na terasi nakon 22 sata dovoljno je glasna da smo odustali od razgovora i rano tražili račun.",
      },
      createdAt: "2026-07-23T23:20:00Z",
      status: "needs_reply",
      sentiment: "neutral",
      sentimentConfidence: 0.88,
      intent: "service_complaint",
      topics: ["noise", "terrace", "evening service"],
    },
    {
      id: "rev_9e4f7",
      locationId: "loc_9c78d",
      author: "A. B.",
      rating: 1,
      text: {
        en: "FOLLOW ME FOR TRAVEL DEALS best hotels in croatia link in bio!!!",
        hr: "PRATITE ME ZA PUTNE PONUDE najbolji hoteli u hrvatskoj poveznica u opisu!!!",
      },
      createdAt: "2026-07-22T03:40:00Z",
      status: "needs_reply",
      sentiment: "negative",
      sentimentConfidence: 0.59,
      intent: "spam",
      topics: [],
    },
    {
      id: "rev_9e4f8",
      locationId: "loc_9c78d",
      author: "Ivo Šegvić",
      rating: 5,
      text: {
        en: "No tourist menu, no photographs of the food on a board outside, no one waving you in from the street. In this part of Split that is almost a political statement.",
        hr: "Nema turističkog menija, nema fotografija hrane na ploči vani, nitko vas ne doziva s ulice. U ovom dijelu Splita to je gotovo politička izjava.",
      },
      createdAt: "2026-07-20T21:00:00Z",
      status: "answered",
      sentiment: "positive",
      sentimentConfidence: 0.97,
      intent: "praise",
      topics: ["authenticity", "no tourist menu"],
      reply: {
        text: {
          en: "Ivo, thank you. We cook one menu for everyone and the fish is whatever came in that morning — if we have to explain that on a board outside, something has already gone wrong. See you in Šperun.",
          hr: "Ivo, hvala. Kuhamo jedan jelovnik za sve, a riba je ona koja je tog jutra stigla — ako to moramo objašnjavati na ploči vani, nešto je već pošlo po zlu. Vidimo se u Šperunu.",
        },
        keywords: ["konoba Split", "Šperun"],
        seoScore: 76,
        generatedAt: "2026-07-21T19:40:00Z",
        publishedAt: "2026-07-21T19:42:00Z",
        automated: true,
      },
    },
    {
      id: "rev_9e4f9",
      locationId: "loc_9c78d",
      author: "Sophie Lambert",
      rating: 4,
      text: {
        en: "Excellent food and honest portions. Prices are higher than we expected for the old town, but nothing was hidden and the fish was weighed in front of us.",
        hr: "Izvrsna hrana i poštene porcije. Cijene su više nego što smo očekivali za stari grad, ali ništa nije bilo skriveno i riba je izvagana pred nama.",
      },
      createdAt: "2026-07-18T22:05:00Z",
      status: "answered",
      sentiment: "positive",
      sentimentConfidence: 0.91,
      intent: "pricing_concern",
      topics: ["pricing", "portions", "fish by weight"],
      reply: {
        text: {
          en: "Sophie, thank you — fish sold by weight is weighed at the table, always, and the price per kilo is on the board before you choose. It is the only way we know how to sell something whose cost changes every morning.",
          hr: "Sophie, hvala — riba koja se prodaje na kilogram vaga se za stolom, uvijek, a cijena po kilogramu stoji na ploči prije nego što odaberete. To je jedini način na koji znamo prodavati nešto čija se cijena mijenja svako jutro.",
        },
        keywords: ["seafood restaurant Split"],
        seoScore: 80,
        generatedAt: "2026-07-19T17:30:00Z",
        publishedAt: "2026-07-19T17:33:00Z",
        automated: true,
      },
    },
    {
      id: "rev_9e4g1",
      locationId: "loc_9c78d",
      author: "Tomislav Zorica",
      rating: 2,
      text: {
        en: "Booked through your website ten days ahead, got a confirmation email, and there was no reservation when we arrived. They found us a table eventually but the system clearly does not work.",
        hr: "Rezervirao sam preko vaše stranice deset dana ranije, dobio potvrdu e-poštom, a kad smo došli, rezervacije nije bilo. Na kraju su nam našli stol, ali sustav očito ne radi.",
      },
      createdAt: "2026-07-15T21:30:00Z",
      status: "answered",
      sentiment: "negative",
      sentimentConfidence: 0.94,
      intent: "service_complaint",
      topics: ["reservation system", "booking"],
      reply: {
        text: {
          en: "Tomislav, we are sorry. Bookings made more than a week ahead were not syncing to the evening sheet — a real fault, not an excuse, and it was fixed on 17 July. Every online booking is now confirmed twice: by email and by a call the day before. Please book again and ask for a terrace table on us.",
          hr: "Tomislave, žao nam je. Rezervacije napravljene više od tjedan dana unaprijed nisu se sinkronizirale s večernjim rasporedom — stvarna greška, ne izgovor, i ispravljena je 17. srpnja. Svaka online rezervacija sada se potvrđuje dvaput: e-poštom i pozivom dan ranije. Rezervirajte ponovno i tražite stol na terasi na naš račun.",
        },
        keywords: [],
        seoScore: 62,
        generatedAt: "2026-07-16T16:10:00Z",
        publishedAt: "2026-07-16T16:15:00Z",
        automated: false,
      },
    },
    {
      id: "rev_9e4g2",
      locationId: "loc_9c78d",
      author: "Marta Novosel",
      rating: 5,
      text: {
        en: "I am coeliac and the kitchen took it seriously — separate pan, separate board, and the waiter checked with the chef rather than guessing. That almost never happens.",
        hr: "Imam celijakiju i kuhinja je to shvatila ozbiljno — zasebna tava, zasebna daska, a konobar je provjerio s kuharom umjesto da nagađa. To se gotovo nikad ne događa.",
      },
      createdAt: "2026-07-12T20:40:00Z",
      status: "answered",
      sentiment: "positive",
      sentimentConfidence: 0.99,
      intent: "praise",
      topics: ["gluten free", "allergens", "kitchen"],
      reply: {
        text: {
          en: "Marta, thank you — allergens are the one thing we never improvise. Tell the waiter when you sit down and the kitchen works around it; nine of our dishes are naturally gluten free and two more can be adapted.",
          hr: "Marta, hvala — alergeni su jedina stvar oko koje nikad ne improviziramo. Recite konobaru čim sjednete i kuhinja se prilagodi; devet naših jela prirodno je bez glutena, a još dva mogu se prilagoditi.",
        },
        keywords: ["gluten free Split"],
        seoScore: 85,
        generatedAt: "2026-07-13T18:20:00Z",
        publishedAt: "2026-07-13T18:24:00Z",
        automated: true,
      },
    },
    {
      id: "rev_9e4g3",
      locationId: "loc_9c78d",
      author: "Peter Hoffmann",
      rating: 3,
      text: {
        en: "Took us twenty minutes to find it. The pin on the map puts you on the wrong side of the block and the alleys all look the same after dark.",
        hr: "Trebalo nam je dvadeset minuta da ga nađemo. Oznaka na karti stavlja vas na krivu stranu bloka, a uličice u mraku sve izgledaju isto.",
      },
      createdAt: "2026-07-09T21:15:00Z",
      status: "needs_reply",
      sentiment: "neutral",
      sentimentConfidence: 0.84,
      intent: "service_complaint",
      topics: ["location pin", "wayfinding", "Varoš"],
    },
  ],

  replyDrafts: {
    rev_9e4f1: {
      text: {
        en: "Katharina, forty minutes past a booked time is our failure, and saying nothing about it while you stood outside made it a worse one. We overbooked the 20:00 seating during the July peak and should have called you before you left the hotel. From this week the 20:00 sitting is capped and anyone waiting more than ten minutes gets a drink and a straight answer. Please write to us at Šperun 12 or call +385 21 486 233 — we would like you to have the evening you booked.",
        hr: "Katharina, četrdeset minuta nakon rezerviranog termina naš je propust, a to što nismo ništa rekli dok ste stajali vani učinilo ga je još većim. Prebukirali smo termin u 20 sati tijekom srpanjskog vrhunca i trebali smo vas nazvati prije nego što ste krenuli iz hotela. Od ovog tjedna termin u 20 sati je ograničen, a svatko tko čeka dulje od deset minuta dobiva piće i jasan odgovor. Molimo javite nam se na Šperun 12 ili na +385 21 486 233 — željeli bismo da imate večer kakvu ste rezervirali.",
      },
      keywords: ["konoba Split", "reservation"],
      seoScore: 81,
    },
    rev_9e4f2: {
      text: {
        en: "James, thank you — showing the tray and pricing the fish before you order is not a flourish, it is the only honest way to sell something caught that morning. Ante will be glad to read this. The dentex came from a boat that lands at Matejuška before seven; if you are back in Split, come early in the week when the catch is widest. See you at Šperun.",
        hr: "James, hvala — pokazivanje pladnja i cijena ribe prije narudžbe nije ukras, nego jedini pošten način prodaje nečega ulovljenog tog jutra. Anti će biti drago ovo pročitati. Zubatac je stigao s broda koji pristaje na Matejušku prije sedam; ako se vratite u Split, dođite početkom tjedna kad je izbor ulova najširi. Vidimo se u Šperunu.",
      },
      keywords: ["seafood restaurant Split", "konoba Split"],
      seoScore: 94,
    },
    rev_9e4f3: {
      text: {
        en: "Chiara, thank you — and having to ask three times is a fair complaint about us, not about the kitchen. The menu is now published as text on konobafjaka.hr with the vegetarian and gluten-free dishes marked, so nobody has to interrogate a waiter to eat. There are seven vegetarian dishes on it, and the grilled vegetables you liked are on the list all year.",
        hr: "Chiara, hvala — a to što ste morali triput pitati opravdana je pritužba na nas, ne na kuhinju. Jelovnik je sada objavljen kao tekst na konobafjaka.hr s označenim vegetarijanskim i bezglutenskim jelima, pa nitko ne mora ispitivati konobara da bi jeo. Na njemu je sedam vegetarijanskih jela, a povrće s roštilja koje vam se svidjelo na popisu je cijele godine.",
      },
      keywords: ["vegetarian restaurant Split", "menu"],
      seoScore: 89,
    },
    rev_9e4f6: {
      text: {
        en: "Nils, thank you for saying it plainly. The terrace speakers were set for a wedding party in June and never turned back down — that is on us. From this week music stops at 22:00 on the terrace and stays at conversation level before that. Come back and ask for the far end of the terrace; it is the quietest table we have.",
        hr: "Nils, hvala što ste to rekli otvoreno. Zvučnici na terasi bili su namješteni za svadbu u lipnju i nikad nisu vraćeni na tiše — to je do nas. Od ovog tjedna glazba na terasi prestaje u 22 sata, a prije toga ostaje na razini razgovora. Vratite se i tražite kraj terase; to je najtiši stol koji imamo.",
      },
      keywords: ["restaurant with terrace Split"],
      seoScore: 70,
    },
    rev_9e4f7: {
      text: {
        en: "This review does not relate to a visit to our restaurant. We have reported it to Google for removal.",
        hr: "Ova recenzija ne odnosi se na posjet našem restoranu. Prijavili smo je Googleu radi uklanjanja.",
      },
      keywords: [],
      seoScore: 9,
    },
    rev_9e4g3: {
      text: {
        en: "Peter, thank you — you are the fourth person to say it and the first we can actually fix it for. The map pin has been corrected to the Šperun entrance and we have added photographs of the doorway and the alley from both directions. If you are ever lost in Varoš again, call +385 21 486 233 and someone will walk out and find you.",
        hr: "Peter, hvala — vi ste četvrta osoba koja to kaže i prva kojoj to stvarno možemo popraviti. Oznaka na karti ispravljena je na ulaz iz Šperuna, a dodali smo i fotografije vrata i uličice iz oba smjera. Ako se ikad opet izgubite u Varošu, nazovite +385 21 486 233 i netko će izaći i pronaći vas.",
      },
      keywords: ["restaurant Split old town"],
      seoScore: 74,
    },
  },

  keywords: [
    {
      id: "kw_31",
      term: { en: "restaurant split old town", hr: "restoran stari grad split" },
      volume: 6600,
      avgRank: 3.8,
      delta: -1.1,
      top3Share: 0,
    },
    {
      id: "kw_32",
      term: { en: "konoba split", hr: "konoba split" },
      volume: 4400,
      avgRank: 2.2,
      delta: -0.5,
      top3Share: 0,
    },
    {
      id: "kw_33",
      term: { en: "seafood restaurant split", hr: "riblji restoran split" },
      volume: 3600,
      avgRank: 4.6,
      delta: -1.7,
      top3Share: 0,
    },
    {
      id: "kw_34",
      term: { en: "restaurant near riva split", hr: "restoran blizu rive split" },
      volume: 2900,
      avgRank: 5.9,
      delta: -0.8,
      top3Share: 0,
    },
    {
      id: "kw_35",
      term: { en: "restaurant with terrace split", hr: "restoran s terasom split" },
      volume: 1900,
      avgRank: 6.8,
      delta: 0.5,
      top3Share: 0,
    },
    {
      id: "kw_36",
      term: { en: "vegetarian restaurant split", hr: "vegetarijanski restoran split" },
      volume: 1400,
      avgRank: null,
      delta: 0,
      top3Share: 0,
    },
  ],

  scanHistory: [
    { date: "2026-05-05", atrs: 44.2 },
    { date: "2026-05-19", atrs: 47.8 },
    { date: "2026-06-02", atrs: 46.1 },
    { date: "2026-06-16", atrs: 51.3 },
    { date: "2026-06-30", atrs: 55.7 },
    { date: "2026-07-14", atrs: 58.2 },
    { date: "2026-07-28", atrs: 61.5 },
  ],

  probes: [
    {
      id: "probe_31",
      locationId: "loc_9c78d",
      prompt: {
        en: "best konoba in Split old town",
        hr: "najbolja konoba u starom gradu u Splitu",
      },
      visibilityScore: 86,
      delta: 6,
      results: [
        {
          engine: "chatgpt",
          mentioned: true,
          position: 2,
          competitorsNamed: ["Taverna Sv. Duje", "Konoba Marjan"],
          citedSources: ["tripadvisor.com", "google.com/maps", "konobafjaka.hr"],
          excerpt: {
            en: "…Konoba Fjaka on Šperun is repeatedly described as a place locals still use, with fish sold by weight and no tourist menu…",
            hr: "…Konoba Fjaka u Šperunu opetovano se opisuje kao mjesto koje mještani još koriste, s ribom na kilogram i bez turističkog menija…",
          },
          checkedAt: "2026-07-28T05:00:00Z",
        },
        {
          engine: "gemini",
          mentioned: true,
          position: 3,
          competitorsNamed: ["Taverna Sv. Duje", "Konoba Marjan", "Bistro Riva 7"],
          citedSources: ["google.com/maps", "tripadvisor.com"],
          excerpt: {
            en: "…Konoba Fjaka holds a 4.7 rating across more than 500 reviews, among the highest in the Varoš area…",
            hr: "…Konoba Fjaka ima ocjenu 4,7 na više od 500 recenzija, među najvišima u području Varoša…",
          },
          checkedAt: "2026-07-28T05:00:00Z",
        },
        {
          engine: "perplexity",
          mentioned: true,
          position: 2,
          competitorsNamed: ["Taverna Sv. Duje"],
          citedSources: ["tripadvisor.com", "reddit.com/r/croatia"],
          excerpt: {
            en: "…threads on eating in Split outside the tourist strip name Fjaka more often than any other tavern in Varoš…",
            hr: "…rasprave o jelu u Splitu izvan turističke zone spominju Fjaku češće od bilo koje druge konobe u Varošu…",
          },
          checkedAt: "2026-07-28T05:00:00Z",
        },
        {
          engine: "ai_overviews",
          mentioned: false,
          position: null,
          competitorsNamed: ["Taverna Sv. Duje", "Konoba Marjan"],
          citedSources: ["google.com/maps"],
          excerpt: {
            en: "…the highest-reviewed taverns near Diocletian's Palace are listed below…",
            hr: "…konobe s najviše recenzija blizu Dioklecijanove palače navedene su u nastavku…",
          },
          checkedAt: "2026-07-28T05:00:00Z",
        },
      ],
    },
    {
      id: "probe_32",
      locationId: "loc_9c78d",
      prompt: {
        en: "where to eat fresh fish in Split",
        hr: "gdje jesti svježu ribu u Splitu",
      },
      visibilityScore: 79,
      delta: 17,
      results: [
        {
          engine: "chatgpt",
          mentioned: true,
          position: 1,
          competitorsNamed: ["Restoran Sidro", "Taverna Sv. Duje"],
          citedSources: ["tripadvisor.com", "konobafjaka.hr", "google.com/maps"],
          excerpt: {
            en: "…reviewers of Konoba Fjaka consistently mention the fish tray being brought to the table and priced before ordering, which is unusual even in Split…",
            hr: "…recenzenti Konobe Fjaka dosljedno spominju pladanj s ribom koji se donosi na stol i cijenu prije narudžbe, što je neuobičajeno čak i u Splitu…",
          },
          checkedAt: "2026-07-28T05:00:00Z",
        },
        {
          engine: "gemini",
          mentioned: true,
          position: 3,
          competitorsNamed: ["Restoran Sidro", "Konoba Marjan"],
          citedSources: ["google.com/maps"],
          excerpt: {
            en: "…Konoba Fjaka is noted for daily catch rather than a fixed fish menu…",
            hr: "…Konoba Fjaka poznata je po dnevnom ulovu, a ne po fiksnom ribljem jelovniku…",
          },
          checkedAt: "2026-07-28T05:00:00Z",
        },
        {
          engine: "perplexity",
          mentioned: false,
          position: null,
          competitorsNamed: ["Restoran Sidro", "Taverna Sv. Duje", "Bistro Riva 7"],
          citedSources: ["tripadvisor.com"],
          excerpt: {
            en: "…Restoran Sidro publishes its daily catch online, which is the only verifiable source for what is available today…",
            hr: "…Restoran Sidro objavljuje dnevni ulov online, što je jedini provjerljiv izvor onoga što je danas dostupno…",
          },
          checkedAt: "2026-07-28T05:00:00Z",
        },
        {
          engine: "ai_overviews",
          mentioned: true,
          position: 2,
          competitorsNamed: ["Restoran Sidro"],
          citedSources: ["google.com/maps", "tripadvisor.com"],
          excerpt: {
            en: "…seafood options in central Split include Konoba Fjaka (4.7★, 512 reviews) on Šperun…",
            hr: "…mogućnosti za morsku hranu u centru Splita uključuju Konobu Fjaka (4,7★, 512 recenzija) u Šperunu…",
          },
          checkedAt: "2026-07-28T05:00:00Z",
        },
      ],
    },
    {
      id: "probe_33",
      locationId: "loc_9c78d",
      prompt: {
        en: "vegetarian or gluten free restaurant in Split",
        hr: "vegetarijanski ili bezglutenski restoran u Splitu",
      },
      visibilityScore: 0,
      delta: 0,
      results: [
        {
          engine: "chatgpt",
          mentioned: false,
          position: null,
          competitorsNamed: ["Taverna Sv. Duje", "Bistro Riva 7"],
          citedSources: ["tavernasvduje.hr", "tripadvisor.com"],
          excerpt: {
            en: "…Taverna Sv. Duje marks vegetarian and gluten-free dishes directly on its published menu, which makes it the safest recommendation…",
            hr: "…Taverna Sv. Duje označava vegetarijanska i bezglutenska jela izravno na objavljenom jelovniku, što je čini najsigurnijom preporukom…",
          },
          checkedAt: "2026-07-28T05:00:00Z",
        },
        {
          engine: "gemini",
          mentioned: false,
          position: null,
          competitorsNamed: ["Bistro Riva 7", "Taverna Sv. Duje"],
          citedSources: ["google.com/maps"],
          excerpt: {
            en: "…two restaurants in the old town list dietary options on their profiles; most publish menus as images…",
            hr: "…dva restorana u starom gradu navode prehrambene opcije na svojim profilima; većina objavljuje jelovnike kao slike…",
          },
          checkedAt: "2026-07-28T05:00:00Z",
        },
        {
          engine: "perplexity",
          mentioned: false,
          position: null,
          competitorsNamed: ["Taverna Sv. Duje", "Konoba Marjan"],
          citedSources: ["tripadvisor.com", "happycow.net"],
          excerpt: {
            en: "…dedicated vegetarian listings for Split do not include any tavern in Varoš…",
            hr: "…namjenski vegetarijanski popisi za Split ne uključuju nijednu konobu u Varošu…",
          },
          checkedAt: "2026-07-28T05:00:00Z",
        },
        {
          engine: "ai_overviews",
          mentioned: false,
          position: null,
          competitorsNamed: ["Taverna Sv. Duje"],
          citedSources: ["google.com/maps"],
          excerpt: {
            en: "…check the restaurant's menu directly, as dietary information is rarely listed on profiles here…",
            hr: "…provjerite jelovnik restorana izravno jer se podaci o prehrani ovdje rijetko navode na profilima…",
          },
          checkedAt: "2026-07-28T05:00:00Z",
        },
      ],
    },
    {
      id: "probe_34",
      locationId: "loc_9c78d",
      prompt: {
        en: "quiet restaurant with a terrace near the Riva",
        hr: "miran restoran s terasom blizu rive",
      },
      visibilityScore: 55,
      delta: -11,
      results: [
        {
          engine: "chatgpt",
          mentioned: true,
          position: 4,
          competitorsNamed: ["Restoran Sidro", "Konoba Kamik", "Konoba Marjan"],
          citedSources: ["tripadvisor.com", "google.com/maps"],
          excerpt: {
            en: "…Konoba Fjaka has a small terrace, though recent reviews mention music volume in the evening…",
            hr: "…Konoba Fjaka ima malu terasu, iako novije recenzije spominju glasnoću glazbe navečer…",
          },
          checkedAt: "2026-07-28T05:00:00Z",
        },
        {
          engine: "gemini",
          mentioned: false,
          position: null,
          competitorsNamed: ["Restoran Sidro", "Konoba Kamik"],
          citedSources: ["google.com/maps"],
          excerpt: {
            en: "…for a quieter evening, options away from the Riva itself are usually recommended…",
            hr: "…za mirniju večer obično se preporučuju opcije podalje od same rive…",
          },
          checkedAt: "2026-07-28T05:00:00Z",
        },
        {
          engine: "perplexity",
          mentioned: true,
          position: 5,
          competitorsNamed: ["Restoran Sidro", "Konoba Marjan"],
          citedSources: ["tripadvisor.com"],
          excerpt: {
            en: "…Fjaka is named for food rather than atmosphere in the threads discussing quiet dinners…",
            hr: "…Fjaka se u raspravama o mirnim večerama navodi zbog hrane, a ne zbog ugođaja…",
          },
          checkedAt: "2026-07-28T05:00:00Z",
        },
        {
          engine: "ai_overviews",
          mentioned: false,
          position: null,
          competitorsNamed: ["Restoran Sidro"],
          citedSources: ["google.com/maps"],
          excerpt: {
            en: "…noise levels are frequently mentioned in reviews of terraces in this area…",
            hr: "…razina buke često se spominje u recenzijama terasa u ovom području…",
          },
          checkedAt: "2026-07-28T05:00:00Z",
        },
      ],
    },
  ],

  aeoActions: [
    {
      id: "aeo_31",
      title: {
        en: "Publish the menu as text, with allergens marked",
        hr: "Objavite jelovnik kao tekst, s označenim alergenima",
      },
      detail: {
        en: "Your menu is an image, so no assistant can read it. All four named a competitor for the dietary question — and your own kitchen handles coeliacs better than theirs does, according to a five-star review from July.",
        hr: "Vaš je jelovnik slika pa ga nijedan asistent ne može pročitati. Sva četiri su za pitanje o prehrani navela konkurenta — a vaša kuhinja s celijakijom postupa bolje od njihove, prema recenziji s pet zvjezdica iz srpnja.",
      },
      impact: "high",
      effort: "medium",
    },
    {
      id: "aeo_32",
      title: {
        en: "Answer reviews within 48 hours through the season",
        hr: "Odgovarajte na recenzije unutar 48 sati kroz sezonu",
      },
      detail: {
        en: "The median is 62 hours in July, and assistants weight recency of owner responses. Six reviews are open right now, two of them negative and both fixable in a paragraph.",
        hr: "Medijan je 62 sata u srpnju, a asistenti vrednuju svježinu odgovora vlasnika. Šest recenzija trenutno je otvoreno, dvije negativne i obje rješive u jednom odlomku.",
      },
      impact: "high",
      effort: "medium",
    },
    {
      id: "aeo_33",
      title: {
        en: "Publish the daily catch, even as one line",
        hr: "Objavljujte dnevni ulov, makar u jednom retku",
      },
      detail: {
        en: "The one assistant that skipped you for fish cited a competitor's daily catch page. You already write it on a board every morning; photographing it to the profile costs a minute.",
        hr: "Jedini asistent koji vas je preskočio za ribu citirao je konkurentovu stranicu s dnevnim ulovom. Vi ga ionako svako jutro pišete na ploču; fotografirati ga na profil traje minutu.",
      },
      impact: "medium",
      effort: "low",
    },
    {
      id: "aeo_34",
      title: {
        en: "Correct the map pin and add doorway photos",
        hr: "Ispravite oznaku na karti i dodajte fotografije ulaza",
      },
      detail: {
        en: "Four reviews mention not finding the entrance, and “quiet terrace” visibility fell 11 points this month partly on those. A wrong pin is the cheapest ranking problem there is to fix.",
        hr: "Četiri recenzije spominju da nisu mogli pronaći ulaz, a vidljivost za „mirnu terasu“ ovaj je mjesec pala 11 bodova dijelom zbog toga. Kriva oznaka najjeftiniji je problem s rangiranjem koji se može riješiti.",
      },
      impact: "medium",
      effort: "low",
    },
  ],

  brandVoice: {
    locationId: "loc_9c78d",
    formality: 34,
    warmth: 68,
    bannedWords: ["authentic experience", "hidden gem", "best in Dalmatia", "tourist menu"],
    preferredPhrases: ["see you at Šperun", "thank you for telling us", "whatever came in that morning"],
    targetKeywords: [
      "konoba Split",
      "seafood restaurant Split",
      "restaurant Split old town",
      "Šperun",
      "restaurant with terrace Split",
    ],
    signature: "— Marko and the Konoba Fjaka kitchen",
    autoPublishAtOrAbove: 4,
  },

  voicePreview: {
    casualWarm: {
      en: "Ivo, thank you so much — one menu for everyone and whatever came in that morning, that is the whole idea! See you in Šperun.",
      hr: "Ivo, puno hvala — jedan jelovnik za sve i ono što je tog jutra stiglo, u tome je cijela ideja! Vidimo se u Šperunu.",
    },
    casualConcise: {
      en: "Ivo, thanks — one menu, one price, whatever came in that morning.",
      hr: "Ivo, hvala — jedan jelovnik, jedna cijena, ono što je tog jutra stiglo.",
    },
    formalWarm: {
      en: "Ivo, thank you. We cook one menu for everyone and the fish is whatever came in that morning. See you in Šperun.",
      hr: "Ivo, hvala. Kuhamo jedan jelovnik za sve, a riba je ona koja je tog jutra stigla. Vidimo se u Šperunu.",
    },
    formalConcise: {
      en: "Thank you for your review. We serve a single menu and the fish is whatever the boats bring in that morning.",
      hr: "Hvala na vašoj recenziji. Poslužujemo jedan jelovnik, a riba je ona koju brodovi donesu tog jutra.",
    },
  },

  profileChecks: [
    {
      id: "chk_31",
      label: { en: "Business hours set for every day", hr: "Radno vrijeme postavljeno za svaki dan" },
      weight: 10,
      passed: true,
      hint: {
        en: "Summer and winter hours are both set, including the Monday close out of season.",
        hr: "Postavljeno je i ljetno i zimsko radno vrijeme, uključujući zatvaranje ponedjeljkom izvan sezone.",
      },
    },
    {
      id: "chk_32",
      label: {
        en: "Holiday hours for the next 90 days",
        hr: "Blagdansko radno vrijeme za idućih 90 dana",
      },
      weight: 6,
      passed: true,
      hint: {
        en: "August holidays are set, including 15 August when the old town is at its busiest.",
        hr: "Kolovoški blagdani su postavljeni, uključujući 15. kolovoza kad je stari grad najposjećeniji.",
      },
    },
    {
      id: "chk_33",
      label: {
        en: "Menu published as text with allergens",
        hr: "Jelovnik objavljen kao tekst s alergenima",
      },
      weight: 14,
      passed: false,
      hint: {
        en: "The menu is a photograph of a chalkboard. Assistants cannot read it, and neither can a guest looking for gluten-free at 21:00.",
        hr: "Jelovnik je fotografija ploče. Asistenti ga ne mogu pročitati, a ni gost koji u 21 sat traži nešto bez glutena.",
      },
    },
    {
      id: "chk_34",
      label: { en: "At least 20 photos uploaded", hr: "Najmanje 20 učitanih fotografija" },
      weight: 12,
      passed: true,
      hint: {
        en: "186 photos, most of them from guests. The terrace and the doorway are the two views missing.",
        hr: "186 fotografija, većina od gostiju. Nedostaju dva prizora: terasa i ulaz.",
      },
    },
    {
      id: "chk_35",
      label: { en: "Photos added in the last 30 days", hr: "Fotografije dodane u zadnjih 30 dana" },
      weight: 8,
      passed: true,
      hint: {
        en: "Nine uploads this month, mostly the daily catch.",
        hr: "Devet učitavanja ovaj mjesec, uglavnom dnevni ulov.",
      },
    },
    {
      id: "chk_36",
      label: {
        en: "Description mentions primary service area",
        hr: "Opis spominje primarno područje usluge",
      },
      weight: 11,
      passed: true,
      hint: {
        en: "Varoš, Šperun and the old town all appear in the description.",
        hr: "Varoš, Šperun i stari grad pojavljuju se u opisu.",
      },
    },
    {
      id: "chk_37",
      label: { en: "Every profile question answered", hr: "Odgovoreno na svako pitanje na profilu" },
      weight: 11,
      passed: true,
      hint: {
        en: "All five answered, four of them within a day.",
        hr: "Svih pet odgovoreno, četiri unutar jednog dana.",
      },
    },
    {
      id: "chk_38",
      label: { en: "Posted in the last 7 days", hr: "Objavljeno u zadnjih 7 dana" },
      weight: 10,
      passed: true,
      hint: {
        en: "The daily catch post goes out most mornings in season.",
        hr: "Objava o dnevnom ulovu izlazi većinu jutara u sezoni.",
      },
    },
    {
      id: "chk_39",
      label: { en: "Reservation link connected", hr: "Poveznica za rezervaciju povezana" },
      weight: 12,
      passed: true,
      hint: {
        en: "Bookings route to konobafjaka.hr/rezervacije. The long-lead sync fault was fixed on 17 July.",
        hr: "Rezervacije idu na konobafjaka.hr/rezervacije. Greška sinkronizacije za daleke termine ispravljena je 17. srpnja.",
      },
    },
    {
      id: "chk_40",
      label: { en: "Reviews answered within 48 hours", hr: "Odgovoreno na recenzije unutar 48 sati" },
      weight: 6,
      passed: false,
      hint: {
        en: "Median response time is 62 hours in July, against 18 in February. Volume, not indifference — but it reads the same to a guest.",
        hr: "Medijan vremena odgovora u srpnju je 62 sata, naspram 18 u veljači. Riječ je o količini, ne nezainteresiranosti — ali gostu to izgleda isto.",
      },
    },
  ],

  posts: [
    {
      id: "post_31",
      locationId: "loc_9c78d",
      title: { en: "Today from the boats", hr: "Danas s brodova" },
      body: {
        en: "Dentex, gilt-head bream and a small amount of scampi. Prices per kilo are on the board by the door, as always. When it is gone we cook something else.",
        hr: "Zubatac, komarča i nešto malo škampa. Cijene po kilogramu su na ploči kraj vrata, kao i uvijek. Kad nestane, kuhamo nešto drugo.",
      },
      cta: "none",
      status: "published",
      scheduledFor: "2026-07-26T06:30:00Z",
      publishedAt: "2026-07-26T06:30:00Z",
      metrics: { views: 2894, clicks: 176 },
      image: null,
    },
    {
      id: "post_32",
      locationId: "loc_9c78d",
      title: { en: "The menu is now readable online", hr: "Jelovnik je sada čitljiv online" },
      body: {
        en: "Written out properly at last, with vegetarian and gluten-free dishes marked. Seven vegetarian, nine naturally gluten free. A guest asked for this and she was right.",
        hr: "Napokon uredno napisan, s označenim vegetarijanskim i bezglutenskim jelima. Sedam vegetarijanskih, devet prirodno bez glutena. Jedna gošća je to tražila i bila je u pravu.",
      },
      cta: "learn_more",
      status: "scheduled",
      scheduledFor: "2026-07-30T07:00:00Z",
      image: null,
    },
    {
      id: "post_33",
      locationId: "loc_9c78d",
      title: { en: "Music stops at 22:00 on the terrace", hr: "Glazba na terasi prestaje u 22 sata" },
      body: {
        en: "The speakers were set for a wedding in June and stayed loud. They are back to conversation level, and after 22:00 there is no music at all.",
        hr: "Zvučnici su bili namješteni za svadbu u lipnju i ostali glasni. Vraćeni su na razinu razgovora, a nakon 22 sata glazbe nema uopće.",
      },
      cta: "none",
      status: "draft",
      scheduledFor: "2026-08-01T07:00:00Z",
      image: null,
    },
    {
      id: "post_34",
      locationId: "loc_9c78d",
      title: { en: "Booking more than a week ahead works again", hr: "Rezervacija više od tjedan dana unaprijed opet radi" },
      body: {
        en: "Long-lead reservations were not reaching the evening sheet. Fixed on 17 July, and every online booking now gets a call the day before as well.",
        hr: "Rezervacije za daleke termine nisu stizale do večernjeg rasporeda. Ispravljeno 17. srpnja, a svaka online rezervacija sada dobiva i poziv dan ranije.",
      },
      cta: "book",
      status: "published",
      scheduledFor: "2026-07-18T07:00:00Z",
      publishedAt: "2026-07-18T07:00:00Z",
      metrics: { views: 1730, clicks: 245 },
      image: null,
    },
    {
      id: "post_35",
      locationId: "loc_9c78d",
      title: { en: "Same menu in January", hr: "Isti jelovnik u siječnju" },
      body: {
        en: "We do not have a summer price list and a winter one. Whatever you paid in August you pay in February, with fewer people between you and the sea.",
        hr: "Nemamo ljetni i zimski cjenik. Što ste platili u kolovozu, platit ćete i u veljači, uz manje ljudi između vas i mora.",
      },
      cta: "none",
      status: "published",
      scheduledFor: "2026-06-11T07:00:00Z",
      publishedAt: "2026-06-11T07:00:00Z",
      metrics: { views: 4218, clicks: 312 },
      image: null,
    },
  ],

  questions: [
    {
      id: "qst_31",
      locationId: "loc_9c78d",
      author: "Helena V.",
      question: {
        en: "Do you take reservations for large groups?",
        hr: "Primate li rezervacije za veće grupe?",
      },
      askedAt: "2026-07-14T09:30:00Z",
      answer: {
        en: "Up to twelve people inside, up to eight on the terrace. For anything larger, call us and we will see what the evening allows.",
        hr: "Do dvanaest osoba unutra, do osam na terasi. Za veće grupe nazovite nas i vidjet ćemo što večer dopušta.",
      },
      answeredAt: "2026-07-14T18:40:00Z",
      views: 388,
    },
    {
      id: "qst_32",
      locationId: "loc_9c78d",
      author: "Robert S.",
      question: {
        en: "Is the fish fresh or frozen?",
        hr: "Je li riba svježa ili smrznuta?",
      },
      askedAt: "2026-06-22T11:15:00Z",
      answer: {
        en: "Fresh, bought at Matejuška each morning. Anything frozen is marked on the menu as required by law — currently only the calamari out of season.",
        hr: "Svježa, kupljena na Matejušci svako jutro. Sve smrznuto označeno je na jelovniku kako zakon nalaže — trenutno samo lignje izvan sezone.",
      },
      answeredAt: "2026-06-22T14:05:00Z",
      views: 612,
    },
    {
      id: "qst_33",
      locationId: "loc_9c78d",
      author: "Andrea M.",
      question: {
        en: "Are dogs allowed on the terrace?",
        hr: "Jesu li psi dopušteni na terasi?",
      },
      askedAt: "2026-06-30T16:20:00Z",
      answer: {
        en: "Yes, on the terrace, and there is a water bowl by the door.",
        hr: "Da, na terasi, a kraj vrata stoji zdjelica s vodom.",
      },
      answeredAt: "2026-07-01T08:10:00Z",
      views: 204,
    },
    {
      id: "qst_34",
      locationId: "loc_9c78d",
      author: "Luka B.",
      question: {
        en: "Can you get there by car or is it pedestrian only?",
        hr: "Može li se doći autom ili je samo za pješake?",
      },
      askedAt: "2026-05-19T13:45:00Z",
      answer: {
        en: "Pedestrian only. The nearest parking is the garage under the Riva, about seven minutes on foot.",
        hr: "Samo pješice. Najbliži parking je garaža ispod rive, oko sedam minuta hoda.",
      },
      answeredAt: "2026-05-19T17:30:00Z",
      views: 471,
    },
    {
      id: "qst_35",
      locationId: "loc_9c78d",
      author: "Nina P.",
      question: {
        en: "Do you have anything for children?",
        hr: "Imate li nešto za djecu?",
      },
      askedAt: "2026-07-06T12:00:00Z",
      answer: {
        en: "Smaller portions of anything on the menu at a lower price, and the kitchen will grill plain fish or make pasta without sauce on request.",
        hr: "Manje porcije bilo čega s jelovnika po nižoj cijeni, a kuhinja će na zahtjev ispeći ribu bez dodataka ili napraviti tjesteninu bez umaka.",
      },
      answeredAt: "2026-07-07T09:20:00Z",
      views: 259,
    },
  ],

  overview: {
    reviewsAwaitingReply: 6,
    medianResponseHours: 62,

    rating: 4.7,
    ratingSeries: series([4.6, 4.65, 4.65, 4.7, 4.7, 4.7, 4.75, 4.7, 4.7, 4.7, 4.65, 4.7]),

    avgRank: 3.9,
    rankSeries: series([5.8, 5.5, 5.6, 5.1, 4.9, 4.7, 4.6, 4.4, 4.3, 4.1, 4.0, 3.9]),

    // The mean of the four probe scores above, the same way every other tenant's is.
    aiVisibilityScore: 55,
    aiVisibilitySeries: series([38, 40, 39, 43, 45, 44, 48, 50, 51, 53, 54, 55]),

    profileScore: 80,

    reviewVolume: [
      { date: "2026-05-11", positive: 14, neutral: 2, negative: 1 },
      { date: "2026-05-18", positive: 17, neutral: 3, negative: 2 },
      { date: "2026-05-25", positive: 21, neutral: 2, negative: 1 },
      { date: "2026-06-01", positive: 24, neutral: 4, negative: 2 },
      { date: "2026-06-08", positive: 28, neutral: 3, negative: 3 },
      { date: "2026-06-15", positive: 31, neutral: 5, negative: 2 },
      { date: "2026-06-22", positive: 36, neutral: 4, negative: 4 },
      { date: "2026-06-29", positive: 42, neutral: 6, negative: 3 },
      { date: "2026-07-06", positive: 47, neutral: 5, negative: 5 },
      { date: "2026-07-13", positive: 51, neutral: 7, negative: 4 },
      { date: "2026-07-20", positive: 46, neutral: 6, negative: 6 },
      { date: "2026-07-27", positive: 44, neutral: 5, negative: 5 },
    ],
  },
};
