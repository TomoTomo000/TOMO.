import { createFileRoute } from "@tanstack/react-router";
import { PortfolioPage } from "@/features/portfolio/PortfolioPage";
import { getLatestPublicPosts } from "@/features/blog/server/post.functions";

export const Route = createFileRoute("/(public)/")({
  loader: () => getLatestPublicPosts(),
  component: Home,
});

function Home() {
  const blogPosts = Route.useLoaderData();
  return <PortfolioPage blogPosts={blogPosts} />;
}
