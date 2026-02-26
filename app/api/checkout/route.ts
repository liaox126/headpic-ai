import { NextRequest, NextResponse } from "next/server";
import { getStripe, PLANS, type PlanId } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  try {
    const { planId } = await req.json();

    if (!planId || !PLANS[planId as PlanId]) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }

    const plan = PLANS[planId as PlanId];

    const session = await getStripe().checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `HeadPic ${plan.name}`,
              description: `${plan.headshots} AI headshots, ${plan.styles} styles`,
            },
            unit_amount: plan.price,
          },
          quantity: 1,
        },
      ],
      success_url: `${req.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/#pricing`,
      metadata: {
        planId,
        headshots: String(plan.headshots),
        maxStyles: String(plan.styles),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: "Failed to create checkout session", detail: message },
      { status: 500 }
    );
  }
}
