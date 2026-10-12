"use client";

import { useEffect, useRef } from "react";

const SIZE = 700; // internal canvas resolution (the globe is ~690px across in the design)
const TILT = (28 * Math.PI) / 180; // viewing latitude: Europe up top, Africa through the middle
const START_LON = (7 * Math.PI) / 180; // longitude facing the viewer at first paint
const DEGREES_PER_SECOND = 8; // one full turn every 45s

/**
 * Spinning Earth for the CTA banner: solid white landmasses on a transparent sphere (the
 * banner gradient shows through the oceans), as in the Figma. The map is an orthographic
 * projection of an equirectangular land mask, redrawn every frame with the longitude advancing,
 * so continents roll across the sphere west → east and foreshorten at the limb.
 */
export function CtaGlobe({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const context = ctx;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let visible = true;
    let cancelled = false;

    const img = new Image();
    img.src = "/images/shared/earth-land.png";

    function start() {
      const off = document.createElement("canvas");
      off.width = img.width;
      off.height = img.height;
      const octx = off.getContext("2d");
      if (!octx) return;
      octx.drawImage(img, 0, 0);
      const src = octx.getImageData(0, 0, img.width, img.height).data;
      const mw = img.width;
      const mh = img.height;
      const land = new Uint8Array(mw * mh);
      for (let i = 0; i < land.length; i++) land[i] = src[i * 4];

      // Per-pixel values that don't change while spinning.
      const lon0 = new Float32Array(SIZE * SIZE);
      const rowF = new Float32Array(SIZE * SIZE); // fractional map row
      const inside = new Uint8Array(SIZE * SIZE);
      const sinT = Math.sin(TILT);
      const cosT = Math.cos(TILT);
      for (let py = 0; py < SIZE; py++) {
        for (let px = 0; px < SIZE; px++) {
          const x = ((px + 0.5) / SIZE) * 2 - 1;
          const y = 1 - ((py + 0.5) / SIZE) * 2;
          const r2 = x * x + y * y;
          if (r2 > 1) continue;
          const i = py * SIZE + px;
          const z = Math.sqrt(1 - r2);
          const y2 = y * cosT + z * sinT;
          const z2 = -y * sinT + z * cosT;
          inside[i] = 1;
          lon0[i] = Math.atan2(x, z2);
          rowF[i] = Math.min(mh - 1.001, Math.max(0, (0.5 - Math.asin(y2) / Math.PI) * mh));
        }
      }

      const frame = context.createImageData(SIZE, SIZE);
      const px32 = new Uint32Array(frame.data.buffer);
      const TWO_PI = Math.PI * 2;
      let rotation = START_LON;
      let last = performance.now();
      const WHITE = 0x00ffffff;

      function draw() {
        for (let i = 0; i < px32.length; i++) {
          if (!inside[i]) {
            px32[i] = 0;
            continue;
          }
          let u = (lon0[i] + rotation) / TWO_PI + 0.5;
          u -= Math.floor(u);
          // bilinear sample of the (slightly blurred) land mask…
          const fx = u * mw;
          const x0 = Math.floor(fx) % mw;
          const x1 = (x0 + 1) % mw;
          const tx = fx - Math.floor(fx);
          const y0 = Math.floor(rowF[i]);
          const ty = rowF[i] - y0;
          const a = land[y0 * mw + x0] * (1 - tx) + land[y0 * mw + x1] * tx;
          const b = land[(y0 + 1) * mw + x0] * (1 - tx) + land[(y0 + 1) * mw + x1] * tx;
          const v = (a * (1 - ty) + b * ty) / 255;
          // …then a tight smoothstep around 0.5 gives crisp, anti-aliased coastlines.
          const t = Math.min(1, Math.max(0, (v - 0.4) / 0.2));
          const alpha = t * t * (3 - 2 * t);
          px32[i] = ((Math.round(alpha * 255) << 24) | WHITE) >>> 0;
        }
        context.putImageData(frame, 0, 0);
      }

      function tick(now: number) {
        if (cancelled) return;
        const dt = Math.min(0.1, (now - last) / 1000);
        last = now;
        if (visible) {
          // Earth turns west → east, so the longitude facing us decreases.
          rotation -= (DEGREES_PER_SECOND * Math.PI * dt) / 180;
          draw();
        }
        raf = requestAnimationFrame(tick);
      }

      draw();
      if (!reduceMotion) raf = requestAnimationFrame(tick);
    }

    if (img.complete) start();
    else img.onload = start;

    // Don't burn frames while the banner is off screen.
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    observer.observe(canvas);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} width={SIZE} height={SIZE} aria-hidden className={className} />;
}
