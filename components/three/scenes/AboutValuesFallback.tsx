interface AboutValuesFallbackProps {
  number: string;
}

export function AboutValuesFallback({ number }: AboutValuesFallbackProps) {
  return (
    <div aria-hidden className="pointer-events-none flex h-full items-center justify-center">
      <span
        className="font-display text-6xl font-semibold leading-none lg:text-7xl"
        style={{
          WebkitTextStroke: "1.5px oklch(0.92 0.19 103 / 0.7)",
          color: "transparent",
        }}
      >
        {number}
      </span>
    </div>
  );
}
