import type { LegalDocument } from "@/components/legal/legal-page";

const UPDATED = "2026-07-14";

export const privacy: LegalDocument = {
  title: { en: "Privacy Policy", hr: "Pravila privatnosti" },
  updated: UPDATED,
  intro: {
    en: "This policy explains what EnterRank collects, why, and what you can ask us to do about it. It covers both our website and the application.",
    hr: "Ova pravila objašnjavaju što EnterRank prikuplja, zašto i što od nas možete zatražiti u vezi s tim. Obuhvaćaju i našu web stranicu i aplikaciju.",
  },
  sections: [
    {
      heading: { en: "Who we are", hr: "Tko smo mi" },
      paragraphs: [
        {
          en: "EnterRank is operated by EnterSolutions. For questions about this policy, contact hello@enterrank.io.",
          hr: "EnterRank vodi EnterSolutions. Za pitanja o ovim pravilima obratite se na hello@enterrank.io.",
        },
      ],
    },
    {
      heading: { en: "What we collect", hr: "Što prikupljamo" },
      paragraphs: [
        {
          en: "We collect only what the service needs to function:",
          hr: "Prikupljamo samo ono što je usluzi potrebno za rad:",
        },
      ],
      bullets: [
        {
          en: "Account data — name, email address and workspace settings.",
          hr: "Podaci o računu — ime, adresa e-pošte i postavke radnog prostora.",
        },
        {
          en: "Google Business Profile data you authorise us to read — reviews, posts, questions and insights for the locations you connect.",
          hr: "Podaci Google poslovnog profila koje nam dopustite čitati — recenzije, objave, pitanja i uvidi za lokacije koje povežete.",
        },
        {
          en: "Ranking and visibility measurements we generate on your behalf.",
          hr: "Mjerenja rangiranja i vidljivosti koja generiramo u vaše ime.",
        },
        {
          en: "Technical logs — IP address, browser and timestamps, retained for 30 days for security and debugging.",
          hr: "Tehnički zapisi — IP adresa, preglednik i vremenske oznake, čuvaju se 30 dana radi sigurnosti i otklanjanja pogrešaka.",
        },
      ],
    },
    {
      heading: { en: "What we do not collect", hr: "Što ne prikupljamo" },
      paragraphs: [
        {
          en: "We do not collect payment card numbers — payments are handled by our payment processor and we never see the card. We do not buy personal data from third parties, and we do not sell or rent your data to anyone.",
          hr: "Ne prikupljamo brojeve platnih kartica — plaćanja obrađuje naš procesor plaćanja i mi nikada ne vidimo karticu. Ne kupujemo osobne podatke od trećih strana i ne prodajemo niti iznajmljujemo vaše podatke nikome.",
        },
      ],
    },
    {
      heading: { en: "Legal basis", hr: "Pravna osnova" },
      paragraphs: [
        {
          en: "We process account and profile data to perform our contract with you. We process technical logs on the basis of our legitimate interest in keeping the service secure and working. Where we rely on consent — such as optional analytics — you can withdraw it at any time.",
          hr: "Podatke o računu i profilu obrađujemo radi izvršenja ugovora s vama. Tehničke zapise obrađujemo na temelju našeg legitimnog interesa da usluga bude sigurna i funkcionalna. Ondje gdje se oslanjamo na privolu — primjerice za neobveznu analitiku — možete je povući u svakom trenutku.",
        },
      ],
    },
    {
      heading: { en: "Sub-processors", hr: "Podobrađivači" },
      paragraphs: [
        {
          en: "We use a small number of providers to run the service: a cloud host in the EU, an email delivery provider, an error-tracking service, and the AI providers whose models generate reply drafts. Each is bound by a data processing agreement. The current list is available on request.",
          hr: "Za rad usluge koristimo mali broj pružatelja: pružatelja usluga u oblaku u EU, pružatelja isporuke e-pošte, uslugu praćenja pogrešaka i pružatelje AI-ja čiji modeli generiraju nacrte odgovora. Svaki je vezan ugovorom o obradi podataka. Aktualni popis dostupan je na zahtjev.",
        },
      ],
    },
    {
      heading: { en: "Retention", hr: "Čuvanje" },
      paragraphs: [
        {
          en: "Workspace data is kept for as long as your account is active. After cancellation we keep it for 30 days so you can change your mind, then delete it. Technical logs are deleted after 30 days. Invoices are kept for as long as tax law requires.",
          hr: "Podaci radnog prostora čuvaju se dok je vaš račun aktivan. Nakon otkazivanja čuvamo ih 30 dana kako biste se mogli predomisliti, a zatim ih brišemo. Tehnički zapisi brišu se nakon 30 dana. Računi se čuvaju onoliko dugo koliko zahtijeva porezni propis.",
        },
      ],
    },
    {
      heading: { en: "Your rights", hr: "Vaša prava" },
      paragraphs: [
        {
          en: "You can ask us to give you a copy of your data, correct it, delete it, or stop processing it. Write to hello@enterrank.io and we will respond within 30 days. If you are unhappy with our response you may complain to your national data protection authority.",
          hr: "Možete od nas zatražiti kopiju svojih podataka, njihov ispravak, brisanje ili prestanak obrade. Pišite na hello@enterrank.io i odgovorit ćemo unutar 30 dana. Ako niste zadovoljni našim odgovorom, možete se žaliti nacionalnom tijelu za zaštitu podataka.",
        },
      ],
    },
  ],
};

