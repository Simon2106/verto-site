import { useEffect, useRef, useState } from "react";

/**
 * Round 4, item 11 — "What we offer": the client's 14 perks as a
 * notched-corner dark card grid (per Martin's reference; replaces the old
 * four-card "Why Verto" block and the client-logo idea for good).
 * Card chrome lives in styles.css (.offer-card). Mirrors the verto-perks
 * widget in verto-core.
 */
export const OFFER_PERKS: { title: string; sub: string }[] = [
  { title: "Up to 40% commission", sub: "One of the strongest splits in the market — transparent from day one." },
  { title: "Share scheme", sub: "Every person in the business owns a piece of the group." },
  { title: "Two international trips a year", sub: "Barcelona, Prague, Ibiza — hit target and you're on the plane." },
  { title: "Award-winning culture", sub: "The Sunday Times Best Places to Work 2026." },
  { title: "Clear progression", sub: "A published ladder from trainee to principal — no mystery promotions." },
  { title: "Structured L&D", sub: "Training that starts on day one and never really stops." },
  { title: "Winners' lunches", sub: "Hit the number, book the table — on us." },
  { title: "Monthly sales days", sub: "A day of competition, prizes and noise, every month." },
  { title: "Milestone Miles", sub: "Three years in: a week working from any international office." },
  { title: "Wear Your Success", sub: "Billing milestones, marked in Nike — pick your pair." },
  { title: "The 3650 Club", sub: "Ten years in: a Rolex, a designer handbag — or four weeks off." },
  { title: "Referral scheme", sub: "Bring good people with you and get paid for it." },
  { title: "Healthcare cash-back", sub: "Dental, optical, physio — everyday health costs claimed back." },
  { title: "Pension", sub: "Company pension from day one, on top of everything above." },
];

export function OfferGrid() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setVisible(true)),
      { threshold: 0.1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {OFFER_PERKS.map((p, i) => (
        <div
          key={p.title}
          className="offer-card p-6 pr-7"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(18px)",
            transition: `opacity 0.6s ease ${Math.min(i * 60, 780)}ms, transform 0.6s cubic-bezier(0.22,1,0.36,1) ${Math.min(i * 60, 780)}ms, background 0.3s ease`,
          }}
        >
          <h3 className="m-0 font-display text-base font-semibold leading-snug tracking-tight">{p.title}</h3>
          <p className="mt-2 text-[0.8rem] leading-relaxed" style={{ color: "color-mix(in oklab, #F5F3EC 62%, transparent)" }}>
            {p.sub}
          </p>
        </div>
      ))}
    </div>
  );
}
