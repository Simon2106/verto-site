import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SocialsFeed } from "@/components/site/SocialsFeed";
import ibizaHero from "@/assets/client/ibiza9.jpg";
import skylineUK from "@/assets/skyline-uk.jpg";
import skylineUS from "@/assets/skyline-us.jpg";
import skylineEU from "@/assets/skyline-eu.jpg";
import martinDoig from "@/assets/martin-doig.jpg";
import robbieSturgess from "@/assets/robbie-sturgess.webp";
import alexHatfield from "@/assets/alex-hatfield.webp";
import { BRAND_LIST } from "@/lib/brands";
import { TEAM } from "@/lib/team";

const LEADERSHIP: { name: string; role: string; image: string; bio: string }[] = [
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
  {
    name: "Alex Hatfield",
    role: "Recruitment Leader",
    image: alexHatfield,
    bio: "Runs the recruitment engine — training, process and the phone-first standard every desk works to.",
  },
];

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
          <h1 className="display-1 mt-6 max-w-4xl">Made in 2020. Built the hard way.</h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
            We opened our doors in February 2020 — and you know what happened next. Powered by determination and a lack of other options, Verto took its first steps as many others shut down. Today that lockdown business is all grown up: three specialist brands, a life sciences desk, and teams across the UK and US.
          </p>
        </section>

        <section className="container-wide mt-16">
          <div className="relative aspect-[16/8] overflow-hidden rounded-3xl">
            <img src={ibizaHero} alt="The Verto team in Ibiza"
              className="h-full w-full object-cover" loading="lazy" width={1400} height={1000} />
            <div className="absolute bottom-4 right-5 text-[10px] uppercase tracking-[0.24em] text-white/80">
              Ibiza — the 2026 summer incentive
            </div>
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
          <div className="mt-14 overflow-x-auto pb-6 timeline-scroll">
            <div className="flex gap-0 px-6 md:px-10 w-max items-stretch">
              {TIMELINE.map((t, i) => (
                <div key={`${t.date}-${t.title}`} className="relative w-[240px] shrink-0 pr-8">
                  {/* connector line */}
                  <div className="absolute left-0 right-0 top-[7px] h-px" style={{ background: "color-mix(in oklab, var(--ink-foreground) 22%, transparent)" }} />
                  <div
                    className="relative h-[15px] w-[15px] rounded-full border-2"
                    style={{
                      background: t.highlight ? "var(--accent)" : "var(--ink)",
                      borderColor: t.highlight ? "var(--accent)" : "color-mix(in oklab, var(--ink-foreground) 40%, transparent)",
                    }}
                  />
                  <div className="mt-5 text-[10px] uppercase tracking-[0.24em]" style={{ color: t.highlight ? "var(--accent)" : "color-mix(in oklab, var(--ink-foreground) 55%, transparent)" }}>
                    {t.date}
                  </div>
                  <div className={`mt-2 pr-4 leading-snug ${t.highlight ? "font-display text-lg" : "text-sm opacity-85"}`} style={{ minHeight: i % 2 ? undefined : undefined }}>
                    {t.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
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

          {/* Everyone */}
          <div className="mt-24">
            <div className="max-w-2xl">
              <span className="eyebrow">The whole team</span>
              <h2 className="display-3 mt-5">Everyone. Not just the leadership page.</h2>
            </div>
            <div className="mt-12 grid gap-x-6 gap-y-10 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {TEAM.map((m) => (
                <div key={m.name} className="group text-center">
                  <div className="relative aspect-square overflow-hidden rounded-2xl" style={{ background: "var(--muted)" }}>
                    {m.image ? (
                      <img
                        src={m.image}
                        alt={m.name}
                        loading="lazy"
                        className="h-full w-full object-cover grayscale-[30%] transition duration-300 group-hover:grayscale-0"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center font-display text-2xl text-muted-foreground">
                        {m.name.split(/\s+/).map((p) => p[0]).slice(0, 2).join("")}
                      </div>
                    )}
                  </div>
                  <div className="mt-3 font-display text-sm tracking-tight">{m.name}</div>
                  <div className="mt-0.5 text-[9px] uppercase tracking-[0.18em] text-muted-foreground">{m.role}</div>
                </div>
              ))}
            </div>
            <p className="mt-8 text-sm text-muted-foreground">
              Plus the group research bench and operations team behind every desk. <Link to="/team" className="font-medium" style={{ color: "var(--accent)" }}>Meet the full team →</Link>
            </p>
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
