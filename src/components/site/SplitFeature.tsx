import { Link } from "@tanstack/react-router";
import { ParallaxImage } from "./ParallaxImage";

type StatItem = { value: string; label: string };
type CtaItem = { label: string; to: string; params?: Record<string, string> };

/**
 * Two-column split: light panel with copy + image with floating dark stat card.
 * Set `reverse` to flip (image left, copy right).
 */
export function SplitFeature({
  eyebrow,
  headline,
  body,
  image,
  imageAlt,
  stats,
  cta,
  reverse = false,
  panelBg = "var(--muted)",
  parallax = true,
  grayscale = false,
}: {
  eyebrow?: string;
  headline: React.ReactNode;
  body: React.ReactNode;
  image: string;
  imageAlt: string;
  stats?: StatItem[];
  cta?: CtaItem;
  reverse?: boolean;
  panelBg?: string;
  parallax?: boolean;
  grayscale?: boolean;
}) {
  const copySide = (
    <div className="flex items-center px-6 md:px-12 lg:px-20 py-16 lg:py-24" style={{ background: panelBg }}>
      <div className="max-w-md">
        {eyebrow && (
          <div className="flex flex-col gap-2">
            <span className="h-[2px] w-10" style={{ background: "var(--brand)" }} />
            <span className="text-[11px] uppercase tracking-[0.22em] font-bold" style={{ color: "var(--brand)" }}>
              {eyebrow}
            </span>
          </div>
        )}
        <h2 className="mt-5 font-display text-4xl md:text-5xl leading-[1.05] tracking-tight">{headline}</h2>
        <div className="mt-6 text-base leading-relaxed opacity-85 space-y-4">
          {typeof body === "string" ? <p>{body}</p> : body}
        </div>
        {cta && (
          <Link
            to={cta.to as never}
            params={cta.params as never}
            className="inline-flex items-center gap-2 mt-8 px-6 py-3.5 text-[11px] uppercase tracking-[0.2em] font-bold border transition hover:bg-[var(--brand)] hover:text-white"
            style={{ borderColor: "var(--brand)", color: "var(--brand)" }}
          >
            {cta.label}
          </Link>
        )}
      </div>
    </div>
  );

  const imageSide = (
    <div className="relative min-h-[420px] lg:min-h-[540px]">
      {parallax ? (
        <ParallaxImage
          src={image}
          alt={imageAlt}
          className={`absolute inset-0 h-full w-full ${grayscale ? "[&_img]:grayscale" : ""}`}
          speed={0.2}
        />
      ) : (
        <img
          src={image}
          alt={imageAlt}
          className={`absolute inset-0 h-full w-full object-cover ${grayscale ? "grayscale" : ""}`}
          loading="lazy"
        />
      )}
      {stats && stats.length > 0 && (
        <div
          className={`absolute ${reverse ? "left-6 top-6 md:left-10 md:top-10" : "right-6 top-6 md:right-10 md:top-10"} w-[78%] md:w-[300px] p-7 md:p-8`}
          style={{
            background: "#0a0a0a",
            color: "#ffffff",
            borderRadius: 4,
            boxShadow: "0 30px 80px -30px rgba(0,0,0,0.6)",
          }}
        >
          {stats.map((s, i) => (
            <div key={s.label} className={i > 0 ? "mt-6 pt-6 border-t border-white/15" : ""}>
              <span className="h-[2px] w-8 block" style={{ background: "var(--brand)" }} />
              <div className="text-3xl md:text-4xl font-extrabold mt-3" style={{ color: "var(--brand)" }}>
                {s.value}
              </div>
              <div className="mt-2 text-[10px] uppercase tracking-[0.22em] opacity-80">{s.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <section style={{ color: "#0a0a0a" }}>
      <div className="grid lg:grid-cols-2 items-stretch">
        {reverse ? (
          <>
            {imageSide}
            {copySide}
          </>
        ) : (
          <>
            {copySide}
            {imageSide}
          </>
        )}
      </div>
    </section>
  );
}
