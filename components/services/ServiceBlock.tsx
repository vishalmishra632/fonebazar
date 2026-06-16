"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, Clock } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { EASE_HERO } from "@/lib/animations";
import type { ServiceDetail } from "@/lib/data/services-detail";
import { cn } from "@/lib/utils";

interface ServiceBlockProps {
  service: ServiceDetail;
  productCount: number;
  flipped?: boolean;
}

const textContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const textItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_HERO } },
};

export function ServiceBlock({ service, productCount, flipped = false }: ServiceBlockProps) {
  const headingId = `service-${service.slug}-heading`;

  return (
    <section aria-labelledby={headingId} className="py-20 lg:py-32">
      <Container>
        <div
          className={cn(
            "grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16",
          )}
        >
          <motion.figure
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.8, ease: EASE_HERO }}
            className={cn(
              "relative lg:col-span-6",
              flipped ? "lg:col-start-7 lg:order-2" : "lg:col-start-1",
            )}
          >
            <div className="relative aspect-[5/6] overflow-hidden rounded-2xl bg-surface-1">
              <Image
                src={service.heroImage}
                alt={`${service.name} at work in the fonebazaar studio`}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
                unoptimized
              />
              <span
                aria-hidden
                className="absolute left-5 top-5 rounded-full border border-border/40 bg-background/70 px-3 py-1 font-display text-xs font-medium text-muted-foreground backdrop-blur"
              >
                {service.number}
              </span>
            </div>
          </motion.figure>

          <motion.div
            variants={textContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-120px" }}
            className={cn(
              "flex flex-col gap-6 lg:col-span-5",
              flipped ? "lg:col-start-1 lg:order-1" : "lg:col-start-8",
            )}
          >
            <motion.span
              variants={textItem}
              className="w-fit rounded-full border border-border/60 bg-surface-1 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground"
            >
              {service.name}
            </motion.span>
            <motion.h2
              id={headingId}
              variants={textItem}
              className="font-display text-4xl font-semibold leading-[1.05] tracking-[-0.02em] md:text-5xl lg:text-6xl"
            >
              {service.tagline}
            </motion.h2>
            <motion.p
              variants={textItem}
              className="text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              {service.paragraph}
            </motion.p>

            <motion.dl variants={textItem} className="mt-2">
              {service.capabilities.map((capability) => (
                <motion.div
                  key={capability.label}
                  variants={textItem}
                  className="grid grid-cols-[7rem_1fr] gap-4 border-b border-border/30 py-3"
                >
                  <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                    {capability.label}
                  </dt>
                  <dd className="text-[15px] text-foreground/90">{capability.value}</dd>
                </motion.div>
              ))}
            </motion.dl>

            <motion.ul variants={textItem} className="mt-2 flex flex-wrap gap-2">
              {service.useCases.map((useCase) => (
                <li
                  key={useCase}
                  className="rounded-full bg-surface-2 px-3 py-1 text-xs text-muted-foreground"
                >
                  {useCase}
                </li>
              ))}
            </motion.ul>

            <motion.p
              variants={textItem}
              className="flex items-center gap-2 text-sm text-muted-foreground"
            >
              <Clock className="h-4 w-4 text-brand" />
              Typical lead time:{" "}
              <span className="text-foreground">{service.leadTime}</span>
            </motion.p>

            <motion.div variants={textItem}>
              <Link
                href={`/products/${service.slug}`}
                className="group inline-flex items-center gap-2 rounded-full border border-brand/50 bg-brand/10 px-5 py-2.5 text-sm font-medium text-brand transition hover:border-brand hover:bg-brand/20"
              >
                See the {productCount} {productCount === 1 ? "piece" : "pieces"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </Container>

      <PourDivider />
    </section>
  );
}

function PourDivider() {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, scaleY: 0 }}
      whileInView={{ opacity: 1, scaleY: 1 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.9, ease: EASE_HERO }}
      style={{ transformOrigin: "top" }}
      className="mx-auto mt-16 h-24 w-[2px]"
    >
      <svg
        viewBox="0 0 2 96"
        preserveAspectRatio="none"
        className="h-full w-full text-border"
      >
        <line x1="1" y1="0" x2="1" y2="78" stroke="currentColor" strokeWidth="1" />
        <circle cx="1" cy="88" r="3" className="fill-brand" opacity="0.75" />
      </svg>
    </motion.div>
  );
}
