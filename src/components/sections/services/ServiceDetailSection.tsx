import { CheckCircle2 } from "lucide-react";
import { slugify } from "@/lib/slugify";

export type ServiceDetailData = {
  title: string;
  description: string;
  image: string;
  benefits?: string[];
  gallery?: string[];
};

export function ServiceDetailSection({
  data,
  reverse = false,
  background = "white",
}: {
  data: ServiceDetailData;
  reverse?: boolean;
  background?: "white" | "muted";
}) {
  const benefitBg = background === "muted" ? "bg-white" : "bg-[#f8f8f8]";

  return (
    <section
      id={slugify(data.title)}
      className={`scroll-mt-28 px-[30px] py-16 lg:p-[60px] ${background === "muted" ? "bg-[#f8f8f8]" : "bg-white"}`}
    >
      <div className="mx-auto flex max-w-[1320px] flex-col gap-14">
        <div
          className={`flex flex-col items-center gap-10 lg:flex-row lg:items-start lg:gap-[60px] ${
            reverse ? "lg:flex-row-reverse" : ""
          }`}
        >
          <div className="aspect-[622/456] w-full max-w-[622px] shrink-0 overflow-hidden rounded-[20px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.image} alt={data.title} className="size-full object-cover" />
          </div>

          <div className="flex w-full max-w-[622px] flex-col items-start gap-8">
            <div className="flex flex-col items-start gap-3">
              <p className="text-[40px] font-semibold text-ink sm:text-[48px]">{data.title}</p>
              <p className="text-base leading-8 text-body">{data.description}</p>
            </div>
            <div className="flex w-full flex-col items-start gap-3">
              {(data.benefits ?? []).map((benefit) => (
                <div
                  key={benefit}
                  className={`flex w-full items-center gap-2 rounded-bl rounded-br-xl rounded-tl rounded-tr-xl border-l-[3px] border-primary p-3 ${benefitBg}`}
                >
                  <CheckCircle2 className="size-6 shrink-0 text-primary" strokeWidth={1.5} />
                  <p className="text-base font-medium text-ink">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {data.gallery && data.gallery.length > 0 && (
          <div className="grid w-full grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-4">
            {data.gallery.map((image, i) => (
              <div
                key={i}
                className="aspect-[420/360] w-full overflow-hidden rounded-[20px] border border-[#f8f8f8] shadow-[0_10px_30px_rgba(6,186,181,0.05)]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={image} alt="" aria-hidden className="size-full object-cover" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
