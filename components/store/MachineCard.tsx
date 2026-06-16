"use client";

import Image from "next/image";
import { AnimatePresence, motion, useInView } from "motion/react";
import { useRef } from "react";
import { useRotatingText } from "@/hooks/use-rotating-text";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { Machine, MachineStatus } from "@/lib/data/store-content";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<
  MachineStatus,
  { dot: string; label: string }
> = {
  running: { dot: "text-brand", label: "Running" },
  queued: { dot: "text-amber-400", label: "Queued" },
  idle: { dot: "text-emerald-400", label: "Idle" },
};

interface MachineCardProps {
  machine: Machine;
  index: number;
}

export function MachineCard({ machine, index }: MachineCardProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { margin: "-15%" });
  const reduced = useReducedMotion();
  const rotating = useRotatingText({
    messages: machine.statusMessages,
    intervalMs: 3500,
    active: inView && !reduced,
    seed: index,
  });
  const staticMessage = machine.statusMessages[0] ?? STATUS_STYLES[machine.status].label;
  const visibleMessage = reduced ? staticMessage : rotating.value;
  const statusStyle = STATUS_STYLES[machine.status];

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="reg-marks group relative overflow-hidden rounded-2xl border border-border/40 bg-surface-1 transition-colors hover:border-brand/50"
    >
      <span className="reg-mark-bl" aria-hidden />
      <span className="reg-mark-br" aria-hidden />
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={machine.image}
          alt={`${machine.name} in the fonebazaar studio`}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover"
          unoptimized
        />
        <SignalPill
          status={machine.status}
          statusStyle={statusStyle}
          visibleMessage={visibleMessage}
          rotatingIndex={rotating.index}
          reduced={reduced}
        />
      </div>

      <div className="space-y-3 p-5 lg:p-6">
        <span className="inline-flex items-center rounded-full border border-brand/40 bg-brand/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-brand">
          {machine.serviceName}
        </span>
        <div>
          <h3 className="font-display text-xl font-semibold">{machine.name}</h3>
          <p className="mt-0.5 text-xs italic text-muted-foreground/80">
            {machine.brandModel}
          </p>
        </div>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {machine.description}
        </p>
        <ul className="flex flex-wrap gap-2 pt-1">
          {machine.handles.map((item) => (
            <li
              key={item}
              className="rounded-full bg-surface-2 px-2.5 py-1 text-[11px] text-muted-foreground"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

interface SignalPillProps {
  status: MachineStatus;
  statusStyle: { dot: string; label: string };
  visibleMessage: string;
  rotatingIndex: number;
  reduced: boolean;
}

function SignalPill({
  status,
  statusStyle,
  visibleMessage,
  rotatingIndex,
  reduced,
}: SignalPillProps) {
  return (
    <div
      aria-hidden
      className="absolute right-3 top-3 flex items-center gap-2 rounded-full border border-border/40 bg-background/80 px-3 py-1.5 text-xs font-medium backdrop-blur"
    >
      <span
        className={cn(
          "relative inline-flex h-2 w-2 rounded-full",
          statusStyle.dot,
        )}
      >
        <span
          className={cn(
            "absolute inset-0 rounded-full bg-current",
            !reduced && "signal-dot",
          )}
        />
      </span>
      <span className="min-w-0 max-w-[180px] truncate text-muted-foreground">
        <AnimatePresence mode="wait">
          <motion.span
            key={rotatingIndex}
            initial={reduced ? { opacity: 1 } : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 1 } : { opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="block truncate"
          >
            {visibleMessage}
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="sr-only">
        {statusStyle.label}. Currently: {visibleMessage}.
      </span>
      <span className="sr-only">{status}</span>
    </div>
  );
}
