// Session helpers built on Web Crypto so they work in both the Edge (middleware)
// and Node.js (route handlers) runtimes.

export const SESSION_COOKIE = "tz_session";
export const SESSION_MAX_AGE = 60 * 60 * 12; // 12 hours, in seconds

const encoder = new TextEncoder();

function getConfig() {
  const username = process.env.AUTH_USERNAME;
  const password = process.env.AUTH_PASSWORD;
  const secret = process.env.AUTH_SECRET;
  if (!username || !password || !secret) {
    throw new Error(
      "Missing AUTH_USERNAME, AUTH_PASSWORD or AUTH_SECRET environment variable."
    );
  }
  return { username, password, secret };
}

function toBase64Url(bytes: ArrayBuffer): string {
  let bin = "";
  for (const b of new Uint8Array(bytes)) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function hmac(key: string, data: string): Promise<string> {
  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    encoder.encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  return toBase64Url(await crypto.subtle.sign("HMAC", cryptoKey, encoder.encode(data)));
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

// The signing key includes the password, so changing the password logs everyone out.
function signingKey() {
  const { secret, password } = getConfig();
  return `${secret}:${password}`;
}

export async function checkCredentials(username: string, password: string) {
  const cfg = getConfig();
  // Compare HMAC digests so the comparison is constant-time regardless of input length.
  const [u1, u2, p1, p2] = await Promise.all([
    hmac(cfg.secret, username),
    hmac(cfg.secret, cfg.username),
    hmac(cfg.secret, password),
    hmac(cfg.secret, cfg.password),
  ]);
  const userOk = timingSafeEqual(u1, u2);
  const passOk = timingSafeEqual(p1, p2);
  return userOk && passOk;
}

export async function createSessionToken(): Promise<string> {
  const expires = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE;
  const payload = String(expires);
  return `${payload}.${await hmac(signingKey(), payload)}`;
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const expires = Number(payload);
  if (!Number.isFinite(expires) || expires < Date.now() / 1000) return false;
  try {
    return timingSafeEqual(sig, await hmac(signingKey(), payload));
  } catch {
    return false;
  }
}

/** Only allow same-site relative redirects (blocks open redirects like "//evil.com"). */
export function safeNextPath(next: unknown): string {
  if (typeof next !== "string" || !next.startsWith("/") || next.startsWith("//") || next.startsWith("/\\")) {
    return "/";
  }
  return next;
}
