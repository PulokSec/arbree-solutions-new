"use client";

import { useState } from "react";

const CATEGORIES = ["All", "Enterprise", "Web", "Mobile", "E-commerce"];

export function PortfolioFilterTabs() {
  const [active, setActive] = useState("All");

  return (
    <section className="bg-white px-[30px] pb-10 lg:px-[60px]">
      <div className="mx-auto flex w-full max-w-[1320px] justify-center">
        <div className="inline-flex flex-wrap items-center justify-center gap-2 rounded-full border border-ink/10 bg-[#f8f8f8] p-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
                active === category
                  ? "bg-primary text-white"
                  : "text-ink hover:bg-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
