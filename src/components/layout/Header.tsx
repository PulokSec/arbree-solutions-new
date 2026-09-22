"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { navAssets } from "@/lib/figma-assets";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export function Header({ activePath = "/" }: { activePath?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-4 z-50 mx-auto w-full max-w-[1320px] px-4">
      <div className="flex items-center justify-between rounded-[45px] bg-white/70 p-3 shadow-[0px_16px_48px_0px_rgba(0,0,0,0.08)] backdrop-blur-[10px]">
        <Link href="/" className="flex shrink-0 items-center" onClick={() => setMobileOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={navAssets.logo} alt="Arbree Solutions" className="h-10 w-auto" />
        </Link>

        <nav className="hidden items-center justify-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === activePath;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg py-[10px] text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 ${
                  isActive ? "text-primary" : "text-ink hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/contact"
          className="hidden h-[52px] shrink-0 items-center justify-center gap-1 rounded-[58px] bg-primary px-6 py-[14px] text-base font-medium text-white transition-opacity hover:opacity-90 md:flex"
        >
          Book a Meeting
          <ArrowSmallRightIcon />
        </Link>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
          className="flex size-11 shrink-0 items-center justify-center rounded-full text-ink md:hidden"
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="mt-2 flex flex-col items-stretch gap-1 rounded-3xl bg-white p-4 shadow-[0px_16px_48px_0px_rgba(0,0,0,0.08)] md:hidden">
          {NAV_LINKS.map((link) => {
            const isActive = link.href === activePath;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`rounded-lg px-3 py-3 text-base font-medium transition-colors ${
                  isActive ? "bg-primary-soft text-primary" : "text-ink hover:bg-ink/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/contact"
            onClick={() => setMobileOpen(false)}
            className="mt-2 flex h-[52px] items-center justify-center gap-1 rounded-[58px] bg-primary px-6 text-base font-medium text-white"
          >
            Book a Meeting
            <ArrowSmallRightIcon />
          </Link>
        </div>
      )}
    </header>
  );
}

function ArrowSmallRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3.333 8h9.334M8.667 3.333 13.333 8l-4.666 4.667"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
