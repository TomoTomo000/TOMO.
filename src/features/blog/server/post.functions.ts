import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { notFound } from "@tanstack/react-router";
import { z } from "zod";
import { isBlogDataError, withBlogDataErrorStatus } from "./blog-data.error";
import { postListInputSchema } from "./post.schema";
import {
  findMicroCmsPostById,
  listLatestMicroCmsPosts,
  listMicroCmsPosts,
} from "./microcms.repository.server";
import { getCloudflareEnv } from "@/lib/cloudflare/env.server";
import { getSiteUrl } from "@/lib/site-url.server";

async function secretsEqual(left: string, right: string): Promise<boolean> {
  const encoder = new TextEncoder();
  const [leftDigest, rightDigest] = await Promise.all([
    crypto.subtle.digest("SHA-256", encoder.encode(left)),
    crypto.subtle.digest("SHA-256", encoder.encode(right)),
  ]);
  const leftBytes = new Uint8Array(leftDigest);
  const rightBytes = new Uint8Array(rightDigest);
  let difference = 0;
  for (let index = 0; index < leftBytes.length; index += 1) {
    difference |= leftBytes[index] ^ rightBytes[index];
  }
  return difference === 0;
}

async function resolvePublicPost(slug: string) {
  const post = await findMicroCmsPostById({ contentId: slug });
  if (post) {
    return post;
  }
  throw notFound();
}

export const getLatestPublicPosts = createServerFn({ method: "GET" }).handler(
  async () => {
    try {
      return await listLatestMicroCmsPosts(4);
    } catch (error) {
      if (isBlogDataError(error)) return [];
      throw error;
    }
  },
);

export const getPublicPosts = createServerFn({ method: "GET" })
  .validator(postListInputSchema)
  .handler(({ data }) =>
    withBlogDataErrorStatus(() => listMicroCmsPosts(data)),
  );

export const getPublicPost = createServerFn({ method: "GET" })
  .validator(z.object({ slug: z.string().min(3).max(100) }))
  .handler(({ data }) =>
    withBlogDataErrorStatus(() => resolvePublicPost(data.slug)),
  );

export const getPublicPostPageData = createServerFn({ method: "GET" })
  .validator(z.object({ slug: z.string().min(3).max(100) }))
  .handler(({ data }) =>
    withBlogDataErrorStatus(async () => ({
      post: await resolvePublicPost(data.slug),
      siteUrl: getSiteUrl(getRequest()),
    })),
  );

export const getPreviewPostPageData = createServerFn({ method: "GET" })
  .validator(
    z.object({
      contentId: z.string().regex(/^[a-z0-9][a-z0-9-]{1,48}[a-z0-9]$/),
      draftKey: z.string().max(200),
      secret: z.string().max(200),
    }),
  )
  .handler(({ data }) =>
    withBlogDataErrorStatus(async () => {
      const environment = getCloudflareEnv();
      const configuredSecret = environment.MICROCMS_PREVIEW_SECRET?.trim();
      if (!configuredSecret || configuredSecret.length < 32) {
        throw notFound();
      }
      if (!(await secretsEqual(data.secret, configuredSecret))) {
        throw notFound();
      }
      const post = await findMicroCmsPostById({
        contentId: data.contentId,
        draftKey: data.draftKey || undefined,
      });
      if (!post) throw notFound();
      return { post, siteUrl: getSiteUrl(getRequest()) };
    }),
  );
