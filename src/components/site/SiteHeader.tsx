import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { VertoLogo } from "./VertoLogo";
import { BRAND_LIST } from "@/lib/brands";

const SECONDARY = [
  { to: "/whats-going-on", label: "What's going on" },
  { to: "/about", label: "About" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
] as const;


export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-[color-mix(in_oklab,var(--background)_82%,transparent)] hairline-bottom">
      <div className="container-wide flex h-20 items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <VertoLogo />
        </Link>
        {/* Round 9, item 6: nav items as individual buttons – padded pill
            hover + gold underline growing from the left; the current page
            keeps gold text and a standing underline (.nav-item). */}
        <nav className="hidden lg:flex items-center gap-1.5">
          {BRAND_LIST.map((b) => (
            <Link
              key={b.slug}
              to="/brands/$brand"
              params={{ brand: b.slug }}
              activeProps={{ className: "nav-item--active" }}
              className="nav-item text-[13px] font-medium uppercase tracking-[0.14em] text-foreground/80 hover:text-foreground"
            >
              {b.name}
            </Link>
          ))}
          <span className="mx-2 h-4 w-px bg-[var(--border)]" />
          {SECONDARY.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeProps={{ className: "nav-item--active" }}
              className="nav-item text-[13px] font-medium uppercase tracking-[0.14em] text-foreground/80 hover:text-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Link to="/contact" className="btn-base btn-pill btn-ink">Join us</Link>
        </div>
        <button
          className="lg:hidden p-2 -m-2"
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden hairline-top">
          <div className="container-wide flex flex-col gap-1 py-4">
            {BRAND_LIST.map((b) => (
              <Link
                key={b.slug}
                to="/brands/$brand"
                params={{ brand: b.slug }}
                onClick={() => setOpen(false)}
                className="px-2 py-3 text-base font-medium"
              >
                {b.name}
              </Link>
            ))}
            <div className="my-2 border-t border-[var(--border)]" />
            {SECONDARY.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="px-2 py-3 text-base font-medium"
              >
                {n.label}
              </Link>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="btn-base btn-pill btn-ink mt-2 self-start">
              Start a search
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
