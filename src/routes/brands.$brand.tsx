import { createFileRoute, Outlet, notFound } from "@tanstack/react-router";
import { isBrandSlug } from "@/lib/brands";
import { BrandHeader } from "@/components/site/BrandHeader";
import { BrandFooter } from "@/components/site/BrandFooter";

export const Route = createFileRoute("/brands/$brand")({
  beforeLoad: ({ params }) => {
    if (!isBrandSlug(params.brand)) throw notFound();
  },
  component: BrandLayout,
});

function BrandLayout() {
  const { brand } = Route.useParams();
  if (!isBrandSlug(brand)) return null;
  return (
    <div data-brand={brand} className="min-h-screen flex flex-col" style={{ background: "var(--background)", color: "var(--foreground)" }}>
      <BrandHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <BrandFooter brand={brand} />
    </div>
  );
}
