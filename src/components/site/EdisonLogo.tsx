import logoAsset from "@/assets/edison-lux-logo.png";

interface Props {
  variant?: "default" | "light";
  className?: string;
}

/** Edison Lux logo lockup — uses the supplied PNG artwork. */
export function EdisonLogo({ variant = "default", className = "" }: Props) {
  return (
    <img
      src={logoAsset}
      alt="Edison Lux — Power and Energy Talent"
      className={`h-24 md:h-28 w-auto ${className}`}
      style={variant === "light" ? { filter: "brightness(0) invert(1)" } : undefined}
    />
  );
}
