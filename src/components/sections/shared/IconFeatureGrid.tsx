import type { LucideIcon } from "lucide-react";

export type IconFeatureItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export function IconFeatureGrid({
  eyebrowLead,
  eyebrowHighlight,
  intro,
  items,
  background = "white",
}: {
  eyebrowLead: string;
  eyebrowHighlight: string;
  intro: string;
  items: IconFeatureItem[];
  background?: "white" | "muted";
}) {
  return (
    <section
      className={`px-[30px] py-16 lg:p-[60px] ${background === "muted" ? "bg-[#f8f8f8]" : "bg-white"}`}
    >
      <div className="mx-auto flex max-w-[1320px] flex-col items-center gap-[60px]">
        <div className="flex flex-col items-center gap-6 text-center">
          <h2 className="text-[40px] font-semibold text-ink sm:text-[48px]">
            {eyebrowLead} <span className="text-primary">{eyebrowHighlight}</span>
          </h2>
          <p className="max-w-[720px] text-lg leading-8 text-body">{intro}</p>
        </div>

        <div className="grid w-full grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-start gap-5 rounded-[20px] border border-ink/15 bg-white px-6 py-8 lg:gap-[30px] lg:px-[30px] lg:py-10"
            >
              <span className="flex items-center justify-center rounded-[20px] bg-primary/10 p-5 text-primary">
                <item.icon className="size-[42px]" strokeWidth={1.5} />
              </span>
              <div className="flex flex-col items-start gap-2.5 lg:gap-4">
                <p className="text-2xl font-medium text-ink sm:text-[28px]">{item.title}</p>
                <p className="text-base leading-6 text-body sm:leading-8">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
