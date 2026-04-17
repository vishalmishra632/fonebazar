import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const isCentered = align === "center";
  return (
    <div
      className={cn(
        "max-w-2xl",
        isCentered && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-balance text-base text-muted-foreground md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
