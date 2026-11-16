// Protected by middleware: only reachable with a valid session cookie.
// The palace walk files live in public/palace-walk and are also behind the middleware.
export default function Home() {
  return (
    <main className="viewer">
      <header className="topbar">
        <strong>TZ City</strong>
        <form action="/api/logout" method="post">
          <button type="submit">Log out</button>
        </form>
      </header>
      <iframe
        src="/palace-walk/index.html"
        title="Palace Walk"
        allow="fullscreen"
        allowFullScreen
      />
    </main>
  );
}
