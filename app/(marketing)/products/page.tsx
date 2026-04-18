import type { Metadata } from "next";
import { Container } from "@/components/shared/Container";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ServiceFilterTabs } from "@/components/products/ServiceFilterTabs";
import { FeaturedStrip } from "@/components/products/FeaturedStrip";
import { EndOfCatalogCTA } from "@/components/products/EndOfCatalogCTA";
import { products, getFeaturedProducts } from "@/lib/data/products";

export const metadata: Metadata = {
  title: "Every piece we make",
  description:
    "Browse the full fonebazar catalog — 3D printing, laser engraving, resin art, t-shirt printing, and decals. Ships or picks up from Sault Ste. Marie.",
  alternates: { canonical: "https://fonebazar.ca/products" },
};

export default function ProductsPage() {
  const featured = getFeaturedProducts();

  return (
    <>
      <section className="pt-12 lg:pt-16">
        <Container>
          <div className="flex flex-col gap-4 pb-10 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-brand">
                Catalog
              </p>
              <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.02em] md:text-5xl lg:text-6xl">
                Every piece we make.
              </h1>
              <p className="mt-4 text-base text-muted-foreground md:text-lg">
                Browse by service, or scroll the full catalog. Everything ships or
                picks up from Sault Ste. Marie.
              </p>
            </div>
            <span className="rounded-full border border-border/60 bg-surface-1 px-4 py-1.5 text-sm text-muted-foreground">
              {products.length} products
            </span>
          </div>
        </Container>
      </section>

      <Container>
        <ServiceFilterTabs />
      </Container>

      <Container>
        <FeaturedStrip products={featured} />

        <section className="mt-16 pb-24">
          <h2 className="mb-6 font-display text-2xl font-semibold md:text-3xl">
            Full catalog
          </h2>
          <ProductGrid products={products} />
          <EndOfCatalogCTA />
        </section>
      </Container>
    </>
  );
}
