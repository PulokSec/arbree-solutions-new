"use client";

import { useState } from "react";

const CATEGORIES = ["All", "UI/UX", "Website", "Mobile Application", "Software"];

export function PortfolioFilterTabs() {
  const [active, setActive] = useState("All");

  return (
    <section className="bg-white px-[30px] pb-10 lg:px-[60px]">
      <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-center gap-3">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            className={`rounded-full border px-6 py-2.5 text-sm font-medium transition-colors ${
              active === category
                ? "border-primary bg-primary text-white"
                : "border-ink/25 text-ink hover:border-primary hover:text-primary"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
}
