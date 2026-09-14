import handler, {
  createServerEntry,
} from "@tanstack/react-start/server-entry";

const securityHeaders = {
  "Content-Security-Policy": [
    "default-src 'self'",
    "base-uri 'self'",
    "connect-src 'self'",
    "font-src 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "img-src 'self' data: https://images.microcms-assets.io",
    "object-src 'none'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
  ].join("; "),
  "Permissions-Policy":
    "camera=(), geolocation=(), microphone=(), payment=(), usb=()",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Strict-Transport-Security": "max-age=31536000",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
};

const application = createServerEntry({
  async fetch(request, options) {
    const response = await handler.fetch(request, options);
    const headers = new Headers(response.headers);

    Object.entries(securityHeaders).forEach(([name, value]) => {
      headers.set(name, value);
    });

    if (response.status >= 400) {
      headers.set("X-Robots-Tag", "noindex");
    }

    if (new URL(request.url).pathname.startsWith("/blog/preview/")) {
      headers.set("Cache-Control", "private, no-store");
      headers.set("Pragma", "no-cache");
      headers.set("Referrer-Policy", "no-referrer");
      headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    }

    return new Response(response.body, {
      headers,
      status: response.status,
      statusText: response.statusText,
    });
  },
});

export default {
  fetch(request) {
    return application.fetch(request);
  },
} satisfies ExportedHandler<Cloudflare.Env>;
