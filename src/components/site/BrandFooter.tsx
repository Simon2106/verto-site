import { Link } from "@tanstack/react-router";
import { BRANDS, BRAND_LIST, type BrandSlug } from "@/lib/brands";
import { BrandLogo } from "./BrandLogo";

export function BrandFooter({ brand }: { brand: BrandSlug }) {
  const b = BRANDS[brand];
  return (
    <footer className="mt-24" style={{ background: "var(--ink)", color: "var(--ink-foreground)" }}>
      <div className="container-wide py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <BrandLogo brand={brand} variant="light" />
            <p className="mt-6 max-w-sm text-sm opacity-70">{b.focus}</p>
          </div>

          <FooterCol title="Explore">
            <li><Link to="/brands/$brand/about" params={{ brand }} className="opacity-80 hover:opacity-100 transition">About</Link></li>
            <li><Link to="/brands/$brand/for-companies" params={{ brand }} className="opacity-80 hover:opacity-100 transition">Clients</Link></li>
            <li><Link to="/brands/$brand/for-candidates" params={{ brand }} className="opacity-80 hover:opacity-100 transition">Candidates</Link></li>
            <li><Link to="/brands/$brand/insights" params={{ brand }} className="opacity-80 hover:opacity-100 transition">Insights</Link></li>
          </FooterCol>

          <FooterCol title="Other brands">
            {BRAND_LIST.filter(x => x.slug !== brand).map(x => (
              <li key={x.slug}>
                <Link to="/brands/$brand" params={{ brand: x.slug }} className="opacity-80 hover:opacity-100 transition">{x.name}</Link>
              </li>
            ))}
            <li><Link to="/" className="opacity-80 hover:opacity-100 transition">Verto Group</Link></li>
          </FooterCol>

          <FooterCol title="Connect">
            <li><a href="mailto:hello@vertogroup.com" className="opacity-80 hover:opacity-100">hello@vertogroup.com</a></li>
            <li><a href="#" className="opacity-80 hover:opacity-100">LinkedIn</a></li>
          </FooterCol>
        </div>
        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs opacity-60 md:flex-row md:justify-between">
          <span>© {new Date().getFullYear()} {b.name}, a Verto Group brand.</span>
          <div className="flex gap-6">
            <a href="#">Privacy</a><a href="#">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-xs uppercase tracking-[0.22em] opacity-60">{title}</h4>
      <ul className="mt-5 space-y-3 text-sm">{children}</ul>
    </div>
  );
}
