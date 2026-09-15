import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { BlogArticlePage } from "@/features/blog/components/BlogArticlePage";
import { getPreviewPostPageData } from "@/features/blog/server/post.functions";

const previewSearchSchema = z.object({
  draftKey: z.string().max(200).catch(""),
  secret: z.string().max(200).catch(""),
});

export const Route = createFileRoute("/(public)/blog/preview/$contentId")({
  validateSearch: previewSearchSchema,
  loaderDeps: ({ search }) => search,
  loader: ({ params, deps }) =>
    getPreviewPostPageData({
      data: {
        contentId: params.contentId,
        draftKey: deps.draftKey,
        secret: deps.secret,
      },
    }),
  head: () => ({
    meta: [
      { title: "プレビュー | TOMO" },
      { name: "robots", content: "noindex,nofollow,noarchive" },
    ],
  }),
  component: PreviewRoute,
});

function PreviewRoute() {
  const { post } = Route.useLoaderData();
  return (
    <div className="overflow-hidden bg-background">
      <p className="bg-amber-100 px-5 py-3 text-center text-sm font-bold text-amber-950">
        プレビューです。公開中の内容とは異なる場合があります。
      </p>
      <BlogArticlePage post={post} />
    </div>
  );
}
