export function HomeHeroFallback() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 flex items-center justify-center text-brand"
    >
      <svg viewBox="0 0 320 320" className="h-full w-full max-h-[520px] max-w-[520px]">
        <defs>
          <radialGradient id="yellow-fallback" cx="45%" cy="40%" r="60%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.25" />
            <stop offset="60%" stopColor="currentColor" stopOpacity="0.85" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="1" />
          </radialGradient>
        </defs>
        <circle cx="160" cy="160" r="96" fill="url(#yellow-fallback)" opacity="0.82" />
        <circle
          cx="200"
          cy="200"
          r="110"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeOpacity="0.45"
        />
        <circle cx="90" cy="80" r="8" fill="currentColor" opacity="0.6" />
        <rect x="232" y="232" width="14" height="14" fill="currentColor" opacity="0.5" />
      </svg>
    </div>
  );
}
