import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { TitleReveal } from "@/components/site/TitleReveal";
import type { BrandSlug } from "@/lib/brands";

/** Per-brand sector lists — shared by the sector-coverage block and the
 *  brand-tile hover faces on the home page. */
export const BRAND_SECTORS: Record<BrandSlug, string[]> = {
  "edison-lux": [
    "Critical Power & CCGT",
    "Renewables & Storage",
    "EPC & Project Delivery",
    "O&M (Operations & Maintenance)",
  ],
  vertek: [
    "Fluid Power & Hydraulics",
    "HVAC & Refrigeration",
    "Advanced Manufacturing",
    "Instrumentation & Controls",
  ],
  modulr: [
    "Hyperscale Data Centres",
    "US Architecture",
    "MEP Engineering",
    "Interior Design & Fit-out",
  ],
};

/* ─────────── SECTOR COVERAGE — per-brand desk lists ───────────
   Client feedback (round 2, img004): the Edison Lux row must read as
   Edison — Energy Green, not the Electric Blue that made it identical
   to ModulR's row. Green is decorative on light ground, so the small
   "Enter Edison Lux" text link uses a darkened green for contrast. */
export function SectorCoverage() {
  const groups: {
    key: string;
    wordmark: string;
    descriptor: string;
    color: string;
    linkColor?: string;
    brand?: BrandSlug;
    items: string[];
  }[] = [
    {
      key: "edison-lux",
      wordmark: "EDISON LUX",
      descriptor: "Power & Energy",
      /* Edison's signature Energy Green for the decorative marks; the
         10px link text is darkened to hold ~5:1 on the ivory ground */
      color: "#3CC739",
      linkColor: "#23761A",
      brand: "edison-lux",
      items: BRAND_SECTORS["edison-lux"],
    },
    {
      key: "vertek",
      wordmark: "VERTEK",
      descriptor: "Engineering, Sales & Manufacturing",
      color: "#F82B60",
      brand: "vertek",
      items: BRAND_SECTORS.vertek,
    },
    {
      key: "modulr",
      wordmark: "MODULR",
      descriptor: "Built Environment",
      color: "#0464FA",
      brand: "modulr",
      items: BRAND_SECTORS.modulr,
    },
    {
      key: "verto",
      wordmark: "VERTO GROUP",
      descriptor: "Life Sciences — held at group level",
      color: "var(--accent)",
      items: ["Drug Development", "Clinical Operations", "Biometrics & Data", "Commercial & Medical Affairs"],
    },
  ];
  return (
    <section className="py-24 hairline-top" style={{ background: "var(--muted)" }}>
      <div className="container-wide">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <span className="eyebrow">Sector coverage</span>
            <TitleReveal className="display-2 mt-5" lines={["Whatever you're building,", "we know who builds it."]} />
            <p className="mt-6 text-muted-foreground">
              Every consultant at Verto is a former operator, engineer or in-market recruiter — not a generalist. The sectors below aren&apos;t categories on a website; they&apos;re desks that ship hires every month.
            </p>
            <p className="mt-4 text-muted-foreground">
              Each links through to the brand that owns it. Our life sciences desk sits with the group while it grows.
            </p>
          </div>
          <div className="lg:col-span-8 space-y-10">
            {groups.map((g) => (
              <div
                key={g.key}
                style={{
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  ["--sector-brand" as any]: g.color,
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  ["--sector-link" as any]: g.linkColor ?? g.color,
                }}
              >
                <div className="flex items-baseline justify-between gap-4 pb-4" style={{ borderBottom: `1px solid var(--sector-brand)` }}>
                  <div className="flex items-baseline gap-3">
                    <span className="h-2 w-2 rounded-full self-center" style={{ background: "var(--sector-brand)" }} />
                    <span className="font-display text-lg tracking-tight">{g.wordmark}</span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{g.descriptor}</span>
                  </div>
                  {g.brand ? (
                    <Link
                      to="/brands/$brand"
                      params={{ brand: g.brand }}
                      className="text-[10px] uppercase tracking-[0.22em] font-medium inline-flex items-center gap-1.5 opacity-80 hover:opacity-100 transition"
                      style={{ color: "var(--sector-link)" }}
                    >
                      Enter {g.wordmark.charAt(0) + g.wordmark.slice(1).toLowerCase()} <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  ) : (
                    <Link
                      to="/contact"
                      className="text-[10px] uppercase tracking-[0.22em] font-medium inline-flex items-center gap-1.5 opacity-80 hover:opacity-100 transition"
                      style={{ color: "var(--sector-link)" }}
                    >
                      Talk to the group <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {g.items.map((name, i) => {
                    const inner = (
                      <>
                        <span className="flex items-center gap-3 text-base font-medium">
                          <span
                            className="h-3 w-[3px] rounded-sm transition group-hover:h-5"
                            style={{ background: "var(--sector-brand)" }}
                          />
                          {name}
                        </span>
                        <ArrowUpRight
                          className="h-4 w-4 opacity-40 transition group-hover:opacity-100"
                          style={{ color: "var(--sector-brand)" }}
                        />
                      </>
                    );
                    const cls = "group flex items-center justify-between gap-6 py-4 pr-2 md:pr-4 transition";
                    const style = { borderTop: i < 2 ? undefined : "1px solid var(--border)" };
                    return g.brand ? (
                      <Link key={name} to="/brands/$brand" params={{ brand: g.brand }} className={cls} style={style}>
                        {inner}
                      </Link>
                    ) : (
                      <Link key={name} to="/contact" className={cls} style={style}>
                        {inner}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
