import type { BrandSlug } from "./brands";
import lAlex from "@/assets/alex-hatfield.webp";
import lMartin from "@/assets/martin-doig.jpg";
import lRobbie from "@/assets/robbie-sturgess.webp";
import eMilly from "@/assets/edison-milly-compton.jpg";
import eNoah from "@/assets/edison-noah-ward.jpg";
import eMatthew from "@/assets/edison-matthew-pearce.jpg";
import eJoe from "@/assets/edison-joe-williams.jpg";
import eLewisD from "@/assets/edison-lewis-dominy.jpg";
import mSade from "@/assets/modulr-sade-kendall.webp";
import mCharlotte from "@/assets/modulr-charlotte-northam.jpg";
import mMonira from "@/assets/modulr-monira-aktar.jpg";
import mLewisW from "@/assets/modulr-lewis-wright.jpg";
import mNatasha from "@/assets/vertek-natasha-sykes.jpg";
import vDan from "@/assets/vertek-dan-bisset.jpg";
import vGary from "@/assets/vertek-gary-hunt.jpg";
import vBen from "@/assets/vertek-ben-tiffin.jpg";
import vGeorge from "@/assets/vertek-george-east.jpg";
import vAlex from "@/assets/vertek-alex-wright.jpg";
import vAlice from "@/assets/vertek-alice-schofield.jpg";
import vFrank from "@/assets/vertek-frank-warner.jpg";
import vHarley from "@/assets/vertek-harley-oconnell.jpg";
import vHarvey from "@/assets/vertek-harvey-earl.jpg";
import vJake from "@/assets/vertek-jake-massingham.jpg";
import vLethu from "@/assets/vertek-lethu-zwane.jpg";
import vLewisM from "@/assets/vertek-lewis-mason.webp";
import vLewisS from "@/assets/vertek-lewis-sullivan.jpg";
import eOllie from "@/assets/vertek-oliver-hesmondhalgh.jpg";
import vOlivia from "@/assets/vertek-olivia-pinhorne.jpg";
import vRex from "@/assets/vertek-rex-reavley.jpg";
import vSam from "@/assets/vertek-sam-parnell.jpg";

/* ── The client's definitive team structure (Alex Hatfield, Aug 2026) ──
   Tiers render leadership → management → team (ops fold into the team
   section on the group pages). A person can sit on several sites —
   `brands` lists them all; "verto" = the group site only. People without
   an `image` render the initials placeholder until the client supplies a
   headshot. Mirrors installer.php team_map() in verto-core. */

export type TeamTier = "leadership" | "management" | "ops" | "team";
export type TeamBrand = BrandSlug | "verto";

export interface TeamMember {
  name: string;
  role: string;
  brands: TeamBrand[];
  tier: TeamTier;
  focus: string;
  linkedin?: string;
  image?: string;
}

const GROUP = "Verto Group leadership.";
const OPS = "Group operations.";
const VERTEK = "Technical sales & engineering search.";
const MODULR = "Built environment search.";
const EDISON = "US power & energy search.";
const LIFESCI = "Life sciences search.";

