import { createFileRoute, redirect } from "@tanstack/react-router";

/** Legacy alias (kept because file deletion is restricted) — redirects home to the news page. */
export const Route = createFileRoute("/insights-redirect")({
  beforeLoad: () => {
    throw redirect({ to: "/whats-going-on" });
  },
});
