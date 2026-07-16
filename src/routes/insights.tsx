import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { INSIGHTS, CONTENT_TYPES, type Audience, type ContentType } from "@/lib/insights";
import { BRAND_LIST, BRANDS } from "@/lib/brands";
import { ArrowUpRight } from "lucide-react";
import { InsightThumb } from "@/components/site/InsightThumb";

type BrandFilter = "all" | "verto" | "edison-lux" | "vertek" | "modulr";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights — Verto Group" },
      { name: "description", content: "Market reports, salary and comp guides, case studies and field notes from Edison Lux, Vertek and Modulr." },
      { property: "og:title", content: "Insights — Verto Group" },
      { property: "og:description", content: "Specialist knowledge from inside the markets we work in." },
    ],
  }),
  component: InsightsPage,
});

function InsightsPage() {
  const [brand, setBrand] = useState<BrandFilter>("all");
  const [type, setType] = useState<ContentType | "all">("all");
  const [audience, setAudience] = useState<Audience | "all">("all");

  const filtered = useMemo(() => INSIGHTS.filter(i =>
    (brand === "all" || i.brand === brand) &&
    (type === "all" || i.contentType === type) &&
    (audience === "all" || i.audience === audience || i.audience === "All")
  ), [brand, type, audience]);

  const featured = filtered.find(i => i.featured) ?? filtered[0];
  const rest = filtered.filter(i => i !== featured);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="container-wide pt-20 lg:pt-28">
          <span className="eyebrow">Insights</span>
          <h1 className="display-1 mt-6 max-w-4xl">Field notes from inside power, engineering and the built environment.</h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
            Market reports, salary guides, candidate resources and case studies — published by the consultants who live inside each sector.
          </p>
        </section>

        <section className="container-wide mt-16 space-y-6">
          <FilterRow label="Brand">
            <Chip active={brand === "all"} onClick={() => setBrand("all")}>All brands</Chip>
            <Chip active={brand === "verto"} onClick={() => setBrand("verto")}>Verto Group</Chip>
            {BRAND_LIST.map(b => (
              <Chip key={b.slug} active={brand === b.slug} onClick={() => setBrand(b.slug)}>{b.name}</Chip>
            ))}
          </FilterRow>
          <FilterRow label="Type">
            <Chip active={type === "all"} onClick={() => setType("all")}>All</Chip>
            {CONTENT_TYPES.map(t => (
              <Chip key={t} active={type === t} onClick={() => setType(t)}>{t}</Chip>
            ))}
          </FilterRow>
          <FilterRow label="Audience">
            <Chip active={audience === "all"} onClick={() => setAudience("all")}>Everyone</Chip>
            <Chip active={audience === "Candidates"} onClick={() => setAudience("Candidates")}>Candidates</Chip>
            <Chip active={audience === "Companies"} onClick={() => setAudience("Companies")}>Companies</Chip>
          </FilterRow>
        </section>

        {featured && (
          <section className="container-wide mt-16">
            <FeaturedCard insight={featured} />
          </section>
        )}

        <section className="container-wide mt-12 pb-24 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((i) => (
            <InsightCard key={i.slug} insight={i} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full rounded-2xl card-surface p-10 text-center text-muted-foreground">
              No insights match those filters yet.
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function FilterRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-xs uppercase tracking-[0.22em] text-muted-foreground w-20 shrink-0">{label}</span>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function Chip({ active, children, onClick }: { active: boolean; children: React.ReactNode; onClick: () => void }) {
  return (
    <button onClick={onClick}
      className="rounded-full px-4 py-1.5 text-xs font-medium transition"
      style={active
        ? { background: "var(--foreground)", color: "var(--background)" }
        : { background: "transparent", border: "1px solid var(--border)", color: "var(--foreground)" }}>
      {children}
    </button>
  );
}

function brandLabel(slug: string) {
  if (slug === "verto") return "Verto Group";
  return BRANDS[slug as keyof typeof BRANDS]?.name ?? slug;
}

function FeaturedCard({ insight }: { insight: (typeof INSIGHTS)[number] }) {
  return (
    <article className="grid gap-0 overflow-hidden rounded-3xl lg:grid-cols-2"
      style={{ background: "var(--ink)", color: "var(--ink-foreground)" }}>
      <div className="p-10 lg:p-14 flex flex-col">
        <div className="text-[10px] uppercase tracking-[0.22em] opacity-70">Featured · {insight.contentType}</div>
        <h2 className="font-display text-3xl md:text-5xl leading-tight mt-5">{insight.title}</h2>
        <p className="mt-6 text-base opacity-80 max-w-md">{insight.excerpt}</p>
        <div className="mt-auto pt-10 flex items-center gap-5 text-xs uppercase tracking-[0.22em] opacity-70">
          <span style={{ color: "var(--accent)" }}>{brandLabel(insight.brand)}</span>
          <span>·</span>
          <span>{insight.readMinutes} min</span>
        </div>
      </div>
      <div className="hidden lg:block relative">
        <InsightThumb
          brand={insight.brand}
          contentType={insight.contentType}
          sector={insight.sector}
          ratio="auto"
          large
          className="h-full w-full"
        />
      </div>
    </article>
  );
}

function InsightCard({ insight }: { insight: (typeof INSIGHTS)[number] }) {
  return (
    <article className="group flex flex-col rounded-2xl card-surface overflow-hidden">
      <InsightThumb brand={insight.brand} contentType={insight.contentType} sector={insight.sector} />
      <div className="p-7 flex flex-col flex-1">
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <span style={{ color: "var(--accent)" }}>{brandLabel(insight.brand)}</span>
          <span>·</span>
          <span>{insight.contentType}</span>
        </div>
        <h3 className="mt-4 font-display text-2xl leading-tight">{insight.title}</h3>
        <p className="mt-3 text-base text-muted-foreground line-clamp-3">{insight.excerpt}</p>
        <div className="mt-auto pt-6 flex items-center justify-between text-xs text-muted-foreground">
          <span>{insight.sector} · {insight.readMinutes} min</span>
          <ArrowUpRight className="h-4 w-4 transition" />
        </div>
      </div>
    </article>
  );
}