export const TEAM: TeamMember[] = [
  // ── Leadership (group-wide; Alex + Robbie also on the Vertek site, Martin on ModulR) ──
  { name: "Alex Hatfield", role: "President", brands: ["verto", "vertek"], tier: "leadership", focus: GROUP, image: lAlex },
  { name: "Martin Doig", role: "Founder", brands: ["verto", "modulr"], tier: "leadership", focus: GROUP, image: lMartin },
  { name: "Robbie Sturgess", role: "President", brands: ["verto", "vertek"], tier: "leadership", focus: GROUP, image: lRobbie },

  // ── Management ("Manager" = placeholder — exact titles awaited from client) ──
  { name: "Dan Bisset", role: "VP of Engineering", brands: ["edison-lux"], tier: "management", focus: EDISON, image: vDan },
  { name: "George East", role: "Manager", brands: ["vertek"], tier: "management", focus: VERTEK, image: vGeorge },
  { name: "Ben Tiffin", role: "Team Leader", brands: ["vertek"], tier: "management", focus: VERTEK, image: vBen },
  { name: "Gary Hunt", role: "Head of Sales Recruitment", brands: ["vertek"], tier: "management", focus: VERTEK, image: vGary },
  { name: "Ben Cranston", role: "Manager", brands: ["vertek"], tier: "management", focus: VERTEK },
  { name: "Sade Kendall", role: "Manager", brands: ["modulr"], tier: "management", focus: MODULR, image: mSade },

  // ── Ops (Verto group pages only) ──
  { name: "Karabo Mothopeng", role: "Data Administrator", brands: ["verto"], tier: "ops", focus: OPS },
  { name: "Angel Ndlovu", role: "Data Administrator", brands: ["verto"], tier: "ops", focus: OPS },
  { name: "Alice Fryer", role: "Operations & Executive Assistant", brands: ["verto"], tier: "ops", focus: OPS },
  { name: "Megan Grant", role: "Senior Marketing Executive", brands: ["verto"], tier: "ops", focus: OPS },
  { name: "Alfie Gray", role: "Digital Marketing Executive", brands: ["verto"], tier: "ops", focus: OPS },

  // ── Consultants — Vertek ──
  { name: "Olivia Pinhorne", role: "Consultant", brands: ["vertek"], tier: "team", focus: VERTEK, image: vOlivia },
  { name: "Rex Reavley", role: "Consultant", brands: ["vertek"], tier: "team", focus: VERTEK, image: vRex },
  { name: "Jake Massingham", role: "Consultant", brands: ["vertek"], tier: "team", focus: VERTEK, image: vJake },
  { name: "Sam Parnell", role: "Consultant", brands: ["vertek"], tier: "team", focus: VERTEK, image: vSam },
  { name: "Saman Akbari", role: "Consultant", brands: ["vertek"], tier: "team", focus: VERTEK },
  { name: "Harvey Earl", role: "Consultant", brands: ["vertek"], tier: "team", focus: VERTEK, image: vHarvey },
  { name: "Lewis Sullivan", role: "Consultant", brands: ["vertek"], tier: "team", focus: VERTEK, image: vLewisS },
  { name: "Frank Warner", role: "Consultant", brands: ["vertek"], tier: "team", focus: VERTEK, image: vFrank },
  { name: "Alex Wright", role: "Consultant", brands: ["vertek"], tier: "team", focus: VERTEK, image: vAlex },
  { name: "Lethu Zwane", role: "Consultant", brands: ["vertek"], tier: "team", focus: VERTEK, image: vLethu },
  { name: "Lewis Mason", role: "Consultant", brands: ["vertek"], tier: "team", focus: VERTEK, image: vLewisM },
  { name: "Harley O'Connell", role: "Consultant", brands: ["vertek"], tier: "team", focus: VERTEK, image: vHarley },
  { name: "Alice Schofield", role: "Consultant", brands: ["vertek"], tier: "team", focus: VERTEK, image: vAlice },

  // ── Consultants — Verto Life Sciences (sits with the group) ──
  { name: "Martyn Jamieson", role: "Consultant", brands: ["verto"], tier: "team", focus: LIFESCI },

  // ── Consultants — ModulR ──
  { name: "Lewis Wright", role: "Consultant", brands: ["modulr"], tier: "team", focus: MODULR, image: mLewisW },
  { name: "Monira Akter", role: "Consultant", brands: ["modulr"], tier: "team", focus: MODULR, image: mMonira },
  { name: "Charlotte Northam", role: "Consultant", brands: ["modulr"], tier: "team", focus: MODULR, image: mCharlotte },
  { name: "Forough Rezaei", role: "Consultant", brands: ["modulr"], tier: "team", focus: MODULR },
  { name: "Natasha Sykes", role: "Consultant", brands: ["modulr"], tier: "team", focus: MODULR, image: mNatasha },

  // ── Consultants — Edison Lux ──
  { name: "Joe Williams", role: "Consultant", brands: ["edison-lux"], tier: "team", focus: EDISON, image: eJoe },
  { name: "Matthew Pearce", role: "Consultant", brands: ["edison-lux"], tier: "team", focus: EDISON, image: eMatthew },
  { name: "Lewis Dominy", role: "Consultant", brands: ["edison-lux"], tier: "team", focus: EDISON, image: eLewisD },
  { name: "Noah Ward", role: "Consultant", brands: ["edison-lux"], tier: "team", focus: EDISON, image: eNoah },
  { name: "Ollie Hesmondhalgh", role: "Consultant", brands: ["edison-lux"], tier: "team", focus: EDISON, image: eOllie },
  { name: "Milly Compton", role: "Consultant", brands: ["edison-lux"], tier: "team", focus: EDISON, image: eMilly },
];

/** leadership → management → team (ops fold into the team section). */
export const TIER_RANK: Record<TeamTier, number> = { leadership: 0, management: 1, ops: 2, team: 2 };

/** Members on a brand's site, in tier order (TEAM is already tier-ordered). */
export function teamForBrand(brand: TeamBrand): TeamMember[] {
  return TEAM.filter((m) => m.brands.includes(brand));
}

/** Members of one tier; "team" folds ops in (group-page convention). */
export function teamForTier(tier: TeamTier): TeamMember[] {
  return TEAM.filter((m) => (tier === "team" ? m.tier === "team" || m.tier === "ops" : m.tier === tier));
}

export function initials(name: string): string {
  return name.split(/\s+/).map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}
