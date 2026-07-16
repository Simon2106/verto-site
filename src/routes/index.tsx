import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import vertoHero from "@/assets/verto-hero.jpg";


import edisonLogo from "@/assets/edison-lux-logo.png";
import modulrLogo from "@/assets/modulr-logo.svg";
import vertekLogo from "@/assets/vertek-logo-light.png";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { InsightThumb } from "@/components/site/InsightThumb";
import { BRANDS, BRAND_LIST, getBrandImage, type BrandSlug } from "@/lib/brands";
import { INSIGHTS } from "@/lib/insights";

const BRAND_LOGOS: Record<BrandSlug, string> = {
  "edison-lux": edisonLogo,
  modulr: modulrLogo,
  vertek: vertekLogo,
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Verto Group — Precision talent for energy, engineering and the built environment" },
      { name: "description", content: "Verto builds high-performance teams for the industries that keep everything else running — energy, engineering, and the built environment. Three focused brands: Edison Lux, Vertek and Modulr. One process-driven standard." },
      { property: "og:title", content: "Verto Group — Precision talent. Specialist brands. One group." },
      { property: "og:description", content: "Three specialist brands. One process-driven standard. Building the teams that build, power and run the world." },
    ],
  }),
  component: Index,
});

function Index() {
  const featured = INSIGHTS.filter(i => i.featured).slice(0, 3);
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />

        <Practices />
        <Values />
        <SectorRoll />
        <ClientLogos />
        <Testimonials />
        <FeaturedInsights items={featured} />
        <CTA />
      </main>
      <SiteFooter />
    </div>
  );
}

/* ─────────── COUNT-UP ─────────── */
function useCountUp(target: number, duration = 1600, start = true) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return value;
}

function CountValue({ target, suffix = "", format = true }: { target: number; suffix?: string; format?: boolean }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setInView(true)),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const v = useCountUp(target, 1600, inView);
  return <span ref={ref}>{format ? v.toLocaleString() : v}{suffix}</span>;
}


