"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Sparkles, CreditCard, Zap, Check, Crown, Mail, LogOut, X } from "lucide-react";
import UploadZone from "@/components/UploadZone";
import StylePicker from "@/components/StylePicker";
import ResultGrid from "@/components/ResultGrid";
import ShareReferral from "@/components/ShareReferral";
import { styles } from "@/lib/styles";

interface GenerateResult {
  styleId: string;
  styleName: string;
  imageBase64: string;
}

interface UserInfo {
  email: string;
  plan: string | null;
  credits: { remaining: number; total: number; maxStyles: number };
}

export default function GeneratePage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const adminKey = searchParams.get("admin");
  const authError = searchParams.get("auth_error");

  const [images, setImages] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [results, setResults] = useState<GenerateResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentStyle, setCurrentStyle] = useState<string | null>(null);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [error, setError] = useState<string | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [freeUsed, setFreeUsed] = useState(false);
  const [enhance, setEnhance] = useState(false);

  const [upsellLoading, setUpsellLoading] = useState<string | null>(null);

  // Auth state
  const [user, setUser] = useState<UserInfo | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginSent, setLoginSent] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const isPaid = !!sessionId || !!adminKey || (user !== null && user.credits.remaining > 0);

  // Fetch current user on mount
  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data);
        if (data.credits.remaining > 0) {
          setRemaining(data.credits.remaining);
        }
      }
    } catch {
      // Not logged in, that's fine
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // Show auth error from redirect
  useEffect(() => {
    if (authError === "invalid_token") {
      setError("Login link has expired or is invalid. Please request a new one.");
    } else if (authError === "missing_token") {
      setError("Invalid login link.");
    }
  }, [authError]);

  const handleSendMagicLink = async () => {
    if (!loginEmail.trim()) return;
    setLoginLoading(true);
    setLoginError(null);
    try {
      const res = await fetch("/api/auth/send-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: loginEmail.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send");
      setLoginSent(true);
    } catch (err) {
      setLoginError(err instanceof Error ? err.message : "Failed to send login link");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    setRemaining(null);
  };

  const handleUpsellCheckout = async (planId: string) => {
    setUpsellLoading(planId);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Checkout error:", err);
    } finally {
      setUpsellLoading(null);
    }
  };

  const toggleStyle = (id: string) => {
    if (!isPaid && !freeUsed) {
      setSelectedStyles([id]);
      return;
    }
    setSelectedStyles((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleGenerate = async () => {
    if (images.length === 0 || selectedStyles.length === 0) return;

    setLoading(true);
    setError(null);
    setResults([]);
    setProgress({ done: 0, total: selectedStyles.length });

    const stylesToGenerate = styles.filter((s) => selectedStyles.includes(s.id));

    for (let i = 0; i < stylesToGenerate.length; i++) {
      const style = stylesToGenerate[i];
      setCurrentStyle(style.name);

      try {
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(adminKey ? { "x-admin-key": adminKey } : {}),
          },
          body: JSON.stringify({
            images,
            styleIds: [style.id],
            sessionId: sessionId || undefined,
            adminKey: adminKey || undefined,
            enhance,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          if (data.code === "FREE_USED" || data.code === "FREE_LIMIT") {
            setFreeUsed(true);
          }
          throw new Error(data.error || `Server error (${res.status})`);
        }

        if (data.results && data.results.length > 0) {
          setResults((prev) => [...prev, ...data.results]);
        }

        setProgress({ done: i + 1, total: stylesToGenerate.length });

        if (data.remaining !== undefined && isPaid) {
          setRemaining(data.remaining);
        }

        if (data.isFreePreview) {
          setFreeUsed(true);
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Generation failed";
        // Don't stop on individual failures, continue with next style
        if (i === 0 && stylesToGenerate.length === 1) {
          setError(msg);
        }
        console.error(`Failed to generate ${style.name}:`, msg);
        setProgress({ done: i + 1, total: stylesToGenerate.length });
      }
    }

    setCurrentStyle(null);
    setLoading(false);
    // Refresh user credits after generation
    if (user) fetchUser();
  };

  const handleClear = () => {
    setImages([]);
    setResults([]);
    setError(null);
  };

  const canGenerate = images.length > 0 && selectedStyles.length > 0 && !loading;

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
          <div className="flex items-center gap-3">
            {isPaid && remaining !== null && (
              <span className="text-xs font-medium text-primary/50">
                {remaining} left
              </span>
            )}
            {user ? (
              <div className="flex items-center gap-2">
                <span className="hidden sm:inline text-xs text-primary/60 max-w-[120px] truncate">
                  {user.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="rounded-md p-1.5 text-primary/40 transition-colors hover:bg-primary/5 hover:text-primary/70"
                  title="Sign out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="flex items-center gap-1.5 rounded-lg border border-primary/15 px-3 py-1.5 text-xs font-medium text-primary/70 transition-colors hover:border-gold hover:text-gold"
              >
                <Mail className="h-3.5 w-3.5" />
                Sign in
              </button>
            )}
          </div>
        </div>
      </header>

      {/* User account banner */}
      {user && user.credits.remaining > 0 && !sessionId && (
        <div className="bg-gold/10 border-b border-gold/20 py-2 text-center text-sm text-primary/70">
          <CreditCard className="inline h-4 w-4 mr-1" />
          You have <strong>{user.credits.remaining}</strong> headshots remaining
          {user.plan && <span className="ml-1 text-xs text-primary/50">({user.plan} plan)</span>}
        </div>
      )}

      {/* Credits banner (session-based) */}
      {sessionId && !user && remaining !== null && (
        <div className="bg-gold/10 border-b border-gold/20 py-2 text-center text-sm text-primary/70">
          <CreditCard className="inline h-4 w-4 mr-1" />
          You have <strong>{remaining}</strong> headshots remaining
          {!user && (
            <button
              onClick={() => setShowLoginModal(true)}
              className="ml-2 text-gold underline font-medium"
            >
              Sign in to save credits to your account
            </button>
          )}
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
        {/* Loading progress overlay */}
        {loading && (
          <div className="mb-8 rounded-xl border-2 border-gold/20 bg-gold/5 p-6">
            <div className="flex items-center gap-4 mb-4">
              <Loader2 className="h-6 w-6 animate-spin text-gold" />
              <div>
                <p className="font-semibold text-primary">
                  Generating {currentStyle}...
                </p>
                <p className="text-sm text-primary/50">
                  {progress.done} of {progress.total} completed — this takes about 10-30 seconds per style
                </p>
              </div>
            </div>
            <div className="h-2 rounded-full bg-primary/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gold transition-all duration-500"
                style={{ width: `${progress.total > 0 ? ((progress.done + 0.5) / progress.total) * 100 : 0}%` }}
              />
            </div>
          </div>
        )}

        {/* Results showing as they come in */}
        {results.length > 0 && (
          <div className="mb-8">
            <ResultGrid results={results} isFreePreview={!isPaid} />
            {!loading && (
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
            )}
          </div>
        )}

        {/* Upsell after free preview */}
        {!loading && results.length > 0 && !isPaid && freeUsed && (
          <div className="mb-8 rounded-2xl border-2 border-gold/30 bg-gradient-to-br from-gold/5 to-gold/10 p-8">
            <div className="mb-6 text-center">
              <Crown className="mx-auto mb-3 h-8 w-8 text-gold" />
              <h3 className="text-2xl font-bold text-primary">
                Love your headshot? Get more!
              </h3>
              <p className="mt-2 text-primary/60">
                Remove watermarks and generate in all 5 professional styles.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              {[
                { id: "starter", name: "Starter", price: "$9.9", headshots: "5 headshots", styles: "2 styles" },
                { id: "pro", name: "Pro", price: "$19.9", headshots: "10 headshots", styles: "All 5 styles", popular: true },
                { id: "ultimate", name: "Ultimate", price: "$29.9", headshots: "20 headshots", styles: "All 5 styles" },
              ].map((plan) => (
                <div
                  key={plan.id}
                  className={`rounded-xl border-2 bg-white p-4 text-center ${
                    plan.popular ? "border-gold shadow-lg shadow-gold/10" : "border-primary/10"
                  }`}
                >
                  {plan.popular && (
                    <span className="mb-2 inline-block rounded-full bg-gold px-3 py-0.5 text-xs font-semibold text-white">
                      Popular
                    </span>
                  )}
                  <p className="text-lg font-bold text-primary">{plan.name}</p>
                  <p className="text-2xl font-bold text-primary">{plan.price}</p>
                  <div className="mt-2 space-y-1 text-xs text-primary/60">
                    <p className="flex items-center justify-center gap-1">
                      <Check className="h-3 w-3 text-gold" /> {plan.headshots}
                    </p>
                    <p className="flex items-center justify-center gap-1">
                      <Check className="h-3 w-3 text-gold" /> {plan.styles}
                    </p>
                  </div>
                  <button
                    onClick={() => handleUpsellCheckout(plan.id)}
                    disabled={upsellLoading !== null}
                    className={`mt-3 w-full rounded-lg py-2 text-sm font-semibold transition-colors ${
                      plan.popular
                        ? "bg-gold text-white hover:bg-gold-light"
                        : "bg-primary/10 text-primary hover:bg-primary/20"
                    } disabled:opacity-60`}
                  >
                    {upsellLoading === plan.id ? (
                      <Loader2 className="mx-auto h-4 w-4 animate-spin" />
                    ) : (
                      "Get Started"
                    )}
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => handleUpsellCheckout("starter")}
                disabled={upsellLoading !== null}
                className="inline-flex items-center gap-2 rounded-xl bg-gold px-8 py-4 text-lg font-bold text-primary shadow-lg shadow-gold/20 transition-all hover:bg-gold-light hover:shadow-xl animate-pulse hover:animate-none"
              >
                <Sparkles className="h-5 w-5" />
                Upgrade Now — Starting at $9.9
              </button>
            </div>
          </div>
        )}

        {/* Share & Referral */}
        {!loading && results.length > 0 && (
          <ShareReferral />
        )}

        {/* Show upload/style picker when not loading and no results */}
        {!loading && results.length === 0 && (freeUsed && !isPaid ? (
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
                onImagesSelect={setImages}
                previews={images}
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

            {/* Skin Enhancement Toggle */}
            <section>
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={enhance}
                    onChange={(e) => setEnhance(e.target.checked)}
                    className="peer sr-only"
                  />
                  <div className="h-5 w-5 rounded border-2 border-primary/20 bg-white transition-all peer-checked:border-gold peer-checked:bg-gold flex items-center justify-center">
                    {enhance && (
                      <Check className="h-3.5 w-3.5 text-white" />
                    )}
                  </div>
                </div>
                <div>
                  <span className="text-sm font-medium text-primary group-hover:text-gold transition-colors">
                    ✨ Natural Skin Enhancement
                  </span>
                  <p className="text-xs text-primary/50">
                    Subtle skin smoothing &amp; healthy glow — keeps it real, just better lighting
                  </p>
                </div>
              </label>
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
                <Sparkles className="h-5 w-5" />
                {isPaid ? "Generate Headshots" : "Generate Free Preview"}
              </button>
              {images.length === 0 && (
                <p className="mt-3 text-sm text-primary/40">Upload a photo to get started</p>
              )}
              {images.length > 0 && selectedStyles.length === 0 && (
                <p className="mt-3 text-sm text-primary/40">Select {isPaid ? "at least one style" : "a style"}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
            <button
              onClick={() => {
                setShowLoginModal(false);
                setLoginSent(false);
                setLoginError(null);
                setLoginEmail("");
              }}
              className="absolute right-4 top-4 rounded-md p-1 text-primary/40 hover:text-primary/70"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="text-center mb-6">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gold/10">
                <Mail className="h-6 w-6 text-gold" />
              </div>
              <h3 className="text-xl font-bold text-primary">Sign in to HeadPic.ai</h3>
              <p className="mt-1 text-sm text-primary/50">
                We'll send a magic link to your email
              </p>
            </div>

            {loginSent ? (
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50">
                  <Check className="h-8 w-8 text-emerald-500" />
                </div>
                <h4 className="text-lg font-semibold text-primary">Check your email</h4>
                <p className="mt-2 text-sm text-primary/60">
                  We sent a login link to <strong>{loginEmail}</strong>. Click the link to sign in.
                </p>
                <p className="mt-4 text-xs text-primary/40">
                  Link expires in 15 minutes. Check spam if you don't see it.
                </p>
                <button
                  onClick={() => {
                    setShowLoginModal(false);
                    setLoginSent(false);
                    setLoginEmail("");
                  }}
                  className="mt-6 rounded-lg bg-primary/10 px-6 py-2 text-sm font-medium text-primary hover:bg-primary/20"
                >
                  Close
                </button>
              </div>
            ) : (
              <div>
                <div className="space-y-3">
                  <input
                    type="email"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMagicLink()}
                    placeholder="you@example.com"
                    className="w-full rounded-lg border-2 border-primary/10 px-4 py-3 text-sm text-primary outline-none transition-colors placeholder:text-primary/30 focus:border-gold"
                    autoFocus
                  />
                  {loginError && (
                    <p className="text-xs text-red-500">{loginError}</p>
                  )}
                  <button
                    onClick={handleSendMagicLink}
                    disabled={loginLoading || !loginEmail.trim()}
                    className="w-full rounded-lg bg-gold py-3 text-sm font-bold text-primary transition-colors hover:bg-gold-light disabled:opacity-50"
                  >
                    {loginLoading ? (
                      <Loader2 className="mx-auto h-4 w-4 animate-spin" />
                    ) : (
                      "Send Magic Link"
                    )}
                  </button>
                </div>
                <p className="mt-4 text-center text-xs text-primary/40">
                  No password needed. We'll email you a secure login link.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
