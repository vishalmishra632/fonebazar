"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Container } from "@/components/shared/Container";
import { studioImage, studioLetter, studioSignature } from "@/lib/data/about-content";
import { EASE_HERO } from "@/lib/animations";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_HERO } },
};

export function InsideTheStudio() {
  return (
    <section className="bg-surface-1 py-24 lg:py-40">
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <motion.figure
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: EASE_HERO }}
            className="order-2 lg:order-1 lg:col-span-6"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl ring-1 ring-brand/20 lg:aspect-[4/5]">
              <Image
                src={studioImage}
                alt="The fonebazar studio in Sault Ste. Marie"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
                unoptimized
              />
            </div>
          </motion.figure>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="order-1 flex flex-col gap-5 lg:order-2 lg:col-span-5 lg:col-start-8"
          >
            <motion.p
              variants={item}
              className="text-xs font-medium uppercase tracking-[0.22em] text-brand"
            >
              A note from the studio
            </motion.p>
            {studioLetter.map((paragraph, index) => (
              <motion.p
                key={index}
                variants={item}
                className="text-[15px] leading-relaxed text-foreground/85 md:text-base"
              >
                {paragraph}
              </motion.p>
            ))}
            <motion.p
              variants={item}
              initial={{ opacity: 0, x: -12 }}
              animate={undefined}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.6, ease: EASE_HERO }}
              className="mt-2 font-display text-sm italic text-muted-foreground"
            >
              {studioSignature}
            </motion.p>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
