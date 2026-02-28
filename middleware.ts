import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: ["/generate/:path*", "/api/generate/:path*"],
};

export function middleware(req: NextRequest) {
  const token = req.cookies.get("hp_token")?.value;

  if (!token) {
    return NextResponse.next();
  }

  // Decode JWT payload without full verification (middleware is edge-only).
  // Full verification happens in API routes via lib/auth.
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return NextResponse.next();
    const payload = JSON.parse(atob(parts[1]));
    if (payload.type !== "session" || !payload.email) return NextResponse.next();

    // Check expiry
    if (payload.exp && payload.exp < Date.now() / 1000) return NextResponse.next();

    const headers = new Headers(req.headers);
    headers.set("x-user-email", payload.email);

    return NextResponse.next({ request: { headers } });
  } catch {
    return NextResponse.next();
  }
}
