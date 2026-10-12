"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Safety net: every client-side navigation to a different page starts at the top, even when
 * the browser would otherwise restore or keep the previous scroll offset. Same-page hash links
 * (#services, …) are left to the browser. */
export function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
