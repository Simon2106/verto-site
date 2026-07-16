import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowUpRight, Crosshair, BarChart3, Shield, Leaf,
  Users, Star, Handshake, TrendingUp, Globe2, Lock, Compass,
  Flame, Wind, HardHat, Wrench, Atom, Briefcase,
  Gauge, Thermometer, Cog, Factory, Cpu, LineChart,
  Server, Network, Building2, Zap, Layers, HeartHandshake,
  type LucideIcon,
} from "lucide-react";
import { BRANDS, isBrandSlug, getBrandImage, type BrandSlug } from "@/lib/brands";
import { INSIGHTS } from "@/lib/insights";
import { LogoMarquee } from "@/components/site/LogoMarquee";
import { InsightThumb } from "@/components/site/InsightThumb";
import { ParallaxImage } from "@/components/site/ParallaxImage";
import { TeamStrip } from "@/components/site/TeamStrip";



export const Route = createFileRoute("/brands/$brand/")({
  head: ({ params }) => {
    const b = isBrandSlug(params.brand) ? BRANDS[params.brand] : null;
    return {
      meta: [
        { title: b ? `${b.name} — ${b.focus}` : "Brand — Verto Group" },
        { name: "description", content: b?.positioning ?? "" },
        { property: "og:title", content: b?.name ?? "Verto Group" },
        { property: "og:description", content: b?.positioning ?? "" },
      ],
    };
  },
  component: BrandHome,
});

function BrandHome() {
  const { brand } = Route.useParams();
  if (!isBrandSlug(brand)) return null;
  return <BrandLandingHome brand={brand} />;
}

/* ─────────────────────────────────────────────────────────────
 * Per-brand landing configuration
 * (feature row + hero subhead — everything else is from BRANDS)
 * ───────────────────────────────────────────────────────────── */
type Feature = { icon: LucideIcon; title: string; body: string };

const FEATURES: Record<BrandSlug, Feature[]> = {
  vertek: [
    { icon: Crosshair, title: "Product-Owned Desks", body: "Every consultant owns one product area. Fluid power, HVAC, rotating equipment, automation — no generalists." },
    { icon: BarChart3, title: "Verto Engage", body: "Our committed model, 100% success rate. Structured process, guaranteed shortlist, get it right first time." },
    { icon: Shield, title: "94% Second Hire", body: "Nearly all our clients come back. We're an extension of the commercial team, not a vendor." },
    { icon: Leaf, title: "14,000+ On CRM", body: "A specialist database of technical sales, service and engineering talent LinkedIn can't surface." },
  ],
  "edison-lux": [
    { icon: Users, title: "US Energy.\nNothing Else.", body: "It's all we do — so no client brief sits outside our knowledge base." },
    { icon: Star, title: "Basement To Boardroom", body: "Control room operators, shift supervisors, VPs, C-suite — the full talent hierarchy staffed." },
    { icon: Handshake, title: "World-Class\nNPS", body: "Feedback captured from every candidate and client interaction — and it shows." },
    { icon: TrendingUp, title: "100% Engaged\nSuccess", body: "Speed and accuracy together — because when a COD is at risk, you shouldn't have to choose." },
  ],
  modulr: [
    { icon: Globe2, title: "UK, EU & US", body: "Hyperscale, colocation and celebrated US architecture — three regions, one network." },
    { icon: Compass, title: "Curated Introductions", body: "Considered shortlists with real context. Never CVs into the void." },
    { icon: Lock, title: "NDA-Grade Discretion", body: "Sensitive, pre-announcement and competitor-adjacent search handled as standard." },
    { icon: Handshake, title: "Long-Game Relationships", body: "We track careers and project pipelines to add value before the urgent need arises." },
  ],
};

const HERO_SUB: Record<BrandSlug, string> = {
  vertek: "Vertek recruits technical sales, service and engineering professionals for the manufacturers and distributors that keep industry moving — across the UK and US. Every consultant owns one product area.",
  "edison-lux": "Edison Lux delivers talent solutions for the US energy sector — from control room operators to the C-suite leaders responsible for billion-dollar assets. One market. Done properly.",
  modulr: "Modulr connects standout architecture and data centre professionals with the built environment's most ambitious work — hyperscale campuses, award-winning practices and the projects you won't find advertised.",
};

const SPECIALISM_ICONS: Record<BrandSlug, LucideIcon[]> = {
  "edison-lux": [Flame, Wind, HardHat, Wrench, Atom, Briefcase],
  vertek: [Gauge, Thermometer, Cog, Factory, Cpu, LineChart],
  modulr: [Server, Network, Building2, Zap, Layers, HeartHandshake],
};

