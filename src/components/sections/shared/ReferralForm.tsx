"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";

/** Email field + "Get Referral Link" button used in the CTA banner. */
export function ReferralForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch("/api/referral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const body = await res.json().catch(() => null);
      if (!res.ok) throw new Error(body?.error ?? "Something went wrong. Please try again.");
      setStatus("sent");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate={false} className="flex w-full flex-col gap-3">
      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center">
        <label htmlFor="referral-email" className="sr-only">
          Business email
        </label>
        <input
          id="referral-email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status !== "sending") setStatus("idle");
          }}
          placeholder="Enter Your Business email"
          className="h-12 sm:h-[60px] w-full rounded-[60px] border border-white/60 bg-white px-6 text-sm text-ink outline-none placeholder:text-[#b5b5b5] focus:border-white sm:max-w-[384px] sm:text-base"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="flex h-12 w-full shrink-0 items-center justify-center gap-2 rounded-[60px] border border-primary bg-primary px-8 text-sm font-medium text-white transition-colors hover:opacity-90 disabled:opacity-70 sm:h-[60px] sm:w-auto sm:border-white/70 sm:bg-transparent sm:text-base sm:hover:bg-white/10"
        >
          {status === "sending" && <Loader2 className="size-4 animate-spin" />}
          Get Referral Link
        </button>
      </div>
      <div aria-live="polite" className="min-h-6 text-sm text-white">
        {status === "sent" && (
          <span className="flex items-center gap-1.5">
            <Check className="size-4" /> Thanks! We&apos;ll email your partner tracking link shortly.
          </span>
        )}
        {status === "error" && <span className="text-red-100">{message}</span>}
      </div>
    </form>
  );
}
