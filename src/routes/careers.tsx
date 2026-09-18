import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SocialsFeed } from "@/components/site/SocialsFeed";
import { JobsBoard } from "@/components/site/JobsBoard";
import { OfferGrid } from "@/components/site/OfferGrid";
import { TitleReveal } from "@/components/site/TitleReveal";
import shareCerts from "@/assets/client/share-certificates-800.jpg";
import millyPoster from "@/assets/client/milly-promotion-poster.jpg";
import sadePoster from "@/assets/client/sade-promotion-poster.jpg";
import shareSchemePoster from "@/assets/client/share-scheme-poster.jpg";
import shareSchemeVideo from "@/assets/client/share-scheme.mp4";
import ibizaTripPoster from "@/assets/client/ibiza-trip-poster.jpg";
import ibizaTripVideo from "@/assets/client/ibiza-trip.mp4";
import salesday01 from "@/assets/client/salesday-01.mp4";
import salesday01Poster from "@/assets/client/salesday-01-poster.jpg";
import salesday02 from "@/assets/client/salesday-02.mp4";
import salesday02Poster from "@/assets/client/salesday-02-poster.jpg";
import salesday03 from "@/assets/client/salesday-03.mp4";
import salesday03Poster from "@/assets/client/salesday-03-poster.jpg";
import salesday04 from "@/assets/client/salesday-04.mp4";
import salesday04Poster from "@/assets/client/salesday-04-poster.jpg";
import salesday05 from "@/assets/client/salesday-05.mp4";
import salesday05Poster from "@/assets/client/salesday-05-poster.jpg";
import salesday06 from "@/assets/client/salesday-06.mp4";
import salesday06Poster from "@/assets/client/salesday-06-poster.jpg";
import salesday07 from "@/assets/client/salesday-07.mp4";
import salesday07Poster from "@/assets/client/salesday-07-poster.jpg";
import salesday08 from "@/assets/client/salesday-08.mp4";
import salesday08Poster from "@/assets/client/salesday-08-poster.jpg";
import salesday09 from "@/assets/client/salesday-09.mp4";
import salesday09Poster from "@/assets/client/salesday-09-poster.jpg";
import salesday10 from "@/assets/client/salesday-10.mp4";
import salesday10Poster from "@/assets/client/salesday-10-poster.jpg";
import { INTERNAL_JOBS } from "@/lib/jobs";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Why join us – Verto Group" },
      {
        name: "description",
        content:
          "40% commission, a share scheme for everyone, two holiday incentives a year and international relocation. Open roles across Verto Group, Edison Lux, Vertek and ModulR.",
      },
      { property: "og:title", content: "Why join us – Verto Group" },
      {
        property: "og:description",
        content:
          "The market's best commission split, ownership for everyone, and two incentive trips a year. See the roles we're hiring now.",
      },
    ],
  }),
  component: CareersPage,
});

/* Recent promotions – real stories from the client's Aug-2026 media drop
   (poster frames from the promotion films; both films play on /whats-going-on). */
const PROMOTIONS = [
  {
    name: "Milly Compton",
    kicker: "Promoted – Edison Lux",
    body: "Confetti cannons in the Edison Lux corner – Milly walked into an office that knew something she didn't.",
    image: millyPoster,
    alt: "Milly Compton walking into the office through confetti",
  },
  {
    name: "Sade Kendall",
    kicker: "Promoted – ModulR",
    body: "The ModulR desk had the confetti ready. Promotion announced in front of the whole office, camera rolling.",
    image: sadePoster,
    alt: "Sade Kendall reading her promotion letter through the confetti",
  },
];

/* Sales-day films – ten short muted loops from the client's Sep-2026 drop
   (compact portrait 480×854, no audio, ≤30s each). Client brief: "Sales
   days are massive for us and something we've been leading in the local
   area. Don't want massive video windows but if we could show these
   somehow all on one section and hover over to play." */
