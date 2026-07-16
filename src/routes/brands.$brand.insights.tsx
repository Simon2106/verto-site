import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { BRANDS, isBrandSlug } from "@/lib/brands";
import { INSIGHTS, CONTENT_TYPES, type ContentType } from "@/lib/insights";
import { ArrowUpRight } from "lucide-react";
import { InsightThumb } from "@/components/site/InsightThumb";
import { TeamStrip } from "@/components/site/TeamStrip";

export const Route = createFileRoute("/brands/$brand/insights")({
  head: ({ params }) => {
    const b = isBrandSlug(params.brand) ? BRANDS[params.brand] : null;
    return {
      meta: [
        { title: b ? `Insights — ${b.name}` : "Insights" },
        { name: "description", content: b ? `Market reports, salary guides and case studies from ${b.name}.` : "" },
      ],
    };
  },
  component: Page,
});

function Page() {
  const { brand } = Route.useParams();
  const [type, setType] = useState<ContentType | "all">("all");
  const items = useMemo(() => INSIGHTS.filter(i =>
    i.brand === brand && (type === "all" || i.contentType === type)
  ), [brand, type]);

  if (!isBrandSlug(brand)) return null;
  const b = BRANDS[brand];

  return (
    <>
      <section className="container-wide pt-20 lg:pt-28">
        <span className="eyebrow">Insights</span>
        <h1 className="display-2 mt-6 max-w-3xl">Field notes from inside {b.focus.toLowerCase()}.</h1>
        <p className="mt-6 max-w-2xl text-lg opacity-80">
          The thinking from the consultants closest to the {b.focus.toLowerCase()} market.
        </p>
      </section>

      <section className="container-wide mt-12 flex flex-wrap gap-2">
        <Chip active={type === "all"} onClick={() => setType("all")}>All</Chip>
        {CONTENT_TYPES.map(t => (
          <Chip key={t} active={type === t} onClick={() => setType(t)}>{t}</Chip>
        ))}
      </section>

      <section className="container-wide py-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 pb-24">
        {items.map((i) => (
          <article key={i.slug} className="group rounded-2xl card-surface overflow-hidden">
            <InsightThumb brand={i.brand} contentType={i.contentType} sector={i.sector} />
            <div className="p-7">
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{i.contentType}</div>
              <h3 className="mt-4 font-display text-2xl leading-tight">{i.title}</h3>
              <p className="mt-3 text-base opacity-75 line-clamp-3">{i.excerpt}</p>
              <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
                <span>{i.sector} · {i.readMinutes} min</span>
                <ArrowUpRight className="h-4 w-4 transition" />
              </div>
            </div>
          </article>
        ))}
        {items.length === 0 && (
          <div className="col-span-full rounded-2xl card-surface p-10 text-center text-muted-foreground">
            Nothing here yet — try a different filter.
          </div>
        )}
      </section>

      <TeamStrip brand={brand} brandName={b.name} />

      <section className="container-wide pb-24">
        <Link to="/insights" className="text-sm font-medium" style={{ color: "var(--brand)" }}>
          ← View all Verto Group insights
        </Link>
      </section>
    </>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick}
      className="rounded-full px-4 py-1.5 text-xs font-medium transition"
      style={active
        ? { background: "var(--brand)", color: "var(--brand-foreground)" }
        : { background: "transparent", border: "1px solid var(--border)", color: "var(--foreground)" }}>
      {children}
    </button>
  );
}
