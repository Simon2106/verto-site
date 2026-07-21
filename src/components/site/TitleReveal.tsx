import { createElement, useEffect, useRef, useState, type ReactNode } from "react";

/**
 * LHi-style headline reveal — each line rises out of an overflow mask,
 * staggered, when the title enters the viewport.
 *
 * Usage:
 *   <TitleReveal as="h1" className="display-2" lines={["Precision talent.", "One group."]} />
 *
 * CSS lives in styles.css (.title-reveal / .line-mask / .line-inner).
 * Falls back gracefully: SSR markup keeps layout (masks preserve height),
 * reduced-motion users see the text immediately.
 */
export function TitleReveal({
  lines,
  as = "h2",
  className = "",
}: {
  lines: ReactNode[];
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const ref = useRef<HTMLHeadingElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setInView(true)),
      { threshold: 0.3 },
    );
    io.observe(el);
    // Failsafe — never leave a headline hidden
    const t = window.setTimeout(() => setInView(true), 2500);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, []);

  return createElement(
    as,
    { ref, className: `title-reveal ${inView ? "title-reveal--in" : ""} ${className}` },
    lines.map((line, i) => (
      <span key={i} className="line-mask">
        <span className="line-inner" style={{ transitionDelay: `${i * 110}ms` }}>
          {line}
        </span>
      </span>
    )),
  );
}
