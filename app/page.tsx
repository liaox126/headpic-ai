import Hero from "@/components/Hero";
import BeforeAfter from "@/components/BeforeAfter";
import StylePreview from "@/components/StylePreviewLanding";
import PricingSection from "@/components/PricingSection";
import FAQ from "@/components/FAQ";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main>
      {/* Header */}
      <header className="absolute top-0 z-10 w-full">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-xl font-bold text-white">
            HeadPic<span className="text-gold">.site</span>
          </Link>
          <Link
            href="/generate"
            className="rounded-lg bg-gold/20 px-4 py-2 text-sm font-medium text-gold transition-colors hover:bg-gold/30"
          >
            Try Free
          </Link>
        </div>
      </header>

      <Hero />
      <BeforeAfter />
      <StylePreview />
      <PricingSection />
      <FAQ />

      {/* Final CTA */}
      <section className="bg-primary py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Ready for Your New <span className="text-gold">Headshot</span>?
          </h2>
          <p className="mb-8 text-white/60">
            Get a polished, professional headshot in under 60 seconds —
            no photographer, no studio, no hassle.
          </p>
          <Link
            href="/generate"
            className="inline-flex items-center gap-2 rounded-lg bg-gold px-8 py-4 text-lg font-semibold text-primary transition-colors hover:bg-gold-light"
          >
            Generate Now — It&apos;s Free
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-primary/10 bg-white py-8">
        <div className="mx-auto max-w-6xl px-4 text-center text-sm text-primary/40">
          &copy; {new Date().getFullYear()} HeadPic. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
