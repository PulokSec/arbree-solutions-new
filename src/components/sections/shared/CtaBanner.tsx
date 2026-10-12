import { Reveal } from "@/components/ui/Reveal";
import { CtaGlobe } from "./CtaGlobe";
import { ReferralForm } from "./ReferralForm";

export function CtaBanner({
  title = "Spread the Word, Share the Wealth",
  description = "Join our trusted network of partners and earn competitive commissions. Enter your email below to receive your personalized partner tracking link.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="bg-white px-4 py-10 sm:px-[30px] sm:py-16 lg:p-[60px]">
      <Reveal
        className="relative mx-auto flex max-w-[1320px] items-center overflow-hidden rounded-2xl px-6 pb-36 pt-8 sm:rounded-3xl sm:px-[30px] sm:pb-32 sm:pt-12 lg:px-[60px] lg:py-[104px]"
        style={{
          backgroundImage:
            "linear-gradient(148deg, rgb(6, 186, 181) 0%, rgb(24, 57, 83) 102.56%)",
        }}
      >
        <div className="relative z-10 flex w-full max-w-[640px] flex-col items-start gap-8">
          <div className="flex flex-col items-start gap-4 text-white">
            <p className="text-2xl font-semibold leading-tight sm:text-[48px]">{title}</p>
            <p className="text-sm leading-7 sm:text-base sm:leading-8">{description}</p>
          </div>
          <ReferralForm />
        </div>

        {/* Rotating Earth. Desktop (xl): ~1.28× the banner height centred at 87% / 57%, running off
            the right and bottom edges as in the design. Smaller screens: a wide cap of the sphere
            peeking up from the bottom edge, like the mobile design. */}
        <CtaGlobe className="pointer-events-none absolute left-1/2 top-full aspect-square w-[110%] -translate-x-1/2 -translate-y-[30%] xl:left-[87.3%] xl:top-[57%] xl:h-[128%] xl:w-auto xl:-translate-y-1/2" />
      </Reveal>
    </section>
  );
}
