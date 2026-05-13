import { cn } from "@/lib/utils";

interface CADMeasurementOverlayProps {
  /** Dimension label drawn at the top horizontal tick. Defaults to "1:1". */
  width?: string;
  /** Spec-sticker label printed in the bottom-right corner. Optional. */
  label?: string;
  /** Suppress the corner registration crosses. Top tick stays. */
  hideCorners?: boolean;
  className?: string;
}

// Drafting-style overlay for hero photos. Sits absolutely positioned over an
// image; reads as if a designer annotated the photo with dimension marks. All
// strokes brand-coloured at low opacity so the photo underneath stays primary.
//
// Use sparingly — one per visual focal area. Looks bogus if used on every
// image because then it stops feeling intentional.
export function CADMeasurementOverlay({
  width = "1:1",
  label,
  hideCorners = false,
  className,
}: CADMeasurementOverlayProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 font-mono text-[9px] uppercase tracking-[0.2em] text-brand/70",
        className,
      )}
    >
      {/* Top dimension tick — short bracket + centred label */}
      <div className="absolute left-5 right-5 top-4 flex items-center justify-center">
        <span className="absolute left-0 h-2 w-px bg-brand/50" />
        <span className="absolute right-0 h-2 w-px bg-brand/50" />
        <span className="h-px w-full bg-brand/35" />
        <span className="absolute bg-background/85 px-1.5 leading-none">
          {width}
        </span>
      </div>

      {/* Optional spec-sticker label, bottom-right */}
      {label ? (
        <span className="absolute bottom-3 right-4 rounded-sm border border-brand/30 bg-background/70 px-1.5 py-0.5 leading-none">
          {label}
        </span>
      ) : null}

      {/* Corner registration crosses — same vocabulary as the existing
          `.reg-marks` craft DNA, reinforcing the studio-as-precision feel. */}
      {!hideCorners ? (
        <>
          <span className="absolute left-3 top-3 select-none text-brand/40">+</span>
          <span className="absolute right-3 top-3 select-none text-brand/40">
            +
          </span>
          <span className="absolute bottom-3 left-3 select-none text-brand/40">
            +
          </span>
        </>
      ) : null}
    </div>
  );
}
