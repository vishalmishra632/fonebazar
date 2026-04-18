"use client";

import { motion } from "motion/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ProductOption } from "@/lib/types/product";
import { cn } from "@/lib/utils";

interface ProductOptionsProps {
  options: ProductOption[];
  values: Record<string, string>;
  onChange: (values: Record<string, string>) => void;
  errors?: string[];
}

export function ProductOptions({ options, values, onChange, errors = [] }: ProductOptionsProps) {
  function update(key: string, value: string) {
    onChange({ ...values, [key]: value });
  }

  return (
    <div className="flex flex-col gap-5">
      {options.map((option) => {
        const hasError = errors.includes(option.key);
        return (
          <motion.div
            key={option.key}
            animate={hasError ? { x: [-4, 4, -4, 4, 0] } : { x: 0 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col gap-2"
          >
            <label
              htmlFor={`option-${option.key}`}
              className="text-sm font-medium text-foreground"
            >
              {option.label}
              {option.required ? (
                <span className="ml-0.5 text-brand" aria-hidden>
                  *
                </span>
              ) : null}
            </label>
            {option.type === "select" && option.values ? (
              <Select
                value={values[option.key] ?? ""}
                onValueChange={(value) => update(option.key, value ?? "")}
              >
                <SelectTrigger
                  id={`option-${option.key}`}
                  className={cn(
                    "h-11 rounded-xl bg-surface-1",
                    hasError && "border-brand",
                  )}
                  aria-invalid={hasError}
                >
                  <SelectValue placeholder={`Choose ${option.label.toLowerCase()}`} />
                </SelectTrigger>
                <SelectContent>
                  {option.values.map((value) => (
                    <SelectItem key={value} value={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <textarea
                id={`option-${option.key}`}
                rows={option.key === "notes" ? 3 : 2}
                value={values[option.key] ?? ""}
                onChange={(event) => update(option.key, event.target.value)}
                placeholder={option.placeholder}
                aria-invalid={hasError}
                className={cn(
                  "w-full resize-none rounded-xl border border-border bg-surface-1 px-3 py-2.5 text-sm leading-relaxed outline-none transition focus:border-brand focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  hasError && "border-brand",
                )}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
