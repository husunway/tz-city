// Protected by middleware: only reachable with a valid session cookie.
export default function Home() {
  return (
    <main className="viewer">
      <header className="topbar">
        <strong>TZ City</strong>
        <form action="/api/logout" method="post">
          <button type="submit">Log out</button>
        </form>
      </header>
      <iframe src="/scene" title="three.js scene" />
    </main>
  );
}
