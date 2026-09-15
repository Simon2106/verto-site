/* Round 6, item 3: centred play badge for post-card media whose story embeds
   a video, so the card reads as video before the click. Mirrors the WP
   .verto-post-card__play treatment (circle, blur backdrop, accent triangle).
   Place inside a `relative` (ideally `group`) media wrapper. */
export function PlayBadge({ large = false }: { large?: boolean }) {
  const size = large ? "4.5rem" : "3.5rem";
  return (
    <span
      aria-hidden="true"
      className="absolute top-1/2 left-1/2 z-10 flex items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110"
      style={{
        width: size,
        height: size,
        translate: "-50% -50%",
        background: "color-mix(in oklab, var(--ink) 55%, transparent)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)",
        border: "1px solid rgba(255, 255, 255, 0.35)",
      }}
    >
      <span
        style={{
          display: "block",
          marginLeft: large ? 5 : 4,
          borderStyle: "solid",
          borderWidth: large ? "11px 0 11px 19px" : "9px 0 9px 15px",
          borderColor: "transparent transparent transparent var(--accent)",
        }}
      />
    </span>
  );
}
