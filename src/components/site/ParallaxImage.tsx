import { useEffect, useRef, useState } from "react";

/**
 * Subtle parallax image — moves at ~0.35x scroll speed.
 * Respects prefers-reduced-motion and disables on touch/coarse pointers.
 */
export function ParallaxImage({
  src,
  alt,
  className = "",
  speed = 0.25,
  scale = 1.18,
  offsetY = 0,
  overlay,
  children,
  style,
  objectPosition = "center center",
}: {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  scale?: number;
  offsetY?: number;
  overlay?: React.ReactNode;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  objectPosition?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;
    setEnabled(true);

    let raf = 0;
    const update = () => {
      raf = 0;
      const el = containerRef.current;
      const img = imgRef.current;
      if (!el || !img) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress from -1 (below screen) to 1 (above screen)
      const progress = (rect.top + rect.height / 2 - vh / 2) / (vh + rect.height / 2);
      const offset = -progress * rect.height * speed + offsetY;
      img.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0) scale(${scale})`;
    };
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [speed, scale, offsetY]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`} style={{ position: className.includes("absolute") ? undefined : "relative", ...style }}>
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
        style={{ objectPosition, transform: enabled ? `translate3d(0,${offsetY}px,0) scale(${scale})` : undefined }}
      />
      {overlay}
      {children}
    </div>
  );
}
