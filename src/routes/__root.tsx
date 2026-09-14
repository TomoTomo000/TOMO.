import type { ReactNode } from "react";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import figtreeCss from "@fontsource-variable/figtree/wght.css?url";
import notoSansJpCss from "@fontsource-variable/noto-sans-jp/wght.css?url";
import appCss from "../styles.css?url";
import { NotFoundPage } from "@/components/elements/NotFoundPage";
import { PageLoader } from "@/features/page-loader/PageLoader";
import { PageLoaderProvider } from "@/features/page-loader/PageLoaderProvider";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/seo";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        name: "description",
        content: SITE_DESCRIPTION,
      },
      { title: SITE_TITLE },
    ],
    links: [
      { rel: "stylesheet", href: figtreeCss },
      { rel: "stylesheet", href: notoSansJpCss },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.ico" },
      { rel: "alternate", type: "application/rss+xml", title: "TOMO BLOG", href: "/feed.xml" },
    ],
  }),
  component: RootComponent,
  notFoundComponent: NotFoundPage,
});

function RootComponent() {
  return (
    <RootDocument>
      <PageLoaderProvider>
        <PageLoader />
        <Outlet />
      </PageLoaderProvider>
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="ja" className="h-full antialiased">
      <head>
        <HeadContent />
      </head>
      <body className="flex min-h-full flex-col font-sans font-medium">
        {children}
        <Scripts />
      </body>
    </html>
  );
}
