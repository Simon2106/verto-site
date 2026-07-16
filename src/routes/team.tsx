import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { TeamCard } from "@/components/site/TeamStrip";
import { BRAND_LIST } from "@/lib/brands";
import { teamForBrand } from "@/lib/team";

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
            {BRAND_LIST.map((b) => (
              <a
                key={b.slug}
                href={`#${b.slug}`}
                className="btn-base btn-pill btn-ghost-outline text-xs"
              >
                {b.name}
              </a>
            ))}
          </nav>
        </section>

        {BRAND_LIST.map((b) => {
          const people = teamForBrand(b.slug);
          if (people.length === 0) return null;
          return (
            <section
              key={b.slug}
              id={b.slug}
              data-brand={b.slug}
              className="py-24 hairline-top scroll-mt-24"
            >
              <div className="container-wide">
                <div className="flex flex-wrap items-end justify-between gap-6">
                  <div className="max-w-xl">
                    <span className="eyebrow">{b.qualifier}</span>
                    <h2 className="display-2 mt-5">{b.name}</h2>
                    <p className="mt-6 text-muted-foreground">{b.focus}</p>
                  </div>
                  <Link
                    to="/brands/$brand"
                    params={{ brand: b.slug }}
                    className="text-sm font-medium"
                    style={{ color: "var(--brand)" }}
                  >
                    Visit {b.name} →
                  </Link>
                </div>
                <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {people.map((p) => (
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
