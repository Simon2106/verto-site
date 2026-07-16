import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { BrandSlug } from "@/lib/brands";
import { teamForBrand, initials, type TeamMember } from "@/lib/team";

export function TeamStrip({ brand, brandName }: { brand: BrandSlug; brandName: string }) {
  const people = teamForBrand(brand).slice(0, 4);
  if (people.length === 0) return null;
  return (
    <section className="py-24" style={{ background: "var(--muted)" }}>
      <div className="container-wide">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="eyebrow">The team</span>
            <h2 className="display-2 mt-5">Meet the {brandName} desk.</h2>
            <p className="mt-6 text-muted-foreground">
              Operators, engineers and market specialists. The people you'll actually talk to when you engage {brandName}.
            </p>
          </div>
          <Link
            to="/team"
            hash={brand}
            className="text-sm font-medium inline-flex items-center gap-2"
            style={{ color: "var(--brand)" }}
          >
            Meet the team <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {people.map((p) => (
            <TeamCard key={p.name} person={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function TeamCard({ person, compact = false }: { person: TeamMember; compact?: boolean }) {
  void compact;
  return (
    <div
      className="group relative aspect-square w-full overflow-hidden rounded-2xl"
      style={{
        background:
          "color-mix(in oklab, var(--brand) 6%, var(--muted))",
      }}
    >
      {person.image ? (
        <img
          src={person.image}
          alt={person.name}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div
          className="absolute inset-0 flex items-center justify-center font-display text-6xl"
          style={{
            background:
              "linear-gradient(160deg, color-mix(in oklab, var(--brand) 22%, var(--muted)) 0%, color-mix(in oklab, var(--brand) 6%, var(--muted)) 100%)",
            color: "var(--brand)",
          }}
        >
          {initials(person.name)}
        </div>
      )}

      {/* Hover overlay */}
      <div
        className="absolute inset-0 flex flex-col justify-end p-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--brand) 0%, transparent) 30%, color-mix(in oklab, var(--brand) 85%, #000) 100%)",
          color: "var(--brand-foreground, #fff)",
        }}
      >
        <div className="font-display text-xl leading-tight tracking-tight">{person.name}</div>
        <div className="mt-1 text-[10px] uppercase tracking-[0.22em] opacity-90">{person.role}</div>
        <p className="mt-2 text-sm leading-snug opacity-90">{person.focus}</p>
      </div>
    </div>
  );
}
