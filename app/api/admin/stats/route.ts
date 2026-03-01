import { NextRequest, NextResponse } from "next/server";
import { createClient } from "redis";
import { getStripe } from "@/lib/stripe";
import type { User } from "@/lib/user";

let redisClient: ReturnType<typeof createClient> | null = null;

async function getRedis() {
  if (!redisClient) {
    redisClient = createClient({ url: process.env.REDIS_URL });
    redisClient.on("error", (err) => console.error("Redis error:", err));
    await redisClient.connect();
  }
  return redisClient;
}

export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");
  if (!secret || secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const redis = await getRedis();

  // Scan all user:* keys
  const users: User[] = [];
  for await (const keys of redis.scanIterator({ MATCH: "user:*", COUNT: 100 })) {
    const keyList = Array.isArray(keys) ? keys : [keys];
    for (const key of keyList) {
      const data = await redis.get(key as string);
      if (data) {
        try {
          users.push(JSON.parse(data));
        } catch {}
      }
    }
  }

  // Scan all email:* keys (subscribers)
  const subscribers: { email: string; subscribedAt: string }[] = [];
  for await (const keys of redis.scanIterator({ MATCH: "email:*", COUNT: 100 })) {
    const keyList = Array.isArray(keys) ? keys : [keys];
    for (const key of keyList) {
      const data = await redis.get(key as string);
      if (data) {
        try {
          subscribers.push(JSON.parse(data));
        } catch {}
      }
    }
  }

  // Stripe revenue stats
  let stripeStats = {
    totalRevenue: 0,
    paymentCount: 0,
    recentPayments: [] as {
      amount: number;
      email: string | null;
      date: string;
      plan: string | null;
    }[],
  };

  try {
    const stripe = getStripe();

    // Get successful payments
    const charges = await stripe.charges.list({
      limit: 100,
      expand: ["data.metadata"],
    });

    const successful = charges.data.filter((c) => c.status === "succeeded");
    stripeStats.totalRevenue = successful.reduce((sum, c) => sum + c.amount, 0);
    stripeStats.paymentCount = successful.length;
    stripeStats.recentPayments = successful.slice(0, 10).map((c) => ({
      amount: c.amount,
      email: c.billing_details?.email || c.receipt_email || null,
      date: new Date(c.created * 1000).toISOString(),
      plan: c.metadata?.planId || null,
    }));
  } catch (err) {
    console.error("Stripe stats error:", err);
  }

  // Compute metrics
  const totalUsers = users.length;
  const paidUsers = users.filter((u) => u.plan !== null).length;
  const freeUsers = totalUsers - paidUsers;
  const totalCreditsUsed = users.reduce(
    (sum, u) => sum + (u.credits.total - u.credits.remaining),
    0
  );

  return NextResponse.json({
    users,
    subscribers,
    stripe: stripeStats,
    metrics: { totalUsers, paidUsers, freeUsers, totalCreditsUsed },
  });
}
