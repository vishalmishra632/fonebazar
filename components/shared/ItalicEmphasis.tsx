import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface EmProps {
  children: ReactNode;
  className?: string;
  tone?: "brand" | "muted";
}

export function Em({ children, className, tone = "brand" }: EmProps) {
  return (
    <em
      className={cn(
        "italic font-medium",
        tone === "brand" && "text-brand",
        tone === "muted" && "text-muted-foreground",
        className,
      )}
    >
      {children}
    </em>
  );
}
