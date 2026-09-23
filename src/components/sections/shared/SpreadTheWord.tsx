"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";

const GLOBE_IMAGE =
  "https://www.figma.com/api/mcp/asset/70da0d70-79d9-4ef6-9778-f73bcacb9d15.png";

export function SpreadTheWord() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "submitted">("idle");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Partner referral request:", email);
    setStatus("submitted");
  }

  return (
    <section className="bg-white px-[30px] py-16 lg:p-[60px]">
      <Reveal
        className="relative mx-auto flex max-w-[1320px] flex-col items-center overflow-hidden rounded-3xl px-6 py-8 lg:flex-row lg:py-[104px] lg:pl-[60px] lg:pr-0"
        style={{
          backgroundImage:
            "linear-gradient(148deg, rgb(6, 186, 181) 0%, rgb(24, 57, 83) 102.56%)",
        }}
      >
        <div className="relative z-10 flex w-full max-w-[588px] flex-col items-center gap-8 text-center lg:items-start lg:text-left">
          <div className="flex flex-col items-center gap-4 text-white lg:items-start">
            <p className="text-[32px] font-semibold leading-tight tracking-[-1px] sm:text-[48px] sm:tracking-[-2px]">
              Spread the Word, Share the Wealth
            </p>
            <p className="text-base leading-8">
              Join our trusted network of partners and earn competitive commissions. Enter your
              email below to receive your personalized partner tracking link.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col items-center gap-4 sm:flex-row sm:items-start"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Your Business email"
              className="h-[60px] w-full flex-1 rounded-[56px] border border-black/25 bg-white px-6 py-4 text-left text-base text-ink shadow-[0px_2px_4px_0px_rgba(12,0,46,0.04)] placeholder:text-ink/50"
            />
            <button
              type="submit"
              className="flex h-[60px] w-full shrink-0 items-center justify-center rounded-[58px] border border-white px-6 text-base font-medium text-white transition-opacity hover:opacity-90 sm:w-auto sm:whitespace-nowrap"
            >
              {status === "submitted" ? "Link Sent!" : "Get Referal Link"}
            </button>
          </form>
        </div>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={GLOBE_IMAGE}
          alt=""
          aria-hidden
          className="pointer-events-none relative z-0 mt-8 h-[220px] w-[220px] shrink-0 object-cover opacity-90 sm:h-[280px] sm:w-[280px] lg:absolute lg:right-0 lg:top-1/2 lg:mt-0 lg:h-[704px] lg:w-[662px] lg:-translate-y-1/2 lg:translate-x-[10%]"
        />
      </Reveal>
    </section>
  );
}
