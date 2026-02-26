import { NextRequest, NextResponse } from "next/server";
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

export async function POST(req: NextRequest) {
  try {
    const { refCode, sessionId } = await req.json();

    if (!refCode || !sessionId) {
      return NextResponse.json(
        { error: "Missing refCode or sessionId" },
        { status: 400 }
      );
    }

    const redis = await getRedis();
    const refData = await redis.get(`ref:${refCode}`);

    if (!refData) {
      return NextResponse.json(
        { error: "Invalid referral code" },
        { status: 404 }
      );
    }

    const ref = JSON.parse(refData);

    // Check if already claimed for this session
    const claimed = await redis.get(`ref_claimed:${refCode}:${sessionId}`);
    if (claimed) {
      return NextResponse.json({ error: "Already claimed" }, { status: 409 });
    }

    // Credit the referrer: add 2 bonus headshots to their credits
    // Look for the referrer's active session credits
    const referrerSessionId = await redis.get(
      `ref_session:${ref.visitorId}`
    );

    if (referrerSessionId) {
      const creditsData = await redis.get(`credits:${referrerSessionId}`);
      if (creditsData) {
        const credits = JSON.parse(creditsData);
        credits.remaining += 2;
        credits.total += 2;
        await redis.set(`credits:${referrerSessionId}`, JSON.stringify(credits));
      }
    }

    // Mark as claimed
    await redis.set(
      `ref_claimed:${refCode}:${sessionId}`,
      JSON.stringify({ claimedAt: new Date().toISOString() }),
      { EX: 90 * 24 * 60 * 60 }
    );

    return NextResponse.json({ ok: true, bonusCredits: 2 });
  } catch (err) {
    console.error("Referral claim error:", err);
    return NextResponse.json(
      { error: "Failed to claim referral" },
      { status: 500 }
    );
  }
}
