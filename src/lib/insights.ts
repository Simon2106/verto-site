import type { BrandSlug } from "./brands";

export type ContentType = "Market Report" | "Guide" | "Article" | "Case Study" | "Salary Guide" | "Template";
export type Audience = "Candidates" | "Companies" | "All";

export interface Insight {
  slug: string;
  title: string;
  excerpt: string;
  brand: BrandSlug | "verto";
  contentType: ContentType;
  audience: Audience;
  sector: string;
  readMinutes: number;
  date: string;          // ISO date
  featured?: boolean;
}

export const INSIGHTS: Insight[] = [
  {
    slug: "us-energy-skills-gap-2026",
    title: "The US Energy Skills Gap: who's hiring, who's leaving, and what it costs",
    excerpt: "America is building more generating capacity than at any point in a generation. The talent pipeline isn't keeping up — here's what plant owners and EPCs need to know in 2026.",
    brand: "edison-lux",
    contentType: "Market Report",
    audience: "Companies",
    sector: "Power & Energy",
    readMinutes: 12,
    date: "2026-06-04",
    featured: true,
  },
  {
    slug: "ccgt-shift-supervisor-salary-guide-2026",
    title: "CCGT Shift Supervisor Salary Guide — US, 2026",
    excerpt: "Base, shift premium, total comp and relocation packages benchmarked across PJM, ERCOT and CAISO.",
    brand: "edison-lux",
    contentType: "Salary Guide",
    audience: "All",
    sector: "Power & Energy",
    readMinutes: 6,
    date: "2026-05-20",
  },
  {
    slug: "reducing-time-to-cod",
    title: "Reducing time-to-COD on large-scale EPC projects",
    excerpt: "Why the bottleneck is rarely concrete, steel or turbines — and almost always the people you can't find fast enough.",
    brand: "edison-lux",
    contentType: "Article",
    audience: "Companies",
    sector: "EPC",
    readMinutes: 8,
    date: "2026-04-12",
  },

  {
    slug: "hyperscale-team-build-case-study",
    title: "Case study: scaling a hyperscale build team across three regions in 90 days",
    excerpt: "How we delivered a 14-strong project leadership team for a Tier-1 operator under NDA, on schedule, with zero attrition.",
    brand: "modulr",
    contentType: "Case Study",
    audience: "Companies",
    sector: "Data Centres",
    readMinutes: 7,
    date: "2026-06-12",
    featured: true,
  },
  {
    slug: "us-architecture-aor-market-update",
    title: "US Architecture & AOR market update — Q2 2026",
    excerpt: "Where the principals, directors and partners are moving across mixed-use, hospitality and healthcare practices.",
    brand: "modulr",
    contentType: "Market Report",
    audience: "All",
    sector: "Architecture",
    readMinutes: 9,
    date: "2026-05-30",
  },
  {
    slug: "women-in-architecture-pipeline",
    title: "Building the women-in-architecture pipeline: what actually works",
    excerpt: "Three years of EDI-led search work distilled into the interventions that move the needle on retention and promotion.",
    brand: "modulr",
    contentType: "Article",
    audience: "Companies",
    sector: "Architecture",
    readMinutes: 10,
    date: "2026-03-22",
  },
  {
    slug: "data-centre-construction-director-cv-guide",
    title: "CV guide: data centre construction director",
    excerpt: "The format, the proof points and the project-history detail clients actually look for. Downloadable template included.",
    brand: "modulr",
    contentType: "Template",
    audience: "Candidates",
    sector: "Data Centres",
    readMinutes: 5,
    date: "2026-02-18",
  },

  {
    slug: "fluid-power-sales-engineer-salary-guide",
    title: "Fluid Power Sales Engineer Salary Guide — UK & US, 2026",
    excerpt: "Base, OTE, equity and benefit benchmarks across hydraulics, pneumatics and compressed air distributors.",
    brand: "vertek",
    contentType: "Salary Guide",
    audience: "All",
    sector: "Fluid Power",
    readMinutes: 6,
    date: "2026-06-10",
    featured: true,
  },
  {
    slug: "advanced-manufacturing-talent-trends",
    title: "Advanced manufacturing talent trends: defence, semis and robotics",
    excerpt: "Where the next wave of US engineering and commercial talent will come from — and what founders are paying to secure it.",
    brand: "vertek",
    contentType: "Market Report",
    audience: "Companies",
    sector: "Advanced Manufacturing",
    readMinutes: 11,
    date: "2026-05-08",
  },
  {
    slug: "hvac-aftermarket-hiring-playbook",
    title: "The HVAC aftermarket hiring playbook",
    excerpt: "Service managers, aftermarket sales leads and field engineers — building the commercial muscle behind the install base.",
    brand: "vertek",
    contentType: "Guide",
    audience: "Companies",
    sector: "HVAC",
    readMinutes: 7,
    date: "2026-04-02",
  },
  {
    slug: "sales-engineer-interview-prep",
    title: "Interview prep: the technical sales engineer hot seat",
    excerpt: "How to frame product knowledge, patch performance and customer wins so they land with hiring managers.",
    brand: "vertek",
    contentType: "Guide",
    audience: "Candidates",
    sector: "Technical Sales",
    readMinutes: 6,
    date: "2026-03-15",
  },

  {
    slug: "verto-state-of-specialist-search",
    title: "The state of specialist search — 2026 outlook",
    excerpt: "How specialist recruitment is outperforming generalist firms across energy, built environment and engineering sectors.",
    brand: "verto",
    contentType: "Market Report",
    audience: "All",
    sector: "Specialist Recruitment",
    readMinutes: 14,
    date: "2026-06-18",
    featured: true,
  },
  {
    slug: "verto-why-specialism-matters",
    title: "Why specialism beats scale — every time",
    excerpt: "The argument for fewer, deeper relationships in talent: what we've learned building three specialist brands inside one group.",
    brand: "verto",
    contentType: "Article",
    audience: "Companies",
    sector: "Specialist Recruitment",
    readMinutes: 5,
    date: "2026-05-01",
  },
];

