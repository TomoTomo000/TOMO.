import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { getSiteUrl } from "./site-url.server";

export const getPublicSiteUrl = createServerFn({ method: "GET" }).handler(
  () => getSiteUrl(getRequest()),
);
