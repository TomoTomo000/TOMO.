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
    "img-src 'self' data:",
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

export default createServerEntry({
  async fetch(request, options) {
    const response = await handler.fetch(request, options);
    const headers = new Headers(response.headers);

    Object.entries(securityHeaders).forEach(([name, value]) => {
      headers.set(name, value);
    });

    return new Response(response.body, {
      headers,
      status: response.status,
      statusText: response.statusText,
    });
  },
});
