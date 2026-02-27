import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-primary px-4 text-center">
      <div className="mb-6 text-8xl font-bold text-gold/30">404</div>
      <h1 className="mb-4 text-2xl font-bold text-white">
        Page Not Found
      </h1>
      <p className="mb-8 max-w-md text-white/50">
        The page you&apos;re looking for doesn&apos;t exist. But your perfect
        headshot is just a click away.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="rounded-lg border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
        >
          Go Home
        </Link>
        <Link
          href="/generate"
          className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 text-sm font-semibold text-primary transition-colors hover:bg-gold-light"
        >
          Generate Headshot
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </main>
  );
}
