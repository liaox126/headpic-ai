import { NextRequest, NextResponse } from "next/server";
import { generateHeadshot } from "@/lib/ai";
import { styles, buildPrompt } from "@/lib/styles";
import { getCredits, deductCredits, hasUsedFreeTrial, markFreeTrialUsed } from "@/lib/kv";
import { getUserByEmail, deductUserCredits } from "@/lib/user";
import { rateLimit } from "@/lib/rate-limit";

export const maxDuration = 120;

export async function POST(req: NextRequest) {
  try {
    // Rate limiting: 10 requests per minute per IP
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const rl = rateLimit(`generate:${ip}`, 10, 60 * 1000);
    if (!rl.success) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment and try again." },
        { status: 429 }
      );
    }
    const body = await req.json();
    const { images, imageBase64, styleIds, sessionId, enhance } = body;

    // Check for logged-in user via middleware header
    const userEmail = req.headers.get("x-user-email");

    // Support both new multi-image format and legacy single image
    const imageList: string[] = Array.isArray(images) && images.length > 0
      ? images
      : imageBase64 ? [imageBase64] : [];

    if (imageList.length === 0 || !imageList.every((img: unknown) => typeof img === "string")) {
      return NextResponse.json(
        { error: "Missing or invalid image data" },
        { status: 400 }
      );
    }

    if (imageList.length > 3) {
      return NextResponse.json(
        { error: "Maximum 3 photos allowed" },
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
    let creditSource: "user" | "session" | "admin" | "free" = "free";

    // Admin bypass for testing
    const adminKey = req.headers.get("x-admin-key") || body.adminKey;
    const isAdmin = adminKey && adminKey === process.env.ADMIN_SECRET;

    if (isAdmin) {
      creditSource = "admin";
    } else if (userEmail) {
      // Logged-in user - check user account credits first
      const user = await getUserByEmail(userEmail);
      if (user && user.credits.remaining > 0) {
        creditSource = "user";

        const maxStyles = user.credits.maxStyles || 5;
        if (styleIds.length > maxStyles) {
          return NextResponse.json(
            {
              error: `Your ${user.plan} plan allows ${maxStyles} styles. Please select fewer styles.`,
              code: "STYLE_LIMIT",
              maxStyles,
            },
            { status: 403 }
          );
        }

        if (user.credits.remaining < styleIds.length) {
          return NextResponse.json(
            {
              error: `Not enough credits. You have ${user.credits.remaining} remaining but selected ${styleIds.length} styles.`,
              code: "INSUFFICIENT_CREDITS",
              remaining: user.credits.remaining,
            },
            { status: 403 }
          );
        }

        const updated = await deductUserCredits(userEmail, styleIds.length);
        remaining = updated?.credits.remaining ?? 0;
      } else if (sessionId) {
        // Fall back to session-based credits
        creditSource = "session";
      } else {
        // Logged-in user with no credits - free preview
        creditSource = "free";
      }
    } else if (sessionId) {
      creditSource = "session";
    }

    // Handle session-based credits
    if (creditSource === "session") {
      const credits = await getCredits(sessionId);
      if (!credits) {
        return NextResponse.json(
          { error: "Invalid or expired session. Please purchase a plan.", code: "NO_CREDITS" },
          { status: 403 }
        );
      }

      const maxStyles = credits.maxStyles || 5;
      if (styleIds.length > maxStyles) {
        return NextResponse.json(
          {
            error: `Your ${credits.plan} plan allows ${maxStyles} styles. Please select fewer styles.`,
            code: "STYLE_LIMIT",
            maxStyles,
          },
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

      const updated = await deductCredits(sessionId, styleIds.length);
      remaining = updated?.remaining ?? 0;
    }

    // Handle free preview
    if (creditSource === "free") {
      if (styleIds.length > 1) {
        return NextResponse.json(
          { error: "Free preview allows 1 style only. Purchase a plan for more.", code: "FREE_LIMIT" },
          { status: 403 }
        );
      }

      const used = await hasUsedFreeTrial(ip);
      if (used) {
        return NextResponse.json(
          { error: "You've already used your free preview. Purchase a plan to continue.", code: "FREE_USED" },
          { status: 403 }
        );
      }

      isFreePreview = true;
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
        const fullPrompt = buildPrompt(style, !!enhance);
        const resultBase64 = await generateHeadshot(imageList, fullPrompt);
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
      await markFreeTrialUsed(ip);
    }

    const isPaid = creditSource === "user" || creditSource === "session" || creditSource === "admin";

    return NextResponse.json({
      results: successResults,
      remaining: isPaid ? remaining : 0,
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
