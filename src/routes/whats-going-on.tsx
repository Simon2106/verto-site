import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SocialsFeed } from "@/components/site/SocialsFeed";
import { INSIGHTS, WHATS_GOING_ON, wgoCategory, type Insight } from "@/lib/insights";
import { BRANDS } from "@/lib/brands";
import { ArrowUpRight, Play } from "lucide-react";
import { InsightThumb } from "@/components/site/InsightThumb";
import ibiza8 from "@/assets/client/ibiza8.jpg";
import ibiza9 from "@/assets/client/ibiza9.jpg";
import bptwBadge from "@/assets/client/BPTW_2026_SMALL_ORGANISATION_WHITE.png";

export const Route = createFileRoute("/whats-going-on")({
  head: () => ({
    meta: [
      { title: "What's going on — Verto Group" },
      { name: "description", content: "Incentive trips, awards, promotions and market notes — what's going on across the Verto Group." },
      { property: "og:title", content: "What's going on — Verto Group" },
      { property: "og:description", content: "Specialist knowledge from inside the markets we work in." },
    ],
  }),
  component: WhatsGoingOnPage,
});

/* Real client photography for the culture posts (mirrors the WP featured
   images seeded by the installer); market notes fall back to InsightThumb. */
const IMAGE_BY_SLUG: Record<string, string> = {
  "sunday-times-best-places-to-work-2026": bptwBadge,
  "prague-2026-incentive-trip": ibiza8,
  "ibiza-2026-reveal": ibiza9,
};

/* ── Magazine hub: featured newest story → card grid → Stories video
      placeholders → Instagram. (Approved design, replaces the old
      brand/type/audience filter listing.) ── */
