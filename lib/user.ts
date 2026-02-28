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

export interface UserCredits {
  remaining: number;
  total: number;
  maxStyles: number;
}

export interface User {
  email: string;
  plan: string | null;
  credits: UserCredits;
  stripeCustomerId: string | null;
  createdAt: string;
  lastLogin: string;
}

const USER_TTL = 365 * 24 * 60 * 60; // 1 year

export async function createOrGetUser(email: string): Promise<User> {
  const redis = await getRedis();
  const key = `user:${email.toLowerCase()}`;
  const existing = await redis.get(key);

  if (existing) {
    const user: User = JSON.parse(existing);
    user.lastLogin = new Date().toISOString();
    await redis.set(key, JSON.stringify(user), { EX: USER_TTL });
    return user;
  }

  const user: User = {
    email: email.toLowerCase(),
    plan: null,
    credits: { remaining: 0, total: 0, maxStyles: 0 },
    stripeCustomerId: null,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString(),
  };

  await redis.set(key, JSON.stringify(user), { EX: USER_TTL });
  return user;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const redis = await getRedis();
  const data = await redis.get(`user:${email.toLowerCase()}`);
  if (!data) return null;
  return JSON.parse(data);
}

export async function updateUserCredits(
  email: string,
  plan: string,
  addCredits: number,
  maxStyles: number
): Promise<User> {
  const user = await createOrGetUser(email);

  user.plan = plan;
  user.credits.remaining += addCredits;
  user.credits.total += addCredits;
  user.credits.maxStyles = Math.max(user.credits.maxStyles, maxStyles);

  const redis = await getRedis();
  await redis.set(`user:${email.toLowerCase()}`, JSON.stringify(user), {
    EX: USER_TTL,
  });
  return user;
}

export async function deductUserCredits(
  email: string,
  count: number
): Promise<User | null> {
  const user = await getUserByEmail(email);
  if (!user || user.credits.remaining < count) return null;

  user.credits.remaining -= count;
  const redis = await getRedis();
  await redis.set(`user:${email.toLowerCase()}`, JSON.stringify(user), {
    EX: USER_TTL,
  });
  return user;
}
