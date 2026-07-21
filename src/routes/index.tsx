import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import summitVideo from "@/assets/client/summit-video.mp4";
import summitPoster from "@/assets/client/summit-poster.jpg";
import ibizaTeam from "@/assets/client/ibiza8.jpg";
import bptwBadge from "@/assets/client/BPTW_2026_SMALL_ORGANISATION_WHITE.png";

import edisonLogo from "@/assets/edison-lux-logo.png";
import modulrLogo from "@/assets/modulr-logo.svg";
import vertekLogo from "@/assets/vertek-logo-light.png";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { InsightThumb } from "@/components/site/InsightThumb";
import { JobsBoard } from "@/components/site/JobsBoard";
import { TitleReveal } from "@/components/site/TitleReveal";
import { BRAND_LIST, type BrandSlug } from "@/lib/brands";
import { WHATS_GOING_ON } from "@/lib/insights";

const BRAND_LOGOS: Record<BrandSlug, string> = {
  "edison-lux": edisonLogo,
  modulr: modulrLogo,
  vertek: vertekLogo,
};

/* The Verto "V" mark as a CSS mask (multi-polygon, so clip-path won't do) */
const V_MARK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 81 80"><g fill="#fff"><polygon points="48.81,66.34 43.18,76.08 1.64,4.14 12.9,4.14 34.11,40.89 37.08,46.04 48.81,66.34"/><polygon points="37.59,66.34 43.22,76.08 79.35,13.51 68.09,13.51 52.28,40.89 49.31,46.04 37.59,66.34"/><polygon points="48.81,39.2 43.2,48.91 43.18,48.94 22.72,13.51 33.97,13.51 34.11,13.75 37.08,18.9 43.2,29.49 48.81,39.2"/><polygon points="69.09,4.14 43.22,48.94 43.2,48.91 37.59,39.2 43.2,29.49 49.31,18.9 52.28,13.75 57.83,4.14 69.09,4.14"/></g></svg>`;
const V_MASK = `url("data:image/svg+xml,${encodeURIComponent(V_MARK_SVG)}")`;

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
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />

        <Practices />
        <Values />
        <SectorRoll />
        <ClientLogos />
        <EmployeeVoices />
        <WhatsGoingOn />
        <JoinUs />
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


