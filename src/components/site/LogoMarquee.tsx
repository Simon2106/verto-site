const LOGOS = [
  "siemens.com",
  "ge.com",
  "bechtel.com",
  "fluor.com",
  "aecom.com",
  "jacobs.com",
  "nextera.com",
  "duke-energy.com",
  "vestas.com",
  "orsted.com",
  "eaton.com",
  "abb.com",
  "schneider-electric.com",
  "mitsubishipower.com",
  "kiewit.com",
  "blackandveatch.com",
];

const TOKEN = import.meta.env.VITE_LOVABLE_CONNECTOR_LOGO_DEV_API_KEY as string | undefined;

function logoUrl(domain: string) {
  const base = `https://img.logo.dev/${domain}?size=200&format=png&greyscale=true&fallback=monogram`;
  return TOKEN ? `${base}&token=${TOKEN}` : base;
}

export function LogoMarquee() {
  const items = [...LOGOS, ...LOGOS];
  return (
    <section
      className="py-16 lg:py-20 overflow-hidden"
      style={{ background: "var(--background)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
    >
      <div className="container-wide mb-10">
        <div className="flex flex-col gap-2">
          <span className="h-[2px] w-10" style={{ background: "var(--brand)" }} />
          <span className="text-[11px] uppercase tracking-[0.22em] font-bold" style={{ color: "var(--brand)" }}>
            Trusted by
          </span>
        </div>
      </div>

      <div className="logo-marquee relative">
        <div className="logo-marquee-track">
          {items.map((domain, i) => (
            <div key={`${domain}-${i}`} className="logo-marquee-item">
              <img
                src={logoUrl(domain)}
                alt={`${domain} logo`}
                loading="lazy"
                className="h-10 md:h-12 w-auto object-contain opacity-60 hover:opacity-100 transition"
                style={{ filter: "grayscale(100%)" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
