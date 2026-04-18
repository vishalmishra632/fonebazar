import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ChevronRight, Clock, Truck } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductDetailClient } from "@/components/products/ProductDetailClient";
import { RelatedProducts } from "@/components/products/RelatedProducts";
import {
  getProductBySlug,
  getRelatedProducts,
  products,
} from "@/lib/data/products";
import { siteConfig } from "@/lib/data/site";
import { escapeJsonLd } from "@/lib/seo/structured-data";

interface ProductPageProps {
  params: Promise<{ service: string; slug: string }>;
}

export async function generateStaticParams() {
  return products.map((product) => ({
    service: product.service,
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { service, slug } = await params;
  const product = getProductBySlug(service, slug);
  if (!product) return {};
  return {
    title: `${product.name} — fonebazar`,
    description: product.shortDescription,
    openGraph: {
      title: `${product.name} — fonebazar`,
      description: product.shortDescription,
      images: product.images,
      type: "website",
    },
    alternates: {
      canonical: `https://fonebazar.ca/products/${product.service}/${product.slug}`,
    },
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { service, slug } = await params;
  const product = getProductBySlug(service, slug);
  if (!product) notFound();

  const serviceMeta = siteConfig.services.find((item) => item.slug === product.service);
  const related = getRelatedProducts(product);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    image: product.images,
    brand: { "@type": "Brand", name: "fonebazar" },
    ...(product.price !== "quote" && {
      offers: {
        "@type": "Offer",
        priceCurrency: "CAD",
        price: product.price,
        availability: "https://schema.org/InStock",
        url: `https://fonebazar.ca/products/${product.service}/${product.slug}`,
      },
    }),
  };

  return (
    <Container>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: escapeJsonLd(productJsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="pt-10 text-xs text-muted-foreground">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link href="/products" className="hover:text-foreground">
              Products
            </Link>
          </li>
          <li aria-hidden>
            <ChevronRight className="h-3 w-3" />
          </li>
          <li>
            <Link
              href={`/products/${product.service}`}
              className="hover:text-foreground"
            >
              {serviceMeta?.name}
            </Link>
          </li>
          <li aria-hidden>
            <ChevronRight className="h-3 w-3" />
          </li>
          <li className="text-foreground">{product.name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 gap-10 py-10 lg:grid-cols-2 lg:gap-16 lg:py-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <ProductGallery images={product.images} alt={product.name} />
        </div>

        <div className="flex flex-col gap-6">
          <span className="w-fit rounded-full border border-border/60 bg-surface-1 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
            {serviceMeta?.name}
          </span>

          <h1 className="font-display text-4xl font-semibold leading-tight tracking-[-0.02em] md:text-5xl">
            {product.name}
          </h1>

          <div className="flex items-baseline gap-3">
            {product.price === "quote" ? (
              <>
                <span className="rounded-full bg-brand px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-foreground">
                  Quote
                </span>
                {product.priceNote ? (
                  <span className="text-sm text-muted-foreground">
                    {product.priceNote}
                  </span>
                ) : null}
              </>
            ) : (
              <>
                <span
                  className="font-display text-4xl font-semibold tabular-nums"
                  aria-label={`${product.price} Canadian dollars`}
                >
                  ${product.price}
                </span>
                <span className="text-sm text-muted-foreground">CAD</span>
                {product.priceNote ? (
                  <span className="text-sm text-muted-foreground">
                    · {product.priceNote}
                  </span>
                ) : null}
              </>
            )}
          </div>

          <p className="text-lg leading-relaxed text-muted-foreground">
            {product.shortDescription}
          </p>

          <ProductDetailClient product={product} />

          <div className="border-t border-border/40 pt-6">
            <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              {product.description.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {product.whatsIncluded ? (
            <div className="rounded-2xl border border-border/40 bg-surface-1 p-5">
              <h2 className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                What&apos;s included
              </h2>
              <ul className="space-y-2 text-sm">
                {product.whatsIncluded.map((line) => (
                  <li key={line} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="flex flex-col gap-3 rounded-2xl border border-border/40 bg-surface-1 p-5 text-sm">
            <div className="flex items-start gap-3">
              <Truck className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <span className="text-muted-foreground">
                Free local pickup in Sault Ste. Marie. Shipping quoted on WhatsApp.
              </span>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
              <span className="text-muted-foreground">
                Typical turnaround:{" "}
                <span className="text-foreground">{product.leadTime}</span>
              </span>
            </div>
          </div>

          {product.tags.length > 0 ? (
            <ul className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full bg-surface-2 px-3 py-1 text-xs text-muted-foreground"
                >
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <RelatedProducts
        title={`More from ${serviceMeta?.name ?? "the studio"}`}
        products={related}
      />
      <div className="pb-24" />
    </Container>
  );
}
