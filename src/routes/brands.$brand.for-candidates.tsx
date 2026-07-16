import { createFileRoute, Link } from "@tanstack/react-router";
import { BRANDS, isBrandSlug, getBrandImage } from "@/lib/brands";
import { ContactForm } from "@/components/site/ContactForm";
import { ParallaxImage } from "@/components/site/ParallaxImage";
import { SplitFeature } from "@/components/site/SplitFeature";
import { TeamStrip } from "@/components/site/TeamStrip";

export const Route = createFileRoute("/brands/$brand/for-candidates")({
  head: ({ params }) => {
    const b = isBrandSlug(params.brand) ? BRANDS[params.brand] : null;
    return {
      meta: [
        { title: b ? `Candidates — ${b.name}` : "Candidates" },
        { name: "description", content: b?.audiences.candidate.body ?? "" },
        { property: "og:title", content: b ? `Career conversations — ${b.name}` : "Candidates" },
        { property: "og:description", content: b?.audiences.candidate.headline ?? "" },
      ],
    };
  },
  component: Page,
});

function Page() {
  const { brand } = Route.useParams();
  if (!isBrandSlug(brand)) return null;
  const b = BRANDS[brand];
  const c = b.audiences.candidate;

  return (
    <>
      {/* HERO — striking dark parallax band */}
      <section className="relative overflow-hidden" style={{ color: "var(--ink-foreground)" }}>
        <ParallaxImage
          src={getBrandImage(b, "candidatesHero").src}
          alt={getBrandImage(b, "candidatesHero").alt}
          className="absolute inset-0"
          speed={0.3}
          overlay={
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(260deg, var(--ink) 0%, color-mix(in oklab, var(--ink) 88%, transparent) 45%, color-mix(in oklab, var(--ink) 40%, transparent) 78%, transparent 100%)",
              }}
            />
          }
        />
        <div className="relative container-wide pt-24 lg:pt-32 pb-24 lg:pb-32">
          <div className="lg:ml-auto lg:max-w-2xl">
            <span className="eyebrow" style={{ color: "var(--brand)" }}>For candidates</span>
            <h1 className="display-2 mt-6 whitespace-pre-line" style={{ color: "var(--ink-foreground)" }}>{c.headline}</h1>
            <p className="mt-8 max-w-xl text-lg" style={{ color: "var(--ink-foreground)" }}>{c.body}</p>
            <div className="mt-10 flex gap-3 flex-wrap">
              <Link to="/contact" className="btn-base btn-primary">Start a conversation</Link>
              <Link
                to="/brands/$brand/about"
                params={{ brand: b.slug }}
                className="btn-base btn-ghost-outline"
                style={{ color: "var(--ink-foreground)", borderColor: "color-mix(in oklab, var(--ink-foreground) 30%, transparent)" }}
              >
                About {b.name}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO — inverted split (image left, copy right) */}
      <SplitFeature
        reverse
        eyebrow="Represented properly"
        headline="Sold on your merits."
        body={
          <>
            <p>
              A job posted on LinkedIn gets hundreds of CVs. Working with {b.name} means you and your experience are put front and centre — sold to the hiring manager before your first interview.
            </p>
            <p>
              We only call when there's a role genuinely worth your time. Honest feedback, no fluff, no promises we can't deliver.
            </p>
          </>
        }
        image={getBrandImage(b, "candidatesIntro").src}
        imageAlt={getBrandImage(b, "candidatesIntro").alt}
        grayscale
        panelBg="#ffffff"
        stats={[
          { value: "72h", label: "First feedback after your intro call" },
          { value: "100%", label: "Confidential — always" },
          { value: "1:1", label: "Same consultant, brief to offer" },
        ]}
        cta={{ label: `About ${b.name}`, to: "/brands/$brand/about", params: { brand: b.slug } }}
      />


      {/* SECTORS — dense chip grid */}
      {b.sectorsServed && b.sectorsServed.length > 0 && (
        <section className="container-wide py-24">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr] items-end mb-12">
            <div>
              <span className="eyebrow">Where we recruit</span>
              <h2 className="display-2 mt-5">Specialists across the industries we serve.</h2>
            </div>
          </div>
          <div className="grid gap-px" style={{ background: "color-mix(in oklab, var(--brand) 18%, transparent)" }}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px">
              {b.sectorsServed.map((s, i) => (
                <div
                  key={s}
                  className="p-6 text-sm font-medium flex items-center gap-3"
                  style={{ background: "var(--background)" }}
                >
                  <span className="font-display text-xs opacity-50">0{i + 1}</span>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PROCESS — zigzag rail */}
      {b.candidateProcess && b.candidateProcess.length > 0 && (
        <section className="container-wide py-24">
          <div className="max-w-2xl">
            <span className="eyebrow">What to expect</span>
            <h2 className="display-2 mt-5">From first call to first day — and beyond.</h2>
          </div>
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {b.candidateProcess.map((s, i) => (
              <div
                key={s.title}
                className="group relative overflow-hidden p-7 transition-colors duration-300"
                style={{
                  background: "color-mix(in oklab, var(--foreground) 6%, var(--background))",
                  transform: i % 2 === 1 ? "translateY(2rem)" : undefined,
                }}
              >
                <span
                  className="absolute top-0 left-0 h-[3px] w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ background: "var(--brand)" }}
                />
                <div className="font-display text-2xl" style={{ color: "var(--brand)" }}>0{i + 1}</div>
                <h3 className="mt-3 font-display text-xl">{s.title}</h3>
                <p className="mt-3 text-base opacity-75 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TESTIMONIALS — dark parallax band */}
      {b.testimonials && b.testimonials.length > 0 && (
        <section className="relative overflow-hidden" style={{ color: "var(--ink-foreground)" }}>
          <ParallaxImage
            src={getBrandImage(b, "candidatesTestimonials").src}
            alt=""
            className="absolute inset-0"
            speed={0.32}
            overlay={
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, var(--ink) 0%, color-mix(in oklab, var(--ink) 92%, transparent) 55%, color-mix(in oklab, var(--ink) 70%, transparent) 100%)",
                }}
              />
            }
          />
          <div className="relative container-wide py-28">
            <span className="eyebrow" style={{ color: "color-mix(in oklab, var(--ink-foreground) 65%, transparent)" }}>
              From the people we've placed
            </span>
            <h2 className="display-2 mt-5 max-w-3xl">Career moves that actually fit.</h2>
            <div className="mt-14 grid gap-10 md:grid-cols-2">
              {b.testimonials.slice(2, 4).map((t, i) => (
                <figure
                  key={t.attribution}
                  className={i % 2 === 1 ? "md:mt-16" : ""}
                >
                  <div className="font-display text-6xl leading-none" style={{ color: "var(--brand)" }}>"</div>
                  <blockquote className="mt-2 text-lg leading-relaxed opacity-95">{t.quote}</blockquote>
                  <figcaption className="mt-6 text-xs uppercase tracking-[0.18em] opacity-70">— {t.attribution}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <TeamStrip brand={brand} brandName={b.name} />

      {/* CONTACT */}
      <section className="container-wide py-24 grid gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <span className="eyebrow">Start a conversation</span>
          <h2 className="display-2 mt-5">A confidential chat. No spam, no fluff.</h2>
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
          <ContactForm brand={brand} defaultAudience="candidate" />
        </div>
      </section>
    </>
  );
}
