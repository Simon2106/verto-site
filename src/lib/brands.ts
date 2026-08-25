export type BrandSlug = "edison-lux" | "vertek" | "modulr";

export type BrandImageSlot =
  | "hero"                    // brand landing hero
  | "landingAbout"            // brand landing "About" section
  | "brandCard"               // brand grid card + home brand tile
  | "companiesHero"
  | "companiesIntro"
  | "companiesCase"
  | "candidatesHero"
  | "candidatesIntro"
  | "candidatesTestimonials"
  | "aboutHero"
  | "aboutIntro"
  | "aboutMission";

export interface BrandImage {
  src: string;
  alt: string;
}

export interface BrandDefinition {
  slug: BrandSlug;
  name: string;
  wordmark: string;       // shown in logo lockup
  qualifier?: string;     // small descriptor under wordmark
  tagline: string;        // hero headline
  taglineAccent: string;  // colored portion of headline
  positioning: string;    // short paragraph
  focus: string;          // e.g. "US Power & Energy Talent"
  heroImage: string;
  heroAlt: string;
  /** Per-slot image overrides. Any missing slot falls back to heroImage/heroAlt. */
  images?: Partial<Record<BrandImageSlot, BrandImage>>;
  stats: Array<{ value: string; label: string }>;
  specialisms: Array<{ title: string; description: string }>;
  audiences: {
    company: { headline: string; body: string; bullets: string[]; cta: string };
    candidate: { headline: string; body: string; bullets: string[]; cta: string };
  };
  about: { headline: string; mission: string; vision: string; purpose: string };
  aboutHero: { line1: string; accent: string; line2: string };
  whatWeDo?: { headline: string; paragraphs: string[] };
  proofPoints: string[];
  pillars?: Array<{ title: string; body: string }>;
  values?: Array<{ title: string; body: string }>;
  journey?: Array<{ year: string; title: string }>;
  testimonials?: Array<{ quote: string; attribution: string }>;
  process?: Array<{ title: string; body: string }>;
  caseStudy?: { client: string; sector: string; challenge: string; solution: string; result: string };
  candidateProcess?: Array<{ title: string; body: string }>;
  sectorsServed?: string[];
}

/** Resolve a brand image slot, falling back to the brand's hero image. */
export function getBrandImage(b: BrandDefinition, slot: BrandImageSlot): BrandImage {
  return b.images?.[slot] ?? { src: b.heroImage, alt: b.heroAlt };
}

import edisonHeroAsset from "@/assets/dam.webp";
const edisonHero = edisonHeroAsset;
import pylonAsset from "@/assets/pylon-2.webp";
const pylonImage = pylonAsset;
import dataCentreAsset from "@/assets/data-centre-1.webp";
const dataCentreImage = dataCentreAsset;
import modulrHero from "@/assets/modulr-hero-v2.png";
import vertekHero from "@/assets/vertek-hero.jpg";

