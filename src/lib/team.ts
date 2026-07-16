import type { BrandSlug } from "./brands";
import mMilly from "@/assets/edison-milly-compton.jpg";
import mNoah from "@/assets/edison-noah-ward.jpg";
import mMatthew from "@/assets/edison-matthew-pearce.jpg";
import mJoe from "@/assets/edison-joe-williams.jpg";
import mLewis from "@/assets/edison-lewis-dominy.jpg";
import mChris from "@/assets/edison-chris-j-simmons.jpg";
import mSade from "@/assets/modulr-sade-kendall.webp";
import mCharlotte from "@/assets/modulr-charlotte-northam.jpg";
import mMonira from "@/assets/modulr-monira-aktar.jpg";
import mLewisW from "@/assets/modulr-lewis-wright.jpg";
import vDan from "@/assets/vertek-dan-bisset.jpg";
import vGary from "@/assets/vertek-gary-hunt.jpg";
import vBen from "@/assets/vertek-ben-tiffin.jpg";
import vAbi from "@/assets/vertek-abi-ward.jpg";
import vAlex from "@/assets/vertek-alex-wright.jpg";
import vAlice from "@/assets/vertek-alice-schofield.jpg";
import vCJ from "@/assets/vertek-cj-edwards.jpg";
import vFrank from "@/assets/vertek-frank-warner.jpg";
import vGeorge from "@/assets/vertek-george-east.jpg";
import vHarley from "@/assets/vertek-harley-oconnell.jpg";
import vHarvey from "@/assets/vertek-harvey-earl.jpg";
import vJake from "@/assets/vertek-jake-massingham.jpg";
import vLethu from "@/assets/vertek-lethu-zwane.jpg";
import vLewisM from "@/assets/vertek-lewis-mason.webp";
import vLewisS from "@/assets/vertek-lewis-sullivan.jpg";
import vNatasha from "@/assets/vertek-natasha-sykes.jpg";
import vOliver from "@/assets/vertek-oliver-hesmondhalgh.jpg";
import vOlivia from "@/assets/vertek-olivia-pinhorne.jpg";
import vRex from "@/assets/vertek-rex-reavley.jpg";
import vSam from "@/assets/vertek-sam-parnell.jpg";

export interface TeamMember {
  name: string;
  role: string;
  brand: BrandSlug;
  focus: string;
  linkedin?: string;
  image?: string;
}

export const TEAM: TeamMember[] = [
  // Edison Lux — US Power & Energy
  { name: "Chris J. Simmons", role: "Consultant", brand: "edison-lux", focus: "US power & energy search.", image: mChris },
  { name: "Lewis Dominy", role: "Consultant", brand: "edison-lux", focus: "US power & energy search.", image: mLewis },
  { name: "Noah Ward", role: "Consultant", brand: "edison-lux", focus: "US power & energy search.", image: mNoah },
  { name: "Joe Williams", role: "Consultant", brand: "edison-lux", focus: "US power & energy search.", image: mJoe },
  { name: "Matthew Pearce", role: "Consultant", brand: "edison-lux", focus: "US power & energy search.", image: mMatthew },
  { name: "Milly Compton", role: "Consultant", brand: "edison-lux", focus: "US power & energy search.", image: mMilly },


  // Vertek — Technical Sales & Engineering
  { name: "Dan Bisset", role: "VP of Engineering", brand: "vertek", focus: "Technical sales & engineering search.", image: vDan },
  { name: "Gary Hunt", role: "Head of Sales Recruitment", brand: "vertek", focus: "Technical sales & engineering search.", image: vGary },
  { name: "Ben Tiffin", role: "Team Leader", brand: "vertek", focus: "Technical sales & engineering search.", image: vBen },
  { name: "Abi Ward", role: "Consultant", brand: "vertek", focus: "Technical sales & engineering search.", image: vAbi },
  { name: "Alex Wright", role: "Consultant", brand: "vertek", focus: "Technical sales & engineering search.", image: vAlex },
  { name: "Alice Schofield", role: "Consultant", brand: "vertek", focus: "Technical sales & engineering search.", image: vAlice },
  { name: "CJ Edwards", role: "Consultant", brand: "vertek", focus: "Technical sales & engineering search.", image: vCJ },
  { name: "Frank Warner", role: "Consultant", brand: "vertek", focus: "Technical sales & engineering search.", image: vFrank },
  { name: "George East", role: "Consultant", brand: "vertek", focus: "Technical sales & engineering search.", image: vGeorge },
  { name: "Harley O'Connell", role: "Consultant", brand: "vertek", focus: "Technical sales & engineering search.", image: vHarley },
  { name: "Harvey Earl", role: "Consultant", brand: "vertek", focus: "Technical sales & engineering search.", image: vHarvey },
  { name: "Jake Massingham", role: "Consultant", brand: "vertek", focus: "Technical sales & engineering search.", image: vJake },
  { name: "Lethu Zwane", role: "Consultant", brand: "vertek", focus: "Technical sales & engineering search.", image: vLethu },
  { name: "Lewis Mason", role: "Consultant", brand: "vertek", focus: "Technical sales & engineering search.", image: vLewisM },
  { name: "Lewis Sullivan", role: "Consultant", brand: "vertek", focus: "Technical sales & engineering search.", image: vLewisS },
  { name: "Natasha Sykes", role: "Consultant", brand: "vertek", focus: "Technical sales & engineering search.", image: vNatasha },
  { name: "Oliver Hesmondhalgh", role: "Consultant", brand: "vertek", focus: "Technical sales & engineering search.", image: vOliver },
  { name: "Olivia Pinhorne", role: "Consultant", brand: "vertek", focus: "Technical sales & engineering search.", image: vOlivia },
  { name: "Rex Reavley", role: "Consultant", brand: "vertek", focus: "Technical sales & engineering search.", image: vRex },
  { name: "Sam Parnell", role: "Consultant", brand: "vertek", focus: "Technical sales & engineering search.", image: vSam },

  // ModulR Global — Built Environment
  { name: "Sade Kendall", role: "Consultant", brand: "modulr", focus: "Built environment search.", image: mSade },
  { name: "Charlotte Northam", role: "Consultant", brand: "modulr", focus: "Built environment search.", image: mCharlotte },
  { name: "Lewis Wright", role: "Consultant", brand: "modulr", focus: "Built environment search.", image: mLewisW },
  { name: "Monira Aktar", role: "Consultant", brand: "modulr", focus: "Built environment search.", image: mMonira },
];

export function teamForBrand(brand: BrandSlug): TeamMember[] {
  return TEAM.filter((m) => m.brand === brand);
}

export function initials(name: string): string {
  return name.split(/\s+/).map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}
