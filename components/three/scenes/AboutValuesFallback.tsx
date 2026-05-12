interface AboutValuesFallbackProps {
  number: string;
}

export function AboutValuesFallback({ number }: AboutValuesFallbackProps) {
  return (
    <div aria-hidden className="pointer-events-none flex h-full items-center justify-center">
      <span
        className="font-display text-6xl font-semibold leading-none lg:text-7xl"
        style={{
          WebkitTextStroke: "1.5px var(--brand)",
          color: "transparent",
          opacity: 0.7,
        }}
      >
        {number}
      </span>
    </div>
  );
}
