import { useEffect } from "react";

/**
 * Site-wide scroll/load reveal (LHi-style embellishment).
 *
 * Tags every `main > section` (plus anything opting in with [data-reveal])
 * with a hidden initial state, then fades/slides it up when it enters the
 * viewport. Sections already on screen at load get a small stagger so the
 * page "builds" in. SPA navigations are covered by a MutationObserver —
 * new pages' sections are tagged as they mount. Respects reduced motion.
 *
 * CSS lives in styles.css (.reveal-init / .reveal-in).
 */

const SELECTOR = "main > section, [data-reveal]";

export function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("reveal-in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" },
    );

    const tag = (el: Element, staggerIndex?: number) => {
      if (!(el instanceof HTMLElement) || el.classList.contains("reveal-init")) return;
      el.classList.add("reveal-init");
      // Stagger only the sections visible on first paint — the "page build" feel
      if (staggerIndex !== undefined && staggerIndex >= 0) {
        el.style.setProperty("--reveal-delay", `${Math.min(staggerIndex * 110, 440)}ms`);
      }
      io.observe(el);
    };

    const initialScan = () => {
      const els = Array.from(document.querySelectorAll(SELECTOR));
      let visIdx = 0;
      for (const el of els) {
        const inView = el.getBoundingClientRect().top < window.innerHeight;
        tag(el, inView ? visIdx++ : undefined);
      }
    };
    initialScan();

    // Cover SPA navigations & lazily-mounted content
    const mo = new MutationObserver((muts) => {
      for (const m of muts) {
        m.addedNodes.forEach((n) => {
          if (!(n instanceof Element)) return;
          if (n.matches?.(SELECTOR)) tag(n);
          n.querySelectorAll?.(SELECTOR).forEach((el) => tag(el));
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
