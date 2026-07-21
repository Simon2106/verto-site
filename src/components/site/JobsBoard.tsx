import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";
import {
  INTERNAL_JOBS,
  JOB_BRAND_COLOR,
  JOB_BRAND_LABEL,
  JOB_BRAND_SECTOR,
  JOB_LEVELS,
  JOB_LOCATIONS,
  type JobBrand,
  type JobLevel,
  type JobLocation,
} from "@/lib/jobs";

/**
 * Internal jobs board — LHi-style layout: jobs list left (2/3),
 * filter rail right (1/3) which sticks to the top on scroll.
 * Colour-coded by brand. Designed for dark (ink) sections.
 */
export function JobsBoard({
  heading = "Roles we're hiring now.",
  intro,
  initialLocation,
}: {
  heading?: string;
  intro?: string;
  initialLocation?: JobLocation;
}) {
  const [brand, setBrand] = useState<JobBrand | "all">("all");
  const [location, setLocation] = useState<JobLocation | "all">(initialLocation ?? "all");
  const [level, setLevel] = useState<JobLevel | "all">("all");

  const jobs = useMemo(
    () =>
      INTERNAL_JOBS.filter(
        (j) =>
          (brand === "all" || j.brand === brand) &&
          (location === "all" || j.location === location) &&
          (level === "all" || j.level === level),
      ),
    [brand, location, level],
  );

  const activeCount = [brand, location, level].filter((f) => f !== "all").length;

  return (
    <div>
      <div className="max-w-2xl">
        <div className="text-[11px] uppercase tracking-[0.28em] opacity-60">Join Verto — internal roles</div>
        <h2 className="display-2 mt-5">{heading}</h2>
        <p className="mt-6 opacity-80">
          {intro ??
            "These are seats on our own desks — not client vacancies. We also always want to hear from experienced consultants, even if the exact desk isn't listed."}
        </p>
      </div>

      <div className="mt-12 grid gap-10 lg:gap-14 lg:grid-cols-3 items-start">
        {/* ── FILTER RAIL — right 1/3, sticky on scroll ── */}
        <aside className="order-first lg:order-last lg:col-span-1">
          <div className="lg:sticky lg:top-28 space-y-8">
            <div
              className="p-6 border"
              style={{
                borderColor: "color-mix(in oklab, var(--ink-foreground) 15%, transparent)",
                background: "color-mix(in oklab, var(--ink-foreground) 3%, transparent)",
              }}
            >
              <div className="flex items-baseline justify-between">
                <div className="text-[10px] uppercase tracking-[0.24em] opacity-60">Filter roles</div>
                {activeCount > 0 && (
                  <button
                    type="button"
                    onClick={() => { setBrand("all"); setLocation("all"); setLevel("all"); }}
                    className="text-[10px] uppercase tracking-[0.18em] font-medium"
                    style={{ color: "var(--accent)" }}
                  >
                    Clear ({activeCount})
                  </button>
                )}
              </div>

              <FilterGroup label="Brand">
                <Chip active={brand === "all"} onClick={() => setBrand("all")}>All</Chip>
                {(Object.keys(JOB_BRAND_LABEL) as JobBrand[]).map((b) => (
                  <Chip
                    key={b}
                    active={brand === b}
                    onClick={() => setBrand(b)}
                    dot={JOB_BRAND_COLOR[b]}
                    tooltip={JOB_BRAND_SECTOR[b]}
                  >
                    {JOB_BRAND_LABEL[b]}
                  </Chip>
                ))}
              </FilterGroup>

              <FilterGroup label="Location">
                <Chip active={location === "all"} onClick={() => setLocation("all")}>All</Chip>
                {JOB_LOCATIONS.map((l) => (
                  <Chip key={l} active={location === l} onClick={() => setLocation(l)}>{l}</Chip>
                ))}
              </FilterGroup>

              <FilterGroup label="Level">
                <Chip active={level === "all"} onClick={() => setLevel("all")}>All</Chip>
                {JOB_LEVELS.map((l) => (
                  <Chip key={l} active={level === l} onClick={() => setLevel(l)}>{l}</Chip>
                ))}
              </FilterGroup>
            </div>

            <p className="text-xs opacity-60 leading-relaxed px-1">
              {jobs.length} role{jobs.length === 1 ? "" : "s"} shown · Can&apos;t see your desk?{" "}
              <Link to="/contact" className="font-medium" style={{ color: "var(--accent)" }}>
                Write to us anyway →
              </Link>
            </p>
          </div>
        </aside>

        {/* ── JOBS LIST — left 2/3 ── */}
        <div className="lg:col-span-2 hairline-top">
          {jobs.map((j) => (
            <Link
              key={j.id}
              to="/contact"
              className="group flex flex-wrap items-center justify-between gap-4 py-6 hairline-bottom"
              style={{ borderLeft: `3px solid ${JOB_BRAND_COLOR[j.brand]}`, paddingLeft: "1.25rem" }}
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] font-semibold">
                  <BrandTag brand={j.brand} />
                  <span className="opacity-50">·</span>
                  <span className="opacity-60">{j.level}</span>
                </div>
                <div className="mt-2 font-display text-xl md:text-2xl">{j.title}</div>
                <div className="mt-1 text-sm opacity-70">{j.package}</div>
              </div>
              <div className="flex items-center gap-6 text-sm opacity-80">
                <span>{j.location}</span>
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
          {jobs.length === 0 && (
            <p className="py-10 text-sm opacity-70">
              No open roles match those filters right now — but send us a note anyway; half our hires start that way.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-6 first:mt-4">
      <div className="text-[10px] uppercase tracking-[0.24em] opacity-50">{label}</div>
      <div className="mt-3 flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
  dot,
  tooltip,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  dot?: string;
  tooltip?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group/chip relative inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium transition border"
      style={{
        borderColor: active
          ? "var(--accent)"
          : "color-mix(in oklab, var(--ink-foreground) 25%, transparent)",
        background: active ? "var(--accent)" : "transparent",
        color: active ? "var(--ink)" : "var(--ink-foreground)",
      }}
    >
      {dot && <span className="h-2 w-2 rounded-full" style={{ background: dot }} />}
      {children}
      {tooltip && <Tooltip text={tooltip} />}
    </button>
  );
}

/** Brand tag on a job row, with sector tooltip on hover */
function BrandTag({ brand }: { brand: JobBrand }) {
  return (
    <span className="group/tag relative cursor-help" style={{ color: JOB_BRAND_COLOR[brand] }}>
      {JOB_BRAND_LABEL[brand]}
      <Tooltip text={JOB_BRAND_SECTOR[brand]} className="group-hover/tag:opacity-100 group-hover/tag:translate-y-0" />
    </span>
  );
}

/** Small dark tooltip shown above the element on hover */
function Tooltip({ text, className = "group-hover/chip:opacity-100 group-hover/chip:translate-y-0" }: { text: string; className?: string }) {
  return (
    <span
      role="tooltip"
      className={`pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md px-3 py-1.5 text-[11px] font-medium normal-case tracking-normal opacity-0 transition-all duration-200 ${className}`}
      style={{
        background: "var(--ink-foreground)",
        color: "var(--ink)",
        boxShadow: "0 8px 24px -8px rgba(0,0,0,0.5)",
      }}
    >
      {text}
    </span>
  );
}
