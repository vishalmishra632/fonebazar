"use client";

import { MessageCircle } from "lucide-react";
import { useMemo, useState } from "react";
import { AddToCartButton } from "./AddToCartButton";
import { ProductOptions } from "./ProductOptions";
import { QuantityStepper } from "./QuantityStepper";
import type { Product } from "@/lib/types/product";
import { siteConfig } from "@/lib/data/site";
import { buildWhatsAppOrderURL } from "@/lib/whatsapp";
import { buildCartItemId } from "@/lib/cart-store";

interface ProductDetailClientProps {
  product: Product;
}

function deriveDefaults(product: Product): Record<string, string> {
  const defaults: Record<string, string> = {};
  product.options?.forEach((option) => {
    if (option.type === "select" && option.default) {
      defaults[option.key] = option.default;
    }
  });
  return defaults;
}

export function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(
    () => deriveDefaults(product),
  );
  const [qty, setQty] = useState(1);
  const [errorKeys, setErrorKeys] = useState<string[]>([]);

  const serviceName = useMemo(
    () =>
      siteConfig.services.find((service) => service.slug === product.service)?.name ??
      "",
    [product.service],
  );

  const directOrderHref = useMemo(() => {
    const filteredOptions = Object.fromEntries(
      Object.entries(selectedOptions).filter(([, value]) => value?.trim()),
    );
    const { notes, ...rest } = filteredOptions;
    return buildWhatsAppOrderURL([
      {
        id: buildCartItemId(product.id, filteredOptions),
        productId: product.id,
        slug: product.slug,
        name: product.name,
        service: product.service,
        serviceName,
        price: product.price,
        image: product.images[0],
        qty,
        options: Object.keys(rest).length > 0 ? rest : undefined,
        notes:
          typeof notes === "string" && notes.trim().length > 0 ? notes : undefined,
      },
    ]);
  }, [product, qty, selectedOptions, serviceName]);

  return (
    <div className="flex flex-col gap-6">
      {product.options && product.options.length > 0 ? (
        <ProductOptions
          options={product.options}
          values={selectedOptions}
          onChange={(values) => {
            setSelectedOptions(values);
            setErrorKeys([]);
          }}
          errors={errorKeys}
        />
      ) : null}

      <div className="flex items-center gap-4">
        <span className="text-sm font-medium text-foreground">Quantity</span>
        <QuantityStepper value={qty} onChange={setQty} />
      </div>

      <div className="flex flex-col gap-3">
        <AddToCartButton
          product={product}
          selectedOptions={selectedOptions}
          qty={qty}
          onValidationError={setErrorKeys}
        />
        <a
          href={directOrderHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border border-border text-sm font-medium text-foreground transition hover:border-brand hover:text-brand focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <MessageCircle className="h-4 w-4" />
          Order this on WhatsApp
        </a>
      </div>
    </div>
  );
}
