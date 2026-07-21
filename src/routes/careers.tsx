import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, GraduationCap, Plane, Trophy, TrendingUp } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SocialsFeed } from "@/components/site/SocialsFeed";
import { JobsBoard } from "@/components/site/JobsBoard";
import { TitleReveal } from "@/components/site/TitleReveal";
import ibizaTeam from "@/assets/client/ibiza8.jpg";
import { INTERNAL_JOBS } from "@/lib/jobs";

export const Route = createFileRoute("/careers")({
  head: () => ({
    meta: [
      { title: "Why join us — Verto Group" },
      {
        name: "description",
        content:
          "40% commission, a share scheme for everyone, two holiday incentives a year and international relocation. Open roles across Verto Group, Edison Lux, Vertek and ModulR.",
      },
      { property: "og:title", content: "Why join us — Verto Group" },
      {
        property: "og:description",
        content:
          "The market's best commission split, ownership for everyone, and two incentive trips a year. See the roles we're hiring now.",
      },
    ],
  }),
  component: CareersPage,
});

/* Why Verto — per client feedback: share scheme, 40% comms,
   relocation opportunities, 2 holidays per year. */
const WHY_VERTO = [
  {
    icon: TrendingUp,
    title: "40% commission",
    body: "One of the best splits in the market, transparent from day one. No thresholds designed to be missed, no clawbacks buried in a handbook.",
  },
  {
    icon: Trophy,
    title: "Share scheme",
    body: "Everyone owns a piece. Not a senior-only perk — every person in the business is in the share scheme, so the group's growth is your growth.",
  },
  {
    icon: Plane,
    title: "2 holiday incentives a year",
    body: "Barcelona 2025. Prague, January 2026. Ibiza this summer. Hit target and you're on the plane with the whole company — twice a year.",
  },
  {
    icon: GraduationCap,
    title: "International relocation",
    body: "UK to Austin. Austin to Miami. When you've built a market, we'll back you to take it abroad — desk, visa and first 90 days planned before you fly.",
  },
];

/* Career path — placeholder structure, refine with client's real ladder */
const CAREER_PATH = [
  { stage: "Trainee Consultant", time: "Months 0–12", body: "Phone-first training inside a live team. Structured L&D, a named mentor and your first placements." },
  { stage: "Consultant", time: "Year 1–2", body: "Your own market and your own clients. Full 40% commission and your first incentive trips." },
  { stage: "Senior Consultant", time: "Year 2–4", body: "A market you're known in. Bigger deals, international briefs, and the option to relocate with your desk." },
  { stage: "Principal / Team Manager", time: "Year 4+", body: "Lead a team or go deeper as a biller — both paths carry equity and a seat in how the group grows." },
];

function CareersPage() {
  const locations = [
    {
      slug: "solent",
      name: "Solent, UK",
      leader: "Site leader — TBC",
      why: "Where Verto started in 2020. Our largest office: Vertek, ModulR and the life sciences desk, five minutes from the south coast.",
      note: "Founding office",
    },
    {
      slug: "austin",
      name: "Austin, TX",
      leader: "Site leader — TBC",
      why: "US HQ on Balcones Drive. Edison Lux and the Vertek US build-out — the fastest-growing part of the group.",
      note: "US headquarters",
    },
    {
      slug: "miami",
      name: "Miami, FL",
      leader: "Site leader — TBC",
      why: "Opening soon. ModulR's US practice and founding desks — ground-floor opportunity, Brickell energy.",
      note: "Coming soon",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* HERO — compact, straight to the point.
            ⚠️ DRAFT COPY — replaces "Build a market. Not a month." per client feedback */}
        <section className="container-wide pt-20 lg:pt-24">
          <span className="eyebrow">Why join us</span>
          <TitleReveal as="h1" className="display-1 mt-6 max-w-4xl" lines={["Back yourself.", "We'll match it."]} />
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
            40% commission. A share scheme that includes everyone. Two incentive holidays a year and a genuine route to the US. If you're going to work this hard anyway, do it somewhere that pays you properly — in money, ownership and experiences.
          </p>
        </section>

        {/* ROLES — at the very top per client feedback */}
        <section
          className="mt-16 py-20 lg:py-24"
          style={{ background: "var(--ink)", color: "var(--ink-foreground)" }}
          id="openings"
        >
          <div className="container-wide">
            <JobsBoard heading="Roles we're hiring right now." />
          </div>
        </section>

        {/* WHY VERTO */}
        <section className="container-wide py-24 grid gap-14 lg:grid-cols-[1fr_2fr]">
          <div>
            <span className="eyebrow">Why Verto</span>
            <h2 className="display-3 mt-5">Four reasons people join. One reason they stay.</h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              The package gets you in the door. The team is why the average consultant is still here years later.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            {WHY_VERTO.map((p) => (
              <div key={p.title} className="hairline-top pt-8">
                <p.icon className="h-8 w-8" strokeWidth={1.5} style={{ color: "var(--accent)" }} />
                <h3 className="mt-4 font-display text-2xl">{p.title}</h3>
                <p className="mt-4 text-muted-foreground leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* RECENT PROMOTIONS — placeholder strip */}
        <section className="hairline-top py-24" style={{ background: "var(--muted)" }}>
          <div className="container-wide">
            <div className="max-w-2xl">
              <span className="eyebrow">Recent promotions</span>
              <h2 className="display-2 mt-5">People are moving up.</h2>
              <p className="mt-6 text-muted-foreground">
                ⚠️ Placeholder — recent promotions will be pulled from the team's socials. Names, new titles and photos to follow.
              </p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="rounded-2xl card-surface p-6">
                  <div className="h-14 w-14 rounded-full" style={{ background: "color-mix(in oklab, var(--accent) 25%, var(--muted))" }} />
                  <div className="mt-4 font-display text-lg">Name TBC</div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.2em]" style={{ color: "var(--accent)" }}>
                    Promoted — role TBC
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">Promotion story from the client's socials.</p>
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
            Learning &amp; development runs underneath all of it — structured training from day one, deal school for consultants, and leadership development for managers. <span className="opacity-70">⚠️ L&amp;D detail to be expanded with client material.</span>
          </p>
        </section>

        {/* INCENTIVES */}
        <section className="hairline-top py-24" style={{ background: "var(--ink)", color: "var(--ink-foreground)" }}>
          <div className="container-wide">
            <div className="grid gap-12 lg:grid-cols-2 items-center">
              <div>
                <div className="text-[11px] uppercase tracking-[0.28em] opacity-60">Incentives</div>
                <h2 className="display-2 mt-5">Hit target. Board the plane.</h2>
                <p className="mt-6 opacity-80 leading-relaxed">
                  Two international incentive trips a year, winners' lunches, sales days and personal training sessions. Barcelona 2025, Prague in January — Ibiza is next.
                </p>
                <p className="mt-4 text-sm opacity-60">
                  ⚠️ Placeholder imagery — holiday incentive clips, winners' lunch photos and sales-day material to come from the client.
                </p>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <img src={ibizaTeam} alt="Verto incentive trip" className="h-full w-full object-cover" loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        {/* LIFE AT VERTO / SOCIALS */}
        <section className="container-wide py-24">
          <SocialsFeed
            eyebrow="Life at Verto"
            heading="The moments between the meetings."
            body="Awards, incentive trips, sales days and the occasional inflatable — what working here actually looks like, on our socials."
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
                If you're already a consultant — or you're not in recruitment yet but think you'd be good at it — we want to talk. Half our hires come from conversations that started months before a desk was live.
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
