import { createFileRoute } from "@tanstack/react-router";
import { handleContactRequest } from "@/features/contact/contact.server";
import { getCloudflareEnv } from "@/lib/cloudflare/env.server";

export const Route = createFileRoute("/(public)/api/contact")({
  server: {
    handlers: {
      POST: ({ request }) => handleContactRequest(request, getCloudflareEnv()),
    },
  },
});
