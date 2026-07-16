import edisonAsset from "@/assets/edison-lux-logo.png";

import vertekLightAsset from "@/assets/vertek-logo-light.png";
import modulrAsset from "@/assets/modulr-logo.svg";
import type { BrandSlug } from "@/lib/brands";

const ASSETS: Record<BrandSlug, { url: string; lightUrl?: string; alt: string }> = {
  "edison-lux": { url: edisonAsset, alt: "Edison Lux — Power and Energy Talent" },
  "vertek":     { url: vertekLightAsset, lightUrl: vertekLightAsset, alt: "Vertek" },
  "modulr":     { url: modulrAsset, alt: "Modulr" },
};

interface Props {
  brand: BrandSlug;
  variant?: "default" | "light";
  className?: string;
}

/** Unified sub-brand logo lockup — uses the supplied PNG artwork. */
export function BrandLogo({ brand, variant = "default", className = "" }: Props) {
  const a = ASSETS[brand];
  const sizeClass =
    brand === "edison-lux" ? "h-8 md:h-10" :
    brand === "vertek"     ? "h-6 md:h-7" :
                             "h-8 md:h-10";
  // Prefer a dedicated light artwork when one exists; otherwise invert the default.
  const useLightArt = variant === "light" && a.lightUrl;
  const src = useLightArt ? a.lightUrl! : a.url;
  const needsInvert = variant === "light" && !a.lightUrl;
  return (
    <img
      src={src}
      alt={a.alt}
      className={`${sizeClass} w-auto ${className}`}
      style={needsInvert ? { filter: "brightness(0) invert(1)" } : undefined}
    />
  );
}

