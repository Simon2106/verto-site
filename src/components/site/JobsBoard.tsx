import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";
import {
  INTERNAL_JOBS,
  JOB_BRAND_COLOR,
  JOB_BRAND_LABEL,
  JOB_LEVELS,
  JOB_LOCATIONS,
  type JobBrand,
  type JobLevel,
  type JobLocation,
} from "@/lib/jobs";

/**
 * Internal jobs board with brand / location / level filters,
 * colour-coded by brand. Designed for dark (ink) sections.
 */
export function JobsBoard({ heading = "Roles we're hiring now.", intro }: { heading?: string; intro?: string }) {
  const [brand, setBrand] = useState<JobBrand | "all">("all");
  const [location, setLocation] = useState<JobLocation | "all">("all");
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

      {/* Filters */}
      <div className="mt-10 space-y-3">
        <FilterRow label="Brand">
          <Chip active={brand === "all"} onClick={() => setBrand("all")}>All brands</Chip>
          {(Object.keys(JOB_BRAND_LABEL) as JobBrand[]).map((b) => (
            <Chip key={b} active={brand === b} onClick={() => setBrand(b)} dot={JOB_BRAND_COLOR[b]}>
              {JOB_BRAND_LABEL[b]}
            </Chip>
          ))}
        </FilterRow>
        <FilterRow label="Location">
          <Chip active={location === "all"} onClick={() => setLocation("all")}>All locations</Chip>
          {JOB_LOCATIONS.map((l) => (
            <Chip key={l} active={location === l} onClick={() => setLocation(l)}>{l}</Chip>
          ))}
        </FilterRow>
        <FilterRow label="Level">
          <Chip active={level === "all"} onClick={() => setLevel("all")}>All levels</Chip>
          {JOB_LEVELS.map((l) => (
            <Chip key={l} active={level === l} onClick={() => setLevel(l)}>{l}</Chip>
          ))}
        </FilterRow>
      </div>

      {/* List */}
      <div className="mt-10 hairline-top">
        {jobs.map((j) => (
          <Link
            key={j.id}
            to="/contact"
            className="group flex flex-wrap items-center justify-between gap-4 py-6 hairline-bottom"
            style={{ borderLeft: `3px solid ${JOB_BRAND_COLOR[j.brand]}`, paddingLeft: "1.25rem" }}
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] font-semibold">
                <span style={{ color: JOB_BRAND_COLOR[j.brand] }}>{JOB_BRAND_LABEL[j.brand]}</span>
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
  );
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-[10px] uppercase tracking-[0.24em] opacity-50 w-20 shrink-0">{label}</span>
      {children}
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
  dot,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  dot?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium transition border"
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
    </button>
  );
}
