export function StoreMachinesFallback() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden text-brand">
      <svg viewBox="0 0 800 400" className="h-full w-full opacity-30">
        <g fill="none" stroke="currentColor" strokeWidth="1.5">
          <g transform="translate(90 220)">
            <ellipse rx="40" ry="5" />
            <ellipse cy="-12" rx="32" ry="4" />
            <ellipse cy="-22" rx="24" ry="3" />
          </g>
          <g transform="translate(220 200)">
            <rect x="-4" y="-40" width="8" height="80" />
            <ellipse cy="50" rx="22" ry="5" />
          </g>
          <g transform="translate(360 210)">
            <rect x="-50" y="-4" width="100" height="8" />
            <rect x="-16" y="-16" width="32" height="32" />
          </g>
          <g transform="translate(500 220)">
            <ellipse rx="36" ry="34" />
          </g>
          <g transform="translate(630 200)">
            <rect x="-45" y="-6" width="90" height="12" />
          </g>
          <g transform="translate(740 220)">
            <rect x="-40" y="-10" width="80" height="20" />
          </g>
        </g>
      </svg>
    </div>
  );
}
