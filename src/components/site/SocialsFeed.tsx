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
    <div className="grid gap-10 lg:grid-cols-[1fr_2fr] items-start">
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
      <div className="rounded-2xl overflow-hidden border border-border bg-surface">
        <iframe
          src="https://www.instagram.com/verto_people/embed"
          title="Verto People on Instagram"
          className="w-full h-[540px] md:h-[640px]"
          loading="lazy"
          frameBorder={0}
          scrolling="no"
        />
      </div>
    </div>
  );
}
