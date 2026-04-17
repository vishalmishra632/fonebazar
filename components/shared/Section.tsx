import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  spacing?: "tight" | "default" | "loose";
}

const SPACING = {
  tight: "py-16 md:py-20",
  default: "py-24 md:py-32",
  loose: "py-32 md:py-40",
};

export function Section({
  className,
  children,
  spacing = "default",
  ...props
}: SectionProps) {
  return (
    <section className={cn(SPACING[spacing], className)} {...props}>
      {children}
    </section>
  );
}
