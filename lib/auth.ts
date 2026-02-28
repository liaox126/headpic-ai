import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { getUserByEmail } from "./user";
import type { User } from "./user";

const JWT_SECRET = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not set");
  return secret;
};

const COOKIE_NAME = "hp_token";
const COOKIE_MAX_AGE = 30 * 24 * 60 * 60; // 30 days
const MAGIC_LINK_EXPIRY = "15m";

export function generateMagicLinkToken(email: string): string {
  return jwt.sign({ email: email.toLowerCase(), type: "magic_link" }, JWT_SECRET(), {
    expiresIn: MAGIC_LINK_EXPIRY,
  });
}

export function verifyMagicLinkToken(token: string): { email: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET()) as {
      email: string;
      type: string;
    };
    if (decoded.type !== "magic_link") return null;
    return { email: decoded.email };
  } catch {
    return null;
  }
}

export function generateSessionToken(email: string): string {
  return jwt.sign({ email: email.toLowerCase(), type: "session" }, JWT_SECRET(), {
    expiresIn: "30d",
  });
}

export function verifySessionToken(token: string): { email: string } | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET()) as {
      email: string;
      type: string;
    };
    if (decoded.type !== "session") return null;
    return { email: decoded.email };
  } catch {
    return null;
  }
}

export async function setAuthCookie(email: string): Promise<void> {
  const token = generateSessionToken(email);
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
}

export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const payload = verifySessionToken(token);
  if (!payload) return null;

  return getUserByEmail(payload.email);
}

// For middleware / edge: extract email from cookie token without Redis lookup
export function getEmailFromToken(token: string): string | null {
  const payload = verifySessionToken(token);
  return payload?.email ?? null;
}

export { COOKIE_NAME };
