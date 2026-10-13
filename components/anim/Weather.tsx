import type { CSSProperties } from "react";

/** Stable pseudo-random number in [0, 1) for item i, so every render draws the same scene. */
function rand(i: number, n: number): number {
  const x = Math.sin(i * 12.9898 + n * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

const FLAKES = Array.from({ length: 30 }, (_, i) => {
  const r = (n: number) => rand(i, n);
  return {
    left: r(1) * 100,
    size: 2 + r(2) * 4,
    dur: 9 + r(3) * 10,
    delay: -r(4) * 18,
    sway: 10 + r(5) * 30,
    opacity: 0.35 + r(6) * 0.5,
  };
});

/** Slow snowfall for the hero. */
export function Snow() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {FLAKES.map((f, i) => (
        <span
          key={i}
          className="flake"
          style={
            {
              left: `${f.left}%`,
              width: f.size,
              height: f.size,
              opacity: f.opacity,
              "--dur": `${f.dur}s`,
              "--delay": `${f.delay}s`,
              "--sway": `${f.sway}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

/** Two bands of valley fog drifting past each other along the bottom of a section. */
export function Fog() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 overflow-hidden">
      <span className="fog fog--a" />
      <span className="fog fog--b" />
    </div>
  );
}

const FLIES = Array.from({ length: 16 }, (_, i) => {
  const r = (n: number) => rand(i + 100, n);
  return { left: 5 + r(1) * 90, top: 15 + r(2) * 75, dur: 5 + r(3) * 6, delay: -r(4) * 8, x: (r(5) - 0.5) * 80, y: (r(6) - 0.5) * 60 };
});

/** Fireflies over the valley at dusk. */
export function Fireflies() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-[5] overflow-hidden">
      {FLIES.map((f, i) => (
        <span
          key={i}
          className="firefly"
          style={{ left: `${f.left}%`, top: `${f.top}%`, "--dur": `${f.dur}s`, "--delay": `${f.delay}s`, "--x": `${f.x}px`, "--y": `${f.y}px` } as CSSProperties}
        />
      ))}
    </div>
  );
}
