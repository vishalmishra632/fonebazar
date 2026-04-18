"use client";

import { motion } from "motion/react";

const ITEMS = [
  "3D Printing",
  "Laser Engraving",
  "Resin Art",
  "Custom Tees",
  "Precision Decals",
  "Prototypes",
  "Signage",
  "Keychains",
  "Gifting",
  "Events",
  "Local Makers",
  "Custom Orders",
];

export function TrustMarquee() {
  return (
    <section
      aria-label="What we make"
      className="relative border-y border-border/40 py-8 lg:py-12 [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]"
    >
      <div className="group flex overflow-hidden">
        <motion.div
          className="flex shrink-0 items-center gap-10 pr-10"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          <MarqueeRow />
          <MarqueeRow />
        </motion.div>
      </div>
    </section>
  );
}

function MarqueeRow() {
  return (
    <div className="flex shrink-0 items-center gap-10">
      {ITEMS.map((item, index) => {
        const isAccent = index % 3 === 2;
        return (
          <div key={`${item}-${index}`} className="flex shrink-0 items-center gap-10">
            <span
              className={`whitespace-nowrap font-display text-3xl font-medium tracking-tight md:text-4xl lg:text-5xl ${
                isAccent ? "text-brand" : "text-muted-foreground/60"
              }`}
            >
              {item}
            </span>
            <span
              aria-hidden
              className="font-display text-xl text-border md:text-2xl lg:text-3xl"
            >
              ✦
            </span>
          </div>
        );
      })}
    </div>
  );
}
