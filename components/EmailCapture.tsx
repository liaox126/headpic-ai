"use client";

import { useState } from "react";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to subscribe");
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-primary py-20">
      <div className="mx-auto max-w-xl px-4 text-center">
        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-full bg-gold/20">
          <Mail className="h-6 w-6 text-gold" />
        </div>

        {success ? (
          <>
            <div className="mb-4 inline-flex items-center gap-2 text-emerald-400">
              <CheckCircle className="h-6 w-6" />
              <span className="text-lg font-semibold">You&apos;re in!</span>
            </div>
            <p className="mb-6 text-white/60">
              Check your inbox! (Just kidding — click below to try it now)
            </p>
            <Link
              href="/generate"
              className="inline-flex items-center gap-2 rounded-lg bg-gold px-8 py-4 text-lg font-semibold text-primary transition-colors hover:bg-gold-light"
            >
              Try Your Free Headshot
              <ArrowRight className="h-5 w-5" />
            </Link>
          </>
        ) : (
          <>
            <h2 className="mb-3 text-3xl font-bold text-white">
              Get Your Free <span className="text-gold">Headshot</span>
            </h2>
            <p className="mb-8 text-white/50">
              Enter your email and try one professional headshot — completely
              free.
            </p>

            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/30 outline-none transition-colors focus:border-gold/50 focus:ring-1 focus:ring-gold/50"
              />
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 font-semibold text-primary transition-colors hover:bg-gold-light disabled:opacity-60"
              >
                {loading ? "..." : "Get Free Headshot"}
              </button>
            </form>

            {error && (
              <p className="mt-3 text-sm text-red-400">{error}</p>
            )}

            <p className="mt-4 text-xs text-white/30">
              No spam, ever. We just want to keep you updated.
            </p>
          </>
        )}
      </div>
    </section>
  );
}
