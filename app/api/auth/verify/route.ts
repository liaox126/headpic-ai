import { NextRequest, NextResponse } from "next/server";
import { verifyMagicLinkToken, setAuthCookie } from "@/lib/auth";
import { createOrGetUser } from "@/lib/user";

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/generate?auth_error=missing_token", req.url));
  }

  const payload = verifyMagicLinkToken(token);
  if (!payload) {
    return NextResponse.redirect(new URL("/generate?auth_error=invalid_token", req.url));
  }

  // Create or get user
  await createOrGetUser(payload.email);

  // Set session cookie
  await setAuthCookie(payload.email);

  return NextResponse.redirect(new URL("/generate", req.url));
}
