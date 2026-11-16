import { readFile } from "node:fs/promises";
import path from "node:path";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Serves the three.js page from /protected (not /public), so it is never
// reachable without a valid session. Checked here as well as in middleware.
export async function GET() {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!(await verifySessionToken(token))) {
    return new Response("Unauthorized", { status: 401 });
  }

  const html = await readFile(path.join(process.cwd(), "protected", "scene.html"), "utf8");
  return new Response(html, {
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "private, no-store",
      "X-Frame-Options": "SAMEORIGIN",
    },
  });
}