/* ─────────── HERO — dark, giant Verto "V" mark clipped over image ─────────── */
function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ background: "var(--ink)", color: "var(--ink-foreground)" }}>

      <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Verto "V" mark — clipped image, right side, constrained to hero top */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[58.9%] hidden md:block">
          <svg
            viewBox="0 0 81 80"
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 h-full w-full"
          >
            <defs>
              <clipPath id="verto-v-mark" clipPathUnits="userSpaceOnUse">
                <polygon points="48.81,66.34 43.18,76.08 1.64,4.14 12.9,4.14 34.11,40.89 37.08,46.04 37.08,46.04 37.08,46.04 48.81,66.34" />
                <polygon points="37.59,66.34 43.22,76.08 79.35,13.51 68.09,13.51 52.28,40.89 49.31,46.04 49.31,46.04 49.31,46.04 37.59,66.34" />
                <polygon points="48.81,39.2 43.2,48.91 43.18,48.94 22.72,13.51 33.97,13.51 34.11,13.75 37.08,18.9 37.09,18.9 37.09,18.9 43.2,29.49 48.81,39.2" />
                <polygon points="69.09,4.14 43.22,48.94 43.2,48.91 37.59,39.2 43.2,29.49 49.31,18.9 49.31,18.9 49.31,18.9 52.28,13.75 57.83,4.14 69.09,4.14" />
              </clipPath>
            </defs>
            <g clipPath="url(#verto-v-mark)">
              <image
                href={vertoHero}
                x="0" y="0" width="81" height="80"
                preserveAspectRatio="xMidYMid slice"
              />
              <rect width="81" height="80" fill="color-mix(in oklab, var(--ink) 20%, transparent)" />
            </g>
          </svg>
        </div>

        <div className="container-wide relative">
          <div className="max-w-2xl">
            <div className="text-[11px] uppercase tracking-[0.3em] opacity-70">The Verto Group · Precision talent, specialist brands</div>
            <h1 className="display-2 mt-8 tracking-tight">
              Precision talent.<br />Specialist brands.<br />One group.
            </h1>
            <p className="mt-8 max-w-xl text-base md:text-lg opacity-80">
              Verto builds high-performance teams for the industries that keep everything else running — energy, engineering and the built environment. Three focused brands. One process-driven standard.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/contact" className="btn-base btn-primary on-ink">
                Build your team <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/brands"
                className="btn-base btn-ghost-outline on-ink"
              >
                Find your next move
              </Link>
            </div>
            <p className="mt-16 lg:mt-20 max-w-3xl text-[10px] lg:text-xs uppercase tracking-[0.26em] flex flex-nowrap items-center gap-x-3 whitespace-nowrap">
              <span className="pillar-glow" style={{ animationDelay: "0s" }}>US Energy</span>
              <span className="opacity-40">·</span>
              <span className="pillar-glow" style={{ animationDelay: "1.6s" }}>Technical Sales &amp; Engineering</span>
              <span className="opacity-40">·</span>
              <span className="pillar-glow" style={{ animationDelay: "3.2s" }}>Architecture &amp; Data Centres</span>
            </p>
          </div>
        </div>
      </div>


      {/* Extended hero — inline stats with subtle light dividers */}
      <div className="relative">
        <div
          className="container-wide relative grid grid-cols-2 md:grid-cols-4 pt-14 pb-24 lg:pt-20 lg:pb-32"
          style={{ borderTop: "1px solid color-mix(in oklab, var(--ink-foreground) 14%, transparent)" }}
        >
          {[
            { node: <><CountValue target={94} />%</>, label: "Of clients work with us a second time" },
            { node: <><CountValue target={100} />%</>, label: "Success rate on engaged search" },
            { node: <><CountValue target={14000} />+</>, label: "Technical & commercial candidates in-network" },
            { node: <RegionRotator />, label: "Live desks across three regions" },
          ].map((s, i) => (
            <div
              key={s.label}
              className="py-2 px-4 lg:px-8 text-center"
              style={{
                borderLeft: i > 0
                  ? "1px solid color-mix(in oklab, var(--ink-foreground) 12%, transparent)"
                  : undefined,
              }}
            >
              <div className="text-3xl lg:text-4xl font-display tracking-tight text-accent">
                {s.node}
              </div>
              <div className="mt-3 text-[10px] uppercase tracking-[0.24em] opacity-60">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── REGION ROTATOR ─────────── */
function RegionRotator() {
  const regions = ["UK", "EU", "US"];
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % regions.length), 1800);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="inline-block relative align-baseline" style={{ minWidth: "1.6em" }}>
      <span
        key={i}
        className="inline-block"
        style={{ animation: "region-fade 600ms ease" }}
      >
        {regions[i]}
      </span>
    </span>
  );
}



