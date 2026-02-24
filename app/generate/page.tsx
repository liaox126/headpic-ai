"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, Sparkles } from "lucide-react";
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
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [results, setResults] = useState<GenerateResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [error, setError] = useState<string | null>(null);

  const toggleStyle = (id: string) => {
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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          imageBase64,
          styleIds: selectedStyles,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Server error (${res.status})`);
      }

      const data = await res.json();
      setResults(data.results);
      setProgress({ done: selectedStyles.length, total: selectedStyles.length });
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
          <div className="w-16" />
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-12">
        {/* Results view */}
        {results.length > 0 ? (
          <div>
            <ResultGrid results={results} />
            <div className="mt-8 text-center">
              <button
                onClick={() => {
                  setResults([]);
                  setSelectedStyles([]);
                }}
                className="rounded-lg border-2 border-primary/20 px-6 py-3 font-medium text-primary transition-colors hover:border-gold hover:text-gold"
              >
                Generate More
              </button>
            </div>
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
                  Choose Styles{" "}
                  {selectedStyles.length > 0 && (
                    <span className="text-sm font-normal text-primary/50">
                      ({selectedStyles.length} selected)
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
                    Generate Headshots
                  </>
                )}
              </button>
              {!imageBase64 && (
                <p className="mt-3 text-sm text-primary/40">Upload a photo to get started</p>
              )}
              {imageBase64 && selectedStyles.length === 0 && (
                <p className="mt-3 text-sm text-primary/40">Select at least one style</p>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