/* ─────────── HERO — dark, giant Verto "V" mark with the summer-summit video inside ─────────── */
function Hero() {
  return (
    <section className="relative overflow-hidden" style={{ background: "var(--ink)", color: "var(--ink-foreground)" }}>

      <div className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden">
        {/* Verto "V" mark — summit video clipped inside the mark */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[58.9%] hidden md:block">
          <div
            className="absolute inset-0"
            style={{
              maskImage: V_MASK,
              WebkitMaskImage: V_MASK,
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: "center",
              WebkitMaskPosition: "center",
            }}
          >
            <AutoplayVideo />
            <div
              className="absolute inset-0"
              style={{ background: "color-mix(in oklab, var(--ink) 20%, transparent)" }}
            />
          </div>
        </div>

        <div className="container-wide relative">
          <div className="max-w-2xl">
            <div className="text-[11px] uppercase tracking-[0.3em] opacity-70">The Verto Group · Precision talent, specialist brands</div>
            <TitleReveal as="h1" className="display-2 mt-8 tracking-tight" lines={["Precision talent.", "Specialist brands.", "One group."]} />
            <p className="mt-8 max-w-xl text-base md:text-lg opacity-80">
              Verto builds high-performance teams for the industries that keep everything else running — energy, engineering and the built environment. Three focused brands. One process-driven standard.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/careers" className="btn-base btn-primary on-ink">
                Join us <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/brands"
                className="btn-base btn-ghost-outline on-ink"
              >
                Explore the brands
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


      {/* Extended hero — what a seat at Verto comes with */}
      <div className="relative">
        <div
          className="container-wide relative grid grid-cols-2 md:grid-cols-4 pt-14 pb-24 lg:pt-20 lg:pb-32"
          style={{ borderTop: "1px solid color-mix(in oklab, var(--ink-foreground) 14%, transparent)" }}
        >
          {[
            { node: <><CountValue target={40} />%</>, label: "Commission — one of the market's best splits" },
            { node: <>Equity</>, label: "Share scheme — everyone owns a piece" },
            { node: <><CountValue target={2} format={false} />×</>, label: "Holiday incentives every year" },
            { node: <RegionRotator />, label: "International relocation opportunities" },
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

/* ─────────── AUTOPLAY VIDEO ───────────
   React doesn't render the `muted` attribute into SSR HTML, so browsers
   refuse to autoplay the server-rendered element. Force it via a ref. */
function AutoplayVideo() {
  const ref = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.muted = true;
    el.defaultMuted = true;
    const tryPlay = () => el.play().catch(() => {});
    tryPlay();
    // Some browsers only allow it once data is ready
    el.addEventListener("canplay", tryPlay, { once: true });
    return () => el.removeEventListener("canplay", tryPlay);
  }, []);
  return (
    <video
      ref={ref}
      src={summitVideo}
      poster={summitPoster}
      className="h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-label="Highlights from the Verto summer summit"
    />
  );
}

/* ─────────── REGION ROTATOR ─────────── */
function RegionRotator() {
  const regions = ["UK", "US"];
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



/* ─────────── OUR PRACTICES — logo-led brand tiles ─────────── */
function Practices() {
  return (
    <section className="py-24 lg:py-32" style={{ background: "var(--muted)" }}>
      <div className="container-wide">
        <div className="max-w-2xl">
          <span className="eyebrow">The brands</span>
          <TitleReveal className="display-2 mt-5" lines={["Three brands.", "One process-driven standard."]} />
          <p className="mt-6 text-muted-foreground max-w-xl">
            Founded in 2020, Verto connects exceptional technical and commercial people with the businesses that need them. Today, three focused brands — each with its own market, its own network and its own consultants — united by how we work.
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
          {BRAND_LIST.map((b) => (
            <Link
              key={b.slug}
              to="/brands/$brand"
              params={{ brand: b.slug }}
              data-brand={b.slug}
              aria-label={`Enter ${b.name}`}
              className="group relative block"
              style={{ perspective: "1400px", minHeight: 420 }}
            >
              <div
                className="relative w-full h-full transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:[transform:rotateY(180deg)] group-focus-visible:[transform:rotateY(180deg)]"
                style={{ transformStyle: "preserve-3d", minHeight: 420 }}
              >
                {/* ── FRONT — the brand's own logo, front and centre ── */}
                <div
                  className="absolute inset-0 overflow-hidden flex flex-col items-center justify-center p-10"
                  style={{
                    background: "var(--ink)",
                    color: "var(--ink-foreground)",
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  {/* brand stripe top */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] z-10" style={{ background: "var(--brand)" }} />

                  {/* subtle brand glow behind the logo */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(ellipse 70% 50% at 50% 55%, color-mix(in oklab, var(--brand) 16%, transparent) 0%, transparent 70%)",
                    }}
                  />

                  <img
                    src={BRAND_LOGOS[b.slug]}
                    alt={`${b.name} logo`}
                    className={`relative ${b.slug === "vertek" ? "h-12" : "h-20"} w-auto max-w-[80%] object-contain`}
                    style={b.slug === "edison-lux" ? { filter: "brightness(0) invert(1)" } : undefined}
                    loading="lazy"
                  />
                  <div className="relative mt-8 text-[10px] uppercase tracking-[0.3em] opacity-70">
                    {b.focus}
                  </div>
                  <div
                    className="relative mt-10 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-semibold opacity-0 group-hover:opacity-0 transition"
                    style={{ color: "var(--brand)" }}
                  >
                    Enter {b.name} <ArrowRight className="h-4 w-4" />
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
          ))}
        </div>


      </div>
    </section>
  );
}

/* ─────────── VALUES — Verto's five values ─────────── */
function Values() {
  const values = [
    { title: "Committed", body: "Passionate about working hard by doing everything in your power to hit results and ensure our candidates and clients receive the best possible experience. Be committed to own your day, be results driven and take satisfaction from doing what we say we are going to do." },
    { title: "Competitive", body: "We strive for excellence; this drives us to proactively overcome challenges ensuring optimal solutions for you. Being competitive in ourselves allows us to continuously enhance and evolve our recruitment processes to deliver high-quality service." },
    { title: "Curious", body: "Driven by curiosity and being inquisitive, we continually ask great questions, truly believing that curiosity leads to greater knowledge." },
    { title: "A Team", body: "By having an optimistic attitude and working as a team, together we celebrate success as a group of people orientated, optimistic and positive people." },
    { title: "Love Our Processes", body: "Our recruitment processes are built off years of successful recruiting and learning from our mistakes. By being a “phone first” business, sticking to our plans and ensuring we work in the best way possible, then we will all succeed." },
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
          <span className="eyebrow">Verto&apos;s values</span>
          <TitleReveal className="display-2 mt-5" lines={["Five values.", "Every desk, every day."]} />
          <p
            className="mt-6"
            style={{ color: "color-mix(in oklab, var(--ink-foreground) 68%, transparent)" }}
          >
            Every desk runs its own market and its own network. What&apos;s shared is what we stand for — the five values every person across the group works by.
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
  const groups: {
    key: string;
    wordmark: string;
    descriptor: string;
    color: string;
    brand?: BrandSlug;
    items: string[];
  }[] = [
    {
      key: "edison-lux",
      wordmark: "EDISON LUX",
      descriptor: "Power & Energy",
      /* Guideline accents — on this light ground Edison uses Electric Blue
         (Energy Green fails contrast on white) */
      color: "#2B8EE5",
      brand: "edison-lux",
      items: ["Critical Power & CCGT", "Renewables & Storage", "EPC & Project Delivery", "O&M (Operations & Maintenance)"],
    },
    {
      key: "vertek",
      wordmark: "VERTEK",
      descriptor: "Engineering, Sales & Manufacturing",
      color: "#F82B60",
      brand: "vertek",
      items: ["Fluid Power & Hydraulics", "HVAC & Refrigeration", "Advanced Manufacturing", "Instrumentation & Controls"],
    },
    {
      key: "modulr",
      wordmark: "MODULR",
      descriptor: "Built Environment",
      color: "#0464FA",
      brand: "modulr",
      items: ["Hyperscale Data Centres", "US Architecture", "MEP Engineering", "Interior Design & Fit-out"],
    },
    {
      key: "verto",
      wordmark: "VERTO GROUP",
      descriptor: "Life Sciences — held at group level",
      color: "var(--accent)",
      items: ["Drug Development", "Clinical Operations", "Biometrics & Data", "Commercial & Medical Affairs"],
    },
  ];
  return (
    <section className="py-24 hairline-top" style={{ background: "var(--muted)" }}>
      <div className="container-wide">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <span className="eyebrow">Sector coverage</span>
            <TitleReveal className="display-2 mt-5" lines={["Whatever you're building,", "we know who builds it."]} />
            <p className="mt-6 text-muted-foreground">
              Every consultant at Verto is a former operator, engineer or in-market recruiter — not a generalist. The sectors below aren&apos;t categories on a website; they&apos;re desks that ship hires every month.
            </p>
            <p className="mt-4 text-muted-foreground">
              Each links through to the brand that owns it. Our life sciences desk sits with the group while it grows.
            </p>
          </div>
          <div className="lg:col-span-8 space-y-10">
            {groups.map((g) => (
              <div
                key={g.key}
                style={{
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  ["--sector-brand" as any]: g.color,
                }}
              >
                <div className="flex items-baseline justify-between gap-4 pb-4" style={{ borderBottom: `1px solid var(--sector-brand)` }}>
                  <div className="flex items-baseline gap-3">
                    <span className="h-2 w-2 rounded-full self-center" style={{ background: "var(--sector-brand)" }} />
                    <span className="font-display text-lg tracking-tight">{g.wordmark}</span>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{g.descriptor}</span>
                  </div>
                  {g.brand ? (
                    <Link
                      to="/brands/$brand"
                      params={{ brand: g.brand }}
                      className="text-[10px] uppercase tracking-[0.22em] font-medium inline-flex items-center gap-1.5 opacity-80 hover:opacity-100 transition"
                      style={{ color: "var(--sector-brand)" }}
                    >
                      Enter {g.wordmark.charAt(0) + g.wordmark.slice(1).toLowerCase()} <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  ) : (
                    <Link
                      to="/contact"
                      className="text-[10px] uppercase tracking-[0.22em] font-medium inline-flex items-center gap-1.5 opacity-80 hover:opacity-100 transition"
                      style={{ color: "var(--sector-brand)" }}
                    >
                      Talk to the group <ArrowUpRight className="h-3 w-3" />
                    </Link>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2">
                  {g.items.map((name, i) => {
                    const inner = (
                      <>
                        <span className="flex items-center gap-3 text-base font-medium">
                          <span
                            className="h-3 w-[3px] rounded-sm transition group-hover:h-5"
                            style={{ background: "var(--sector-brand)" }}
                          />
                          {name}
                        </span>
                        <ArrowUpRight
                          className="h-4 w-4 opacity-40 transition group-hover:opacity-100"
                          style={{ color: "var(--sector-brand)" }}
                        />
                      </>
                    );
                    const cls = "group flex items-center justify-between gap-6 py-4 pr-2 md:pr-4 transition";
                    const style = { borderTop: i < 2 ? undefined : "1px solid var(--border)" };
                    return g.brand ? (
                      <Link key={name} to="/brands/$brand" params={{ brand: g.brand }} className={cls} style={style}>
                        {inner}
                      </Link>
                    ) : (
                      <Link key={name} to="/contact" className={cls} style={style}>
                        {inner}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────── CLIENT LOGOS ───────────
   ⚠️ PLACEHOLDER — awaiting client logo files (SVG/PNG) and permission to
   use them. Swap the placeholder tiles for real logos when they arrive. */
function ClientLogos() {
  const placeholders = Array.from({ length: 10 }, (_, i) => i);
  return (
    <section className="py-16 lg:py-20 overflow-hidden hairline-bottom">
      <div className="container-wide mb-10">
        <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground text-center">
          Trusted by operators, developers, manufacturers &amp; design practices across three continents
        </div>
      </div>
      <div className="logo-marquee relative">
        <div className="logo-marquee-track">
          {[...placeholders, ...placeholders].map((p, i) => (
            <div key={i} className="logo-marquee-item">
              <span
                className="inline-flex h-12 w-36 items-center justify-center border border-dashed text-[10px] uppercase tracking-[0.2em] text-muted-foreground"
                style={{ borderColor: "var(--border)" }}
              >
                Client logo
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="container-wide mt-8">
        <p className="text-center text-[10px] uppercase tracking-[0.2em] text-muted-foreground opacity-70">
          Placeholder — client logos to follow
        </p>
      </div>
    </section>
  );
}

/* ─────────── WHAT EMPLOYEES SAY ───────────
   ⚠️ PLACEHOLDER QUOTES — the client is gathering real employee quotes.
   Structure and design are final; the words below are stand-ins. */
function EmployeeVoices() {
  const items = [
    {
      quote: "I joined as a graduate with no recruitment experience. Four years on I run my own market, I've been to Barcelona and Prague on incentive trips, and I own a piece of the business I helped build.",
      who: "Placeholder — Senior Consultant",
      org: "Joined 2022 · Solent",
    },
    {
      quote: "The 40% commission is what got my attention. The reason I've stayed is the way we work — phone first, plan led, and a team that actually celebrates each other's deals.",
      who: "Placeholder — Recruitment Consultant",
      org: "Joined 2023 · Solent",
    },
    {
      quote: "I moved from the UK to Austin with Verto. The relocation wasn't a perk buried in a handbook — the business planned my desk, my visa and my first three months before I flew.",
      who: "Placeholder — Principal Consultant",
      org: "Joined 2021 · Austin",
    },
    {
      quote: "Two incentive holidays a year sounds like a gimmick until you're on the second one, sat with the whole company, and nobody's checking their phone.",
      who: "Placeholder — Consultant",
      org: "Joined 2024 · Solent",
    },
  ];

  // Duplicate for seamless loop
  const loop = [...items, ...items];

  return (
    <section className="py-24 lg:py-32" style={{ background: "var(--ink)", color: "var(--ink-foreground)" }}>
      <div className="container-wide">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-start">
          <div className="max-w-3xl">
            <div className="text-[11px] uppercase tracking-[0.28em] opacity-60">What employees say about us</div>
            <TitleReveal className="display-1 mt-6" lines={["Don't take our", "word for it."]} />
            <p className="mt-6 opacity-70 max-w-xl">
              Real quotes from the team are on their way — these are placeholders while we collect them.
            </p>
          </div>
          <div
            className="hidden lg:block h-40 w-40 xl:h-56 xl:w-56 self-start"
            style={{
              maskImage: V_MASK,
              WebkitMaskImage: V_MASK,
              maskSize: "contain",
              WebkitMaskSize: "contain",
              maskRepeat: "no-repeat",
              WebkitMaskRepeat: "no-repeat",
              maskPosition: "center",
              WebkitMaskPosition: "center",
            }}
          >
            <img src={ibizaTeam} alt="" aria-hidden className="h-full w-full object-cover" loading="lazy" />
          </div>
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
              <span className="font-display text-5xl leading-none block" style={{ color: "var(--accent)" }}>&ldquo;</span>
              <blockquote className="mt-2 text-base leading-relaxed opacity-90 flex-1">{t.quote}</blockquote>
              <figcaption className="mt-8 hairline-top pt-5">
                <div className="text-sm font-semibold">{t.who}</div>
                <div className="text-xs uppercase tracking-[0.18em] opacity-60 mt-1">{t.org}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>

      {/* Awards strip */}
      <div className="container-wide mt-14 lg:mt-16">
        <div
          className="flex flex-col md:flex-row md:items-center gap-8 p-8 md:p-10 border border-white/10"
          style={{ background: "color-mix(in oklab, var(--ink-foreground) 4%, transparent)" }}
        >
          <img
            src={bptwBadge}
            alt="The Sunday Times Best Places to Work 2026 — Small Organisation"
            className="h-24 w-auto shrink-0"
            loading="lazy"
          />
          <div>
            <div className="text-[10px] uppercase tracking-[0.28em] font-semibold" style={{ color: "var(--accent)" }}>Company awards</div>
            <h3 className="mt-3 font-display text-2xl md:text-3xl leading-tight">
              The Sunday Times Best Places to Work 2026.
            </h3>
            <p className="mt-3 text-sm opacity-75 max-w-2xl">
              Alongside Best New Recruitment Agency of the Year at the British Recruitment Awards (2023), two category wins at the Business Awards UK (2023), a Recruiter Awards shortlist for Best New Agency (2023) and a finalist place at the News Business Excellence Awards (2024).
            </p>
          </div>
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


/* ─────────── WHAT'S GOING ON ─────────── */
function WhatsGoingOn() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container-wide">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div className="max-w-xl">
            <span className="eyebrow">What&apos;s going on</span>
            <TitleReveal className="display-2 mt-5" lines={["Life inside the group."]} />
            <p className="mt-6 text-muted-foreground">
              Incentive trips, awards, sales days and everything in between — straight from the team, not a marketing department.
            </p>
          </div>
          <Link to="/insights" className="text-sm font-medium inline-flex items-center gap-2" style={{ color: "var(--accent)" }}>
            See everything that's going on <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {WHATS_GOING_ON.slice(0, 3).map((i) => (
            <article key={i.slug} className="group flex flex-col card-surface overflow-hidden">
              <InsightThumb brand={i.brand} contentType={i.contentType} sector={i.sector} />
              <div className="p-7 flex flex-col flex-1">
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  <span style={{ color: "var(--accent)" }}>Verto Group</span>
                  <span>·</span>
                  <span>{i.sector}</span>
                </div>
                <h3 className="mt-5 font-display text-2xl leading-tight">{i.title}</h3>
                <p className="mt-4 text-base text-muted-foreground line-clamp-3">{i.excerpt}</p>
                <div className="mt-auto pt-6 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{i.readMinutes} min read</span>
                  <ArrowUpRight className="h-4 w-4 transition" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────── JOIN US — internal jobs board ─────────── */
function JoinUs() {
  return (
    <section
      className="py-24 lg:py-32 hairline-top"
      style={{ background: "var(--ink)", color: "var(--ink-foreground)" }}
    >
      <div className="container-wide">
        <JobsBoard />
        <div className="mt-12 flex flex-wrap gap-3">
          <Link to="/careers" className="btn-base btn-primary on-ink">
            Why join Verto <ArrowRight className="h-4 w-4" />
          </Link>
          <Link to="/contact" className="btn-base btn-ghost-outline on-ink">
            Join us
          </Link>
        </div>
      </div>
    </section>
  );
}
