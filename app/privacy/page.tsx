import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — HeadPic",
  description: "HeadPic privacy policy. Learn how we handle your data and photos.",
};

export default function PrivacyPage() {
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
        <h1 className="mb-8 text-3xl font-bold text-primary">Privacy Policy</h1>
        <p className="mb-4 text-sm text-gray-400">Last updated: February 27, 2026</p>

        <div className="space-y-6 text-gray-700 leading-relaxed">
          <section>
            <h2 className="mb-2 text-xl font-semibold text-primary">1. What We Collect</h2>
            <p>When you use HeadPic, we collect:</p>
            <ul className="ml-6 mt-2 list-disc space-y-1">
              <li><strong>Photos you upload</strong> — used solely to generate your headshots</li>
              <li><strong>Payment information</strong> — processed securely by Stripe; we never see or store your card details</li>
              <li><strong>Basic analytics</strong> — page views and usage patterns via Google Analytics (anonymous)</li>
              <li><strong>Email address</strong> — only if you voluntarily subscribe to updates</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-primary">2. How We Use Your Photos</h2>
            <ul className="ml-6 list-disc space-y-1">
              <li>Your photos are sent to our AI processing pipeline to generate headshots</li>
              <li>We do <strong>not</strong> store your original photos after processing is complete</li>
              <li>We do <strong>not</strong> use your photos to train AI models</li>
              <li>Generated headshots are available for download during your session only</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-primary">3. Data Retention</h2>
            <p>
              Uploaded photos are processed in real-time and are not permanently stored on our servers. 
              Generated images are temporarily cached for your session and automatically deleted. 
              Payment records are retained as required by law.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-primary">4. Third-Party Services</h2>
            <p>We use the following third-party services:</p>
            <ul className="ml-6 mt-2 list-disc space-y-1">
              <li><strong>Stripe</strong> — payment processing (<a href="https://stripe.com/privacy" className="text-gold hover:underline" target="_blank" rel="noopener">Stripe Privacy Policy</a>)</li>
              <li><strong>Google Analytics</strong> — anonymous usage analytics</li>
              <li><strong>Vercel</strong> — hosting infrastructure</li>
              <li><strong>Google AI</strong> — image generation processing</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-primary">5. Cookies</h2>
            <p>
              We use essential cookies to maintain your session and analytics cookies (Google Analytics) 
              to understand how visitors use our site. You can disable cookies in your browser settings.
            </p>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-primary">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="ml-6 mt-2 list-disc space-y-1">
              <li>Request deletion of any data we hold about you</li>
              <li>Opt out of marketing emails at any time</li>
              <li>Request information about what data we have collected</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold text-primary">7. Contact</h2>
            <p>
              For any privacy-related questions, contact us at{" "}
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
