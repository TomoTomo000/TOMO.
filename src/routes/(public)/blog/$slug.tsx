import { createFileRoute } from "@tanstack/react-router";
import { BlogArticlePage } from "@/features/blog/components/BlogArticlePage";
import { BlogErrorPage } from "@/features/blog/components/BlogErrorPage";
import { getPublicPostPageData } from "@/features/blog/server/post.functions";

export const Route = createFileRoute("/(public)/blog/$slug")({
  loader: ({ params }) => getPublicPostPageData({ data: { slug: params.slug } }),
  errorComponent: BlogErrorPage,
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { post, siteUrl } = loaderData;
    const pageUrl = `${siteUrl}/blog/${encodeURIComponent(post.slug)}`;
    const imageUrl = post.cover
      ? new URL(post.cover.displayUrl, siteUrl).href
      : `${siteUrl}/img/hero-designer.svg`;
    const structuredData = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      image: imageUrl,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      mainEntityOfPage: pageUrl,
      author: { "@type": "Person", name: "TOMO" },
      publisher: { "@type": "Person", name: "TOMO" },
    }).replaceAll("<", "\\u003c");

    return {
      meta: [
        { title: `${post.title} | TOMO` },
        { name: "description", content: post.excerpt },
        { property: "og:title", content: post.title },
        { property: "og:description", content: post.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: pageUrl },
        { property: "og:image", content: imageUrl },
        { property: "og:site_name", content: "TOMO" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: post.title },
        { name: "twitter:description", content: post.excerpt },
        { name: "twitter:image", content: imageUrl },
        ...(post.publishedAt
          ? [{ property: "article:published_time", content: post.publishedAt }]
          : []),
        { property: "article:modified_time", content: post.updatedAt },
      ],
      links: [{ rel: "canonical", href: pageUrl }],
      scripts: [{ type: "application/ld+json", children: structuredData }],
    };
  },
  component: BlogPostRoute,
});

function BlogPostRoute() {
  return <BlogArticlePage post={Route.useLoaderData().post} />;
}
