import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import aboutImage from "@/assets/about-image.jpg";
import skylineUK from "@/assets/skyline-uk.jpg";
import skylineEU from "@/assets/skyline-eu.jpg";
import skylineUS from "@/assets/skyline-us.jpg";
import martinDoig from "@/assets/martin-doig.jpg";
import robbieSturgess from "@/assets/robbie-sturgess.webp";
import alexHatfield from "@/assets/alex-hatfield.webp";
import { BRAND_LIST } from "@/lib/brands";

const LEADERSHIP: { name: string; role: string; image: string; bio: string }[] = [
  {
    name: "Martin Doig",
    role: "Founder",
    image: martinDoig,
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    name: "Robbie Sturgess",
    role: "President",
    image: robbieSturgess,
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    name: "Alex Hatfield",
    role: "Recruitment Leader",
    image: alexHatfield,
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Verto Group" },
      { name: "description", content: "Since 2011, Verto has connected exceptional technical and commercial people with the businesses that need them. Three focused brands: Edison Lux, Vertek and Modulr. One process-driven standard." },
      { property: "og:title", content: "About Verto Group" },
      { property: "og:description", content: "Precision talent. Specialist brands. One group. Built on process, not luck." },
    ],
  }),
  component: AboutPage,
});

const PRINCIPLES = [
  {
    n: "01",
    title: "Process over luck",
    body: "Great hiring isn't chance. Our methodology — thorough briefings, structured search, frequent updates — is built to remove the chance of failure at every stage.",
  },
  {
    n: "02",
    title: "Embedded, not transactional",
    body: "94% of our clients work with us again. That comes from understanding a business properly, representing it well in the market, and building relationships that outlast a single hire.",
  },
  {
    n: "03",
    title: "Feedback, always",
    body: "We ask for feedback from every candidate and client we work with, act on it, and build it back into how we operate. Iteration got us here. Precision takes us forward.",
  },
  {
    n: "04",
    title: "Depth wins",
    body: "Every Verto consultant works in one defined market. Our clients and candidates don't generalise — and neither do we.",
  },
];

const FOOTPRINT = [
  { region: "United Kingdom", cities: "London · Manchester", desks: "Vertek · Modulr", image: skylineUK },
  { region: "European Union", cities: "Amsterdam · Frankfurt", desks: "Vertek · Modulr", image: skylineEU },
  { region: "United States", cities: "New York · Houston · Chicago", desks: "Edison Lux · Vertek · Modulr", image: skylineUS },
];

function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="container-wide pt-20 lg:pt-28">
          <span className="eyebrow">About the Verto Group</span>
          <h1 className="display-1 mt-6 max-w-4xl">Precision talent. Specialist brands. One group.</h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
            Since 2011, Verto has done one thing: connect exceptional technical and commercial people with the businesses that need them. We started in technical sales and grew by staying close to the industries we serve — close enough to know the products, the projects and the people by name.
          </p>
        </section>

        <section className="container-wide mt-16">
          <div className="relative aspect-[16/8] overflow-hidden rounded-3xl">
            <img src={aboutImage} alt="A person at the summit looking out across clouds at sunrise"
              className="h-full w-full object-cover" loading="lazy" width={1400} height={1000} />
          </div>
        </section>

        <section className="container-wide py-24 grid gap-14 lg:grid-cols-[1fr_2fr]">
          <div>
            <span className="eyebrow">The thesis</span>
            <h2 className="display-3 mt-5">Why the group exists.</h2>
          </div>
          <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
            <p>
              Verto is a group of three brands, each with its own market, its own networks and its own consultants who work nowhere else. What unites them is the Verto way of working: process-driven search built to get it right first time, feedback taken from every client and candidate interaction, and a belief that we&apos;re here to build teams — not fill seats.
            </p>
            <p>
              A power operator hiring a Head of Commissioning shouldn&apos;t have to explain CCGT to their recruiter. A hydraulic OEM briefing a technical sales role shouldn&apos;t have to walk their consultant through what a proportional valve does. A hyperscaler filling a data-centre PM slot shouldn&apos;t receive commercial-fit-out CVs. Yet in generalist search, all three happen every week.
            </p>
            <p>
              So we built the opposite. Every consultant sits inside one of three brands, each led by people who&apos;ve worked or recruited inside that sector for a decade. Every desk owns its own network, its own reference-checked shortlist and its own view of who&apos;s moving in the market. The group behind them provides the research bench, the ops platform and the quality bar — and stays out of the search itself.
            </p>
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
                Each brand runs independently — its own P&amp;L, its own MD, its own client relationships. What&apos;s shared is the standard every search is held to.
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

        <section className="hairline-top py-24" style={{ background: "var(--ink)", color: "var(--ink-foreground)" }}>
          <div className="container-wide">
            <div className="max-w-2xl">
              <div className="text-[11px] uppercase tracking-[0.28em] opacity-60">Footprint</div>
              <h2 className="display-2 mt-5">Three regions, one group.</h2>
              <p className="mt-6 opacity-80">
                Desks are placed where our clients are, not where the property is cheapest. Every region runs on the same platform, so a US brief with UK candidates — or the reverse — moves through one team.
              </p>
            </div>
            <div className="mt-14 grid gap-0 md:grid-cols-3">
              {FOOTPRINT.map((f, i) => (
                <div key={f.region}
                  className="relative overflow-hidden p-8 min-h-[260px] flex flex-col justify-end"
                  style={{ borderLeft: i > 0 ? "1px solid rgba(255,255,255,0.12)" : undefined }}>
                  <img
                    src={f.image}
                    alt={`${f.region} skyline`}
                    loading="lazy"
                    width={1280}
                    height={768}
                    className="absolute inset-0 h-full w-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, color-mix(in oklab, var(--ink) 35%, transparent) 0%, color-mix(in oklab, var(--ink) 65%, transparent) 60%, var(--ink) 100%)" }} />
                  <div className="relative">
                    <div className="text-[10px] uppercase tracking-[0.28em] opacity-60">{f.region}</div>
                    <div className="mt-4 font-display text-2xl">{f.cities}</div>
                    <div className="mt-3 text-sm opacity-70">{f.desks}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container-wide py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr] items-start">
            <div>
              <span className="eyebrow">Leadership</span>
              <h2 className="display-3 mt-5">Run by the people who built it.</h2>
            </div>
            <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
              <p>
                Verto Group is founder-owned and independently financed. Every MD across the three practices has come up through the desk — either as a recruiter inside their sector, or as an operator hired by one of ours.
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

        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
