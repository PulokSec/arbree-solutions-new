import type { LucideIcon } from "lucide-react";

export type TechHighlight = { title: string; description: string; icon: LucideIcon };

export function TechStackHighlights({
  title,
  description,
  highlights,
}: {
  title: string;
  description: string;
  highlights: TechHighlight[];
}) {
  return (
    <section className="bg-[#f8f8f8] px-[30px] py-16 lg:p-[60px]">
      <div className="mx-auto flex max-w-[1320px] flex-col items-center gap-14">
        <div className="flex flex-col items-center gap-4 text-center">
          <h2 className="text-[40px] font-semibold text-ink sm:text-[48px]">{title}</h2>
          <p className="max-w-[764px] text-base leading-8 text-body">{description}</p>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-5 rounded-2xl bg-white p-8 shadow-[0_10px_30px_rgba(6,186,181,0.05)]"
            >
              <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <item.icon className="size-8" strokeWidth={1.5} />
              </span>
              <div className="flex flex-col items-start gap-1">
                <p className="text-xl font-medium text-ink">{item.title}</p>
                <p className="text-base text-body">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