export const CONTENT_TYPES: ContentType[] = [
  "Market Report", "Guide", "Article", "Case Study", "Salary Guide", "Template",
];

/* ─────────── WHAT'S GOING ON ───────────
 * Culture & company-news posts for the Verto (group) site — replaces the old
 * "insights" concept at group level per client feedback.
 * ⚠️ PLACEHOLDER CONTENT — the client is sending the real "what's going on"
 * material; these entries are drawn from their public timeline. */
export const WHATS_GOING_ON: Insight[] = [
  {
    slug: "sunday-times-best-places-to-work-2026",
    title: "Verto named in The Sunday Times Best Places to Work 2026",
    excerpt: "Officially one of the UK's best small organisations to work for. Six years from a lockdown start-up to a Sunday Times listing — built on the same five values we started with.",
    brand: "verto",
    contentType: "Article",
    audience: "All",
    sector: "Life at Verto",
    readMinutes: 3,
    date: "2026-05-01",
    featured: true,
  },
  {
    slug: "prague-2026-incentive-trip",
    title: "Prague 2026 — the whole company, one incentive trip",
    excerpt: "Our second international incentive trip. Everyone who hit target, flights and all — this is what the 2× annual holiday incentive actually looks like.",
    brand: "verto",
    contentType: "Article",
    audience: "All",
    sector: "Life at Verto",
    readMinutes: 4,
    date: "2026-01-20",
  },
  {
    slug: "ibiza-2026-reveal",
    title: "Next stop: Ibiza — the 2026 summer incentive revealed",
    excerpt: "Barcelona 2025. Prague, January 2026. And this summer, the team that delivers gets Ibiza. The countdown is on.",
    brand: "verto",
    contentType: "Article",
    audience: "All",
    sector: "Life at Verto",
    readMinutes: 2,
    date: "2026-02-10",
  },
];
