import type { NextConfig } from "next";

// Baseline security headers applied to every route.
const securityHeaders = [
	{ key: "X-Content-Type-Options", value: "nosniff" },
	{ key: "X-Frame-Options", value: "SAMEORIGIN" },
	{ key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
	{ key: "X-DNS-Prefetch-Control", value: "on" },
	{ key: "Cross-Origin-Opener-Policy", value: "same-origin" },
	{
		key: "Permissions-Policy",
		value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
	},
	{
		key: "Strict-Transport-Security",
		value: "max-age=63072000; includeSubDomains; preload",
	},
];

const nextConfig: NextConfig = {
	// Don't advertise the framework in responses.
	poweredByHeader: false,
	turbopack: {
		root: __dirname,
	},
	images: {
		// Serve AVIF (then WebP) — much smaller than the source JPEG for the LCP headshot.
		formats: ["image/avif", "image/webp"],
	},
	experimental: {
		// Inline the (small) CSS into the HTML so it isn't a render-blocking request,
		// which gates FCP and therefore LCP.
		inlineCss: true,
	},
	async headers() {
		return [
			{
				// Apply the security headers to every route.
				source: "/:path*",
				headers: securityHeaders,
			},
		];
	},
};

export default nextConfig;
