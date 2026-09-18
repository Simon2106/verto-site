import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SocialsFeed } from "@/components/site/SocialsFeed";
import { INSIGHTS, WHATS_GOING_ON, wgoCategory, type Insight } from "@/lib/insights";
import { BRANDS } from "@/lib/brands";
import { ArrowUpRight } from "lucide-react";
import { InsightThumb } from "@/components/site/InsightThumb";
import { PlayBadge } from "@/components/site/PlayBadge";
import ibiza11 from "@/assets/client/ibiza-11.jpg";
import bptwBadge from "@/assets/client/BPTW_2026_SMALL_ORGANISATION_WHITE.png";
import pragueTeam from "@/assets/client/verto-01-800.jpg";
import barcelonaTeam from "@/assets/client/barcelona-01.jpg";
import summitTeam from "@/assets/client/summit-03.jpg";
import millyPoster from "@/assets/client/milly-promotion-poster.jpg";
import sadePoster from "@/assets/client/sade-promotion-poster.jpg";
import millyFilm from "@/assets/client/milly-promotion.mp4";
import sadeFilm from "@/assets/client/sade-promotion.mp4";
import summitFilm from "@/assets/client/summit-film.mp4";
import summitFilmPoster from "@/assets/client/summit-film-poster.jpg";
import ibizaTripFilm from "@/assets/client/ibiza-trip.mp4";
import ibizaTripPoster from "@/assets/client/ibiza-trip-poster.jpg";
import charityFilm from "@/assets/client/charity-film.mp4";
import charityFilmPoster from "@/assets/client/charity-film-poster.jpg";
import shareCerts from "@/assets/client/share-certificates-800.jpg";

export const Route = createFileRoute("/whats-going-on")({
  head: () => ({
    meta: [
      { title: "What's going on – Verto Group" },
      { name: "description", content: "Incentive trips, awards, promotions and market notes – what's going on across the Verto Group." },
      { property: "og:title", content: "What's going on – Verto Group" },
      { property: "og:description", content: "Specialist knowledge from inside the markets we work in." },
    ],
  }),
  component: WhatsGoingOnPage,
});

/* Real client photography for the culture posts (mirrors the WP featured
   images seeded by the installer); market notes fall back to InsightThumb. */
const IMAGE_BY_SLUG: Record<string, string> = {
  "share-scheme-awards-night": shareCerts,
  "sunday-times-best-places-to-work-2026": bptwBadge,
  "prague-2026-incentive-trip": pragueTeam,
  "ibiza-2026-reveal": ibiza11,
  "barcelona-where-the-incentive-trips-started": barcelonaTeam,
  "inside-the-summer-summit": summitTeam,
  "milly-compton-promoted": millyPoster,
  "sade-kendall-promoted": sadePoster,
};

/* Recent events – the client's event films (Sep-2026 drop: summit / Ibiza /
   charity night) plus the Milly and Sade promotion films. Portrait 9:16
   poster tiles with play badges; the <video> element only mounts (and its
   bytes only move) once the badge is pressed. Supersedes the old People's
   stories placeholder slots – these are the real films. */
const RECENT_EVENTS = [
  {
    title: "Summer summit",
    note: "The whole group, one castle",
    video: summitFilm,
    poster: summitFilmPoster,
  },
  {
    title: "Ibiza incentive trip",
    note: "The winners board the plane",
    video: ibizaTripFilm,
    poster: ibizaTripPoster,
  },
  {
    title: "Charity night",
    note: "The gala for Maeve's Mission",
    video: charityFilm,
    poster: charityFilmPoster,
  },
  {
    title: "Milly's promotion",
    note: "Confetti in the Edison Lux corner",
    video: millyFilm,
    poster: millyPoster,
  },
  {
    title: "Sade's promotion",
    note: "The moment it landed",
    video: sadeFilm,
    poster: sadePoster,
  },
];

/* ── Magazine hub: featured newest story → card grid → Recent-events
      video rail → Instagram. (Approved design, replaces the old
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
            Incentive trips, awards, promotions and the occasional market note – straight from the team. Case studies now live with each brand.
          </p>
        </section>

        {/* FEATURED – newest story, image left ~60% */}
        {featured && (
          <section className="container-wide mt-16">
            <FeaturedStory insight={featured} />
          </section>
        )}

        {/* CARD GRID – everything else, with category chips */}
        <section className="container-wide mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((i) => (
            <StoryCard key={i.slug} insight={i} />
          ))}
        </section>

        {/* RECENT EVENTS – compact rail of the client's event films
            (summit / Ibiza / charity night + the promotion films) */}
        <section className="container-wide mt-24">
          <div className="rounded-3xl p-10 lg:p-14" style={{ background: "var(--ink)", color: "var(--ink-foreground)" }}>
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-xl">
                <span className="eyebrow">Recent events</span>
                <h2 className="display-3 mt-5">The last few months, on film.</h2>
                <p className="mt-6 opacity-80 leading-relaxed">
                  The summit, the Ibiza trip, the charity night and two promotions landing – press play.
                </p>
              </div>
            </div>
            <div
              className="mt-10 grid gap-4 overflow-x-auto pb-2 lg:grid-cols-5 lg:overflow-visible"
              style={{ gridAutoFlow: "column", gridAutoColumns: "min(62vw, 15rem)", scrollSnapType: "x proximity" }}
            >
              {RECENT_EVENTS.map((film) => (
                <EventTile key={film.title} {...film} />
              ))}
            </div>
          </div>
        </section>

        {/* INSTAGRAM – existing socials embed */}
        <section className="container-wide mt-24 py-24 hairline-top">
          <SocialsFeed />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

/* One tile on the Recent-events rail: poster + play badge until pressed,
   then the video mounts with native controls and autoplays. One-line
   caption underneath. */
function EventTile({ title, note, video, poster }: { title: string; note: string; video: string; poster: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <figure className="m-0 flex flex-col gap-3" style={{ scrollSnapAlign: "start" }}>
      <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "9 / 16", background: "#000" }}>
        {playing ? (
          <video
            src={video}
            poster={poster}
            controls
            autoPlay
            playsInline
            className="h-full w-full object-cover"
            onEnded={() => setPlaying(false)}
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group block h-full w-full cursor-pointer"
            aria-label={`Play – ${title}`}
          >
            <img src={poster} alt={`${title} – film still`} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
            <PlayBadge />
          </button>
        )}
      </div>
      <figcaption className="text-[10px] uppercase tracking-[0.18em] opacity-70 leading-relaxed">
        {title} – {note}
      </figcaption>
    </figure>
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

function StoryMedia({ insight, className = "", large = false }: { insight: Insight; className?: string; large?: boolean }) {
  const photo = IMAGE_BY_SLUG[insight.slug];
  if (photo) {
    return (
      <div className={`relative overflow-hidden ${className}`} style={{ background: "#0a0a0a" }}>
        <img src={photo} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-90" aria-hidden="true" />
        {/* Round 6, item 3: video stories read as video before the click */}
        {insight.video && <PlayBadge large={large} />}
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
      <StoryMedia insight={insight} large className="relative min-h-[260px] lg:min-h-[460px] h-full w-full" />
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
          <span>{insight.video ? "Video" : insight.contentType}</span>
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
