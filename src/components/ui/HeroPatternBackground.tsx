/**
 * Animated multi-stop gradient wash used behind full-bleed heroes.
 * Gradient + keyframes live in globals.css as `.hero-gradient-bg`.
 */
export function HeroPatternBackground() {
  return (
    <div
      aria-hidden
      className="hero-gradient-bg pointer-events-none absolute inset-0"
    />
  );
}
