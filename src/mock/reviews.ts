import type { ReplyGenerationStage, Review } from "@/lib/types";

/**
 * Review inbox fixtures. The mix is deliberate: mostly positive with a few sharp negatives,
 * a spam entry and one ambiguous case with low sentiment confidence — so every state the
 * inbox can render has something to render.
 */
export const reviews: Review[] = [
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
];

/** The visible steps of the reply pipeline. Durations drive the composer's staged animation. */
export const replyStages: ReplyGenerationStage[] = [
  {
    id: "analyze",
    label: { en: "Analysing sentiment and intent", hr: "Analiza sentimenta i namjere" },
    durationMs: 900,
  },
  {
    id: "voice",
    label: { en: "Loading brand voice profile", hr: "Učitavanje profila glasa marke" },
    durationMs: 700,
  },
  {
    id: "keywords",
    label: { en: "Selecting local keywords", hr: "Odabir lokalnih ključnih riječi" },
    durationMs: 800,
  },
  {
    id: "compose",
    label: { en: "Composing reply", hr: "Sastavljanje odgovora" },
    durationMs: 600,
  },
];

/**
 * Pre-written drafts keyed by review id, served when a draft is requested. In production this
 * is where the model call would go; the surrounding pipeline and scoring stay identical.
 */
export const replyDrafts: Record<
  string,
  { text: { en: string; hr: string }; keywords: string[]; seoScore: number }
> = {
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
};
