import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-01-28.clover",
      timeout: 30000, // 30s timeout
      maxNetworkRetries: 3,
    });
  }
  return _stripe;
}

export const PLANS = {
  starter: {
    name: "Starter",
    price: 990,
    headshots: 5,
    styles: 2,
  },
  pro: {
    name: "Pro",
    price: 1990,
    headshots: 10,
    styles: 5,
  },
  ultimate: {
    name: "Ultimate",
    price: 2990,
    headshots: 20,
    styles: 5,
  },
} as const;

export type PlanId = keyof typeof PLANS;
