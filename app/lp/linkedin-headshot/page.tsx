import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, Clock, DollarSign, Shield, Star, Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Professional LinkedIn Headshot in 60 Seconds — HeadPic",
  description:
    "Get a studio-quality LinkedIn headshot from your selfie. No photographer needed. AI-powered, instant delivery, from $9.90.",
  robots: { index: false, follow: false }, // Don't index landing pages
};

export default function LinkedInHeadshotLP() {
  return (
    <main className="min-h-screen bg-white">
      {/* Minimal header - no navigation to reduce bounce */}
      <header className="border-b border-primary/5 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <span className="text-lg font-bold text-primary">
            HeadPic<span className="text-gold">.site</span>
          </span>
          <Link
            href="/generate"
            className="rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-gold-light"
          >
            Get Started →
          </Link>
        </div>
      </header>

      {/* Hero — direct, benefit-focused */}
      <section className="bg-primary py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-sm text-gold">
                <Zap className="h-3 w-3" /> AI-Powered · Instant Results
              </div>
              <h1 className="mb-6 text-3xl font-bold leading-tight text-white sm:text-4xl">
                Get a Professional
                <br />
                <span className="text-gold">LinkedIn Headshot</span>
                <br />
                in 60 Seconds
              </h1>
              <p className="mb-8 text-lg text-white/60">
                Upload your selfie → Pick a style → Download your studio-quality
                headshot. No photographer, no studio, no waiting.
              </p>

              <Link
                href="/generate"
                className="inline-flex items-center gap-2 rounded-lg bg-gold px-8 py-4 text-lg font-bold text-primary shadow-lg shadow-gold/20 transition-all hover:bg-gold-light hover:shadow-xl"
              >
                Try Free — No Sign Up
                <ArrowRight className="h-5 w-5" />
              </Link>

              <div className="mt-6 flex items-center gap-6 text-sm text-white/40">
                <span className="flex items-center gap-1">
                  <Check className="h-4 w-4 text-gold" /> Free preview
                </span>
                <span className="flex items-center gap-1">
                  <Check className="h-4 w-4 text-gold" /> No account needed
                </span>
              </div>
            </div>

            {/* Before/After visual */}
            <div className="flex items-center justify-center gap-4">
              <div className="w-[160px]">
                <div className="mb-2 text-center text-xs font-semibold uppercase tracking-wider text-white/30">
                  Your Selfie
                </div>
                <div className="relative aspect-square overflow-hidden rounded-2xl border-2 border-dashed border-white/20">
                  <Image
                    src="/samples/male-before.jpg"
                    alt="Casual selfie"
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold text-white">
                  →
                </div>
                <span className="text-xs text-gold">60s</span>
              </div>
              <div className="w-[160px]">
                <div className="mb-2 text-center text-xs font-semibold uppercase tracking-wider text-gold">
                  LinkedIn Ready
                </div>
                <div className="relative aspect-square overflow-hidden rounded-2xl border-2 border-gold/40 shadow-lg shadow-gold/20">
                  <Image
                    src="/samples/male-after.jpg"
                    alt="Professional headshot"
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4">
          <div className="grid gap-8 sm:grid-cols-3">
            <div className="rounded-xl border border-primary/10 p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold/10">
                <DollarSign className="h-6 w-6 text-gold" />
              </div>
              <h3 className="mb-2 font-bold text-primary">Save $200+</h3>
              <p className="text-sm text-primary/50">
                Professional headshots start at $200. Get the same quality from $9.90.
              </p>
            </div>
            <div className="rounded-xl border border-primary/10 p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold/10">
                <Clock className="h-6 w-6 text-gold" />
              </div>
              <h3 className="mb-2 font-bold text-primary">Ready in 60 Seconds</h3>
              <p className="text-sm text-primary/50">
                No booking, no commute, no waiting for edits. Upload and download instantly.
              </p>
            </div>
            <div className="rounded-xl border border-primary/10 p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gold/10">
                <Shield className="h-6 w-6 text-gold" />
              </div>
              <h3 className="mb-2 font-bold text-primary">Your Face, Enhanced</h3>
              <p className="text-sm text-primary/50">
                AI preserves your real features. Only the clothes, background, and lighting change.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="bg-primary/5 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <div className="mb-8 flex items-center justify-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="h-6 w-6 fill-gold text-gold" />
            ))}
          </div>
          <blockquote className="mb-6 text-xl italic text-primary/70">
            &ldquo;I updated my LinkedIn headshot with HeadPic and started getting 3x more
            recruiter messages within a week. The corporate style looks like I spent $300
            at a studio.&rdquo;
          </blockquote>
          <p className="font-semibold text-primary">Sarah M.</p>
          <p className="text-sm text-primary/40">Marketing Director</p>
        </div>
      </section>

      {/* Pricing - simplified, single focus */}
      <section className="py-16">
        <div className="mx-auto max-w-lg px-4 text-center">
          <h2 className="mb-2 text-2xl font-bold text-primary">
            Simple Pricing
          </h2>
          <p className="mb-8 text-primary/50">
            Start free. Upgrade when you&apos;re impressed.
          </p>

          <div className="rounded-2xl border-2 border-gold bg-white p-8 shadow-lg shadow-gold/10">
            <p className="mb-1 text-sm font-semibold text-gold">MOST POPULAR</p>
            <p className="text-4xl font-bold text-primary">
              $19.9
              <span className="ml-2 text-lg text-primary/30 line-through">$39</span>
            </p>
            <p className="mb-6 text-primary/40">one-time · 10 headshots · all 5 styles</p>

            <Link
              href="/generate"
              className="mb-4 block rounded-lg bg-gold py-4 text-center text-lg font-bold text-primary transition-colors hover:bg-gold-light"
            >
              Get Your Headshots Now
            </Link>

            <p className="text-xs text-primary/30">
              Or try 1 free headshot first — no credit card required
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 text-2xl font-bold text-white">
            Your LinkedIn Deserves a Better Photo
          </h2>
          <p className="mb-8 text-white/50">
            Profiles with professional headshots get 14x more views and 36% more messages.
          </p>
          <Link
            href="/generate"
            className="inline-flex items-center gap-2 rounded-lg bg-gold px-8 py-4 text-lg font-bold text-primary transition-all hover:bg-gold-light"
          >
            Try Free Now
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Minimal footer */}
      <footer className="border-t border-primary/10 py-6">
        <div className="mx-auto max-w-5xl px-4 text-center text-xs text-primary/30">
          © {new Date().getFullYear()} HeadPic ·{" "}
          <Link href="/privacy" className="hover:text-primary/50">Privacy</Link> ·{" "}
          <Link href="/terms" className="hover:text-primary/50">Terms</Link>
        </div>
      </footer>
    </main>
  );
}
