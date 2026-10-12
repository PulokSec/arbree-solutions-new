import { RichText } from "@/components/RichText";

const HERO_IMAGE = "/images/about/hero.jpg";

export function AboutHero({
  title,
  subtitle,
  image,
}: {
  title?: string;
  subtitle?: string;
  image?: string;
} = {}) {
  return (
    <section className="bg-white px-[30px] pb-16 pt-[110px] sm:pt-[140px] lg:px-[60px] lg:pb-[60px] lg:pt-[200px]">
      <div className="mx-auto flex max-w-[1154px] flex-col items-center gap-6 text-center">
        <h1 className="text-[28px] font-bold leading-[1.3] text-ink sm:text-[52px] lg:text-[64px]">
          {title ? (
            title
          ) : (
            <>
              Empowering <span className="text-primary">Ideas</span>. Elevating{" "}
              <span className="text-primary">Experiences</span>.
            </>
          )}
        </h1>
        <RichText
          className="max-w-[820px]"
          html={
            subtitle ??
            "At Arbree Solutions, we blend innovation, design, and technology to craft digital products that matter. From strategy to execution, our team is driven by passion and precision committed to turning complex problems into impactful solutions that scale."
          }
        />
      </div>
      <div className="mx-auto mt-10 aspect-[343/320] sm:mt-14 sm:aspect-[1320/554] w-full max-w-[1320px] overflow-hidden rounded-3xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image || HERO_IMAGE}
          alt="The Arbree Solutions team collaborating in a meeting room"
          className="size-full object-cover"
        />
      </div>
    </section>
  );
}
