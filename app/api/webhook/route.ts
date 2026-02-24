import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  try {
    const event = getStripe().webhooks.constructEvent(body, sig, endpointSecret);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        console.log("✅ Payment completed:", {
          sessionId: session.id,
          planId: session.metadata?.planId,
          headshots: session.metadata?.headshots,
          email: session.customer_details?.email,
        });
        // TODO: Store payment record in database
        // TODO: Send confirmation email
        break;
      }
      default:
        console.log(`Unhandled event: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json(
      { error: "Webhook verification failed" },
      { status: 400 }
    );
  }
}
