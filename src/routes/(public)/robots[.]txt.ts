import { createFileRoute } from "@tanstack/react-router";
import { getSiteUrl } from "@/lib/site-url.server";

export const Route = createFileRoute("/(public)/robots.txt")({
  server: {
    handlers: {
      GET: ({ request }) =>
        new Response(
          `User-agent: *\nAllow: /\nDisallow: /blog/preview/\nSitemap: ${getSiteUrl(request)}/sitemap.xml\n`,
          {
            headers: {
              "Content-Type": "text/plain; charset=utf-8",
              "Cache-Control": "public, max-age=3600",
            },
          },
        ),
    },
  },
});
