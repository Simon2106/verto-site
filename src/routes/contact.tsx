import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ContactForm } from "@/components/site/ContactForm";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { LOCATIONS } from "@/lib/locations";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Join us — Verto Group" },
      { name: "description", content: "Thinking about a career at Verto? Tell us about yourself — we reply to every note within one business day." },
      { property: "og:title", content: "Join us — Verto Group" },
      { property: "og:description", content: "40% commission, a share scheme for everyone and two incentive trips a year. Start the conversation." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1 container-wide py-20 lg:py-28">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <span className="eyebrow">Join us</span>
            <h1 className="display-1 mt-6">Start the conversation.</h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-md">
              This page is about joining Verto — whether you're an experienced consultant or just think you'd be good at this. Tell us about yourself and we'll come back within one business day. (Hiring or job-seeking? Head to the brand that owns your market.)
            </p>
            <div className="mt-12 space-y-5 text-sm">
              <Row icon={Mail}>hello@vertogroup.com</Row>
              <Row icon={Phone}>+44 23 9298 5450 (UK) · +1 737 285 3760 (US)</Row>
              <Row icon={MapPin}>Solent, UK · Austin, TX · Miami (soon)</Row>
            </div>
          </div>
          <div className="rounded-3xl card-surface p-8 md:p-10">
            <ContactForm brand="verto" />
          </div>
        </div>
        {/* LOCATION HUB — LHi-style office pages */}
        <div className="mt-24 hairline-top pt-16">
          <span className="eyebrow">Or say hello in person</span>
          <h2 className="display-3 mt-5">Three places to find us.</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {LOCATIONS.map((l) => (
              <Link
                key={l.slug}
                to="/locations/$location"
                params={{ location: l.slug }}
                className="group relative overflow-hidden rounded-2xl min-h-[220px] flex flex-col justify-end p-7"
                style={{ background: "var(--ink)", color: "var(--ink-foreground)" }}
              >
                <img
                  src={l.heroImage}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-60 transition duration-500 group-hover:scale-105 group-hover:opacity-70"
                />
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 20%, color-mix(in oklab, var(--ink) 85%, transparent) 100%)" }} />
                <div className="relative">
                  {l.status && (
                    <div className="text-[9px] uppercase tracking-[0.24em] mb-2" style={{ color: "var(--accent)" }}>{l.status}</div>
                  )}
                  <div className="font-display text-2xl">Hello, {l.name}.</div>
                  <div className="mt-1 text-xs opacity-70">{l.address[0]}</div>
                  <div className="mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] font-semibold" style={{ color: "var(--accent)" }}>
                    Visit the office page <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}

function Row({ icon: Icon, children }: { icon: typeof Mail; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="h-4 w-4" style={{ color: "var(--accent)" }} />
      <span>{children}</span>
    </div>
  );
}
