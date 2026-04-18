"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface QuantityStepperProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
  size?: "sm" | "md";
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  className,
  size = "md",
}: QuantityStepperProps) {
  const dims = size === "sm" ? "h-8 text-sm" : "h-11 text-base";
  const button =
    size === "sm" ? "h-8 w-8" : "h-11 w-11";

  function handleKey(event: React.KeyboardEvent) {
    if (event.key === "ArrowUp" || event.key === "ArrowRight") {
      event.preventDefault();
      onChange(Math.min(max, value + 1));
    }
    if (event.key === "ArrowDown" || event.key === "ArrowLeft") {
      event.preventDefault();
      onChange(Math.max(min, value - 1));
    }
  }

  return (
    <div
      role="spinbutton"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-label="Quantity"
      tabIndex={0}
      onKeyDown={handleKey}
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-surface-1 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        dims,
        className,
      )}
    >
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        className={cn(
          "inline-flex items-center justify-center rounded-full text-muted-foreground transition hover:text-foreground disabled:opacity-40",
          button,
        )}
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="min-w-8 text-center font-medium tabular-nums">{value}</span>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        className={cn(
          "inline-flex items-center justify-center rounded-full text-muted-foreground transition hover:text-foreground disabled:opacity-40",
          button,
        )}
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
