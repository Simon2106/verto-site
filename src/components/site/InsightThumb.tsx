import type { ContentType } from "@/lib/insights";
import type { BrandSlug } from "@/lib/brands";
import insightPower from "@/assets/insight-power.jpg";
import insightEpc from "@/assets/insight-epc.jpg";
import insightDatacentre from "@/assets/insight-datacentre.jpg";
import insightArchitecture from "@/assets/insight-architecture.jpg";
import insightFluidPower from "@/assets/insight-fluidpower.jpg";
import insightManufacturing from "@/assets/insight-manufacturing.jpg";
import insightHvac from "@/assets/insight-hvac.jpg";
import insightSales from "@/assets/insight-sales.jpg";
import insightSearch from "@/assets/insight-search.jpg";

type Brand = BrandSlug | "verto";

// Map insight sectors to representative photography.
const SECTOR_IMAGE: Record<string, string> = {
  "Power & Energy": insightPower,
  "EPC": insightEpc,
  "Data Centres": insightDatacentre,
  "Architecture": insightArchitecture,
  "Fluid Power": insightFluidPower,
  "Advanced Manufacturing": insightManufacturing,
  "HVAC": insightHvac,
  "Technical Sales": insightSales,
  "Specialist Recruitment": insightSearch,
};

/* Guideline accents: Edison Energy Green #3CC739 (dark grounds only),
   Vertek Signal Red #F82B60, ModulR Royal Blue #0464FA. */
const BRAND_ACCENT: Record<Brand, string> = {
  "verto": "oklch(0.72 0.105 75)",
  "edison-lux": "#3CC739",
  "vertek": "#F82B60",
  "modulr": "#0464FA",
};

export function InsightThumb({
  brand,
  contentType,
  sector,
  className = "",
  ratio = "16/10",
  large = false,
}: {
  brand: Brand;
  contentType: ContentType;
  sector?: string;
  className?: string;
  ratio?: string;
  large?: boolean;
}) {
  const image = (sector && SECTOR_IMAGE[sector]) ?? insightSearch;
  const accent = BRAND_ACCENT[brand];

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        aspectRatio: ratio === "auto" ? undefined : ratio,
        background: "#0a0a0a",
        color: "white",
      }}
    >
      <img
        src={image}
        alt=""
        loading="lazy"
        width={1280}
        height={800}
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      />
      {/* Bottom-heavy gradient for legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.35) 65%, rgba(0,0,0,0.85) 100%)",
        }}
      />
      {/* Foreground content-type mark */}
      <div className={`relative h-full w-full flex flex-col justify-between ${large ? "p-6" : "p-4"}`}>
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] font-semibold">
          <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: accent }} />
          {contentType}
        </div>
        {sector && (
          <div className="text-[10px] uppercase tracking-[0.24em] font-semibold opacity-90">
            {sector}
          </div>
        )}
      </div>
    </div>
  );
}
