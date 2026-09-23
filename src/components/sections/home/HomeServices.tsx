import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export type ServiceBlockData = {
  id: string;
  title: string;
  description: string;
  coverImage: string | null;
  tags: { id: string; label: string }[];
};

const FALLBACK_SERVICES: ServiceBlockData[] = [
  {
    id: "tech-solution",
    title: "Tech Solution",
    description:
      "Build scalable digital products tailored to your business from MVPs and custom software to enterprise platforms, designed for performance, growth, and long-term success.",
    coverImage: "https://www.figma.com/api/mcp/asset/ee0e007c-1be7-4a1c-9d72-d4ce8ded1964.png",
    tags: [
      { id: "1", label: "Software Developer" },
      { id: "2", label: "Marketing" },
      { id: "3", label: "UI/UX Design" },
      { id: "4", label: "MVP Development" },
      { id: "5", label: "Mobile Apps" },
      { id: "6", label: "Digital Consultancy" },
    ],
  },
  {
    id: "team-augmentation",
    title: "Team Augmentation",
    description:
      "Scale your team with per-vetted engineers, designers, and technology specialists who seamlessly integrate into your workflow and accelerate project delivery.",
    coverImage: "https://www.figma.com/api/mcp/asset/0efc9b9b-042b-45d5-9553-7871ec15f220.png",
    tags: [
      { id: "1", label: "Project & Business Experts" },
      { id: "2", label: "DevOps Engineers" },
      { id: "3", label: "MVP Development" },
      { id: "4", label: "Mobile Apps" },
      { id: "5", label: "Digital Consultancy" },
    ],
  },
];

export function HomeServices({ services = FALLBACK_SERVICES }: { services?: ServiceBlockData[] }) {
  const [techSolution, teamAugmentation] = services;

  return (
    <section id="services" className="bg-white px-[30px] py-16 lg:px-[60px] lg:py-[120px]">
      <div className="mx-auto flex max-w-[1320px] flex-col gap-16 lg:gap-[120px]">
        {/* Heading + intro row */}
        <Reveal className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:gap-0">
          <div className="flex flex-col items-start gap-[22px]">
            <p className="text-2xl font-medium text-ink">
              Two Ways We Help You Build &amp; Scale
            </p>
            <p className="text-[40px] font-semibold leading-none sm:text-[48px]">
              Our <span className="text-primary">Services</span>
            </p>
          </div>
          <div className="flex max-w-[629px] flex-col items-start gap-3">
            <p className="text-lg leading-8 text-body">
              Whether you need a complete software solution built from scratch or skilled
              professionals to extend your team, we&apos;ve got you covered.
            </p>
            <Link
              href="/services"
              className="flex h-[52px] items-center justify-center gap-1 rounded-[58px] bg-primary px-6 text-base font-medium text-white transition-opacity hover:opacity-90"
            >
              See All Services
            </Link>
          </div>
        </Reveal>

        {techSolution && (
          <Reveal>
            <ServiceRow service={techSolution} />
          </Reveal>
        )}
        {teamAugmentation && (
          <Reveal>
            <ServiceRow service={teamAugmentation} reverse />
          </Reveal>
        )}
      </div>
    </section>
  );
}

function ServiceRow({ service, reverse }: { service: ServiceBlockData; reverse?: boolean }) {
  return (
    <div
      className={`flex flex-col items-center gap-8 lg:gap-[76px] ${
        reverse ? "lg:flex-row" : "lg:flex-row-reverse"
      }`}
    >
      <div className="flex w-full max-w-[629px] flex-col items-start gap-[30px]">
        <div className="flex flex-col items-start gap-[14px]">
          <p className="text-[40px] font-semibold text-ink sm:text-[48px]">{service.title}</p>
          <p className="text-lg leading-8 text-body">{service.description}</p>
        </div>
        <div className="flex flex-wrap items-center gap-[10px]">
          {service.tags.map((tag) => (
            <span
              key={tag.id}
              className="flex items-center gap-3 rounded-[100px] border border-primary py-[6px] pl-[6px] pr-6 text-sm text-primary"
            >
              <CheckCircle2 className="size-[21px]" strokeWidth={1.5} />
              {tag.label}
            </span>
          ))}
        </div>
      </div>

      <div className="aspect-[622/456] w-full max-w-[622px] shrink-0 overflow-hidden rounded-[20px] bg-primary-soft">
        {service.coverImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={service.coverImage}
            alt={service.title}
            className="size-full object-cover"
          />
        ) : (
          <div className="flex size-full items-center justify-center text-sm text-primary/60">
            Add a cover image via the admin dashboard
          </div>
        )}
      </div>
    </div>
  );
}
