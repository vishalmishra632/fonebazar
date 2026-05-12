export function ServicesAmbientFallback() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden text-brand">
      <svg viewBox="0 0 600 400" className="h-full w-full opacity-30">
        <g fill="none" stroke="currentColor" strokeWidth="1.5">
          <ellipse cx="150" cy="200" rx="80" ry="70" transform="rotate(15 150 200)" />
          <ellipse cx="280" cy="170" rx="110" ry="90" transform="rotate(-20 280 170)" />
          <ellipse cx="420" cy="220" rx="140" ry="110" transform="rotate(8 420 220)" />
          <ellipse cx="510" cy="160" rx="90" ry="70" transform="rotate(-10 510 160)" />
          <ellipse cx="350" cy="280" rx="160" ry="70" transform="rotate(5 350 280)" />
        </g>
      </svg>
    </div>
  );
}
