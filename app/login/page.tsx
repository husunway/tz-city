import { safeNextPath } from "@/lib/auth";

export const metadata = { title: "Sign in · TZ City" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; next?: string }>;
}) {
  const { error, next } = await searchParams;

  return (
    <main className="login-wrap">
      <form className="login-card" action="/api/login" method="post">
        <h1>TZ City</h1>
        <p>Sign in to continue.</p>

        <input type="hidden" name="next" value={safeNextPath(next)} />

        <label htmlFor="username">Username</label>
        <input id="username" name="username" autoComplete="username" required autoFocus />

        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" autoComplete="current-password" required />

        {error && <div className="error" role="alert">Incorrect username or password.</div>}

        <button type="submit">Sign in</button>
      </form>
    </main>
  );
}
