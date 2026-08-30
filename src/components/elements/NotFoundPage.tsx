import { Link } from "@tanstack/react-router";

export function NotFoundPage() {
  return (
    <main className="grid min-h-[70vh] place-items-center px-5 py-20 text-center">
      <div>
        <p className="text-sm font-black text-muted">404</p>
        <h1 className="mt-3 text-3xl font-black">ページが見つかりません</h1>
        <p className="mt-4 text-sm leading-7 text-muted">
          URLが変更されたか、ページが削除された可能性があります。
        </p>
        <Link to="/" className="mt-8 inline-flex rounded-full bg-canvas px-6 py-3 text-sm font-bold text-background">
          トップへ戻る
        </Link>
      </div>
    </main>
  );
}
