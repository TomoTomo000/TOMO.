import { getCloudflareEnv } from "./cloudflare/env.server";

export function getSiteUrl(request: Request): string {
  const configured = getCloudflareEnv().SITE_URL?.trim();
  if (configured) {
    try {
      const url = new URL(configured);
      if (url.protocol === "https:" || (url.protocol === "http:" && url.hostname === "localhost")) {
        return url.origin;
      }
    } catch {
      // Fall back to the request origin when configuration is incomplete.
    }
  }

  return new URL(request.url).origin;
}
