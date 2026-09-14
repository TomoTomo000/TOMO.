import { createFileRoute } from "@tanstack/react-router";
import { BlogArticlePage } from "@/features/blog/components/BlogArticlePage";
import { getPublicPostPageData } from "@/features/blog/server/post.functions";
import { createSeoHead, DEFAULT_SEO_IMAGE, serializeJsonLd, SITE_DESCRIPTION } from "@/lib/seo";

export const Route = createFileRoute("/(public)/blog/$slug")({
  loader: ({ params }) => getPublicPostPageData({ data: { slug: params.slug } }),
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { post, siteUrl } = loaderData;
    const pageUrl = `${siteUrl}/blog/${encodeURIComponent(post.slug)}`;
    const imageUrl = post.cover
      ? new URL(post.cover.displayUrl, siteUrl).href
      : new URL(DEFAULT_SEO_IMAGE.url, siteUrl).href;
    const seo = createSeoHead({
      siteUrl,
      path: `/blog/${encodeURIComponent(post.slug)}`,
      title: `${post.title} | TOMO`,
      description: post.excerpt,
      type: "article",
      image: post.cover ? {
        url: imageUrl,
        alt: post.cover.altText || post.title,
        width: post.cover.width,
        height: post.cover.height,
      } : undefined,
    });
    const structuredData = serializeJsonLd({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt || SITE_DESCRIPTION,
      image: imageUrl,
      datePublished: post.publishedAt ?? undefined,
      dateModified: post.updatedAt,
      mainEntityOfPage: pageUrl,
      author: { "@type": "Person", name: "TOMO", url: `${siteUrl}/` },
      publisher: { "@type": "Person", name: "TOMO" },
      inLanguage: "ja",
    });

    return {
      meta: [
        ...seo.meta,
        ...(post.publishedAt
          ? [{ property: "article:published_time", content: post.publishedAt }]
          : []),
        { property: "article:modified_time", content: post.updatedAt },
      ],
      links: seo.links,
      scripts: [{ type: "application/ld+json", children: structuredData }],
    };
  },
  component: BlogPostRoute,
});

function BlogPostRoute() {
  return <BlogArticlePage post={Route.useLoaderData().post} />;
}
