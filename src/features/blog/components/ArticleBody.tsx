export function ArticleBody({ html }: { html: string }) {
  return (
    <div
      className="article-body rounded-2xl bg-surface p-5 sm:p-8 lg:p-10"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
