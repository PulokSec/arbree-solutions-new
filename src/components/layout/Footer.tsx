import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { navAssets } from "@/lib/figma-assets";

const COMPANY_LINKS = [
  { label: "About us", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Solution", href: "/services" },
  { label: "Our Process", href: "/services#process" },
  { label: "Blogs", href: "/blog" },
];

const BOTTOM_LINKS = [
  { label: "Contact", href: "/contact" },
  { label: "Privacy policy", href: "/privacy-policy" },
  { label: "Terms of Use", href: "/terms-of-use" },
];

const FOOTER_ILLUSTRATION = "/footer/footer-bg.png";
const FOOTER_TAGLINE = "Working towards a cleaner, greener Bangladesh";
const BASIS_BADGE =
  "/images/footer/basis-badge.png";
const BACCO_BADGE = "/images/footer/bacco-badge.png";

export function Footer() {
  return (
    <footer className="flex flex-col items-center gap-12 bg-[#f8f8f8] px-[30px] py-12 lg:gap-16 lg:px-[60px] lg:py-[50px]">
      <div className="mx-auto flex w-full max-w-[1320px] flex-col items-start gap-12 lg:flex-row lg:justify-between lg:gap-[80px]">
        {/* Brand + contact */}
        <div className="flex w-full max-w-[520px] flex-col items-start gap-8">
          <div className="flex flex-col items-start gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={navAssets.logo} alt="Arbree Solutions" className="h-[52px] w-auto" />
            <p className="text-sm leading-7 sm:text-base sm:leading-8 text-body">
              We&apos;re developing an amazing E-Learning platform that helps educational
              institutes to streamline their operations.
            </p>
          </div>
          <div className="flex flex-col items-start gap-5">
            <a
              href="tel:+8801724645825"
              className="flex items-center gap-1.5 text-base text-body transition-colors hover:text-primary"
            >
              <Phone className="size-6" strokeWidth={1.75} />
              +88-017-2464-5825
            </a>
            <a
              href="mailto:info@arbreesolutions.com"
              className="flex items-center gap-1.5 text-base text-body transition-colors hover:text-primary"
            >
              <Mail className="size-6" strokeWidth={1.75} />
              info@arbreesolutions.com
            </a>
            <p className="flex items-center gap-1.5 text-base text-body">
              <MapPin className="size-6 shrink-0" strokeWidth={1.75} />
              House 1320, Road 13, Avenue 02, Lift 2. Mirpur DOHS, Dhaka 1216
            </p>
          </div>
        </div>

        {/* Company menu */}
        <div className="flex w-full max-w-[257px] flex-col items-start gap-6">
          <p className="text-xl sm:text-2xl font-medium text-ink">Company</p>
          <div className="flex flex-col items-start gap-4">
            {COMPANY_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm leading-7 sm:text-base sm:leading-8 text-body transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Membership badges */}
        <div className="flex w-full max-w-[239px] flex-col items-end gap-3 self-stretch">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={BASIS_BADGE} alt="BASIS Member" className="h-auto w-[227px]" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={BACCO_BADGE} alt="BACCO" className="h-auto w-[227px]" />
        </div>
      </div>

      {/* Decorative illustration strip */}
      <div className="relative h-[160px] w-full max-w-[1442px] overflow-hidden sm:h-[220px] lg:h-[266px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={FOOTER_ILLUSTRATION}
          alt=""
          aria-hidden
          className="absolute left-1/2 h-full w-auto max-w-none -translate-x-1/2"
        />
        <div className="footer-bird" aria-hidden />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/footer/hummingbird.gif" alt="" aria-hidden className="footer-hummingbird" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/footer/bike.png" alt="" aria-hidden className="footer-bike" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/footer/car.png" alt="" aria-hidden className="footer-car" />
        <p
          aria-label={FOOTER_TAGLINE}
          className="absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap text-center text-sm font-bold text-[#047b88] sm:top-8 sm:text-base"
        >
          {FOOTER_TAGLINE.split("").map((char, i) => (
            <span
              key={i}
              aria-hidden
              className="footer-wave-char"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {char === " " ? "\u00a0" : char}
            </span>
          ))}
        </p>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto flex w-full max-w-[1320px] flex-col items-center gap-4 text-sm text-body sm:flex-row sm:justify-between sm:text-base">
        <div className="flex items-center gap-5 whitespace-nowrap text-sm sm:gap-10 sm:text-base">
          {BOTTOM_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-primary">
              {link.label}
            </Link>
          ))}
        </div>
        <p>© {new Date().getFullYear()} Arbree Limited, All Rights Reserved</p>
      </div>
    </footer>
  );
}
