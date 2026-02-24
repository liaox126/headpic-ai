"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    id: "starter",
    name: "Starter",
    price: "$9",
    description: "Perfect for trying it out",
    features: ["8 AI headshots", "2 styles", "HD quality", "60s delivery"],
    highlighted: false,
  },
  {
    id: "pro",
    name: "Pro",
    price: "$29",
    description: "Most popular choice",
    features: [
      "20 AI headshots",
      "All 5 styles",
      "HD quality",
      "60s delivery",
      "Re-generation",
    ],
    highlighted: true,
  },
  {
    id: "ultimate",
    name: "Ultimate",
    price: "$49",
    description: "For teams and professionals",
    features: [
      "40 AI headshots",
      "All 5 styles",
      "4K quality",
      "Instant delivery",
      "Priority support",
      "Background removal",
    ],
    highlighted: false,
  },
];

export default function PricingSection() {
  const [loading, setLoading] = useState<string | null>(null);

  async function handleCheckout(planId: string) {
    setLoading(planId);
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
      setLoading(null);
    }
  }
  return (
    <section id="pricing" className="bg-primary/5 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-4 text-center text-3xl font-bold text-primary">
          Simple, Transparent <span className="text-gold">Pricing</span>
        </h2>
        <p className="mx-auto mb-12 max-w-xl text-center text-primary/60">
          Choose the plan that fits your needs. All plans include our AI-powered
          headshot generation.
        </p>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "relative flex flex-col rounded-2xl border-2 bg-white p-8 transition-shadow",
                plan.highlighted
                  ? "border-gold shadow-xl shadow-gold/10"
                  : "border-primary/10 shadow-md"
              )}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gold px-4 py-1 text-sm font-semibold text-white">
                  Most Popular
                </div>
              )}

              <h3 className="text-xl font-bold text-primary">{plan.name}</h3>
              <p className="mt-1 text-sm text-primary/50">{plan.description}</p>

              <div className="my-6">
                <span className="text-4xl font-bold text-primary">
                  {plan.price}
                </span>
                <span className="text-primary/40"> / one-time</span>
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="h-4 w-4 shrink-0 text-gold" />
                    <span className="text-primary/70">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleCheckout(plan.id)}
                disabled={loading !== null}
                className={cn(
                  "block rounded-lg py-3 text-center font-semibold transition-colors",
                  plan.highlighted
                    ? "bg-gold text-white hover:bg-gold-light"
                    : "bg-primary/10 text-primary hover:bg-primary/20",
                  loading === plan.id && "opacity-70 cursor-wait"
                )}
              >
                {loading === plan.id ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Processing...
                  </span>
                ) : (
                  "Get Started"
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
