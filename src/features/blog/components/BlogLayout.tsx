import { Link, Outlet } from "@tanstack/react-router";
import { BlogContainer } from "./BlogContainer";

export function BlogLayout() {
  return (
    <div className="min-h-screen bg-background text-ink">
      <header className="border-b border-ink/10 bg-background py-5">
        <BlogContainer>
          <Link to="/" className="text-2xl font-black" aria-label="TOMO ホーム">
            TOMO.
          </Link>
        </BlogContainer>
      </header>

      <Outlet />

      <footer className="border-t border-ink/10 py-14">
        <BlogContainer className="flex flex-col items-center gap-4 text-center">
          <p className="text-4xl font-black">TOMO.</p>
          <p className="text-xs text-muted">
            © 2026 TOMO. All Rights Reserved.
          </p>
        </BlogContainer>
      </footer>
    </div>
  );
}
