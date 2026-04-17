import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CTAButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  external?: boolean;
}

const VARIANTS = {
  primary:
    "bg-foreground text-background hover:brightness-110 border border-transparent",
  secondary:
    "bg-transparent text-foreground border border-border hover:bg-muted",
  ghost: "bg-transparent text-foreground hover:bg-muted border border-transparent",
};

export function CTAButton({
  href,
  children,
  variant = "primary",
  className,
  external,
}: CTAButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition";

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(base, VARIANTS[variant], className)}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cn(base, VARIANTS[variant], className)}>
      {children}
    </Link>
  );
}
