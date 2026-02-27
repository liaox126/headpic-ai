import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Check, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "HeadPic — Product Hunt Special: 30% Off AI Headshots",
  description:
    "Exclusive Product Hunt deal: Get professional AI headshots at 30% off. Upload a selfie, get studio-quality results in 60 seconds.",
  robots: { index: false, follow: false },
};

export default function ProductHuntLP() {
  return (
    <main className="min-h-screen bg-white">
      {/* PH Deal Banner */}
      <div className="bg-[#ff6154] py-2 text-center text-sm font-semibold text-white">
        🎉 Product Hunt Exclusive — Use code <span className="rounded bg-white/20 px-2 py-0.5 font-mono">PRODUCTHUNT</span> for 30% off any plan!
      </div>

      <header className="border-b border-primary/5">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <span className="text-lg font-bold text-primary">
            HeadPic<span className="text-gold">.site</span>
          </span>
          <div className="flex items-center gap-3">
            <a
              href="https://www.producthunt.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-[#ff6154]/30 px-3 py-1.5 text-xs font-medium text-[#ff6154] transition-colors hover:bg-[#ff6154]/5"
            >
              ↑ Upvote on PH
            </a>
            <Link
              href="/generate"
              className="rounded-lg bg-gold px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-gold-light"
            >
              Try Free →
            </Link>
          </div>
        </div>
      </header>

      <section className="bg-primary py-16">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2 text-sm text-gold">
            <Sparkles className="h-4 w-4" /> Featured on Product Hunt
          </div>

          <h1 className="mb-6 text-3xl font-bold text-white sm:text-5xl">
            Professional Headshots
            <br />
            <span className="text-gold">From Your Selfie</span>
          </h1>

          <p className="mx-auto mb-8 max-w-xl text-lg text-white/60">
            Upload a selfie, choose from 5 professional styles, get your
            studio-quality headshot in 60 seconds. No photographer needed.
          </p>

          {/* Before/After */}
          <div className="mx-auto mb-8 flex max-w-md items-center justify-center gap-4">
            <div className="w-[140px]">
              <div className="mb-1 text-xs text-white/30">Before</div>
              <div className="relative aspect-square overflow-hidden rounded-xl border border-white/10">
                <Image src="/samples/female-before.jpg" alt="Before" fill className="object-cover" sizes="140px" />
              </div>
            </div>
            <div className="text-2xl text-gold">→</div>
            <div className="w-[140px]">
              <div className="mb-1 text-xs text-gold">After</div>
              <div className="relative aspect-square overflow-hidden rounded-xl border border-gold/30">
                <Image src="/samples/female-after.jpg" alt="After" fill className="object-cover" sizes="140px" />
              </div>
            </div>
          </div>

          <Link
            href="/generate"
            className="inline-flex items-center gap-2 rounded-lg bg-gold px-8 py-4 text-lg font-bold text-primary shadow-lg shadow-gold/20 transition-all hover:bg-gold-light hover:shadow-xl"
          >
            Try Free — No Sign Up Required
            <ArrowRight className="h-5 w-5" />
          </Link>

          <div className="mt-4 flex items-center justify-center gap-4 text-sm text-white/40">
            <span className="flex items-center gap-1"><Check className="h-3 w-3 text-gold" /> 1 free headshot</span>
            <span className="flex items-center gap-1"><Check className="h-3 w-3 text-gold" /> No credit card</span>
            <span className="flex items-center gap-1"><Check className="h-3 w-3 text-gold" /> 60s delivery</span>
          </div>
        </div>
      </section>

      {/* PH-specific pricing with discount */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="mb-2 text-center text-2xl font-bold text-primary">
            Product Hunt <span className="text-[#ff6154]">Special Deal</span>
          </h2>
          <p className="mb-8 text-center text-primary/50">
            30% off all plans with code PRODUCTHUNT
          </p>

          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { name: "Starter", price: "$6.93", original: "$9.9", shots: "5 headshots" },
              { name: "Pro", price: "$13.93", original: "$19.9", shots: "10 headshots", popular: true },
              { name: "Ultimate", price: "$20.93", original: "$29.9", shots: "20 headshots" },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-xl border-2 p-6 text-center ${
                  plan.popular ? "border-gold shadow-lg" : "border-primary/10"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#ff6154] px-3 py-0.5 text-xs font-bold text-white">
                    BEST VALUE
                  </div>
                )}
                <p className="font-bold text-primary">{plan.name}</p>
                <p className="mt-2 text-3xl font-bold text-primary">
                  {plan.price}
                </p>
                <p className="text-sm text-primary/30 line-through">{plan.original}</p>
                <p className="mt-1 text-sm text-primary/50">{plan.shots}</p>
                <Link
                  href="/generate"
                  className={`mt-4 block rounded-lg py-2.5 text-sm font-semibold transition-colors ${
                    plan.popular
                      ? "bg-gold text-white hover:bg-gold-light"
                      : "bg-primary/10 text-primary hover:bg-primary/20"
                  }`}
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

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
