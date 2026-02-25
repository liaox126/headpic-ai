import { createClient } from "@vercel/kv";

const kv = createClient({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export interface Credits {
  plan: string;
  remaining: number;
  total: number;
  createdAt: string;
}

const CREDITS_TTL = 30 * 24 * 60 * 60; // 30 days in seconds

export async function storeCredits(
  sessionId: string,
  plan: string,
  total: number
): Promise<void> {
  const credits: Credits = {
    plan,
    remaining: total,
    total,
    createdAt: new Date().toISOString(),
  };
  await kv.set(`credits:${sessionId}`, JSON.stringify(credits), {
    ex: CREDITS_TTL,
  });
}

export async function getCredits(
  sessionId: string
): Promise<Credits | null> {
  const data = await kv.get<string>(`credits:${sessionId}`);
  if (!data) return null;
  return typeof data === "string" ? JSON.parse(data) : data;
}

export async function deductCredits(
  sessionId: string,
  count: number
): Promise<Credits | null> {
  const credits = await getCredits(sessionId);
  if (!credits || credits.remaining < count) return null;

  credits.remaining -= count;
  await kv.set(`credits:${sessionId}`, JSON.stringify(credits), {
    ex: CREDITS_TTL,
  });
  return credits;
}

// Free trial tracking by IP
const FREE_TRIAL_KEY = "free_trial";

export async function hasUsedFreeTrial(ip: string): Promise<boolean> {
  const used = await kv.get<string>(`${FREE_TRIAL_KEY}:${ip}`);
  return !!used;
}

export async function markFreeTrialUsed(ip: string): Promise<void> {
  await kv.set(`${FREE_TRIAL_KEY}:${ip}`, "1", {
    ex: 30 * 24 * 60 * 60, // 30 days
  });
}
