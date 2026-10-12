import { RichText } from "@/components/RichText";

const STORY_IMAGE = "/images/about/story.jpg";

export type AboutStat = { value: string; label: string };

const DEFAULT_STATS: AboutStat[] = [
  { value: "50+", label: "Projects Completed" },
  { value: "25+", label: "Happy Clients" },
  { value: "6+", label: "Years Experience" },
];

const DEFAULT_PARAGRAPHS = [
  "We are a young, dynamic team coming from a wide variety of backgrounds. Specialising in web development, software development, testing and design and providing you with a whole host of other services.",
  "We use our digital knowledge to help you achieve your business goals and grow your business. Whether you are looking to create a product from scratch or get your branding done, Arbree Solutions will find a way to help you!",
];

export function AboutStory({
  paragraphs = DEFAULT_PARAGRAPHS,
  stats = DEFAULT_STATS,
  image,
}: {
  paragraphs?: string[];
  stats?: AboutStat[];
  image?: string;
} = {}) {
  return (
    <section className="bg-[#f8f8f8] px-[30px] py-12 sm:py-16 lg:p-[60px]">
      <div className="mx-auto flex max-w-[1320px] flex-col items-center gap-10 lg:flex-row lg:justify-between">
      <div className="flex w-full max-w-[561px] flex-col items-start gap-3">
        <h2 className="text-[28px] font-semibold text-ink sm:text-[48px]">
          Our <span className="text-primary">Story</span>
        </h2>
        {paragraphs.map((p, i) => (
          <RichText key={i} html={p} />
        ))}
        <div className="mt-3 flex flex-col items-start gap-6 sm:flex-row sm:gap-10 lg:gap-16">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-start gap-1.5">
              <p className="text-3xl font-medium text-primary">{stat.value}</p>
              <p className="text-base font-medium text-ink">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="aspect-[622/456] w-full max-w-[622px] overflow-hidden rounded-[20px]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={image || STORY_IMAGE}
          alt="The Arbree Solutions team in conversation"
          className="size-full object-cover"
        />
      </div>
      </div>
    </section>
  );
}
