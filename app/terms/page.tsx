import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — HeadPic",
  description: "HeadPic terms of service. Rules and guidelines for using our AI headshot generator.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <Link href="/" className="text-xl font-bold text-primary">
            HeadPic<span className="text-gold">.site</span>
          </Link>
        </div>
      </header>

      <article className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="mb-8 text-3xl font-bold text-primary">Terms of Service</h1>
        <p className="mb-4 text-sm text-gray-400">Last updated: February 27, 2026</p>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="mb-2 text-xl font-semibold text-primary">1. Service Description</h2>
            <p>
              HeadPic is an AI-powered headshot generation service. You upload photos, select a style, 
              and our AI transforms them into professional headshots. The service is provided &quot;as is&quot; 
              without guarantees of specific results.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-primary">2. Acceptable Use</h2>
            <p>You agree to:</p>
            <ul className="ml-6 mt-2 list-disc space-y-1">
              <li>Only upload photos of yourself or photos you have permission to use</li>
              <li>Not use the service to generate deceptive or fraudulent identity documents</li>
              <li>Not upload inappropriate, illegal, or offensive content</li>
              <li>Not attempt to reverse-engineer, abuse, or overload the service</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-primary">3. Ownership & License</h2>
            <ul className="ml-6 list-disc space-y-1">
              <li>You retain ownership of the photos you upload</li>
              <li>You own the generated headshots and may use them for personal and commercial purposes (e.g., LinkedIn, resumes, websites)</li>
              <li>You grant us a temporary license to process your photos solely for the purpose of generating headshots</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-primary">4. Payments & Refunds</h2>
            <ul className="ml-6 list-disc space-y-1">
              <li>All payments are processed securely through Stripe</li>
              <li>Prices are displayed in USD and are charged at the time of purchase</li>
              <li>Due to the nature of digital AI-generated content, all sales are final</li>
              <li>If you experience technical issues preventing generation, contact us for assistance</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-primary">5. Free Preview</h2>
            <p>
              We offer one free preview headshot per user. Free previews include a watermark and 
              are intended to demonstrate the service quality before purchase.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-primary">6. AI-Generated Content</h2>
            <p>
              Our headshots are generated using artificial intelligence. While we strive for accuracy, 
              results may vary. The AI may occasionally produce imperfect results. Generated images 
              should not be used as official identification documents.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-primary">7. Limitation of Liability</h2>
            <p>
              HeadPic is not liable for any indirect, incidental, or consequential damages arising 
              from the use of our service. Our total liability is limited to the amount you paid 
              for the service.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-primary">8. Changes to Terms</h2>
            <p>
              We may update these terms from time to time. Continued use of the service after 
              changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-primary">9. Contact</h2>
            <p>
              Questions about these terms? Contact us at{" "}
              <a href="mailto:support@headpic.site" className="text-gold hover:underline">
                support@headpic.site
              </a>
            </p>
          </section>
        </div>
      </article>

      <footer className="border-t border-gray-100 py-8">
        <div className="mx-auto max-w-4xl px-4 text-center text-sm text-gray-400">
          &copy; {new Date().getFullYear()} HeadPic. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
