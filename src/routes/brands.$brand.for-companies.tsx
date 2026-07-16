import { createFileRoute, Link } from "@tanstack/react-router";
import { BRANDS, isBrandSlug, getBrandImage } from "@/lib/brands";
import { ContactForm } from "@/components/site/ContactForm";
import { ParallaxImage } from "@/components/site/ParallaxImage";
import { SplitFeature } from "@/components/site/SplitFeature";
import { TeamStrip } from "@/components/site/TeamStrip";

export const Route = createFileRoute("/brands/$brand/for-companies")({
  head: ({ params }) => {
    const b = isBrandSlug(params.brand) ? BRANDS[params.brand] : null;
    return {
      meta: [
        { title: b ? `Clients — ${b.name}` : "Clients" },
        { name: "description", content: b?.audiences.company.body ?? "" },
        { property: "og:title", content: b ? `Hire with ${b.name}` : "Clients" },
        { property: "og:description", content: b?.audiences.company.headline ?? "" },
      ],
    };
  },
  component: Page,
});

const SOLUTIONS = [
  {
    title: "Engaged Search",
    tagline: "Our flagship model",
    body: "A committed partnership with a structured process — market mapping, verified shortlists, offer management. Built to remove the chance of failure and get it right first time. 100% success rate on the Engage model.",
    bullets: ["Exclusive partnership", "Structured milestones", "Frequent read-outs"],
  },
  {
    title: "Retained Executive Search",
    tagline: "Director and C-suite mandates",
    body: "Discreet, confidential search for VP, MD, director and C-suite appointments. Off-market approaches, NDA-protected mandates and full lifecycle stakeholder management for the roles that can't be advertised.",
    bullets: ["Retained, fully confidential", "NDA-protected searches", "Stakeholder & offer management"],
  },
  {
    title: "Team Builds",
    tagline: "Partnerships, not placements",
    body: "When a new plant, project or region needs staffing from the ground up — we build the whole team. Proactively, against your timeline, reducing time-to-hire and the cost of the empty seat.",
    bullets: ["Land-and-expand", "Contract and permanent", "Against your project timeline"],
  },
];

