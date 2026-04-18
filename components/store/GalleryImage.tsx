"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useRef } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { GalleryItem } from "@/lib/data/store-content";
import { cn } from "@/lib/utils";

const ASPECT_CLASS: Record<GalleryItem["aspect"], string> = {
  "4/5": "aspect-[4/5]",
  "3/4": "aspect-[3/4]",
  "1/1": "aspect-square",
  "5/4": "aspect-[5/4]",
  "4/3": "aspect-[4/3]",
};

interface GalleryImageProps {
  item: GalleryItem;
}

export function GalleryImage({ item }: GalleryImageProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <figure
      ref={ref}
      className={cn(
        "group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl bg-surface-2 lg:mb-6",
        ASPECT_CLASS[item.aspect],
      )}
    >
      <motion.div
        initial={reduced ? { opacity: 0 } : {}}
        whileInView={reduced ? { opacity: 1 } : {}}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0"
      >
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
          unoptimized
        />
      </motion.div>

      {reduced ? null : (
        <motion.div
          aria-hidden
          initial={{ y: "0%" }}
          whileInView={{ y: "-100%" }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9, ease: [0.87, 0, 0.13, 1] }}
          className="absolute inset-0 bg-brand/95"
        />
      )}

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/75 via-black/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      />
      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 p-5 font-display text-sm font-medium text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 md:text-base">
        {item.caption}
      </figcaption>
    </figure>
  );
}
