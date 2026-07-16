import { Link } from "@tanstack/react-router";
import { VertoLogo } from "./VertoLogo";
import { BRAND_LIST } from "@/lib/brands";

export function SiteFooter() {
  return (
    <footer className="mt-24" style={{ background: "var(--ink)", color: "var(--ink-foreground)" }}>
      <div className="container-wide py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <VertoLogo variant="light" />
            <p className="mt-6 max-w-sm text-sm opacity-80">
              Verto Group · Edison Lux · Vertek · Modulr — precision talent for the industries that build, power and run the world.
            </p>
            <p className="mt-6 text-xs uppercase tracking-[0.22em] opacity-60">
              London · Manchester · Amsterdam · Frankfurt · New York · Houston · Chicago
            </p>
          </div>

          <FooterCol title="Group">
            <li><Link to="/about" className="opacity-80 hover:opacity-100 transition">About Verto</Link></li>
            <li><Link to="/brands" className="opacity-80 hover:opacity-100 transition">Our brands</Link></li>
            <li><Link to="/insights" className="opacity-80 hover:opacity-100 transition">Insights</Link></li>
            <li><Link to="/careers" className="opacity-80 hover:opacity-100 transition">Careers</Link></li>

            <li><Link to="/contact" className="opacity-80 hover:opacity-100 transition">Contact</Link></li>
          </FooterCol>

          <FooterCol title="Brands">
            {BRAND_LIST.map((b) => (
              <li key={b.slug}>
                <Link to="/brands/$brand" params={{ brand: b.slug }} className="opacity-80 hover:opacity-100 transition">
                  {b.name}
                </Link>
              </li>
            ))}
          </FooterCol>

          <FooterCol title="Connect">
            <li><a href="mailto:hello@vertogroup.com" className="opacity-80 hover:opacity-100 transition">hello@vertogroup.com</a></li>
            <li><a href="#" className="opacity-80 hover:opacity-100 transition">LinkedIn</a></li>
            <li><Link to="/contact" className="opacity-80 hover:opacity-100 transition">Speak to our team</Link></li>
          </FooterCol>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs opacity-60 md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} Verto Group. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Cookies</a>
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

