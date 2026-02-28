import { NextRequest, NextResponse } from "next/server";
import { getStripe, PLANS } from "@/lib/stripe";
import { storeCredits } from "@/lib/kv";
import { updateUserCredits } from "@/lib/user";

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
    const maxStyles = session.metadata?.maxStyles;
    const userEmail = session.metadata?.userEmail || session.client_reference_id;

    if (planId && headshots) {
      const headshotCount = parseInt(headshots, 10);
      const maxStyleCount = maxStyles ? parseInt(maxStyles, 10) : 5;

      // Always store session-based credits (legacy support + success page)
      await storeCredits(session.id, planId, headshotCount, maxStyleCount);

      // If user email is present, also add credits to user account
      if (userEmail && userEmail.includes("@")) {
        await updateUserCredits(userEmail, planId, headshotCount, maxStyleCount);
        console.log(
          `Credits stored: session=${session.id}, user=${userEmail}, plan=${planId}, headshots=${headshots}, maxStyles=${maxStyles || 5}`
        );
      } else {
        console.log(
          `Credits stored: session=${session.id}, plan=${planId}, headshots=${headshots}, maxStyles=${maxStyles || 5}`
        );
      }
    }
  }

  return NextResponse.json({ received: true });
}
