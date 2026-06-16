import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ServiceFilterTabs } from "@/components/products/ServiceFilterTabs";
import { EndOfCatalogCTA } from "@/components/products/EndOfCatalogCTA";
import { getProductsByService } from "@/lib/data/products";
import { siteConfig } from "@/lib/data/site";

interface ServicePageProps {
  params: Promise<{ service: string }>;
}

export async function generateStaticParams() {
  return siteConfig.services.map((service) => ({ service: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { service: slug } = await params;
  const service = siteConfig.services.find((item) => item.slug === slug);
  if (!service) return {};
  return {
    title: `${service.name} — fonebazaar`,
    description: `${service.name} products by fonebazaar in Sault Ste. Marie. ${service.blurb}`,
    alternates: { canonical: `https://fonebazaar.ca/products/${service.slug}` },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { service: slug } = await params;
  const service = siteConfig.services.find((item) => item.slug === slug);
  if (!service) notFound();
  const items = getProductsByService(slug);

  return (
    <>
      <section className="pt-10 lg:pt-12">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-5 text-xs text-muted-foreground">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/products" className="hover:text-foreground">
                  Products
                </Link>
              </li>
              <li aria-hidden>
                <ChevronRight className="h-3 w-3" />
              </li>
              <li className="text-foreground">{service.name}</li>
            </ol>
          </nav>

          <div className="flex flex-col gap-4 pb-10 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-brand">
                Service catalog
              </p>
              <h1 className="mt-3 font-display text-4xl font-semibold tracking-[-0.02em] md:text-5xl lg:text-6xl">
                {service.name}.
              </h1>
              <p className="mt-4 text-base text-muted-foreground md:text-lg">
                {service.blurb}
              </p>
            </div>
            <span className="rounded-full border border-border/60 bg-surface-1 px-4 py-1.5 text-sm text-muted-foreground">
              {items.length} {items.length === 1 ? "product" : "products"}
            </span>
          </div>
        </Container>
      </section>

      <Container>
        <ServiceFilterTabs />
      </Container>

      <Container>
        <section className="mt-10 pb-24">
          <ProductGrid products={items} />
          <EndOfCatalogCTA />
        </section>
      </Container>
    </>
  );
}
