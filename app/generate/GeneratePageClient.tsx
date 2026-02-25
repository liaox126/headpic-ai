"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Sparkles, CreditCard, Zap } from "lucide-react";
import UploadZone from "@/components/UploadZone";
import StylePicker from "@/components/StylePicker";
import ResultGrid from "@/components/ResultGrid";
import { styles } from "@/lib/styles";

interface GenerateResult {
  styleId: string;
  styleName: string;
  imageBase64: string;
}

export default function GeneratePage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const adminKey = searchParams.get("admin");

  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [results, setResults] = useState<GenerateResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [error, setError] = useState<string | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [freeUsed, setFreeUsed] = useState(false);

  const isPaid = !!sessionId || !!adminKey;

  const toggleStyle = (id: string) => {
    if (!isPaid && !freeUsed) {
      // Free users can only select 1 style
      setSelectedStyles([id]);
      return;
    }
    setSelectedStyles((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleGenerate = async () => {
    if (!imageBase64 || selectedStyles.length === 0) return;

    setLoading(true);
    setError(null);
    setResults([]);
    setProgress({ done: 0, total: selectedStyles.length });

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(adminKey ? { "x-admin-key": adminKey } : {}),
        },
        body: JSON.stringify({
          imageBase64,
          styleIds: selectedStyles,
          sessionId: sessionId || undefined,
          adminKey: adminKey || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.code === "FREE_USED" || data.code === "FREE_LIMIT") {
          setFreeUsed(true);
        }
        throw new Error(data.error || `Server error (${res.status})`);
      }

      setResults(data.results);
      setProgress({ done: selectedStyles.length, total: selectedStyles.length });

      if (data.remaining !== undefined && isPaid) {
        setRemaining(data.remaining);
      }

      if (data.isFreePreview) {
        setFreeUsed(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Generation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setImageBase64(null);
    setResults([]);
    setError(null);
  };

  const canGenerate = imageBase64 && selectedStyles.length > 0 && !loading;

  return (
    <main className="min-h-screen bg-gradient-to-b from-primary/5 to-white">
      {/* Header */}
      <header className="border-b border-primary/10 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <Link href="/" className="flex items-center gap-2 text-primary/60 transition-colors hover:text-primary">
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm font-medium">Back</span>
          </Link>
          <Link href="/" className="text-xl font-bold text-primary">
            HeadPic<span className="text-gold">.site</span>
          </Link>
          <div className="w-16">
            {isPaid && remaining !== null && (
              <span className="text-xs font-medium text-primary/50">
                {remaining} left
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Credits banner */}
      {isPaid && remaining !== null && (
        <div className="bg-gold/10 border-b border-gold/20 py-2 text-center text-sm text-primary/70">
          <CreditCard className="inline h-4 w-4 mr-1" />
          You have <strong>{remaining}</strong> headshots remaining
        </div>
      )}

      {!isPaid && !freeUsed && (
        <div className="bg-blue-50 border-b border-blue-100 py-2 text-center text-sm text-blue-700">
          <Zap className="inline h-4 w-4 mr-1" />
          Free preview: generate <strong>1 headshot</strong> in any style.{" "}
          <Link href="/#pricing" className="underline font-medium">
            Upgrade for more →
          </Link>
        </div>
      )}

      {freeUsed && !isPaid && (
        <div className="bg-amber-50 border-b border-amber-100 py-3 text-center text-sm text-amber-800">
          Your free preview has been used.{" "}
          <Link
            href="/#pricing"
            className="inline-flex items-center gap-1 rounded-md bg-gold px-3 py-1 font-semibold text-white hover:bg-gold-light ml-2"
          >
            Get More Headshots →
          </Link>
        </div>
      )}

      <div className="mx-auto max-w-4xl px-4 py-12">
        {/* Results view */}
        {results.length > 0 ? (
          <div>
            <ResultGrid results={results} isFreePreview={!isPaid} />
            <div className="mt-8 flex justify-center gap-4">
              {isPaid && remaining !== null && remaining > 0 && (
                <button
                  onClick={() => {
                    setResults([]);
                    setSelectedStyles([]);
                  }}
                  className="rounded-lg border-2 border-primary/20 px-6 py-3 font-medium text-primary transition-colors hover:border-gold hover:text-gold"
                >
                  Generate More ({remaining} left)
                </button>
              )}
              {(!isPaid || (remaining !== null && remaining === 0)) && (
                <Link
                  href="/#pricing"
                  className="rounded-lg bg-gold px-6 py-3 font-medium text-white transition-colors hover:bg-gold-light"
                >
                  {isPaid ? "Buy More Credits" : "Upgrade for More"}
                </Link>
              )}
            </div>
          </div>
        ) : freeUsed && !isPaid ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-primary mb-4">
              Want more headshots?
            </h2>
            <p className="text-primary/60 mb-8 max-w-md mx-auto">
              Your free preview has been used. Choose a plan to generate
              professional headshots in all 5 styles.
            </p>
            <Link
              href="/#pricing"
              className="inline-flex items-center gap-2 rounded-lg bg-gold px-8 py-4 text-lg font-semibold text-white transition-colors hover:bg-gold-light"
            >
              View Plans
            </Link>
          </div>
        ) : (
          <div className="space-y-10">
            {/* Step 1: Upload */}
            <section>
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-sm font-bold text-white">
                  1
                </span>
                <h2 className="text-xl font-bold text-primary">Upload Your Photo</h2>
              </div>
              <UploadZone
                onImageSelect={setImageBase64}
                preview={imageBase64}
                onClear={handleClear}
              />
            </section>

            {/* Step 2: Choose styles */}
            <section>
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-sm font-bold text-white">
                  2
                </span>
                <h2 className="text-xl font-bold text-primary">
                  Choose Style{!isPaid ? "" : "s"}{" "}
                  {selectedStyles.length > 0 && (
                    <span className="text-sm font-normal text-primary/50">
                      ({selectedStyles.length} selected{!isPaid ? " — 1 max for free preview" : ""})
                    </span>
                  )}
                </h2>
              </div>
              <StylePicker selected={selectedStyles} onToggle={toggleStyle} />
            </section>

            {/* Error */}
            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-center text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Generate button */}
            <div className="text-center">
              <button
                onClick={handleGenerate}
                disabled={!canGenerate}
                className="inline-flex items-center gap-2 rounded-xl bg-gold px-10 py-4 text-lg font-bold text-primary shadow-lg shadow-gold/20 transition-all hover:bg-gold-light hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Generating {progress.done}/{progress.total}...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5" />
                    {isPaid ? "Generate Headshots" : "Generate Free Preview"}
                  </>
                )}
              </button>
              {!imageBase64 && (
                <p className="mt-3 text-sm text-primary/40">Upload a photo to get started</p>
              )}
              {imageBase64 && selectedStyles.length === 0 && (
                <p className="mt-3 text-sm text-primary/40">Select {isPaid ? "at least one style" : "a style"}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
