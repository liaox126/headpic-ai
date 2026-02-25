import { NextRequest, NextResponse } from "next/server";
import { getStripe, PLANS } from "@/lib/stripe";
import { storeCredits } from "@/lib/kv";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event;
  try {
    event = getStripe().webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const planId = session.metadata?.planId;
    const headshots = session.metadata?.headshots;

    if (planId && headshots) {
      await storeCredits(
        session.id,
        planId,
        parseInt(headshots, 10)
      );
      console.log(
        `Credits stored: session=${session.id}, plan=${planId}, headshots=${headshots}`
      );
    }
  }

  return NextResponse.json({ received: true });
}
