import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { BRAND_LIST, getBrandImage } from "@/lib/brands";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/brands/")({
  head: () => ({
    meta: [
      { title: "The brands — Verto Group" },
      { name: "description", content: "Three specialist brands inside the Verto Group. Edison Lux for US energy staffing. Vertek for technical sales, service and engineering. Modulr for architecture and data centres." },
      { property: "og:title", content: "The Verto brands" },
      { property: "og:description", content: "Three markets, three specialist teams, one process-driven standard." },
    ],
  }),
  component: BrandsIndex,
});

function BrandsIndex() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--ink)", color: "var(--ink-foreground)" }}>
      <SiteHeader />
      <main className="flex-1 flex flex-col">
        {/* Intro strip */}
        <section className="container-wide pt-14 lg:pt-20 pb-8 lg:pb-12">
          <div className="grid lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-7">
              <span className="eyebrow" style={{ color: "var(--brand)" }}>The brands</span>
              <h1 className="display-1 mt-5">Three brands.<br/>One standard.</h1>
            </div>
            <p className="lg:col-span-5 text-base opacity-75 max-w-md">
              US energy staffing. Technical sales &amp; engineering. Architecture &amp; data centres. Each brand runs on its own network and P&amp;L — held to a shared group bar on research, quality and delivery.
            </p>
          </div>
        </section>

        {/* Three-up panels — all visible at once */}
        <section className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-px" style={{ background: "color-mix(in oklab, var(--ink-foreground) 12%, transparent)" }}>
          {BRAND_LIST.map((b, idx) => {
            const clipId = `v-mark-${b.slug}`;
            return (
            <article
              key={b.slug}
              data-brand={b.slug}
              className="group relative overflow-hidden flex flex-col justify-end min-h-[62vh] md:min-h-[70vh]"
              style={{ background: "var(--ink)" }}
            >
              {/* Muted background image */}
              <div className="absolute inset-0">
                <img
                  src={getBrandImage(b, "brandCard").src}
                  alt={getBrandImage(b, "brandCard").alt}
                  loading="lazy"
                  className="h-full w-full object-cover opacity-20 transition-all duration-700 group-hover:opacity-30"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, color-mix(in oklab, var(--ink) 70%, transparent) 0%, color-mix(in oklab, var(--ink) 55%, transparent) 40%, var(--ink) 100%)",
                  }}
                />
              </div>

              {/* V mark — brand image clipped inside, echoes the home hero */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-6 -right-8 md:-right-10 w-[78%] md:w-[72%] aspect-square opacity-90 transition-transform duration-700 group-hover:scale-[1.03]"
              >
                <svg
                  viewBox="0 0 81 80"
                  preserveAspectRatio="xMidYMid meet"
                  className="h-full w-full"
                >
                  <defs>
                    <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
                      <polygon points="48.81,66.34 43.18,76.08 1.64,4.14 12.9,4.14 34.11,40.89 37.08,46.04 37.08,46.04 37.08,46.04 48.81,66.34" />
                      <polygon points="37.59,66.34 43.22,76.08 79.35,13.51 68.09,13.51 52.28,40.89 49.31,46.04 49.31,46.04 49.31,46.04 37.59,66.34" />
                      <polygon points="48.81,39.2 43.2,48.91 43.18,48.94 22.72,13.51 33.97,13.51 34.11,13.75 37.08,18.9 37.09,18.9 37.09,18.9 43.2,29.49 48.81,39.2" />
                      <polygon points="69.09,4.14 43.22,48.94 43.2,48.91 37.59,39.2 43.2,29.49 49.31,18.9 49.31,18.9 49.31,18.9 52.28,13.75 57.83,4.14 69.09,4.14" />
                    </clipPath>
                  </defs>
                  <g clipPath={`url(#${clipId})`}>
                    <image
                      href={getBrandImage(b, "brandCard").src}
                      x="0" y="0" width="81" height="80"
                      preserveAspectRatio="xMidYMid slice"
                    />
                    <rect width="81" height="80" fill="color-mix(in oklab, var(--ink) 15%, transparent)" />
                  </g>
                </svg>
              </div>

              {/* Brand accent bar */}
              <span
                className="absolute top-0 left-0 h-[3px] w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                style={{ background: "var(--brand)" }}
              />

              {/* Content */}
              <div className="relative p-8 lg:p-10 flex flex-col gap-5">
                <div className="flex items-baseline justify-between">
                  <span className="text-[10px] uppercase tracking-[0.28em] opacity-60">0{idx + 1} — Brand</span>
                  <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: "var(--brand)" }}>{b.qualifier}</span>
                </div>

                <div className="font-display text-4xl lg:text-5xl tracking-tight leading-none">{b.wordmark}</div>

                <p className="text-base opacity-80 leading-relaxed max-w-xs">{b.positioning.slice(0, 140)}…</p>

                <div className="grid grid-cols-3 gap-3 pt-5 hairline-top">
                  {b.stats.map((s) => (
                    <div key={s.label}>
                      <div className="font-display text-xl leading-tight" style={{ color: "var(--brand)" }}>{s.value}</div>
                      <div className="text-[9px] uppercase tracking-[0.18em] opacity-55 mt-1 leading-tight">{s.label}</div>
                    </div>
                  ))}
                </div>

                <Link
                  to="/brands/$brand"
                  params={{ brand: b.slug }}
                  className="mt-2 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] font-semibold pb-1 border-b w-fit transition-colors"
                  style={{ borderColor: "var(--brand)", color: "var(--ink-foreground)" }}
                >
                  Enter {b.name} <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {/* Full-panel click target */}
              <Link
                to="/brands/$brand"
                params={{ brand: b.slug }}
                className="absolute inset-0 z-10"
                aria-label={`Enter ${b.name}`}
              />
            </article>
          );})}

        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
