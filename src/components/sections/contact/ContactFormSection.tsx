"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(1, "Please enter your name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  message: z.string().min(10, "Tell us a little more about the project"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const HERO_IMAGE = "https://www.figma.com/api/mcp/asset/602942b3-bd1f-4f80-83b8-ad2c66e5a857.png";

export function ContactFormSection() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({ resolver: zodResolver(contactSchema) });

  async function onSubmit(values: ContactFormValues) {
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="bg-[#f8f8f8] px-[30px] pb-6 pt-[120px] lg:px-[60px] lg:pt-[140px]">
      <div className="mx-auto flex max-w-[1320px] flex-col overflow-hidden rounded-3xl bg-[#f8f8f8] lg:flex-row">
        <div className="order-last aspect-[598/500] w-full overflow-hidden lg:order-none lg:aspect-auto lg:w-[598px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={HERO_IMAGE}
            alt="Get in touch with Arbree Solutions"
            className="size-full object-cover"
          />
        </div>

        <div className="flex flex-1 items-center px-6 py-12 lg:px-8 lg:py-[60px]">
          <div className="flex w-full max-w-[600px] flex-col items-start gap-12">
            <div className="flex flex-col items-start gap-6">
              <h1 className="text-[36px] font-bold leading-[1.3] text-ink sm:text-[48px] lg:text-[64px]">
                Let&apos;s Turn Your <span className="text-primary">Ideas</span> into{" "}
                <span className="text-primary">Reality</span>
              </h1>
              <p className="text-lg leading-8 text-body">
                Ready to start your next project? We&apos;d love to hear from you. Send us a
                message and we&apos;ll respond as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col items-start gap-8">
              <div className="flex w-full flex-col items-start gap-6">
                <Field label="Name" error={errors.name?.message}>
                  <input
                    {...register("name")}
                    type="text"
                    placeholder="Your name"
                    className="w-full rounded-[58px] border border-[#d5d7da] bg-white px-4 py-3 text-base text-ink shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] outline-none focus:border-primary"
                  />
                </Field>

                <Field label="Email" error={errors.email?.message}>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="you@company.com"
                    className="w-full rounded-[58px] border border-[#d5d7da] bg-white px-4 py-3 text-base text-ink shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] outline-none focus:border-primary"
                  />
                </Field>

                <Field label="Phone number" error={errors.phone?.message}>
                  <input
                    {...register("phone")}
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    className="w-full rounded-[58px] border border-[#d5d7da] bg-white px-4 py-3 text-base text-ink shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] outline-none focus:border-primary"
                  />
                </Field>

                <Field label="How can we help?" error={errors.message?.message}>
                  <textarea
                    {...register("message")}
                    rows={4}
                    placeholder="Tell us a little about the project..."
                    className="w-full resize-none rounded-2xl border border-[#d5d7da] bg-white px-3.5 py-2.5 text-base text-ink shadow-[0px_1px_2px_0px_rgba(10,13,18,0.05)] outline-none focus:border-primary"
                  />
                </Field>
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="flex h-[52px] w-full items-center justify-center gap-1 rounded-[58px] bg-primary text-base font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {status === "submitting" ? "Sending..." : "Send Message"}
                <ArrowRight className="size-6" strokeWidth={1.75} />
              </button>

              {status === "success" && (
                <p className="text-sm font-medium text-primary">
                  Thanks — your message is on its way. We&apos;ll be in touch soon.
                </p>
              )}
              {status === "error" && (
                <p className="text-sm font-medium text-red-500">
                  Something went wrong sending that. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col items-start gap-1.5">
      <label className="text-sm font-medium text-ink">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
