import type { JobLocation } from "./jobs";
import ibiza8 from "@/assets/client/ibiza8.jpg";
import ibiza9 from "@/assets/client/ibiza9.jpg";
import summitPoster from "@/assets/client/summit-poster.jpg";
import skylineUK from "@/assets/skyline-uk.jpg";
import skylineUS from "@/assets/skyline-us.jpg";
import skylineEU from "@/assets/skyline-eu.jpg";

/**
 * Verto's office locations — powers /locations/$location pages
 * (LHi-style) and the contact hub.
 *
 * ⚠️ Several fields are PLACEHOLDERS pending client content:
 * site leaders, office photos, and the culture cards.
 */

export type LocationSlug = "solent" | "austin" | "miami";

export interface CultureCard {
  category: string; // e.g. "We're eating at"
  title: string;
  body: string;
  image?: string;
}

export interface OfficeLocation {
  slug: LocationSlug;
  name: string;
  country: string;
  jobLocation: JobLocation;
  status?: string;           // e.g. "Opening soon"
  address: string[];
  phone?: string;
  email: string;
  leader: { name: string; role: string; email?: string; placeholder?: boolean };
  brands: { name: string; note: string }[];
  statement: string;         // the big statement about the office
  heroImage: string;
  photos: string[];
  culture: CultureCard[];
}

export const LOCATIONS: OfficeLocation[] = [
  {
    slug: "solent",
    name: "Solent",
    country: "UK",
    jobLocation: "Solent, UK",
    address: ["Arena Business Centre", "Solent Road, Havant", "Portsmouth, PO9 1TR"],
    phone: "+44 23 9298 5450",
    email: "info@vertopeople.com",
    leader: { name: "Site leader — TBC", role: "Head of Office", placeholder: true },
    brands: [
      { name: "Vertek", note: "Engineering, Sales & Manufacturing" },
      { name: "ModulR", note: "Built Environment" },
      { name: "Verto Life Sciences", note: "Group desk" },
    ],
    statement:
      "Where Verto started in February 2020. Five minutes from the south coast, our largest office runs the UK desks — and the sales floor where 'phone first' was invented.",
    heroImage: skylineUK,
    photos: [ibiza8, summitPoster, ibiza9],
    culture: [
      { category: "Our chosen charity", title: "The Amelia-Mae Foundation", body: "Our charity gala and fundraising have raised over £15,504 for the Amelia-Mae Foundation — and counting." },
      { category: "We're eating at", title: "Placeholder — client to confirm", body: "The lunch spot the Solent team actually queues for. Content to come." },
      { category: "We're listening to", title: "Placeholder — client to confirm", body: "The sales-floor soundtrack. Content to come." },
      { category: "As an office we love", title: "Placeholder — client to confirm", body: "Sales days, winners' lunches and the summer summit. Content to come." },
    ],
  },
  {
    slug: "austin",
    name: "Austin",
    country: "USA",
    jobLocation: "Austin, TX",
    address: ["5900 Balcones Drive", "Austin, TX 78731"],
    phone: "+1 737 285 3760",
    email: "info@vertopeople.com",
    leader: { name: "Site leader — TBC", role: "Head of Office, US", placeholder: true },
    brands: [
      { name: "Edison Lux", note: "Power & Energy" },
      { name: "Vertek US", note: "Engineering, Sales & Manufacturing" },
    ],
    statement:
      "Our US headquarters on Balcones Drive — home of Edison Lux and the fastest-growing desks in the group. First US placement: December 2022. We haven't slowed down since.",
    heroImage: skylineUS,
    photos: [summitPoster, ibiza8, ibiza9],
    culture: [
      { category: "We're eating at", title: "Placeholder — client to confirm", body: "Breakfast tacos are non-negotiable. Content to come." },
      { category: "We're listening to", title: "Placeholder — client to confirm", body: "Live-music capital of the world — the office playlist reflects it. Content to come." },
      { category: "How we get to work", title: "Placeholder — client to confirm", body: "Content to come." },
      { category: "As an office we love", title: "Placeholder — client to confirm", body: "Content to come." },
    ],
  },
  {
    slug: "miami",
    name: "Miami",
    country: "USA",
    jobLocation: "Miami, FL",
    status: "Opening soon",
    address: ["Address to be announced", "Miami, FL"],
    email: "info@vertopeople.com",
    leader: { name: "Site leader — TBC", role: "Head of Office, Miami", placeholder: true },
    brands: [{ name: "ModulR US", note: "Built Environment — founding desks" }],
    statement:
      "The next chapter. ModulR's US practice lands in Miami soon — founding desks, ground-floor opportunity and a market that's building faster than anywhere in America.",
    heroImage: skylineEU,
    photos: [ibiza9, summitPoster, ibiza8],
    culture: [
      { category: "The plan", title: "Founding team forming now", body: "We're hiring the founding desks before the doors open. If you want your name on the first whiteboard, talk to us." },
      { category: "As an office we'll love", title: "Placeholder — client to confirm", body: "Brickell energy. Content to come once we land." },
    ],
  },
];

export function isLocationSlug(v: string): v is LocationSlug {
  return LOCATIONS.some((l) => l.slug === v);
}

export function getLocation(slug: LocationSlug): OfficeLocation {
  return LOCATIONS.find((l) => l.slug === slug)!;
}
