export type ClientLogoItem = {
  id: string;
  name: string;
  logo: string;
  url?: string | null;
};

// Falls back to placeholder wordmarks until real client logos are seeded
// into the ClientLogo table via the admin dashboard.
const FALLBACK_LOGOS: ClientLogoItem[] = [
  { id: "1", name: "Client A", logo: "" },
  { id: "2", name: "Client B", logo: "" },
  { id: "3", name: "Client C", logo: "" },
  { id: "4", name: "Client D", logo: "" },
  { id: "5", name: "Client E", logo: "" },
  { id: "6", name: "Client F", logo: "" },
];

function LogoItem({ client }: { client: ClientLogoItem }) {
  return client.logo ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={client.logo}
      alt={client.name}
      className="h-9 w-auto shrink-0 grayscale opacity-70 transition hover:opacity-100 hover:grayscale-0"
    />
  ) : (
    <span className="shrink-0 whitespace-nowrap text-lg font-semibold tracking-tight text-ink/30">
      {client.name}
    </span>
  );
}

export function TrustedByClients({ logos = FALLBACK_LOGOS }: { logos?: ClientLogoItem[] }) {
  // Duplicate the set once so the marquee can loop seamlessly at -50%.
  const trackLogos = [...logos, ...logos];

  return (
    <div className="mx-auto mt-[52px] flex w-full max-w-[1440px] flex-col overflow-hidden px-[30px] py-8 lg:px-[60px]">
      <div className="flex flex-wrap items-center gap-x-[29px] gap-y-4 sm:flex-nowrap">
        <p className="w-[141px] shrink-0 text-base font-medium text-ink">
          Trusted by industry leaders
        </p>
        <span className="hidden h-12 w-px shrink-0 bg-black/10 sm:block" aria-hidden />
        <div
          className="group relative flex-1 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className="animate-marquee flex w-max items-center gap-[52px] group-hover:[animation-play-state:paused]">
            {trackLogos.map((client, i) => (
              <LogoItem key={`${client.id}-${i}`} client={client} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
