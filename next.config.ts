import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
};

export default nextConfig;
