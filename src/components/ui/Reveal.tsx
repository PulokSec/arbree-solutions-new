"use client";

import { useInView } from "@/hooks/useInView";

export function Reveal({
  children,
  className,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? "reveal-visible" : ""} ${className ?? ""}`}
      style={{ ...style, ...(inView ? { animationDelay: `${delay}ms` } : {}) }}
    >
      {children}
    </div>
  );
}
