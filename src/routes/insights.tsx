import { createFileRoute, redirect } from "@tanstack/react-router";

/** Old URL — the group news page moved to /whats-going-on. */
export const Route = createFileRoute("/insights")({
  beforeLoad: () => {
    throw redirect({ to: "/whats-going-on" });
  },
});
