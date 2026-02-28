import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { generateMagicLinkToken } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const rl = rateLimit(`auth:${ip}`, 5, 60 * 1000);
    if (!rl.success) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a moment." },
        { status: 429 }
      );
    }

    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const normalized = email.toLowerCase().trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(normalized)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const token = generateMagicLinkToken(normalized);
    const origin = req.nextUrl.origin;
    const magicLink = `${origin}/api/auth/verify?token=${encodeURIComponent(token)}`;

    await getResend().emails.send({
      from: "HeadPic.ai <noreply@headpic.site>",
      to: normalized,
      subject: "Your HeadPic.ai Login Link",
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f8f9fa;">
  <div style="max-width:480px;margin:40px auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">
    <div style="background:#1e3a5f;padding:24px;text-align:center;">
      <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;">HeadPic<span style="color:#c8a45c">.ai</span></h1>
    </div>
    <div style="padding:32px 24px;text-align:center;">
      <h2 style="margin:0 0 8px;color:#1e3a5f;font-size:20px;">Sign in to your account</h2>
      <p style="margin:0 0 24px;color:#666;font-size:14px;">Click the button below to sign in. This link expires in 15 minutes.</p>
      <a href="${magicLink}" style="display:inline-block;background:#c8a45c;color:#1e3a5f;text-decoration:none;font-weight:700;font-size:16px;padding:14px 32px;border-radius:8px;">
        Sign In to HeadPic.ai
      </a>
      <p style="margin:24px 0 0;color:#999;font-size:12px;">If you didn't request this link, you can safely ignore this email.</p>
    </div>
  </div>
</body>
</html>`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Send magic link error:", err);
    return NextResponse.json(
      { error: "Failed to send login link" },
      { status: 500 }
    );
  }
}
