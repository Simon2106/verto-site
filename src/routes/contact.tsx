import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { ContactForm } from "@/components/site/ContactForm";
import { Mail, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Verto Group" },
      { name: "description", content: "Tell us what you're building. We'll route you to the right specialist brand and consultant." },
      { property: "og:title", content: "Contact Verto Group" },
      { property: "og:description", content: "One group. Three brands. Every conversation starts the same way — tell us what you're building." },
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
            <span className="eyebrow">Get in touch</span>
            <h1 className="display-1 mt-6">Tell us what you're building.</h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-md">
              Hiring leader, candidate or curious — tell us what you're working on and we'll come back within one business day.
            </p>
            <div className="mt-12 space-y-5 text-sm">
              <Row icon={Mail}>hello@vertogroup.com</Row>
              <Row icon={Phone}>+44 (0)20 0000 0000</Row>
              <Row icon={MapPin}>London · New York · Houston</Row>
            </div>
          </div>
          <div className="rounded-3xl card-surface p-8 md:p-10">
            <ContactForm brand="verto" />
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
