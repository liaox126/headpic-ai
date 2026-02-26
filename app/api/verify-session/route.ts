import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export async function GET(req: NextRequest) {
  try {
    const sessionId = req.nextUrl.searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json(
        { error: "Missing session_id" },
        { status: 400 }
      );
    }

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment not completed" },
        { status: 402 }
      );
    }

    const planId = session.metadata?.planId || "starter";
    const headshots = session.metadata?.headshots || "5";
    const planName =
      planId === "ultimate"
        ? "Ultimate"
        : planId === "pro"
        ? "Pro"
        : "Starter";

    return NextResponse.json({
      planName,
      headshots: Number(headshots),
      sessionId,
    });
  } catch (err) {
    console.error("Verify session error:", err);
    return NextResponse.json(
      { error: "Failed to verify session" },
      { status: 500 }
    );
  }
}
