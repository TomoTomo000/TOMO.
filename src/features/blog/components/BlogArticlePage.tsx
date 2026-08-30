import { Link } from "@tanstack/react-router";
import { ChevronRightIcon } from "@/components/ui/Icons";
import type { PostDetail } from "../types/post.types";
import { ArticleBody } from "./ArticleBody";
import { BlogContainer } from "./BlogContainer";
import { formatPostDate } from "./date";

export function BlogArticlePage({ post }: { post: PostDetail }) {
  return (
    <main className="py-14 sm:py-20">
      <BlogContainer>
        <nav
          className="mb-8 text-xs text-muted"
          aria-label="パンくずリスト"
        >
          <ol className="flex min-w-0 items-center gap-2">
            <li className="shrink-0">
              <Link
                to="/blog"
                search={{ page: 1, query: "", tag: "" }}
                className="font-bold transition-opacity hover:opacity-60"
              >
                BLOG
              </Link>
            </li>
            <li className="shrink-0 text-subtle" aria-hidden="true">
              <ChevronRightIcon className="size-3.5" />
            </li>
            <li
              className="min-w-0 truncate"
              aria-current="page"
              title={post.title}
            >
              {post.title}
            </li>
          </ol>
        </nav>

        <article>
          <div>
            <h1 className="text-4xl font-black leading-tight sm:text-5xl">
              {post.title}
            </h1>
            {post.excerpt ? (
              <p className="mt-6 leading-8 text-muted">{post.excerpt}</p>
            ) : null}
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs text-subtle">
              <time dateTime={post.publishedAt ?? undefined}>
                公開 {formatPostDate(post.publishedAt)}
              </time>
              <time dateTime={post.updatedAt}>
                更新 {formatPostDate(post.updatedAt)}
              </time>
              <span>約{post.readingMinutes}分</span>
            </div>
            {post.tags.length ? (
              <ul className="mt-5 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <li key={tag.id}>
                    <Link
                      to="/blog"
                      search={{ page: 1, query: "", tag: tag.slug }}
                      className="inline-flex text-xs font-bold text-ink transition-opacity hover:opacity-60"
                    >
                      #{tag.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {post.cover ? (
            <img
              src={post.cover.displayUrl}
              alt={post.cover.altText}
              width={post.cover.width}
              height={post.cover.height}
              className="mx-auto mt-10 aspect-[1.91/1] w-full max-w-4xl rounded-2xl object-cover"
            />
          ) : null}

          <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_15rem]">
            <ArticleBody html={post.contentHtml} />
            {post.tableOfContents.length >= 2 ? (
              <details
                className="rounded-2xl bg-surface p-5 lg:sticky lg:top-6 lg:open"
                open
              >
                <summary className="cursor-pointer text-sm font-bold">
                  目次
                </summary>
                <ol className="mt-4 space-y-3 text-sm text-muted">
                  {post.tableOfContents.map((item) => (
                    <li
                      key={item.id}
                      style={{ paddingLeft: `${(item.level - 2) * 12}px` }}
                    >
                      <a href={`#${item.id}`} className="hover:text-ink">
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ol>
              </details>
            ) : null}
          </div>
        </article>
      </BlogContainer>
    </main>
  );
}
