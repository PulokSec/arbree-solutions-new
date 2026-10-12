import { CheckCircle2 } from "lucide-react";

const TRUST_POINTS = [
  "Trusted Technology Partner",
  "Dedicated Engineering Teams",
  "Proven Enterprise Track Record",
  "Transparent Communication",
  "On-Time Delivery",
  "Long-Term Support",
];

const TRUST_IMAGE = "/images/about/story.jpg";

export function WhyTrustArbree() {
  return (
    <section className="bg-white px-[30px] py-12 sm:py-16 lg:p-[60px]">
      <div className="mx-auto flex max-w-[1320px] flex-col items-center gap-10 lg:flex-row lg:justify-between">
      <div className="flex w-full max-w-[561px] flex-col items-start gap-6">
        <h2 className="text-[28px] font-semibold text-ink sm:text-[48px]">Why Trust Arbree</h2>
        <p className="text-sm leading-7 sm:text-base sm:leading-8 text-body">
          We combine deep technical expertise with a collaborative approach to deliver software
          solutions and dedicated engineering teams that align with your business goals. Our
          commitment to quality, transparent communication, and dependable delivery ensures
          every project is built for long-term success not just launch day.
        </p>
        <div className="flex flex-col items-start gap-4">
          {TRUST_POINTS.map((point) => (
            <div key={point} className="flex items-center gap-3">
              <CheckCircle2 className="size-[21px] shrink-0 text-primary" strokeWidth={1.75} />
              <p className="text-sm leading-7 sm:text-base sm:leading-8 text-ink">{point}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="aspect-[622/456] w-full max-w-[622px] overflow-hidden rounded-[20px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={TRUST_IMAGE}
          alt="Arbree Solutions team at work"
          className="size-full object-cover"
        />
      </div>
      </div>
    </section>
  );
}
