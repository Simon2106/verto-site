import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { TeamCard } from "@/components/site/TeamStrip";
import { teamForTier } from "@/lib/team";

export const Route = createFileRoute("/team")({
  head: () => ({
    meta: [
      { title: "Meet the Team — Verto Group" },
      { name: "description", content: "The operators, engineers and market specialists behind Edison Lux, Vertek and Modulr — the people who run every search across the Verto Group." },
      { property: "og:title", content: "Meet the Team — Verto Group" },
      { property: "og:description", content: "Meet the specialists behind Edison Lux, Vertek and Modulr." },
    ],
  }),
  component: TeamPage,
});

/* Client's official structure: Leadership → Management → The team
   (ops fold into the team section on the group pages). */
const TIER_SECTIONS = [
  {
    id: "leadership",
    eyebrow: "Leadership",
    heading: "Run by the people who built it.",
    body: "Verto Group is founder-owned and independently financed. Every leader across the group has come up through the desk.",
    people: teamForTier("leadership"),
  },
  {
    id: "management",
    eyebrow: "Management",
    heading: "The people running the desks.",
    body: "The managers and team leaders who own each brand's market, standard and pipeline day to day.",
    people: teamForTier("management"),
  },
  {
    id: "team",
    eyebrow: "The team",
    heading: "Every desk, every brand.",
    body: "Consultants across Vertek, ModulR, Edison Lux and the group's life sciences desk — plus the operations team behind every search.",
    people: teamForTier("team"),
  },
];

function TeamPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="container-wide pt-20 lg:pt-28 pb-16">
          <span className="eyebrow">The people</span>
          <h1 className="display-1 mt-6 max-w-4xl">Meet the team.</h1>
          <p className="mt-8 max-w-2xl text-lg text-muted-foreground">
            Every consultant across the group sits inside one practice — operators, engineers and in-market specialists, not generalists. This is who you'll be working with.
          </p>
          <nav className="mt-10 flex flex-wrap gap-2">
            {TIER_SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="btn-base btn-pill btn-ghost-outline text-xs"
              >
                {s.eyebrow}
              </a>
            ))}
          </nav>
        </section>

        {TIER_SECTIONS.map((s) => {
          if (s.people.length === 0) return null;
          return (
            <section
              key={s.id}
              id={s.id}
              className="py-24 hairline-top scroll-mt-24"
            >
              <div className="container-wide">
                <div className="max-w-xl">
                  <span className="eyebrow">{s.eyebrow}</span>
                  <h2 className="display-2 mt-5">{s.heading}</h2>
                  <p className="mt-6 text-muted-foreground">{s.body}</p>
                </div>
                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {s.people.map((p) => (
                    <TeamCard key={p.name} person={p} />
                  ))}
                </div>
              </div>
            </section>
          );
        })}
      </main>
      <SiteFooter />
    </div>
  );
}
