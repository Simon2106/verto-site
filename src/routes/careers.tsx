import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Instagram } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import aboutImage from "@/assets/about-image.jpg";
import { BRAND_LIST } from "@/lib/brands";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Careers — Work for Verto Group" },
      {
        name: "description",
        content:
          "Build a career inside one of Verto's three specialist brands — Edison Lux, Vertek and Modulr. Process-driven search, real desks, a real seat.",
      },
      { property: "og:title", content: "Careers — Work for Verto Group" },
      {
        property: "og:description",
        content:
          "Join a group of specialist recruitment brands built on process, not luck. Open desks across the UK, EU and US.",
      },
    ],
  }),
  component: CareersPage,
});

const PRINCIPLES = [
  {
    n: "01",
    title: "One market, real depth",
    body: "Every consultant sits inside one brand and one sector. You'll go a mile deep — not a foot deep across ten industries.",
  },
  {
    n: "02",
    title: "Process, not pressure",
    body: "Structured search, real briefings, honest feedback loops. No sink-or-swim smiling-and-dialling — you're here to build a market, not survive a month.",
  },
  {
    n: "03",
    title: "Bill share, not lottery",
    body: "Transparent commission from day one. No thresholds designed to be missed, no clawbacks buried in a handbook.",
  },
  {
    n: "04",
    title: "Built to stay",
    body: "The average Verto consultant has been with us for over four years. Longevity is designed in — with training, mobility across the three brands, and equity for senior operators.",
  },
];

const STAGES = [
  {
    n: "01",
    title: "Conversation",
    body: "A 30-minute call with the MD of the brand you're closest to. No forms, no aptitude tests — just a real conversation about the market and what you want.",
  },
  {
    n: "02",
    title: "Desk day",
    body: "Half a day inside the team. Meet the consultants, sit on live briefings, look at pipeline. You interview us as much as we interview you.",
  },
  {
    n: "03",
    title: "Offer",
    body: "A written offer within a week of the desk day. Base, commission, tools and 90-day plan on one page — nothing hidden.",
  },
];

const OPENINGS: {
  role: string;
  brand: string;
  location: string;
  type: string;
}[] = [
  {
    role: "Principal Consultant — US Energy",
    brand: "Edison Lux",
    location: "Houston, TX",
    type: "Full-time",
  },
  {
    role: "Senior Consultant — Fluid Power & Hydraulics",
    brand: "Vertek",
    location: "Manchester, UK",
    type: "Full-time",
  },
  {
    role: "Consultant — Data Centres & Critical Environments",
    brand: "Modulr",
    location: "London, UK",
    type: "Full-time",
  },
  {
    role: "Research Associate — Group Research Bench",
    brand: "Verto Group",
    location: "London, UK",
    type: "Full-time",
  },
  {
    role: "Business Development — Vertek EU",
    brand: "Vertek",
    location: "Amsterdam, NL",
    type: "Full-time",
  },
];

function CareersPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* HERO */}
        <section className="container-wide pt-20 lg:pt-28">
          <span className="eyebrow">Careers at Verto Group</span>
          <h1 className="display-1 mt-6 max-w-4xl">
            Build a market.<br />Not a month.
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
            Verto is a group of three specialist recruitment brands — Edison
            Lux, Vertek and Modulr — built on the belief that great search is a
            long game played by people who actually know their sector. If
            that's the career you want, this is where it happens.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#openings" className="btn-base btn-pill btn-ink">
              See open desks
            </a>
            <Link to="/contact" className="btn-base btn-pill btn-ghost-outline">
              Talk to a leader
            </Link>

          </div>
        </section>

        <section className="container-wide mt-16">
          <div className="relative aspect-[16/8] overflow-hidden rounded-3xl">
            <img
              src={aboutImage}
              alt="Verto Group workplace"
              className="h-full w-full object-cover"
              loading="lazy"
              width={1400}
              height={1000}
            />
          </div>
        </section>

        {/* WHY VERTO */}
        <section className="container-wide py-24 grid gap-14 lg:grid-cols-[1fr_2fr]">
          <div>
            <span className="eyebrow">Why Verto</span>
            <h2 className="display-3 mt-5">Four things every desk gets.</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            {PRINCIPLES.map((p) => (
              <div key={p.n} className="hairline-top pt-8">
                <div className="font-display text-3xl text-muted-foreground">
                  {p.n}
                </div>
                <h3 className="mt-4 font-display text-2xl">{p.title}</h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* THREE BRANDS */}
        <section className="hairline-top py-24" style={{ background: "var(--muted)" }}>
          <div className="container-wide">
            <div className="max-w-2xl">
              <span className="eyebrow">Where you'd sit</span>
              <h2 className="display-2 mt-5">
                Three brands. Pick the one that fits.
              </h2>
              <p className="mt-6 text-muted-foreground">
                Every consultant joins one of the three brands. You'll be
                trained by the MD of that practice, own accounts in that
                sector, and represent that brand externally — with the full
                weight of the group behind you.
              </p>
            </div>
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {BRAND_LIST.map((b) => (
                <Link
                  key={b.slug}
                  to="/brands/$brand"
                  params={{ brand: b.slug }}
                  data-brand={b.slug}
                  className="group rounded-2xl card-surface p-8"
                >
                  <div className="font-display text-2xl tracking-tight">
                    {b.wordmark}
                  </div>
                  <div
                    className="text-[10px] uppercase tracking-[0.28em] mt-1"
                    style={{ color: "var(--brand)" }}
                  >
                    {b.qualifier}
                  </div>
                  <p className="mt-5 text-base text-muted-foreground">
                    {b.positioning}
                  </p>
                  <div
                    className="mt-6 text-sm font-medium"
                    style={{ color: "var(--brand)" }}
                  >
                    Visit {b.name} →
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* HOW WE HIRE */}
        <section className="container-wide py-24">
          <div className="max-w-2xl">
            <span className="eyebrow">How we hire</span>
            <h2 className="display-2 mt-5">Three stages. Two weeks. One offer.</h2>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {STAGES.map((s) => (
              <div key={s.n} className="hairline-top pt-8">
                <div className="font-display text-3xl text-muted-foreground">
                  {s.n}
                </div>
                <h3 className="mt-4 font-display text-2xl">{s.title}</h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* INSTAGRAM */}
        <section className="container-wide py-24 hairline-top">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr] items-start">
            <div>
              <span className="eyebrow">Life at Verto</span>
              <h2 className="display-3 mt-5">The moments between the meetings.</h2>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                Awards, desk days, team trips and the occasional inflatable — see what working here actually looks like.
              </p>
              <a
                href="https://www.instagram.com/verto_people/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-base btn-pill btn-ink mt-8 inline-flex"
              >
                <Instagram className="h-4 w-4" />
                Follow @verto_people
              </a>
            </div>
            <div className="rounded-2xl overflow-hidden border border-border bg-surface">
              <iframe
                src="https://www.instagram.com/verto_people/embed"
                title="Verto People on Instagram"
                className="w-full h-[540px] md:h-[640px]"
                loading="lazy"
                frameBorder={0}
                scrolling="no"
                allowTransparency
              />
            </div>
          </div>
        </section>

        {/* OPENINGS */}
        <section
          id="openings"
          className="hairline-top py-24"
          style={{ background: "var(--ink)", color: "var(--ink-foreground)" }}
        >
          <div className="container-wide">
            <div className="max-w-2xl">
              <div className="text-[11px] uppercase tracking-[0.28em] opacity-60">
                Open desks
              </div>
              <h2 className="display-2 mt-5">Roles we're hiring now.</h2>
              <p className="mt-6 opacity-80">
                We also always want to hear from experienced consultants in our
                three sectors — even if the exact desk isn't listed. Send us a
                note.
              </p>
            </div>
            <div className="mt-12 hairline-top">
              {OPENINGS.map((o) => (
                <Link
                  key={o.role}
                  to="/contact"
                  className="group flex flex-wrap items-center justify-between gap-4 py-6 hairline-bottom"
                >
                  <div className="min-w-0 flex-1">
                    <div
                      className="text-[10px] uppercase tracking-[0.22em] font-semibold"
                      style={{ color: "var(--accent)" }}
                    >
                      {o.brand}
                    </div>
                    <div className="mt-2 font-display text-xl md:text-2xl">
                      {o.role}
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm opacity-80">
                    <span>{o.location}</span>
                    <span className="hidden sm:inline">{o.type}</span>
                    <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </div>
                </Link>
              ))}
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
                If you're already a consultant in energy, industrial engineering
                or the built environment and you're thinking about what's
                next — we want to talk. Half our hires come from conversations
                that started months before a desk was live.
              </p>
              <Link to="/contact" className="btn-base btn-pill btn-ink">
                Start a conversation
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