function WhatsGoingOnPage() {
  const all = [...WHATS_GOING_ON, ...INSIGHTS.filter((i) => i.contentType !== "Case Study")]
    .sort((a, b) => b.date.localeCompare(a.date));
  const featured = all[0];
  const rest = all.slice(1);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="container-wide pt-20 lg:pt-28">
          <span className="eyebrow">What&apos;s going on</span>
          <h1 className="display-1 mt-6 max-w-4xl">What&apos;s going on at Verto.</h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
            Incentive trips, awards, promotions and the occasional market note — straight from the team. Case studies now live with each brand.
          </p>
        </section>

        {/* FEATURED — newest story, image left ~60% */}
        {featured && (
          <section className="container-wide mt-16">
            <FeaturedStory insight={featured} />
          </section>
        )}

        {/* CARD GRID — everything else, with category chips */}
        <section className="container-wide mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((i) => (
            <StoryCard key={i.slug} insight={i} />
          ))}
        </section>

        {/* STORIES — video slots (placeholder, client videos to come) */}
        <section className="container-wide mt-24">
          <div className="rounded-3xl p-10 lg:p-14" style={{ background: "var(--ink)", color: "var(--ink-foreground)" }}>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-xl">
                <span className="eyebrow">Stories</span>
                <h2 className="display-3 mt-5">People&apos;s stories.</h2>
                <p className="mt-6 opacity-80 leading-relaxed">
                  The team, on camera — first placements, first incentive trips, the move to the US. Video interviews are being filmed now.
                </p>
              </div>
              <span className="text-[10px] uppercase tracking-[0.24em] opacity-50">
                ⚠ Placeholder — client videos to come
              </span>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {["A first placement", "Hitting the incentive trip", "Building a US desk"].map((label, i) => (
                <div
                  key={label}
                  className="relative aspect-video rounded-2xl flex flex-col items-center justify-center gap-4 text-center p-6"
                  style={{
                    border: "1px dashed color-mix(in oklab, var(--ink-foreground) 30%, transparent)",
                    background: "color-mix(in oklab, var(--ink-foreground) 4%, transparent)",
                  }}
                >
                  <span
                    className="flex h-14 w-14 items-center justify-center rounded-full"
                    style={{ background: "color-mix(in oklab, var(--accent) 22%, transparent)", color: "var(--accent)" }}
                    aria-hidden="true"
                  >
                    <Play className="h-6 w-6 translate-x-[2px]" strokeWidth={1.5} fill="currentColor" />
                  </span>
                  <div>
                    <div className="font-display text-lg leading-snug">{label}</div>
                    <div className="mt-2 text-[10px] uppercase tracking-[0.22em] opacity-60">
                      People&apos;s stories — video coming soon
                    </div>
                  </div>
                  <span className="absolute top-4 right-4 text-[9px] uppercase tracking-[0.2em] opacity-40">0{i + 1}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INSTAGRAM — existing socials embed */}
        <section className="container-wide mt-24 py-24 hairline-top">
          <SocialsFeed />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

function brandLabel(slug: string) {
  if (slug === "verto") return "Verto Group";
  return BRANDS[slug as keyof typeof BRANDS]?.name ?? slug;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

function CategoryChip({ insight, onDark = false }: { insight: Insight; onDark?: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em]"
      style={
        onDark
          ? { background: "color-mix(in oklab, var(--accent) 22%, transparent)", color: "var(--accent)" }
          : { background: "color-mix(in oklab, var(--accent) 14%, transparent)", color: "var(--accent)" }
      }
    >
      {wgoCategory(insight)}
    </span>
  );
}

function StoryMedia({ insight, className = "" }: { insight: Insight; className?: string }) {
  const photo = IMAGE_BY_SLUG[insight.slug];
  if (photo) {
    return (
      <div className={`relative overflow-hidden ${className}`} style={{ background: "#0a0a0a" }}>
        <img src={photo} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-90" aria-hidden="true" />
      </div>
    );
  }
  return (
    <InsightThumb
      brand={insight.brand}
      contentType={insight.contentType}
      sector={insight.sector}
      ratio="auto"
      large
      className={className}
    />
  );
}

function FeaturedStory({ insight }: { insight: Insight }) {
  return (
    <article className="grid overflow-hidden rounded-3xl lg:grid-cols-[3fr_2fr]"
      style={{ background: "var(--ink)", color: "var(--ink-foreground)" }}>
      {/* Image left ~60% */}
      <StoryMedia insight={insight} className="relative min-h-[260px] lg:min-h-[460px] h-full w-full" />
      {/* Copy right */}
      <div className="p-8 lg:p-12 flex flex-col">
        <div className="flex items-center gap-4">
          <CategoryChip insight={insight} onDark />
          <span className="text-[10px] uppercase tracking-[0.22em] opacity-60">Featured story</span>
        </div>
        <h2 className="display-2 mt-6">{insight.title}</h2>
        <p className="mt-6 text-base leading-relaxed opacity-80 max-w-md">{insight.excerpt}</p>
        <div className="mt-auto pt-10 flex items-center gap-4 text-xs uppercase tracking-[0.22em] opacity-70">
          <span style={{ color: "var(--accent)" }}>{brandLabel(insight.brand)}</span>
          <span aria-hidden="true">·</span>
          <span>{formatDate(insight.date)}</span>
          <span aria-hidden="true">·</span>
          <span>{insight.readMinutes} min read</span>
        </div>
      </div>
    </article>
  );
}

function StoryCard({ insight }: { insight: Insight }) {
  return (
    <article className="group flex flex-col rounded-2xl card-surface overflow-hidden">
      <div className="relative">
        <StoryMedia insight={insight} className="aspect-[16/10] w-full" />
        <span className="absolute bottom-3 left-3">
          <CategoryChip insight={insight} onDark />
        </span>
      </div>
      <div className="p-7 flex flex-col flex-1">
        <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <span style={{ color: "var(--accent)" }}>{brandLabel(insight.brand)}</span>
          <span aria-hidden="true">·</span>
          <span>{insight.contentType}</span>
        </div>
        <h3 className="mt-4 font-display text-2xl leading-tight">{insight.title}</h3>
        <p className="mt-3 text-base text-muted-foreground line-clamp-3">{insight.excerpt}</p>
        <div className="mt-auto pt-6 flex items-center justify-between text-xs text-muted-foreground">
          <span>{formatDate(insight.date)} · {insight.readMinutes} min</span>
          <ArrowUpRight className="h-4 w-4 transition" />
        </div>
      </div>
    </article>
  );
}
