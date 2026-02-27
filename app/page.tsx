import Hero from "@/components/Hero";
import BeforeAfter from "@/components/BeforeAfter";
import StylePreview from "@/components/StylePreviewLanding";
import Testimonials from "@/components/Testimonials";
import PricingSection from "@/components/PricingSection";
import FAQ from "@/components/FAQ";
import EmailCapture from "@/components/EmailCapture";
import RefCapture from "@/components/RefCapture";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Script from "next/script";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: "HeadPic",
      url: "https://headpic.site",
      description:
        "Transform your selfie into studio-quality professional headshots with AI.",
    },
    {
      "@type": "SoftwareApplication",
      name: "HeadPic — AI Headshot Generator",
      applicationCategory: "PhotographyApplication",
      operatingSystem: "Web",
      url: "https://headpic.site",
      description:
        "Transform your selfie into studio-quality professional headshots with AI. Perfect for LinkedIn, resumes, and corporate profiles.",
      offers: [
        {
          "@type": "Offer",
          name: "Starter",
          price: "9.90",
          priceCurrency: "USD",
          description: "5 AI headshots, 2 styles, HD quality",
        },
        {
          "@type": "Offer",
          name: "Pro",
          price: "19.90",
          priceCurrency: "USD",
          description: "10 AI headshots, all 5 styles, HD quality",
        },
        {
          "@type": "Offer",
          name: "Ultimate",
          price: "29.90",
          priceCurrency: "USD",
          description: "20 AI headshots, all 5 styles, 4K quality, priority support",
        },
      ],
      screenshot: "https://headpic.site/og-image.png",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How does AI headshot generation work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Simply upload a clear selfie, choose your preferred styles, and our AI will transform your photo into professional headshots. The AI preserves your facial features while enhancing the overall look with professional lighting, backgrounds, and attire.",
          },
        },
        {
          "@type": "Question",
          name: "How long does it take to generate headshots?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most headshots are generated within 60 seconds. The exact time depends on the number of styles selected and current server load.",
          },
        },
        {
          "@type": "Question",
          name: "What kind of photo should I upload?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Upload a clear, well-lit selfie or portrait photo. Make sure your face is clearly visible, facing the camera. Avoid heavy filters, sunglasses, or group photos. JPG, PNG, and WebP formats are supported up to 10MB.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use these headshots professionally?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolutely! Our AI headshots are designed for professional use — LinkedIn profiles, company websites, resumes, email signatures, and more. You own full rights to the generated images.",
          },
        },
        {
          "@type": "Question",
          name: "What if I'm not satisfied with the results?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can re-generate headshots with different styles at no extra cost within your plan limits. Our AI continuously improves, and most users are thrilled with their results on the first try.",
          },
        },
      ],
    },
  ],
};

export default function Home() {
  return (
    <main>
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <RefCapture />
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
      <Testimonials />
      <PricingSection />
      <FAQ />
      <EmailCapture />

      {/* Final CTA */}
      <section className="bg-primary py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">
            Ready for Your New <span className="text-gold">Headshot</span>?
          </h2>
          <p className="mb-8 text-white/60">
            Get your professional headshot in 60 seconds — no photographer,
            no studio, no hassle.
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
          <div className="mb-2 flex items-center justify-center gap-4">
            <Link href="/privacy" className="hover:text-primary/60 transition-colors">
              Privacy Policy
            </Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-primary/60 transition-colors">
              Terms of Service
            </Link>
            <span>·</span>
            <Link href="/blog" className="hover:text-primary/60 transition-colors">
              Blog
            </Link>
          </div>
          &copy; {new Date().getFullYear()} HeadPic. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
