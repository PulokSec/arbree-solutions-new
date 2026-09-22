"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export type TestimonialData = {
  id: string;
  quote: string;
  authorName: string;
  authorTitle: string;
  authorAvatar: string | null;
  rating: number;
};

const FALLBACK_TESTIMONIALS: TestimonialData[] = [
  {
    id: "1",
    quote: "Arbree helped us at every step of the process setting up our new project.",
    authorName: "Sienna Hewitt",
    authorTitle: "Project Manager, Warpspeed",
    authorAvatar: "https://www.figma.com/api/mcp/asset/efbbb981-af54-45b5-8851-aa4b583db9ab.png",
    rating: 5,
  },
];

const COLLAGE_IMAGE =
  "https://www.figma.com/api/mcp/asset/2302752c-5c81-4242-bf29-44810f5152e3.png";

export function HomeTestimonial({
  testimonials = FALLBACK_TESTIMONIALS,
}: {
  testimonials?: TestimonialData[];
}) {
  const [index, setIndex] = useState(0);
  const current = testimonials[index] ?? testimonials[0];
  const hasMultiple = testimonials.length > 1;

  return (
    <section className="px-[30px] py-16 lg:px-[60px] lg:py-[60px]">
      <Reveal className="mx-auto flex max-w-[1320px] flex-col items-center gap-16 rounded-2xl bg-white p-8 lg:flex-row lg:gap-16 lg:p-[60px]">
        <div className="flex w-full max-w-[628px] flex-col items-start gap-8 lg:gap-12">
          <h2 className="text-[40px] font-semibold text-ink sm:text-[48px]">Testimonial</h2>
          <p className="text-2xl font-medium leading-[1.6] tracking-[-0.02em] text-ink sm:text-[36px]">
            &ldquo;{current.quote}&rdquo;
          </p>
          <div className="flex w-full flex-wrap items-center justify-between gap-6">
            <div className="flex flex-1 items-start gap-4">
              <div className="size-14 shrink-0 overflow-hidden rounded-full border border-black/[0.08] bg-[#e9dcbb]">
                {current.authorAvatar && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={current.authorAvatar}
                    alt={current.authorName}
                    className="size-full object-cover"
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col items-start gap-0.5">
                <p className="text-lg font-semibold text-ink">{current.authorName}</p>
                <p className="text-lg text-body">{current.authorTitle}</p>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`size-5 ${
                        i < current.rating ? "fill-amber-400 text-amber-400" : "text-ink/10"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {hasMultiple && (
              <div className="flex items-center gap-8">
                <button
                  type="button"
                  aria-label="Previous testimonial"
                  onClick={() =>
                    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
                  }
                  className="flex size-14 items-center justify-center rounded-full border border-[#e9eaeb] text-ink transition-colors hover:bg-ink/5"
                >
                  <ArrowLeft className="size-6" strokeWidth={1.75} />
                </button>
                <button
                  type="button"
                  aria-label="Next testimonial"
                  onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
                  className="flex size-14 items-center justify-center rounded-full border border-primary bg-primary text-white transition-opacity hover:opacity-90"
                >
                  <ArrowRight className="size-6" strokeWidth={1.75} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Photo collage */}
        <div className="grid w-full max-w-[628px] grid-cols-3 gap-4">
          {/* eslint-disable @next/next/no-img-element */}
          <img
            src={COLLAGE_IMAGE}
            alt=""
            aria-hidden
            className="col-span-1 aspect-[2/3] w-full rounded-2xl object-cover"
          />
          <img
            src={COLLAGE_IMAGE}
            alt=""
            aria-hidden
            className="col-span-1 row-span-2 mt-8 aspect-[2/3] w-full rounded-2xl object-cover"
          />
          <img
            src={COLLAGE_IMAGE}
            alt=""
            aria-hidden
            className="col-span-1 aspect-[2/3] w-full rounded-2xl object-cover"
          />
          <img
            src={COLLAGE_IMAGE}
            alt=""
            aria-hidden
            className="col-span-1 aspect-square w-full rounded-2xl object-cover"
          />
          <img
            src={COLLAGE_IMAGE}
            alt=""
            aria-hidden
            className="col-span-1 aspect-square w-full rounded-2xl object-cover"
          />
          {/* eslint-enable @next/next/no-img-element */}
        </div>
      </Reveal>
    </section>
  );
}