/* ─────────────────────────────────────────────────────────────
 * Unified brand landing — Vertek-style structure for every brand
 * ───────────────────────────────────────────────────────────── */
function BrandLandingHome({ brand }: { brand: BrandSlug }) {
  const b = BRANDS[brand];
  const featuredInsights = INSIGHTS.filter((i) => i.brand === brand).slice(0, 3);
  const features = FEATURES[brand];

  return (
    <>
      {/* ─── HERO: dark, headline left, image right ─── */}
      <section className="relative overflow-hidden" style={{ background: "var(--ink)", color: "var(--ink-foreground)" }}>
        <div className="absolute inset-y-0 right-0 w-full lg:w-[78%] pointer-events-none">
          <ParallaxImage
            src={getBrandImage(b, "hero").src}
            alt={getBrandImage(b, "hero").alt}
            className="absolute inset-0 h-full w-full"
            speed={0.25}
            scale={brand === "modulr" ? 1.0 : 1.18}
            offsetY={brand === "modulr" ? 30 : 0}
            objectPosition="center 35%"
            overlay={
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, var(--ink) 0%, var(--ink) 12%, color-mix(in oklab, var(--ink) 85%, transparent) 28%, color-mix(in oklab, var(--ink) 55%, transparent) 48%, color-mix(in oklab, var(--ink) 25%, transparent) 68%, transparent 92%)",
                }}
              />
            }
          />
        </div>
        <div className="relative container-wide pt-20 lg:pt-28 pb-24 lg:pb-36">
          <div className="max-w-xl">
            <h1 className="display-2 uppercase tracking-tight" style={{ fontWeight: 800 }}>
              {b.tagline}<br />{b.taglineAccent}<span style={{ color: "var(--brand)" }}>.</span>
            </h1>
            <p className="mt-8 text-base md:text-lg opacity-80 max-w-md">
              {HERO_SUB[brand]}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/brands/$brand/for-companies" params={{ brand }} className="btn-base btn-primary uppercase tracking-[0.18em] text-xs">
                Our Solutions
              </Link>
              <Link to="/brands/$brand/about" params={{ brand }}
                className="inline-flex items-center gap-2 px-7 py-4 text-[11px] uppercase tracking-[0.2em] font-semibold border hover:bg-white/10 transition"
                style={{ borderColor: "var(--brand)", color: "var(--ink-foreground)" }}>
                Discover {b.name}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Feature row, white background ─── */}
      <section style={{ background: "#ffffff", color: "#0a0a0a" }}>
        <div className="container-wide py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <div
                key={f.title}
                className="px-6 lg:px-8 py-6 flex flex-col items-center text-center gap-4"
                style={{ borderLeft: i > 0 ? "1px solid #e6e6e6" : undefined }}
              >
                <f.icon className="h-10 w-10" strokeWidth={1.5} style={{ color: "var(--brand)" }} />
                <h3 className="font-display text-xl leading-snug whitespace-pre-line">{f.title}</h3>
                <p className="text-base leading-relaxed" style={{ color: "#4a4a4a", maxWidth: "22ch" }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── About: copy left (light), image+stats overlay right ─── */}
      <section style={{ background: "#f3f3f5", color: "#0a0a0a" }}>
        <div className="grid lg:grid-cols-2 items-stretch">
          <div className="flex items-center px-6 md:px-12 lg:px-20 py-16 lg:py-24">
            <div className="max-w-md">
              <div className="flex flex-col gap-2">
                <span className="h-[2px] w-10" style={{ background: "var(--brand)" }} />
                <span className="text-[11px] uppercase tracking-[0.22em] font-bold" style={{ color: "var(--brand)" }}>
                  About {b.name}
                </span>
              </div>
              <h2 className="mt-5 font-display text-4xl md:text-5xl leading-[1.05] tracking-tight">
                {b.about.headline}
              </h2>
              <p className="mt-6 text-base leading-relaxed" style={{ color: "#3a3a3a" }}>
                {b.about.mission}
              </p>
              <Link
                to="/brands/$brand/about"
                params={{ brand }}
                className="inline-flex items-center gap-2 mt-8 px-6 py-3.5 text-[11px] uppercase tracking-[0.2em] font-bold border transition hover:bg-[var(--brand)] hover:text-white"
                style={{ borderColor: "var(--brand)", color: "var(--brand)" }}
              >
                Learn more about us
              </Link>
            </div>
          </div>

          <div className="relative min-h-[420px] lg:min-h-[540px]">
            <img src={getBrandImage(b, "landingAbout").src} alt={getBrandImage(b, "landingAbout").alt} className="absolute inset-0 h-full w-full object-cover" />
            <div
              className="absolute right-6 top-6 md:right-10 md:top-10 w-[78%] md:w-[300px] p-7 md:p-8"
              style={{
                background: "#0a0a0a",
                color: "#ffffff",
                borderRadius: 4,
                boxShadow: "0 30px 80px -30px rgba(0,0,0,0.6)",
              }}
            >
              {b.stats.map((s, i) => (
                <div key={s.label} className={i > 0 ? "mt-6 pt-6 border-t border-white/15" : ""}>
                  <span className="h-[2px] w-8 block" style={{ background: "var(--brand)" }} />
                  <div className="text-3xl md:text-4xl font-extrabold mt-3" style={{ color: "var(--brand)" }}>{s.value}</div>
                  <div className="mt-2 text-[8px] uppercase tracking-[0.22em] opacity-80">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Specialisms ─── */}
      <section className="py-24" style={{ background: "var(--background)" }}>
        <div className="container-wide">
          <div className="max-w-2xl">
            <span className="eyebrow">Specialisms</span>
            <h2 className="display-2 mt-5">What we cover.</h2>
          </div>
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {b.specialisms.map((s, i) => {
              const Icon = SPECIALISM_ICONS[brand][i] ?? Crosshair;
              return (
                <div
                  key={s.title}
                  className="group relative overflow-hidden p-8 transition-colors duration-300"
                  style={{ background: "color-mix(in oklab, var(--foreground) 6%, var(--background))" }}
                >
                  <span
                    className="absolute top-0 left-0 h-[3px] w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                    style={{ background: "var(--brand)" }}
                  />
                  <Icon className="h-9 w-9" strokeWidth={1.5} style={{ color: "var(--brand)" }} />
                  <div className="font-display text-sm mt-4 tracking-[0.22em] uppercase opacity-60">0{i + 1}</div>
                  <h3 className="mt-2 font-display text-2xl">{s.title}</h3>
                  <p className="mt-3 text-base opacity-75 leading-relaxed">{s.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <LogoMarquee />



      <section className="py-24" style={{ background: "var(--background)" }}>
        <div className="container-wide grid gap-6 lg:grid-cols-2">
          <AudienceCard kind="company" brand={brand} />
          <AudienceCard kind="candidate" brand={brand} />
        </div>
      </section>

      <TeamStrip brand={brand} brandName={BRANDS[brand].name} />

      <section className="container-wide py-24" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="flex justify-between items-end gap-6 flex-wrap">
          <div>
            <span className="eyebrow">Insights</span>
            <h2 className="display-2 mt-5">From inside the market.</h2>
          </div>
          <Link to="/brands/$brand/insights" params={{ brand }}
            className="text-sm font-medium inline-flex items-center gap-2" style={{ color: "var(--brand)" }}>
            View all <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {featuredInsights.map((i) => (
            <article key={i.slug} className="rounded-2xl card-surface overflow-hidden">
              <InsightThumb brand={i.brand} contentType={i.contentType} sector={i.sector} />
              <div className="p-7">
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{i.contentType}</div>
                <h3 className="mt-4 font-display text-2xl leading-tight">{i.title}</h3>
                <p className="mt-3 text-base opacity-75 line-clamp-3">{i.excerpt}</p>
                <div className="mt-5 text-xs text-muted-foreground">{i.readMinutes} min read</div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

function AudienceCard({ kind, brand }: { kind: "company" | "candidate"; brand: BrandSlug }) {
  const b = BRANDS[brand];
  const data = kind === "company" ? b.audiences.company : b.audiences.candidate;
  return (
    <article className="rounded-3xl p-10 lg:p-12 flex flex-col"
      style={{ background: kind === "company" ? "var(--ink)" : "var(--surface)", color: kind === "company" ? "var(--ink-foreground)" : "var(--surface-foreground)" }}>
      <div className="text-[10px] uppercase tracking-[0.28em] opacity-70">
        {kind === "company" ? "For companies" : "For candidates"}
      </div>
      <h3 className="font-display text-3xl md:text-4xl mt-5 leading-tight">{data.headline}</h3>
      <p className="mt-5 text-base opacity-80">{data.body}</p>
      <ul className="mt-7 space-y-3 text-sm">
        {data.bullets.map((bp) => (
          <li key={bp} className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: "var(--brand)" }} />
            <span>{bp}</span>
          </li>
        ))}
      </ul>
      <Link to={kind === "company" ? "/brands/$brand/for-companies" : "/brands/$brand/for-candidates"}
        params={{ brand: b.slug }}
        className="btn-base btn-primary self-start mt-8">
        {data.cta} <ArrowUpRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
