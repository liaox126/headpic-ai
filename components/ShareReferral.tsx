"use client";

import { useState, useEffect } from "react";
import { Gift, Copy, Check, Share2 } from "lucide-react";

function getVisitorId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("hp_visitor_id");
  if (!id) {
    id = Math.random().toString(36).substring(2) + Date.now().toString(36);
    localStorage.setItem("hp_visitor_id", id);
  }
  return id;
}

export default function ShareReferral() {
  const [referralUrl, setReferralUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Store ref code from URL if present
    const params = new URLSearchParams(window.location.search);
    const ref = params.get("ref");
    if (ref) {
      localStorage.setItem("hp_ref", ref);
    }
  }, []);

  const generateReferral = async () => {
    setLoading(true);
    try {
      const visitorId = getVisitorId();
      const res = await fetch("/api/referral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ visitorId }),
      });
      const data = await res.json();
      if (data.url) {
        setReferralUrl(data.url);
      }
    } catch (err) {
      console.error("Referral error:", err);
    } finally {
      setLoading(false);
    }
  };

  const copyLink = async () => {
    if (!referralUrl) return;
    await navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareTwitter = () => {
    if (!referralUrl) return;
    const text = encodeURIComponent(
      "Just got my professional AI headshot in 60 seconds! Try it free:"
    );
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(referralUrl)}`,
      "_blank"
    );
  };

  const shareLinkedIn = () => {
    if (!referralUrl) return;
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralUrl)}`,
      "_blank"
    );
  };

  return (
    <div className="mt-8 rounded-xl border-2 border-primary/10 bg-primary/5 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/20">
          <Gift className="h-5 w-5 text-gold" />
        </div>
        <div>
          <h3 className="font-bold text-primary">
            Share &amp; Get 2 Free Headshots
          </h3>
          <p className="text-sm text-primary/50">
            When your friend makes a purchase, you get 2 bonus headshots.
          </p>
        </div>
      </div>

      {!referralUrl ? (
        <button
          onClick={generateReferral}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-3 font-semibold text-primary transition-colors hover:bg-gold-light disabled:opacity-60"
        >
          <Share2 className="h-4 w-4" />
          {loading ? "Generating..." : "Get My Referral Link"}
        </button>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={referralUrl}
              className="flex-1 rounded-lg border border-primary/10 bg-white px-3 py-2 text-sm text-primary/70"
            />
            <button
              onClick={copyLink}
              className="inline-flex items-center gap-1 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-light"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4" /> Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" /> Copy
                </>
              )}
            </button>
          </div>

          <div className="flex gap-3">
            <button
              onClick={shareTwitter}
              className="inline-flex items-center gap-2 rounded-lg bg-[#1DA1F2] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Share on X
            </button>
            <button
              onClick={shareLinkedIn}
              className="inline-flex items-center gap-2 rounded-lg bg-[#0A66C2] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Share on LinkedIn
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