export const terms: LegalDocument = {
  title: { en: "Terms of Service", hr: "Uvjeti korištenja" },
  updated: UPDATED,
  intro: {
    en: "These terms govern your use of EnterRank. By creating a workspace you agree to them.",
    hr: "Ovi uvjeti uređuju vaše korištenje EnterRanka. Stvaranjem radnog prostora prihvaćate ih.",
  },
  sections: [
    {
      heading: { en: "The service", hr: "Usluga" },
      paragraphs: [
        {
          en: "EnterRank measures your visibility in local search and AI assistants, and helps you respond to reviews. We provide it on a subscription basis and improve it continuously.",
          hr: "EnterRank mjeri vašu vidljivost u lokalnom pretraživanju i AI asistentima te vam pomaže odgovarati na recenzije. Pružamo ga na pretplatničkoj osnovi i kontinuirano ga unapređujemo.",
        },
      ],
    },
    {
      heading: { en: "Your account", hr: "Vaš račun" },
      paragraphs: [
        {
          en: "You are responsible for keeping your credentials and API keys secure, and for everything done through your workspace. Tell us promptly if you believe a key has been exposed and we will revoke it.",
          hr: "Odgovorni ste za sigurnost svojih vjerodajnica i API ključeva te za sve učinjeno putem vašeg radnog prostora. Odmah nas obavijestite ako smatrate da je ključ otkriven i opozvat ćemo ga.",
        },
      ],
    },
    {
      heading: { en: "Acceptable use", hr: "Prihvatljivo korištenje" },
      paragraphs: [
        {
          en: "You may not use EnterRank to publish content you know to be false, to impersonate another business, to post reviews of your own business, or to attempt to manipulate a review platform against its own rules.",
          hr: "EnterRank ne smijete koristiti za objavu sadržaja za koji znate da je neistinit, za lažno predstavljanje druge tvrtke, za objavu recenzija vlastite tvrtke ili za pokušaj manipulacije platformom za recenzije protivno njezinim pravilima.",
        },
      ],
    },
    {
      heading: { en: "Generated content", hr: "Generirani sadržaj" },
      paragraphs: [
        {
          en: "Reply drafts are suggestions. You decide what gets published and you remain responsible for it. We recommend reading every draft before it goes out, and the product is built so that nothing is published without an approval step you control.",
          hr: "Nacrti odgovora su prijedlozi. Vi odlučujete što se objavljuje i za to ostajete odgovorni. Preporučujemo da pročitate svaki nacrt prije objave, a proizvod je izgrađen tako da se ništa ne objavljuje bez koraka odobrenja koji vi kontrolirate.",
        },
      ],
    },
    {
      heading: { en: "No ranking guarantee", hr: "Bez jamstva rangiranja" },
      paragraphs: [
        {
          en: "We measure and advise. We do not control Google, and nobody can guarantee a ranking position or that an AI assistant will name your business. Any projection in the product is an estimate, not a promise.",
          hr: "Mi mjerimo i savjetujemo. Ne kontroliramo Google i nitko ne može jamčiti poziciju u rangiranju niti da će AI asistent spomenuti vašu tvrtku. Svaka projekcija u proizvodu je procjena, a ne obećanje.",
        },
      ],
    },
    {
      heading: { en: "Billing and cancellation", hr: "Naplata i otkazivanje" },
      paragraphs: [
        {
          en: "Subscriptions are billed monthly or annually in advance in euro. You can cancel at any time and your workspace stays available until the end of the paid period. We do not pro-rate partial months.",
          hr: "Pretplate se naplaćuju mjesečno ili godišnje unaprijed u eurima. Možete otkazati u bilo kojem trenutku, a vaš radni prostor ostaje dostupan do kraja plaćenog razdoblja. Ne obračunavamo razmjerno nepotpune mjesece.",
        },
      ],
    },
    {
      heading: { en: "Liability", hr: "Odgovornost" },
      paragraphs: [
        {
          en: "To the extent permitted by law, our total liability in any twelve-month period is limited to the fees you paid us in that period. We are not liable for indirect or consequential loss.",
          hr: "U mjeri dopuštenoj zakonom, naša ukupna odgovornost u bilo kojem razdoblju od dvanaest mjeseci ograničena je na naknade koje ste nam platili u tom razdoblju. Ne odgovaramo za neizravnu ili posljedičnu štetu.",
        },
      ],
    },
  ],
};

