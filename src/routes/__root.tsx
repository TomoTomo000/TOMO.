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
        content:
          "フロントエンドエンジニア・デザイナー TOMOのwebサイトです。制作実績や日々の学び、コーディング・デザインについての備忘録をまとめています。",
      },
      { title: "TOMO | フロントエンドエンジニア・デザイナー" },
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
      <Outlet />
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
