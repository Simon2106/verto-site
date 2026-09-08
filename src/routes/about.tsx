import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Camera, ChevronLeft, ChevronRight } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SectorCoverage } from "@/components/site/SectorCoverage";
import { SocialsFeed } from "@/components/site/SocialsFeed";
import { TitleReveal } from "@/components/site/TitleReveal";
import ibizaSea from "@/assets/client/ibiza-11.jpg";
import summitLetters from "@/assets/client/summit-02-800.jpg";
import barcelonaTeam from "@/assets/client/barcelona-01-800.jpg";
import galaStage from "@/assets/client/gala-01-800.jpg";
import galaGroup from "@/assets/client/gala-02-800.jpg";
import aboutImage from "@/assets/about-image.jpg";
import skylineUK from "@/assets/skyline-uk.jpg";
import skylineUS from "@/assets/skyline-us.jpg";
import skylineEU from "@/assets/skyline-eu.jpg";
import martinDoig from "@/assets/martin-doig.jpg";
import robbieSturgess from "@/assets/robbie-sturgess.webp";
import alexHatfield from "@/assets/alex-hatfield.webp";
import { BRAND_LIST } from "@/lib/brands";
import { teamForTier, initials, memberBrandColor, type TeamMember } from "@/lib/team";

/* ── Photo collage under the "Made in 2020" intro (approved design) —
      tile spans map to a 4-col grid; subtle stagger via --reveal-delay.
      Aug-2026 media drop: real Ibiza sea shot leads, plus the summit letters
      and a Barcelona group shot from the client's event photography. ── */
const COLLAGE: { src: string; alt: string; caption?: string; span: string }[] = [
  { src: ibizaSea, alt: "The Verto team in the sea in Ibiza", caption: "Ibiza — the 2026 summer incentive", span: "col-span-2 row-span-2" },
  { src: summitLetters, alt: "The Verto summer summit", caption: "The summer summit", span: "col-span-2" },
  { src: barcelonaTeam, alt: "The team outside the W Barcelona", span: "col-span-1" },
  { src: aboutImage, alt: "The team at work", span: "col-span-1" },
  { src: skylineUK, alt: "Solent, UK — where it started", caption: "Solent, UK", span: "col-span-2" },
  { src: skylineUS, alt: "Austin, TX — the US build-out", caption: "Austin, TX", span: "col-span-2" },
];

/* ── Community & DE&I — the gala cards carry the client's real charity-gala
      photography; the DE&I card stays a placeholder until the client's
      commitments/numbers arrive. ── */
const COMMUNITY: { title: string; body: string; image?: string; alt?: string }[] = [
  {
    title: "Gala nights",
    // Round 4, item 17: two galas now — most recent for Maeve's Mission,
    // after the 2023 Amelia-Mae Foundation gala.
    body: "Black-tie charity galas — most recently for Maeve's Mission, following the 2023 gala that raised £15,504 for the Amelia-Mae Foundation.",
    image: galaStage,
    alt: "The team on stage at the charity gala",
  },
  {
    title: "Charity & fundraising",
    body: "Every office backs a cause the team chooses — fundraisers, sponsored events and hands-on volunteering through the year.",
    image: galaGroup,
    alt: "Black-tie group at the charity gala",
  },
  {
    title: "DE&I commitments",
    body: "Hiring on ability, progressing on results. Our DE&I commitments — and the numbers behind them — publish here soon.",
  },
];

/* Client's official structure (Aug 2026): Alex Hatfield (President),
   Martin Doig (Founder), Robbie Sturgess (President). */
const LEADERSHIP: { name: string; role: string; image: string; bio: string }[] = [
  {
    name: "Alex Hatfield",
    role: "President",
    image: alexHatfield,
    bio: "Runs the recruitment engine — training, process and the phone-first standard every desk works to.",
  },
  {
    name: "Martin Doig",
    role: "Founder",
    image: martinDoig,
    bio: "Opened Verto's doors in February 2020 — three weeks before lockdown — and built the group from a standing start.",
  },
  {
    name: "Robbie Sturgess",
    role: "President",
    image: robbieSturgess,
    bio: "Leads the group across three locations and four desks, from first UK placement to the US build-out.",
  },
];

/* Compact people grid — Management and The team sections (ops fold in).
   Round 4, item 16: each portrait carries a 2px ring + soft tint in the
   member's own brand colour (first brand in their list). */