export const cookies: LegalDocument = {
  title: { en: "Cookie Policy", hr: "Pravila o kolačićima" },
  updated: UPDATED,
  intro: {
    en: "We use very few cookies, and none of them are for advertising.",
    hr: "Koristimo vrlo malo kolačića i nijedan od njih nije za oglašavanje.",
  },
  sections: [
    {
      heading: { en: "Strictly necessary", hr: "Strogo nužni" },
      paragraphs: [
        {
          en: "A session cookie keeps you signed in, and a CSRF token protects form submissions. These cannot be switched off without breaking the application, and they are not used to track you.",
          hr: "Kolačić sesije održava vas prijavljenima, a CSRF token štiti slanje obrazaca. Oni se ne mogu isključiti bez narušavanja rada aplikacije i ne koriste se za praćenje.",
        },
      ],
    },
    {
      heading: { en: "Preferences", hr: "Postavke" },
      paragraphs: [
        {
          en: "Your language choice is stored in your browser's local storage under the key enterrank_locale. It never leaves your device and is not sent to us.",
          hr: "Vaš odabir jezika pohranjuje se u lokalnu pohranu preglednika pod ključem enterrank_locale. Nikada ne napušta vaš uređaj i ne šalje nam se.",
        },
      ],
    },
    {
      heading: { en: "Analytics", hr: "Analitika" },
      paragraphs: [
        {
          en: "We use privacy-preserving, cookie-free analytics on the marketing site to count page views. It does not set cookies, does not fingerprint your device and does not follow you to other sites.",
          hr: "Na marketinškoj stranici koristimo analitiku koja čuva privatnost i ne koristi kolačiće za brojanje pregleda stranica. Ne postavlja kolačiće, ne uzima otisak vašeg uređaja i ne prati vas na drugim stranicama.",
        },
      ],
    },
    {
      heading: { en: "Third-party content", hr: "Sadržaj trećih strana" },
      paragraphs: [
        {
          en: "Some icons and flag images load from public content delivery networks. Those providers see the request but receive no account information from us.",
          hr: "Neke ikone i slike zastava učitavaju se s javnih mreža za isporuku sadržaja. Ti pružatelji vide zahtjev, ali od nas ne dobivaju nikakve podatke o računu.",
        },
      ],
    },
  ],
};

export const gdpr: LegalDocument = {
  title: { en: "GDPR Compliance", hr: "Usklađenost s GDPR-om" },
  updated: UPDATED,
  intro: {
    en: "How EnterRank meets its obligations under the General Data Protection Regulation, and how we help you meet yours.",
    hr: "Kako EnterRank ispunjava svoje obveze prema Općoj uredbi o zaštiti podataka i kako vama pomažemo ispuniti vaše.",
  },
  sections: [
    {
      heading: { en: "Roles", hr: "Uloge" },
      paragraphs: [
        {
          en: "For data about your own account, we are the controller. For the Google Business Profile data you connect — including the names and text of people who reviewed your business — you are the controller and we are your processor, acting only on your instructions.",
          hr: "Za podatke o vašem računu mi smo voditelj obrade. Za podatke Google poslovnog profila koje povežete — uključujući imena i tekst osoba koje su recenzirale vašu tvrtku — vi ste voditelj obrade, a mi vaš izvršitelj obrade koji postupa isključivo po vašim uputama.",
        },
      ],
    },
    {
      heading: { en: "Where data lives", hr: "Gdje se podaci nalaze" },
      paragraphs: [
        {
          en: "Application data is hosted in the European Union. Where a sub-processor operates outside the EEA, transfers rely on Standard Contractual Clauses.",
          hr: "Podaci aplikacije smješteni su u Europskoj uniji. Ako podobrađivač djeluje izvan EGP-a, prijenosi se temelje na standardnim ugovornim klauzulama.",
        },
      ],
    },
    {
      heading: { en: "Security measures", hr: "Sigurnosne mjere" },
      paragraphs: [
        {
          en: "Encryption in transit and at rest, least-privilege access with mandatory two-factor authentication for staff, audit logging of administrative actions, and separate environments for development and production.",
          hr: "Enkripcija u prijenosu i pohrani, pristup po načelu najmanjih ovlasti uz obveznu dvofaktorsku autentifikaciju za osoblje, revizijsko bilježenje administrativnih radnji te odvojena okruženja za razvoj i produkciju.",
        },
      ],
    },
    {
      heading: { en: "Data subject requests", hr: "Zahtjevi ispitanika" },
      paragraphs: [
        {
          en: "If a reviewer asks you to erase their data, you can delete the review record from your workspace and it is removed from our systems within 30 days, including backups on their normal rotation. We will assist with any request forwarded to us.",
          hr: "Ako recenzent od vas zatraži brisanje svojih podataka, zapis recenzije možete izbrisati iz radnog prostora i uklanja se iz naših sustava unutar 30 dana, uključujući sigurnosne kopije u njihovoj uobičajenoj rotaciji. Pomoći ćemo kod svakog zahtjeva proslijeđenog nama.",
        },
      ],
    },
    {
      heading: { en: "Breach notification", hr: "Obavijest o povredi" },
      paragraphs: [
        {
          en: "If we become aware of a personal data breach affecting your workspace, we will notify you without undue delay and in any case within 72 hours, with what we know at that point and what we are doing about it.",
          hr: "Ako saznamo za povredu osobnih podataka koja utječe na vaš radni prostor, obavijestit ćemo vas bez nepotrebnog odgađanja i u svakom slučaju unutar 72 sata, s onim što u tom trenutku znamo i što poduzimamo.",
        },
      ],
    },
  ],
};

