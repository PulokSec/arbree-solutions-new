"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { navAssets } from "@/lib/figma-assets";
import { HeroPatternBackground } from "@/components/ui/HeroPatternBackground";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password.");
      return;
    }

    router.push(searchParams.get("callbackUrl") ?? "/admin");
    router.refresh();
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full max-w-[420px] flex-col items-start gap-6 rounded-3xl bg-white p-8 shadow-[0_10px_30px_rgba(6,186,181,0.08)]"
    >
      <div className="flex w-full flex-col items-center gap-4 text-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={navAssets.logo} alt="Arbree Solutions" className="h-10 w-auto" />
        <div className="flex flex-col items-center gap-1">
          <p className="text-2xl font-semibold text-ink">Arbree Admin</p>
          <p className="text-sm text-body">Sign in to manage site content.</p>
        </div>
      </div>

      <div className="flex w-full flex-col items-start gap-1.5">
        <label className="text-sm font-medium text-ink">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-[#d5d7da] px-4 py-2.5 text-base text-ink outline-none focus:border-primary"
        />
      </div>

      <div className="flex w-full flex-col items-start gap-1.5">
        <label className="text-sm font-medium text-ink">Password</label>
        <div className="relative w-full">
          <input
            type={showPassword ? "text" : "password"}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-[#d5d7da] py-2.5 pl-4 pr-12 text-base text-ink outline-none focus:border-primary"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center justify-center rounded-md p-1 text-body transition-colors hover:text-primary"
          >
            {showPassword ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M3 3l18 18" />
                <path d="M10.6 5.2A9.9 9.9 0 0 1 12 5c6 0 10 7 10 7a18.3 18.3 0 0 1-2.6 3.6M6.6 6.6A18.4 18.4 0 0 0 2 12s4 7 10 7a9.9 9.9 0 0 0 4.3-1" />
                <path d="M9.9 9.9a3 3 0 0 0 4.2 4.2" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7Z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="flex h-12 w-full items-center justify-center rounded-full bg-primary text-base font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {loading ? "Signing in..." : "Sign In"}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6">
      <HeroPatternBackground />
      <div className="relative flex w-full justify-center">
        <Suspense fallback={null}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