function TeamMiniGrid({ people }: { people: TeamMember[] }) {
  return (
    <div className="mt-12 grid gap-x-6 gap-y-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {people.map((m) => (
        <div key={m.name} className="group text-center">
          <div
            className="relative aspect-square overflow-hidden rounded-2xl"
            data-brand={m.brands[0] ?? "verto"}
            style={{
              background: `color-mix(in oklab, ${memberBrandColor(m)} 10%, var(--muted))`,
              boxShadow: `0 0 0 2px color-mix(in oklab, ${memberBrandColor(m)} 65%, transparent), 0 14px 28px -18px color-mix(in oklab, ${memberBrandColor(m)} 40%, transparent)`,
            }}
          >
            {m.image ? (
              <img
                src={m.image}
                alt={m.name}
                loading="lazy"
                className="h-full w-full object-cover grayscale-[30%] transition duration-300 group-hover:grayscale-0"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center font-display text-2xl text-muted-foreground">
                {initials(m.name)}
              </div>
            )}
          </div>
          <div className="mt-3 font-display text-sm tracking-tight">{m.name}</div>
          <div className="mt-0.5 text-[9px] uppercase tracking-[0.18em] text-muted-foreground">{m.role}</div>
        </div>
      ))}
    </div>
  );
}

/* Timeline — from the client's own history (vertopeople.com/who-we-are) */
const TIMELINE: { date: string; title: string; highlight?: boolean }[] = [
  { date: "Feb 2020", title: "Verto People founded", highlight: true },
  { date: "Mar 2020", title: "Lockdown announced" },
  { date: "Jul 2020", title: "Back to the office" },
  { date: "Aug 2020", title: "Moved to our 2nd office" },
  { date: "Nov 2020", title: "First international placement", highlight: true },
  { date: "Feb 2021", title: "First employee joins" },
  { date: "Jun 2021", title: "Moved to our 3rd office" },
  { date: "Aug 2022", title: "Moved to our 4th office" },
  { date: "Oct 2022", title: "The Verto rebrand", highlight: true },
  { date: "Dec 2022", title: "First US placement", highlight: true },
  { date: "Mar 2023", title: "Winner of 2 categories — Business Awards UK" },
  { date: "Jul 2023", title: "Shortlisted for Best New Agency — Recruiter Awards" },
  { date: "Sep 2023", title: "Charity gala for the Amelia-Mae Foundation" },
  { date: "Nov 2023", title: "Best New Recruitment Agency of the Year — British Recruitment Awards", highlight: true },
  { date: "Feb 2024", title: "Finalist — News Business Excellence Awards" },
  { date: "Mar 2024", title: "£15,504 raised for the Amelia-Mae Foundation", highlight: true },
  { date: "Sep 2025", title: "First international incentive trip — Barcelona" },
  { date: "Jan 2026", title: "Prague incentive trip" },
  { date: "2026", title: "The Sunday Times Best Places to Work", highlight: true },
];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Verto Group" },
      { name: "description", content: "Founded in February 2020, Verto connects exceptional technical and commercial people with the businesses that need them. Three focused brands: Edison Lux, Vertek and Modulr. One process-driven standard." },
      { property: "og:title", content: "About Verto Group" },
      { property: "og:description", content: "Precision talent. Specialist brands. One group. Built on process, not luck — since 2020." },
    ],
  }),
  component: AboutPage,
});

/* The Verto standard — structure kept, wording redrafted per client feedback.
   ⚠️ DRAFT COPY — for client sign-off. */
const PRINCIPLES = [
  {
    n: "01",
    title: "Own your day",
    body: "Nobody here waits to be told. Every consultant plans their market, runs their desk and takes satisfaction from doing exactly what they said they'd do.",
  },
  {
    n: "02",
    title: "Phone first",
    body: "Markets move in conversations, not inboxes. We pick up the phone first — to candidates, to clients, to each other — and everything we know comes from that.",
  },
  {
    n: "03",
    title: "Ask better questions",
    body: "Curiosity is a working tool here. The best shortlist starts with the question nobody else asked — of the client, the candidate and ourselves.",
  },
  {
    n: "04",
    title: "Win as a team",
    body: "Deals are individual; success isn't. We celebrate together, travel together and hold each other to the same standard — whichever brand the placement lands in.",
  },
];

