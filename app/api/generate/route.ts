import { NextRequest, NextResponse } from "next/server";
import { generateHeadshot } from "@/lib/ai";
import { styles } from "@/lib/styles";

export const maxDuration = 120; // Allow up to 2 minutes for multiple generations

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { imageBase64, styleIds } = body;

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

    if (styleIds.length > 5) {
      return NextResponse.json(
        { error: "Maximum 5 styles per request" },
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

    // Filter out failed generations
    const successResults = results.filter((r) => r.imageBase64 !== "");
    const failedResults = results.filter((r) => r.imageBase64 === "");

    if (successResults.length === 0) {
      return NextResponse.json(
        { error: "All generations failed. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      results: successResults,
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
