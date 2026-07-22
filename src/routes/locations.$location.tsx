import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SocialsFeed } from "@/components/site/SocialsFeed";
import { JobsBoard } from "@/components/site/JobsBoard";
import { TitleReveal } from "@/components/site/TitleReveal";
import { ContactForm } from "@/components/site/ContactForm";
import { LOCATIONS, getLocation, isLocationSlug } from "@/lib/locations";

export const Route = createFileRoute("/locations/$location")({
  beforeLoad: ({ params }) => {
    if (!isLocationSlug(params.location)) throw notFound();
  },
  head: ({ params }) => {
    const loc = isLocationSlug(params.location) ? getLocation(params.location) : undefined;
    return {
      meta: [
        { title: `${loc?.name ?? "Locations"} — Verto Group` },
        { name: "description", content: loc?.statement ?? "Verto Group locations." },
      ],
    };
  },
  component: LocationPage,
});

function LocationPage() {
  const { location } = Route.useParams();
  // Jump back to the top whenever the office changes, so the new page's
  // entrance plays from the hero down.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location]);
  if (!isLocationSlug(location)) return null;
  const loc = getLocation(location);

  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      {/* key={loc.slug} remounts the page per office — all scroll reveals,
          the headline mask animation and the section stagger replay on click */}
      <main className="flex-1 location-page-enter" key={loc.slug}>
        {/* HELLO, {CITY}. + location switcher */}
        <section className="container-wide pt-20 lg:pt-28">
          <span className="eyebrow">Our locations</span>
          <TitleReveal as="h1" className="display-1 mt-6" lines={["Hello,", `${loc.name}.`]} />
          <div className="mt-8 flex flex-wrap gap-2">
            {LOCATIONS.map((l) => (
              <Link
                key={l.slug}
                to="/locations/$location"
                params={{ location: l.slug }}
                viewTransition
                className="rounded-full px-4 py-1.5 text-xs font-medium transition border"
                style={
                  l.slug === loc.slug
                    ? { background: "var(--foreground)", color: "var(--background)", borderColor: "var(--foreground)" }
                    : { borderColor: "var(--border)", color: "var(--foreground)" }
                }
              >
                {l.name}, {l.country}
                {l.status ? " · soon" : ""}
              </Link>
            ))}
          </div>
        </section>

        {/* HERO BANNER */}
        <section className="container-wide mt-12">
          <div className="relative aspect-[16/5] overflow-hidden rounded-3xl">
            <img src={loc.heroImage} alt={`${loc.name} — Verto office`} className="h-full w-full object-cover" loading="lazy" />
            {loc.status && (
              <div
                className="absolute top-5 left-5 rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.24em] font-semibold"
                style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
              >
                {loc.status}
              </div>
            )}
          </div>
          <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground opacity-70">
            Placeholder imagery — real office / team photos to follow
          </p>
        </section>

        {/* FIND US / CONTACT / HEAD OF OFFICE */}
        <section className="container-wide mt-14 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl card-surface p-8">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" style={{ color: "var(--accent)" }} /> Find us
            </div>
            <div className="mt-4 space-y-1 text-base">
              {loc.address.map((line) => (
                <div key={line}>{line}</div>
              ))}
            </div>
            {loc.phone && (
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-3.5 w-3.5" style={{ color: "var(--accent)" }} /> {loc.phone}
              </div>
            )}
          </div>

          <div className="rounded-2xl card-surface p-8">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
              <Mail className="h-3.5 w-3.5" style={{ color: "var(--accent)" }} /> Contact us
            </div>
            <a href={`mailto:${loc.email}`} className="mt-4 block text-base font-medium" style={{ color: "var(--accent)" }}>
              {loc.email}
            </a>
            <p className="mt-3 text-sm text-muted-foreground">
              We reply to every note within one business day.
            </p>
          </div>

          <div className="rounded-2xl p-8" style={{ background: "var(--ink)", color: "var(--ink-foreground)" }}>
            <div className="text-[10px] uppercase tracking-[0.24em] opacity-60">Head of office</div>
            <div className="mt-4 flex items-center gap-4">
              <div
                className="h-14 w-14 rounded-full shrink-0"
                style={{ background: "color-mix(in oklab, var(--accent) 35%, var(--ink))" }}
                aria-hidden
              />
              <div>
                <div className="font-display text-lg leading-tight">{loc.leader.name}</div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.2em] opacity-60">{loc.leader.role}</div>
              </div>
            </div>
            {loc.leader.placeholder && (
              <p className="mt-4 text-xs opacity-50">⚠️ Placeholder — name &amp; photo from client</p>
            )}
          </div>
        </section>

        {/* BRANDS AT THIS OFFICE */}
        <section className="container-wide mt-16">
          <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
            The brands in {loc.name}
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            {loc.brands.map((b) => (
              <div key={b.name} className="rounded-2xl card-surface px-6 py-4">
                <div className="font-display text-lg tracking-tight">{b.name}</div>
                <div className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{b.note}</div>
              </div>
            ))}
          </div>
        </section>

        {/* STATEMENT + PHOTO STRIP */}
        <section className="container-wide py-20">
          <h2 className="display-3 max-w-3xl">{loc.statement}</h2>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {loc.photos.map((p, i) => (
              <div key={i} className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                <img src={p} alt="" aria-hidden className="h-full w-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </section>

        {/* CULTURE CARDS */}
        <section className="hairline-top py-20" style={{ background: "var(--muted)" }}>
          <div className="container-wide">
            <div className="max-w-2xl">
              <span className="eyebrow">Office life</span>
              <h2 className="display-2 mt-5">Get to know {loc.name}.</h2>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {loc.culture.map((c) => (
                <div key={c.category} className="rounded-2xl card-surface p-8">
                  <div className="text-[10px] uppercase tracking-[0.24em]" style={{ color: "var(--accent)" }}>
                    {c.category}
                  </div>
                  <div className="mt-3 font-display text-2xl tracking-tight">{c.title}</div>
                  <p className="mt-3 text-base text-muted-foreground">{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* JOBS AT THIS OFFICE */}
        <section className="py-20 lg:py-24" style={{ background: "var(--ink)", color: "var(--ink-foreground)" }}>
          <div className="container-wide">
            <JobsBoard
              heading={`Roles in ${loc.name}.`}
              intro={`Open seats at this office — filtered for you. Clear the location filter to see every role across the group.`}
              initialLocation={loc.jobLocation}
            />
          </div>
        </section>

        {/* CONTACT FORM */}
        <section className="container-wide py-20">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] items-start">
            <div>
              <span className="eyebrow">Say hello</span>
              <h2 className="display-3 mt-5">Talk to the {loc.name} team.</h2>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                Thinking about joining, relocating{loc.status ? ", or want in on the founding team" : ""} — or just want to see the office? Send a note and it goes straight to {loc.name}.
              </p>
              <Link to="/careers" className="btn-base btn-pill btn-ink mt-8 inline-flex">
                Why join Verto <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="rounded-3xl card-surface p-8 md:p-10">
              <ContactForm brand="verto" />
            </div>
          </div>
        </section>

        {/* BEHIND THE SCENES */}
        <section className="container-wide pb-24 hairline-top pt-20">
          <SocialsFeed
            eyebrow="Behind the scenes"
            heading={`${loc.name}, off the phones.`}
          />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
