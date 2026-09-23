"use client";

import { useState } from "react";

const CATEGORIES = ["All", "Enterprise", "Web", "Mobile", "E-commerce"];

export function PortfolioFilterTabs() {
  const [active, setActive] = useState("All");

  return (
    <section className="bg-white px-5 pb-8 sm:px-[30px] sm:pb-10 lg:px-[60px]">
      <div className="mx-auto flex w-full max-w-[1320px] justify-center">
        <div className="flex w-full flex-wrap items-center justify-center gap-3 sm:inline-flex sm:w-auto sm:gap-2 sm:rounded-full sm:border sm:border-ink/10 sm:bg-[#f8f8f8] sm:p-2">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActive(category)}
              className={`h-[52px] flex-1 basis-[45%] rounded-full px-5 text-sm font-semibold uppercase transition-colors sm:h-auto sm:flex-none sm:basis-auto sm:py-2.5 sm:text-sm sm:font-medium sm:normal-case ${
                active === category
                  ? "bg-primary text-white"
                  : "bg-white text-ink sm:bg-transparent sm:hover:bg-white"
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