export const dpa: LegalDocument = {
  title: { en: "Data Processing Agreement", hr: "Ugovor o obradi podataka" },
  updated: UPDATED,
  intro: {
    en: "This agreement forms part of the Terms of Service and applies whenever we process personal data on your behalf.",
    hr: "Ovaj ugovor čini dio Uvjeta korištenja i primjenjuje se kad god obrađujemo osobne podatke u vaše ime.",
  },
  sections: [
    {
      heading: { en: "Subject matter and duration", hr: "Predmet i trajanje" },
      paragraphs: [
        {
          en: "We process personal data solely to provide EnterRank, for as long as your subscription is active plus the 30-day deletion window described in the Privacy Policy.",
          hr: "Osobne podatke obrađujemo isključivo radi pružanja EnterRanka, dok je vaša pretplata aktivna te tijekom 30-dnevnog razdoblja brisanja opisanog u Pravilima privatnosti.",
        },
      ],
    },
    {
      heading: { en: "Categories of data and data subjects", hr: "Kategorije podataka i ispitanika" },
      paragraphs: [
        {
          en: "Identification and contact data of your staff users; the display names, review text and questions of members of the public who interacted with your Google Business Profile.",
          hr: "Identifikacijski i kontaktni podaci vaših korisnika; prikazna imena, tekst recenzija i pitanja pripadnika javnosti koji su komunicirali s vašim Google poslovnim profilom.",
        },
      ],
    },
    {
      heading: { en: "Our obligations", hr: "Naše obveze" },
      paragraphs: [
        {
          en: "We process only on your documented instructions, keep our personnel bound to confidentiality, apply the security measures described in the GDPR page, and assist you with data subject requests and impact assessments.",
          hr: "Obrađujemo isključivo prema vašim dokumentiranim uputama, obvezujemo osoblje na povjerljivost, primjenjujemo sigurnosne mjere opisane na stranici o GDPR-u te vam pomažemo kod zahtjeva ispitanika i procjena učinka.",
        },
      ],
    },
    {
      heading: { en: "Sub-processing", hr: "Podobrada" },
      paragraphs: [
        {
          en: "You give general authorisation for us to engage sub-processors. We will give you 30 days' notice of any addition or replacement, and you may object on reasonable data protection grounds.",
          hr: "Dajete opće odobrenje za angažiranje podobrađivača. O svakom dodavanju ili zamjeni obavijestit ćemo vas 30 dana unaprijed, a možete uložiti prigovor na razumnim osnovama zaštite podataka.",
        },
      ],
    },
    {
      heading: { en: "Audits", hr: "Revizije" },
      paragraphs: [
        {
          en: "On reasonable notice and no more than once a year, you may request the information necessary to demonstrate our compliance, or an audit carried out by an independent auditor bound by confidentiality.",
          hr: "Uz razumnu najavu i najviše jednom godišnje možete zatražiti informacije potrebne za dokazivanje naše usklađenosti ili reviziju koju provodi neovisni revizor obvezan na povjerljivost.",
        },
      ],
    },
    {
      heading: { en: "Return and deletion", hr: "Povrat i brisanje" },
      paragraphs: [
        {
          en: "On termination we delete or return all personal data at your choice, except where storage is required by law. Export is available through the API before your workspace closes.",
          hr: "Po prestanku brišemo ili vraćamo sve osobne podatke po vašem izboru, osim ako je pohrana propisana zakonom. Izvoz je dostupan putem API-ja prije zatvaranja radnog prostora.",
        },
      ],
    },
  ],
};
