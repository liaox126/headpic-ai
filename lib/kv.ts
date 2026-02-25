import { createClient } from "redis";

let redisClient: ReturnType<typeof createClient> | null = null;

async function getRedis() {
  if (!redisClient) {
    redisClient = createClient({ url: process.env.REDIS_URL });
    redisClient.on("error", (err) => console.error("Redis error:", err));
    await redisClient.connect();
  }
  return redisClient;
}

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
  const redis = await getRedis();
  const credits: Credits = {
    plan,
    remaining: total,
    total,
    createdAt: new Date().toISOString(),
  };
  await redis.set(`credits:${sessionId}`, JSON.stringify(credits), {
    EX: CREDITS_TTL,
  });
}

export async function getCredits(
  sessionId: string
): Promise<Credits | null> {
  const redis = await getRedis();
  const data = await redis.get(`credits:${sessionId}`);
  if (!data) return null;
  return JSON.parse(data);
}

export async function deductCredits(
  sessionId: string,
  count: number
): Promise<Credits | null> {
  const credits = await getCredits(sessionId);
  if (!credits || credits.remaining < count) return null;

  credits.remaining -= count;
  const redis = await getRedis();
  await redis.set(`credits:${sessionId}`, JSON.stringify(credits), {
    EX: CREDITS_TTL,
  });
  return credits;
}

// Free trial tracking by IP
const FREE_TRIAL_KEY = "free_trial";

export async function hasUsedFreeTrial(ip: string): Promise<boolean> {
  const redis = await getRedis();
  const used = await redis.get(`${FREE_TRIAL_KEY}:${ip}`);
  return !!used;
}

export async function markFreeTrialUsed(ip: string): Promise<void> {
  const redis = await getRedis();
  await redis.set(`${FREE_TRIAL_KEY}:${ip}`, "1", {
    EX: 30 * 24 * 60 * 60,
  });
}