const FOOTPRINT = [
  { region: "Solent, UK", cities: "Arena Business Centre, Havant, Portsmouth", desks: "Vertek · ModulR · Verto Life Sciences", image: skylineUK, note: "Where it started — Feb 2020" },
  { region: "Austin, TX", cities: "5900 Balcones Drive, Austin", desks: "Edison Lux · Vertek US", image: skylineUS, note: "US HQ" },
  { region: "Miami, FL", cities: "Opening soon", desks: "ModulR US", image: skylineEU, note: "Coming soon" },
];

function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="container-wide pt-20 lg:pt-28">
          <span className="eyebrow">About the Verto Group</span>
          <TitleReveal as="h1" className="display-1 mt-6 max-w-4xl" lines={["Made in 2020.", "Built the hard way."]} />
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
            We opened our doors in February 2020 — and you know what happened next. Powered by determination and a lack of other options, Verto took its first steps as many others shut down. Today that lockdown business is all grown up: three specialist brands, a life sciences desk, and teams across the UK and US.
          </p>
        </section>

        {/* PHOTO COLLAGE — replaces the single Ibiza hero image */}
        <section className="container-wide mt-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[140px] md:auto-rows-[180px] lg:auto-rows-[210px] gap-3 md:gap-4">
            {COLLAGE.map((tile, i) => (
              <div
                key={tile.src + tile.alt}
                data-reveal
                className={`group relative overflow-hidden rounded-2xl ${tile.span}`}
                style={{ ["--reveal-delay" as string]: `${i * 90}ms`, background: "var(--muted)" }}
              >
                <img
                  src={tile.src}
                  alt={tile.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                {tile.caption && (
                  <>
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
                      style={{ background: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.55) 100%)" }}
                      aria-hidden="true"
                    />
                    <div className="absolute bottom-3 right-4 text-[10px] uppercase tracking-[0.24em] text-white/85">
                      {tile.caption}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="container-wide py-24 grid gap-14 lg:grid-cols-[1fr_2fr]">
          <div>
            <span className="eyebrow">The thesis</span>
            <h2 className="display-3 mt-5">Why the group exists.</h2>
          </div>
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
            <p>
              Verto is a group of specialist brands, each with its own market, its own networks and its own consultants who work nowhere else. What unites them is the Verto way of working: process-driven search built to get it right first time, feedback taken from every client and candidate interaction, and a belief that we&apos;re here to build teams — not fill seats.
            </p>
            <p>
              A power operator hiring a Head of Commissioning shouldn&apos;t have to explain CCGT to their recruiter. A hydraulic OEM briefing a technical sales role shouldn&apos;t have to walk their consultant through what a proportional valve does. A hyperscaler filling a data-centre PM slot shouldn&apos;t receive commercial-fit-out CVs. Yet in generalist search, all three happen every week.
            </p>
            <p>
              So we built the opposite. Every consultant sits inside one of three brands, each led by people who&apos;ve worked or recruited inside that sector. Every desk owns its own network, its own reference-checked shortlist and its own view of who&apos;s moving in the market. The group behind them provides the research bench, the ops platform and the quality bar — and stays out of the search itself.
            </p>
          </div>
        </section>

        {/* TIMELINE */}
        <section className="hairline-top py-24" style={{ background: "var(--ink)", color: "var(--ink-foreground)" }}>
          <div className="container-wide">
            <div className="max-w-2xl">
              <div className="text-[11px] uppercase tracking-[0.28em] opacity-60">The story so far</div>
              <h2 className="display-2 mt-5">2020 → today.</h2>
              <p className="mt-6 opacity-80">From a lockdown start-up to The Sunday Times Best Places to Work — scroll the journey.</p>
            </div>
          </div>
          <TimelineCarousel />
        </section>

        <section className="hairline-top py-24" style={{ background: "var(--muted)" }}>
          <div className="container-wide">
            <div className="max-w-2xl">
              <span className="eyebrow">The three brands</span>
              <h2 className="display-2 mt-5 whitespace-pre-line">
                Three teams.{"\n"}
                Three markets.{"\n"}
                One standard.
              </h2>
              <p className="mt-6 text-muted-foreground">
                Each brand runs independently — its own P&amp;L, its own MD, its own client relationships. What&apos;s shared is the standard every search is held to. Our life sciences desk sits with the group while it grows.
              </p>
            </div>
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {BRAND_LIST.map((b) => (
                <Link key={b.slug} to="/brands/$brand" params={{ brand: b.slug }} data-brand={b.slug}
                  className="group rounded-2xl card-surface p-8">
                  <div className="font-display text-2xl tracking-tight">{b.wordmark}</div>
                  <div className="text-[10px] uppercase tracking-[0.28em] mt-1" style={{ color: "var(--brand)" }}>{b.qualifier}</div>
                  <p className="mt-5 text-base text-muted-foreground">{b.positioning}</p>
                  <div className="mt-6 text-sm font-medium" style={{ color: "var(--brand)" }}>Visit {b.name} →</div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SECTOR COVERAGE — duplicated from the homepage (client feedback, item 9) */}
        <SectorCoverage />

        <section className="container-wide py-24">
          <div className="max-w-2xl">
            <span className="eyebrow">The Verto standard</span>
            <h2 className="display-2 mt-5">Four principles every desk is held to.</h2>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-2">
            {PRINCIPLES.map((p) => (
              <div key={p.n} className="hairline-top pt-8">
                <div className="font-display text-3xl text-muted-foreground">{p.n}</div>
                <h3 className="mt-4 font-display text-2xl">{p.title}</h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTPRINT */}
        <section className="hairline-top py-24" style={{ background: "var(--ink)", color: "var(--ink-foreground)" }}>
          <div className="container-wide">
            <div className="max-w-2xl">
              <div className="text-[11px] uppercase tracking-[0.28em] opacity-60">Our footprint</div>
              <h2 className="display-2 mt-5">Solent. Austin. Soon, Miami.</h2>
              <p className="mt-6 opacity-80">
                Where it started, where it&apos;s grown, and where it&apos;s going next. Every location runs on the same platform, so a US brief with UK candidates — or the reverse — moves through one team.
              </p>
            </div>
            <div className="mt-14 grid gap-0 md:grid-cols-3">
              {FOOTPRINT.map((f, i) => (
                <div key={f.region}
                  className="relative overflow-hidden p-8 min-h-[260px] flex flex-col justify-end"
                  style={{ borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.12)" : undefined }}>
                  <img
                    src={f.image}
                    alt={`${f.region}`}
                    loading="lazy"
                    width={1280}
                    height={768}
                    className="absolute inset-0 h-full w-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, color-mix(in oklab, var(--ink) 35%, transparent) 0%, color-mix(in oklab, var(--ink) 65%, transparent) 60%, var(--ink) 100%)" }} />
                  <div className="relative">
                    <div className="text-[10px] uppercase tracking-[0.28em]" style={{ color: "var(--accent)" }}>{f.note}</div>
                    <div className="mt-3 font-display text-2xl">{f.region}</div>
                    <div className="mt-2 text-sm opacity-80">{f.cities}</div>
                    <div className="mt-3 text-sm opacity-70">{f.desks}</div>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-[10px] uppercase tracking-[0.2em] opacity-50">
              Location imagery is placeholder — real office / team photos to follow
            </p>
          </div>
        </section>

        {/* LEADERSHIP + FULL TEAM */}
        <section className="container-wide py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr] items-start">
            <div>
              <span className="eyebrow">Leadership</span>
              <h2 className="display-3 mt-5">Run by the people who built it.</h2>
            </div>
            <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
              <p>
                Verto Group is founder-owned and independently financed. Every leader across the group has come up through the desk — either as a recruiter inside their sector, or as an operator hired by one of ours.
              </p>
              <p>
                We&apos;re not chasing the size league table. We&apos;re building the group we&apos;d have wanted to work with as clients: technical enough to earn the brief, senior enough to close, small enough to actually care about the outcome.
              </p>
            </div>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {LEADERSHIP.map((p) => (
              <div key={p.name} className="group">
                <div className="relative aspect-square w-full mx-auto" style={{ width: "85%" }}>
                  <div
                    className="absolute inset-[6%] rounded-full transition-colors duration-300"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 45%, color-mix(in oklab, var(--brand) 32%, var(--surface)) 0%, color-mix(in oklab, var(--brand) 12%, var(--surface)) 60%, color-mix(in oklab, var(--brand) 4%, var(--surface)) 100%)",
                    }}
                    aria-hidden
                  />
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="relative h-full w-full object-contain grayscale-[35%] brightness-90 transition duration-300 group-hover:grayscale-0 group-hover:brightness-100"
                  />
                </div>
                <div className="mt-5 text-center">
                  <div className="font-display text-xl tracking-tight">{p.name}</div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.22em]" style={{ color: "var(--brand)" }}>{p.role}</div>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground max-w-xs mx-auto">{p.bio}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Management → The team (client's official structure; ops fold into the team) */}
          <div className="mt-24">
            <div className="max-w-2xl">
              <span className="eyebrow">Management</span>
              <h2 className="display-3 mt-5">The people running the desks.</h2>
            </div>
            <TeamMiniGrid people={teamForTier("management")} />
          </div>

          <div className="mt-24">
            <div className="max-w-2xl">
              <span className="eyebrow">The team</span>
              <h2 className="display-3 mt-5">Everyone. Not just the leadership page.</h2>
            </div>
            <TeamMiniGrid people={teamForTier("team")} />
            <p className="mt-8 text-sm text-muted-foreground">
              Consultants across every brand, plus the group operations desk behind every search. <Link to="/team" className="font-medium" style={{ color: "var(--accent)" }}>Meet the full team →</Link>
            </p>
          </div>
        </section>

        {/* COMMUNITY & DE&I — real gala photography; DE&I card still pending client numbers */}
        <section className="container-wide py-24 hairline-top">
          <div className="max-w-2xl">
            <span className="eyebrow">Community &amp; DE&amp;I</span>
            <h2 className="display-2 mt-5">More than the numbers.</h2>
            <p className="mt-6 text-muted-foreground">
              Gala nights, fundraising and a genuine commitment to building a diverse group — the parts of Verto that never make a sales deck.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {COMMUNITY.map((card) => (
              <article key={card.title} className="flex flex-col rounded-2xl card-surface overflow-hidden">
                {card.image ? (
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={card.image} alt={card.alt ?? card.title} loading="lazy" className="h-full w-full object-cover" />
                  </div>
                ) : (
                  <div
                    className="flex aspect-[16/10] flex-col items-center justify-center gap-3 text-center"
                    style={{
                      background: "var(--muted)",
                      borderBottom: "1px dashed color-mix(in oklab, var(--foreground) 20%, transparent)",
                    }}
                  >
                    <Camera className="h-6 w-6" strokeWidth={1.5} style={{ color: "var(--muted-foreground)" }} aria-hidden="true" />
                    <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                      Photos coming from client
                    </span>
                  </div>
                )}
                <div className="p-7">
                  <h3 className="font-display text-2xl leading-tight">{card.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-muted-foreground">{card.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* BEHIND THE SCENES / SOCIALS */}
        <section className="container-wide py-24 hairline-top">
          <SocialsFeed
            eyebrow="Behind the scenes"
            heading="Us, off the phones."
            body="Summer summits, sales days, charity galas and two incentive trips a year — follow along on Instagram."
          />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
 * Timeline auto-carousel (matches verto-effects.js §8 in the WP build):
 * auto-advances to the next milestone every 3.5s, pauses on hover /
 * touch / focus, resumes after 6s idle, syncs to manual swipes (native
 * overflow scroll stays the mechanism) and fills a gold progress line
 * between visited milestones. Reduced motion → plain manual scroll.
 * ───────────────────────────────────────────────────────────── */
const TIMELINE_ADVANCE_MS = 3500;
const TIMELINE_RESUME_MS = 6000;

function TimelineCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  /* Round 4, item 15: chevron nav — the effect wires stepRef to the
     carousel's go(); before wiring (or with reduced motion) the buttons
     fall back to paging the native scroll. */
  const stepRef = useRef<((dir: 1 | -1) => void) | null>(null);
  const stepManual = (dir: 1 | -1) => {
    if (stepRef.current) stepRef.current(dir);
    else scrollerRef.current?.scrollBy({ left: dir * 264, behavior: "auto" });
  };

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; // manual scroll only

    const items = Array.from(scroller.querySelectorAll<HTMLElement>("[data-milestone]"));
    if (!items.length) return;

    let idx = 0;
    let paused = false;
    let programmatic = false;
    let progTimer = 0;
    let idleTimer = 0;

    const mark = (i: number) => {
      setActive(i);
      setProgress(items[i].offsetLeft + 8); // 8px ≈ dot centre
    };
    const go = (i: number) => {
      idx = i;
      programmatic = true;
      window.clearTimeout(progTimer);
      progTimer = window.setTimeout(() => { programmatic = false; }, 900);
      scroller.scrollTo({ left: Math.max(0, items[i].offsetLeft - 24), behavior: "smooth" });
      mark(i);
    };

    mark(0);
    const timer = window.setInterval(() => {
      if (!paused) go((idx + 1) % items.length);
    }, TIMELINE_ADVANCE_MS);

    const pause = () => { paused = true; window.clearTimeout(idleTimer); };
    const scheduleResume = () => {
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => { paused = false; }, TIMELINE_RESUME_MS);
    };
    // Chevrons step the carousel index and hold off the autoplay a while.
    stepRef.current = (dir) => {
      pause();
      scheduleResume();
      go((idx + dir + items.length) % items.length);
    };
    const onScroll = () => {
      if (programmatic) return;
      pause();
      scheduleResume();
      // Sync active milestone + progress to the swipe position
      const x = scroller.scrollLeft + 24;
      let nearest = 0;
      for (let i = 0; i < items.length; i++) {
        if (Math.abs(items[i].offsetLeft - x) < Math.abs(items[nearest].offsetLeft - x)) nearest = i;
      }
      idx = nearest;
      mark(nearest);
    };

    scroller.addEventListener("pointerenter", pause);
    scroller.addEventListener("pointerleave", scheduleResume);
    scroller.addEventListener("touchstart", pause, { passive: true });
    scroller.addEventListener("touchend", scheduleResume);
    scroller.addEventListener("focusin", pause);
    scroller.addEventListener("focusout", scheduleResume);
    scroller.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      stepRef.current = null;
      window.clearInterval(timer);
      window.clearTimeout(idleTimer);
      window.clearTimeout(progTimer);
      scroller.removeEventListener("pointerenter", pause);
      scroller.removeEventListener("pointerleave", scheduleResume);
      scroller.removeEventListener("touchstart", pause);
      scroller.removeEventListener("touchend", scheduleResume);
      scroller.removeEventListener("focusin", pause);
      scroller.removeEventListener("focusout", scheduleResume);
      scroller.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <>
      {/* Round 4, item 15: chevron nav replaces the (now hidden) scrollbar */}
      <div className="container-wide mt-12 flex justify-end gap-2.5">
        <button
          type="button"
          aria-label="Previous milestones"
          onClick={() => stepManual(-1)}
          className="timeline-btn flex h-10 w-10 items-center justify-center rounded-full"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label="Next milestones"
          onClick={() => stepManual(1)}
          className="timeline-btn flex h-10 w-10 items-center justify-center rounded-full"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div ref={scrollerRef} className="mt-4 overflow-x-auto pb-6 timeline-scroll" tabIndex={0} aria-label="Verto timeline — 2020 to today">
      <div className="relative flex gap-0 px-6 md:px-10 w-max items-stretch">
        {/* Gold progress line — fills between visited milestones */}
        <div
          className="absolute top-[7px] h-[2px]"
          style={{
            left: 0,
            width: progress,
            background: "var(--accent)",
            transition: "width 600ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
          aria-hidden="true"
        />
        {TIMELINE.map((t, i) => (
          <div
            key={`${t.date}-${t.title}`}
            data-milestone
            className="relative w-[240px] shrink-0 pr-8 origin-bottom-left transition-transform duration-500"
            style={{ transform: i === active ? "scale(1.05)" : t.highlight ? "scale(1.02)" : undefined }}
          >
            {/* connector line */}
            <div className="absolute left-0 right-0 top-[7px] h-px" style={{ background: "color-mix(in oklab, var(--ink-foreground) 22%, transparent)" }} />
            <div
              className="relative h-[15px] w-[15px] rounded-full border-2 transition-colors duration-500"
              style={{
                background: t.highlight || i <= active ? "var(--accent)" : "var(--ink)",
                borderColor: t.highlight || i <= active ? "var(--accent)" : "color-mix(in oklab, var(--ink-foreground) 40%, transparent)",
              }}
            />
            <div className="mt-5 text-[10px] uppercase tracking-[0.24em]" style={{ color: t.highlight ? "var(--accent)" : "color-mix(in oklab, var(--ink-foreground) 55%, transparent)" }}>
              {t.date}
            </div>
            <div className={`mt-2 pr-4 leading-snug ${t.highlight ? "font-display text-lg" : "text-sm opacity-85"}`}>
              {t.title}
            </div>
          </div>
        ))}
      </div>
      </div>
    </>
  );
}
