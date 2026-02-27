"use client";

import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body className="flex min-h-screen items-center justify-center bg-[#1a2332] px-4">
        <div className="text-center">
          <div className="mb-4 text-6xl font-bold text-[#c8a45c]/30">Oops</div>
          <h2 className="mb-4 text-xl font-bold text-white">
            Something went wrong
          </h2>
          <p className="mb-8 text-white/50">
            An unexpected error occurred. Please try again.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => reset()}
              className="rounded-lg border border-white/20 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="rounded-lg bg-[#c8a45c] px-6 py-3 text-sm font-semibold text-[#1a2332] transition-colors hover:bg-[#d4b574]"
            >
              Go Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
