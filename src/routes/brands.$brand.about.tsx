import { createFileRoute, Link } from "@tanstack/react-router";
import { BRANDS, isBrandSlug, getBrandImage } from "@/lib/brands";
import { ParallaxImage } from "@/components/site/ParallaxImage";
import { SplitFeature } from "@/components/site/SplitFeature";
import { TeamStrip } from "@/components/site/TeamStrip";
import { BrandLogo } from "@/components/site/BrandLogo";
import aboutImage from "@/assets/about-image.jpg";

export const Route = createFileRoute("/brands/$brand/about")({
  head: ({ params }) => {
    const b = isBrandSlug(params.brand) ? BRANDS[params.brand] : null;
    return {
      meta: [
        { title: b ? `About ${b.name}` : "About" },
        { name: "description", content: b?.about.purpose ?? "" },
        { property: "og:title", content: b ? `About ${b.name}` : "About" },
        { property: "og:description", content: b?.about.headline ?? "" },
      ],
    };
  },
  component: BrandAbout,
});

function BrandAbout() {
  const { brand } = Route.useParams();
  if (!isBrandSlug(brand)) return null;
  const b = BRANDS[brand];

  return (
    <>
      {/* HERO — striking dark parallax band */}
      <section className="relative overflow-hidden" style={{ color: "var(--ink-foreground)" }}>
        <ParallaxImage
          src={getBrandImage(b, "aboutHero").src}
          alt={getBrandImage(b, "aboutHero").alt}
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
          <div className="max-w-3xl">
            <span className="eyebrow" style={{ color: "var(--brand)" }}>About {b.name}</span>
            <h1 className="display-2 mt-6 tracking-tight whitespace-pre-line" style={{ color: "var(--ink-foreground)" }}>
              {b.aboutHero.line1}
              <span style={{ color: "var(--brand)" }}>{b.aboutHero.accent}</span>
              <br />{b.aboutHero.line2}
            </h1>
            <p className="mt-8 max-w-xl text-lg" style={{ color: "var(--ink-foreground)" }}>
              {b.about.headline} — and it's how we've built {b.name} into the firm clients and candidates in {b.focus.toLowerCase()} reach out to first.
            </p>
          </div>
          {b.stats[0] && (
            <div
              className="mt-12 lg:mt-0 lg:absolute lg:right-8 lg:bottom-8 max-w-[220px] p-6"
              style={{
                background: "var(--ink)",
                color: "var(--ink-foreground)",
                borderRadius: 4,
                boxShadow: "0 30px 80px -30px rgba(0,0,0,0.6)",
                border: "1px solid color-mix(in oklab, var(--brand) 30%, transparent)",
              }}
            >
              <span className="h-[2px] w-8 block" style={{ background: "var(--brand)" }} />
              <div className="mt-3 font-display text-3xl" style={{ color: "var(--brand)" }}>{b.stats[0].value}</div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.22em] opacity-80">{b.stats[0].label}</div>
            </div>
          )}
        </div>
      </section>

      {/* STORY — editorial split: narrative column left, stats column right with vertical rule */}
      <section className="py-24 lg:py-32" style={{ background: "var(--background)" }}>
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            {/* Narrative column */}
            <div className="lg:col-span-7 space-y-10">
              <header className="space-y-5">
                <span className="block text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "color-mix(in oklab, var(--foreground) 50%, transparent)" }}>
                  About {b.name}
                </span>
                <h2 className="font-display text-3xl md:text-5xl leading-[1.05] tracking-tight">
                  The story behind <span className="italic">{b.name}.</span>
                </h2>
              </header>

              <div className="space-y-8 text-lg md:text-xl leading-relaxed" style={{ color: "color-mix(in oklab, var(--foreground) 80%, transparent)" }}>
                <p>{b.positioning}</p>
                <p>
                  We started in technical sales in 2011 — the roots of the Verto Group. {b.name} is the brand built specifically for the part of the market we know best: the engineers, operators and commercial leaders our sector runs on.
                </p>
              </div>
            </div>

            {/* Stats column */}
            <div className="lg:col-span-5 pt-4 lg:pt-20 space-y-10">
              <BrandLogo brand={brand} className="h-10 md:h-12 w-auto" />
              <div className="grid grid-cols-1 gap-12 pl-8 lg:pl-12 border-l" style={{ borderColor: "color-mix(in oklab, var(--foreground) 12%, transparent)" }}>
                {b.stats.slice(0, 3).map((s, i) => (
                  <div key={s.label} className="space-y-2">
                    <div className="flex items-baseline gap-2">
                      <span className={`font-display font-light leading-tight ${s.value.length > 6 ? "text-2xl" : "text-4xl"}`}>
                        {s.value}
                      </span>
                      {i === 0 && (
                        <span className="h-1.5 w-1.5 rounded-full mb-1" style={{ background: "var(--brand)" }} />
                      )}
                    </div>
                    <p className="text-sm font-medium uppercase tracking-wider leading-snug" style={{ color: "color-mix(in oklab, var(--foreground) 60%, transparent)" }}>
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PILLARS — staggered offset grid */}
      {b.pillars && b.pillars.length > 0 && (
        <section className="container-wide py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr] items-end">
            <div>
              <span className="eyebrow">What separates us</span>
              <h2 className="display-2 mt-5">Three principles.<br />Applied to every search.</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {b.pillars.map((p, i) => (
                <div
                  key={p.title}
                  className="group relative overflow-hidden p-8 transition-colors duration-300"
                  style={{
                    background: "color-mix(in oklab, var(--foreground) 6%, var(--background))",
                    transform: i === 1 ? "translateY(2rem)" : undefined,
                  }}
                >
                  <span
                    className="absolute top-0 left-0 h-[3px] w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                    style={{ background: "var(--brand)" }}
                  />
                  <div className="font-display text-3xl" style={{ color: "var(--brand)" }}>0{i + 1}</div>
                  <h3 className="mt-5 font-display text-2xl">{p.title}</h3>
                  <p className="mt-4 text-base leading-relaxed opacity-80">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}



      {/* VALUES — bordered grid with alternating emphasis */}
      {b.values && b.values.length > 0 && (
        <section className="container-wide py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] items-start">
            <div className="lg:sticky lg:top-24">
              <span className="eyebrow">Our values</span>
              <h2 className="display-2 mt-5">What we stand for.</h2>
              <p className="mt-6 max-w-md text-base opacity-75">
                Five principles that shape every conversation, every search and every introduction. The reason 94% of our clients hire with us a second time.
              </p>
            </div>
            <div className="border-t" style={{ borderColor: "color-mix(in oklab, var(--brand) 25%, transparent)" }}>
              {b.values.map((v, i) => (
                <details
                  key={v.title}
                  className="group border-b"
                  style={{ borderColor: "color-mix(in oklab, var(--brand) 25%, transparent)" }}
                  open={i === 0}
                >
                  <summary className="flex cursor-pointer list-none items-center gap-6 py-6 md:py-7 [&::-webkit-details-marker]:hidden">
                    <div className="text-xs uppercase tracking-[0.22em] w-10 shrink-0" style={{ color: "var(--brand)" }}>
                      0{i + 1}
                    </div>
                    <h3 className="flex-1 font-display text-xl md:text-2xl leading-snug">{v.title}</h3>
                    <span
                      className="relative h-4 w-4 shrink-0 transition-transform duration-300 group-open:rotate-45"
                      aria-hidden="true"
                    >
                      <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2" style={{ background: "var(--brand)" }} />
                      <span className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2" style={{ background: "var(--brand)" }} />
                    </span>
                  </summary>
                  <div className="pb-7 pl-16 pr-10">
                    <p className="text-base leading-relaxed opacity-80 max-w-2xl">{v.body}</p>
                  </div>
                </details>
              ))}
            </div>

          </div>
        </section>
      )}

      {/* WHAT WE DO — split (image left, copy right) */}
      {b.whatWeDo && (
        <SplitFeature
          eyebrow="What we do today"
          headline={b.whatWeDo.headline}
          body={
            <>
              {b.whatWeDo.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </>
          }
          image={aboutImage}
          imageAlt="A specialist team at work"
          panelBg="#ffffff"
          reverse
        />
      )}


      {/* MISSION / VISION / PURPOSE — dark parallax band */}
      <section className="relative overflow-hidden" style={{ color: "var(--ink-foreground)" }}>
        <ParallaxImage
          src={getBrandImage(b, "aboutMission").src}
          alt=""
          className="absolute inset-0"
          speed={0.35}
          overlay={
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, var(--ink) 0%, color-mix(in oklab, var(--ink) 90%, transparent) 55%, color-mix(in oklab, var(--ink) 75%, transparent) 100%)",
              }}
            />
          }
        />
        <div className="relative container-wide py-28">
          <span className="eyebrow" style={{ color: "color-mix(in oklab, var(--ink-foreground) 65%, transparent)" }}>The compass</span>
          <h2 className="display-3 mt-5 max-w-2xl">Mission. Vision. Purpose.</h2>
          <div className="mt-16 grid gap-10 lg:grid-cols-3">
            {[
              { label: "Mission", body: b.about.mission },
              { label: "Vision",  body: b.about.vision },
              { label: "Purpose", body: b.about.purpose },
            ].map((blk, i) => (
              <div
                key={blk.label}
                className="pl-6 border-l"
                style={{
                  borderColor: "color-mix(in oklab, var(--brand) 60%, transparent)",
                  transform: i === 1 ? "translateY(1.5rem)" : i === 2 ? "translateY(3rem)" : undefined,
                }}
              >
                <div className="text-xs uppercase tracking-[0.22em]" style={{ color: "var(--brand)" }}>{blk.label}</div>
                <p className="mt-5 text-base leading-relaxed opacity-90">{blk.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JOURNEY — horizontal rail */}
      {b.journey && b.journey.length > 0 && (
        <section className="container-wide py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="eyebrow">Our story so far</span>
              <h2 className="display-2 mt-5 max-w-3xl">Built decade by decade.</h2>
            </div>
          </div>
          <div className="mt-14 relative">
            <div className="absolute left-0 right-0 top-6 h-px" style={{ background: "color-mix(in oklab, var(--brand) 30%, transparent)" }} />
            <ol className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
              {b.journey.map((m) => (
                <li key={m.year} className="relative">
                  <span className="block h-3 w-3 rounded-full ring-4 ring-[var(--background)]" style={{ background: "var(--brand)" }} />
                  <div className="mt-6 font-display text-2xl" style={{ color: "var(--brand)" }}>{m.year}</div>
                  <p className="mt-2 text-base opacity-85">{m.title}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* PROOF — staggered numbered list */}
      <section className="py-24" style={{ background: "var(--muted)" }}>
        <div className="container-wide">
          <div className="max-w-2xl">
            <span className="eyebrow">Proof points</span>
            <h2 className="display-3 mt-5">Why clients hire us a second time.</h2>
          </div>
          <ul className="mt-14 grid gap-x-16 gap-y-10 md:grid-cols-2">
            {b.proofPoints.map((p, i) => (
              <li
                key={p}
                className="flex gap-6"
                style={{ transform: i % 2 === 1 ? "translateY(2rem)" : undefined }}
              >
                <div className="font-display text-5xl leading-none shrink-0" style={{ color: "var(--brand)" }}>0{i + 1}</div>
                <p className="text-base leading-relaxed opacity-85 pt-1">{p}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <TeamStrip brand={b.slug} brandName={b.name} />

      {/* CTA */}
      <section className="container-wide py-24">
        <div className="rounded-3xl p-12 text-center" style={{ background: "var(--ink)", color: "var(--ink-foreground)" }}>
          <h2 className="display-3 max-w-2xl mx-auto">Ready to talk?</h2>
          <div className="mt-8 flex justify-center gap-3 flex-wrap">
            <Link to="/brands/$brand/for-companies" params={{ brand: b.slug }} className="btn-base btn-primary">Hire with {b.name}</Link>
            <Link to="/brands/$brand/for-candidates" params={{ brand: b.slug }} className="btn-base btn-ghost-outline" style={{ color: "var(--ink-foreground)", borderColor: "color-mix(in oklab, var(--ink-foreground) 30%, transparent)" }}>
              Explore roles
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
