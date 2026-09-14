import { Link, Outlet } from "@tanstack/react-router";
import { useState } from "react";
import { IconButton } from "@/components/ui/IconButton";
import { AppLink } from "@/components/ui/Link";
import { BlogContainer } from "./BlogContainer";

export function BlogLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-ink">
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 lg:hidden">
        <div className="flex items-start justify-between gap-4">
          <AppLink
            to="/blog"
            search={{ page: 1, query: "", tag: "" }}
            reloadDocument
            variant="control"
            className="pointer-events-auto inline-flex h-12 items-center rounded-full bg-background px-5 text-xl font-black text-ink"
            aria-label="TOMO ブログ一覧"
            onClick={() => setIsMenuOpen(false)}
          >
            TOMO.
          </AppLink>

          <IconButton
            variant="surface"
            className="pointer-events-auto relative"
            aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <span className="sr-only">Menu</span>
            <span
              className={`absolute h-0.5 w-6 bg-ink transition-transform duration-200 ${
                isMenuOpen ? "rotate-45" : "-translate-y-1"
              }`}
            />
            <span
              className={`absolute h-0.5 w-6 bg-ink transition-transform duration-200 ${
                isMenuOpen ? "-rotate-45" : "translate-y-1"
              }`}
            />
          </IconButton>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 lg:hidden ${
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
      >
        <button
          type="button"
          className={`absolute inset-0 cursor-pointer bg-ink/60 transition-opacity duration-200 ${
            isMenuOpen ? "opacity-100" : "opacity-0"
          }`}
          aria-label="メニューを閉じる"
          onClick={() => setIsMenuOpen(false)}
        />

        <nav
          id="mobile-navigation"
          className={`relative rounded-b-3xl bg-background px-6 pb-6 pt-20 text-ink transition-transform duration-200 ease-out ${
            isMenuOpen ? "translate-y-0" : "-translate-y-full"
          }`}
          aria-label="モバイルナビゲーション"
        >
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="block rounded-2xl px-4 py-3 text-lg font-black uppercase text-ink transition-colors hover:bg-canvas hover:text-background"
                onClick={() => setIsMenuOpen(false)}
              >
                PORTFOLIO
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <header className="sticky top-0 z-50 hidden border-b border-ink/10 bg-background py-3 lg:block">
        <BlogContainer className="flex items-center justify-between gap-4">
          <AppLink
            to="/blog"
            search={{ page: 1, query: "", tag: "" }}
            reloadDocument
            variant="control"
            className="text-xl font-black"
            aria-label="TOMO ブログ一覧"
          >
            TOMO.
          </AppLink>

          <nav aria-label="ブログナビゲーション">
            <ul className="flex items-center gap-2">
              <li>
                <Link
                  to="/"
                  className="block rounded-full px-5 py-3 text-sm font-black uppercase transition-colors hover:bg-canvas hover:text-background"
                >
                  PORTFOLIO
                </Link>
              </li>
            </ul>
          </nav>
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
