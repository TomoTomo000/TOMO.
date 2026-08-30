import { env } from "cloudflare:workers";

export type AppEnv = Omit<Cloudflare.Env, "APP_ENV"> & {
  APP_ENV: "development" | "production" | "test";
  SITE_URL?: string;
  MICROCMS_SERVICE_DOMAIN?: string;
  MICROCMS_API_KEY?: string;
  MICROCMS_PREVIEW_SECRET?: string;
};

export function getCloudflareEnv(): AppEnv {
  return env as AppEnv;
}
