import type { Competitor, Location } from "@/lib/types";

/**
 * The demo tenant. A single-location hair salon in Zagreb — small enough that every number
 * on screen stays plausible, and in a market where the Croatian half of the UI reads naturally.
 */
export const location: Location = {
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
  profileScore: 78,
  connectedAt: "2026-02-11T09:24:00Z",
};

/**
 * Nearby businesses competing for the same searches. Names are invented; any resemblance to a
 * real salon is unintended, and none of these are presented as real Google data.
 */
export const competitors: Competitor[] = [
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
];