const SALES_DAY_FILMS = [
  { video: salesday01, poster: salesday01Poster },
  { video: salesday02, poster: salesday02Poster },
  { video: salesday03, poster: salesday03Poster },
  { video: salesday04, poster: salesday04Poster },
  { video: salesday05, poster: salesday05Poster },
  { video: salesday06, poster: salesday06Poster },
  { video: salesday07, poster: salesday07Poster },
  { video: salesday08, poster: salesday08Poster },
  { video: salesday09, poster: salesday09Poster },
  { video: salesday10, poster: salesday10Poster },
];

/* Career path – placeholder structure, refine with client's real ladder */
const CAREER_PATH = [
  { stage: "Trainee Consultant", time: "Months 0–12", body: "Phone-first training inside a live team. Structured L&D, a named mentor and your first placements." },
  { stage: "Consultant", time: "Year 1–2", body: "Your own market and your own clients. Full 40% commission and your first incentive trips." },
  { stage: "Senior Consultant", time: "Year 2–4", body: "A market you're known in. Bigger deals, international briefs, and the option to relocate with your desk." },
  { stage: "Principal / Team Manager", time: "Year 4+", body: "Lead a team or go deeper as a biller – both paths carry equity and a seat in how the group grows." },
];

function CareersPage() {
  const locations = [
    {
      slug: "solent",
      name: "Solent, UK",
      leader: "Site leader – TBC",
      why: "Where Verto started in 2020. Our largest office: Vertek, ModulR and the life sciences desk, five minutes from the south coast.",
      note: "Founding office",
    },
    {
      slug: "austin",
      name: "Austin, TX",
      leader: "Site leader – TBC",
      why: "US HQ on Balcones Drive. Edison Lux and the Vertek US build-out – the fastest-growing part of the group.",
      note: "US headquarters",
    },
    {
      slug: "miami",
      name: "Miami, FL",
      leader: "Site leader – TBC",
      why: "Opening soon. ModulR's US practice and founding desks – ground-floor opportunity, Brickell energy.",
      note: "Coming soon",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* HERO – compact, straight to the point.
            ⚠️ DRAFT COPY – replaces "Build a market. Not a month." per client feedback */}
        <section className="container-wide pt-20 lg:pt-24">
          <span className="eyebrow">Why join us</span>
          <TitleReveal as="h1" className="display-1 mt-6 max-w-4xl" lines={["Back yourself.", "We'll match it."]} />
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
            40% commission. A share scheme that includes everyone. Two incentive holidays a year and a genuine route to the US. If you're going to work this hard anyway, do it somewhere that pays you properly – in money, ownership and experiences.
          </p>
        </section>

        {/* ROLES – at the very top per client feedback */}
        <section
          className="mt-16 py-20 lg:py-24"
          style={{ background: "var(--ink)", color: "var(--ink-foreground)" }}
          id="openings"
        >
          <div className="container-wide">
            {/* Round 4, item 5: heading carries no word "roles" (component default) */}
            <JobsBoard />
          </div>
        </section>

        {/* WHAT WE OFFER – round 4, item 11: the four-card "Why Verto" becomes
            the full 14-perk notched card grid (shared with the home page). */}
        <section className="container-wide py-24">
          <div className="max-w-2xl">
            <span className="eyebrow">What we offer</span>
            <h2 className="display-3 mt-5">The package, in full.</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              The package gets you in the door. The team is why the average consultant is still here years later.
            </p>
          </div>
          <div className="mt-14">
            <OfferGrid />
          </div>
        </section>

        {/* RECENT PROMOTIONS – real stories from the Aug-2026 media drop */}
        <section className="hairline-top py-24" style={{ background: "var(--muted)" }}>
          <div className="container-wide">
            <div className="max-w-2xl">
              <span className="eyebrow">Recent promotions</span>
              <h2 className="display-2 mt-5">People are moving up.</h2>
              <p className="mt-6 text-muted-foreground">
                Promotions here get the full treatment – confetti cannons, the whole office on its feet, and a camera rolling. The latest two, plus the films, are on{" "}
                <Link to="/whats-going-on" className="font-medium" style={{ color: "var(--accent)" }}>What&apos;s going on</Link>.
              </p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {PROMOTIONS.map((p) => (
                <div key={p.name} className="rounded-2xl card-surface overflow-hidden flex">
                  <img src={p.image} alt={p.alt} loading="lazy" className="w-28 sm:w-32 object-cover" />
                  <div className="p-6">
                    <div className="font-display text-lg">{p.name}</div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--accent)" }}>
                      {p.kicker}
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CAREER PATH */}
        <section className="container-wide py-24">
          <div className="max-w-2xl">
            <span className="eyebrow">Career path</span>
            <h2 className="display-2 mt-5">Where a desk here takes you.</h2>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {CAREER_PATH.map((s, i) => (
              <div key={s.stage} className="hairline-top pt-8">
                <div className="font-display text-3xl text-muted-foreground">0{i + 1}</div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.22em]" style={{ color: "var(--accent)" }}>{s.time}</div>
                <h3 className="mt-3 font-display text-xl">{s.stage}</h3>
                <p className="mt-4 text-muted-foreground leading-relaxed text-sm">{s.body}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-sm text-muted-foreground">
            Learning &amp; development runs underneath all of it – structured training from day one, deal school for consultants, and leadership development for managers. <span className="opacity-70">⚠️ L&amp;D detail to be expanded with client material.</span>
          </p>
        </section>

        {/* INCENTIVES & SHARE SCHEME – the awards-night photo + the client's
            share-scheme interview film paired with the Ibiza incentive-trip
            film (Sep-2026 drop), both click-to-play */}
        <section className="hairline-top py-24" style={{ background: "var(--ink)", color: "var(--ink-foreground)" }}>
          <div className="container-wide">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <div className="text-[11px] uppercase tracking-[0.28em] opacity-60">Incentives &amp; ownership</div>
                <h2 className="display-2 mt-5">Hit target. Board the plane.</h2>
                <p className="mt-6 opacity-80 leading-relaxed">
                  Two international incentive trips a year, winners&apos; lunches, sales days and personal training sessions. Barcelona 2025, Prague in January, Ibiza this summer – and a share scheme that includes every person in the business. Press play to hear what owning a piece of Verto actually means to the team, and to see where hitting target took the winners this summer.
                </p>
                {/* Round 5, item 10: the share-scheme awards-night photo sits
                    beside the share-scheme film (was the Barcelona group shot). */}
                <figure className="mt-8 m-0">
                  <img
                    src={shareCerts}
                    alt="The Verto team holding their share-scheme award certificates at the awards night"
                    className="w-full rounded-2xl object-cover"
                    loading="lazy"
                  />
                  <figcaption className="mt-3 text-[10px] uppercase tracking-[0.2em] opacity-60">
                    Share scheme awards – everyone owns a piece
                  </figcaption>
                </figure>
              </div>
              <IncentiveFilms />
            </div>
          </div>
        </section>

        {/* SALES DAYS – ten short films in one dense hover-to-play mosaic
            (client brief: no massive video windows, all on one section) */}
        <section className="hairline-top py-24" style={{ background: "var(--muted)" }}>
          <div className="container-wide">
            <div className="max-w-2xl">
              <span className="eyebrow">Sales days</span>
              <h2 className="display-2 mt-5">One day a month, all in.</h2>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                A company favourite: a full day of competition, prizes and noise, every month – and something we've been leading in the local area.
              </p>
            </div>
            <div className="mt-12">
              <SalesDaysMosaic />
            </div>
          </div>
        </section>

        {/* LIFE AT VERTO / SOCIALS */}
        <section className="container-wide py-24">
          <SocialsFeed
            eyebrow="Life at Verto"
            heading="The moments between the meetings."
            body="Awards, incentive trips, sales days and the occasional inflatable – what working here actually looks like, on our socials."
          />
        </section>

        {/* LOCATIONS */}
        <section className="hairline-top py-24" style={{ background: "var(--muted)" }}>
          <div className="container-wide">
            <div className="max-w-2xl">
              <span className="eyebrow">Our locations</span>
              <h2 className="display-2 mt-5">Three places to build from.</h2>
            </div>
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {locations.map((l) => {
                const count = INTERNAL_JOBS.filter((j) => j.location === l.name).length;
                return (
                  <div key={l.name} className="rounded-2xl card-surface p-8 flex flex-col">
                    <div className="text-[10px] uppercase tracking-[0.28em]" style={{ color: "var(--accent)" }}>{l.note}</div>
                    <div className="mt-3 font-display text-2xl tracking-tight">{l.name}</div>
                    <div className="mt-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{l.leader}</div>
                    <p className="mt-5 text-base text-muted-foreground flex-1">{l.why}</p>
                    <div className="mt-6 flex items-center justify-between">
                      <a href="#openings" className="text-sm font-medium" style={{ color: "var(--accent)" }}>
                        {count} open role{count === 1 ? "" : "s"} →
                      </a>
                      <Link
                        to="/locations/$location"
                        params={{ location: l.slug as "solent" | "austin" | "miami" }}
                        viewTransition
                        className="text-sm font-medium opacity-80 hover:opacity-100"
                        style={{ color: "var(--accent)" }}
                      >
                        Office page →
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container-wide py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr] items-start">
            <div>
              <span className="eyebrow">Speculative</span>
              <h2 className="display-3 mt-5">Nothing that fits? Write anyway.</h2>
            </div>
            <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
              <p>
                If you're already a consultant – or you're not in recruitment yet but think you'd be good at it – we want to talk. Half our hires come from conversations that started months before a desk was live.
              </p>
              <Link to="/contact" className="btn-base btn-pill btn-ink">
                Join us <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

/* Careers incentives pairing – the share-scheme interview film beside the
   Ibiza incentive-trip film (Sep-2026 drop): two compact portrait films,
   each poster + play button; a video element (and its bytes) only mounts
   once the visitor presses play. */
function IncentiveFilms() {
  return (
    <div className="grid w-full grid-cols-2 gap-4 justify-self-center" style={{ maxWidth: 480 }}>
      <PortraitFilm
        video={shareSchemeVideo}
        poster={shareSchemePoster}
        label="The share scheme"
        aria="Play – what the share scheme means to the team"
        posterAlt="Still from the Verto share-scheme interviews"
      />
      <PortraitFilm
        video={ibizaTripVideo}
        poster={ibizaTripPoster}
        label="The Ibiza trip"
        aria="Play – the winners' incentive trip to Ibiza"
        posterAlt="Verto takes Ibiza – the summer incentive trip film"
      />
    </div>
  );
}

function PortraitFilm({ video, poster, label, aria, posterAlt }: { video: string; poster: string; label: string; aria: string; posterAlt: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <figure className="m-0 w-full">
      <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: "9 / 16", background: "#000" }}>
        {playing ? (
          <video
            src={video}
            poster={poster}
            controls
            autoPlay
            playsInline
            className="h-full w-full object-cover"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group block h-full w-full cursor-pointer"
            aria-label={aria}
          >
            <img
              src={poster}
              alt={posterAlt}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span
                className="flex h-14 w-14 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
                style={{ background: "color-mix(in oklab, var(--accent) 24%, transparent)", color: "var(--accent)", backdropFilter: "blur(4px)" }}
              >
                <Play className="h-6 w-6 translate-x-[2px]" strokeWidth={1.5} fill="currentColor" />
              </span>
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-3 text-center text-[10px] uppercase tracking-[0.2em] opacity-60">
        {label}
      </figcaption>
    </figure>
  );
}

/* ── Sales-days mosaic ─────────────────────────────────────────────────
   Ten compact portrait film tiles in one dense grid: 5-up desktop, 3-up
   tablet, 2-up mobile. Zero video bytes on page load – each <video>
   mounts with preload="none" and no src; the file is attached on the
   first hover/tap only. Fine pointers play muted on hover and pause +
   rewind on mouseleave; touch devices tap to toggle; reduced motion
   means click-to-play everywhere. At most two tiles play at once –
   starting a third pauses the oldest. Mirrors verto-effects.js §13. */

const MAX_SALESDAYS_PLAYING = 2;
const salesDaysPlaying: { el: HTMLVideoElement; setPlaying: (p: boolean) => void }[] = [];

function stopSalesDayVideo(el: HTMLVideoElement) {
  const i = salesDaysPlaying.findIndex((e) => e.el === el);
  if (i === -1) {
    el.pause();
    return;
  }
  const [entry] = salesDaysPlaying.splice(i, 1);
  entry.el.pause();
  try {
    entry.el.currentTime = 0;
  } catch {
    /* not seekable yet */
  }
  entry.setPlaying(false);
}

function startSalesDayVideo(el: HTMLVideoElement, src: string, setPlaying: (p: boolean) => void) {
  // First interaction: attach the src – nothing downloaded before this.
  if (!el.getAttribute("src")) el.setAttribute("src", src);
  while (salesDaysPlaying.length >= MAX_SALESDAYS_PLAYING) {
    stopSalesDayVideo(salesDaysPlaying[0].el); // pause the oldest
  }
  salesDaysPlaying.push({ el, setPlaying });
  el.muted = true;
  el.play().catch(() => {});
  setPlaying(true);
}

/* Hover drives playback only on fine pointers without reduced motion;
   everywhere else (touch, reduced motion) the tile is click-to-play. */
function salesDaysHoverMode() {
  return (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function SalesDaysMosaic() {
  const [hintHidden, setHintHidden] = useState(false);
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5 lg:gap-4">
      {SALES_DAY_FILMS.map((film, i) => (
        <SalesDayTile
          key={film.video}
          video={film.video}
          poster={film.poster}
          label={`Sales day film ${i + 1} of ${SALES_DAY_FILMS.length}`}
          hint={i === 0 && !hintHidden}
          onInteract={() => setHintHidden(true)}
        />
      ))}
    </div>
  );
}

function SalesDayTile({ video, poster, label, hint, onInteract }: { video: string; poster: string; label: string; hint: boolean; onInteract: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [hintText, setHintText] = useState("Hover to play");

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      setHintText("Tap to play");
    }
  }, []);

  const start = () => {
    const el = ref.current;
    if (!el) return;
    onInteract();
    startSalesDayVideo(el, video, setPlaying);
  };
  const stop = () => {
    const el = ref.current;
    if (el) stopSalesDayVideo(el);
  };
  const toggle = () => (ref.current && !ref.current.paused ? stop() : start());

  return (
    <figure
      role="button"
      tabIndex={0}
      aria-label={`Play – ${label}`}
      className="relative m-0 cursor-pointer overflow-hidden rounded-xl"
      style={{ aspectRatio: "9 / 16", background: "#000" }}
      onMouseEnter={() => salesDaysHoverMode() && start()}
      onMouseLeave={() => salesDaysHoverMode() && stop()}
      onClick={() => {
        if (!salesDaysHoverMode()) toggle(); // hover already handles fine pointers
      }}
      onKeyDown={(e) => {
        if (e.key !== "Enter" && e.key !== " ") return;
        e.preventDefault();
        toggle();
      }}
    >
      <img src={poster} alt={label} loading="lazy" className="absolute inset-0 h-full w-full object-cover" />
      <video
        ref={ref}
        poster={poster}
        muted
        playsInline
        loop
        preload="none"
        tabIndex={-1}
        aria-label={label}
        className={`pointer-events-none absolute inset-0 h-full w-full object-cover transition-opacity duration-300 motion-reduce:transition-none ${playing ? "opacity-100" : "opacity-0"}`}
      />
      {hint && (
        <span
          className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-3 py-1.5 text-[9px] uppercase tracking-[0.2em] text-white"
          style={{ background: "rgba(10, 10, 12, 0.55)", backdropFilter: "blur(4px)" }}
          aria-hidden="true"
        >
          {hintText}
        </span>
      )}
    </figure>
  );
}
