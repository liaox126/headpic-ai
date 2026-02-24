import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary py-24 sm:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gold" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gold" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-sm text-gold">
          <Sparkles className="h-4 w-4" />
          AI-Powered Professional Headshots
        </div>

        <h1 className="mb-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          Professional AI Headshots
          <br />
          <span className="text-gold">in 60 Seconds</span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-lg text-white/70">
          Upload a selfie and get studio-quality professional headshots in
          multiple styles. Perfect for LinkedIn, resumes, and corporate
          profiles.
        </p>

        <Link
          href="/generate"
          className="inline-flex items-center gap-2 rounded-lg bg-gold px-8 py-4 text-lg font-semibold text-primary transition-colors hover:bg-gold-light"
        >
          Get Your Headshots
          <ArrowRight className="h-5 w-5" />
        </Link>

        <p className="mt-4 text-sm text-white/50">
          No sign-up required. Try it free.
        </p>
      </div>
    </section>
  );
}
