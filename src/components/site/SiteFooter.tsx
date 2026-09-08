import { Link } from "@tanstack/react-router";
import { VertoLogo } from "./VertoLogo";
import { BRAND_LIST } from "@/lib/brands";

export function SiteFooter() {
  return (
    <footer className="mt-24" style={{ background: "var(--ink)", color: "var(--ink-foreground)" }}>
      <div className="container-wide py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Round 4, item 10: strapline removed (read too Edison), logo
              enlarged, locations line restyled as gold small-caps. */}
          <div>
            <VertoLogo variant="light" className="!h-11" />
            <p
              className="mt-7 text-[13px] font-semibold uppercase tracking-[0.26em]"
              style={{ color: "var(--accent)" }}
            >
              Solent · Austin · Miami (soon)
            </p>
          </div>

          <FooterCol title="Group">
            <li><Link to="/about" className="footer-link opacity-80 hover:opacity-100">About Verto</Link></li>
            <li><Link to="/brands" className="footer-link opacity-80 hover:opacity-100">Our brands</Link></li>
            <li><Link to="/whats-going-on" className="footer-link opacity-80 hover:opacity-100">What's going on</Link></li>
            <li><Link to="/careers" className="footer-link opacity-80 hover:opacity-100">Careers</Link></li>

            <li><Link to="/contact" className="footer-link opacity-80 hover:opacity-100">Contact</Link></li>
          </FooterCol>

          <FooterCol title="Brands">
            {BRAND_LIST.map((b) => (
              <li key={b.slug}>
                <Link to="/brands/$brand" params={{ brand: b.slug }} className="footer-link opacity-80 hover:opacity-100">
                  {b.name}
                </Link>
              </li>
            ))}
          </FooterCol>

          <FooterCol title="Connect">
            <li><a href="mailto:hello@vertogroup.com" className="footer-link opacity-80 hover:opacity-100">hello@vertogroup.com</a></li>
            <li><a href="#" className="footer-link opacity-80 hover:opacity-100">LinkedIn</a></li>
            <li><Link to="/contact" className="footer-link opacity-80 hover:opacity-100">Join us</Link></li>
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
      {/* Round 4, item 10: links slightly larger, gold hover underline (.footer-link) */}
      <ul className="mt-5 space-y-3 text-[15px]">{children}</ul>
    </div>
  );
}

