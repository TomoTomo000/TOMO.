import {
  createFileRoute,
  defaultStringifySearch,
  redirect,
  stripSearchParams,
} from "@tanstack/react-router";
import { z } from "zod";
import { BlogErrorPage } from "@/features/blog/components/BlogErrorPage";
import { BlogListPage } from "@/features/blog/components/BlogListPage";
import { getPublicPosts } from "@/features/blog/server/post.functions";
import { getPublicTags } from "@/features/blog/server/taxonomy.functions";

const searchSchema = z.object({
  page: z.coerce.number().int().min(1).max(10_000).catch(1),
  query: z.string().trim().max(100).catch(""),
  tag: z.string().trim().max(80).catch(""),
});

const defaultSearch = {
  page: 1,
  query: "",
  tag: "",
};

function canonicalSearchString(search: typeof defaultSearch): string {
  return defaultStringifySearch({
    ...(search.page === 1 ? {} : { page: search.page }),
    ...(search.query ? { query: search.query } : {}),
    ...(search.tag ? { tag: search.tag } : {}),
  });
}

export const Route = createFileRoute("/(public)/blog/")({
  validateSearch: searchSchema,
  search: {
    middlewares: [stripSearchParams(defaultSearch)],
  },
  loaderDeps: ({ search }) => search,
  loader: async ({ deps, location }) => {
    if (location.searchStr !== canonicalSearchString(deps)) {
      throw redirect({ to: "/blog", search: deps, replace: true });
    }

    const [posts, tags] = await Promise.all([
      getPublicPosts({ data: { ...deps, pageSize: 10 } }),
      getPublicTags(),
    ]);

    if (deps.tag && !tags.some((tag) => tag.slug === deps.tag)) {
      throw redirect({
        to: "/blog",
        search: { ...deps, page: 1, tag: "" },
        replace: true,
      });
    }

    if (deps.page > posts.pageCount) {
      throw redirect({
        to: "/blog",
        search: { ...deps, page: posts.pageCount },
        replace: true,
      });
    }

    return { posts, tags };
  },
  errorComponent: BlogErrorPage,
  head: ({ match }) => {
    const { page, query, tag } = match.search;
    const isFilteredList = page > 1 || Boolean(query || tag);

    return {
      meta: [
        { title: "BLOG | TOMO" },
        {
          name: "description",
          content: "TOMOの日々の制作、デザイン、コードについてのブログです。",
        },
        ...(isFilteredList
          ? [{ name: "robots", content: "noindex,follow" }]
          : []),
      ],
    };
  },
  component: BlogIndexRoute,
});

function BlogIndexRoute() {
  const data = Route.useLoaderData();
  return (
    <BlogListPage
      posts={data.posts}
      search={Route.useSearch()}
      tags={data.tags}
    />
  );
}
