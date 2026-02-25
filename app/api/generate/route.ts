import { NextRequest, NextResponse } from "next/server";
import { generateHeadshot } from "@/lib/ai";
import { styles } from "@/lib/styles";
import { getCredits, deductCredits, hasUsedFreeTrial, markFreeTrialUsed } from "@/lib/kv";

export const maxDuration = 120;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imageBase64, styleIds, sessionId } = body;

    if (!imageBase64 || typeof imageBase64 !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid image data" },
        { status: 400 }
      );
    }

    if (!Array.isArray(styleIds) || styleIds.length === 0) {
      return NextResponse.json(
        { error: "Please select at least one style" },
        { status: 400 }
      );
    }

    // Validate style IDs
    const validStyleIds = styles.map((s) => s.id);
    const invalidIds = styleIds.filter((id: string) => !validStyleIds.includes(id));
    if (invalidIds.length > 0) {
      return NextResponse.json(
        { error: `Invalid style IDs: ${invalidIds.join(", ")}` },
        { status: 400 }
      );
    }

    let isFreePreview = false;
    let remaining = 0;

    // Admin bypass for testing
    const adminKey = req.headers.get("x-admin-key") || body.adminKey;
    const isAdmin = adminKey && adminKey === process.env.ADMIN_SECRET;

    if (isAdmin) {
      // Skip all credit checks for admin testing
      isFreePreview = false;
    } else if (sessionId) {
      // Paid user - verify credits
      const credits = await getCredits(sessionId);
      if (!credits) {
        return NextResponse.json(
          { error: "Invalid or expired session. Please purchase a plan.", code: "NO_CREDITS" },
          { status: 403 }
        );
      }

      if (credits.remaining < styleIds.length) {
        return NextResponse.json(
          {
            error: `Not enough credits. You have ${credits.remaining} remaining but selected ${styleIds.length} styles.`,
            code: "INSUFFICIENT_CREDITS",
            remaining: credits.remaining,
          },
          { status: 403 }
        );
      }

      // Deduct credits
      const updated = await deductCredits(sessionId, styleIds.length);
      remaining = updated?.remaining ?? 0;
    } else {
      // Free preview - limit to 1 style, 1 per IP
      if (styleIds.length > 1) {
        return NextResponse.json(
          { error: "Free preview allows 1 style only. Purchase a plan for more.", code: "FREE_LIMIT" },
          { status: 403 }
        );
      }

      const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
      const used = await hasUsedFreeTrial(ip);
      if (used) {
        return NextResponse.json(
          { error: "You've already used your free preview. Purchase a plan to continue.", code: "FREE_USED" },
          { status: 403 }
        );
      }

      isFreePreview = true;
      // Mark free trial as used after generation succeeds (below)
    }

    if (styleIds.length > 5) {
      return NextResponse.json(
        { error: "Maximum 5 styles per request" },
        { status: 400 }
      );
    }

    // Generate headshots concurrently
    const selectedStyles = styles.filter((s) => styleIds.includes(s.id));

    const generationPromises = selectedStyles.map(async (style) => {
      try {
        const resultBase64 = await generateHeadshot(imageBase64, style.prompt);
        return {
          styleId: style.id,
          styleName: style.name,
          imageBase64: resultBase64,
        };
      } catch (err) {
        console.error(`Failed to generate ${style.name}:`, err);
        return {
          styleId: style.id,
          styleName: style.name,
          imageBase64: "",
          error: err instanceof Error ? err.message : "Generation failed",
        };
      }
    });

    const results = await Promise.all(generationPromises);
    const successResults = results.filter((r) => r.imageBase64 !== "");
    const failedResults = results.filter((r) => r.imageBase64 === "");

    if (successResults.length === 0) {
      return NextResponse.json(
        { error: "All generations failed. Please try again." },
        { status: 500 }
      );
    }

    // Mark free trial used only on success
    if (isFreePreview && successResults.length > 0) {
      const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
      await markFreeTrialUsed(ip);
    }

    return NextResponse.json({
      results: successResults,
      remaining: sessionId ? remaining : 0,
      isFreePreview,
      failed: failedResults.length > 0
        ? failedResults.map((r) => ({ styleId: r.styleId, error: (r as Record<string, unknown>).error }))
        : undefined,
    });
  } catch (err) {
    console.error("Generate API error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
