"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";

interface SessionInfo {
  planName: string;
  headshots: number;
  sessionId: string;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [info, setInfo] = useState<SessionInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setError("No session ID provided");
      return;
    }

    fetch(`/api/verify-session?session_id=${encodeURIComponent(sessionId)}`)
      .then((res) => {
        if (!res.ok) throw new Error("Verification failed");
        return res.json();
      })
      .then((data) => {
        setInfo(data);
        // Fire confetti
        const duration = 2000;
        const end = Date.now() + duration;
        const frame = () => {
          confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ["#c8a45c", "#1e3a5f", "#d4b574"],
          });
          confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ["#c8a45c", "#1e3a5f", "#d4b574"],
          });
          if (Date.now() < end) requestAnimationFrame(frame);
        };
        frame();
      })
      .catch(() => setError("Could not verify payment. Please contact support."));
  }, [sessionId]);

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 mb-4">{error}</p>
        <Link href="/" className="text-gold underline">
          Go back home
        </Link>
      </div>
    );
  }

  if (!info) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gold border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="text-center py-20 px-4">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
        <CheckCircle className="h-10 w-10 text-emerald-500" />
      </div>

      <h1 className="mb-4 text-4xl font-bold text-primary">
        Payment <span className="text-gold">Successful!</span>
      </h1>

      <div className="mx-auto mb-8 max-w-sm rounded-xl border-2 border-gold/20 bg-gold/5 p-6">
        <div className="mb-2 inline-flex items-center gap-1 rounded-full bg-gold/20 px-3 py-1 text-sm font-semibold text-gold">
          <Sparkles className="h-3 w-3" />
          {info.planName} Plan
        </div>
        <p className="text-3xl font-bold text-primary">{info.headshots}</p>
        <p className="text-primary/60">professional headshots</p>
      </div>

      <Link
        href={`/generate?session_id=${encodeURIComponent(info.sessionId)}`}
        className="inline-flex items-center gap-2 rounded-xl bg-gold px-10 py-4 text-lg font-bold text-primary shadow-lg shadow-gold/20 transition-all hover:bg-gold-light hover:shadow-xl"
      >
        Start Generating Your Headshots
        <ArrowRight className="h-5 w-5" />
      </Link>

      <p className="mt-4 text-sm text-primary/40">
        Your credits are ready to use — no expiration worries for 30 days.
      </p>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-primary/5 to-white">
      <header className="border-b border-primary/10 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-4">
          <Link href="/" className="text-xl font-bold text-primary">
            HeadPic<span className="text-gold">.site</span>
          </Link>
        </div>
      </header>

      <Suspense
        fallback={
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gold border-t-transparent" />
          </div>
        }
      >
        <SuccessContent />
      </Suspense>
    </main>
  );
}
