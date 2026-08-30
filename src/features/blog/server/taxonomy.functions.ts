import { createServerFn } from "@tanstack/react-start";
import { withBlogDataErrorStatus } from "./blog-data.error";
import { listMicroCmsTags } from "./microcms.repository.server";

export const getPublicTags = createServerFn({ method: "GET" }).handler(
  () => withBlogDataErrorStatus(listMicroCmsTags),
);
