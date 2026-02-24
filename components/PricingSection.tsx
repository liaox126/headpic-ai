import { Check } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: "$19",
    description: "Perfect for trying it out",
    features: ["5 AI headshots", "2 styles", "Standard quality", "24h delivery"],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$39",
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
    name: "Ultimate",
    price: "$69",
    description: "For teams and professionals",
    features: [
      "50 AI headshots",
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
  return (
    <section className="bg-primary/5 py-20">
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
              key={plan.name}
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

              <Link
                href="/generate"
                className={cn(
                  "block rounded-lg py-3 text-center font-semibold transition-colors",
                  plan.highlighted
                    ? "bg-gold text-white hover:bg-gold-light"
                    : "bg-primary/10 text-primary hover:bg-primary/20"
                )}
              >
                Get Started
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
