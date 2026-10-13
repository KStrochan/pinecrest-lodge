import type { CSSProperties } from "react";
import { Counter } from "./Counter";

/** Contour lines of the ridge that draw themselves, with the lodge's altitude counting up. */
export function Altimeter({ className = "" }: { className?: string }) {
  const contours = [
    "M4 70 C 30 66, 44 30, 70 26 S 112 50, 136 46",
    "M14 70 C 36 64, 50 40, 70 38 S 104 56, 126 54",
    "M26 70 C 44 64, 58 50, 72 50 S 96 62, 114 62",
  ];
  return (
    <div className={`grid gap-2 border border-[var(--fg)]/40 bg-[var(--bg)]/50 p-4 backdrop-blur-sm ${className}`}>
      <svg viewBox="0 0 140 76" className="h-auto w-36" aria-hidden="true">
        {contours.map((d, i) => (
          <path key={d} d={d} pathLength={1} className="draw-in" style={{ "--d": `${1 + i * 0.35}s` } as CSSProperties} fill="none" stroke="#E8DCC4" strokeWidth="1.2" />
        ))}
        <circle cx="70" cy="26" r="3" fill="#E8DCC4" className="fade-in-late" style={{ "--d": "2.4s" } as CSSProperties} />
      </svg>
      <p className="font-display text-3xl leading-none">
        <Counter value={1200} suffix=" m" duration={2200} />
      </p>
      <p className="text-sm text-muted">above sea level</p>
    </div>
  );
}