export const BRANDS: Record<BrandSlug, BrandDefinition> = {
  "edison-lux": {
    slug: "edison-lux",
    name: "Edison Lux",
    wordmark: "EDISON LUX",
    qualifier: "US Energy Staffing",
    tagline: "Powering progress.",
    taglineAccent: "Together.",
    positioning:
      "Edison Lux delivers talent solutions for the US energy sector — from control room operators and shift supervisors to the directors and C-suite leaders responsible for billion-dollar assets. One market. Done properly.",
    focus: "US Energy Staffing",
    heroImage: edisonHero,
    heroAlt: "Hydroelectric dam releasing water through spillway gates with forested mountains behind",
    images: {
      landingAbout: {
        src: pylonImage,
        alt: "Silhouetted electricity transmission pylons at sunset with a substation on the horizon",
      },
    },
    stats: [
      { value: "100%", label: "Success rate on engaged search" },
      { value: "Basement → Boardroom", label: "Operator to C-suite coverage" },
      { value: "US-only", label: "Undivided sector focus" },
    ],
    specialisms: [
      { title: "Critical & Mission-Critical Power", description: "Control rooms, O&M and engineering leadership for facilities where uptime is non-negotiable." },
      { title: "Combined Cycle & Gas Generation", description: "Combined cycle, simple cycle, recips and gas compression — outages, upgrades and permanent operations." },
      { title: "Renewables & Energy Transition", description: "Solar, wind, battery storage, hydrogen and RNG — construction, commissioning and operations." },
      { title: "Biomass, EFW & Waste-to-Energy", description: "Biomass, EfW, coal and CHP — teams that know the fuel, the plant and the regulations." },
      { title: "Nuclear", description: "New build, SMR, fusion, decommissioning and defence — engineering, operations and maintenance." },
      { title: "EPC — Construction & Commissioning", description: "FEED, detailed design, construction, commissioning and project delivery." },
    ],
    audiences: {
      company: {
        headline: "The right people. The right level. Zero compromise on calibre.",
        body: "Whether you're staffing a single critical seat or building a team for a new asset, one conversation is all it takes to put our network to work. VPs of engineering and plant owners don't have time to run a search — we run it for you.",
        bullets: [
          "Engaged search — our flagship model, 100% success rate",
          "Retained executive search for boardroom-level appointments",
          "Team builds for new plants, projects and regions",
          "Direct hire and contract across the full talent hierarchy",
        ],
        cta: "Staff your asset",
      },
      candidate: {
        headline: "Power your career.\nOn your terms.",
        body: "Shift supervisor moving up. EPC director chasing COD. VP of engineering eyeing the next chapter. We only call when there's a role worth your time — and we sell your experience before you sit in an interview.",
        bullets: [
          "Confidential, partnership-led conversations",
          "Roles across critical power, renewables, EPC and nuclear",
          "Relocation, comp and market intelligence guidance",
          "We sell your experience before the first interview",
        ],
        cta: "Power your career",
      },
    },
    about: {
      headline: "One market, known completely.",
      mission:
        "Deliver talent solutions with the precision the industry demands — speed and accuracy together, so when a plant is short-staffed or a COD is at risk you never have to choose between them.",
      vision:
        "To be the staffing partner the US energy sector reaches out to first — the most knowledgeable and connected specialist in America's energy transition.",
      purpose:
        "Named for the man who lit up the world, Edison Lux shines a light on the talent that powers everything — bridging the energy skills gap before it becomes a crisis.",
    },
    aboutHero: {
      line1: "One sector.",
      accent: "\nUS energy, end to end.",
      line2: "Lived, not learned.",
    },
    whatWeDo: {
      headline: "Embedded in the industries that keep the lights on.",
      paragraphs: [
        "Critical power, combined-cycle and gas generation, renewables and energy transition, biomass and EFW, nuclear, and EPC construction — these are the corners of US energy we know inside out. Every consultant lives in the sector, not adjacent to it.",
        "For plant owners, developers, EPCs and VPs of engineering, we operate as an extension of the leadership team — discreet, accountable and never transactional. When a COD is at risk or a plant is short-staffed, one conversation is all it takes.",
      ],
    },
    proofPoints: [
      "100% success rate on engaged search assignments",
      "World-class NPS across operators, developers and EPCs",
      "Feedback captured from every candidate and client interaction",
      "US-only focus — no client brief sits outside our knowledge base",
    ],
  },

  "vertek": {
    slug: "vertek",
    name: "Vertek",
    wordmark: "VERTEK",
    qualifier: "Technical Sales, Service & Engineering",
    tagline: "Engineering",
    taglineAccent: "what's next",
    positioning:
      "Vertek recruits technical sales, service and engineering professionals for the manufacturers and distributors that keep industry moving — across the UK and US. Every consultant owns one product area. That's why it works.",
    focus: "Technical Sales, Service & Engineering",
    heroImage: vertekHero,
    heroAlt: "Cable-stayed bridge at night with crimson motion light trails",
    stats: [
      { value: "14,000+", label: "Technical sales candidates on CRM" },
      { value: "100%", label: "Success rate on Verto Engage" },
      { value: "94%", label: "Of clients hire with us again" },
    ],
    specialisms: [
      { title: "Fluid Power & Flow Control", description: "Hydraulics, pneumatics, compressed air, pumps, valves, actuators, instrumentation, filtration and seals." },
      { title: "Rotating Equipment & Turbomachinery", description: "Steam turbines, gas compression, electric motors, gearboxes and power transmission." },
      { title: "HVAC", description: "Air handlers, ventilation, refrigeration, heat pumps, boilers, plumbing and aftermarket — UK and US." },
      { title: "CNC & Precision Engineering (US)", description: "Cutting tools, workholding, toolholding, metrology, CMM and metalworking." },
      { title: "Industrial Automation (US)", description: "Sensors, PLCs, HMI, connectors, automated machinery and conveyors." },
      { title: "Advanced Manufacturing (US)", description: "Defence, aerospace, space, semiconductor and robotics — ITAR and clearance handled." },
    ],
    audiences: {
      company: {
        headline: "Straightforward. No overpromising. Just the right hire.",
        body: "Tell us the product, the patch and the profile. We'll tell you honestly whether we can deliver — and then we will. Every consultant specialises by product because our clients and candidates don't generalise either.",
        bullets: [
          "Verto Engage — our committed model, 100% success rate",
          "Direct hire across 14,000+ specialist candidates",
          "Team builds — land one hire, then scale the function",
          "Frequent updates, structured briefings, no surprises",
        ],
        cta: "Build your team",
      },
      candidate: {
        headline: "Options, not applications.",
        body: "Put a role on a job board and it gets hundreds of resumes. Work with us and it works the other way round — we put you and your experience front and centre, and we sell the opportunity before you sit in an interview.",
        bullets: [
          "UK, EU and US roles across the product landscape",
          "Total comp, equity, progression and work-life on the table",
          "Time-served engineers and product specialists — spoken to as equals",
          "Honest feedback. No oversell. No fluff.",
        ],
        cta: "See live roles",
      },
    },
    about: {
      headline: "One product area, per consultant. Every time.",
      mission:
        "Deliver the right hire, first time — combining a 14,000-strong specialist database with a process refined over years so speed never comes at the cost of quality.",
      vision:
        "To be the firm every VP of Sales, MD and founder in technical sales and engineering reaches out to first — on both sides of the Atlantic.",
      purpose:
        "Product knowledge can't be faked. Neither can ours. We exist so that manufacturers and distributors never have to explain their own product to their recruiter — and so that engineers get sold on their merits.",
    },
    aboutHero: {
      line1: "Product knowledge,",
      accent: "one desk at a time.",
      line2: "Never generalist.",
    },
    whatWeDo: {
      headline: "Embedded in the industries that build the world.",
      paragraphs: [
        "Fluid power, HVAC, rotating equipment, industrial automation and US advanced manufacturing — these are the industries we know inside out. Every consultant specialises in a product area and stays close enough to add genuine insight to every conversation.",
        "For VPs of Sales, Managing Directors and Founders, we operate as an extension of the leadership team — discreet, accountable and never transactional.",
      ],
    },
    proofPoints: [
      "100% success rate on Verto Engage",
      "94% of clients return for a second hire",
      "14,000+ specialist sales and engineering candidates on the CRM",
      "Feedback captured from every candidate and client interaction — then acted on",
    ],
    pillars: [
      {
        title: "Product-owned desks",
        body: "Every Vertek consultant owns a product area — fluid power, HVAC, rotating equipment, automation, advanced manufacturing. We don't generalise across engineering because our clients and candidates don't. Anyone can post a job spec; very few can tell the difference between a fluid power sales engineer with real product experience and one who just learned the words.",
      },
      {
        title: "Partnership, not transaction",
        body: "94% of our clients come back. The other 6% haven't had a second role yet. We earn that by understanding the business properly, representing it well in the market and operating as an extension of the commercial team — not a vendor.",
      },
      {
        title: "Process over chance",
        body: "Structured briefings, frequent updates at every stage and a methodology built over years to get it right first time. Recruitment isn't luck — and our 100% success rate on Verto Engage proves it.",
      },
    ],
    values: [
      {
        title: "Straightforward. No overpromising.",
        body: "We say what we mean and mean what we say. Candidates are sold on their merits, feedback is honest, and we never promise what we can't deliver.",
      },
      {
        title: "Process over chance.",
        body: "Great recruitment isn't luck. Our methodology has been built over years to get it right first time — frequent updates, thorough briefings, structure that removes failure at every stage.",
      },
      {
        title: "An extension of your team.",
        body: "94% of our clients work with us again. We understand the business properly, represent it well and build relationships that outlast a single hire.",
      },
      {
        title: "High-conviction introductions.",
        body: "We sell the opportunity as hard as we'd want someone to sell ours. The right candidates come energised, not just informed.",
      },
      {
        title: "Product knowledge, non-negotiable.",
        body: "Every consultant specialises in a product area. We don't generalise across engineering because our clients and candidates don't — and neither should we.",
      },
    ],
    journey: [
      { year: "2011", title: "Founded in technical sales — the roots of the Verto Group" },
      { year: "2020", title: "Vertek brand established for sales, service and engineering search" },
      { year: "2022", title: "US expansion into fluid power, HVAC and rotating equipment" },
      { year: "2024", title: "Advanced manufacturing practice launched — defence, aerospace, semiconductor, robotics" },
      { year: "2026", title: "14,000+ specialist candidates on the CRM and counting" },
    ],
    testimonials: [
      {
        quote: "Vertek's understanding of our product, our distribution model and the talent market was the difference. They didn't send resumes — they sent the right people, fully briefed, every time.",
        attribution: "VP of Sales, Global Fluid Power Manufacturer",
      },
      {
        quote: "We've used a lot of recruiters. Vertek is the only one that consistently understood the difference between a sales engineer who can talk hydraulics and one who's actually time-served. That's why we keep coming back.",
        attribution: "Managing Director, UK Pneumatics Distributor",
      },
      {
        quote: "They built our entire US commercial team from the ground up — sales engineers, service leaders, a regional director — in under twelve months. No drama, no surprises, no oversell.",
        attribution: "Founder, US Advanced Manufacturing OEM",
      },
      {
        quote: "I wasn't actively looking. Vertek took the time to understand what I actually wanted next, brought one opportunity, and represented me brilliantly. I started six weeks later.",
        attribution: "HVAC Service Manager (now Regional Director)",
      },
    ],
    process: [
      { title: "Discover", body: "We sit down with the business, the product line and the territory — not just the job spec. Success at 90 days, 6 months and 12 months is mapped before we name a single candidate." },
      { title: "Map", body: "We map the entire competitor, manufacturer and distributor landscape on patch. Time-served engineers, sales specialists, service leaders — visible and invisible." },
      { title: "Engage", body: "Every approach is briefed properly — your product, your culture, the opportunity. No mass outreach. No resumes into the void." },
      { title: "Deliver", body: "Structured shortlist, candidate context resumes can't capture, offer management and post-placement check-ins. Frequent updates throughout. No surprises." },
    ],
    caseStudy: {
      client: "Global Fluid Power OEM",
      sector: "Hydraulics & motion control",
      challenge: "A European fluid power manufacturer needed to build a US commercial team from scratch — Regional Sales Director, three product-specialist sales engineers and a service manager — in a market where time-served hydraulics talent is notoriously hard to find. Two previous contingent partners had stalled out.",
      solution: "Vertek mapped every relevant hydraulics, motion control and pneumatics OEM and distributor across the target US regions. We worked exclusively on engaged terms, ran weekly market read-outs and represented the client's story end-to-end — including total comp, equity and relocation context the client had previously underplayed.",
      result: "All five hires made within 10 months. 100% retention at 18 months. Vertek has since been engaged on a further 14 mandates including a VP of Sales appointment and the company's first US service leadership team.",
    },
    candidateProcess: [
      { title: "Confidential conversation", body: "We start by understanding what you actually want next — product area, market, total comp, relocation, work-life. No oversell. We only bring you roles that genuinely fit." },
      { title: "Briefed representation", body: "We sell your experience before the first interview. Hiring managers see your context, your patch and your product knowledge — not just a resume." },
      { title: "Interview preparation", body: "Full briefing on the company, the panel, the product line and the likely lines of questioning. We've usually placed there before." },
      { title: "Offer & beyond", body: "Honest comp guidance, equity context for US advanced manufacturing, counter-offer support and check-ins long after you've started." },
    ],
    sectorsServed: [
      "Fluid power & flow control",
      "HVAC & refrigeration",
      "Rotating equipment & turbomachinery",
      "CNC & precision engineering (US)",
      "Industrial automation (US)",
      "Advanced manufacturing (US)",
      "MRO & aftermarket",
      "Commercial leadership (VP / GM / Director)",
    ],
  },



  "modulr": {
    slug: "modulr",
    name: "Modulr",
    wordmark: "MODULR",
    qualifier: "Architecture & Data Centres",
    tagline: "Connecting talent.",
    taglineAccent: "Powering progress.",
    positioning:
      "Modulr connects standout architecture and data centre professionals with the built environment's most ambitious work — hyperscale campuses, award-winning practices, and the projects you won't find advertised.",
    focus: "Architecture & Data Centres",
    heroImage: modulrHero,
    heroAlt: "Glowing globe at night with arcs of light connecting cities",
    images: {
      landingAbout: {
        src: dataCentreImage,
        alt: "Data centre corridor lined with server racks and glowing status lights",
      },
    },
    stats: [
      { value: "3 regions", label: "UK, EU and US coverage" },
      { value: "Full lifecycle", label: "Concept design to commissioning" },
      { value: "NDA-grade", label: "Discretion on every search" },
    ],
    specialisms: [
      { title: "Hyperscale Data Centres", description: "Construction directors, regional heads and project leadership across operators, developers and contractors." },
      { title: "Colocation & Edge", description: "Delivery and operations talent for colo and edge programmes at every stage." },
      { title: "US Architecture", description: "Registered architects, project architects, directors, principals and partners." },
      { title: "MEP Engineering", description: "Mechanical, electrical and plumbing leadership across the US project landscape." },
      { title: "Project Lifecycle", description: "CD → SD → DD → CD → CA. Concept design through construction administration." },
      { title: "Inclusion & EDI", description: "Championing women in architecture and EDI across technical built-environment roles." },
    ],
    audiences: {
      company: {
        headline: "Your next project is out there. It just isn't advertised.",
        body: "Whether you're scaling a data centre programme or shaping a skyline, one conversation opens doors that don't exist yet. Considered introductions, never CVs into the void — and discretion as standard.",
        bullets: [
          "Curated introductions, not mass outreach",
          "Confidential and NDA-grade search handled as standard",
          "Project team builds — contract and permanent",
          "Long-game relationships across the project pipeline",
        ],
        cta: "Scale your project team",
      },
      candidate: {
        headline: "The best projects are rarely advertised.",
        body: "The best talent is rarely searching. Modulr exists in that gap — making precise, considered introductions rather than firing CVs into the void, and protecting reputations on every engagement.",
        bullets: [
          "Hyperscale, colo, US architecture and MEP opportunities",
          "Exclusive, often NDA-protected briefs",
          "Career trajectory advice across the full project lifecycle",
          "Discreet, considered, never transactional",
        ],
        cta: "Find your next project",
      },
    },
    about: {
      headline: "Considered introductions, not CVs into the void.",
      mission:
        "Build teams for the projects that will define a generation — staffing what others can't, working quickly and discreetly, and to the standard those projects demand.",
      vision:
        "A world where no exceptional architect or built-environment professional is stuck because the right opportunity was invisible to them — and the first call every project director makes when they need to scale.",
      purpose:
        "Championing the professionals who build our world — opening doors that don't exist yet, so the most ambitious projects in architecture and critical infrastructure are built by the best people, not whoever applied first.",
    },
    aboutHero: {
      line1: "The projects that define",
      accent: "a generation.",
      line2: "Built by the right people.",
    },
    whatWeDo: {
      headline: "Embedded in the projects that define a generation.",
      paragraphs: [
        "Hyperscale data centres, colocation and edge, US architecture, MEP engineering and the full concept-to-commissioning lifecycle — this is where our network runs deepest. Every consultant works one part of the built environment, not the whole map.",
        "For project directors, developers and practice principals, we operate as a discreet extension of the leadership team — considered introductions rather than CVs into the void, with NDA-grade discretion as standard.",
      ],
    },
    proofPoints: [
      "Trusted by global operators, developers and celebrated US practices",
      "Active networks across the UK, EU and US markets",
      "NDA-grade discretion on every sensitive and pre-announcement search",
      "Inclusion work championing women in architecture and EDI in technical built-environment roles",
    ],
  },
};

export const BRAND_LIST: BrandDefinition[] = [
  BRANDS["edison-lux"],
  BRANDS["modulr"],
  BRANDS["vertek"],
];

export function isBrandSlug(value: string): value is BrandSlug {
  return value === "edison-lux" || value === "vertek" || value === "modulr";
}
