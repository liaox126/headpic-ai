import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-01-28.clover",
    });
  }
  return _stripe;
}

export const PLANS = {
  starter: {
    name: "Starter",
    price: 1900, // $19 in cents
    headshots: 8,
    styles: 2,
    priceId: process.env.STRIPE_PRICE_STARTER || "",
  },
  pro: {
    name: "Pro",
    price: 3900, // $39
    headshots: 20,
    styles: 5,
    priceId: process.env.STRIPE_PRICE_PRO || "",
  },
  ultimate: {
    name: "Ultimate",
    price: 6900, // $69
    headshots: 40,
    styles: 5,
    priceId: process.env.STRIPE_PRICE_ULTIMATE || "",
  },
} as const;

export type PlanId = keyof typeof PLANS;
