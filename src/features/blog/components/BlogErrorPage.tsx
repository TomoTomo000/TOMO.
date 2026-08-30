import { Link } from "@tanstack/react-router";
import { BlogContainer } from "./BlogContainer";

export function BlogErrorPage() {
  return (
    <main className="grid min-h-[65vh] place-items-center py-20 text-center">
      <BlogContainer>
        <p className="text-sm font-black text-muted">TEMPORARY ERROR</p>
        <h1 className="mt-3 text-3xl font-black">記事を読み込めませんでした</h1>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-muted">
          一時的に通信できない可能性があります。
          <br />
          時間をおいて、もう一度お試しください。
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="cursor-pointer rounded-full bg-canvas px-6 py-3 text-sm font-bold text-background transition-[filter] hover:brightness-110"
          >
            もう一度読み込む
          </button>
          <Link
            to="/blog"
            search={{ page: 1, query: "", tag: "" }}
            className="rounded-full border border-ink/15 px-6 py-3 text-sm font-bold transition-colors hover:bg-ink/5"
          >
            ブログ一覧へ
          </Link>
        </div>
      </BlogContainer>
    </main>
  );
}
