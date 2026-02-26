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

function generateCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export async function POST(req: NextRequest) {
  try {
    const { visitorId } = await req.json();

    if (!visitorId || typeof visitorId !== "string") {
      return NextResponse.json(
        { error: "Missing visitorId" },
        { status: 400 }
      );
    }

    const redis = await getRedis();

    // Check if this visitor already has a referral code
    const existing = await redis.get(`ref_owner:${visitorId}`);
    if (existing) {
      return NextResponse.json({
        code: existing,
        url: `https://headpic.site/?ref=${existing}`,
      });
    }

    // Generate a unique code
    let code = generateCode();
    let attempts = 0;
    while (await redis.exists(`ref:${code}`)) {
      code = generateCode();
      attempts++;
      if (attempts > 10) break;
    }

    // Store the referral
    await redis.set(
      `ref:${code}`,
      JSON.stringify({
        visitorId,
        credits: 2,
        createdAt: new Date().toISOString(),
      }),
      { EX: 90 * 24 * 60 * 60 } // 90 days TTL
    );

    // Store reverse lookup
    await redis.set(`ref_owner:${visitorId}`, code, {
      EX: 90 * 24 * 60 * 60,
    });

    return NextResponse.json({
      code,
      url: `https://headpic.site/?ref=${code}`,
    });
  } catch (err) {
    console.error("Referral error:", err);
    return NextResponse.json(
      { error: "Failed to generate referral" },
      { status: 500 }
    );
  }
}
