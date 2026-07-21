/**
 * Internal roles at Verto Group — the jobs WE are hiring for, not client
 * vacancies. Rendered by <JobsBoard /> on the home and careers pages with
 * brand + location + level filters (pattern modelled on wearelhi.com/jobs).
 *
 * ⚠️ PLACEHOLDER DATA — replace with the client's real internal jobs list
 * when it arrives. Structure is final; content is not.
 */

export type JobBrand = "verto" | "edison-lux" | "vertek" | "modulr";
export type JobLocation = "Solent, UK" | "Austin, TX" | "Miami, FL";
export type JobLevel = "Entry-level" | "Senior" | "Manager";

export interface InternalJob {
  id: string;
  title: string;
  brand: JobBrand;
  location: JobLocation;
  level: JobLevel;
  package: string;
  blurb: string;
}

export const JOB_BRAND_LABEL: Record<JobBrand, string> = {
  verto: "Verto Group",
  "edison-lux": "Edison Lux",
  vertek: "Vertek",
  modulr: "ModulR",
};

/** Brand accent colours for dark (ink) backgrounds — guideline hexes,
 *  ModulR lightened for small-text contrast on navy. */
export const JOB_BRAND_COLOR: Record<JobBrand, string> = {
  verto: "var(--accent)",
  "edison-lux": "#3CC739",
  vertek: "#F82B60",
  modulr: "color-mix(in oklab, #0464FA 55%, white)",
};

/** Recruitment sector per brand — shown as hover tooltips on brand chips/tags */
export const JOB_BRAND_SECTOR: Record<JobBrand, string> = {
  verto: "Life Sciences (group desk)",
  "edison-lux": "Power & Energy recruitment",
  vertek: "Engineering, Sales & Manufacturing recruitment",
  modulr: "Built Environment recruitment",
};

export const JOB_LOCATIONS: JobLocation[] = ["Solent, UK", "Austin, TX", "Miami, FL"];
export const JOB_LEVELS: JobLevel[] = ["Entry-level", "Senior", "Manager"];

export const INTERNAL_JOBS: InternalJob[] = [
  {
    id: "el-senior-austin",
    title: "Senior Recruitment Consultant — US Energy",
    brand: "edison-lux",
    location: "Austin, TX",
    level: "Senior",
    package: "$60–80k base + 40% commission + share scheme",
    blurb: "Own a warm US power & energy desk with live retained briefs.",
  },
  {
    id: "el-entry-austin",
    title: "Entry-Level Recruitment Consultant — Power & Energy",
    brand: "edison-lux",
    location: "Austin, TX",
    level: "Entry-level",
    package: "$50–60k base + commission + share scheme",
    blurb: "Learn a technical market from scratch with structured L&D.",
  },
  {
    id: "vt-senior-solent",
    title: "Senior Recruitment Consultant — Technical Sales",
    brand: "vertek",
    location: "Solent, UK",
    level: "Senior",
    package: "£35–45k base + 40% commission + share scheme",
    blurb: "Established engineering sales desk with repeat UK clients.",
  },
  {
    id: "vt-entry-solent",
    title: "Entry-Level Recruitment Consultant — Engineering",
    brand: "vertek",
    location: "Solent, UK",
    level: "Entry-level",
    package: "£25–28k base + uncapped commission",
    blurb: "Phone-first training desk inside our largest UK team.",
  },
  {
    id: "vt-senior-austin",
    title: "Recruitment Consultant — HVAC & Refrigeration",
    brand: "vertek",
    location: "Austin, TX",
    level: "Senior",
    package: "$55–70k base + 40% commission + share scheme",
    blurb: "Build the US arm of a proven UK market.",
  },
  {
    id: "md-senior-miami",
    title: "Recruitment Consultant — Data Centres & Critical Environments",
    brand: "modulr",
    location: "Miami, FL",
    level: "Senior",
    package: "$60–80k base + 40% commission + share scheme",
    blurb: "Founding desk in our newest US location.",
  },
  {
    id: "md-manager-miami",
    title: "Team Manager — ModulR US",
    brand: "modulr",
    location: "Miami, FL",
    level: "Manager",
    package: "$90–120k base + override + equity",
    blurb: "Lead the build-out of ModulR's US built-environment practice.",
  },
  {
    id: "vg-senior-solent",
    title: "Recruitment Consultant — Life Sciences",
    brand: "verto",
    location: "Solent, UK",
    level: "Senior",
    package: "£35–45k base + 40% commission + share scheme",
    blurb: "Our newest desk — drug development & clinical hires, held at group level.",
  },
  {
    id: "vg-entry-solent",
    title: "Talent & Resourcing Partner — Group",
    brand: "verto",
    location: "Solent, UK",
    level: "Entry-level",
    package: "£24–27k base + bonus",
    blurb: "Support all four desks with sourcing, research and market mapping.",
  },
];