function Page() {
  const { brand } = Route.useParams();
  if (!isBrandSlug(brand)) return null;
  const b = BRANDS[brand];
  const c = b.audiences.company;

  return (
    <>
      {/* HERO — parallax image band with overlay copy */}
      <section className="relative overflow-hidden" style={{ color: "var(--ink-foreground)" }}>
        <ParallaxImage
          src={getBrandImage(b, "companiesHero").src}
          alt={getBrandImage(b, "companiesHero").alt}
          className="absolute inset-0"
          speed={0.3}
          overlay={
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(100deg, var(--ink) 0%, color-mix(in oklab, var(--ink) 88%, transparent) 45%, color-mix(in oklab, var(--ink) 40%, transparent) 78%, transparent 100%)",
              }}
            />
          }
        />
        <div className="relative container-wide pt-24 lg:pt-32 pb-24 lg:pb-32">
          <span className="eyebrow" style={{ color: "color-mix(in oklab, var(--ink-foreground) 65%, transparent)" }}>For companies</span>
          <h1 className="display-2 mt-6 max-w-4xl">{c.headline}</h1>
          <p className="mt-8 max-w-2xl text-lg opacity-85">{c.body}</p>
          <div className="mt-10 flex gap-3 flex-wrap">
            <Link to="/contact" className="btn-base btn-primary">Submit a vacancy</Link>
            <Link
              to="/brands/$brand/about"
              params={{ brand: b.slug }}
              className="btn-base btn-ghost-outline"
              style={{ color: "var(--ink-foreground)", borderColor: "color-mix(in oklab, var(--ink-foreground) 30%, transparent)" }}
            >
              How {b.name} works
            </Link>
          </div>
        </div>
      </section>

      {/* INTRO — split panel with copy + image + floating stat */}
      <SplitFeature
        eyebrow={`About ${b.name}`}
        headline="A partnership, not a placement."
        body={
          <>
            <p>
              We exist to find you the best technical commercial talent on the market — and we've earned that right by building trust with our partners over more than a decade.
            </p>
            <p>
              Every consultant specialises in a product area. We recruit across the manufacturer and distributor landscape and represent your business as if it were our own.
            </p>
          </>
        }
        image={getBrandImage(b, "companiesIntro").src}
        imageAlt={getBrandImage(b, "companiesIntro").alt}
        grayscale
        panelBg="#ffffff"
        stats={[
          { value: "94%", label: "Clients hire with us a second time" },
          { value: b.stats[0]?.value ?? "10+", label: b.stats[0]?.label ?? "Years on desk" },
          { value: "1:1", label: "Consultant handles brief to offer" },
        ]}
        cta={{ label: `How ${b.name} works`, to: "/brands/$brand/about", params: { brand: b.slug } }}
      />


      {/* SOLUTIONS — offset staggered cards */}
      <section className="py-24" style={{ background: "var(--muted)" }}>
        <div className="container-wide">
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr] items-end mb-14">
            <div>
              <span className="eyebrow">Hiring solutions</span>
              <h2 className="display-2 mt-5">Sized to the project.<br />Built for the market.</h2>
            </div>
            <p className="text-base opacity-75 max-w-md lg:justify-self-end">
              We construct a tailored hiring plan to meet your requirements — whether you're filling one role or building an entire commercial team.
            </p>
          </div>
          <div className="grid gap-4 lg:grid-cols-3">
            {SOLUTIONS.map((s, i) => (
              <div
                key={s.title}
                className="group relative overflow-hidden p-8 flex flex-col transition-colors duration-300"
                style={{
                  background: "color-mix(in oklab, var(--foreground) 6%, var(--background))",
                  transform: i === 1 ? "translateY(2rem)" : undefined,
                }}
              >
                <span
                  className="absolute top-0 left-0 h-[3px] w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ background: "var(--brand)" }}
                />
                <div className="flex items-baseline justify-between">
                  <div className="font-display text-3xl" style={{ color: "var(--brand)" }}>0{i + 1}</div>
                  <span className="h-[2px] w-10" style={{ background: "var(--brand)" }} />
                </div>
                <h3 className="mt-6 font-display text-2xl">{s.title}</h3>
                <p className="text-xs uppercase tracking-[0.18em] mt-1 opacity-65">{s.tagline}</p>
                <p className="mt-5 text-base leading-relaxed opacity-80">{s.body}</p>
                <ul className="mt-6 space-y-2 text-sm opacity-85">
                  {s.bullets.map((bp) => (
                    <li key={bp} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: "var(--brand)" }} />
                      <span>{bp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS — horizontal rail with connector line */}
      {b.process && b.process.length > 0 && (
        <section className="container-wide py-24">
          <div className="max-w-2xl">
            <span className="eyebrow">How we work</span>
            <h2 className="display-2 mt-5">A process built to remove chance.</h2>
          </div>
          <div className="mt-14 relative">
            <div
              className="hidden md:block absolute left-0 right-0 top-4 h-px"
              style={{ background: "color-mix(in oklab, var(--brand) 30%, transparent)" }}
            />
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
              {b.process.map((s, i) => (
                <div key={s.title} className="relative">
                  <span
                    className="block h-3 w-3 rounded-full ring-4 ring-[var(--background)]"
                    style={{ background: "var(--brand)" }}
                  />
                  <div className="mt-6 flex items-baseline gap-3">
                    <div className="font-display text-2xl" style={{ color: "var(--brand)" }}>0{i + 1}</div>
                    <h3 className="font-display text-xl">{s.title}</h3>
                  </div>
                  <p className="mt-3 text-base opacity-75 leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CASE STUDY — dark parallax */}
      {b.caseStudy && (
        <section className="relative overflow-hidden" style={{ color: "var(--ink-foreground)" }}>
          <ParallaxImage
            src={getBrandImage(b, "companiesCase").src}
            alt=""
            className="absolute inset-0"
            speed={0.32}
            overlay={
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(115deg, var(--ink) 0%, color-mix(in oklab, var(--ink) 92%, transparent) 60%, color-mix(in oklab, var(--ink) 65%, transparent) 100%)",
                }}
              />
            }
          />
          <div className="relative container-wide py-28">
            <span className="eyebrow" style={{ color: "color-mix(in oklab, var(--ink-foreground) 65%, transparent)" }}>
              Case study
            </span>
            <h2 className="display-2 mt-5 max-w-3xl">We make success happen for those we partner with.</h2>
            <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_2fr]">
              <div className="lg:border-r lg:pr-10" style={{ borderColor: "color-mix(in oklab, var(--ink-foreground) 20%, transparent)" }}>
                <div className="text-xs uppercase tracking-[0.22em] opacity-65">Client</div>
                <div className="mt-2 font-display text-2xl">{b.caseStudy.client}</div>
                <div className="mt-8 text-xs uppercase tracking-[0.22em] opacity-65">Sector</div>
                <div className="mt-2 text-sm opacity-85">{b.caseStudy.sector}</div>
              </div>
              <div className="grid gap-10 md:grid-cols-3">
                {[
                  { label: "Challenge", body: b.caseStudy.challenge },
                  { label: "Solution",  body: b.caseStudy.solution  },
                  { label: "Result",    body: b.caseStudy.result    },
                ].map((blk) => (
                  <div key={blk.label}>
                    <div className="text-xs uppercase tracking-[0.22em]" style={{ color: "var(--brand)" }}>{blk.label}</div>
                    <p className="mt-4 text-base leading-relaxed opacity-90">{blk.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TESTIMONIALS — alternating alignment */}
      {b.testimonials && b.testimonials.length > 0 && (
        <section className="container-wide py-24">
          <div className="max-w-2xl">
            <span className="eyebrow">In their words</span>
            <h2 className="display-2 mt-5">Trusted by the businesses we serve.</h2>
          </div>
          <div className="mt-14 grid gap-10 md:grid-cols-2">
            {b.testimonials.map((t, i) => (
              <figure
                key={t.attribution}
                className={`relative pl-8 ${i % 2 === 1 ? "md:mt-16" : ""}`}
                style={{ borderLeft: "2px solid var(--brand)" }}
              >
                <div className="font-display text-5xl leading-none absolute -top-2 -left-3 bg-[var(--background)] px-1" style={{ color: "var(--brand)" }}>"</div>
                <blockquote className="text-base leading-relaxed opacity-90">{t.quote}</blockquote>
                <figcaption className="mt-6 text-xs uppercase tracking-[0.18em] opacity-70">— {t.attribution}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* STATS STRIP */}
      <section className="py-16" style={{ background: "var(--muted)" }}>
        <div className="container-wide grid gap-10 md:grid-cols-3 text-center">
          {b.stats.map((s) => (
            <div key={s.label}>
              <div className="font-display text-5xl" style={{ color: "var(--brand)" }}>{s.value}</div>
              <div className="mt-3 text-xs uppercase tracking-[0.22em] opacity-70">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <TeamStrip brand={brand} brandName={b.name} />

      {/* CONTACT */}
      <section className="container-wide py-24 grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <span className="eyebrow">Talk to us</span>
          <h2 className="display-2 mt-5">Tell us what you need to build.</h2>
          <ul className="mt-8 space-y-4 text-sm">
            {c.bullets.map((bp) => (
              <li key={bp} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: "var(--brand)" }} />
                <span>{bp}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl card-surface p-8 md:p-10">
          <ContactForm brand={brand} defaultAudience="company" />
        </div>
      </section>
    </>
  );
}
