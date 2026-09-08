import { Instagram } from "lucide-react";

/**
 * Verto-only socials feed (@verto_people). Uses Instagram's public embed —
 * shows the live profile grid without any API keys.
 */
export function SocialsFeed({
  eyebrow = "Life at Verto",
  heading = "The moments between the meetings.",
  body = "Awards, incentive trips, sales days and the occasional inflatable — what working here actually looks like.",
}: {
  eyebrow?: string;
  heading?: string;
  body?: string;
}) {
  return (
    /* Round 4, item 9: intro column narrower, embed wider (~860px card). */
    <div className="grid gap-10 lg:grid-cols-[minmax(0,21rem)_minmax(0,1fr)] items-start">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2 className="display-3 mt-5">{heading}</h2>
        <p className="mt-6 text-muted-foreground leading-relaxed">{body}</p>
        <a
          href="https://www.instagram.com/verto_people/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-base btn-pill btn-ink mt-8 inline-flex"
        >
          <Instagram className="h-4 w-4" />
          Follow @verto_people
        </a>
      </div>
      {/* Round 4, item 9: proper card frame with a soft shadow */}
      <div
        className="w-full max-w-[860px] rounded-2xl overflow-hidden border border-border bg-surface"
        style={{ boxShadow: "0 28px 64px -36px color-mix(in oklab, var(--ink) 55%, transparent)" }}
      >
        <iframe
          src="https://www.instagram.com/verto_people/embed"
          title="Verto People on Instagram"
          className="w-full h-[560px] md:h-[680px]"
          loading="lazy"
          frameBorder={0}
          scrolling="no"
        />
      </div>
    </div>
  );
}
