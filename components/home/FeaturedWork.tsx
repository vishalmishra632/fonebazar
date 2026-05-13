"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useRef, type MouseEvent } from "react";
import { Container } from "@/components/shared/Container";
import { FadeIn } from "@/components/animations/FadeIn";
import { RevealOnScroll } from "@/components/motion/RevealOnScroll";
import { featuredWork, type FeaturedWorkItem } from "@/lib/data/images/home";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { EASE_HERO } from "@/lib/animations";
import { cn } from "@/lib/utils";

export function FeaturedWork() {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <FadeIn>
          <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-brand">
                Recent work
              </p>
              <RevealOnScroll
                as="h2"
                variant="layer"
                className="mt-4 font-display text-4xl font-semibold tracking-[-0.02em] md:text-5xl"
              >
                A few things we&apos;ve made lately.
              </RevealOnScroll>
            </div>
            <Link
              href="/products"
              className="group inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-brand"
            >
              See the full catalog
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-4 lg:grid-rows-2">
          {featuredWork.map((item, index) => (
            <FeaturedCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}

interface FeaturedCardProps {
  item: FeaturedWorkItem;
  index: number;
}

function FeaturedCard({ item, index }: FeaturedCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 18 });
  const springY = useSpring(y, { stiffness: 200, damping: 18 });
  const rotateX = useTransform(springY, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-6deg", "6deg"]);

  function handleMove(event: MouseEvent<HTMLAnchorElement>) {
    if (reduced) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  const spanClasses = cn(
    item.cols === 2 && "lg:col-span-2",
    item.cols === 4 && "lg:col-span-4",
    item.rows === 2 && "lg:row-span-2",
  );

  return (
    <motion.a
      ref={ref}
      href="#"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={reduced ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.06,
        ease: EASE_HERO,
      }}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-surface-1",
        "aspect-[4/3] lg:aspect-auto lg:min-h-[240px]",
        item.rows === 2 && "lg:aspect-auto",
        spanClasses,
      )}
    >
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes="(min-width: 1024px) 40vw, (min-width: 768px) 50vw, 100vw"
        className="object-cover transition duration-700 group-hover:scale-[1.04]"
        unoptimized
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6">
        <span className="inline-flex w-fit items-center rounded-full border border-white/20 bg-black/30 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white/90 backdrop-blur">
          {item.service}
        </span>
        <h3 className="font-display text-2xl font-semibold text-white lg:text-3xl">
          {item.title}
        </h3>
      </div>
    </motion.a>
  );
}