/* ─────────── OUR PRACTICES ─────────── */
function Practices() {
  return (
    <section className="py-24 lg:py-32" style={{ background: "var(--muted)" }}>
      <div className="container-wide">
        <div className="max-w-2xl">
          <span className="eyebrow">The brands</span>
          <h2 className="display-2 mt-5">Three brands. One process-driven standard.</h2>
          <p className="mt-6 text-muted-foreground max-w-xl">
            Since 2011, Verto has done one thing: connect exceptional technical and commercial people with the businesses that need them. Today, three focused brands — each with its own market, its own network and its own consultants — united by how we work.
          </p>
          <Link
            to="/about"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium"
            style={{ color: "var(--accent)" }}
          >
            Explore the Verto brands <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {BRAND_LIST.map((b) => {
            const vId = `v-mask-${b.slug}`;
            return (
              <Link
                key={b.slug}
                to="/brands/$brand"
                params={{ brand: b.slug }}
                data-brand={b.slug}
                aria-label={`Enter ${b.name}`}
                className="group relative block"
                style={{ perspective: "1400px", minHeight: 460 }}
              >
                <div
                  className="relative w-full h-full transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[transform:rotateY(180deg)] group-focus-visible:[transform:rotateY(180deg)]"
                  style={{ transformStyle: "preserve-3d", minHeight: 460 }}
                >
                  {/* ── FRONT ── */}
                  <div
                    className="absolute inset-0 overflow-hidden flex flex-col"
                    style={{
                      background: "var(--ink)",
                      color: "var(--ink-foreground)",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    {/* brand stripe top */}
                    <div className="absolute top-0 left-0 right-0 h-[3px] z-10" style={{ background: "var(--brand)" }} />

                    {/* large centred V-shape image cutout */}
                    <div className="pointer-events-none absolute inset-x-0 top-6 bottom-24 flex items-center justify-center">
                      <svg viewBox="0 0 81 80" preserveAspectRatio="xMidYMid meet" className="h-full w-auto max-w-[85%]">
                        <defs>
                          <clipPath id={vId} clipPathUnits="userSpaceOnUse">
                            <polygon points="48.81,66.34 43.18,76.08 1.64,4.14 12.9,4.14 34.11,40.89 37.08,46.04 37.08,46.04 37.08,46.04 48.81,66.34" />
                            <polygon points="37.59,66.34 43.22,76.08 79.35,13.51 68.09,13.51 52.28,40.89 49.31,46.04 49.31,46.04 49.31,46.04 37.59,66.34" />
                            <polygon points="48.81,39.2 43.2,48.91 43.18,48.94 22.72,13.51 33.97,13.51 34.11,13.75 37.08,18.9 37.09,18.9 37.09,18.9 43.2,29.49 48.81,39.2" />
                            <polygon points="69.09,4.14 43.22,48.94 43.2,48.91 37.59,39.2 43.2,29.49 49.31,18.9 49.31,18.9 49.31,18.9 52.28,13.75 57.83,4.14 69.09,4.14" />
                          </clipPath>
                        </defs>
                        <g clipPath={`url(#${vId})`}>
                          <image
                            href={getBrandImage(b, "brandCard").src}
                            x="0" y="0" width="81" height="80"
                            preserveAspectRatio="xMidYMid slice"
                          />
                          <rect width="81" height="80" fill="color-mix(in oklab, var(--ink) 15%, transparent)" />
                        </g>
                      </svg>
                    </div>

                    {/* logo centred at bottom */}
                    <div className="absolute inset-x-0 bottom-0 p-8 flex items-center justify-center">
                      <img
                        src={BRAND_LOGOS[b.slug]}
                        alt={`${b.name} logo`}
                        className={`${b.slug === "vertek" ? "h-[30px]" : "h-10"} w-auto object-contain`}
                        style={b.slug === "edison-lux" ? { filter: "brightness(0) invert(1)" } : undefined}
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* ── BACK ── */}
                  <div
                    className="absolute inset-0 overflow-hidden flex flex-col p-8"
                    style={{
                      background: "var(--ink)",
                      color: "var(--ink-foreground)",
                      transform: "rotateY(180deg)",
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                    }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: "var(--brand)" }} />

                    <div className="text-[10px] uppercase tracking-[0.3em] mt-2" style={{ color: "var(--brand)" }}>
                      {b.focus}
                    </div>
                    <div className="mt-4 font-display text-2xl tracking-tight">{b.name}</div>
                    <p className="mt-5 text-base opacity-85 leading-relaxed">{b.positioning}</p>
                    <div className="mt-auto pt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-semibold" style={{ color: "var(--brand)" }}>
                      Enter {b.name} <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>


      </div>
    </section>
  );
}

/* ─────────── VALUES ─────────── */
function Values() {
  const values = [
    { title: "Process over luck", body: "Great hiring isn't chance. Our methodology — thorough briefings, structured search, frequent updates — is built to remove the chance of failure at every stage." },
    { title: "Embedded, not transactional", body: "94% of our clients work with us again. That comes from understanding a business properly, representing it well in the market, and building relationships that outlast a single hire." },
    { title: "Feedback, always", body: "We ask for feedback from every candidate and client we work with, act on it, and build it back into how we operate. Iteration got us here. Precision takes us forward." },
    { title: "Depth wins", body: "Every Verto consultant works in one defined market. Our clients and candidates don't generalise — and neither do we." },
    { title: "Love the process", body: "Phone-first, plan-led, no shortcuts. Our process is built from years of getting it right — and the mistakes we learned from. We stick to it because it works." },
  ];
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setVisible(true)),
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section
      className="relative py-28 overflow-hidden"
      style={{ background: "var(--ink)", color: "var(--ink-foreground)" }}
    >
      {/* ambient gold vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 85% 100%, color-mix(in oklab, var(--brand) 22%, transparent) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 5% -10%, color-mix(in oklab, var(--brand) 14%, transparent) 0%, transparent 55%)",
        }}
      />
      {/* slow drifting diagonal shimmer */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-x-20 -top-24 h-[140%] opacity-[0.07] values-drift"
        style={{
          background:
            "repeating-linear-gradient(115deg, transparent 0 120px, color-mix(in oklab, var(--brand) 80%, transparent) 120px 121px, transparent 121px 260px)",
        }}
      />

      <div ref={ref} className="container-wide relative">
        <div className="max-w-2xl">
          <span className="eyebrow">The Verto standard</span>
          <h2 className="display-2 mt-5">How every desk is held to account.</h2>
          <p
            className="mt-6"
            style={{ color: "color-mix(in oklab, var(--ink-foreground) 68%, transparent)" }}
          >
            Every desk runs its own P&amp;L, network and market. What's shared is how we work — the standard every consultant across the group is held to.
          </p>
        </div>

        <div className="mt-16 grid gap-px md:grid-cols-2 lg:grid-cols-5"
          style={{ background: "color-mix(in oklab, var(--ink-foreground) 12%, transparent)" }}
        >
          {values.map((v, i) => (
            <div
              key={v.title}
              className="value-card group relative p-8 transition-all duration-500 ease-out"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(24px)",
                transitionDelay: `${i * 110}ms`,
              }}
            >
              {/* top accent line that draws in */}
              <span
                aria-hidden
                className="value-card__accent absolute left-0 top-0 h-px transition-all duration-700 ease-out"
                style={{
                  width: visible ? "100%" : "0%",
                  transitionDelay: `${i * 110 + 200}ms`,
                }}
              />
              <div className="value-card__num font-display text-3xl transition-colors duration-300">
                0{i + 1}
              </div>
              <h3 className="value-card__title mt-6 font-display text-xl tracking-tight transition-colors duration-300">{v.title}</h3>
              <p className="value-card__body mt-4 text-base leading-relaxed transition-colors duration-300">
                {v.body}
              </p>
            </div>
          ))}

        </div>
      </div>

      <style>{`
        @keyframes values-drift {
          0%   { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-260px, 0, 0); }
        }
        .values-drift { animation: values-drift 22s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          .values-drift { animation: none; }
        }
        .value-card { background: var(--ink); color: var(--ink-foreground); }
        .value-card__accent { background: var(--brand); }
        .value-card__num { color: color-mix(in oklab, var(--ink-foreground) 45%, transparent); }
        .value-card__title { color: var(--ink-foreground); }
        .value-card__body { color: color-mix(in oklab, var(--ink-foreground) 68%, transparent); }
        .value-card:hover { background: var(--brand); }
        .value-card:hover .value-card__accent { background: var(--ink); }
        .value-card:hover .value-card__num,
        .value-card:hover .value-card__title,
        .value-card:hover .value-card__body { color: var(--ink); }
      `}</style>

    </section>
  );
}

/* ─────────── SECTOR ROLL ─────────── */
function SectorRoll() {
  const sectors: { name: string; brand: "edison-lux" | "vertek" | "modulr" }[] = [
    { name: "Critical Power & CCGT", brand: "edison-lux" },
    { name: "Renewables & Storage", brand: "edison-lux" },
    { name: "EPC & Project Delivery", brand: "edison-lux" },
    { name: "Grid & Transmission", brand: "edison-lux" },
    { name: "Fluid Power & Hydraulics", brand: "vertek" },
    { name: "HVAC & Refrigeration", brand: "vertek" },
    { name: "Advanced Manufacturing", brand: "vertek" },
    { name: "Instrumentation & Controls", brand: "vertek" },
    { name: "Hyperscale Data Centres", brand: "modulr" },
    { name: "US Architecture", brand: "modulr" },
    { name: "MEP Engineering", brand: "modulr" },
    { name: "Interior Design & Fit-out", brand: "modulr" },
  ];
  return (
    <section className="py-24 hairline-top" style={{ background: "var(--muted)" }}>
      <div className="container-wide">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <span className="eyebrow">Sector coverage</span>
            <h2 className="display-2 mt-5">Whatever you're building, we know who builds it.</h2>
            <p className="mt-6 text-muted-foreground">
              Every consultant at Verto is a former operator, engineer or in-market recruiter — not a generalist. The sectors below aren&apos;t categories on a website; they&apos;re desks that ship hires every month.
            </p>
            <p className="mt-4 text-muted-foreground">
              Each links through to the brand that owns it.
            </p>
          </div>
          <div className="lg:col-span-8 space-y-10">
            {(["edison-lux", "vertek", "modulr"] as const).map((brandSlug) => {
              const brand = BRANDS[brandSlug];
              const items = sectors.filter((s) => s.brand === brandSlug);
              const color = `var(--sector-brand)`;
              return (
                <div
                  key={brandSlug}
                  style={{
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    /* Guideline accents — on this light ground Edison uses
                       Electric Blue (Energy Green fails contrast on white) */
                    ["--sector-brand" as any]:
                      brandSlug === "edison-lux"
                        ? "#2B8EE5"
                        : brandSlug === "vertek"
                        ? "#F82B60"
                        : "#0464FA",
                  }}
                >
                  <div className="flex items-baseline justify-between gap-4 pb-4" style={{ borderBottom: `1px solid ${color}` }}>
                    <div className="flex items-center gap-3">
                      <span className="h-2 w-2 rounded-full" style={{ background: color }} />
                      <span className="font-display text-lg tracking-tight">{brand.wordmark}</span>
                    </div>
                    <Link
                      to="/brands/$brand"
                      params={{ brand: brandSlug }}
                      className="text-[10px] uppercase tracking-[0.22em] font-medium inline-flex items-center gap-1.5 opacity-80 hover:opacity-100 transition"
                      style={{ color }}
                    >
                      Enter {brand.name} <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2">
                    {items.map((s, i) => (
                      <Link
                        key={s.name}
                        to="/brands/$brand"
                        params={{ brand: s.brand }}
                        className="group flex items-center justify-between gap-6 py-4 pr-2 md:pr-4 transition"
                        style={{ borderTop: i < 2 ? undefined : "1px solid var(--border)" }}
                      >
                        <span className="flex items-center gap-3 text-base font-medium">
                          <span
                            className="h-3 w-[3px] rounded-sm transition group-hover:h-5"
                            style={{ background: color }}
                          />
                          {s.name}
                        </span>
                        <ArrowUpRight
                          className="h-4 w-4 opacity-40 transition group-hover:opacity-100"
                          style={{ color }}
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── CLIENT LOGOS (text marquee) ─────────── */
function ClientLogos() {
  const partners = [
    "Constellation", "NextEra", "EDF Renewables", "Siemens Energy", "GE Vernova",
    "Schneider Electric", "Vestas", "ABB", "Mitsubishi Power", "Equinix",
    "Digital Realty", "Skanska",
  ];
  const items = [...partners, ...partners];
  return (
    <section className="py-16 lg:py-20 overflow-hidden hairline-bottom">
      <div className="container-wide mb-10">
        <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground text-center">
          Trusted by operators, developers, manufacturers &amp; design practices across three continents
        </div>
      </div>
      <div className="logo-marquee relative">
        <div className="logo-marquee-track">
          {items.map((p, i) => (
            <div key={`${p}-${i}`} className="logo-marquee-item">
              <span className="text-[13px] md:text-sm uppercase tracking-[0.24em] font-medium text-muted-foreground whitespace-nowrap px-6">
                {p}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── TESTIMONIALS ─────────── */
function Testimonials() {
  const items = [
    {
      quote: "Edison Lux staffed our Plant Manager within six weeks of briefing. They understood the rare combination of operational and leadership experience we needed — and delivered exactly that.",
      who: "VP Operations",
      org: "US Independent Power Producer",
      brand: "Edison Lux · US Energy Staffing",
    },
    {
      quote: "We'd been trying to hire a Head of Technical Sales for eight months through three other firms. Vertek shortlisted four in ten days. We hired the second one we met — she's now running the region.",
      who: "Chief Commercial Officer",
      org: "Industrial Fluid Power OEM",
      brand: "Vertek · Technical Sales & Engineering",
    },
    {
      quote: "The team understand the difference between a data-centre PM and a commercial-fit-out PM. That sounds obvious. Every other search firm we tried didn't.",
      who: "Head of Talent",
      org: "Hyperscale Data Centre Developer",
      brand: "Modulr · Architecture & Data Centres",
    },
    {
      quote: "Edison Lux built the entire commissioning team for a 380MW CCGT site in under four months. Every hire is still on the desk two years later.",
      who: "Project Director",
      org: "US Combined-Cycle Developer",
      brand: "Edison Lux · US Energy Staffing",
    },
    {
      quote: "Vertek understand our engineering language. They interviewed candidates on our behalf and the shortlist landed already qualified — not just CV-matched.",
      who: "Managing Director",
      org: "European Pneumatics Manufacturer",
      brand: "Vertek · Technical Sales & Engineering",
    },
    {
      quote: "Modulr placed our Design Director inside three weeks. They knew exactly which studios to approach and which not to — that market intelligence was worth the fee alone.",
      who: "Head of Studio",
      org: "London Architecture Practice",
      brand: "Modulr · Architecture & Data Centres",
    },
  ];

  // Duplicate for seamless loop
  const loop = [...items, ...items];

  return (
    <section className="py-24 lg:py-32" style={{ background: "var(--ink)", color: "var(--ink-foreground)" }}>
      <div className="container-wide">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-start">
          <div className="max-w-3xl">
            <div className="text-[11px] uppercase tracking-[0.28em] opacity-60">In their words</div>
            <h2 className="display-1 mt-6">One group, three markets — a sample from each.</h2>
          </div>
          <svg
            aria-hidden
            viewBox="0 0 81 80"
            preserveAspectRatio="xMidYMid meet"
            className="hidden lg:block h-40 w-40 xl:h-56 xl:w-56 self-start"
          >
            <defs>
              <clipPath id="verto-v-mark-testimonials" clipPathUnits="userSpaceOnUse">
                <polygon points="48.81,66.34 43.18,76.08 1.64,4.14 12.9,4.14 34.11,40.89 37.08,46.04 37.08,46.04 37.08,46.04 48.81,66.34" />
                <polygon points="37.59,66.34 43.22,76.08 79.35,13.51 68.09,13.51 52.28,40.89 49.31,46.04 49.31,46.04 49.31,46.04 37.59,66.34" />
                <polygon points="48.81,39.2 43.2,48.91 43.18,48.94 22.72,13.51 33.97,13.51 34.11,13.75 37.08,18.9 37.09,18.9 37.09,18.9 43.2,29.49 48.81,39.2" />
                <polygon points="69.09,4.14 43.22,48.94 43.2,48.91 37.59,39.2 43.2,29.49 49.31,18.9 49.31,18.9 49.31,18.9 52.28,13.75 57.83,4.14 69.09,4.14" />
              </clipPath>
            </defs>
            <g clipPath="url(#verto-v-mark-testimonials)">
              <image
                href={vertoHero}
                x="0" y="0" width="81" height="80"
                preserveAspectRatio="xMidYMid slice"
              />
              <rect width="81" height="80" fill="color-mix(in oklab, var(--ink) 20%, transparent)" />
            </g>
          </svg>
        </div>
      </div>

      {/* Smooth-scrolling marquee */}
      <div
        className="mt-14 relative overflow-hidden testimonials-marquee-mask"
        style={{ ["--testimonial-count" as string]: items.length }}
      >
        <div className="testimonials-track flex gap-6 w-max">
          {loop.map((t, i) => (
            <figure
              key={`${t.who}-${i}`}
              className="p-8 border border-white/10 shrink-0 w-[340px] md:w-[380px] flex flex-col"
              style={{ background: "color-mix(in oklab, var(--ink-foreground) 3%, transparent)" }}
            >
              <div className="text-[10px] uppercase tracking-[0.22em] font-semibold" style={{ color: "var(--accent)" }}>{t.brand}</div>
              <span className="font-display text-5xl leading-none mt-2 block" style={{ color: "var(--accent)" }}>&ldquo;</span>
              <blockquote className="mt-2 text-base leading-relaxed opacity-90 flex-1">{t.quote}</blockquote>
              <figcaption className="mt-8 hairline-top pt-5">
                <div className="text-sm font-semibold">{t.who}</div>
                <div className="text-xs uppercase tracking-[0.18em] opacity-60 mt-1">{t.org}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Case studies CTA */}
      <div className="container-wide mt-14 lg:mt-16">
        <div
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 p-8 md:p-10 border border-white/10"
          style={{ background: "color-mix(in oklab, var(--ink-foreground) 4%, transparent)" }}
        >
          <div className="max-w-xl">
            <div className="text-[10px] uppercase tracking-[0.28em] font-semibold" style={{ color: "var(--accent)" }}>Proof, in detail</div>
            <h3 className="mt-3 font-display text-2xl md:text-3xl leading-tight">
              Read the full case studies — briefing, shortlist, outcome.
            </h3>
          </div>
          <Link
            to="/insights"
            className="btn-base btn-pill btn-ghost-outline on-ink shrink-0"
          >
            See the case studies <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes testimonials-scroll {
          0%   { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-50%, 0, 0); }
        }
        .testimonials-track {
          animation: testimonials-scroll 60s linear infinite;
          padding-left: max(1.5rem, calc((100vw - 1280px) / 2 + 1.5rem));
        }
        .testimonials-marquee-mask:hover .testimonials-track {
          animation-play-state: paused;
        }
        .testimonials-marquee-mask {
          -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 6%, #000 94%, transparent 100%);
                  mask-image: linear-gradient(90deg, transparent 0, #000 6%, #000 94%, transparent 100%);
        }
        @media (prefers-reduced-motion: reduce) {
          .testimonials-track { animation: none; }
        }
      `}</style>
    </section>
  );
}


function FeaturedInsights({ items }: { items: typeof INSIGHTS }) {
  return (
    <section className="py-24 lg:py-32">
      <div className="container-wide">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div className="max-w-xl">
            <span className="eyebrow">Field notes</span>
            <h2 className="display-2 mt-5">Follow the projects we're staffing.</h2>
            <p className="mt-6 text-muted-foreground">
              Salary and market data, hiring reports and field notes — written by the consultants running the searches, not a marketing team.
            </p>
          </div>
          <Link to="/insights" className="text-sm font-medium inline-flex items-center gap-2" style={{ color: "var(--accent)" }}>
            View all insights <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((i) => {
            const brandTone = i.brand === "verto" ? "Verto Group" : (BRAND_LIST.find(b => b.slug === i.brand)?.name ?? "Verto");
            return (
              <article key={i.slug} className="group flex flex-col card-surface overflow-hidden">
                <InsightThumb brand={i.brand} contentType={i.contentType} sector={i.sector} />
                <div className="p-7 flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    <span style={{ color: "var(--accent)" }}>{brandTone}</span>
                    <span>·</span>
                    <span>{i.contentType}</span>
                  </div>
                  <h3 className="mt-5 font-display text-2xl leading-tight">{i.title}</h3>
                  <p className="mt-4 text-base text-muted-foreground line-clamp-3">{i.excerpt}</p>
                  <div className="mt-auto pt-6 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{i.readMinutes} min read</span>
                    <ArrowUpRight className="h-4 w-4 transition" />
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-24 lg:py-32 hairline-top">
      <div className="container-narrow text-center">
        <div className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground">Two ways in</div>
        <h2 className="display-2 mt-5">Whatever you're building, we know who builds it.</h2>
        <p className="mt-6 max-w-xl mx-auto text-muted-foreground">
          Tell us about the role, the project or the team — and we'll connect you with the brand and consultant who lives in that market.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link to="/contact" className="btn-base btn-primary">Start a search <ArrowRight className="h-4 w-4" /></Link>
          <Link to="/brands" className="btn-base btn-ghost-outline">Send us your resume</Link>
        </div>
        <p className="mt-6 text-xs uppercase tracking-[0.22em] text-muted-foreground">
          Clients · Candidates · Confidential enquiries
        </p>
      </div>
    </section>
  );
}
