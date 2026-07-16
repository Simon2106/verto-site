import vertoLogoUrl from "@/assets/verto-logo.svg";

interface Props {
  variant?: "default" | "light";
  className?: string;
}

/** Verto brand lockup — gold gradient V mark + wordmark. */
export function VertoLogo({ variant = "default", className = "" }: Props) {
  const needsInvert = variant === "light";
  return (
    <img
      src={vertoLogoUrl}
      alt="Verto Group"
      className={`h-8 md:h-9 w-auto ${className}`}
      style={needsInvert ? { filter: "brightness(0) invert(1)" } : undefined}
    />
  );
}
