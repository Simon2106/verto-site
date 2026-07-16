import { Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ArrowLeft, ChevronDown } from "lucide-react";
import { BRANDS, BRAND_LIST, type BrandSlug } from "@/lib/brands";
import { BrandLogo } from "./BrandLogo";

export function BrandHeader() {
  const params = useParams({ from: "/brands/$brand" });
  const brand = BRANDS[params.brand as BrandSlug];
  const [open, setOpen] = useState(false);
  const [switcherOpen, setSwitcherOpen] = useState(false);

  const nav: Array<{ to: "/brands/$brand" | "/brands/$brand/about" | "/brands/$brand/for-companies" | "/brands/$brand/for-candidates" | "/brands/$brand/insights"; label: string; exact?: boolean }> = [
    { to: "/brands/$brand", label: "Home", exact: true },
    { to: "/brands/$brand/about", label: "About" },
    { to: "/brands/$brand/for-companies", label: "Clients" },
    { to: "/brands/$brand/for-candidates", label: "Candidates" },
    { to: "/brands/$brand/insights", label: "Insights" },
  ];

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md hairline-bottom"
      style={{ background: "color-mix(in oklab, var(--background) 85%, transparent)" }}>
      <div className="container-wide flex h-20 items-center justify-between gap-6">
        <div className="flex items-center gap-5 min-w-0">
          <Link to="/brands/$brand" params={{ brand: brand.slug }} className="flex items-center min-w-0">
            <BrandLogo brand={brand.slug} />
          </Link>
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              params={{ brand: brand.slug }}
              activeOptions={{ exact: n.exact }}
              activeProps={{ style: { color: "var(--brand)" } }}
              className="text-sm font-medium opacity-80 hover:opacity-100 transition"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <BrandSwitcher current={brand.slug} open={switcherOpen} setOpen={setSwitcherOpen} />
          <Link to="/brands/$brand/for-companies" params={{ brand: brand.slug }} className="btn-base btn-pill btn-primary">
            Get in touch
          </Link>
        </div>

        <button className="lg:hidden p-2 -m-2" aria-label="Menu" onClick={() => setOpen((o) => !o)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden hairline-top">
          <div className="container-wide flex flex-col gap-1 py-4">
            {nav.map((n) => (
              <Link key={n.to} to={n.to} params={{ brand: brand.slug }}
                onClick={() => setOpen(false)}
                className="px-2 py-3 text-base font-medium">{n.label}</Link>
            ))}
            <div className="mt-2 hairline-top pt-4">
              <p className="text-xs uppercase tracking-[0.22em] opacity-60 mb-2">Switch brand</p>
              {BRAND_LIST.filter(b => b.slug !== brand.slug).map(b => (
                <Link key={b.slug} to="/brands/$brand" params={{ brand: b.slug }}
                  onClick={() => setOpen(false)}
                  className="block px-2 py-2 text-sm">{b.name}</Link>
              ))}
              <Link to="/" onClick={() => setOpen(false)} className="block px-2 py-2 text-sm opacity-70">
                ← Verto Group
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function BrandSwitcher({ current, open, setOpen }: { current: BrandSlug; open: boolean; setOpen: (v: boolean) => void }) {
  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        className="btn-base btn-pill btn-ghost-outline text-xs"
      >
        Switch brand <ChevronDown className="h-3.5 w-3.5" />
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-64 rounded-xl p-2 shadow-xl z-50"
          style={{ background: "var(--surface)", color: "var(--surface-foreground)", border: "1px solid var(--border)" }}>
          {BRAND_LIST.filter(b => b.slug !== current).map(b => (
            <Link key={b.slug} to="/brands/$brand" params={{ brand: b.slug }}
              className="block rounded-lg px-3 py-2.5 text-sm hover:bg-[color-mix(in_oklab,var(--accent)_15%,transparent)] transition">
              <div className="font-medium">{b.name}</div>
              <div className="text-xs opacity-60">{b.focus}</div>
            </Link>
          ))}
          <div className="hairline-top mt-1 pt-1">
            <Link to="/" className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm opacity-80 hover:opacity-100">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Verto Group
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
